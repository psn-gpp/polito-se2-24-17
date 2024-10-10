'use strict';

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('db.db', (err) => {
    if(err) throw err;
});


//here put implementation of query 


exports.getServiceId = (ServiceId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM service WHERE id = ?';
    db.get(query, [ServiceId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};
