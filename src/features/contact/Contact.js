import {Container, Row, Col, } from 'react-bootstrap';
import { Card, CardTitle, CardBody, CardImg, CardImgOverlay } from 'reactstrap';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';

import tire from '../../app/assets/images/pirellitires.png';
import tiremed from '../../app/assets/images/pirellitiresmed.png';
import tirelg from '../../app/assets/images/pirellitireslg.png';
import tirexl from '../../app/assets/images/pirellitiresxl.png';

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
            <Card className='contact-card'>
                <CardImg 
                    alt='pirelli tires with yellow rims'
                    src={
                        windowWidth <= 576
                        ? tire :
                        windowWidth <= 768
                        ? tiremed :
                        windowWidth <= 992
                        ? tirelg :
                        windowWidth <= 1200 
                        ? tirexl :
                        tirexl
                    }
                    className='hero-image'
                />
                <CardImgOverlay>
                    <CardTitle tag='h2' className='h2 contact-title'>
                        Contact Us
                    </CardTitle>
                    <CardBody className='contact-form'>
                        <ContactForm />
                    </CardBody>
                </CardImgOverlay>
            </Card>
            <Row className='contact'>
                <Col className='contact-option-title-col'>
                    <h2 className='h2'>Contact</h2>
                </Col>
                <Col className='contact-option-col'>
                    <div>Mail</div>
                    <div>Location</div>
                    <div>Phone</div>
                    <div>Hours</div>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact;