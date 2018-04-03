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
  "Pen": GARBAGE_TYPE.GARBAGE,
  "Cushion": GARBAGE_TYPE.GARBAGE,
  "Home Decor": GARBAGE_TYPE.GARBAGE,
  "Toy": GARBAGE_TYPE.GARBAGE,
  "Bag": GARBAGE_TYPE.GARBAGE,
  "Electronics": GARBAGE_TYPE.GARBAGE,
  "Clock": GARBAGE_TYPE.GARBAGE,
  "Computer Hardware": GARBAGE_TYPE.GARBAGE,
  "Hardware": GARBAGE_TYPE.GARBAGE,
  "Ball": GARBAGE_TYPE.GARBAGE,
  "Bag": GARBAGE_TYPE.GARBAGE,
  "Styrofoam": GARBAGE_TYPE.GARBAGE,
  "Clothing": GARBAGE_TYPE.GARBAGE,
  "Tape": GARBAGE_TYPE.GARBAGE,
  "Digital Watch": GARBAGE_TYPE.GARBAGE,
  "Binoculars": GARBAGE_TYPE.GARBAGE,
  "Plastic Wrap": GARBAGE_TYPE.GARBAGE,
  "Plastic Bag": GARBAGE_TYPE.GARBAGE,
  "Electronic Fan": GARBAGE_TYPE.GARBAGE,
  "Wire": GARBAGE_TYPE.GARBAGE,
  "Cell Phone": GARBAGE_TYPE.GARBAGE,

  "Plastic": GARBAGE_TYPE.RECYCLING,
  "Flyer": GARBAGE_TYPE.RECYCLING,
  "Brochure": GARBAGE_TYPE.RECYCLING,
  "Poster": GARBAGE_TYPE.RECYCLING,
  "Metal": GARBAGE_TYPE.RECYCLING,
  "Glass": GARBAGE_TYPE.RECYCLING,
  "Carton": GARBAGE_TYPE.RECYCLING,
  "Cardboard": GARBAGE_TYPE.RECYCLING,
//  "Box": GARBAGE_TYPE.RECYCLING,
  "Cup": GARBAGE_TYPE.RECYCLING,
  "Bottle": GARBAGE_TYPE.RECYCLING,
  "Diary": GARBAGE_TYPE.RECYCLING,
//  "Paper": GARBAGE_TYPE.RECYCLING,
  "Document": GARBAGE_TYPE.RECYCLING,
  "Beer Bottle": GARBAGE_TYPE.RECYCLING,
  "Drink": GARBAGE_TYPE.RECYCLING,
  "Alcohol": GARBAGE_TYPE.RECYCLING,
  "Beer": GARBAGE_TYPE.RECYCLING,
  "Beverage": GARBAGE_TYPE.RECYCLING,
  "Can": GARBAGE_TYPE.RECYCLING,
  "Aluminium": GARBAGE_TYPE.RECYCLING,
  "Beer Bottle": GARBAGE_TYPE.RECYCLING,

  "Produce": GARBAGE_TYPE.COMPOST,
  "Food": GARBAGE_TYPE.COMPOST,
  "Plant": GARBAGE_TYPE.COMPOST,
  "Bottle": GARBAGE_TYPE.RECYCLING,
  "Beverage": GARBAGE_TYPE.RECYCLING,
  "Aluminium": GARBAGE_TYPE.RECYCLING,
  "Tin": GARBAGE_TYPE.RECYCLING,
  "Fruit": GARBAGE_TYPE.COMPOST,
  "Animal": GARBAGE_TYPE.COMPOST,
  "Biscuit": GARBAGE_TYPE.COMPOST,
  "Cookie": GARBAGE_TYPE.COMPOST,
  "Vegetable": GARBAGE_TYPE.COMPOST,
  "Meal": GARBAGE_TYPE.COMPOST,
  "Flora": GARBAGE_TYPE.COMPOST,
  "Bread": GARBAGE_TYPE.COMPOST,
  "Peach": GARBAGE_TYPE.COMPOST,
  "Cornbread": GARBAGE_TYPE.COMPOST,
  "Cream": GARBAGE_TYPE.COMPOST,
  "Waffle": GARBAGE_TYPE.COMPOST,
  "Plant": GARBAGE_TYPE.COMPOST,
  "Produce": GARBAGE_TYPE.COMPOST,
  "Banana": GARBAGE_TYPE.COMPOST,
  "Cake": GARBAGE_TYPE.COMPOST,
  "Dessert": GARBAGE_TYPE.COMPOST
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

//function recognition(content, response) {
//    var params = {};
//    params.Image = {
//        Bytes: content
//    };
//    params.MinConfidence = 70;
//
//    recog.detectLabels(params, function(err, data) {
//        if (err) {
//          response.json({
//            "success": false,
//            "catetory": null
//          });
//        }
//        var category = detectGarbage(data);
//        response.json({
//          "success": true,
//          "category": category
//        })
//    })
//}


/**
 * A helper function for detectLabels, analyzes the labels given in imageData
 * and returns a string for the most likely type of garbage it is
 * @param  {[Object]} imageData object containing image labels
 * @return {[GARBAGE_TYPE]} type of garbage detected from image labels (string object)
 */
function detectGarbage(imageData) {
    console.log(imageData);
    for (var i = 0; i < imageData.Labels.length; i++) {
        for (tag in GARBAGE_TAGS) {
            if (imageData.Labels[i].Name == tag) { //If we find a major identifying garbage type tag, immediately return the prediction
                console.log(GARBAGE_TAGS[tag]);
	        return GARBAGE_TAGS[tag];
            }
        }
    }
    console.log(GARBAGE_TYPE.GARBAGE);
    return GARBAGE_TYPE.GARBAGE; //If we can't figure out what it is, classify it as garbage
}


module.exports = {
    test,
    recognition,
    GARBAGE_TYPE
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
