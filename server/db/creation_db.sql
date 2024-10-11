
-- Create the database with 4 tables: COUNTER, SERVICE, COUNTER_SERVICE, and TICKET descibed the below schema
SELECT * FROM SERVICE WHERE sid IS NULL;
DROP TABLE IF EXISTS COUNTER_SERVICE;
DROP TABLE IF EXISTS TICKET;
DROP TABLE IF EXISTS SERVICE;
DROP TABLE IF EXISTS COUNTER;

CREATE TABLE COUNTER (
  cid INTEGER PRIMARY KEY AUTOINCREMENT,  -- Counter ID (Primary Key, Auto-Incremented)
  cName VARCHAR(100) NOT NULL            -- Name of the counter (e.g., "A", "B", "C", etc.)
);

CREATE TABLE SERVICE (
  sid INTEGER PRIMARY KEY AUTOINCREMENT,  -- Service ID (Primary Key, Auto-Incremented)
  svcType VARCHAR(100) NOT NULL,         -- Service type (e.g., shipping, account management)
  avgSvcTime INTEGER NOT NULL,               -- Average service time in minutes (constant once defined)
  svcName VARCHAR(100) NOT NULL          -- User-friendly name for the service (e.g., ship letters, ship parcels)
);

CREATE TABLE COUNTER_SERVICE (
  cid INTEGER,                     -- Foreign key from COUNTER
  sid INTEGER,                     -- Foreign key from SERVICE
  date DATE,                   -- Date in format yyyy-mm-dd
  PRIMARY KEY (cid, sid,date),   -- Composite primary key
  FOREIGN KEY (cid) REFERENCES COUNTER(cid),   -- Foreign key constraint for COUNTER
  FOREIGN KEY (sid) REFERENCES SERVICE(sid)    -- Foreign key constraint for SERVICE
);

CREATE TABLE TICKET (
  tid INTEGER PRIMARY KEY AUTOINCREMENT,   -- Ticket ID (Primary Key, Auto-Incremented)
  sid INTEGER NOT NULL,                       -- Foreign key from SERVICE table (service chosen)
  cid INTEGER,                                -- Foreign key from COUNTER table (counter serving the ticket)
  tCode INTEGER NOT NULL,                     -- Ticket code for the day
  date DATE NOT NULL,                   -- Date of ticket generation (yyyy-mm-dd)
  time TIME NOT NULL,                   -- Time of ticket generation (hh:mm:ss)
  isServed BOOLEAN DEFAULT FALSE,         -- Whether the ticket has been served (1 if yes, 0 if no)
  avgWaitTime INTEGER,                        -- Average wait time in minutes (to be calculated later)
  FOREIGN KEY (sid) REFERENCES SERVICE(sid),  -- Foreign key constraint for SERVICE
  FOREIGN KEY (cid) REFERENCES COUNTER(cid)   -- Foreign key constraint for COUNTER
);