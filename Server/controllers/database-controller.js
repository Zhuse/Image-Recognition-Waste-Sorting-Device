const server = require('../server.js');

const db = server.db;


// updates stats if id already exists, if not inserts new row into db
var updateDatabase = function(id, garbage, recycling, compost) {
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
