//var urlGarbage = "35.163.191.108/api/getGarbage";
//var urlRecycle = "35.163.191.108/api/getRecycle";
//var urlCompost = "35.163.191.108/api/getCompost";

function getData(callback) {
    $.getJSON('./api/getStats', function(data) {
        console.log(data.garbage);


        callback(data.garbage, data.recycle, data.compost);

    });

}

function setMode() {
    $.post("34.218.219.101:3000/setMode", {
		id: 1,
		auto: auto,
		garbageOpen: garbageOpen,
		recyclingOpen: recyclingOpen,
		compostOpen: compostOpen
    });
}


function showChart() {
    document.getElementById('chart').style.display = 'block';
    document.getElementById('stats').style.display = 'none';
}

function showStats() {
    document.getElementById('stats').style.display = 'block';
    document.getElementById('chart').style.display = 'none';
}

function garbUpdate() {
    alert("Open garbage");
}

function compostUpdate() {
    alert("Open compost");
}

function recyclingUpdate() {
    alert("Open recycling");
}

function closeBin() {
    alert("Close Bin");
}
/*
function getGarbage() {
  $.getJSON('./api/getGarbage',function(data){
    console.log(data.garbage);
    return data.garbage;
  });
}
function getRecycle(urlRecycle) {
    $.getJSON('./api/getRecycle',function(data){
      return data.recycle;
    });
//return 50;
}
function getCompost(urlCompost) {
  $.getJSON('./api/getCompost',function(data){
    return data.compost;
  });
//return 5;
}
*/
