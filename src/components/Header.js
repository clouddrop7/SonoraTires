import { Container, Navbar, Nav, Offcanvas, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import sonoraIcon from '../app/assets/images/sonoraIcon.png';
import '../styles/header/header.scss';

const Header = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Toggle
                    onClick={handleShow}
                    aria-controls="offcanvasNavbar-expand-lg"
                />
                <Navbar.Brand href="#home" className="navbar-brand">
                    <Image className='tire-image' src={sonoraIcon} alt='Sonora Tires logo' />
                        <span className='brand'>tires inc.</span>
                </Navbar.Brand>
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-md"
                    aria-labelledby="offcanvasnavbar-expand-lg"
                    placement="start"
                    show={show}
                    onHide={handleClose}
                >
                    <Offcanvas.Header closeButton>
                        <Image className='tire-icon' src={sonoraIcon} alt='Sonora Tires logo' />
                        tires inc. 
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Navbar className="navbar-nav"> 
                            <div className="nav-link-group"> 
                                <Nav.Link as={Link} to="/tires" className="link" onClick={handleClose}>
                                    tires
                                </Nav.Link>
                                <Nav.Link as={Link} to="/brakes" className="link" onClick={handleClose}>
                                    brakes
                                </Nav.Link>
                                <Nav.Link as={Link} to="/alignment" className="link" onClick={handleClose}>
                                    alignment
                                </Nav.Link>
                                <Nav.Link as={Link} to="/batteries" className="link" onClick={handleClose}>
                                    batteries
                                </Nav.Link>
                            </div>

                            <div className="info"> 
                                <Nav.Link as={Link} to="/about" className="link underline-opactiy-0" onClick={handleClose}>
                                    <i className='fa fa-info fa-lg fa-2x' /> 
                                </Nav.Link>
                                <Button as={Link} to="/contact" className="btn contact-btn" onClick={handleClose} variant="primary">Contact Us</Button>
                            </div>
                        </Navbar>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;