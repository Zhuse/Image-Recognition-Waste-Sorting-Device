const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');

var port = 3000;

app.use(bodyParser.json());

app.use(express.static('./public'));  // this sends clientside files

var rekognition = new AWS.Rekognition();

// starting server
app.listen(port, function(){
    console.log("Server listening on port " + port);
});

app.post('/recogniton', function(request, response){
});
