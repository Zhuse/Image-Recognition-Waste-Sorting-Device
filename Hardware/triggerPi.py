from take_photo import *
from sonar import *
from servoMotor import *
from led import *
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

def str_to_bool(s):
    if s == 'true' or s == 'True':
        return True
    elif s == 'false' or s == 'True':
        return False
    else: 
        return False

def updateMode(manualFlag):
    overrideJson = modePostReq(binID).json()
    if (overrideJson["success"] == True):
        automaticMode = overrideJson["auto"]

        if (not automaticMode):
            manualFlag = False
            compostState = overrideJson["compostOpen"]
            recyclingState = overrideJson["recyclingOpen"]
            garbageState = overrideJson["garbageOpen"]
            manualTriggerBin(0, compostState)
            manualTriggerBin(1, recyclingState)
            manualTriggerBin(2, garbageState)
            time.sleep(0.1)
        else:
            if(manualFlag == False):
                resetServo()
                manualFlag = True
                time.sleep(0.1)

        return manualFlag

def main():
    manualFlag = False
    resetServo()
    while (True):
        while(automaticMode):
            resetServo()
            time.sleep(0.5)
            #Sets distance at an arbitrarily large int
            objectDistance = 9999999

            #Checks for object in proximity to trigger
            while (objectDistance > 50 and automaticMode):
                objectDistance = getSonarDistance()
                manualFlag = updateMode(manualFlag)

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
                if (str_to_bool(responseJson["success"])):
                    binString = responseJson["category"]
                    print (binString)
                    binNumber = categoriesDict[binString]
                    print ("Opening" + str(binNumber))
                    #display bin on seven segment led
                    updateSeg(binString)
                    openBin(binNumber)
            time.sleep(0.1)
            
        manualFlag = updateMode(manualFlag) 
        #When automatic mode is turned off then allow for force opens 
    
       # if (not automaticMode):
def manualOpen():
    
    print ("Manually open")
    #openBin(0)
main()
