import { Container,Col, Row, Navbar, Nav, Offcanvas, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/header/header.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faFacebook,  faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart, faPhone,faLocationDot } from '@fortawesome/free-solid-svg-icons';

// Add all brand icons to the library
library.add(fab)

const Header = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [toolOpen, setToolOpen] = useState(false);
    const toggleToolTip = () => setToolOpen(!toolOpen);
    return (
       <Container className="header-container">
            <Row>
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
                                show={show}
                                onHide={handleClose}
                            >
                                <Offcanvas.Header closeButton>
                                    <p className="nav-title">sonora tires inc.</p>
                                    <FontAwesomeIcon  icon="shopping-cart"/>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Navbar>
                                        <Button className="appt-btn">shop tires</Button>
                                        <Nav.Link as={Link} to="https://x.com">
                                            <FontAwesomeIcon icon={faPhone} size="2x"/>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="https://x.com">
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