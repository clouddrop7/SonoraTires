
import { Container, Card, Button } from 'react-bootstrap';
import { useState } from  'react';
import '../styles/homepage/homepage.scss';
import Header from '../components/Header';
import FeatureServices from '../features/FeatureServices';
import Services from '../components/Services';
import Appointment from '../features/Appointment';
import About from '../components/About';
import Social from '../components/Social';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
const HomePage = () => {

    return (
        <Container id="home" className='homepage-container'>
          <Header />
            <Card className="hero-card">
              <Card.ImgOverlay>

              </Card.ImgOverlay>
              <Card.Body className="hero-body">
                <Card.Title className="welcome">
                  elevate your drive <br />
                </Card.Title>
                <Card.Text className="call-action-text">
                 Family owned since 1989
                </Card.Text>
                <Button type="submit" className="call-action">schedule service</Button>
              </Card.Body>
            </Card>
            <FeatureServices />
            <Services />
            <Appointment />
            <About />
            <Social />
            <Contact />
            <Footer />
        </Container>
    )
}

export default HomePage;