var AWS = require('aws-sdk');
var fs = require('fs'); //file processing
var path = require('path'); //path detection

AWS.config.loadFromPath('config.json');
var recog = new AWS.Rekognition();
var s3 = new AWS.S3(); //amazon cloud storage service

// call S3 to retrieve upload file to specified bucket
/*
var uploadParams = {Bucket: 'cpen291-g15', Key: '', Body: ''}; //Bucket name should be "cpen291-g15"
var file = process.argv[2];

var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
uploadParams.Key = path.basename(file);

s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});*/
let params = {};

let content = fs.readFileSync('test_pictures/doge.jpg');
params.Image = {
    Bytes: content
};

let faces = new Promise((resolve, reject) => {
    recog.detectFaces(params, function(err, data) {
        if (err) reject(err);
        console.log(data);
    });
});
let labels = new Promise((resolve, reject) => {
    recog.detectLabels(params, function(err, data) {
        if (err) reject(err);
        console.log(data);
    });
});
let modlabels = new Promise((resolve, reject) => {
    recog.detectModerationLabels(params, function(err, data) {
        if (err) reject(err);
        console.log(data);
    });
});
let celebs = new Promise((resolve, reject) => {
    recog.recognizeCelebrities(params, function(err, data) {
        if (err) reject(err);
        console.log(data);
    });
});

/*
return new Promise((resolve, reject) => {

    console.log('Attempting Amazon recog');
    Promise.all([faces, labels, modlabels, celebs]).then(values => {
        let faces = values[0];
        let labels = values[1];
        let modlabels = values[2];
        let celebs = values[3];
        let result = {
            faces: faces,
            labels: labels,
            modlabels: modlabels,
            celebs: celebs
        }
        resolve({
            "amazon": result
        });
    });
});
*/
