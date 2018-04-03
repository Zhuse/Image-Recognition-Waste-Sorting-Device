from take_photo import *
from sonar import *
from servoMotor import *
from led import *
from objectStates import *
import json
import requests
import time
import base64
import pigpio

binID = 1
categoriesDict = {'recycling': 0, 'compost': 1, 'garbage': 2}

def str_to_bool(s):
    if s == 'true' or s == 'True':
        return True
    elif s == 'false' or s == 'True':
        return False
    else: 
        return False

def updateMode(states):
    overrideJson = modePostReq(binID).json()
    if (overrideJson["success"] == True):
        states.automaticMode = overrideJson["auto"]

        if (not states.automaticMode):
            segThree()
            states.flag = True
            states.compostState = overrideJson["compostOpen"]
            states.recyclingState = overrideJson["recyclingOpen"]
            states.garbageState = overrideJson["garbageOpen"]
            manualTriggerBin(categoriesDict['compost'], states.compostState)
            manualTriggerBin(categoriesDict['recycling'], states.recyclingState)
            manualTriggerBin(categoriesDict['garbage'], states.garbageState)
            time.sleep(0.1)

def main():
 #   manualFlag = False
#    resetServo()
    states = ObjectStates()
    segOff()

    while (True):
        while(states.automaticMode):
            if (states.flag):
                resetServo()
                time.sleep(1)
                states.flag = False

            #Sets distance at an arbitrarily large int
            objectDistance = 9999999

            #Checks for object in proximity to trigger
            while (objectDistance > 50 and states.automaticMode):
                segOff()
                print ("auto mode is " + str(states.automaticMode))
                objectDistance = getSonarDistance()
                updateMode(states)

            #If object is close enough then perform actions
            if (objectDistance < 50):
                capturePic()
                #Base64 preparation before post
                base64String = convertToBase64("test_photo.jpg")
                #Delay to ensure image is taken properly
                time.sleep(0.5)
                #Post server and receive response
                returnResponse = imgPostReq(base64String)  
                responseJson = returnResponse.json()
                if (responseJson["success"]):
                    binString = responseJson["category"]
                    print (binString)
                    binNumber = categoriesDict[binString]
                    segOff()
                    time.sleep(0.1)
                    updateSeg(binString)
                    openBin(binNumber)
                    segOff()
                    print ("Opening" + str(binNumber))
                    #display bin on seven segment led
            time.sleep(0.1)
            
        updateMode(states) 
        #When automatic mode is turned off then allow for force opens 
    

main()
