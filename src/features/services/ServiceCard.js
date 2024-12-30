import { Card, CardTitle, CardBody, CardImg, CardText, Button} from 'react-bootstrap';

const ServiceCard = () => {
    return (
        <Card>
            <CardTitle></CardTitle>
            <CardBody>
                <CardImg />
                <CardText></CardText>
                <Button>Get Started</Button>
            </CardBody>
        </Card>
    )
}

export default ServiceCard;