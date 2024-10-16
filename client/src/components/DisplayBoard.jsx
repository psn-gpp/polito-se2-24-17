import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DisplayBoard() {
    // Example data for customers being served, we can replace the hardcoded data with a dynamic array
    const servedCustomers = [
        { ticketCode: 'A001', counterNumber: 1 },
        { ticketCode: 'A002', counterNumber: 2 },
        { ticketCode: 'B001', counterNumber: 3 },
        { ticketCode: 'C001', counterNumber: 4 },
    ];

    return (
        <Container className="mt-5">
            <h2 className="text-center">Customers Being Served</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ticket Code</th>
                        <th>Counter Number</th>
                    </tr>
                </thead>
                <tbody>
                    {servedCustomers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.ticketCode}</td>
                            <td>{customer.counterNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default DisplayBoard;

