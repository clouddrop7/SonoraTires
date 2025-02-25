import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import '../styles/modal/successmodal.scss'
const SuccessModal = ({ show, handleClose, userData }) => {
    return (
        <Modal className="modal-container" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="company-title">Sonora Tires Inc.</Modal.Title>
            </Modal.Header>
            <Modal.Body className="message">
                <div className="heading">
                <p className="greeting">Thank you for your purchase!</p>
                <p className="schedule">Appointment Scheduled for {new Date(userData?.apptDate).toLocaleString()}</p>
                </div>
                <h5 className="detail-title">Details</h5>
                <ListGroup variant="flush" className="detail-list">
                    <ListGroup.Item className="customer-info">
                        First Name: {userData?.firstName}
                        <br />Last Name: {userData?.lastName}
                    </ListGroup.Item>
                    <ListGroup.Item className="customer-info">
                        Email: {userData?.email}
                        <br />Phone: {userData?.phone}
                    </ListGroup.Item>
                    <ListGroup.Item className="customer-info">
                        Car Make: {userData?.carMake}
                        <br />Car Model: {userData?.carModel}
                    </ListGroup.Item>
                    <ListGroup.Item className="customer-info">
                        Car Profile: {userData?.carProfile}
                        <br />Car Year: {userData?.carYear}
                    </ListGroup.Item>
                    <ListGroup.Item className="customer-info">
                        Wheel Size: {userData?.wheelSize}
                        <br />Tire: {userData?.tireSelection}
                    </ListGroup.Item>
                    <ListGroup.Item className="customer-info">
                        Quantity: {userData?.tireQuantity}
                        <br />Total: ${userData?.total}
                    </ListGroup.Item>
                </ListGroup>
                <p className="important-info">An email confirmation is on its way.</p>
                <p className="important-info">To cancel or reschedule, <a href="tel:9098776350">contact us</a>.</p>
                <p className="no-email-message">No email within 24 hours? Reach us by <a href="tel:9098776350">phone</a> or <a  href="mailto:clouddropdesigns@gmail.com">email</a>.</p>
            </Modal.Body>
        </Modal>
    );
};

export default SuccessModal;