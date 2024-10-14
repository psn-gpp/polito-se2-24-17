import request from 'supertest'; // Import supertest for testing HTTP requests
const { app, server } = require('../index.mjs'); // Use require for your app and server

describe("Ticket API", () => {
  let createdTicketId; // Variable to hold the created ticket ID
  const validServiceId = 1; // Assuming service ID 1 exists in the database
  
  it("should create a new ticket", async () => {
    const response = await request(app)
      .post('/api/tickets')
      .send({ sid: validServiceId });

    expect(response.statusCode).toBe(200); // Expect a 200 OK status
    expect(typeof response.body.tid).toBe('number'); // Expect the response body to have a ticket ID

    createdTicketId = response.body.tid; // Store the created ticket ID for future tests
  });
  
  it("should return all tickets", async () => {
    const response = await request(app).get('/api/tickets');
    expect(response.statusCode).toBe(200); // Expect a 200 OK status
    expect(Array.isArray(response.body)).toBe(true); // Expect the response body to be an array
    expect(response.body.length).toBeGreaterThan(0); // Check that there are tickets in the response
  });

  it("should return the created ticket by ID", async () => {
    const response = await request(app).get(`/api/tickets/${createdTicketId}`);
    expect(response.statusCode).toBe(200); // Expect a 200 OK status
    expect(typeof response.body).toBe('object'); // Expect the response body to be an object
    expect(response.body.tid).toBe(createdTicketId); // Check that the ticket ID is correct
  });

  it("should not return a ticket with an invalid ID", async () => {
    const response = await request(app).get('/api/tickets/9999');
    expect(response.statusCode).toBe(404); // Expect a 404 Not Found status
  });

  it("should reassign a ticket to a counter", async () => {
    const counterId = 2; // Assuming counter ID 1 exists
    const response = await request(app)
      .patch(`/api/tickets/${counterId}`)
      .send({ tid: createdTicketId });
    expect(response.statusCode).toBe(200); // Expect a 200 OK status
    expect(response.body.ticket.cid).toBe(counterId); // Check that the counter ID is correct
  });

  it("should delete the created ticket", async () => {
    const response = await request(app).delete(`/api/tickets/${createdTicketId}`);
    expect(response.statusCode).toBe(200); // Expect a 200 OK status
  });

  // Close the server after all tests have run
  afterAll(async () => {
    await new Promise(resolve => {
      server.close(resolve); // Close the server
    });
  });
});
