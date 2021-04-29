import Query
from datetime import datetime

data = Query.__get__()

person = {}
count_lap = []
count_time = []

time = {}
lap = {}
date = {}

data_final = {}

for row in data:
    Id = row[0]
    Tag = row[1]
    Timestamp = row[2]
    Date = row[3]

    if Tag not in person:
        person[Tag] = []
        lap[Tag] = 0
        time[Tag] = []
        date[Tag] = []
        data_final[Tag] = {}
        person[Tag].append([Id, Timestamp, Date])
    else:
        person[Tag].append([Id, Timestamp, Date])

# print(person)

for i in person:
    check_1 = True
    check_2 = True
    for j in person[i]:
        # print(j)
        if j[0] == 1 and check_1 :
            count_lap.append(j[0])
            count_time.append(j[1])
            check_1 = False
        elif j[0] == 2 and check_2:
            count_lap.append(j[0])
            check_2 = False
            check_1 = True
        if len(count_lap) == 3 :
            if count_lap == [1, 2, 1]: 
                # calulate lap ----------------
                lap[i] = lap[i] + 1
                # calulate time ---------------
                FMT = '%H:%M:%S'
                diff_time = datetime.strptime(count_time[1],FMT) - datetime.strptime(count_time[0],FMT)
                second = diff_time.total_seconds()
                minute = second//3600
                if minute == 0:
                    time_per_lap = str(int(second)) + "s"
                else:
                    time_per_lap = str(int(minute)) + "m:" + str(int(second)) + "s"
                time[i].append(time_per_lap)
                date[i].append(j[2])
                temp = count_time[1]
                # clear array -----------------
                count_time = []
                count_lap = []
                check_1 = False
                check_2 = True
                # for new round ---------------
                count_lap.append(1)
                count_time.append(temp)
                # print(count_lap)

    # print("------------------")
    count_time = []
    count_lap = []
# print(lap)  
# print(time)

#data visualization
counter = 1

for i in data_final:
    for j in range(lap[i]):
        # data_final[i][counter] =  time[i][j]
        data_final[i][counter] =  []
        data_final[i][counter].append(time[i][j])
        data_final[i][counter].append(date[i][j])
        counter = counter +1 
    counter = 1

# print(data_final)

#insert into laptime database
for tag in data_final:
    for lap in data_final[tag]:
        res = data_final[tag][lap]
        time = res[0]
        date = res[1]
        Query.__insert__laptime__(tag, date, lap, time)
