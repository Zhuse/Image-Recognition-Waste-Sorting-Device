from take_photo import *
from sonar import *
from servoMotor import *
from led import *
#from pigpioServo import *
import json
import requests
import time
import base64
import pigpio


def main():
    objectDistance = 9999999

    #PIopenBin(1);
    #PIopenBin(2);

    #setupGPIO()
    while objectDistance > 50:
        objectDistance = getSonarDistance()

    if (objectDistance < 50):
        greenOn()
        capturePic()
        greenOff()
        base64String = convertToBase64("test_photo.jpg")
        time.sleep(1)
        returnResponse = altPostServer(base64String)  

        binString = returnResponse[category]
        print (binString)
        binNumber = mapCategory(binString)
        openBin(binNumber)

    GPIOCleanup()

def mapCategory(category):
    if (category == 'recycling'): return 0
    if (category == 'compost'): return 1
    if (category == 'garbage'): return 2

main()
