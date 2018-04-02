from RPLCD import CharLCD
import RPi.GPIO as GPIO

lcd = CharLCD(numbering_mode=GPIO.BCM,cols=16, rows=2, pin_rs=37, pin_e=35, pins_data=[33, 31, 29, 23])
lcd.write_string(u'Hello world!')
