import RPi.GPIO as GPIO
import time

garbagePin = 12
recyclingPin = 13
compostPin = 14
GPIO.setmode(GPIO.BCM)
GPIO.setup(garbagePin, GPIO.OUT)
GPIO.setup(recyclingPin, GPIO.OUT)
GPIO.setup(compostPin, GPIO.OUT)
garbageServo = GPIO.PWM(garbagePin, 50)
recyclingServo = GPIO.PWM(recyclingPin, 50)
compostServo = GPIO.PWM(compostPin, 50)
recyclingServo.start(2.5)
garbageServo.start(2.5)

def openBin(openBin):
    if openBin == 0: #Triggers compost pin
        compostServo.ChangeDutyCycle(7.5) #Opens up 90 degrees
        time.sleep(1)
        compostServo.ChangeDutyCycle(2.5)
    elif openBin == 1: #Triggers recycling pin
        recyclingServo.ChangeDutyCycle(7.5)
        time.sleep(1)
        recyclingServo.ChangeDutyCycle(2.5)
    else: #Triggers garbage pin
        garbageServo.ChangeDutyCycle(7.5)
        time.sleep(1)
        recyclingServo.ChangeDutyCycle(2.5)
    resetServo()

def resetServo():
    compostServo.ChangeDutyCycle(2.5)
    recyclingServo.ChangeDutyCycle(2.5)
    garbageServo.ChangeDutyCycle(2.5)

