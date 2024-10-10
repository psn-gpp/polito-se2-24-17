'use strict';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

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
    secure: false, // set to true if using HTTPS
    httpOnly: true,
    sameSite: 'lax' // set the sameSite attribute correctly
  }
}));

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


// GET /api/services/:id,
app.get('/api/services/:id', async (req, res) => {
  try {
    /*const result = await dao.getGame(req.params.id, req.user.id)
    if (result.error) {
      res.status(404).json(result);
    }
    else {
      res.json(result);
    }*/
  } catch (err) {
    res.status(500).end();
  }
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
