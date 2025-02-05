import { Card, CardTitle, CardBody, CardImg, CardText, Button } from 'react-bootstrap';
import '../../styles/services/service.scss';

const ServiceCard = ({ image, message, name, onClick }) => {
    return (
        <Card className="service-card">
            <CardImg className="service-image" src={image} alt={name} />
            <CardTitle className="service-title">{name}</CardTitle>
            <CardBody>
                <CardText className="service-text">
                    {message || "Irure aliqua sit culpa nostrud ad non anim consequat laborum aliqua tempor ea."}
                </CardText>
            </CardBody>
            <Button onClick={onClick} className="service-btn">Shop {name} Services</Button>
        </Card>
    );
}

export default ServiceCard;