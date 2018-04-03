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
    console.log("endpoint /recognition");
    request.body.base64 = request.body.base64.slice(1, -1);

    var enc = new Buffer(request.body.base64, 'base64');
	//var enc = request.query.base64;
//    recognitionController.recognition(enc, response);
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



router.post('/empty', function (request, response) {
  console.log("endpoint /empty");
  databaseController.empty(request.body.id, response);
})

router.post('/setMode', function (request, response) {
  console.log("endpoint /setMode");
  console.log(request.body);
  if (request.body.id == null) {
    request.body.id = 1;
    console.log("id null, default to : " + request.body.id);
  }
  if (request.body.auto) {
    databaseController.setMode(response, request.body.id, request.body.auto)
  } else {
    databaseController.setMode(response, request.body.id, request.body.auto, request.body.garbageOpen, request.body.recyclingOpen, request.body.compostOpen);
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
  console.log("endpoint /mode");
  databaseController.getMode(request.body.id, response);
});



router.post('/history', function(request, response){
  console.log("endpoint /history");
  databaseController.getHistory(request.body.id, response);
//  response.json({
//    "success": history.success,
//    "history": history.historyArr
//  });
});








module.exports = router;
