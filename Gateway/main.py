from irrigation import IrrigationModel, Plant

import serial.tools.list_ports
import paho.mqtt.client as mqtt
import time
import json
import datetime
import random


from Date import *

# for timezone()
import pytz

# using now() to get current time
date_format = '%d-%m-%Y'
hour_format = '%H:%M'
current_time = datetime.datetime.now(pytz.timezone('Asia/Ho_Chi_Minh'))
curTime = time.time()
last_update = ''

# AI model
model = IrrigationModel()

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
pumpIntervel = 20*60
wateringTime = float(0)
flagWateringTime = False
selectedPlant = 'POTATO'
Mode = IRRIGATION_MANUAL
setPump = False
plantType = 6
selectedDate = "01-01-2023"
temp_cur = 25
humi_cur = 80
light_cur = 100
soil_cur = 40

# task = [
#             {"amountOfWater" : "", "date" : "",  "hour" : ""},
#             {"amountOfWater" :"",  "date":"","hour":""}
#         ]

taskList = [
    {"amountOfWater": "1000", "date": "21-04-2023",  "hour": "15:30"},
    {"amountOfWater": "1200",  "date": "23-04-2023", "hour": "11:45"}
]


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
            temp_data['value'] = jsonobj['params']
            client.publish('v1/devices/me/attributes/SHARED_SCOPE',
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

    print(commPort)
    return commPort

# global isMicrobitConected


def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    try:
        if splitData[0] == "1":
            if splitData[1] == "TEMP":
                # client.publish("bbc-temp", splitData[2])
                # temp = splitData[2]
                # print(temp)
                collect_data = {'temperature': splitData[2]}
                global temp_cur
                temp_cur = splitData[2]
            elif splitData[1] == "HUMI":
                # client.publish("bbc-humi", splitData[2])
                # humi = splitData[2]
                collect_data = {'humidity': splitData[2]}
                global humi_cur
                humi_cur = splitData[2]

            elif splitData[1] == "SOIL":
                # soil_moisture = splitData[2]
                collect_data = {'soilmoisture': splitData[2]}
                global soil_cur
                soil_cur = splitData[2]
            elif splitData[1] == "LIGHT":
                # light_intesity = splitData[2]
                collect_data = {'light': splitData[2]}
                global light_cur
                light_cur = splitData[2]
        # elif splitData[0] == "2":
        #     if splitData[1] == "TEMP":
        #         client.publish("bbc-temp-2", splitData[2])
        #     elif splitData[1] == "HUMI":
        #         client.publish("bbc-humi-2", splitData[2])

        # collect_data = {'temperature': temp, 'humidity': humi, 'light': light_intesity, 'soilmoisture': soil_moisture}
        print(collect_data)
        client.publish('v1/devices/me/telemetry', json.dumps(collect_data), 1)

    except:  # if given data error
        pass


mess = ""


def readSerial():
    global ser
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            # print("readSerial")
            print(mess[start:end + 1])
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]


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
        plantType = Plant.GROUND_NUTS.value
    elif(selectedPlant == "WHEET"):
        plantType = Plant.WHEET.value
    elif(selectedPlant == "GARDEN_FLOWERS"):
        plantType = Plant.GARDEN_FLOWERS.value
    elif(selectedPlant == "MAIZE"):
        plantType = Plant.MAIZE.value
    elif(selectedPlant == "PADDY"):
        plantType = Plant.PADDY.value
    elif(selectedPlant == "POTATO"):
        plantType = Plant.POTATO.value
    elif(selectedPlant == "PULSE"):
        plantType = Plant.PULSE.value
    elif(selectedPlant == "COFFEE"):
        plantType = Plant.COFFEE.value
    return plantType


def controller():
    global pumping
    global wateringTime
    global onTime
    global Mode
    global flagWateringTime
    global model
    # global cur_date
    # global cur_hour
    # print(type(Mode))
    # print(IRRIGATION_AUTO, IRRIGATION_CALENDAR, IRRIGATION_MANUAL)
    # print(Mode == IRRIGATION_AUTO, Mode == IRRIGATION_CALENDAR, Mode == IRRIGATION_MANUAL)
    # global taskList

    if Mode == IRRIGATION_AUTO:  # Assign to AI Model

        # CropType, cropDays, soilMoisture, temp, humidity
        print('In IRRIGATION_AUTO')
        print('Type Plant:', selectedPlant)
        print('Number of days planted: ',
              days_between_dates(selectedDate, cur_date), )
        data = [Plantype(), days_between_dates(selectedDate, cur_date),
                soil_cur, temp_cur, humi_cur]
        pumping = model.doIrrigate(data)

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
            if checkEqualTime(cur_date, cur_hour, x['date'], x['hour']) and flagWateringTime == False:
                print('Tuoi lich', x['hour'], x['date'])
                wateringTime = (
                    float(x['amountOfWater']) / fLowPump) * 60  # seconds
                # print(wateringTime)
                print('Watering Time: ', wateringTime, ' seconds')
                pumping = True
                # ser.write("A".encode()) #Turn on pump
                onTime = curTime
                print('OnTime: ', onTime)
                flagWateringTime = True
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


def retrainModel(curTime):
    global model
    global last_update

    tdelta = curTime - last_update
    if(tdelta.total_seconds > 14*24*60*60):
        last_update = curTime

        retrain_model = model.loadModel('irrigationModel.joblib')
        # 3 last months
        for i in [1, 2, 3]:
            accurary = model.retrainModel(
                retrain_model, f"AI/Dataset/retrain_{i}.csv")
            print(accurary)

        model.saveRetrainModel()


def main():
    global model
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
        retrainModel(curTime)

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
                # ser.write("A".encode()) #Turn on pump
            else:
                print('Turn off pump')
                # ser.write("a".encode()) #Turn off pump
            OldPumping = pumping

        # count +=1
        time.sleep(1)
