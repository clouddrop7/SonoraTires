import {  Card, CardImg, CardTitle, CardImgOverlay} from 'reactstrap';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from  'react';
import '../styles/homepage/homepage.scss';
import heroImageSmall from '../app/assets/images/hero-image-mobile.png';
import heroImageMedium from '../app/assets/images/hero-image-medium.png';
import heroImageLarge from '../app/assets/images/hero-image-large.png';
import heroImage from '../app/assets/images/hero-image.png';
import heroImageXl from '../app/assets/images/hero-imagexl.png';

import Header from '../components/Header';
import Services from '../features/services/Services';
import ShopByTires from '../features/shopbyservices/ShopByTires';
import About from '../components/About';
import Faqs from '../components/Faqs';
import Ratings from '../features/ratings/Ratings';
import Contact from '../features/contact/Contact';
import Promotions from '../features/promotions/Promotions';
import Footer from '../components/Footer';
const HomePage = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const handleCardFlip = () => {
        console.log('flipped');
    }

    const callToACtion =  () => {
        
    }

    return (
        <Container className='homepage-container'>
            <Row className="homepage">
                <Col>
                    <Card className="hero-card">
                    <CardImg
                        src={
                        windowWidth <= 576
                        ? heroImageSmall :
                        windowWidth <= 768
                        ? heroImageMedium :
                        windowWidth <= 992
                        ? heroImageLarge :
                        windowWidth <= 1200 
                        ? heroImage :
                        heroImageXl
                        } 
                        className="hero-image"
                        alt="perelli tires" 
                    />
                    <CardImgOverlay className="overlay">
                        <Header />
                            <CardTitle className="h1 hero-title">sonora tires</CardTitle>
                            <Button
                                className="app-btn"  
                                onMouseEnter={() => setIsHovered(true)} 
                                onMouseLeave={() => setIsHovered(false)} 
                            >
                                schedule service
                            </Button>
                    </CardImgOverlay>
                    </Card>
                </Col>
                <Col>
                    <Services />
                </Col>
                <Col>
                    <ShopByTires />
                </Col>
                <Col>
                    <Promotions />
                </Col>
                <Col>

                </Col>
                <Col>
                    <About />
                </Col>
                <Col>
                    <Faqs />
                </Col>
                <Col>
                    <Contact />
                </Col>
                <Col>
                    <Ratings />
                </Col>
                <Col>
                    <Footer />
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;