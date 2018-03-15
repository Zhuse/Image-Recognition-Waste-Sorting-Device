import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM) #BOARD??

#Specify Pins, changle later
TRIG = 23
ECHO = 24

#Distance measuring
GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)
GPIO.output(TRIG, False)

#Sensor Settling
time.sleep(2)

#Sensor pulse
GPIO.output(TRIG, True)
time.sleep(0.00001)
GPIO.output(TRIG, False)

#Listen to echo pin
while GPIO.input(ECHO)==0
pulse_start = time.time()

#Signal is recieved
while GPIO.input(ECHO)==1
pulse_end = time.time()

#Calculate and print distance
pulse_duration = pulse_end - pulse_start
distance = round(distance, 2)
print "Distance",distance,"cm"

GPIO.cleanup()