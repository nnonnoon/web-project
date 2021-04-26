import socket
import threading
import datetime
from models import Logging, engine
conn = engine.connect()

class EPCReader:
    def __init__(self, ip_addr, port):
        self.socket = socket.socket()

        try:
            self.socket.connect((ip_addr, port))
            return print("Connected")
        except:
            return print("Error Connected")

    def start_scan(self):
        data = [0,0]
        cmd = 0x82
        size = 2 + 2 + 1 + len(data) + 1 + 2
        check_code = 0
        length_first = size % 256
        length_second = size // 256

        # check_code 
        for i in [length_first, length_second, cmd] + data:
            check_code ^= i
        self.socket.send(bytes([0xa5, 0x5a, length_second, length_first, cmd, *data, check_code, 0x0d, 0x0a]))
        self.time_start = datetime.datetime.utcnow()
        print("Starting...")
        return
    
    def close_conection(self):
        self.socket.close()
        return
    
    def set_callback(self, callback):
        self.callback = callback 
    
    def clear_flag_error(self):
        data = []
        cmd = 0x42
        size = 2 + 2 + 1 + len(data) + 1 + 2
        check_code = 0
        length_first = size % 256
        length_second = size // 256

        # check_code 
        for i in [length_first, length_second, cmd] + data:
            check_code ^= i
        self.socket.send(bytes([0xa5, 0x5a, length_second, length_first, cmd, *data, check_code, 0x0d, 0x0a]))
        print(self.socket.recv(9))
        print("Clear_Flag_Error...")
        return
    
    def stop_scan(self):
        data = []
        cmd = 0x8c
        size = 2 + 2 + 1 + len(data) + 1 + 2
        check_code = 0
        length_first = size % 256
        length_second = size // 256

        # check_code 
        for i in [length_first, length_second, cmd] + data:
            check_code ^= i
        self.socket.send(bytes([0xa5, 0x5a, length_second, length_first, cmd, *data, check_code, 0x0d, 0x0a]))
        self.socket.recv(9)
        print("Stoping...")
        return
    
    def check(self):
        resp = self.socket.recv(4)
        tags = {}
        
        if resp[0:2] != b'\xa5\x5a':
            return
        
        length = resp[2]*256 + resp[3]
        resp = self.socket.recv(length-4)
        if resp[0] != 0x83:
            print("Unknown cmd:", resp[0])
            return

        epc = resp[1:-7]
        rssi = 65536 - (resp[-6]*256 + resp[-5])
        rssi = -rssi/10
        if epc not in tags:
            tags[epc] = 1
        else:
            tags[epc] += 1
        
        time_start = self.time_start
        self.callback(epc, rssi, time_start)
    
    
    def Power(self):
        data = [0, 1, 0x07, 0xd0, 0x07, 0xd0]
        cmd = 0x10
        size = 2 + 2 + 1 + len(data) + 1 + 2
        check_code = 0
        length_first = size % 256
        length_second = size // 256

        # check_code 
        for i in [length_first, length_second, cmd] + data:
            check_code ^= i
            
        print("-----------------Power----------------")
            
        self.socket.send(bytes([0xa5, 0x5a, length_second, length_first, cmd, *data, check_code, 0x0d, 0x0a]))
        print(bytes([0xa5, 0x5a, length_second, length_first, cmd, *data, check_code, 0x0d, 0x0a]))
        print(self.socket.recv(9))
        return
    
    def Get_current_Power(self):
        data = []
        cmd = 0x12
        size = 2 + 2 + 1 + len(data) + 1 + 2
        check_code = 0
        length_first = size % 256
        length_second = size // 256

        # check_code 
        for i in [length_first, length_second, cmd] + data:
            check_code ^= i
        
        print("-----------------Current----------------")
        self.socket.send(bytes([0xa5, 0x5a, length_second, length_first, cmd, *data, check_code, 0x0d, 0x0a]))
        print(bytes([0xa5, 0x5a, length_second, length_first, cmd, *data, check_code, 0x0d, 0x0a]))
        print(self.socket.recv(20))
        return
        
    
    def Buzzer(self):
        data = [0, 0]
        cmd = 0x56
        size = 2 + 2 + 1 + len(data) + 1 + 2
        check_code = 0
        length_first = size % 256
        length_second = size // 256

        # check_code 
        for i in [length_first, length_second, cmd] + data:
            check_code ^= i
            
#         print(cmd)
        self.socket.send(bytes([0xa5, 0x5a, length_second, length_first, cmd, *data, check_code, 0x0d, 0x0a]))
        print("Buzzer")
        return
        
        
       
class TagProcessor:
    def __init__(self, gate_id): # constructor
        self.seen_tags = {}
        self.gate_id = gate_id
        
    def my_recv (self, tag, rssi, time_start):
        timestamp = datetime.datetime.utcnow()
        all_tags = self.seen_tags
        tag = ''.join((f'{i:02X}' for i in tag))
        if tag not in all_tags:
            all_tags[tag] = timestamp
            ins = Logging.insert().values( gate_id= self.gate_id, tag_number = tag, timestamp = timestamp, check = False)
            result = conn.execute(ins)
            print('++++++'+tag+'+++++' + '$$$$$$'+str(rssi)+'$$$$$$')
        else: 
            diff_time = (timestamp - all_tags[tag]).total_seconds()
            if diff_time > 60:
                all_tags[tag] = timestamp
                ins = Logging.insert().values( gate_id= self.gate_id, tag_number = tag, timestamp = timestamp, check = False)
                result = conn.execute(ins)
                print('++++++'+tag+'+++++' + '$$$$$$'+str(rssi)+'$$$$$$')
 


ip_addr = '192.168.99.202'
port = 8888
gate_id = 1
reader = EPCReader(ip_addr, port)
reader.stop_scan()
reader.Get_current_Power()
reader.Power()
reader.Get_current_Power()

tag_proc = TagProcessor(gate_id)
reader.set_callback(tag_proc.my_recv)
reader.start_scan()

while True:
    reader.check()

reader.stop_scan()
reader.close_conection()
        
