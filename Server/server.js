const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var port = 3000;

app.use(bodyParser.json());

app.use(express.static('./public'));  // this sends clientside files



// starting server
app.listen(port, function(){
    console.log("Server listening on port " + port);
});

app.post('/recogniton', function(request, response){
});
