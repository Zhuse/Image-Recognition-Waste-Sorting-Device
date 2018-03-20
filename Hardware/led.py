from gpiozero import LED
from time import sleep

def ledFlash():
    #initialize LED
    led1 = LED(21)

    #turn LEDs on then off in a five second interval 
    led1.off()
    sleep(2)
    led1.on()

def ledSignal(distance):
    #initialize LED
    led1 = LED(21)

    if distance < 3: #if bin is full, turn LED on
        led1.off()
    else:
        led1.on() #turn LED off otherwise
    
