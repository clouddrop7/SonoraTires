import { Container, Row, ListGroup } from 'react-bootstrap';
import '../styles/footer/footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
    return (
       <Container className="footer-container">
        <Row className="footer-row">
            <h2 className="footer-title">Sonora Tires Inc.</h2>
            <ListGroup  className="explore" variant="flush">
                <h4 className="footer-subtitle">Explore</h4>
                <ListGroup.Item as="a" className="explore-links"  href="#about" >About</ListGroup.Item>
                <ListGroup.Item as="a" className="explore-links"  href="#contact" >Contact</ListGroup.Item>
                <ListGroup.Item as="a" className="explore-links"  href="#shop" >Shop</ListGroup.Item>
                <ListGroup.Item as="a" className="explore-links"  href="#services" >Services</ListGroup.Item>
                <ListGroup.Item as="a" className="explore-links"  href="/sitemap.xml" >Site Map</ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush" className="social-container">
                <h4 className="footer-subtitle">Social</h4>
                <ListGroup.Item as="a"  className="social-links" href="mailto:clouddropdesigns@gmail.com" ><FontAwesomeIcon icon={faEnvelope} size="2x"/></ListGroup.Item>
                <ListGroup.Item as="a"  className="social-links" href="https://facebook.com" ><FontAwesomeIcon icon={faFacebook} size="2x"/></ListGroup.Item>
                <ListGroup.Item as="a"  className="social-links" href="https://instagram.com"><FontAwesomeIcon icon={faInstagram } size="2x"/></ListGroup.Item>
                <ListGroup.Item as="a"  className="social-links" href="https://x.com" ><FontAwesomeIcon icon={faTwitter} size="2x" /></ListGroup.Item>
            </ListGroup>
            <ListGroup className="legal" variant="flush">
                <h4 className="footer-subtitle">Legal</h4>
                <ListGroup.Item as="a"  href="/terms" >Terms of Service</ListGroup.Item>
                <ListGroup.Item as="a"  href="/policies" >Privacy Policy</ListGroup.Item>
                <ListGroup.Item as="a"  href="agreement" >Service Agreement</ListGroup.Item>
            </ListGroup>
            <ListGroup className="address-info" variant="flush">
                <h4 className="footer-subtitle">Contact</h4>
                <ListGroup.Item as="a" className="address">
                    17977 Vallye Blvd.
                    Bloomington, CA 92316    
                </ListGroup.Item>
                <ListGroup.Item as="a" className="phone">
                    909-877-6350
                </ListGroup.Item>
            </ListGroup>
            <ListGroup className="copyright">
                <ListGroup.Item as="a" className="developer-site">Site by CloudDropDesigns LLC.</ListGroup.Item>
                <ListGroup.Item as="a" className="developer-name">&copy; 2025 Copyright CloudDropDesigns.com</ListGroup.Item> 
            </ListGroup>
        </Row>
       </Container>
    )
}

export default Footer;