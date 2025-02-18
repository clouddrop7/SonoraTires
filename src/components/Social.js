import { Container, Row, Card} from 'react-bootstrap';
import newCar from '../app/assets/images/new car.jpg';
import oldCar from '../app/assets/images/oldcar.jpg';
import brakePad from '../app/assets/images/brakesimage3.jpg';
import { Link } from 'react-router-dom';
import '../styles/social/social.scss';
const Social = () => {
    return (
        <Container id="social" className="social-container">
            <Row className="social-row">
                <Card>
                    <Card.Img 
                        className="social-images" 
                        alt="black srt rim with red brembo brake"
                        src={brakePad}
                    />
                </Card>
                <Card>
                    <Card.Img 
                        className="social-images" 
                        alt="blue cheverolet camaro"
                        src={newCar}
                    />
                </Card>
                <Card>
                    <Card.Img 
                        className="social-images"
                        alt="red rustic card"
                        src={oldCar}
                    />
                </Card>
                <Link to="/home" className="social-btn">social</Link>
            </Row>
        </Container>
    );
};

export default Social;