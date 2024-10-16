import React, { useState } from 'react';
import { Container, Card, Dropdown, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function OfficerDashboard() {
    const navigate = useNavigate();
    const [selectedCounter, setSelectedCounter] = useState('');

    const handleCounterSelect = (counter) => {
        setSelectedCounter(counter);
    };

    const handleConfirm = () => {
        // Handle the confirm action, e.g., navigating to the selected counter's page
        console.log('Selected Counter:', selectedCounter);
        navigate(`/officer/${selectedCounter}`);
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
                                    <Dropdown.Item onClick={() => handleCounterSelect('Counter 4')}>Counter 4</Dropdown.Item>
                                    {/* we can add more counters as needed it will be fetched from backend dynamically too*/}
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="mt-3">
                                <Button variant="secondary" onClick={() => navigate('/')} className="me-2">
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
