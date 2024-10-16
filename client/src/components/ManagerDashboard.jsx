// src/components/ManagerDashboard.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ManagerDashboard() {
    const navigate = useNavigate();

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Manager Dashboard</h1>
                    {/* Add manager functionalities here */}

                </Col>
            </Row>
        </Container>
    );
}

export default ManagerDashboard; // Ensure this line is present
