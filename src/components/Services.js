import { Container,Row, Card} from 'react-bootstrap';
import '../styles/services/service.scss';
import muffler from '../app/assets/images/muffler.png';
import alignment from '../app/assets/images/allign-small.png';
import catalytic from '../app/assets/images/catalytic.png';

const Services = () => {
    return (
        <Container className="services-container">
            <Row className="services-row">
                <Card className="services-col">
                    <Card.Img className="service-image muffler" src={muffler} alt="muffler on red card"/>
                    <Card.Body>
                        <p className="service-name">mufflers</p>
                    </Card.Body>
                    
                </Card>
                <Card className="services-col wheel">
                    <Card.Img className="service-image alignment" src={alignment} alt="wheel alignment brace on red car"/>
                    <Card.Body>
                        <p className="service-name">Wheel alignment</p>
                    </Card.Body>
                    
                </Card>
                <Card className="services-col">
                    <Card.Img className="service-image catalytic" src={catalytic} alt="muffler on red card"/>
                    <Card.Body>
                        <p className="service-name">catalytic converters</p>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default Services;