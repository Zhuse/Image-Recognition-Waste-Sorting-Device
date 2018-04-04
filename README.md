

**The Image Recognition Waste Sorting Device is a simple and effective solution to improper waste management, that uses AWS Rekognition to categorize trash and open the correct bin (Garbage, Recycling or Compost) for proper trash disposal.**


----------


Implemented functionalities:

-   Waste categorization using image recognition
    
-   Waste bin has two operation modes, automatic and manual:
    

-   Automatic:
    

-   	Opens the correct bin (i.e. garbage, recycling, or compost) based on the type of waste thrown away
    
-   	Remembers the previous state of each bin when it was in manual mode
    




-   Manual:
    

-  	 	User can manually toggle each bin open and closed
    
-   	Manual control done through both the website and app
    
-   	Shows a log of when each bin was accessed
    
-   	User can access different bins using their respective ids
    

-   Log kept of when each bin was accessed
    
-   Supports multiple waste bins using a unique id assigned to each bin
    
-   Count of the number of items that have been deposited into the bins and reset button
    

  


----------


Technologies:

-   Server:
    

-   	AWS Rekognition
    
-   	Ubuntu 16.04 VPS (on AWS Lightsail)
    
-   	Node.js
    
-   	Express
    
-   	SQLite
    
-  		 Languages: Javascript / SQL
    

-   Website:
    

-   	Bootstrap
    
-   	jQuery
    
-   	Chart.js
    
-   	Languages: HTML / CSS / Javascript
    

-   Mobile app:
    

-   	React Native
    
-   	Languages: Javascript
    

-   Raspberry Pi:
    

-   	Pigpio daemon (software timed PWM)
    
-   	Requests package
    
-   	Languages: Python


----------
