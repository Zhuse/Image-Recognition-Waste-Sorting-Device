import RPi.GPIO as IO        # calling for header file for GPIO’s of PI

import time                           # calling for time to provide delays in program
IO.setwarnings(False)          # do not show any warnings
IO.setmode (IO.BCM)            # programming the GPIO by BCM pin numbers. (like PIN29 as‘GPIO5’)
IO.setup(13,IO.OUT)             # initialize GPIO19 as an output
p = IO.PWM(13,50)              # GPIO19 as PWM output, with 50Hz frequency
p.start(7.5)                             # generate PWM signal with 7.5% duty cycle
while 1:                                                       # execute loop forever                                    
    p.ChangeDutyCycle(7.5)                   # change duty cycle for getting the servo position to 90º
    time.sleep(1)                                      # sleep for 1 second
    p.ChangeDutyCycle(12.5)                  # change duty cycle for getting the servo position to 180º
    time.sleep(1)                                     # sleep for 1 second
    p.ChangeDutyCycle(2.5)                  # change duty cycle for getting the servo position to 0º
    time.sleep(1)                                     # sleep for 1 secondV
