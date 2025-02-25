
import { Container, Card, Button } from 'react-bootstrap';
import { useState } from  'react';
import '../styles/homepage/homepage.scss';
import ServiceModal from '../components/ServiceModal';
import Header from '../components/Header';
import FeatureServices from '../features/FeatureServices';
import Services from '../components/Services';
import Appointment from '../features/Appointment';
import About from '../components/About';
import Social from '../components/Social';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
const HomePage = () => {
  const [show, setShow] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const toggleForm = () => {
    setShow((prev) => !prev);
  };

  const handleClose = () => setShowNav(false);
  const handleShow = () => setShowNav(true);

    return (
        <Container id="home" className='homepage-container'>
          {
            show && <ServiceModal show={show} toggleForm={toggleForm}/>
          }
          <Header  handleClose={handleClose} handleShow={handleShow} showNav={showNav} toggleForm={toggleForm}/>
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
                <Button 
                  type="submit" 
                  className="call-action"
                  onClick={toggleForm}
                >
                  shop tires
                </Button>
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