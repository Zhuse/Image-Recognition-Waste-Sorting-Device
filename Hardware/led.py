from gpiozero import LED
from time import sleep

ledRed = LED(11)
ledGreen = LED(13)
ledBlue = LED(15)

def greenOn():
    ledGreen.off()

def greenOff():
    ledGreen.on()
    
