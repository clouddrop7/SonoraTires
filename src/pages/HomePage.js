import {  Card, CardImg, CardTitle, CardImgOverlay} from 'reactstrap';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from  'react';
import '../styles/homepage/homepage.scss';
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

    const [heroImageSmall, setHeroImageSmall] = useState(null);
    const [heroImageMedium, setHeroImageMedium] = useState(null);
    const [heroImageLarge, setHeroImageLarge] = useState(null);
    const [heroImage, setHeroImage] = useState(null);
    const [heroImageXl, setHeroImageXl] = useState(null);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
          try {
            const images = [
              'hero-image-mobile.png',
              'hero-image-medium.png',
              'hero-image-large.png',
              'hero-image.png',
              'hero-imagexl.png'
            ];
    
            for (const img of images) {
              const response = await fetch(`http://localhost:5001/sonoratiresinc/us-central1/api/images/${img}`);
              if (!response.ok) throw new Error(`Failed to fetch ${img}`);
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
    
              if (img === 'hero-image-mobile.png') setHeroImageSmall(url);
              else if (img === 'hero-image-medium.png') setHeroImageMedium(url);
              else if (img === 'hero-image-large.png') setHeroImageLarge(url);
              else if (img === 'hero-image.png') setHeroImage(url);
              else if (img === 'hero-imagexl.png') setHeroImageXl(url);
            }
          } catch (error) {
            console.error('Error fetching images:', error);
          }
        };
    
        fetchImages();
      }, []);

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
            <CardImgOverlay className="hero-overlay">
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
            <ShopByTires />
            <Promotions />
            <About />
            <Faqs />
            <Contact />
            <Ratings />
            <Footer />
        </Container>
    )
}

export default HomePage;