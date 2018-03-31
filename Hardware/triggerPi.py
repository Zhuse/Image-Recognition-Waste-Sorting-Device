from take_photo import *
from sonar import *
from servoMotor import *
from led import *
from lcd import *
import json
import requests
import time
import base64
import pigpio

binState = 1

def main():
    while(True):
        #Sets distance at an arbitrarily large int
        objectDistance = 9999999

        #Checks for object in proximity to trigger
        while objectDistance > 50 and binState == 1:
            objectDistance = getSonarDistance()
            binState = offCheckReq(1)

        #If object is close enough then perform actions
        if (objectDistance < 50):
            #LED trigger
            greenOn()
            capturePic()
            greenOff()
            #Base64 preparation before post
            base64String = convertToBase64("test_photo.jpg")
            #Delay to ensure image is taken properly
            time.sleep(0.5)
            #Post server and receive response
            returnResponse = imgPostReq(base64String)  
            responseJson = returnResponse.json()
            binString = responseJson["category"]
            print (binString)
            binNumber = categoriesDict[binString]
            print ("Opening" + str(binNumber))
            #LCD updates then bin trigger
            updataLCD(binString)
            openBin(binNumber)
        time.sleep(0.1)

categoriesDict = {'recycling': 0, 'compost': 1, 'garbage': 2}

main()
