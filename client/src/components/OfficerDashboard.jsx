import React, { useEffect, useState } from 'react';
import { Container, Card, Dropdown, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API.jsx';
import MyNavbar from './MyNavbar';
import { FaHome } from 'react-icons/fa';

function OfficerDashboard() {
    const navigate = useNavigate();
    const [selectedCounter, setSelectedCounter] = useState('');
    const [counters, setCounters] = useState([]);

    useEffect(() => {
      // Fetch counters from the backend
      const getCounters = async () => {
        try {
          const result = await API.getCounters();
          console.log(result);
          setCounters(result);
        } catch (error) {
          throw error;
        }
      }

      getCounters();
    }, []);

    const handleCounterSelect = (counter) => {
        setSelectedCounter(counter);
    };

    const handleConfirm = () => {
        // Handle the confirm action, e.g., navigating to the selected counter's page
        console.log('Selected Counter:', selectedCounter);
        navigate(`/officer/${selectedCounter.cid}`);
    };

    return (
        <>
        <MyNavbar></MyNavbar>
        
        <Container className="mt-5">
            <Button variant="primary" onClick={() => navigate('/')} className="mb-3">
                <FaHome style={{ marginRight: '8px' }} />
                Back to Home
            </Button>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Select a Counter</Card.Title>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {selectedCounter.cName || 'Select a Counter'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {counters.map((counter) => <Dropdown.Item key={counter.cid} onClick={() => handleCounterSelect(counter)}> {counter.cName}</Dropdown.Item>)}
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
        </>
    );
}

export default OfficerDashboard;
