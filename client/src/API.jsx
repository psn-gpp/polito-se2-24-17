
const URL = 'http://localhost:3001/api';

//start here for create function to generate 
function getServices() {
    // call GET /api/services
    return new Promise((resolve, reject) => {
      fetch(URL + '/services', {
      })
      .then(response => {
          if(response.ok){
              response.json()
              .then(users => { resolve(users); });
          } else {
              // analyze the cause of error
              response.json()
              .then(message => { reject(message); }) // error message in the response body
              .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  } 
const API = {getServices};
  
export default API;