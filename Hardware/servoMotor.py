import RPi.GPIO as GPIO
import time
import pigpio

garbagePin = 12
recyclingPin = 13
compostPin = 27
GPIO.setmode(GPIO.BCM)
pi = pigpio.pi()

def openBin(openBin):
    if openBin == 0: #Triggers compost pin
        pi.set_servo_pulsewidth(compostPin, 2000)
        time.sleep(1)
        pi.set_servo_pulsewidth(compostPin, 500)
    elif openBin == 1: #Triggers recycling pin
        pi.set_servo_pulsewidth(recyclingPin, 2000)
        time.sleep(1)
        pi.set_servo_pulsewidth(recyclingPin, 500)

    else: #Triggers garbage pin
        pi.set_servo_pulsewidth(garbagePin, 2000)
        time.sleep(1)
        pi.set_servo_pulsewidth(garbagePin, 500)

def manualTriggerBin(openBin, binState):
    if openBin == 0:
        if (binState):
            pi.set_servo_pulsewidth(compostPin, 2000)
        else:
            pi.set_servo_pulsewidth(compostPin, 500)
    if openBin == 1:
        if (binState):
            pi.set_servo_pulsewidth(recyclingPin, 2000)
        else:
            pi.set_servo_pulsewidth(recyclingPin, 500)
    if openBin == 2:
        if (binState):
            pi.set_servo_pulsewidth(garbagePin, 2000)
        else:
            pi.set_servo_pulsewidth(garbagePin, 500)


def resetServo():
    pi.set_servo_pulsewidth(compostPin, 500)
    pi.set_servo_pulsewidth(recyclingPin, 500)
    pi.set_servo_pulsewidth(garbagePin, 500)
