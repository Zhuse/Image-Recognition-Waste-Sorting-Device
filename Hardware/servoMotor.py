import RPi.GPIO as GPIO
import time
import pigpio
from led import *

garbagePin = 27
recyclingPin = 13
compostPin = 12
GPIO.setmode(GPIO.BCM)
pi = pigpio.pi()

def openBin(openBin):
    if openBin == 0: #Triggers compost pin
        pi.set_servo_pulsewidth(compostPin, 2000)
        time.sleep(3)
        pi.set_servo_pulsewidth(compostPin, 500)
    elif openBin == 1: #Triggers recycling pin
        pi.set_servo_pulsewidth(recyclingPin, 2000)
        time.sleep(3)
        pi.set_servo_pulsewidth(recyclingPin, 500)
    else: #Triggers garbage pin
        pi.set_servo_pulsewidth(garbagePin, 2000)
        time.sleep(3)
        pi.set_servo_pulsewidth(garbagePin, 500)

def manualTriggerBin(openBin, binState):
    if openBin == 0:
        if (binState):
            pi.set_servo_pulsewidth(compostPin, 2000)
            updateSeg("compost")
        else:
            pi.set_servo_pulsewidth(compostPin, 500)
            segOff()

    if openBin == 1:
        if (binState):
            pi.set_servo_pulsewidth(recyclingPin, 2000)
            updateSeg("recycling")
        else:
            pi.set_servo_pulsewidth(recyclingPin, 500)
            segOff()

    if openBin == 2:
        if (binState):
            pi.set_servo_pulsewidth(garbagePin, 2000)
            updateSeg("garbage")
        else:
            pi.set_servo_pulsewidth(garbagePin, 500)
            segOff()


def resetServo():
    pi.set_servo_pulsewidth(compostPin, 500)
    pi.set_servo_pulsewidth(recyclingPin, 500)
    pi.set_servo_pulsewidth(garbagePin, 500)

