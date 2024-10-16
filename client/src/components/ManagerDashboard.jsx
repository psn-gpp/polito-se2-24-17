// src/components/ManagerDashboard.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import MyNavbar from './MyNavbar';
function ManagerDashboard() {
    const navigate = useNavigate();

    return (
        <>
        <MyNavbar></MyNavbar>
        <Container className="mt-4">
            <Button variant="primary" onClick={() => navigate('/')} className="mb-3">
                <FaHome style={{ marginRight: '8px' }} />
                Back to Home
            </Button>
            <Row>
                <Col>
                    <h1>Manager Dashboard</h1>
                    {/* Add manager functionalities here */}

                </Col>
            </Row>
        </Container>
        </>
    );
   
}

export default ManagerDashboard; // Ensure this line is present
