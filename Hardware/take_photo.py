from time import sleep
from picamera import PiCamera
import http.client
import json
import base64
import requests
import subprocess

camera = PiCamera()

def capturePic():
    camera.resolution = (1024, 768)
    camera.start_preview()
    sleep(2)
    camera.capture('test_photo.jpg')

def convertToBase64(fileName):
    with open(fileName, "rb") as image_file:
        #Encoding the image and returning the string
        encoded_string = base64.b64encode(image_file.read())
        return encoded_string

def imgPostReq(base64Image):
    #Build the payload for post request
    payload = {'base64': str(base64Image)}
    #Posts the server at the server ip
    r = requests.post('http://34.218.219.101:3000/recognition', json=payload)
    print (r.text)
    return r

def offCheckPostReq(binID):
    payload = {'ID': binID}
    r = requests.post('http://34.218.219.101:3000/recognition', json=payload)
    return r
