import { Container, Row} from 'react-bootstrap';
import '../styles/about/about.scss';
const About = () => {
    return (
        <Container id="about" className='about-container'>
            <Row className='about'>
                <h2 className='h2 about-title'>About <br/>Sonora Tires Inc.</h2>
                <p className='about-statement'>
                    Sonora Tires Inc. has been serving its community for over 35 years,
                    offering quality tires and providing exceptional service with integrity
                    and professionalism. Our customers have trusted our brand and name, and we
                    continue to offer the best care when it comes to tire service.
                <a className="learn-link" href="#shop">Learn more</a>
                </p>
            </Row>
        </Container>
    )
}

export default About;