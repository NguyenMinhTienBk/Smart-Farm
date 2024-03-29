
import serial.tools.list_ports
import paho.mqtt.client as mqtt
import time
import json
import datetime
import random
import csv
import os
import sys

from irrigation import IrrigationModel, Plant


from Date import *

# for timezone()
import pytz
DIC_PATTH = 'Gateway'
# using now() to get current time
date_format = '%d-%m-%Y'
hour_format = '%H:%M'
current_time = datetime.datetime.now(pytz.timezone('Asia/Ho_Chi_Minh'))
curTime = time.time()
last_update = datetime.datetime(2023, 4, 25)
model = IrrigationModel()
# AI model


# cur_date = current_time.strftime(date_format)
# cur_hour = current_time.strftime(hour_format)

# printing current time in india
# format: 2023-04-22 12:23:59.455187+07:00
# print("The current time is :", cur_date)
# print("The current hour is :", cur_hour)
# print(days_between_dates("10-04-2023",cur_date))
# model = IrrigationModel()
# CropType, cropDays, soilMoisture, temp, humidity
# data = [Plant.GROUND_NUTS.value, 32, 700, 32, 32]

IRRIGATION_AUTO = 3
IRRIGATION_MANUAL = 1
IRRIGATION_CALENDAR = 2

amountOfWater = float(0)
fLowPump = 1.4  # L/m
onTime = float(0)
offTime = float(0)
pumping = False
OldPumping = pumping
pumpIntervel = 5*60
wateringTime = float(0)
flagWateringTime = False
selectedPlant = None
Mode = IRRIGATION_MANUAL
setPump = False
plantType = None
selectedDate = None
temp_cur = None
humi_cur = None
light_cur = None
soil_cur = None

# task = [
#             {"amountOfWater" : "", "date" : "",  "hour" : ""},
#             {"amountOfWater" :"",  "date":"","hour":""}
#         ]

taskList = []


print("Xin chào ThingsBoard")

BROKER_ADDRESS = "demo.thingsboard.io"
PORT = 1883
THINGS_BOARD_ACCESS_TOKEN = "access_token_device1"


def subscribed(client, userdata, mid, granted_qos):
    print("Subscribed...")


def recv_message(client, userdata, message):
    print("Received: ", message.payload.decode("utf-8"))
    temp_data = {'value': True}

    try:
        # print('sfsdf', Mode)
        jsonobj = json.loads(message.payload)
        if jsonobj['method'] == "setPump":
            # temp_data['value'] = jsonobj['params']
            temp_data = {'setPump': jsonobj['params']}
            print(json.dumps(temp_data))
            client.publish('v1/devices/me/attributes',
                           json.dumps(temp_data), 1)
            global setPump
            setPump = jsonobj['params']
            # if jsonobj['params']:
            #     # print("A")
            #     ser.write("A".encode())
            # else:
            #     ser.write("a".encode())
            # print("a")
        if jsonobj['method'] == "Mode":
            temp_data['value'] = jsonobj['params']
            client.publish('v1/devices/me/attributes',
                           json.dumps(temp_data), 1)
            global Mode
            Mode = int(jsonobj['params'])
            # if jsonobj['params'] == 1:
            #
            #     Mode = IRRIGATION_AUTO
            #     # ser.write("A".encode())
            # elif jsonobj['params'] == 2:
            #     Mode = IRRIGATION_AUTO
            #     # ser.write("a".encode())
            #     # print("a")
            # elif jsonobj['params'] == 2:
            #     Mode = IRRIGATION_AUTO
            #     # ser.write("a".encode())
            #     # print("a")
            controller()
        if jsonobj['method'] == "amountOfWater":
            temp_data['value'] = jsonobj['params']
            client.publish('v1/devices/me/attributes',
                           json.dumps(temp_data), 1)
            global amountOfWater
            amountOfWater = jsonobj['params']
            print(type(amountOfWater))
        if jsonobj['method'] == "irrigation_schedule":
            temp_data['value'] = jsonobj['params']
            client.publish('v1/devices/me/attributes',
                           json.dumps(temp_data), 1)
            # json
        if jsonobj['method'] == "selectedPlant":
            temp_data['value'] = jsonobj['params']
            client.publish('v1/devices/me/attributes',
                           json.dumps(temp_data), 1)
            global selectedPlant
            selectedPlant = jsonobj['params']
            # global amountOfWater
            # amountOfWater = jsonobj['params']
        if jsonobj['method'] == "selectedDate":
            temp_data['value'] = jsonobj['params']
            client.publish('v1/devices/me/attributes',
                           json.dumps(temp_data), 1)
            global selectedDate
            selectedDate = jsonobj['params']
        if jsonobj['method'] == "numOfDayPlanted":
            temp_data['value'] = jsonobj['params']
            client.publish('v1/devices/me/attributes',
                           json.dumps(temp_data), 1)
            global numOfDayPlanted
            numOfDayPlanted = jsonobj['params']
        if jsonobj['method'] == "task":
            temp_data['value'] = jsonobj['params']
            client.publish('v1/devices/me/attributes',
                           json.dumps(temp_data), 1)
            global taskList
            taskList = jsonobj['params']
            for task in taskList:
                task['pumped'] = False
            print(type(taskList))
            # print(task[1])
            # print(type(task[1]['date']))

    except:
        pass


def connected(client, usedata, flags, rc):
    if rc == 0:
        print("Thingsboard connected successfully!!")
        client.subscribe("v1/devices/me/rpc/request/+")
        # client.subscribe("v1/devices/me/attributes/SHARED_SCOPE")
    else:
        print("Connection is failed")

#  find port com connect with mircrobit


def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB-SERIAL CH340" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
            commPort = "COM5"

    print(commPort)
    return commPort

# global isMicrobitConected


def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    try:
        collect_data = None
        if splitData[0] == "1":
            if splitData[1] == "TEMP":
                # client.publish("bbc-temp", splitData[2])
                # temp = splitData[2]
                # print(temp)
                collect_data = {'temperature': splitData[2]}
                global temp_cur
                temp_cur = float(splitData[2])
            elif splitData[1] == "HUMI":
                # client.publish("bbc-humi", splitData[2])
                # humi = splitData[2]
                collect_data = {'humidity': splitData[2]}
                global humi_cur
                humi_cur = float(splitData[2])
            elif splitData[1] == "SOIL":
                # soil_moisture = splitData[2]
                collect_data = {'soilmoisture': splitData[2]}
                global soil_cur
                soil_cur = float(splitData[2])
            elif splitData[1] == "LIGHT":
                # light_intesity = splitData[2]
                collect_data = {'light': splitData[2]}
                global light_cur
                light_cur = float(splitData[2])
        # elif splitData[0] == "2":
        #     if splitData[1] == "TEMP":
        #         client.publish("bbc-temp-2", splitData[2])
        #     elif splitData[1] == "HUMI":
        #         client.publish("bbc-humi-2", splitData[2])

            # collect_data = {'temperature': temp, 'humidity': humi, 'light': light_intesity, 'soilmoisture': soil_moisture}
            print(collect_data)
            print()
            client.publish('v1/devices/me/telemetry',
                           json.dumps(collect_data), 1)

    except:  # if given data error
        print('err')


mess = ""


def readSerial():
    global ser
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        flag = False
        while ("#" in mess) and ("!" in mess):
            flag
            start = mess.find("!")
            end = mess.find("#")
            # print("readSerial")
            print(mess[start:end + 1])
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]

        saveSensorData()


client = mqtt.Client("Gateway_Thingsboard")
client.username_pw_set(THINGS_BOARD_ACCESS_TOKEN)

client.on_connect = connected
client.connect(BROKER_ADDRESS, 1883, 60)
client.loop_start()

client.on_subscribe = subscribed
client.on_message = recv_message


def Plantype():
    global plantType
    global selectedPlant
    if (selectedPlant == "GROUND_NUTS"):
        plantType = Plant.GROUND_NUTS
    elif(selectedPlant == "WHEET"):
        plantType = Plant.WHEET
    elif(selectedPlant == "GARDEN_FLOWERS"):
        plantType = Plant.GARDEN_FLOWERS
    elif(selectedPlant == "MAIZE"):
        plantType = Plant.MAIZE
    elif(selectedPlant == "PADDY"):
        plantType = Plant.PADDY
    elif(selectedPlant == "POTATO"):
        plantType = Plant.POTATO
    elif(selectedPlant == "PULSE"):
        plantType = Plant.PULSE
    elif(selectedPlant == "COFFEE"):
        plantType = Plant.COFFEE
    return plantType


def controller():
    global pumping
    global wateringTime
    global onTime
    global Mode
    global flagWateringTime
    global model
    global cur_date
    global soil_cur
    global temp_cur
    global humi_cur
    # global cur_hour
    # print(type(Mode))
    # print(IRRIGATION_AUTO, IRRIGATION_CALENDAR, IRRIGATION_MANUAL)
    # print(Mode == IRRIGATION_AUTO, Mode == IRRIGATION_CALENDAR, Mode == IRRIGATION_MANUAL)
    # global taskList

    if Mode == IRRIGATION_AUTO:  # Assign to AI Model
        # CropType, cropDays, soilMoisture, temp, humidity
        print('In IRRIGATION_AUTO')

        # ai prediction
        if not (soil_cur is None or temp_cur is None or humi_cur is None or selectedDate is None):
            print('Type Plant:', selectedPlant)
            print('Number of days planted: ',
                  days_between_dates(selectedDate, cur_date), )

            soil_cur_2 = int(1024 - soil_cur * 1024/100)
            data = [Plantype(), days_between_dates(selectedDate, cur_date),
                    soil_cur_2, temp_cur, humi_cur]
            print()
            print('predict data', data)
            predict = model.doIrrigate(data)
            pumping = predict if predict is not None else pumping
            print("predict: ", pumping)
            print()

            soil_cur = None
            temp_cur = None
            humi_cur = None

    elif Mode == IRRIGATION_CALENDAR:
        # global wateringTime
        # wateringTime = (amountOfWater/ fLowPump) * 60 # seconds
        # pumping = True
        # ser.write("A".encode()) #Turn on pump
        # global onTime
        # onTime = curTime
        print('In IRRIGATION_CALENDAR')
        for x in taskList:
            # print(x)
            # print(cur_date)
            # print(cur_hour)
            print(flagWateringTime)
            # print(x)
            if checkEqualTime(cur_date, cur_hour, x['date'], x['hour']) and flagWateringTime == False and x['pumped'] is False:
                print('Tuoi lich', x['hour'], x['date'])
                print(type(x['hour']))
                wateringTime = 0
                if 'amountOfWater' in x:
                    wateringTime = (
                        float(x['amountOfWater']) / fLowPump) * 60  # seconds
                elif 'time' in x:
                    wateringTime = x['time'] * 60  # seconds

                # print(wateringTime)
                print('Watering Time: ', wateringTime, ' seconds')
                pumping = True
                # ser.write("A".encode()) #Turn on pump
                onTime = curTime
                print('OnTime: ', onTime)
                flagWateringTime = True
                x['pumped'] = True
                # print(flagWateringTime)
    else:  # IRRIGATION_MANUAL
        print('In IRRIGATION_MANUAL')
        pumping = setPump


def check_wateringTime():
    # global ser
    global pumping
    global offTime
    global flagWateringTime

    # global wateringTime
    print('Current Time in check Watering: ', curTime)
    print('On Time in check Watering: ', onTime)
    print('wateringTime in check Watering: ', wateringTime)

    # print('wateringTime in check Watering: ', )
    if curTime - onTime > wateringTime:
        pumping = False
        # ser.write("a".encode()) #Turn off pump
        offTime = curTime
        flagWateringTime = False


isMicrobitConected = False

# count = 0


def evaluatePump(soil_cur):
    global plantType
    global selectedPlant
    if (selectedPlant == "GROUND_NUTS"):
        return soil_cur > 400
    elif(selectedPlant == "WHEET"):
        return soil_cur > 500
    elif(selectedPlant == "GARDEN_FLOWERS"):
        return soil_cur > 600
    elif(selectedPlant == "MAIZE"):
        return soil_cur > 400
    elif(selectedPlant == "PADDY"):
        return soil_cur > 500
    elif(selectedPlant == "POTATO"):
        return soil_cur > 600
    elif(selectedPlant == "PULSE"):
        return soil_cur > 400
    elif(selectedPlant == "COFFEE"):
        return soil_cur > 500


def saveSensorData():
    global soil_cur
    global temp_cur
    global humi_cur
    global cur_date

    if soil_cur is not None and temp_cur is not None and humi_cur is not None and selectedPlant is not None:
        cur_day = datetime.datetime.now()
        month = cur_day.month
        year = cur_day.year
        soil_cur_2 = int(1024 - soil_cur * 1024/100)

        path = f'Gateway/AI/RetrainData/data_{month}_{year}.csv'

        with open(path, mode='a', newline='') as employee_file:
            employee_writer = csv.writer(
                employee_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

            typ = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            typ[Plantype().value - 1] = 1
            data = [days_between_dates(selectedDate, cur_date),
                    soil_cur_2, temp_cur, humi_cur, int(evaluatePump(soil_cur_2))] + typ
            employee_writer.writerow(data)


def retrainModel():
    global model
    global last_update
    if model is not None:
        cur_day = datetime.datetime.now()
        month = cur_day.month
        year = cur_day.year
        tdelta = cur_day - last_update

        file_list = []

        for i in range(1):
            m = month - i
            y = year
            if m <= 0:
                m = 12 + m
                y = year - 1
            name = f"data_{m}_{y}.csv"

            if os.path.exists(DIC_PATTH + '/AI/RetrainData/' + name):
                file_list += [name]

        if(tdelta.total_seconds() > 30*24*60*60):
            last_update = cur_day

            retrain_model = model.loadModel(
                DIC_PATTH + '/AI/irrigationModel_v5.joblib')
            # 3 last months
            flag = False
            for path in file_list:
                flag = True
                accurary = model.retrainModel(
                    retrain_model, DIC_PATTH + f"/AI/RetrainData/{path}")
                print(accurary)

            if flag and accurary > 0.85:
                model.saveRetrainModel()


def updateTaskList():
    for task in taskList:
        time = 0
        repeat = task['selectedValue']

        if repeat == 'EveryDay':
            time = 1
        elif repeat == 'EveryWeek':
            time = 7

        if time > 0 and task['pumped'] is True and checkEqualTime(cur_date, cur_hour, task['date'], task['hour']) is False:
            task['pumped'] = False
            # update date
            date_object = datetime.datetime.strptime(task['date'], date_format)
            new_date = date_object + datetime.timedelta(days=time)
            task['date'] = new_date.strftime('%d-%m-%Y')


while True:
    # global ser
    # global cur_date
    # global cur_hour
    # if (count > 5):
    #     temp = round(random.uniform(20.0, 50.0),2)
    #     humi = round(random.uniform(70.0, 85.0),2)
    #     light_intesity = round(random.uniform(100.0, 300.0),0)
    #     soil_moisture = round(random.uniform(10.0, 45.0),2)
    #     count = 0
    #     collect_data = {'temperature': temp, 'humidity': humi, 'light': light_intesity, 'soilmoisture': soil_moisture}
    #     client.publish('v1/devices/me/telemetry', json.dumps(collect_data), 1)

    # print(isMicrobitConected)
    # print("while")
    # global curTime
    curTime = time.time()
    retrainModel()
    updateTaskList()

    # print('Current Time in While', )

    if isMicrobitConected:
        # print("reading serial")
        # check_wateringTime()
        readSerial()
    else:
        if getPort() != "None":
            global ser
            ser = serial.Serial(port=getPort(), baudrate=115200)
            isMicrobitConected = True

    current_time = datetime.datetime.now(pytz.timezone('Asia/Ho_Chi_Minh'))

    cur_date = current_time.strftime(date_format)
    cur_hour = current_time.strftime(hour_format)

    # print(type(cur_date))
    # print(type(cur_hour))
    # print(type(task[1]['date']))
    # print(type(task[1]['hour']))

    # if (cur_hour == task[1]['date']):
    #     print('')
    # print(checkEqualTime(cur_date, cur_hour, task[1]['date'],task[1]['hour']))

    controller()
    if flagWateringTime:
        check_wateringTime()

    if (OldPumping != pumping):
        # global ser
        if pumping:
            print('Turn on pump')
            ser.write("A".encode())  # Turn on pump
        else:
            print('Turn off pump')
            ser.write("a".encode())  # Turn off pump
        OldPumping = pumping

    # count +=1
    time.sleep(1)
