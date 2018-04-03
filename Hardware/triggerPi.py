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

#Converts true strings to boolean
def str_to_bool(s):
    if s == 'true' or s == 'True':
        return True
    elif s == 'false' or s == 'True':
        return False
    else: 
        return False

'''
Updates the states object from POSTing the server
Manually open each corresponding bin 
'''
def updateMode(states):
    #Post the server and receive response
    overrideJson = modePostReq(binID).json()
    #Checks for successful POST
    if (overrideJson["success"] == True):
        states.automaticMode = overrideJson["auto"]

        #Opens bin for manual mode 
        if (not states.automaticMode):
            segThree()
            #Sets the trash can states
            states.flag = True
            states.compostState = overrideJson["compostOpen"]
            states.recyclingState = overrideJson["recyclingOpen"]
            states.garbageState = overrideJson["garbageOpen"]
            #Triggers bins to open
            manualTriggerBin(categoriesDict['compost'], states.compostState)
            manualTriggerBin(categoriesDict['recycling'], states.recyclingState)
            manualTriggerBin(categoriesDict['garbage'], states.garbageState)
            time.sleep(0.1)

def main():
    #Resets all the states for the servo motor
    resetServo()
    states = ObjectStates()
    segOff()

    while (True):
        #Check for automatic mode and opens bins
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
                #If response is successful then open the bin and sets the 7-seg
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
            time.sleep(0.1)
            
        #When automatic mode is turned off then allow for force opens 
        updateMode(states) 

main()
