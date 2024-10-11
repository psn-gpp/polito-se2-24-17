# Office Queue Management System

## React Client Application Routes

- Route `/`: Home page of the queue system, shows buttons to choose the role of the user (customer, manager, officer), redirects to Route `/customer` or `/manager` or `/officer` based on the selected role
- Route `/customer`: route for customer view of servise selection, shows a list of options with available services from one option should be selected
- Route `/display`: route for display board view, shows a list of pairs (ticket code, counter number) for those customers who are called and are currently being served
- Route `/manager`: route for manager view, shows a page with functionalities offered to manager (@ the moment, blank page)
- Route `/officer`: route for officer view, shows a list of available counters from to select one, redirects to Route `/officer/:counterId`
- Route `/officer/:counterId`: route for officer view of particular counter, shows details about the currently served customer (ticket code, service type), date and time and a button to call next customer
- Route `/*`: default route for routes that don't exist

## APIs Server


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
  - **Description**: The date the ticket is generated, formatted as yyyy-mm-dd.

- **time**: 
  - **Type**: TIME 
  - **Description**: The time the ticket is generated, formatted as hh:mm:ss.

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


