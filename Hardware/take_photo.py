from time import sleep
from picamera import PiCamera
import http.client
import json
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

def postServer(base64Image):
    connection = http.client.HTTPSConnection('api.github.com')
    headers = {'Content-type' : 'application/json'}

    jsonImage = {'base64Image': base64Image}
    json_foo = json.dumps(jsonImage)

    connection.request('POST', '/markdown', json_foo, headers)

    response = connection.getresponse()
    print(response.read().decode())
