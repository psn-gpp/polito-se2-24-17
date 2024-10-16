import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

const CounterView = () => {
    const { counterId } = useParams();

    // Dummy data for currently served customer (we can replace it with actual data fetching logic)
    const currentCustomer = {
        ticketCode: 'A123',
        serviceType: 'Service Type Example',
        dateTime: new Date().toLocaleString(), // Current date and time
    };

    const handleCallNextCustomer = () => {
        // Logic to call the next customer (we can implement this as needed)
        alert('Calling next customer...');
    };

    return (
        <Container className="mt-5">
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Counter: {counterId}</Card.Title>
                    <p>Ticket Code: {currentCustomer.ticketCode}</p>
                    <p>Service Type: {currentCustomer.serviceType}</p>
                    <p>Date and Time: {currentCustomer.dateTime}</p>
                    <Button variant="primary" onClick={handleCallNextCustomer}>Call Next Customer</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CounterView;
