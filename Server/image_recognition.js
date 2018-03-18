var AWS = require('aws-sdk');
var fs = require('fs'); //file processing
var path = require('path'); //path detection

AWS.config.loadFromPath('config.json');
var rekognition = new AWS.Rekognition();
var s3 = new AWS.S3(); //amazon cloud storage service

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: 'cpen291-g15', Key: '', Body: ''}; //Bucket name should be "cpen291-g15"
var file = process.argv[2];

var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;

uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
