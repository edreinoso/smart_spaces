import boto3
import random
import string
import time
from datetime import datetime
from datetime import timedelta
from dateutil.tz import *

# variable generators
room = [{"sensor_id": "s10", "roomId": 1, "floor": "3", "roomName": "Stark Room", "section": "Blue"}, {"sensor_id": "s61", "roomId": 2,  "floor": "1", "roomName": "Lannister Room", "section": "Red"}, {"sensor_id": "s45", "roomId": 3,  "floor": "2","roomName": "Tully Room", "section": "Orange"}, {"sensor_id": "s33", "roomId": 4,  "floor": "2", "roomName": "Baratheon Room", "section": "Green"}, {"sensor_id": "s87", "roomId": 5,  "floor": "1", "roomName": "Arroz con Mango", "section": "Green"}]

client = boto3.client('sqs')
sensor_id = "1"
queueUrl = "	https://sqs.us-east-1.amazonaws.com/130193131803/SensorQueue_new"
randomId = ""
currentTime = ""
expire = ""
now = ""

for x in range(10):  # this is going to run only 10 times
    # while True:  # this is going to run forever
    randomNum = random.randrange(5)
    randomId = ''.join(
        [random.choice(string.ascii_letters + string.digits) for n in range(10)])
    currentTime = datetime.utcnow()

    print('sensor_id: ' + str(room[randomNum]['sensor_id']) + ' roomId: ' + str(room[randomNum]['roomId']) + ' floor: ' + str(room[randomNum]['floor']) + ' time: ' + str(currentTime.strftime("%Y-%m-%dT%H:%M:%SZ")))

    # SQS send command
    response = client.send_message(
        QueueUrl=queueUrl,
        MessageBody="Hello World, first Queue",
        MessageAttributes={
            'roomId': {
                'StringValue': str(room[randomNum]["roomId"]),
                # 'StringValue': randomId,
                'DataType': 'String'
            },
            'sensorId': {
                'StringValue': str(room[randomNum]["sensor_id"]),
                'DataType': 'String'
            },
            'timestamp':  {
                'StringValue': str(currentTime.strftime("%Y-%m-%dT%H:%M:%SZ")),
                'DataType': 'String'
            },
            'floor': {
                'StringValue': str(room[randomNum]["floor"]),
                'DataType': 'String'
            },
            'roomName': {
                'StringValue': str(room[randomNum]["roomName"]),
                'DataType': 'String'
            },
            'section': {
                'StringValue': str(room[randomNum]["section"]),
                'DataType': 'String'
            },
        }
    )

    time.sleep(5)
