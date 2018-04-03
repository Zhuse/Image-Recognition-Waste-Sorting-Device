import RPi.GPIO as GPIO
import time

def getSonarDistance():
    GPIO.setmode(GPIO.BCM) #Sets broadcom GPIO pins
    GPIO.setwarnings(False)

    TRIG = 18
    ECHO = 24

    #Distance measuring
    GPIO.setup(TRIG, GPIO.OUT)
    GPIO.setup(ECHO, GPIO.IN)
    GPIO.output(TRIG, False)

    time.sleep(2)
    #Sensor pulse
    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)

    #Listen to echo pin
    while GPIO.input(ECHO)==0:
        pulse_start = time.time()

    #Signal is recieved
    while GPIO.input(ECHO)==1:
        pulse_end = time.time()

    #Calculate and print distance
    pulse_duration = pulse_end - pulse_start
    distance = (pulse_duration * 34300) /2
    print ("Distance",distance,"cm")

    return distance

def GPIOCleanup():
    GPIO.cleanup()
