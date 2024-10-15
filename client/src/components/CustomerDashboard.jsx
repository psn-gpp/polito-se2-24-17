// import React, { useState } from 'react';
// import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// function CustomerDashboard() {
//     const navigate = useNavigate();
//     const [selectedService, setSelectedService] = useState('');
//     const [showModal, setShowModal] = useState(false);

//     const services = [
//         'Ship A Parcel',
//         'Track A Parcel',
//         'Return A Parcel',
//         'Send Money',
//         'Pay Tax',
//     ];

//     const handleConfirm = () => {
//         setShowModal(true);
//     };

//     const handleProceed = () => {
//         setShowModal(false);
//         // Add logic for confirming the service selection
//     };

//     return (
//         <Container>
//             <h2>Select a Service</h2>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Services</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {services.map((service, index) => (
//                         <tr key={index} onClick={() => setSelectedService(service)}>
//                             <td>{service}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <Row>
//                 <Col>
//                     <Button variant="danger" onClick={() => navigate('/')}>Cancel</Button>
//                     <Button variant="success" onClick={handleConfirm}>Confirm</Button>
//                 </Col>
//             </Row>

//             {/* Modal for confirmation */}
//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirmation</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Do you want to proceed with {selectedService}?</Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
//                     <Button variant="primary" onClick={handleProceed}>Yes</Button>
//                 </Modal.Footer>
//             </Modal>
//         </Container>
//     );
// }

// export default CustomerDashboard; // Ensure this is correct


import React, { useState } from 'react';
import { Container, ListGroup, Button, Modal, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CustomerDashboard() {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const services = [
        'Ship A Parcel',
        'Track A Parcel',
        'Return A Parcel',
        'Send Money',
        'Pay Tax',
    ];

    const handleConfirm = () => {
        if (!selectedService) {
            setErrorMessage('Please select a service before confirming.');
            return;
        }
        setErrorMessage('');
        setShowModal(true);
    };

    const handleProceed = () => {
        setShowModal(false);
        // Add logic for confirming the service selection
        alert(`You have confirmed: ${selectedService}`);
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Select a Service</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={5}>
                    <ListGroup>
                        {services.map((service, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                onClick={() => setSelectedService(service)}
                                active={selectedService === service}
                            >
                                {service}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            <div className="mt-4 text-center">
                <Button variant="danger" onClick={() => navigate('/')} className="me-2">Cancel</Button>
                <Button variant="success" onClick={handleConfirm}>Confirm</Button>
            </div>

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
