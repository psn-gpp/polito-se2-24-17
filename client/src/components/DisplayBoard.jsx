import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import MyNavbar from './MyNavbar';
import API from '../API.jsx';


function DisplayBoard() {
    const navigate = useNavigate();
    // Example data for customers being served, we can replace the hardcoded data with a dynamic array from backend/db
    const [servedCustomers, setServedCustomers] = useState([]); 

    useEffect(() => {
      const getTickets = async () => {  
        try {
          const result = await API.getTickets();
          setServedCustomers(result.filter( (ticket) => ticket.isServed == 1));
        } catch (error) {
          throw error;
        }
      }

      getTickets();

    }, []);

    return (
        <>
        <MyNavbar></MyNavbar>
        <Container className="mt-4">
            {/* Add the Home button */}
            <Button variant="primary" onClick={() => navigate('/')} className="mb-3">
                <FaHome style={{ marginRight: '8px' }} />
                Back to Home
            </Button>
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
                            <td>{customer.tid}</td>
                            <td>{customer.cid}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </>
    );
}

export default DisplayBoard;

