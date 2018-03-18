from take_photo import *
from sonar import *
import base64

objectDistance = 9999999

#setupGPIO()

while objectDistance > 50:
    objectDistance = getSonarDistance()

if (objectDistance < 50):
    capturePic()
    #convertToBase64("test_photo.jpg")

GPIOCleanup()
