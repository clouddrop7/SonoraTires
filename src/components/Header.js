import { Container,Col, Row, Navbar, Nav, Offcanvas, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/header/header.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faFacebook,  faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart, faPhone,faLocationDot } from '@fortawesome/free-solid-svg-icons';

library.add(fab)

const Header = ({toggleForm, handleClose, handleShow, showNav}) => {
    
    

    return (
       <Container className="header-container">
            <Row className="nav-row">
                <Col className="title-col">
                    <a className="header-title">sonora tires inc.</a>
                </Col>
                <Col className="cart-col">
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                </Col>
                <Col className="nav-col">
                    <Navbar expand="lg">
                        <Container>
                            <Navbar.Toggle 
                                onClick={handleShow}
                                aria-controls="offcanvasNavbar-expand-lg"
                            />
                            <Navbar.Offcanvas
                                id="offcanvasNavbar-expand-md"
                                aria-labelledby="offcanvasnavbar-expand-lg"
                                placement="start"
                                show={showNav}
                                onHide={handleClose}
                            >
                                <Offcanvas.Header closeButton>
                                    <p className="nav-title">sonora tires inc.</p>
                                    <FontAwesomeIcon  icon={faShoppingCart}/>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Navbar>
                                        <Nav.Link to="/services" className="appt-btn">shop services</Nav.Link>
                                        <Nav.Link href="tel:9098776350">
                                            <FontAwesomeIcon icon={faPhone} size="2x"/>
                                        </Nav.Link>
                                        <Nav.Link to="/contact">
                                            <FontAwesomeIcon icon={faLocationDot} size="2x"/>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="https://x.com">
                                            <FontAwesomeIcon icon={faXTwitter} size="2x"/>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="https://facebook.com">
                                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="https://instagram.com">
                                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                                        </Nav.Link>
                                        
                                    </Navbar>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
       </Container>
    );
}

export default Header;