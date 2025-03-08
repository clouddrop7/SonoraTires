import React, { useState, useEffect } from "react";
import { Offcanvas, } from "react-bootstrap";
import CarSelectionForm from "./carSelectionForm";
import TireSelection from "./tireSelection";
import UserInfoForm from "./userInfoForm";
import SuccessModal from "./SuccessModal";
import { useContext } from "react";
import {TireContext } from '../providers/TireProvider';
import "../styles/tireform/tireform.scss";

const ServiceModal = () => {
    const { handleBackToForm,  selectedTire, show, toggleForm } = useContext(TireContext);
    const [placement, setPlacement] = useState("end");
    const [view, setView] = useState("form");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setPlacement(window.innerWidth < 992 ? "start" : "end");
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleModalClose = () => {
        setShowModal(false);
        setView("form");
        toggleForm();
    };

    

    return (
        <>
            <Offcanvas className="service-slider" show={show} placement={placement}>
                <Offcanvas.Header onClick={view !== "form" ? handleBackToForm : toggleForm} closeButton>
                    <Offcanvas.Title className="tire-selection-title">
                        {view === "form" ? "Tire Selection" : view === "tires" ? "Available Tires" : "Install Confirmation"}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {view === "form" && (
                        <>
                            <CarSelectionForm />
                        </>
                    )}
                    {view === "tires" && (
                        <>
                            <TireSelection />
                        </>
                    )}
                    {view === "install" && selectedTire && (
                            <>
                                <UserInfoForm />
                            </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
            <SuccessModal
                show={showModal}
                handleClose={handleModalClose}
            />
        </>
    );
};

export default ServiceModal;