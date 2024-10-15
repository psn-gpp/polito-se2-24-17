import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import './MyMain.css'; // Import custom CSS for styling

function MyMain() {
    const navigate = useNavigate();

    return (

        <div className="main-container">
            <h2 className="text-center">Select Your Role</h2>
            <Row className="justify-content-center">
                <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
                    <Button
                        variant="warning"
                        className="role-button"
                        onClick={() => navigate('/manager')}
                    >
                        Manager
                    </Button>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
                    <Button
                        variant="warning"
                        className="role-button"
                        onClick={() => navigate('/officer')}
                    >
                        Officer
                    </Button>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
                    <Button
                        variant="warning"
                        className="role-button"
                        onClick={() => navigate('/customer')}
                    >
                        Customer
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10} sm={6} md={4} lg={3}>
                    <Button className="w-150 p-5" variant="warning" onClick={() => navigate('/display')}>
                        DISPLAY BOARD
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default MyMain;
