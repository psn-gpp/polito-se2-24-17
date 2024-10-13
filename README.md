# Office Queue Management System

## How to run the Web app
To run the web app refer to the following step:
(Note: VS Code is used as a reference IDE)

- Open two terminals (reffered to as 'terminal 1' and 'terminal 2')

- In terminal 1, type the following commands:
  - `cd server`
  - `npm i`
  - `nodemon index.mjs` (to start the server)
- In terminal 2, type the following commands:
  - `cd client`
  - `npm i`
  - `npm run dev` (to start the client)

- Open a browser window, in the URL field, type `http://localhost:5173/` and press Enter. The client is loaded. The user can interact with the server through the client.

## React Client Application Routes

- Route `/`: Home page of the queue system, shows buttons to choose the role of the user (customer, manager, officer), redirects to Route `/customer` or `/manager` or `/officer` based on the selected role
- Route `/customer`: route for customer view of servise selection, shows a list of options with available services from one option should be selected
- Route `/display`: route for display board view, shows a list of pairs (ticket code, counter number) for those customers who are called and are currently being served
- Route `/manager`: route for manager view, shows a page with functionalities offered to manager (@ the moment, blank page)
- Route `/officer`: route for officer view, shows a list of available counters from to select one, redirects to Route `/officer/:counterId`
- Route `/officer/:counterId`: route for officer view of particular counter, shows details about the currently served customer (ticket code, service type), date and time and a button to call next customer
- Route `/*`: default route for routes that don't exist

## APIs Server

### **SERVICES**

### GET `/api/services`
- **Description:** Returns all services independent from the type.
- **Request:** No body required.
- **Response:** Returns `200 OK` (success) or `500 Internal Server Error` (generic error).
- **Response Body:** (Content-Type: `application/json`)
  ```json
  [
    {
      "sid": 1,
      "svcType": "Type A",
      "avgSvcTime": 15,
      "svcName": "Service A"
    },
    {
      "sid": 2,
      "svcType": "Type B",
      "avgSvcTime": 30,
      "svcName": "Service B"
    }
  ]
  ```

### GET `/api/services/:id`
- **Description:** Returns the service information for a specific service ID.
- **Request:** No body required.
- **Response:** Returns `200 OK` (success), `400 Bad Request` (invalid ID), `404 Not Found` (service not found), or `500 Internal Server Error` (generic error).
- **Response Body:** (Content-Type: `application/json`)
  ```json
  {
    "sid": 1,
    "svcType": "Type A",
    "avgSvcTime": 15,
    "svcName": "Service A"
  }
  ```

### POST `/api/services`
- **Description:** Creates a new service.
- **Request Body:** (Content-Type: application/json).
```json
  {
    "svcType": "Type A",
    "avgSvcTime": 15,
    "svcName": "Service A"
  }
  ```
- **Response:** Returns 201 Created (success) or 500 Internal Server Error (generic error).
- **Response Body:** (Content-Type: `application/json`)
  ```json
  {
    "sid": 1,
  }
  ```
### PUT `/api/services/:id`
- **Description:** Updates an existing service.
- **Request Body:** (Content-Type: application/json).
  ```json
  {
    "svcType": "Type A",
    "avgSvcTime": 15,
    "svcName": "Service A"
  }
  ```
- **Response:** Returns 204 No Content (success), 400 Bad Request (invalid ID or missing fields), 404 Not Found (service not found), or 500 Internal Server Error (generic error).

### DELETE `/api/services/:id`
- **Description:**  Deletes a service.
- **Request Body:** No body required.
- **Response:** Returns 200 OK (success), 400 Bad Request (invalid ID), 404 Not Found (service not found), or 500 Internal Server Error (generic error).

### **TICKETS**
<!-- sample to fill -->
<!-- ###  GET/POST/PUT/PATCH/DELETE `/api/tickets/sth`
- **Description:** Do sth
- **Request Parameters:** _None_.
- **Request Body:** _None_
- **Response:** Returns:
    - `200 OK` (success)
    - `400 Bad Request` (invalid id)
    - `404 Not Found` (empty db) if entry `:id` is not present in db.
    - `422 Unprocessable Entity` (validation error).
    - `500 Internal Server Error` (generic error).
    - `503 Service Unavailable` (generic error).

- **Response Body:** (Content-Type: `application/json`)
  ```json
    {
    }
  ``` -->

###  GET `/api/tickets`
- **Description:** Retrieve all tickets in database
- **Request Parameters:** _None_.
- **Request Body:** _None_.
- **Response:** Return:
    - `200 OK` (success)
    - `500 Internal Server Error` (generic error).
- **Response Body:** (Content-Type: `application/json`)
  ```json
  [
    {
      "tid": 1,
      "sid": 1,
      "cid": null,
      "tCode": 1,
      "date": "2024-10-01", // YYYY-MM-DD
      "time": "09:45:10", // HH:mm:ss
      "isServed": 0,
      "avgWaitTime": null   // TODO in another story
    },
    {
      "tid": 2,
      "sid": 3,
      "cid": 1,
      "tCode": 2,
      "date": "2024-10-01", // YYYY-MM-DD
      "time": "10:00:00", // HH:mm:ss
      "isServed": 1,
      "avgWaitTime": null  // TODO in another story
    },
    ...
  ]

  or empty array for empty db table
  [

  ]
  ```

###  GET `/api/tickets/:tid`
- **Description:** Retrieve ticket with unique `:tid`.
- **Request Parameters:** `:tid` not empty, integer, >0.
- **Request Body:** _None_.
- **Response:** Returns:
    - `200 OK` (success).
    - `404 Not Found` (empty db) if ticket `:tid` is not present in db.
    - `422 Unprocessable Entity` (validation error).
    - `500 Internal Server Error` (generic error).
- **Response Body:** (Content-Type: `application/json`)
  ```json
    {
      "tid": 2,
      "sid": 3,
      "cid": 1,
      "tCode": 2,
      "date": "2024-10-01", // YYYY-MM-DD
      "time": "10:00:00", // HH:mm:ss
      "isServed": 1,
      "avgWaitTime": 7
    }
  ```

###  POST `/api/tickets`
- **Description:** Insert a new ticket in database
- **Request Parameters:** _None_.
- **Request Body:**
  ```json
    {
      "sid": 3
    }
  ```
- **Response:** Returns:
    - `200 OK` (success)
    - `400 Bad Request` (ticket created but ticket id not found in db)
    - `404 Not Found` (service id not present in db)
    - `422 Unprocessable Entity` (validation error) - sid should be not empty, integer, >0.
    - `503 Service Unavailable` (generic error).
- **Response Body:** (Content-Type: `application/json`)
  ```json
    {
      "tid": 3,
      "sid": 3,
      "cid": null,
      "tCode": 1,
      "date": "2024-10-02", // YYYY-MM-DD
      "time": "11:00:00", // HH:mm:ss
      "isServed": 0,
      "avgWaitTime": null   // TODO in another story, now left null
    }
  ```

###  PATCH `/api/tickets/:cid`
- **Description:** 
1. Update a ticket (with `tid` in request body), set it as served on counter `cid`. If the request body is empty, no ticket is set as served, go to next step 2.
2. Select next ticket to be served for counter `cid` and update that ticket with the counter `cid` info.
- **Request Parameters:** `:cid` not empty, integer, >0.
- **Request Body:**
  ```json
    {
      "tid": 3
    }
  ```

    OR

    _None_

- **Response:** Returns:
    - `200 OK` (success)
    - `404 Not Found` (empty db) if entry `:cid` or entry `:tid` is not present in db.
    - `422 Unprocessable Entity` (validation error) `:cid` and `:tid` should be not empty, integer, >0.
    - `503 Service Unavailable` (generic error) internal db error or ticket with `:tid` to be set served has a counterId != req param `:cid`.

- **Response Body:** (Content-Type: `application/json`)
  ```json
    {
      "tid": 10,
      "sid": 3,
      "cid": 1,
      "tCode": 1,
      "date": "2024-10-03", // YYYY-MM-DD
      "time": "09:00:00", // HH:mm:ss
      "isServed": 0,
      "avgWaitTime": null   // TODO in another story, now left null
    }
  ```

###  DELETE `/api/tickets/:tid`
- **Description:** Delete ticket `:tid` from database
- **Request Parameters:** `:tid` not empty, integer, >0.
- **Request Body:** _None_
- **Response:** Returns:
    - `200 OK` (success)
    - `404 Not Found` (empty db) if ticket `:tid` is not present in db.
    - `422 Unprocessable Entity` (validation error).
    - `503 Service Unavailable` (generic error).
- **Response Body:** _None_.

## Database Tables

### COUNTER (cid, cName)
- **cid**: 
  - **Type**: INTEGER 
  - **Description**: The unique identifier for each counter (Primary Key). It is auto-incremented, meaning it automatically increases by one with each new record.
  
- **cName**: 
  - **Type**: VARCHAR(100) 
  - **Description**: The name of the counter (e.g., "A", "B", "C", etc.). This field cannot be null.

---

### SERVICE (sid, svcType, avgSvcTime, svcName)
- **sid**: 
  - **Type**: INTEGER 
  - **Description**: The unique identifier for each service (Primary Key). It is auto-incremented.

- **svcType**: 
  - **Type**: VARCHAR(100) 
  - **Description**: The type of service offered (e.g., shipping, account management). This field cannot be null.

- **avgSvcTime**: 
  - **Type**: INTEGER 
  - **Description**: The average service time in minutes. This field cannot be null and remains constant once defined.

- **svcName**: 
  - **Type**: VARCHAR(100) 
  - **Description**: A user-friendly name for the service (e.g., "Ship Letters", "Ship Parcels"). This field cannot be null.

---

### COUNTER_SERVICE (cid, sid, date)
- **cid**: 
  - **Type**: INTEGER 
  - **Description**: A foreign key referencing the **cid** in the COUNTER table, indicating which counter provides the service.

- **sid**: 
  - **Type**: INTEGER 
  - **Description**: A foreign key referencing the **sid** in the SERVICE table, indicating which service is being provided.

- **date**: 
  - **Type**: DATE 
  - **Description**: The date when the service is provided, formatted as yyyy-mm-dd.

- **PRIMARY KEY**: 
  - **Description**: A composite primary key consisting of **(cid, sid, date)** to ensure each combination is unique.

- **FOREIGN KEY**: 
  - **Description**: 
    - **(cid)** references COUNTER(cid)
    - **(sid)** references SERVICE(sid)

---

### TICKET (tid, sid, cid, tCode, date, time, isServed, avgWaitTime)
- **tid**: 
  - **Type**: INTEGER 
  - **Description**: The unique identifier for each ticket (Primary Key). It is auto-incremented.

- **sid**: 
  - **Type**: INTEGER 
  - **Description**: A foreign key referencing the **sid** in the SERVICE table, indicating which service is associated with the ticket.

- **cid**: 
  - **Type**: INTEGER 
  - **Description**: A foreign key referencing the **cid** in the COUNTER table, indicating which counter is serving the ticket.

- **tCode**: 
  - **Type**: INTEGER 
  - **Description**: The ticket code for the day, used to identify the ticket.

- **date**: 
  - **Type**: DATE 
  - **Description**: The date the ticket is generated, formatted as YYYY-MM-DD.

- **time**: 
  - **Type**: TIME 
  - **Description**: The time the ticket is generated, formatted as HH:mm:ss.

- **isServed**: 
  - **Type**: BOOLEAN 
  - **Description**: Indicates whether the ticket has been served (1 if yes, 0 if no). Defaults to FALSE.

- **avgWaitTime**: 
  - **Type**: INTEGER 
  - **Description**: The average wait time in minutes, to be calculated later.

- **FOREIGN KEY**: 
  - **Description**: 
    - **(sid)** references SERVICE(sid)
    - **(cid)** references COUNTER(cid)


## Main React Components

## Class diagram



## Screenshot


