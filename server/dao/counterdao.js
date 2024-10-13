"use strict";

const db = require("../db/db");

//COUNTER API
/**
 * giving a service id, return the counter object
 */

exports.getCounterById = (counterId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM COUNTER WHERE cid = ?";
    db.get(query, [counterId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};
/**
 * return the all the counters
 */

exports.getAllCounters = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM COUNTER";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
/**
 * create a new counter taking the two parameter and return the counter id
 */

exports.createCounter = (cName) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO COUNTER (cName) VALUES (?)";
    db.run(query, [cName], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ cid: this.lastID });
      }
    });
  });
};
/**
 * update a counter taking the counter id and the two parameter and return the number of changes(discuss)
 */

exports.updateCounter = (cid, cName) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE COUNTER SET cName = ? WHERE cid = ?";
    db.run(query, [cName, cid], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
};
/**
 * delete a counter taking the counter id and return the number of changes(discuss)
 */

exports.deleteCounter = (cid) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM COUNTER WHERE cid = ?";
    db.run(query, [cid], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
};


// auxiliary func
// != getCounterById as it hides info since it does not return to the server all data about the counter, but only a boolean to indicate its existence
/**
 * check if a counter exists
 * @param counterId - id of counter
 * @returns {Promise<boolean>} Promise resolving to a boolean : true if counter exists, false otherwise
 */
exports.existsCounter = (counterId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM COUNTER WHERE cid = ?";
    db.get(query, [counterId], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
