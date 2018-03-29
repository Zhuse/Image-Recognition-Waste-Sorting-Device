#TODO: install the RPLCD library on Pi
#   sudo apt-get install pyton-pip
#   sudo pip install RPLCD

#Display is done in 4-bit mode (in case more hardware is added to the Pi later)

#intialize lcd
from RPLCD import CharLCD
import time
lcd = CharLCD(cols = 16, rows = 2, pin_rs = 37, pin_e = 35, pinds_data = [33, 31, 29, 23])

#update LCD message depending on which bin is open
def updateLCD(bin) {
    if bin == 'compost'
        lcd.write_string('Place Waste Inside Compost')
    elif bin == 'garbage'
        lcd.write_string('Place Waste Inside Garbage')
    elif bin == 'recycling'
        lcd.write_string('Place Waste Inside Recycling')
    else
        lcd.write_string('Place Waste Next to Webcam')
    
    time.sleep(5)
    lcd.clear()
}

#Default message on the LCD
def standbyLCD()
    lcd.write_string('Place Waste Next to Webcam')

#Clear message on LCD
def clearLCD()
    lcd.clear()