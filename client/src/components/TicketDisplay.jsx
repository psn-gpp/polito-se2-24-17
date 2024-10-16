import React, { useRef, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import MyNavbar from './MyNavbar';
import { useNavigate } from 'react-router-dom';

const TicketDisplay = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { service, ticketNumber, counterNumber } = location.state || {};
    const printRef = useRef();
    //const [qrCodeUrl, setQrCodeUrl] = useState('');

    const generatePDF = async () => {
        // Create a canvas from the printRef element
        const canvas = await html2canvas(printRef.current);
        const imgData = canvas.toDataURL('image/png');

        const doc = new jsPDF();
        doc.addImage(imgData, 'PNG', 10, 10);
        doc.save('ticket.pdf');
    };

    return (
        <>
        <MyNavbar>  </MyNavbar>
        <Container className="text-center mt-5">
            <div ref={printRef} style={{ padding: '20px', border: '1px solid black', display: 'inline-block' }}>
                <h3>Ticket for {service}</h3>
                <p>Ticket Number: {ticketNumber}</p>
                {/* Uncomment if you want to show the counter */}
                {/* <p>Counter: {counterNumber}</p> */}
                <QRCodeSVG value={ticketNumber} size={128} />
            </div>
            <Row className="mt-3 justify-content-center">
                <Col xs="auto" classname="m-l-3">
                    <Button variant="primary" className="me-2" onClick={generatePDF}>Download/Print Ticket as PDF</Button>
                    <Button variant="danger" onClick={() => navigate('/customer')}>Go Home</Button>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default TicketDisplay;
