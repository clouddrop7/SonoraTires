import {Container, Button, Row,} from 'react-bootstrap';
import { useState } from 'react';
import Schedule from '../components/Schedule';
import '../styles/features/appointments/appointment.scss';
const Appointment = () => {
    const [show, setShow] = useState(false);

    const toggleForm = () => {
        setShow((prev) => !prev);
    };

    return (
        <Container id="appointment" className="appt-container">
            <Row className="appt-row">
                <h2 className="appt-title">bring your car in for service today</h2>
                <p className="appt-text">
                    Wether you need tires serviced, brakes, checked, or a wheel alignment, we will 
                    provide professional care to ensure you're back on the road safely.
                </p>
                <Button  className="appt-btn">schedule service</Button>
                {/* {
                    show &&  <Schedule show={show} toggleForm={toggleForm}/>
                } */}
            </Row>
        </Container>
    );
};

export default Appointment;