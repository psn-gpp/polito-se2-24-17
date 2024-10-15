import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DisplayDashBoard() {
    const navigate = useNavigate();

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Display Dashboard</h1>
                    {/* Add display functionalities here */}

                </Col>
            </Row>
        </Container>
    );
}

export default DisplayDashBoard; // Ensure this line is present
