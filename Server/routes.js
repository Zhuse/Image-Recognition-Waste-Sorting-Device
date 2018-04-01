//const express = require('express');
//const router = express.Router();

const server = require('./server.js')
const router = server.express.Router();

const recognitionController = require('./controllers/image-recognition-controller.js'); //Import recog controller

const databaseController = require('./controllers/database-controller.js');

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
    request.body.base64 = request.body.base64.slice(1, -1);

    var enc = new Buffer(request.body.base64, 'base64');
	//var enc = request.query.base64;
    recognitionController.recognition(enc).then((category) => {

        databaseController.addHistoryEntry(request.body.id, category);

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





router.post('/setMode', function (request, response) {
  console.log(request.body);
  if (request.body.auto) {
    var success = databaseController.setMode(request.body.id, request.body.auto)
    response.json({
      "success": success,
    });
  } else {
    var success = databaseController.setMode(request.body.id, request.body.auto, request.body.garbageStatus, request.body.recyclingStatus, request.body.compostStatus);
    response.json({
      "success": success,
    });
  }
});




/*
json
{
  "success": boolean,
  "auto": boolean,
  "garbageOpen": boolean,
  "recyclingOpen": boolean,
  "compostOpen": boolean
}
*/
router.post('/mode', function(request, response) {
  var mode = databaseController.getMode(request.body.id);
  if (!mode.success) {
    response.json({
      "success": false,
      "auto": null,
      "garbageOpen": null,
      "recyclingOpen": null,
      "compostOpen": null
    });
  }
  if (mode.auto) {
    response.json({
      "success": true,
      "auto": true,
      "garbageOpen": null,
      "recyclingOpen": null,
      "compostOpen": null
    });
  }
  response.json({
    "success": true,
    "auto": true,
    "garbageOpen": mode.garbageOpen,
    "recyclingOpen": mode.recyclingOpen,
    "compostOpen": mode.compostOpen
  });
});











router.post('/history', function(request, response){
  


})








module.exports = router;
