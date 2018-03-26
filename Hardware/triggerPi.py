from take_photo import *
from sonar import *
from servoMotor import *
from led import *
#froom uploadImage import *
import json
import requests
import time
import base64

objectDistance = 9999999

#setupGPIO()
while objectDistance > 50:
    objectDistance = getSonarDistance()

if (objectDistance < 50):
    greenOn()
    capturePic()
    greenOff()
    base64String = convertToBase64("test_photo.jpg")
    time.sleep(1)
    altPostServer(base64String)  

    binNumber = requestRet[open_bin]
    openBin(binNumber)

openBin(1)
openBin(3)

GPIOCleanup()
