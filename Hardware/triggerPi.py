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
    while(True):
        objectDistance = 9999999

        #PIopenBin(1);
        #PIopenBin(2);

        while objectDistance > 50:
            objectDistance = getSonarDistance()

        if (objectDistance < 50):
            greenOn()
            capturePic()
            greenOff()
            base64String = convertToBase64("test_photo.jpg")
            time.sleep(0.5)
            returnResponse = altPostServer(base64String)  
            responseJson = returnResponse.json()
            binString = responseJson["category"]
            print (binString)
            binNumber = mapCategory(binString)
            print ("Opening" + str(binNumber))
            openBin(binNumber)
        time.sleep(0.1)

def mapCategory(category):
    if (category == 'recycling'): return 0
    if (category == 'compost'): return 1
    if (category == 'garbage'): return 2

main()
