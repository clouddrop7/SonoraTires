import {Container, Row, Col, } from 'react-bootstrap';
import { Card, CardTitle, CardBody, CardImg, CardImgOverlay } from 'reactstrap';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';

// import tire from '../../app/assets/images/pirellitires.png';
// import tiremed from '../../app/assets/images/pirellitiresmed.png';
// import tirelg from '../../app/assets/images/pirellitireslg.png';
// import tirexl from '../../app/assets/images/pirellitiresxl.png';

import '../../styles/contact/contact.scss';

const Contact = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <Container className='contact-container'>
            <h3 className="h3 contact-title">contact us</h3>
            <ContactForm />
        </Container>
    )
}

export default Contact;