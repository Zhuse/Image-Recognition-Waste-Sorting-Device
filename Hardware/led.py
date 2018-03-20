from gpiozero import LED
from time import sleep

#initialize LED
led1 = LED(21)
ledRed = LED(11)
ledGreen = LED(13)
ledBlue = LED(15)

def greenOn():
    ledGreen.off()

def greenOff()
    ledGreen.on()

def ledFlash():
    #turn LEDs on then off in a five second interval 
    led1.off()
    sleep(2)
    led1.on()

def ledSignal(distance):
    if distance < 3: #if bin is full, turn LED on
        led1.off()
    else:
        led1.on() #turn LED off otherwise
    
