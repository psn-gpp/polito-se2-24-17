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


- GET `/api/services`
  - Descrizione: return all services indipendent from the type.
  - Request: No body required.
  - Response: return  `200 OK` (success) o `500 Internal Server Error` (error generic). 
  - Response body: (Content-Type: `application/json`)
  ```json
  [
  ]
  ```


## Database Tables



## Main React Components

## Class diagram



## Screenshot


