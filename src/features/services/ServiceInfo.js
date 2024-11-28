import { useState } from 'react';
import {useSpring, animated } from '@react-spring/web';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/services/service.scss';
import db from '../../db.json';
import { v4 as uuidv4 } from 'uuid';
import ServiceCard from './ServiceCard';

const ServiceInfo = () => {
    const [service] = useState(db);
    const allServices = [
        ...service.tires,
        ...service.suspension,
        ...service.batteries,
        ...service.brakes,
        ...service.mufflers,
        ...service.other,
    ]

    const [typeOfService, setTypeOfService] = useState(null);
    const [selectedCard, setSelectedCard] = useState({
        id: '',
        name: '',
        factone: '',
        facttwo: '',
        factthree:'',
    });

    const [showCard, setShowCard] = useState(false);

    const cardAnimation = useSpring({
        from: { opacity: 0, transform: 'translateX(-100%)'},
        to: { opacity: showCard ? 1 : 0 , transform: showCard ? 'translateX(0)': 'translateX(-100%)'},
        config: { mass: 0.3, tension: 500, friction: 50},
    })

    const handleClick = (name) => {
        const foundService = allServices.find((service) => service.name === name);
        const serviceCategory = 
            Object.keys(service).find(
                (key) => service[key].some(
                    (item) => item.name === name
                ));
        setTypeOfService(serviceCategory);
        if (foundService) {
          const { id, name, factone, facttwo, factthree } = foundService;
          setSelectedCard({
            id,
            name,
            factone,
            facttwo,
            factthree,
            service: typeOfService,
          });
        } else {
          console.error("Service not found:", name);
        }

        setShowCard(true);
    };

    const handleCloseCard = () => {
        setShowCard(false);
        setSelectedCard(null);
    }
    
    return (
        <Container className='service-info-container'>
            <h3 className='service-info-title'>Facts and Guidance for Top of the Line Car and Tire Care!</h3>
            <Row as='ul' className='service-info'>
                {allServices.map(({id, name}) => (
                    <Col key={uuidv4()} as='li' xs={5} sm={3} className='service-info-item'>
                        <div className='service-name' onClick={() => handleClick(name)}>
                            {name}
                        </div>
                    </Col>
                ))}
                {
                    selectedCard && (
                        <animated.div className='anime-service-card' style={cardAnimation}>
                            <ServiceCard 
                                key={selectedCard.id}
                                typeOfService={typeOfService}
                                name={selectedCard.name}
                                factone={selectedCard.factone}
                                facttwo={selectedCard.facttwo}
                                factthree={selectedCard.factthree}
                                closeCard={handleCloseCard}
                            />
                        </animated.div>
                    )
                }
            </Row>
        </Container>
    )
}

export default ServiceInfo;