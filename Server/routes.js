//const express = require('express');
//const router = express.Router();
//const recognitionController = require('./controllers/image-recognition-controller.js'); //Import recog controller

const server = require('./server.js')

const recognitionController = server.recognitionController;
const router = server.express.Router();


/*
router.get('/', function(request, response){
	response.render(./public/index.html);
});*/


/**
 * Test request handler
 */
router.get('/test', function(request, response) {
    console.log("test executing");
    recognitionController.test().then((category) => {
        response.send(category); //res holds garbage_type info
    }).catch(() => {
      response.json({
        "test": "error works"
      })
    });
});

/**
 * Testdb request handler
 */
router.get('/testdb', function(request, response){
  console.log("database test executing");
  //recognitionController.test;
  var results = databaseController.updateDatabase(1, 20, 30, 40);
  response.json({"results": results});
});

/**
 * Post request handler for recognition detection requests
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
router.post('/recognition', function(request, response) {
    var enc = new Buffer(request.body.base64, 'base64');
	//var enc = request.query.base64;
    recognitionController.recognition(enc).then((category) => {

        response.json({
            "success": true,
            "category": category
        });
    }).catch(() => {
        response.json({
            "success": false,
            "category": null
        });
    });
});

module.exports = router;
