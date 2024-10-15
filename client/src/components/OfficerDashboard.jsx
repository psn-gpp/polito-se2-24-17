import React, { useState } from 'react';
import { Container, Card, Dropdown, Button, Row, Col } from 'react-bootstrap';

function OfficerDashboard() {
    const [selectedCounter, setSelectedCounter] = useState('');

    const handleCounterSelect = (counter) => {
        setSelectedCounter(counter);
    };

    const handleConfirm = () => {
        // Handle the confirm action, e.g., navigating to the selected counter's page
        console.log('Selected Counter:', selectedCounter);
    };

    const handleCancel = () => {
        setSelectedCounter('');
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Select a Counter</Card.Title>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {selectedCounter || 'Select a Counter'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleCounterSelect('Counter 1')}>Counter 1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleCounterSelect('Counter 2')}>Counter 2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleCounterSelect('Counter 3')}>Counter 3</Dropdown.Item>
                                    {/* Add more counters as needed */}
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="mt-3">
                                <Button variant="secondary" onClick={handleCancel} className="me-2">
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleConfirm} disabled={!selectedCounter}>
                                    Confirm
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default OfficerDashboard;
