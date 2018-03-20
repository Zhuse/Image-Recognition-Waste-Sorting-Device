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
    base64String = convertToBase64("test_photo.jpg")
    requestRet = altPostServer(base64String)
    binNumber = requestRet[open_bin]
    openBin(binNumber)

openBin(1)
openBin(3)

GPIOCleanup()
