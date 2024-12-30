import { Container, Navbar, Nav, Offcanvas, Image } from 'react-bootstrap';
import { Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import sonoraIcon from '../app/assets/images/sonoraIcon.png';
import '../styles/header/header.scss';

const Header = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [toolOpen, setToolOpen] = useState(false);
    const toggleToolTip = () => setToolOpen(!toolOpen);
    return (
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
                                <Nav.Link href="tel:+9513478976" className="phone">
                                    <i className='fa fa-phone fa-2x' /> 
                                </Nav.Link>
                                <Nav.Link id="locationIcon"className="location">
                                    <i className="fa-solid fa-location-dot fa-2x" />
                                    <Tooltip
                                        placement="right"
                                        isOpen={toolOpen}
                                        target="locationIcon"
                                        toggle={toggleToolTip}
                                    >
                                        Bloomington, CA 92316
                                    </Tooltip>
                                </Nav.Link>
                                
                            </div>
                        </Navbar>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;