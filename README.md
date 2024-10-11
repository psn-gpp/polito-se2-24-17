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

### POST /api/services
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
### PUT /api/services/:id
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

### DELETE /api/services/:id
- **Description:**  Deletes a service.
- **Request Body:** No body required.
- **Response:** Returns 200 OK (success), 400 Bad Request (invalid ID), 404 Not Found (service not found), or 500 Internal Server Error (generic error).



## Database Tables



## Main React Components

## Class diagram



## Screenshot


