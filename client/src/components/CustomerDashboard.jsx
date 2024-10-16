import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API.jsx';

import MyNavbar from './MyNavbar';
function CustomerDashboard() {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [services, setServices] = useState([]);

    useEffect(() => {
      // Fetch services from the backend
      const getServices = async () => {
        try {
          const result = await API.getServices();
          console.log(result);
          setServices(result);
        } catch (error) {
          throw error;
        }
      }

      getServices();
    }, []);

    const handleConfirm = () => {
        setShowModal(true);
    };

    // Save ticket detaild to the backend
    const addTicket = async () => {
      try {
        const result = await API.addTicket(selectedService.sid);
        console.log(result);
      } catch(error) {
        throw error;
      }
    };

    const handleProceed = () => {
        // Generate ticket details when the user confirms
        const ticketNumber = Math.random().toString(36).substr(2, 6).toUpperCase(); // 6-character alphanumeric
        //const counterNumber = Math.floor(Math.random() * 10) + 1;
        const qrValue = `${selectedService.svcName} - Ticket: ${ticketNumber}`; //, Counter: ${counterNumber} in case if we need counternumber in the future

        const ticketDetails = {
            service: selectedService.svcName,
            ticketNumber,
            //counterNumber,
            qrValue,
        };

        addTicket(); // Save ticket details to the backend

        // Navigate to the ticket display page with ticket details
        navigate('/customer/ticket', { state: ticketDetails });

        setShowModal(false);
    };

    return (
        <>
        <MyNavbar></MyNavbar>
        <Container>
            <h2>Select a Service</h2>
            <div style={{ width: '400px', margin: '0 auto' }}>
                <ListGroup>
                    {services.map((service) => (
                        <ListGroup.Item
                            action
                            key={service.sid}
                            active={selectedService.sid === service.sid}
                            onClick={() => setSelectedService(service)}
                        >
                            {service.svcName}
                        </ListGroup.Item>
                      ))
                    //NOTE TO SEFA: I implemented a constriction for the customer because he shouldn't be able to go to the ticket page without selecting a service
                    }
                </ListGroup>
            </div>
            
            <Row className="my-3">
                <Col>
                    <Button variant="danger" onClick={() => navigate('/')}>Cancel</Button>
                </Col>
                <Col>
                    <Button variant="success" onClick={handleConfirm} disabled={!selectedService}>Confirm</Button>
                </Col>
            </Row>

            {/* Modal for confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to proceed with {selectedService.svcName}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
                    <Button variant="primary" onClick={handleProceed}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </>
    );
}

export default CustomerDashboard;
