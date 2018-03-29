const server = require('../server.js');
const recognitionController = require('./image-recognition-controller.js');
const GARBAGE_TYPE = recognitionController.GARBAGE_TYPE;

const db = server.db;

// waste is int, 1 for garbage, 2 for recycle, 3 for compost
var updateDatabase = function (id, waste) {
  var garbageCount = 0;
  var recyclingCount = 0;
  var compostCount = 0;

  switch (waste) {
    case GARBAGE_TYPE.GARBAGE: garbageCount++; break;
    case GARBAGE_TYPE.RECYCLING: recyclingCount++; break;
    case GARBAGE_TYPE.COMPOST: compostCount++; break;
  }

  if (testId(id)) {

    db.all("SELECT garbage, recycing, compost FROM stats WHERE id = (?)", [id],
        function (err, rows) {
          if (err || rows.length < 3) {
            return false;
          }
          garbageCount += rows[0];
          recyclingCount += rows[1];
          compostCount += rows[2];
          db.run("UPDATE stats SET (garbage, recycling, compost) = (?,?,?) WHERE id = (?)",
              [garbageCount, recyclingCount, compostCount, id],
              function (err, rows) {
                console.log(!err && rows !== null);
                return !err && rows !== null;
              });

        });

  } else {
    return insertDatabase(id, garbageCount, recyclingCount, compostCount);
  }


}


// updates stats if id already exists, if not inserts new row into db
var insertDatabase = function(id, garbage, recycling, compost) {
  if (!testId(id)) {

    db.run("INSERT INTO stats (id, garbage, recycling, compost ) VALUES (?,?,?,?)",
        [id, garbage, recycling, compost],
        function (err, rows) {
          // return false if error or query not successful, true otherwise
          console.log(!err && rows !== null);
          return !err && rows !== null;
        });

  } else {

    db.run("UPDATE stats SET (garbage, recycling, compost) = (?,?,?) WHERE id = (?)",
        [garbage, recycling, compost, id],
        function (err, rows) {
          console.log(!err && rows !== null);
          return !err && rows !== null;
        });

  }
}

// tests if id already exists in table
var testId = function (id) {
  return db.all("SELECT EXISTS(SELECT 1 FROM stats WHERE id = (?) LIMIT 1", [id],
      function (err, rows){
        if (err) {
          return false;
        }
        return rows.size > 0;
      });
}


module.exports = {
  updateDatabase:updateDatabase
}
