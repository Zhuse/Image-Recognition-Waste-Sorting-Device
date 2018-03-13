import RPi.GPIO as GPIO
import time

garbagePin = 12
recyclingPin = 13
compostPin = 14

class binOpen:
    def __init__(self):
        GPIO.setmode(GPIO.BOARD)

        GPIO.setup(garbagePin, GPIO.out)
        GPIO.setup(recyclingPin, GPIO.out)
        GPIO.setup(compostPin, GPIO.out)

        garbageServo = GPIO.PWM(garbagePin, 50)
        recyclingServo = GPIO.PWM(recyclingPin, 50)
        compostServo = GPIO.PWM(compostPin, 50)

    def openBin(openBin):
        if openBin == 0: #Triggers compost pin
            compostServo.ChangeDutyCycle(7.5) #Opens up 90 degrees
        elif openBin == 1: #Triggers recycling pin
            recyclingServo.ChangeDutyCycle(7.5)
        else: #Triggers garbage pin
            garbageServo.ChangeDutyCycle(7.5)
    
    def resetServo():
        compostServo.ChangeDutyCycle(2.5)
        recyclingServo.ChangeDutyCycle(2.5)
        garbageServo.ChangeDutyCycle(2.5)

