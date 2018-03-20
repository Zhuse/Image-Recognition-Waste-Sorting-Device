from time import sleep
from picamera import PiCamera
import http.client
import json
import base64
import requests


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
        return encoded_string

def postServer(base64Image):
    connection = http.client.HTTPSConnection('api.github.com')
    headers = {'Content-type' : 'application/json'}

    jsonImage = {'base64Image': base64Image}
    json_foo = json.dumps(jsonImage)

    connection.request('POST', '/markdown', json_foo, headers)

    response = connection.getresponse()
    print(response.read().decode())

def altPostServer(base64Image):
    API_ENDPOINT = "34.218.219.101:3000"
    r = requests.get(API_ENDPOINT, data = {'base_64': base64Image})
    return r

