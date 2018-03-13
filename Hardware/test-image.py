# Sample code for accessing webcam and OpenCV

# Camera import statements
from picamera.array import PiRGBArray
from picamera import PiCamera
import time
import cv2

#Initializing camera
camera = PiCamera()
rawCapture = PiRGBArray(camera)

#Delay for camera warmup
time.sleep(0.1)

#Taking a picture from camera
camera.capture(rawCapture, format="bgr")
image = rawCapture.array

cv2.imshow("Image", image)
cv2.waitKey(0)



