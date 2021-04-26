import requests
import time
from models import Logging, engine

url = 'http://receiver.local:5000/logging'

conn = engine.connect()

while(True):      
    data = Logging.select().where(Logging.columns.check == 'f')
    results = conn.execute(data)
        
    for result in results: 
        payload = {}
        payload["gate_id"] = result[1]
        payload["tag_number"] = result[2]
        payload["timestamp"] = result[3]
        
        try :
            response = requests.post(url, json = payload)
        except :  
            print("Disconnect")
            exit(1)
        
        if response.ok == True:
            print("message: " + response.json()['message'] + " +++SUCCESS+++")
            
            #Update columns "check" in table is True
            
            update_data = Logging.update().where(Logging.columns.index == result[0]).values(check = True)
            conn.execute(update_data) 

        else:
            print("message: " + response.json()['message'] + " ---Failed---")
            break;
    time.sleep(10)








    
    