import { Container, Card, CardImg, CardTitle, CardImgOverlay} from 'reactstrap';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from  'react';
import '../styles/homepage/homepage.scss';
import heroImageSmall from '../app/assets/images/hero-image-mobile.png';
import heroImageMedium from '../app/assets/images/hero-image-medium.png';
import heroImageLarge from '../app/assets/images/hero-image-large.png';
import heroImage from '../app/assets/images/hero-image.png';
import heroImageXl from '../app/assets/images/hero-imagexl.png';

import Header from '../components/Header';
import Services from '../features/services/Services';


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
            <Services />
        </Container>
    )
}

export default HomePage;