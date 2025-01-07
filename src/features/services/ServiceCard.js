import { Card, CardTitle, CardBody, CardImg, CardText, Button} from 'react-bootstrap';
import '../../styles/services/service.scss';
const ServiceCard = ({ image, message, name}) => {
    return (
        <Card className="service-card">
            <CardImg className="service-image" src={image} alt={name}/>
                <CardTitle className="h3 service-title">{name}</CardTitle>
                <CardBody className="service-body">
                    <CardText className="p service-text">
                    Irure aliqua sit culpa nostrud ad non anim 
                    consequat laborum aliqua tempor ea.
                    </CardText>
                </CardBody>
                <Button className="service-btn">Shop {name} services</Button>
        </Card>
    )
}

export default ServiceCard;