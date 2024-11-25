import { 
    Container, 
    Row,
    Col,
    Card, 
    CardImg, 
    CardTitle, 
    CardImgOverlay, 
    CardBody 
} from 'reactstrap';

import { useState, useEffect } from  'react';
import '../styles/homepage/homepage.scss';
import heroImageSmall from '../app/assets/images/hero-image-mobile.png';
import heroImageMedium from '../app/assets/images/hero-image-medium.png';
import heroImageLarge from '../app/assets/images/hero-image-large.png';

import ServicesIcons from '../features/services/ServicesIcons';
import ServiceInfo from '../features/services/ServiceInfo';
import service from '../db.json';

const HomePage = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [services] = useState(service.services);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const handleCardFlip = () => {
        console.log('flipped');
    }

    return (
        <Container className='homepage-container'>
            <Card className='hero-card'>
                <CardImg 
                    alt='tires with red tire marks on ground'
                    src={
                        windowWidth <= 576
                        ? heroImageSmall :
                        windowWidth <= 768
                        ? heroImageMedium :
                        heroImageLarge
                    }
                    className='hero-image'
                />
                <CardImgOverlay>
                    <CardTitle tag='h1' className='h1 hero-title'>
                        Sonora Tires
                    </CardTitle>
                    <CardBody className='h2 hero-text'>
                        Family owned and operated for over 30 years.
                    </CardBody>
                </CardImgOverlay>
            </Card>
            <Row className='hero-mission'>
                <Col className='mission-title-col'>
                    <h2>Our Service to you.</h2>
                </Col>
                <Col className='mission-statement'>
                    <p>Laboris dolore duis enim duis esse exercitation laboris 
                    incididunt nulla esse magna. Laboris ex do irure nostrud 
                    culpa tempor nostrud eiusmod sunt velit nostrud. Sint esse 
                    dolore occaecat anim est quis ex consectetur exercitation esse. 
                    Excepteur culpa ullamco in labore ipsum tempor ut qui elit officia. 
                    Officia consequat duis quis elit. Sunt eiusmod qui culpa mollit sunt 
                    Lorem sit aute nostrud ea sunt cillum. Voluptate proident veniam aliqua 
                    cupidatat ea excepteur sit ad esse.
                    </p>
                </Col>
                <Row className='services-container'>
                    <Col className='services-icon-col'>
                        <h3 className='service-title'>Professional Tire Services ...and more!</h3>
                        <div className='service-icon-container'>
                            <ServicesIcons />
                        </div>
                    </Col>
                    <Col className='services-info-col'>
                        <ServiceInfo />
                    </Col>
                </Row>
                    
            </Row>
        </Container>
    )
}

export default HomePage;