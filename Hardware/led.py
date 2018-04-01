from gpiozero import LED
from time import sleep

ledRed = LED(11)
ledGreen = LED(14)
ledBlue = LED(15)

ledF = LED(21) #initialize each segment of seven segment display
ledG = LED(20)
ledE = LED(16)
ledD = LED(12)
ledDP = LED(26)
ledC = LED(19)
ledB = LED(13)
ledA = LED(22)

def segOff():   
    ledF.on() #turn all segments off
    ledG.on()
    ledE.on()
    ledD.on()
    ledDP.on()
    ledC.on()
    ledB.on()
    ledA.on()

def segC():
    ledF.off()
    ledG.on()
    ledE.off()
    ledD.off()
    ledDP.on()
    ledC.on()
    ledB.on()
    ledA.off()

def segG():
    ledF.off()
    ledG.off()
    ledE.on()
    ledD.off()
    ledDP.on()
    ledC.off()
    ledB.off()
    ledA.off()

def segR():
    ledF.off()
    ledG.on()
    ledE.off()
    ledD.on()
    ledDP.on()
    ledC.on()
    ledB.on()
    ledA.off()

def updateSeg(bin):
    if bin == 'compost':
        segC()
    elif bin == 'garbage':
        segG()
    elif bin == 'recycling':
        segR()
    else:
        segOff()
    sleep(5)
    segOff()

def greenOn():
    ledGreen.off()

def greenOff():
    ledGreen.on()
    
