from time import sleep
from picamera import PiCamera
import socket
from threading import *

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

def uploadServer():
    serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    host = "192.168.1.3"
    port = 8000
    print (host)
    print (port)
    serversocket.bind((host, port))

class client(Thread):
    def __init__(self, socket, address):
        Thread.__init__(self)
        self.sock = socket
        self.addr = address
        self.start()

        def run(self):
            while 1: 
                print ('Client sent:', self.sock.recv(1024).decoded())
                self.sock.send(b'Send')

serversocket.listen(5)
print ('Server started and listening')
while 1:
    clientsocket, address = serversocket.accept()
    client(cliensocket, address)
