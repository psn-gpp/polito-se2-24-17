

const URL = "http://localhost:3001/api";


/******* SERVICES APIs ********/

const getServices = async () => {
  const response = await fetch(URL + "/services");

  if(response.ok) {
    const services = await response.json();
    return services;
  } else {
    throw response.json().error;
  }
}

const getServiceByID = async (serviceID) => {
  const response = await fetch(URL + "/services/" + serviceID);
  if(response.ok) {
    const service = await response.json();
    return service;
  } else {
    throw response.json().error;
  }
}

const addService = async (serviceType, avgServiceTime, serviceName) => {
  const response = await fetch(URL + "/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ serviceType, avgServiceTime, serviceName }),
  });

  if(!response.ok) {
    return await response.json();
  } else {
    throw await response.json().error;
  }
  
}

const updateService = async (serviceID, serviceType, avgServiceTime, serviceName) => {
  const response = await fetch(URL + "/services", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ serviceType, avgServiceTime, serviceName }),
  });

  if(!response.ok) {
    return await response.json();
  } else {
    throw await response.json().error;
  }
  
}

const deleteService = async (serviceID) => {
  const response = await fetch(URL + "/services/" + serviceID, {
    method: "DELETE",
  });

  if(!response.ok) {
    return await response.json();
  } else {
    throw await response.json().error;
  }
}


/******* COUNTER APIs ********/

const getCounters = async () => {
  const response = await fetch(URL + "/counters");

  if(response.ok) {
    const counters = await response.json();
    return counters;
  } else {  
    throw await response.json().error;
  }
}

const getCounterByID = async (counterID) => {
  const response = await fetch(URL + "/counters/" + counterID);

  if(response.ok) {
    const counter = await response.json();
    return counter;
  } else {
    throw await response.json().error;
  }
}

const addCounter = async (counterName) => {
  const response = await fetch(URL + "/counters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ counterName }),
  });

  if(!response.ok) {
    return await response.json();
  } else {
    throw await response.json().error;
  }
}

const updateCounter = async (counterID, counterName) => {
  const response = await fetch(URL + "/counters", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ counterName }),
  });

  if(!response.ok) {
    return await response.json();
  } else {
    throw await response.json().error;
  }
}

const deleteCounter = async (counterID) => {
  const response = await fetch(URL + "/counters/" + counterID, {
    method: "DELETE",
  });

  if(!response.ok) {
    return await response.json();
  } else {
    throw await response.json().error;
  }
}

const getCounterServices = async (counterId) => {
  try {
    const response = await fetch(URL +`/counters/${counterId}/services`, {
      method: "GET",
    });

    // If the response is successful (status code 2xx)
    if (response.ok) {
      const data = await response.json();
      return data; // This contains the services data
    } else {
      // If the response is not successful, handle errors
      const errorData = await response.json();
      throw new Error(errorData.error || "Something went wrong");
    }
  } catch (error) {
    console.error("Error fetching counter services:", error.message);
    throw error; // Throwing error so it can be handled in the UI or elsewhere
  }
};



/******* TICKET APIs ********/

const getTickets = async () => {
  const response = await fetch(URL + "/tickets");

  if(response.ok) {
    const tickets = await response.json();
    return tickets;
  } else {
    throw await response.json().error;
  }
}

const getTicketByID = async (ticketID) => {
  const response = await fetch(URL + "/tickets/" + ticketID);

  if(response.ok) {
    const ticket = await response.json();
    return ticket;
  } else {
    throw await response.json().error;
  }
}

const addTicket = async (serviceID) => {
  const response = await fetch(URL + "/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sid: serviceID }),
  });

  if(response.ok) {
    return await response.json();
  } else {
    throw await response.json().error;
  }
}

const updateTicket = async ( ticketID, counterID) => {
  const response = await fetch(URL + "/tickets/" + counterID, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tid: ticketID }),
  });

  if(!response.ok) {
    return await response.json();
  } else {
    throw await response.json().error;
  }
}

const deleteTicket = async (ticketID) => {
  const response = await fetch(URL + "/tickets/" + ticketID, {
    method: "DELETE",
  });
  
  if(!response.ok) {
    return await response.json();
  } else {
    throw await response.json().error;
  }
}




const API = { getServices, getServiceByID, addService, updateService, deleteService, getCounters, getCounterByID, addCounter, updateCounter, deleteCounter, getTickets, getTicketByID, addTicket, updateTicket, deleteTicket,getCounterServices };

export default API;
