import request from 'supertest'; // Import supertest for testing HTTP requests
const { app, server } = require('../index.mjs'); // Use require for your app and server

describe("Service API", () => {
  let createdServiceId; // Variable to hold the created service ID

  it("should create a new service", async () => {
    const response = await request(app)
      .post('/api/services')
      .send({ svcType: 'Type', avgSvcTime: 10, svcName: 'Name' });

    expect(response.statusCode).toBe(201); // Expect a 201 Created status
    expect(typeof response.body.sid).toBe('number'); // Expect the response body to have a service ID

    createdServiceId = response.body.sid; // Store the created service ID for future tests
  });
  
  it("should return all services", async () => {
    const response = await request(app).get('/api/services');
    expect(response.statusCode).toBe(200); // Expect a 200 OK status
    expect(Array.isArray(response.body)).toBe(true); // Expect the response body to be an array
    expect(response.body.length).toBeGreaterThan(0); // Check that there are services in the response
  });

  it("should return the created service", async () => {
    const response = await request(app).get(`/api/services/${createdServiceId}`);
    expect(response.statusCode).toBe(200); // Expect a 200 OK status
    expect(typeof response.body).toBe('object'); // Expect the response body to be an object
    expect(response.body.sid).toBe(createdServiceId); // Check that the service ID is correct
  });

  it("should update the created service", async () => {
    const response = await request(app)
      .put(`/api/services/${createdServiceId}`)
      .send({ svcType: 'Updated Type', avgSvcTime: 20, svcName: 'Updated Name' });
    
    expect(response.statusCode).toBe(204); // Expect a 204 No Content status
  });

  it("should delete the created service", async () => {
    const response = await request(app).delete(`/api/services/${createdServiceId}`);
    expect(response.statusCode).toBe(200); // Expect a 200 OK status
  });

  // Close the server after all tests have run
  afterAll(async () => {
    await new Promise(resolve => {
      server.close(resolve); // Close the server
    });
  });
});
