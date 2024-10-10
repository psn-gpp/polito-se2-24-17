"use strict";

const db = require("./db");

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

exports.createCounter = (isAvailable, cName) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO COUNTER (isAvailable, cName) VALUES (?, ?)";
    db.run(query, [isAvailable, cName], function (err) {
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

exports.updateCounter = (cid, isAvailable, cName) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE COUNTER SET isAvailable = ?, cName = ? WHERE cid = ?";
    db.run(query, [isAvailable, cName, cid], function (err) {
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
