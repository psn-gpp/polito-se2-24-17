'use strict';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import ticketdao from './ticketdao.js';
import counterdao from './counterdao.js';
import servicedao from './servicedao.js';

import session from 'express-session';

// init express
const app = new express();
const port = 3001;

// set-up middlewares
app.use(morgan('dev'));
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your client's origin
  credentials: true
};
app.use(cors(corsOptions));

// set up the session
app.use(session({
  secret: 'wge8d239bwd93rkskb',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true,
    sameSite: 'lax' 
  }
}));

// Services API

// GET /api/services/:id
app.get('/api/services/:id', async (req, res) => {
  try {
    const serviceId = parseInt(req.params.id); // Parse the service ID from the request parameters
    if (isNaN(serviceId)) {
      return res.status(400).json({ error: 'Invalid service ID' }); // Handle invalid ID
    }

    const result = await servicedao.getServiceById(serviceId); // Call the function to get service info
    if (!result) {
      return res.status(404).json({ error: 'Service not found' }); // Handle service not found
    }
    
    res.json(result); // Return the service information as JSON
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error' }); // Handle server errors
  }
});

// POST /api/services
app.post('/api/services', async (req, res) => {
  const { svcType, avgSvcTime, svcName } = req.body; 

  try {
    // Validate the request body
    if (!svcType || !avgSvcTime || !svcName) {
      return res.status(400).json({ error: 'All fields are required' }); // Return a 400 error if required fields are missing
    }

    const result = await servicedao.createService(svcType, avgSvcTime, svcName);
    
    res.status(201).json({ sid: result.sid }); // Return a 201 Created status with the service ID
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Internal server error' }); // Handle server errors
  }
});



//.. needed to finish tomorrow

// COUNTER API



// COUNT SERVICE API


// TICKET API



// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
