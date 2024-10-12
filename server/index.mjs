"use strict";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import ticketdao from "./dao/ticketdao.js";
import counterdao from "./dao/counterdao.js";
import servicedao from "./dao/servicedao.js";

import session from "express-session";

// init express
const app = new express();
const port = 3001;

// set-up middlewares
app.use(morgan("dev"));
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your client's origin
  credentials: true,
};
app.use(cors(corsOptions));

// set up the session
app.use(
  session({
    secret: "wge8d239bwd93rkskb",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Services API

// GET /api/services/:id
app.get("/api/services/:id", async (req, res) => {
  try {
    const serviceId = parseInt(req.params.id); // Parse the service ID from the request parameters
    if (isNaN(serviceId)) {
      return res.status(400).json({ error: "Invalid service ID" }); // Handle invalid ID
    }

    const result = await servicedao.getServiceById(serviceId); // Call the function to get service info
    if (!result) {
      return res.status(404).json({ error: "Service not found" }); // Handle service not found
    }

    res.json(result); // Return the service information as JSON
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" }); // Handle server errors
  }
});

// GET /api/services
app.get("/api/services", async (req, res) => {
  try {
    const result = await servicedao.getAllServices(); // Call the function to get all services
    res.json(result); // Return the list of services as JSON
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" }); // Handle server errors
  }
});

// POST /api/services
app.post("/api/services", async (req, res) => {
  const { svcType, avgSvcTime, svcName } = req.body;

  try {
    // Validate the request body
    if (!svcType || !avgSvcTime || !svcName) {
      return res.status(400).json({ error: "All fields are required" }); // Return a 400 error if required fields are missing
    }

    const result = await servicedao.createService(svcType, avgSvcTime, svcName);

    res.status(201).json({ sid: result.sid }); // Return a 201 Created status with the service ID
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" }); // Handle server errors
  }
});

// PUT /api/services/:id
app.put("/api/services/:id", async (req, res) => {
  const serviceId = parseInt(req.params.id);
  const { svcType, avgSvcTime, svcName } = req.body;

  try {
    // Validate the request body
    if (isNaN(serviceId) || !svcType || !avgSvcTime || !svcName) {
      return res.status(400).json({ error: "All fields are required" }); // Return a 400 error if required fields are missing
    }

    const result = await servicedao.updateService(
      serviceId,
      svcType,
      avgSvcTime,
      svcName
    );
    if (!result) {
      return res.status(404).json({ error: "Service not found" }); // Handle service not found
    }

    res.status(204).end(); // Return a 204 No Content status
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" }); // Handle server errors
  }
});

// DELETE /api/services/:id
app.delete("/api/services/:id", async (req, res) => {
  const serviceId = parseInt(req.params.id);

  try {
    if (isNaN(serviceId)) {
      return res.status(400).json({ error: "Invalid service ID" }); // Handle invalid ID
    }

    const result = await servicedao.deleteService(serviceId);
    if (!result) {
      return res.status(404).json({ error: "Service not found" }); // Handle service not found
    }

    res.status(200).end(); // Return a 200 OK status
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" }); // Handle server errors
  }
});
export default app;

// COUNTER API

// GET /api/counters
app.get("/api/counters", async (req, res) => {
  try {
    const counters = await counterdao.getAllCounters();
    res.json(counters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/counters/:id
app.get("/api/counters/:id", async (req, res) => {
  const counterId = parseInt(req.params.id);

  try {
    if (isNaN(counterId)) {
      return res.status(400).json({ error: "Invalid counter ID" });
    }

    const counter = await counterdao.getCounterById(counterId);
    if (!counter) {
      return res.status(404).json({ error: "Counter not found" });
    }
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/counters
app.post("/api/counters", async (req, res) => {
  const { cName } = req.body;
  try {
    if (!cName) {
      return res.status(400).json({ error: "Counter name is required" });
    }

    const result = await counterdao.createCounter(cName);
    res.status(201).json(result); // Returns the newly created counter ID
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/counters/:id
app.put("/api/counters/:id", async (req, res) => {
  const counterId = parseInt(req.params.id);
  const { cName } = req.body;

  try {
    if (isNaN(counterId) || !cName) {
      return res
        .status(400)
        .json({ error: "Counter ID and name are required" });
    }

    const result = await counterdao.updateCounter(counterId, cName);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Counter not found" });
    }
    res.status(204).end(); // Without any Content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/counters/:id - Delete a counter
app.delete("/api/counters/:id", async (req, res) => {
  const counterId = parseInt(req.params.id);

  try {
    if (isNaN(counterId)) {
      return res.status(400).json({ error: "Invalid counter ID" });
    }
    const result = await counterdao.deleteCounter(counterId);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Counter not found" });
    }
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// COUNT SERVICE API

// TICKET API

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Export the app and server
export { app, server };
