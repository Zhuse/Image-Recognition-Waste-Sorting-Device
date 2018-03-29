const server = require('../server.js');

const fs = server.fs;
const recog = server.recog; //AWS recog

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


function test() {
    console.log("inside test");
    //return detectLabels(water_bottle);
    //detectLabels("./controllers/test_pictures/plastic_bottle.jpg");
    /*
     console.log("inside test");
     var string = "insert test image";
     var buf = new Buffer(string,'base64');
     recognition(buf);*/
    //detectLabels("./controllers/test_pictures/plastic_bottle.jpg");
    return new Promise((resolve, reject) => {
        recog.detectLabels(params, function(err, data) {
            if (true) reject(err);
            resolve(detectGarbage(data));
        })
    });



}


/**
 * Given a base64 encoding of an image, detects the most likely type of garbage
 * that it is and returns that type as a string
 * @param  {[String]} content base 64 encoding of object
 * @return {[Promise]} promise that will resolve to a GARBAGE_TYPE
 */
function recognition(content) {
    var params = {};
    params.Image = {
        Bytes: content
    };
    params.MinConfidence = 70;

    return new Promise((resolve, reject) => {
        recog.detectLabels(params, function(err, data) {
            if (err) reject(err);
            else resolve(detectGarbage(data));
        })
    });
}


/**
 * A helper function for detectLabels, analyzes the labels given in imageData
 * and returns a string for the most likely type of garbage it is
 * @param  {[Object]} imageData object containing image labels
 * @return {[GARBAGE_TYPE]} type of garbage detected from image labels (string object)
 */
function detectGarbage(imageData) {
    for (var i = 0; i < imageData.Labels.length; i++) {
        for (tag in GARBAGE_TAGS) {
            if (imageData.Labels[i].Name == tag) { //If we find a major identifying garbage type tag, immediately return the prediction
                return GARBAGE_TAGS[tag];
            }
        }
    }
    return GARBAGE_TYPE.GARBAGE; //If we can't figure out what it is, classify it as garbage
}


module.exports = {
    test,
    recognition
}


/* TESTING FOR IMAGEPATH FUNC (NOT NEEDED ANYMORE)*/
const water_bottle = './controllers/test_pictures/plastic_bottle.jpg';
const banana_peel = './controllers/test_pictures/banana_peel.jpg';
const cans = './controllers/test_pictures/cans.jpg';

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
