const server = require('../server.js');
const recognitionController = require('./image-recognition-controller.js');
const GARBAGE_TYPE = recognitionController.GARBAGE_TYPE;

const db = server.db;


// return true if success, false otherwise
var setMode = function (id, auto, garbageOpen, recyclingOpen, compostOpen) {
  if (!testId(id)) {
    db.run("INSERT INTO mode (id, auto, garbage_open, recycling_open, compost_open) VALUES (?,?,?,?,?)",
        [id, auto, garbageOpen, recyclingOpen, compostOpen],
        function (err, rows) {
          return !err && rows !== null;
        });
  }
  if (auto) {
    db.run("UPDATE mode SET (auto) = (?) WHERE id = (?)",
        [auto, id],
        function (err, rows) {
          return !err && rows !== null;
        });
  } else {
    db.run("UPDATE mode SET (auto, garbageOpen, recyclingOpen, compostOpen) = (?, ?, ?, ?) WHERE id = (?)",
        [auto, garbageOpen, recyclingOpen, compostOpen, id],
        function (err, rows) {
          return !err && rows !== null;
        });
  }
}

/*
return format
{
  success: boolean,
  auto: boolean,
  garbageOpen: boolean,
  recycingOpen: boolean,
  compostOpen: boolean
}
*/
var getMode = function (id) {
  db.all("SELECT auto FROM mode WHERE id = (?)", [id],
      function (err, rows){
        if (err || rows.length != 1) {
          return {
            success: false
          }
        }
        if (rows[0] == 1) {
          return {
            success: true,
            auto: true,
          }
        }
        db.all("SELECT garbage_open, recycing_open, compost_open FROM mode WHERE id = (?)", [id],
          function (err, rows){
            if (err || rows.length != 3) {
              return {
                success: false
              }
            }
            return {
              success: true,
              auto: true,
              garbageOpen: rows[0],
              recycingOpen: rows[1],
              compostOpen: rows[2]
            }
          });
      });
}









// add entry to history table
var addHistoryEntry = function (id, waste) {
  switch (waste) {
    case GARBAGE_TYPE.GARBAGE: waste_type = 1; break;
    case GARBAGE_TYPE.RECYCLING: waste_type = 2; break;
    case GARBAGE_TYPE.COMPOST: waste_type = 3; break;
  }
  db.run("INSERT INTO history (id, waste_type, timestamp) VALUES (?,?,datetime('now', 'localtime'))", [id, waste_type],
      function (err, rows) {
        return !err && rows !== null;
      });
}

/*
{
  success: boolean,
  todayGarbageCount: int,
  todayRecyclingCount: int,
  todayCompostCount: int,
  yesterdayGarbageCount: int,
  yesterdayRecyclingCount: int,
  yesterdayCompostCount: int
}
*/
var getHistory = function (id) {
  db.all("SELECT * FROM history WHERE id = (?)", [id],
      function (err, rows){
        if (err) {
          return {
            success: false,
            history: []
          }
        }


        var historyArr = [];

        for (var i = 0; i < rows.length; i++) {
          historyArr.push(
              {
                "time": rows[2],
                "bin": rows[1]
              }
            );
        }
        return {
          success: true,
          history: historyArr
        };
      });
}









// private helper function
// updates stats if id already exists, if not inserts new row into db
var insertDatabase = function(id, garbage, recycling, compost) {
  if (!testId(id)) {

    db.run("INSERT INTO count (id, garbage, recycling, compost ) VALUES (?,?,?,?)",
        [id, garbage, recycling, compost],
        function (err, rows) {
          // return false if error or query not successful, true otherwise
          console.log(!err && rows !== null);
          return !err && rows !== null;
        });

  } else {

    db.run("UPDATE count SET (garbage, recycling, compost) = (?,?,?) WHERE id = (?)",
        [garbage, recycling, compost, id],
        function (err, rows) {
          console.log(!err && rows !== null);
          return !err && rows !== null;
        });

  }
}


// private helper function
// tests if id already exists in table
var testId = function (id) {
  return db.all("SELECT EXISTS(SELECT 1 FROM count WHERE id = (?) LIMIT 1", [id],
      function (err, rows){
        if (err) {
          return false;
        }
        return rows.size > 0;
      });
}


module.exports = {
  addHistoryEntry: addHistoryEntry,
  getHistory: getHistory,
  getMode: getMode,
  setMode: setMode
}
