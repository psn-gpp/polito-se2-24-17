"use strict";
const dayjs = require("dayjs");
const Ticket = require("../models/ticket.js");
const db = require("../db/db");

// TICKET APIs
/*
 DP: we can discuss to do more api methods es get tickets of that day, get tickets of that service, get tickets of that counter(discuss tomorrow)
 MN: not needed for user story #1 and user story #2 implemented during sprint 1
*/

// GET `/api/tickets`
/**
 * Retrive all tickets
 * @param {} - no params
 * @returns {Promise<Ticket[]>} Promise resolving to an array of all Ticket objects in db
 */
exports.getAllTickets= () => {
  return new Promise((resolve, reject) => {
    console.log("getAllTickets");
    const query = "SELECT * FROM TICKET";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows.length === 0) {
        resolve([]);  // no tickets in db, empty array
      }
      else {
        const tickets = rows.map(t => new Ticket(t.tid, t.sid, t.cid, t.tCode, t.date, t.time, t.isServed, t.avgWaitTime));
        resolve(tickets);
      }
    });
  });
};

// GET `/api/tickets/:tid`
/**
 * Given a ticket with ticketId, retrieve the all the info about it
 * @param {number} ticketId - id of ticket for which to retieve all info
 * @returns {Promise<Ticket>} Promise resolving to that Ticket obj
 */

exports.getTicketById = (ticketId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM TICKET WHERE tid = ?";
    db.get(query, [ticketId], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve({error: `ticket id ${ticketId} not found`});
      } else {
        resolve(new Ticket(row.tid, row.sid, row.cid, row.tCode, row.date, row.time, row.isServed, row.avgWaitTime));
      }
    });
  });
};

// POST `/api/tickets`
/**
 * Create a new ticket in the database
 * @param {number} serviceId - id of service associated with the ticket.
 * @returns {Promise<Ticket>} Promise resolving to the Ticket object of the newly created ticket.
 */
exports.createTicket = (serviceId) => {
  return new Promise(async (resolve, reject) => {
    const lastTicketCode = await getLastTicketCode(); // retrieve most recent ticket code for today
    const avgWaitTime = null;   // TODO:  in another story, compute avg waiting time for ticket based on service type, min time to serve and number of people in queue
    const today = dayjs().format("YYYY-MM-DD").toString();  // date of ticket generation (format: 'YYYY-MM-DD')
    const time = dayjs().format("HH:mm:ss").toString();   // time stamp of ticket generation (format: 'HH:mm:ss'): HH for 00-23, mm for 00-59, ss for 00-59
    
    const query = `INSERT INTO TICKET (sid, cid, tCode, date, time, isServed, avgWaitTime)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run( query, [serviceId, null, lastTicketCode+1, today, time, 0, avgWaitTime], async function (err) {
        if (err) {
          reject(err);
        } else {
          const ticketInserted = await exports.getTicketById(this.lastID);
          resolve(ticketInserted);
        }
      }
    );
  });
};

// auxiliary func
/**
 * retrive code of lastly genereated ticket today (the current date)
 * @returns {Promise<number>} Promise resolving to the code of lastly generated ticket
 */
exports.getLastTicketCode= () => {
  return new Promise((resolve, reject) => {
    const today = dayjs().format("YYYY-MM-DD").toString();
    const query = "SELECT MAX(tCode) AS lastTicketCode FROM TICKET WHERE date = ?";
    db.get(query, [today], (err, row) => {
      if (err) {
        reject(err);
      } else if (row.lastTicketCode === null ) {
        resolve(0);
      } else {
        resolve(row.lastTicketCode);
      }
    });
  });
}

// PATCH `/api/tickets/:cid`
/**
 * Given a ticket with ticketId and a computed value for the counter counterId which will serve the ticket, assign that counter to the ticket
 * @param {number} ticketId - unique id of ticket to update
 * @param {number} counterId - unique id of counter to assign to the ticket
 * @returns {Promise<Ticket>} Promise resolving to the updated Ticket obj
 */
exports.updateTicketAssignCounter = (ticketId,counterId) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE TICKET SET cid = ? WHERE tid = ?";
    db.run( query, [counterId, ticketId], async function (err) {
        if (err) {
          reject(err);
        } else {
          const ticketCounterAssigned = await exports.getTicketById(ticketId);
          resolve(ticketCounterAssigned);
        }
      }
    );
  });
};

// PATCH `/api/tickets/:cid`
/**
 * Given a ticket with ticketId, update that ticket as served
 * @param {number} ticketId - unique id of ticket to update
 * @returns {Promise<Ticket>} Promise resolving to the updated Ticket obj
 */
exports.updateTicketSetServed = (ticketId) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE TICKET SET isServed = 1 WHERE tid = ?";
    db.run( query, [ticketId], async function (err) {
        if (err) {
          reject(err);
        } else {
          const ticketSetServed = await exports.getTicketById(ticketId);
          resolve(ticketSetServed);
        }
      }
    );
  });
};

// DELETE `/api/tickets/:tid`
/**
 * Given a ticket with ticketId, delete that ticket from the database
 * @param {number} ticketId - id of ticket to be deleted
 * @returns {Promise<{ tid: number }>} Promise resolving to an object with field "ok" containing the number of changes
 */
exports.deleteTicket= (ticketId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM TICKET WHERE tid = ?";
    db.run(query, [ticketId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ ok: this.changes });
      }
    });
  });
};

// auxiliary func
// != getTicketById as it hides info since it does not return to the server all data about the ticket, but only a boolean to indicate its existence

/**
 * check if a ticket exists
 * @param ticketId - id of ticket
 * @returns {Promise<boolean>} Promise resolving to a boolean : true if ticket exists, false otherwise
 */
exports.existsTicket = (ticketId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM TICKET WHERE tid = ?";
    db.get(query, [ticketId], (err, row) => {
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