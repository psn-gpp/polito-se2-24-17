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
 * @param {} - no params
 * @returns {Promise<Service[]>} Promise resolving to an array of all service objects in db
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
 * @param {string} svcType - The type of the service
 * @param {string} svcName - The name of the service
 * @param {number} avgSvcTime - The average service time
 * @returns {Promise<{sid: number}>} Promise resolving to an object containing the new service id
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
 * update a service taking the service id and the three parameter
 * @param {number} sid - The id of the service 
 * @param {string} svcType - The type of the service
 * @param {string} svcName - The name of the service
 * @param {number} avgSvcTime - The average service time
 * @returns {Promise<{changes: number}>} Promise resolving to an object containing the number of changes
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
 * @param {number} sid - The id of the service
 * @returns {Promise<{changes: number}>} Promise resolving to deleted service id
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

/**
 * check if a service exists
 * @param serviceId - id of service
 * @returns {Promise<boolean>} Promise resolving to a boolean : true if service exists, false otherwise
 */
exports.existsService = (serviceId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM SERVICE WHERE sid = ?";
    db.get(query, [serviceId], (err, row) => {
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