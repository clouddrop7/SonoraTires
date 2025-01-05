import { Container, Row, Col } from 'react-bootstrap';
import '../styles/about/about.scss';
const About = () => {
    return (
        <Container className='about-container'>
            <Row className='about'>
                <h2 className='h2 about-title'>About Sonora Tires Inc.</h2>
                <Col className="about-col">
                    <h5 className='h5 about-subtitle'>Our Commitment</h5>
                        <p className='about-p'>
                            loremSit excepteur proident tempor exercitation laboris. 
                            Occaecat aute sunt in commodo laborum proident dolor laboris 
                            sit amet. Nostrud deserunt consequat fugiat enim tempor quis 
                            ex Lorem ullamco in magna.
                        </p>
                </Col>
                <Col className="about-col">
                    <h5 className='h5 about-subtitle'>Values</h5>
                        <p className='about-p'>
                            loremSit excepteur proident tempor exercitation laboris. 
                            Occaecat aute sunt in commodo laborum proident dolor laboris 
                            sit amet. Nostrud deserunt consequat fugiat enim tempor quis 
                            ex Lorem ullamco in magna.
                        </p>
                </Col>
                <Col className="about-col">
                    <h5 className='h5 about-subtitle'>Services</h5>
                        <p className='about-p'>
                            loremSit excepteur proident tempor exercitation laboris. 
                            Occaecat aute sunt in commodo laborum proident dolor laboris 
                            sit amet. Nostrud deserunt consequat fugiat enim tempor quis 
                            ex Lorem ullamco in magna.
                        </p>
                </Col>
            </Row>
        </Container>
    )
}

export default About;