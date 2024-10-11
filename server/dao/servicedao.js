"use strict";

const db = require("../db/db");

//SERVICE API

/**
 * giving a service id, return the service object
 */

exports.getServiceById = (ServiceId) => {
  console.log("ServiceId: ", ServiceId);
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM SERVICE WHERE sid = ?";
    db.get(query, [ServiceId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

/**
 * return all services
 */

exports.getAllServices = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM SERVICE";
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
 * create a new service taking the three parameter and return the service id
 */

exports.createService = (svcType, avgSvcTime, svcName) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO SERVICE (svcType, avgSvcTime, svcName) VALUES (?, ?, ?)";
    db.run(query, [svcType, avgSvcTime, svcName], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ sid: this.lastID });
      }
    });
  });
};

/**
 * update a service taking the service id and the three parameter and return the number of changes(discuss)
 */

exports.updateService = (sid, svcType, avgSvcTime, svcName) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE SERVICE SET svcType = ?, avgSvcTime = ?, svcName = ? WHERE sid = ?";
    db.run(query, [svcType, avgSvcTime, svcName, sid], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
};

/**
 * delete a service taking the service id
 */

exports.deleteService = (sid) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM SERVICE WHERE sid = ?";
    db.run(query, [sid], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
};
