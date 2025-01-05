import { Container, Row, Col } from 'react-bootstrap';
import ServiceCard from './ServiceCard';
import { useContext } from 'react';
import ServiceContext from '../../ServiceContext';
import '../../styles/services/service.scss';
const Services = () => {
    const { servicesArray } = useContext(ServiceContext);
    return (
        <Container className="service-container">
            <Row className="service-row">
                <Col className="service-col">
                <h2 className="h2 title">Professional Tire Services <span className="more-tag">... and more!</span></h2>
                    {
                        servicesArray.map((service) => {
                            const { id,icon, image, message, name } = service;
                            return (
                                <ServiceCard 
                                    key={id}
                                    icon={icon}
                                    image={image}
                                    message={message}
                                    name={name}
                                />
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Services;