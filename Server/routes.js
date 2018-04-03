const server = require('./server.js')
const router = server.express.Router();

const recognitionController = require('./controllers/image-recognition-controller.js'); //Import recog controller
const databaseController = require('./controllers/database-controller.js');


/**
 * Post request handler for recognition detection requests and updating database
 */
router.post('/recognition', function(request, response) {
    console.log("endpoint /recognition id: " + request.body.id);
    request.body.base64 = request.body.base64.slice(1, -1);
    var enc = new Buffer(request.body.base64, 'base64');
    request.body.base64 = request.body.base64.slice(1, -1);
    request.body.id = 1;
    var enc = new Buffer(request.body.base64, 'base64');
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


/**
 * Post request handler for clearing database for a particular bin
 */
router.post('/empty', function(request, response) {
    console.log("endpoint /empty");
    databaseController.empty(request.body.id, response);
})


/**
 * Post request handler for setting mode of a particular bin
 */
router.post('/setMode', function(request, response) {
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


/**
 * Post request handler for retrieving mode of a particular bin
 */
router.post('/mode', function(request, response) {
    console.log("endpoint /mode");
    databaseController.getMode(request.body.id, response);
});


/**
 * Post request handler for getting history of a particular bin
 */
router.post('/history', function(request, response) {
    console.log("endpoint /history");
    databaseController.getHistory(request.body.id, response);
});


module.exports = router;
