from time import sleep
from picamera import PiCamera

import base64

def capturePic():
    camera = PiCamera()
    camera.resolution = (1024, 768)
    camera.start_preview()

    sleep(2)
    camera.capture('test_photo.jpg')

def convertToBase64(fileName):
    with open(fileName, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        print (encoded_string)
