import { Card,  Button, CloseButton } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../../styles/services/service.scss';

const ServiceCard = ({name, factone, facttwo, factthree, typeOfService, closeCard}) => {

    const [buttonText, setButtonText] = useState('Select a Service');
    useEffect(() => {
        switch(typeOfService) {
            case "tires":
                setButtonText("Get Your Tires Checked");
                break;
            case "suspension":
                setButtonText("Inspect Your Suspension");
                break;
            case "batteries":
                setButtonText("Check Your Battery");
                break;
            case "mufflers":
                setButtonText("Check Your Exhaust");
                break;
            case "brakes": 
                setButtonText("Brake on in for Brakes");
                break;
            case "other":
                setButtonText("Come in for other Services");
                break;
            default:
                setButtonText("Select a Service");
        }
    }, [typeOfService]);

    return (
        <Card className='service-card'>
             <CloseButton variant='black' onClick={closeCard} className='close-btn' />
            <Card.Title className='h3 service-title' >{name}</Card.Title>
                <Card.Body className='service-body'>
                    <Card.Text className='service-text' >{factone}</Card.Text>
                    <Card.Text className='service-text' >{facttwo}</Card.Text>
                    <Card.Text className='service-text' >{factthree}</Card.Text>
                        <Button className='service-btn'>{buttonText}</Button>
                </Card.Body>
        </Card>
    )
}

export default ServiceCard;