//import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';


function MyMain() {
    //const navigate = useNavigate();

    return (
        <Row>
            <Col>
                <h2> Take a ticket</h2>
                <Button /*onClick={}*/ variant="info">
                    Take a ticket
                </Button>
            </Col>
        </Row>
    );
}

export default MyMain;
