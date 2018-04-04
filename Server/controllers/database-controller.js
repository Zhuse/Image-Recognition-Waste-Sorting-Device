const server = require('../server.js');
const recognitionController = require('./image-recognition-controller.js');
const GARBAGE_TYPE = recognitionController.GARBAGE_TYPE;

const db = server.db;


/**
 * Updates the mode table in the database setting the operation mode for the
 * garbage bin. Each garbage bin can either be in two modes, automatic or manual
 * If the garbage bin is in manual mode, garbageOpen, recyclingOpen and compostOpen
 * are needed to specify if each bin is open
 * @param  {[object]} response response object for the HTTP request
 * @param  {[int]} id unique id for each bin
 * @param  {[boolean]} auto whether or not to set the bin to auto mode
 * @param  {[boolean]} garbageOpen if the bin is in manual mode, set state of garbage lid
 * @param  {[boolean]} recyclingOpen if the bin is in manual mode, set state of recycling lid
 * @param  {[boolean]} compostOpen if the bin is in manual mode, set state of compost lid
 * @return nothing
 */
var setMode = function(response, id, auto, garbageOpen, recyclingOpen, compostOpen) {
    console.log("in function setMode");
    db.all("SELECT garbage_open, recycling_open, compost_open FROM mode WHERE id = (?)", [id],
        function(err, rows) {
            if (err) {
                response.json({
                    "success": false
                });
                return; // return after the error and do not continue execution
            }
            // check if we have a row for this bin id
            if (rows !== undefined && rows.length > 0) {

                var currGarbageState = rows[0].garbage_open;
                var currRecyclingState = rows[0].recycling_open;
                var currCompostState = rows[0].compost_open;
                console.log(currGarbageState + " " + currRecyclingState + " " + currCompostState);

                if (auto) {
                    db.run("UPDATE mode SET (auto) = (?) WHERE id = (?)", [auto, id],
                        function(err, rows) {
                            response.json({
                                "success": !err && rows !== null
                            });
                        });
                } else {
                    db.run("UPDATE mode SET (auto, garbage_open, recycling_open, compost_open) = (?, ?, ?, ?) WHERE id = (?)", [auto, garbageOpen, recyclingOpen, compostOpen, id],
                        function(err, rows) {
                            response.json({
                                "success": !err && rows !== null
                            });
                        });

                    if (garbageOpen && !currGarbageState) {
                        addHistoryEntry(id, "garbage");
                    }
                    if (recyclingOpen && !currRecyclingState) {
                        addHistoryEntry(id, "recycling");
                    }
                    if (compostOpen && !currCompostState) {
                        addHistoryEntry(id, "compost");
                    }
                }

            } else {
                db.run("INSERT INTO mode (id, auto, garbage_open, recycling_open, compost_open) VALUES (?,?,?,?,?)", [id, auto, garbageOpen, recyclingOpen, compostOpen],
                    function(err, rows) {
                        response.json({
                            "success": !err && rows !== null
                        });
                    });
                if (garbageOpen) {
                    addHistoryEntry(id, "garbage");
                }
                if (recyclingOpen) {
                    addHistoryEntry(id, "recycling");
                }
                if (compostOpen) {
                    addHistoryEntry(id, "compost");
                }
            }
        });
}

/**
 * Gets the current operation mode and state for the waste bin with ID = id, and
 * sends it back in a HTTP response object
 * @param  {[int]} id unique id for each bin
 * @param  {[object]} response response object for the HTTP request
 * @return nothing
 */
var getMode = function(id, response) {
    console.log("in function getMode, id: " + id);
    db.all("SELECT auto FROM mode WHERE id = (?)", [id],
        function(err, rows) {
            if (err || rows.length !== 1) {
                response.json({
                    success: false
                });
                return;
            }
            if (rows[0].auto) {
                response.json({
                    success: true,
                    auto: true
                });
                return;
            }
            db.all("SELECT garbage_open, recycling_open, compost_open FROM mode WHERE id = (?)", [id],
                function(err, rows) {
                    //            console.log(rows.length);
                    if (err || rows.length != 1) {
                        response.json({
                            success: false
                        });
                        return;
                    }
                    response.json({
                        success: true,
                        auto: false,
                        garbageOpen: !!rows[0].garbage_open,
                        recyclingOpen: !!rows[0].recycling_open,
                        compostOpen: !!rows[0].compost_open
                    });
                    return;
                });
        });
}


/**
 * Adds an entry to the history table of the database, creating a log entry for
 * when a waste bin is opened
 * @param  {[int]} id unique id for each bin
 * @param  {[int]} waste integer representing which bin was opened, (1 for garabage,
 *    2 for recycling, and 3 for compost)
 * @return {[boolean]} true if success, false otherwise
 */
var addHistoryEntry = function(id, waste) {
    console.log("in function addHistoryEntry id: " + id);
    switch (waste) {
        case GARBAGE_TYPE.GARBAGE:
            waste_type = 1;
            break;
        case GARBAGE_TYPE.RECYCLING:
            waste_type = 2;
            break;
        case GARBAGE_TYPE.COMPOST:
            waste_type = 3;
            break;
    }
    db.run("INSERT INTO history (id, waste_type, timestamp) VALUES (?,?,datetime('now', 'localtime'))", [id, waste_type],
        function(err, rows) {
            return !err && rows !== null;
        });
}


/**
 * Retrieves the history log for a specified garbage bin
 * @param  {[int]} id unique id for each bin
 * @param  {[object]} response HTTP response which will be sent back with a json
 *    object containing a log of every time a waste bin was opened
 * @return nothing
 */
var getHistory = function(id, response) {
    db.all("SELECT * FROM history WHERE id = (?)", [id],
        function(err, rows) {
            if (err) {
                response.json({
                    success: false,
                    history: []
                });
            }

            var historyArr = [];

            for (var i = 0; i < rows.length; i++) {
                historyArr.push({
                    "time": rows[i].timestamp,
                    "bin": rows[i].waste_type
                });
            }
            response.json({
                success: true,
                history: historyArr
            });
        });
}

/**
 * Deletes all history log entires for a specified waste bin, essentially emptying the bin
 * @param  {[int]} id unique id for each bin
 * @param  {[object]} response HTTP response indicating if the action was successful
 * @return nothing
 */
var empty = function(id, response) {
    db.run("DELETE FROM history WHERE id = (?)", [id],
        function(err, rows) {
            response.json({
                success: !err && rows !== null
            });
        });
}



module.exports = {
    addHistoryEntry: addHistoryEntry,
    getHistory: getHistory,
    getMode: getMode,
    setMode: setMode,
    empty: empty
}
