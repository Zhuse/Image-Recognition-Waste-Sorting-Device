//var AWS = require('aws-sdk');
//AWS.config.loadFromPath('config.json');
//var fs = require('fs'); //file processing
//var recog = new AWS.Rekognition();

const server = require('../server.js');

const fs = server.js;
const recog = server.recog;

//Enums for garbage types
const GARBAGE_TYPE = Object.freeze({
    GARBAGE: "garbage",
    RECYCLING: "recycling",
    COMPOST: "compost"
});

//Possible tags and their garbage classification
const GARBAGE_TAGS = {
    "Produce": GARBAGE_TYPE.COMPOST,
    "Food": GARBAGE_TYPE.COMPOST,
    "Plant": GARBAGE_TYPE.COMPOST,
	"Bottle": GARBAGE_TYPE.RECYCLING,
	"Beverage": GARBAGE_TYPE.RECYCLING,
	"Aluminium": GARBAGE_TYPE.RECYCLING,
	"Tin": GARBAGE_TYPE.RECYCLING
};

/**
 * Given an image, detects the most likely type of garbage that it is
 * and returns that type as a string
 * @param  {[String]} imagePath location of image to detect
 * @return {[Promise]} promise that will resolve to a GARBAGE_TYPE
 */
function detectLabels(imagePath) {
    var params = {};
    var content = fs.readFileSync(imagePath);
    params.Image = {
        Bytes: content
    };
    params.MinConfidence = 70;

    return new Promise((resolve, reject) => {
        recog.detectLabels(params, function(err, data) {
            if (err) reject(err);
            resolve(detectGarbage(data));
        });
    });
}

/**
 * A helper function for detectLabels, analyzes the labels given in imageData
 * and returns a string for the most likely type of garbage it is
 * @param  {[Object]} imageData object containing image labels
 * @return {[GARBAGE_TYPE]} type of garbage detected from image labels (string object)
 */
function detectGarbage(imageData) {
	console.log(imageData.Labels);
    for (var i = 0; i < imageData.Labels.length; i++) {
        for (tag in GARBAGE_TAGS) {
            if (imageData.Labels[i].Name == tag) { //If we find a major identifying garbage type tag, immediately return the prediction
                return GARBAGE_TAGS[tag];
            }
        }
    }
    return GARBAGE_TYPE.GARBAGE; //If we can't figure out what it is, classify it as garbage
}

/* TESTING */
const water_bottle = 'test_pictures/plastic_bottle.jpg';
const banana_peel = 'test_pictures/banana_peel.jpg';
const cans = 'test_pictures/cans.jpg';

/******EXAMPLE USAGE OF PROMISE******/
detectLabels(water_bottle).then(function(res) {
    console.log(res) //res holds garbage_type info
});
detectLabels(banana_peel).then(function(res) {
    console.log(res)
});
detectLabels(cans).then(function(res) {
    console.log(res)
});
