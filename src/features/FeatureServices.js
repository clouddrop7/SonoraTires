import { Container, Row, Col, Button, Card} from 'react-bootstrap';
import tireImage from '../app/assets/images/tire-small.png';
import brakeImage from '../app/assets/images/brakesimage2.jpg';
import '../styles/features/features.scss';
const FeatureServices = () => {
    return (
        <Container id="shop" className="features-container">
            <Row className="feature-row">
                <Col className="feature-col">
                    <h2 className="h2 feature-title">featured services</h2>
                    <p className="feature-welcome">
                        Welcome to Sonora Tires, where we pride ourselves on providing
                        exceptional customer service by offering professional care and
                        unwavering commitment to our customers.
                    </p>
                    <Button className="feature-btn">Shop all</Button>
                </Col>
                <Col className="feature-cards">
                    <Card className="tire-feature-card">
                        <Card.Img className="tire-image" src={tireImage} alt="firestone tire"/>
                            <p className="feature-name">tires</p>
                    </Card>
                    <Card className="brake-feature-card">
                        <Card.Img className="brake-image" src={brakeImage} alt="Audi brake pad"/>
                        <p className="feature-name">brakes</p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FeatureServices;