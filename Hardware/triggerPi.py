from take_photo import *
from sonar import *
from servoMotor import *
from led import *
from lcd import *
#from pigpioServo import *
import json
import requests
import time
import base64
import pigpio

binID = 1
categoriesDict = {'recycling': 0, 'compost': 1, 'garbage': 2}
compostState = False
recyclingState = False
garbageState = False
automaticMode = True

def main():
    while (True):
        while(automaticMode):
            #Sets distance at an arbitrarily large int
            objectDistance = 9999999

            #Checks for object in proximity to trigger
            while (objectDistance > 50 and automaticMode):
                objectDistance = getSonarDistance()
                automaticMode = modePostReq(binID)

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
                updateLCD(binString)
                openBin(binNumber)
            time.sleep(0.1)
            
        #When automatic mode is turned off then allow for force opens 
        if (not automaticMode):
            if (compostState):
                openBin(0)
            if (recyclingState):
                openBin(1)
            if (garbageState):
                openBin(2)

main()
