import React, { useEffect, useState, useRef } from 'react';
import { Container, Button, Table, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import MyNavbar from './MyNavbar';
import API from '../API.jsx';

function DisplayBoard() {
    const navigate = useNavigate();
    const [servedCustomers, setServedCustomers] = useState([]); 
    const [lastCalledTicket, setLastCalledTicket] = useState(null); // Track the last called ticket
    const [showNotification, setShowNotification] = useState(false); // Track whether to show the card
    const firstLoad = useRef(true);  // Use useRef to track first load

    useEffect(() => {
      // Function to fetch tickets
      const getTickets = async () => {  
        try {
          const result = await API.getTickets();
          const today = new Date().toISOString().split('T')[0]; 
          const servedCustomersToday = result.filter(ticket => 
            ticket.cid != null && ticket.date === today
          );
          
          // If it's the first load and there's at least one customer, show notification
          if (firstLoad.current && servedCustomersToday.length > 0) {
            const firstTicket = servedCustomersToday[0];
            setLastCalledTicket(firstTicket); // Set the first ticket called
            setShowNotification(true); // Show the notification card
            firstLoad.current = false; // Set the first load flag to false

            // Automatically hide the card after 3 seconds
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          }

          // If there's a new ticket being served compared to the previous list
          if (servedCustomers.length > 0 && servedCustomersToday.length > servedCustomers.length) {
            const newTicket = servedCustomersToday[servedCustomersToday.length - 1]; // Get the latest ticket
            setLastCalledTicket(newTicket); // Update the state with the new ticket
            setShowNotification(true); // Show the notification card
          
            // Automatically hide the card after 3 seconds
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          }

          setServedCustomers(servedCustomersToday); // Update state with filtered customers
        } catch (error) {
          console.error('Error fetching tickets:', error.message);
        }
      }

      // Call getTickets initially
      getTickets();

      // Polling: Fetch tickets every 5 seconds
      const intervalId = setInterval(getTickets, 5000); 

      // Cleanup: Clear the interval when the component unmounts
      return () => clearInterval(intervalId);

    }, [servedCustomers]); // Re-run effect when servedCustomers changes

    return (
        <>
        <MyNavbar />
        <Container className="mt-4">
            <Button variant="primary" onClick={() => navigate('/')} className="mb-3">
                <FaHome style={{ marginRight: '8px' }} />
                Back to Home
            </Button>

            <h2 className="text-center">Customers Being Served</h2>

            {/* Show notification card when a new ticket is called */}
            {showNotification && lastCalledTicket && (
                <Row className="justify-content-center mb-4">
                  <Col md={6}>
                    <Card bg="success" text="white" className="text-center">
                      <Card.Body>
                        <Card.Title>New Ticket Called</Card.Title>
                        <Card.Text>
                          Ticket ID: {lastCalledTicket.tCode} is now being served at Counter {lastCalledTicket.cid}.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
            )}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ticket Code</th>
                        <th>Counter Number</th>
                    </tr>
                </thead>
                <tbody>
                    {servedCustomers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.tCode}</td>
                            <td>{customer.cid}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </>
    );
}

export default DisplayBoard;
