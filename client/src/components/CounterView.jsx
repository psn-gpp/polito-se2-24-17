import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../API.jsx';
import MyNavbar from './MyNavbar';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const CounterView = () => {
  const { counterId } = useParams(); // Get the counter ID from the URL params
  const navigate = useNavigate();
  
  // State for storing services and customer data
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentTicket, setCurrentTicket] = useState(null); // State to track the current ticket
  const [currentTCode,setCurrentTCode] = useState(null);
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

  

  const handleCallNextCustomer = async () => {
    try {
      alert('Calling next customer...');
  
      // If currentCustomer exists, send the request with either the ticketId or an empty string
      const ticketId = currentCustomer?.tid || '';  // Use empty string if ticketId is null/undefined
    
      // Send the request and handle the next ticket from the response
      const result = await API.updateTicket(ticketId, counterId); // Assuming you have a function in API to update the ticket
      console.log('Ticket updated successfully:', result);
  
      // Check if the next ticket is available in the response
      if (result.ticket) {
        setCurrentCustomer(result.ticket);  // Update the state with the new ticket (next customer)
        setCurrentTicket(result.ticket.tid); // Track the current ticket ID
        setCurrentTCode(result.ticket.tCode);
      } else {
        alert('No more customers in the queue.');
        setCurrentCustomer(null); // Clear the current customer if no next ticket
        setCurrentTicket(null); // Clear the current ticket
      }
  
    } catch (error) {
      alert('No more customers in the queue.');

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
            <Button variant="primary" onClick={handleCallNextCustomer}>
              Call Next Customer
            </Button>

            {/* Display current ticket being handled */}
            {currentTicket && (
              <Card.Text className="mt-3">
                <strong>Currently Handling Ticket ID:</strong> {currentTCode}
              </Card.Text>
            )}
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
