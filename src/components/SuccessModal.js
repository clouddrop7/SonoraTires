import React from 'react';
import { Modal, ListGroup } from 'react-bootstrap';
import { useContext } from "react";
import { TireContext } from '../providers/TireProvider';

import '../styles/modal/successmodal.scss';
const SuccessModal = ({ show, handleClose }) => {
    const { customerPurchase } = useContext(TireContext);
    return (
        <Modal className="modal-container" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="company-title">Sonora Tires Inc.</Modal.Title>
            </Modal.Header>
            <Modal.Body className="message">
                <div className="heading">
                <p className="greeting">Thank you for your purchase!</p>
                <p className="schedule">Appointment Scheduled for {new Date(customerPurchase?.apptDate).toLocaleString()}</p>
                </div>
                <h5 className="detail-title">Details</h5>
                <ListGroup variant="flush" className="detail-list">
                    <ListGroup.Item className="customer-info">
                        First Name: {customerPurchase?.firstName}
                        <br />Last Name: {customerPurchase?.lastName}
                    </ListGroup.Item>
                    <ListGroup.Item className="customer-info">
                        Email: {customerPurchase?.email}
                        <br />Phone: {customerPurchase?.phone}
                    </ListGroup.Item>
                    <ListGroup.Item className="customer-info">
                        Car Make: {customerPurchase?.carMake}
                        <br />Car Model: {customerPurchase?.carModel}
                    </ListGroup.Item>
                    <ListGroup.Item className="customer-info">
                        Car Profile: {customerPurchase?.carProfile}
                        <br />Car Year: {customerPurchase?.carYear}
                    </ListGroup.Item>
                    <ListGroup.Item className="customer-info">
                        Wheel Size: {customerPurchase?.wheelSize}
                        <br />Tire: {customerPurchase?.tireSelection}
                    </ListGroup.Item>
                    <ListGroup.Item className="customer-info">
                        Quantity: {customerPurchase?.tireQuantity}
                        <br />Total: ${customerPurchase?.total}
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