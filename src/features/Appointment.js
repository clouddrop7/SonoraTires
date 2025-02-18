import {Container, Button, Row, Col} from 'react-bootstrap';
import '../styles/features/appointments/appointment.scss';
const Appointment = () => {
    return (
        <Container id="appointment" className="appt-container">
            <Row className="appt-row">
                <h2 className="h2 appt-title">bring your car in for service today</h2>
                <p className="appt-text">
                    Wether you need tires serviced, brakes, checked, or a wheel alignment, we will 
                    provide professional care to ensure you're back on the road safely.
                </p>
                <Button className="appt-btn">schedule appointment</Button>
            </Row>
        </Container>
    );
};

export default Appointment;