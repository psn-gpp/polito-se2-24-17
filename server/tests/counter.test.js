import request from 'supertest'; // Import supertest for testing HTTP requests
const { app, server } = require('../index.mjs'); // Use require for your app and server

describe("Counter API", () => {
  let createdCounterId; // Variable to hold the created counter ID

  // Test creating a new counter
  it("should create a new counter", async () => {
    const response = await request(app)
      .post('/api/counters')
      .send({ cName: 'Test Counter' });

    expect(response.statusCode).toBe(201); // Expect a 201 Created status
    createdCounterId = response.body.cid; // Store the created counter ID for future tests
  });

  // Test retrieving all counters
  it("should return all counters", async () => {
    const response = await request(app).get('/api/counters');
    expect(response.statusCode).toBe(200); // Expect a 200 OK status
    expect(Array.isArray(response.body)).toBe(true); // Expect the response body to be an array
    expect(response.body.length).toBeGreaterThan(0); // Check that there are counters in the response
  });

  // Test retrieving a single counter by ID
  it("should return the created counter", async () => {
    const response = await request(app).get(`/api/counters/${createdCounterId}`);
    expect(response.statusCode).toBe(200); // Expect a 200 OK status
    expect(typeof response.body).toBe('object'); // Expect the response body to be an object
    expect(response.body.cid).toBe(createdCounterId); // Check that the counter ID is correct
  });

  // Test updating the counter
  it("should update the created counter", async () => {
    const response = await request(app)
      .put(`/api/counters/${createdCounterId}`)
      .send({ cName: 'Updated Counter' });

    expect(response.statusCode).toBe(204); // Expect a 204 No Content status
  });

  // Test deleting the counter
  it("should delete the created counter", async () => {
    const response = await request(app).delete(`/api/counters/${createdCounterId}`);
    expect(response.statusCode).toBe(200); // Expect a 200 OK status
  });

  // Test handling invalid counter ID
  it("should return 400 for invalid counter ID", async () => {
    const response = await request(app).get('/api/counters/invalid-id');
    expect(response.statusCode).toBe(400); // Expect a 400 Bad Request status
  });

  // Close the server after all tests have run
  afterAll(async () => {
    await new Promise(resolve => {
      server.close(resolve); // Close the server
    });
  });
});
