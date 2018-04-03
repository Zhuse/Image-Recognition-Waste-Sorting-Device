var garbageOpen = false;
var recyclingOpen = false;
var compostOpen = false;
var mode = false;
var auto = false;
var id = 1;
var garbage = 0;
var compost = 0;
var recycling = 0;
			
/**
 * Retrieve serverside data for graph
 * @return {[type]} [description]
 */
function getData() {
    var binData = JSON.stringify({
        'id': id,
    });

    try {
        $.ajax({
            type: 'POST',
            url: './history',
            data: binData,
            dataType: 'json',
            contentType: "application/json",
            success: function(response) { //Callback
                //alert(response.success); //placeholder
                var table = parseHistory(response.history);
            }
        });
		
    } catch (err) {}
}

/**
 * Helper function, parses a json history object and creates a freq table
 * for num objects in each bin
 * @param  {[type]} history [description]
 * @return {[type]}         [description]
 */
function parseHistory(history){
	var dict = {'1': 0, '2': 0, '3': 0};
	var hist = '';
	for (var i = history.length - 1; i >= 0; i--) {
		console.log(history[i]);
		if(history[i].bin == '1'){
			hist += '<p>Garbage thrown at ' + history[i].time + '</p><br />';
		}
		if(history[i].bin == '2'){
			hist += '<p>Recycling thrown at ' + history[i].time + '</p><br />';
		}
		if(history[i].bin == '3'){
			hist += '<p>Compost thrown at ' + history[i].time + '</p><br />';
		}
		dict[history[i].bin] ++;
	}
	var update = document.getElementById('history').innerHTML = hist;
	garbage = document.getElementById('garbageVal').textContent = dict[1];
	recycling = document.getElementById('recyclingVal').textContent = dict[2];
	compost = document.getElementById('compostVal').textContent = dict[3];
	var total = document.getElementById('total').textContent = garbage + recycling + compost;
	createDoughnut(garbage, recycling, compost);
	return dict;
}

/**
 * Retrieves serverside data for log
 * @return {[type]} [description]
 */
function getHistory() {
    var binData = JSON.stringify({
        'id': id,
    });
    try {
        $.ajax({
            type: 'POST',
            url: './history',
            data: binData,
            dataType: 'json',
            contentType: "application/json",
            success: function(response) { //Callback
            }
        });
    } catch (err) {}
}

/**
 * Sets the bin mode and which bins to open
 */
function setMode() {
	var binData = JSON.stringify({
		'id': parseInt(id),
		'auto': auto,
		'garbageOpen': garbageOpen,
		'recyclingOpen': recyclingOpen,
		'compostOpen': compostOpen
	});

    try {
        $.ajax({
            type: 'POST',
            url: './setMode',
            data: binData,
            dataType: 'json',
            contentType: "application/json",
            success: function(response) {}
        });
    } catch (err) {}
}

/**
 * Sends a POST request to close the bins when switching modes.
 */
 
function resetMotors() {
	var binData = JSON.stringify({
		'id': parseInt(id),
		'auto': false,
		'garbageOpen': false,
		'recyclingOpen': false,
		'compostOpen': false
	});

    try {
        $.ajax({
            type: 'POST',
            url: './setMode',
            data: binData,
            dataType: 'json',
            contentType: "application/json",
            success: function(response) {setMode();}
        });
    } catch (err) {}
}

/**
 * Sends a POST request to clear the database from a specified bin ID
 */
function empty() {
	var binData = JSON.stringify({
		'id': parseInt(id),
	});
	
    try {
        $.ajax({
            type: 'POST',
            url: './empty',
            data: binData,
            dataType: 'json',
            contentType: "application/json",
            success: function(response) {}
        });
    } catch (err) {}
}

/**
 * Show the chart and history, and hide the controller
 */
function showChart() {
    document.getElementById('chart').style.display = 'block';
    document.getElementById('stats').style.display = 'none';
	document.getElementById('history').style.display = 'block';
	getHistory();
	loadGraph();
}

/**
 * Show the controller, and hide the chart and history
 */
function showStats() {
    document.getElementById('stats').style.display = 'block';
    document.getElementById('chart').style.display = 'none';
	document.getElementById('history').style.display = 'none';
	getData();
}

/**
 * Update the controller, chart, and history with the inputted id
 */
function updateId(){
	var input = document.getElementById('binId').value;
	id = input;
	getHistory();
	getData();
}

/**
 * Switch the mode from manual to automatic, or vice versa
 */
function updateMode(changeMode) {
    if (changeMode == 1) {
        auto = true;
        var footers = document.getElementsByClassName('select');
        for (i = 0; i < footers.length; i++) {
			if(footers[i].id != 'update' && footers[i].id != 'empty')
            footers[i].style.display = 'none';
        }
		var update = document.getElementById('update');
        resetMotors();
    } else {
        auto = false;
        var footers = document.getElementsByClassName('select');
        for (i = 0; i < footers.length; i++) {
            footers[i].style.display = 'block';
        }
        resetMotors();
    }
}

/**
 * Open/close the garbage bin
 */
function garbUpdate(bin) {
    if (bin == 1) {
        garbageOpen = true;
    } else {
        garbageOpen = false;
    }
    setMode();
    //alert(garbageOpen);
}

/**
 * Open/close the compost bin
 */
function compostUpdate(bin) {
    if (bin == 1) {
        compostOpen = true;
    } else {
        compostOpen = false;
    }
    setMode();

    //alert(compostOpen);
}

/**
 * Open/close the recycling bin
 */
function recyclingUpdate(bin) {
    if (bin == 1) {
        recyclingOpen = true;
    } else {
        recyclingOpen = false;
    }
    setMode();

    //alert(recyclingOpen);
}

/**
 * Get graph values and create and render the doughnut graph
 */
function loadGraph(){
	getData();
	createDoughnut(garbage, recycling, compost);
}
          
/**
 * Create the doughnut graph
 */
function createDoughnut (garbageVal, recycleVal, compostVal) {
            var myChart = new Chart(document.getElementById("doughnut-chart"), {
              type: 'doughnut',
              data: {
                labels: ["Garbage", "Recycling", "Compost"],
                datasets: [
                  {
                    backgroundColor: ["#61616199", "#42A5F599","#4CAF5099"],
                    borderColor: ["#616161", "#42A5F5", "#4CAF50"],
                    data: [garbageVal,recycleVal,compostVal]
                  }
                ]
              },
              options: {
                hover: false,
                animation: false,
				maintainAspectRatio: true
              }
            });
}
	
/**
 * Update the chart, history, and controller stats every second
 */
function refresh(){
	setInterval(function(){ loadGraph(); }, 1000);
}
