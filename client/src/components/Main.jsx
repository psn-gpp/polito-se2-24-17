//import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';


function MyMain() {
    //const navigate = useNavigate();

    return (
        <Row>
            <Col>
                <h1>Office Queue Management System</h1>
                <Button /*onClick={}*/ variant="info">
                    Take a ticket
                </Button>
            </Col>
        </Row>
    );
}

export default MyMain;
