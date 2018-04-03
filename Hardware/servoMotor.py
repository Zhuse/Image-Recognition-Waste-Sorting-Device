import RPi.GPIO as GPIO
import time
import pigpio
from led import *

garbagePin = 27
recyclingPin = 13
compostPin = 12
GPIO.setmode(GPIO.BCM)
pi = pigpio.pi()

#Opens the bin for automatic mode
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

#Opens the bin for manual mode
def manualTriggerBin(openBin, binState):
    if openBin == 0:
        if (binState): #Opens bin
            pi.set_servo_pulsewidth(compostPin, 2000)
        else: #Closes bin
            pi.set_servo_pulsewidth(compostPin, 500)

    if openBin == 1:
        if (binState): #Opens bin
            pi.set_servo_pulsewidth(recyclingPin, 2000)
        else: #Closes bin
            pi.set_servo_pulsewidth(recyclingPin, 500)

    if openBin == 2:
        if (binState): #Opens bin
            pi.set_servo_pulsewidth(garbagePin, 2000)
        else: #Close bin
            pi.set_servo_pulsewidth(garbagePin, 500)


#Resets all servo mode to neutral state
def resetServo():
    pi.set_servo_pulsewidth(compostPin, 500)
    pi.set_servo_pulsewidth(recyclingPin, 500)
    pi.set_servo_pulsewidth(garbagePin, 500)

