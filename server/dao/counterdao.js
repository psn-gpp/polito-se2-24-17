"use strict";

const db = require("../db/db");

//COUNTER API

/**
 * Retrieves a counter by its ID.
 * @param {number} counterId - The ID of the counter to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the counter object.
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
 * Retrieves all counters.
 * @returns {Promise<Array>} A promise that resolves to an array of all counters.
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
 * Creates a new counter.
 * @param {string} cName - The name of the counter to create.
 * @returns {Promise<Object>} A promise that resolves to an object containing the new counter's ID.
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
 * Updates a counter.
 * @param {number} cid - The ID of the counter to update.
 * @param {string} cName - The new name of the counter.
 * @returns {Promise<Object>} A promise that resolves to an object containing the number of changes.
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
 * Deletes a counter.
 * @param {number} cid - The ID of the counter to delete.
 * @returns {Promise<Object>} A promise that resolves to an object containing the number of changes.
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
/**
 * Checks if a counter exists.
 * @param {number} counterId - The ID of the counter to check.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the counter exists.
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
