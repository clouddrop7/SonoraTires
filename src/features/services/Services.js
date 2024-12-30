import { Container, Row, Col } from 'react-bootstrap';
import ServiceCard from './ServiceCard';

const Services = () => {
    return (
        <Container>
            <Row>
                <h3 className="h3 service-title">Professional Tire Services ... and more!</h3>
                <ServiceCard />
            </Row>
        </Container>
    )
}

export default Services;