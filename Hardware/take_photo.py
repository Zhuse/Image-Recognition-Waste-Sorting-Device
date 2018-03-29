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
#    i = 0
 #   subprocess.call("fswebcam -d /dev/video0 -r 1024x768 -S0 "+str(i)+"pic.jpg",shell=True)


    sleep(2)
    camera.capture('test_photo.jpg')

def convertToBase64(fileName):
    with open(fileName, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        return encoded_string

def postServer(base64Image):
    connection = http.client.HTTPSConnection('34.218.219.101:3000')
    headers = {'Content-type' : 'application/json'}

    jsonImage = {'base64Image': base64Image}
    json_foo = json.dumps(jsonImage)

    connection.request('POST', '/recognition', json_foo, headers)

    response = connection.getresponse()
    print(response.read().decode())

def altPostServer(base64Image):
    payload = {'base64': str(base64Image)}
    r = requests.post('http://34.218.219.101:3000/recognition', json=payload)
    print (r.text)
    return r

