const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');

var port = 3000;

app.use(bodyParser.json());

app.use(express.static('./public'));  // this sends clientside files

AWS.config.loadFromPath('config.json');
var rekognition = new AWS.Rekognition();
var s3 = new AWS.S3(); //amazon cloud storage service

// starting server
app.listen(port, function(){
    console.log("Server listening on port " + port);
});

app.post('/recogniton', function(request, response){
});

// Call S3 to list current buckets
s3.listBuckets(function(err, data) {
   if (err) {
      console.log("Error", err);
   } else {
      console.log("Bucket List", data.Buckets);
   }
});
