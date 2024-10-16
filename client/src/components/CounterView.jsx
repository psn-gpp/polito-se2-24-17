import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../API.jsx';
import MyNavbar from './MyNavbar';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
const CounterView = () => {
  const { counterId } = useParams(); // Get the counter ID from the URL params
  const navigate = useNavigate();
  
  // State for storing services
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy data for currently served customer (we can replace it with actual data fetching logic)
  const currentCustomer = {
    ticketCode: 'A123',
    serviceType: 'Service Type Example',
    dateTime: new Date().toLocaleString(), // Current date and time
  };

  // Function to fetch counter services
  const getCounterServices = async (counterId) => {
    try {
      const response = await API.getCounterServices(counterId); // Assuming you have a function in API to get counter services
        return response; // Return the fetched services
    } catch (error) {
      console.error('Error fetching counter services:', error.message);
      throw error;
    }
  };

  // Call getCounterServices when component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getCounterServices(counterId);
        setServices(servicesData); // Update state with fetched services
      } catch (err) {
        setError(err.message); // Set error state if there's an issue
      } finally {
        setLoading(false); // Remove loading state when done
      }
    };

    fetchServices(); // Call the function to fetch services
  }, [counterId]); // Dependency array with counterId to trigger fetch when counterId changes

  // Logic to call the next customer (we can implement this as needed)
  const handleCallNextCustomer = async () => {
    try {
      const result = await API.updateTicket(1, counterId); // Assuming you have a function in API to update ticket
      alert('Calling next customer...');
    } catch (error) {
      console.error(error);
      alert('No more customers in the queue!');
    }
  };

  return (
    <>
      <MyNavbar />

      <Container className="mt-5">
        <Button
          variant="primary"
          onClick={() => navigate('/officer')}
          className="mb-3"
        >
          <FaHome style={{ marginRight: '8px' }} />
          Back to selection of counters
        </Button>
        
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Counter: {counterId}</Card.Title>
            <p>Ticket Code: {currentCustomer.ticketCode}</p>
            <p>Service Type: {currentCustomer.serviceType}</p>
            <p>Date and Time: {currentCustomer.dateTime}</p>
            <Button variant="primary" onClick={handleCallNextCustomer}>
              Call Next Customer
            </Button>
          </Card.Body>
        </Card>

        <Card className="mt-3">
  <Card.Body>
    <Card.Title>Services Offered at Counter {counterId}</Card.Title>
    {loading ? (
      <p>Loading services...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <>
        {services.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Type</th>
                <th>Average Service Time (minutes)</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.sid}>
                  <td>{service.svcName}</td>
                  <td>{service.svcType}</td>
                  <td>{service.avgSvcTime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No services found for this counter.</p>
        )}
      </>
    )}
  </Card.Body>
</Card>


      </Container>
    </>
  );
};

export default CounterView;
