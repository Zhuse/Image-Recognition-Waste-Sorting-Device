const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const fs = require('fs'); //file processing

// load config before setting up AWS services
AWS.config.loadFromPath('config.json');
const recog = new AWS.Rekognition();
const s3 = new AWS.S3(); //amazon cloud storage service

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('stats.db');

// export modules we need
module.exports.AWS = AWS;
module.exports.recog = recog;
module.exports.fs = fs;
module.exports.db = db;
module.exports = {
	AWS,
	recog,
	fs,
	db
};

const recognitionController = require('./controllers/image-recognition-controller.js'); //Import recog controller

const port = 3000; //Server port

app.use(express.json()); //to support JSON-encoded bodies
app.use(express.static('./public')); // this sends clientside files
app.use(require('./routes.js')); //Use all routes defined in routes.js

// starting server
app.listen(port, function() {
    console.log("Server listening on port " + port);
});
