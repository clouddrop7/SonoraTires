import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'reac';
import ServiceModal from '../components/ServiceModal';
import Header from "../components/Header";
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Services = () => {
    const [show, setShow] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const toggleForm = () => {
        setShow((prev) => !prev);
      };
    
      const handleClose = () => setShowNav(false);
      const handleShow = () => setShowNav(true);
    
    return (
        <Container>
            {
                show && <ServiceModal show={show} toggleForm={toggleForm}/>
            }
          <Header />
          <Contact />
          <Footer />
        </Container>
    );
};

export default Services;
