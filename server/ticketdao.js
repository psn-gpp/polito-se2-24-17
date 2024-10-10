"use strict";

const db = require("./db");

// TICKET API

/**
 * giving a ticket id, return the ticket object
 */

exports.getTicketById = (ticketId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM TICKET WHERE tid = ?";
    db.get(query, [ticketId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};
/**
 * return all tickets
 */
exports.getAllTickets = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM TICKET";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

/*
 we can discuss to do more api methods es get tickets of that day, get tickets of that service, get tickets of that counter(discuss tomorrow)
*/

/**
 * Creates a new ticket in the database with the provided details.
 * 
 * @param {number} sid - The service ID associated with the ticket.
 * @param {number} cid - The counter ID at which the ticket is being served.
 * @param {number} tCode - The unique ticket code for the day.
 * @param {string} date - The date of ticket generation (format: 'yyyy-mm-dd').
 * @param {string} time - The time of ticket generation (format: 'hh:mm:ss').
 * @param {number} avgWaitTime - The average waiting time in minutes for the ticket holder.
 * @param {boolean} isServed - Indicates whether the ticket has been served (true if served, false otherwise).
 * 
 * @returns {Promise<{ tid: number }>} - A promise that resolves with an object containing the ticket ID (tid) of the newly created ticket.
 */

exports.createTicket = (sid, cid, tCode, date, time, avgWaitTime, isServed) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO TICKET (sid, cid, tCode, date, time, isServed, avgWaitTime) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.run(
      query,
      [sid, cid, tCode, date, time, isServed, avgWaitTime],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ tid: this.lastID });
        }
      }
    );
  });
};

/**
 * 
 * @param {number} tid - The ticket ID of the ticket to be updated.
 * @param {number} sid - The service ID associated with the ticket.
 * @param {number} cid - The counter ID at which the ticket is being served.
 * @param {number} tCode - The unique ticket code for the day.
 * @param {string} date - The date of ticket generation (format: 'yyyy-mm-dd').
 * @param {string} time - The time of ticket generation (format: 'hh:mm:ss').
 * @param {number} avgWaitTime - The average waiting time in minutes for the ticket holder.
 * @param {boolean} isServed - Indicates whether the ticket has been served (true if served, false otherwise).
 * 
 * @returns {Promise<{ changes: number }>} - A promise that resolves with an object containing the number of rows affected by the update operation.
 * */

exports.updateTicket = (tid,sid,cid,tCode,date,time,isServed,avgWaitTime) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE TICKET SET sid = ?, cid = ?, tCode = ?, date = ?, time = ?, isServed = ?, avgWaitTime = ? WHERE tid = ?";
    db.run(
      query,
      [sid, cid, tCode, date, time, isServed, avgWaitTime, tid],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      }
    );
  });
};
/**
 * giving a service id, delete the service object
 */
exports.deleteTicket = (tid) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM TICKET WHERE tid = ?";
    db.run(query, [tid], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
};

// COUNTER SERVICE API

/**
 * giving a counter id, service id and date, create a new counter service object
 */

exports.addCounterService = (cid, sid, date) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO COUNTER_SERVICE (cid, sid, date) VALUES (?, ?, ?)';
      db.run(query, [cid, sid, date], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ success: true });
        }
      });
    });
  };

/**
 * giving a counter id, return all the services associated with that counter
 */

  exports.getServicesByCounter = (cid) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM COUNTER_SERVICE WHERE cid = ?';
      db.all(query, [cid], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
