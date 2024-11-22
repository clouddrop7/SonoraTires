import { useState, useEffect } from 'react';
import {useSpring, animated } from '@react-spring/web';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import '../../styles/services/service.scss';
import db from '../../db.json';
import { ListGroupItem } from 'reactstrap';

const ServiceInfo = () => {
    const [service] = useState(db);
    
    return (
        <ListGroup className='service-info'>
            {service.tires.map(({id, name}) => (
                <ListGroup.Item key={id} className='service-info-item'>
                    {name}
                </ListGroup.Item>
                ))}
            {service.suspension.map(({id, name}) => (
                    <ListGroup.Item key={id} className='service-info-item'>
                        {name}
                    </ListGroup.Item>
                ))}
            {
                service.batteries.map(({id, name}) => (
                    <ListGroupItem key={id}>
                        {name}
                    </ListGroupItem>
                ))
            }
            {
                service.brakes.map(({id, name}) => (
                    <ListGroupItem key={id}>
                        {name}
                    </ListGroupItem>
                ))
            }
            {
                service.mufflers.map(({id, name}) => (
                    <ListGroupItem key={id}>
                        {name}
                    </ListGroupItem>
                ))
            }
            {
                service.other.map(({id, name}) => (
                    <ListGroupItem key={id}>
                        {name}
                    </ListGroupItem>
                ))
            }
        </ListGroup>    
    )
}

export default ServiceInfo;