from take_photo import *
from sonar import *
from servoMotor import *
#from uploadImage import *

import base64

objectDistance = 9999999

#setupGPIO()

while objectDistance > 50:
    objectDistance = getSonarDistance()

if (objectDistance < 50):
    capturePic()
    #convertToBase64("test_photo.jpg")
openBin(1)
openBin(3)

GPIOCleanup()
