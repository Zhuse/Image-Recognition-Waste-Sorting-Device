from gpiozero import LED
from time import sleep

#initialize LED
led1 = LED(21)

#turn leds off
led1.on()

#turn leds on then off in a five second interval 
sleep(5)
led1.off()
sleep(5)
led1.on()
