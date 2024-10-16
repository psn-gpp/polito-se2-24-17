import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CustomerDashboard() {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState('');
    const [showModal, setShowModal] = useState(false);

    const services = [
        'Ship A Parcel',
        'Track A Parcel',
        'Return A Parcel',
        'Send Money',
        'Pay Tax',
    ];

    const handleConfirm = () => {
        setShowModal(true);
    };

    const handleProceed = () => {
        // Generate ticket details when the user confirms
        const ticketNumber = Math.random().toString(36).substr(2, 6).toUpperCase(); // 6-character alphanumeric
        //const counterNumber = Math.floor(Math.random() * 10) + 1;
        const qrValue = `${selectedService} - Ticket: ${ticketNumber}`; //, Counter: ${counterNumber} in case if we need counternumber in the future

        const ticketDetails = {
            service: selectedService,
            ticketNumber,
            //counterNumber,
            qrValue,
        };

        // Navigate to the ticket display page with ticket details
        navigate('/customer/ticket', { state: ticketDetails });

        setShowModal(false);
    };

    return (
        <Container>
            <h2>Select a Service</h2>
            <ListGroup>
                {services.map((service, index) => (
                    <ListGroup.Item
                        action
                        key={index}
                        active={selectedService === service}
                        onClick={() => setSelectedService(service)}
                    >
                        {service}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Row className="my-3">
                <Col>
                    <Button variant="danger" onClick={() => navigate('/')}>Cancel</Button>
                </Col>
                <Col>
                    <Button variant="success" onClick={handleConfirm}>Confirm</Button>
                </Col>
            </Row>

            {/* Modal for confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to proceed with {selectedService}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
                    <Button variant="primary" onClick={handleProceed}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default CustomerDashboard;
