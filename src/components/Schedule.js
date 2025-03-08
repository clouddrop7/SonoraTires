import React, { useState } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { setSchedule, setService, setCustomerInfo, setDateTime } from '../utils/scheduleSlice';

const Schedule = ({ show, toggleForm }) => {
    const dispatch = useDispatch();
    const { service, loading, error, appointmentId } = useSelector((state) => state.serviceSchedule);
    const [date, setDate] = useState({
        month: "",
        day: "",
        year: "",
        time: "",
    });

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, "First name must be at least 2 characters")
            .max(50, "First name must be 50 characters or less")
            .required("First name is required"),
        lastName: Yup.string()
            .min(2, "Last name must be at least 2 characters")
            .max(50, "Last name must be 50 characters or less")
            .required("Last name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        carMake: Yup.string().required("Car make is required"),
        carModel: Yup.string().required("Car model is required"),
        carYear: Yup.string()
            .matches(/^\d{4}$/, "Car year must be a 4-digit number")
            .required("Car year is required"),
        time: Yup.string()
            .required("Time is required")
            .test("is-between-9am-5pm", "Time must be between 9 AM and 5 PM", (value) => {
                if (!value) return false;
                const [hours, minutes] = value.split(":").map(Number);
                const timeInMinutes = hours * 60 + minutes;
                const minTime = 9 * 60;
                const maxTime = 17 * 60;
                return timeInMinutes >= minTime && timeInMinutes <= maxTime;
            }),
    });

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleSchedule = async (values, { setSubmitting }) => {
        const apptDate = date.year && date.month && date.day && date.time 
            ? `${date.year}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')}T${date.time}:00`
            : new Date().toISOString();

        const appointmentData = {
            service: service,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            carMake: values.carMake,
            carModel: values.carModel,
            carYear: values.carYear,
            carProfile: values.carProfile || '',
            time: values.time,
            date: apptDate,
        };

        try {
            dispatch(setCustomerInfo({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                carMake: values.carMake,
                carModel: values.carModel,
                carYear: values.carYear,
                carProfile: values.carProfile || '',
            }));

            const result = await dispatch(setSchedule(appointmentData)).unwrap();
            alert(`Appointment scheduled! Your appointment ID is: ${appointmentId}`);
        } catch (error) {
            console.error('Failed to schedule appointment:', error);
            alert(`Failed to schedule: ${error}`);
        } finally {
            setSubmitting(false);
            toggleForm();
        }
    };

    const handleServiceChange = (e) => {
        dispatch(setService(e.target.value));
    };

    return (
        <Offcanvas show={show} onHide={toggleForm}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Service Appointment</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        carMake: "",
                        carModel: "",
                        carYear: "",
                        carProfile: "",
                        time: date.time || "",
                    }}
                    onSubmit={handleSchedule}
                >
                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, isSubmitting }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <h4>Contact Details</h4>
                            <Form.Group className="customer-info">
                                <Form.Label htmlFor="firstName">First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.firstName && !!errors.firstName}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="customer-info">
                                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.lastName && !!errors.lastName}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="customer-info">
                                <Form.Label htmlFor="email">Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.email && !!errors.email}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="customer-info">
                                <Form.Label htmlFor="phone">Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.phone && !!errors.phone}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                            </Form.Group>
                            <h4>Car Details</h4>
                            <Form.Group className="customer-info">
                                <Form.Label htmlFor="carMake">Car Make</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="carMake"
                                    value={values.carMake}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.carMake && !!errors.carMake}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.carMake}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="customer-info">
                                <Form.Label htmlFor="carModel">Car Model</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="carModel"
                                    value={values.carModel}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.carModel && !!errors.carModel}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.carModel}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="customer-info">
                                <Form.Label htmlFor="carYear">Car Year</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="carYear"
                                    value={values.carYear}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.carYear && !!errors.carYear}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.carYear}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="customer-info">
                                <Form.Label htmlFor="carProfile">Car Profile (Optional)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="carProfile"
                                    value={values.carProfile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            <h4>Appointment Details</h4>
                            <Form.Group className="typeof-service">
                                <Form.Label>Select Service</Form.Label>
                                <Form.Select
                                    id="service"
                                    name="service"
                                    value={service}
                                    onChange={(e) => {
                                        handleChange(e);
                                        dispatch(setService(e.target.value));
                                    }}
                                >
                                    <option value="">Select a Service</option>
                                    <option value="tires">Tires</option>
                                    <option value="brakes">Brakes</option>
                                    <option value="batteries">Batteries</option>
                                    <option value="alignment">Wheel Alignment</option>
                                    <option value="mufflers">Mufflers</option>
                                    <option value="converter">Catalytic Converters</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="date">
                                <Form.Label>Set Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={`${date.year}-${date.month.padStart(2, "0")}-${date.day.padStart(2, "0")}`}
                                    onChange={(e) => {
                                        const [year, month, day] = e.target.value.split("-");
                                        const selectedDate = new Date(year, month - 1, day);
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        if (selectedDate < today) return;
                                        setDate({ ...date, year, month, day });
                                        dispatch(setDateTime({ date: `${year}-${month}-${day}`, time: date.time }));
                                    }}
                                    min={getCurrentDate()}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="time">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="time"
                                    value={values.time}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setDate({ ...date, time: e.target.value });
                                        dispatch(setDateTime({ 
                                            date: `${date.year}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')}`, 
                                            time: e.target.value 
                                        }));
                                    }}
                                    onBlur={handleBlur}
                                    isInvalid={touched.time && !!errors.time}
                                    min="09:00"
                                    max="17:00"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
                            </Form.Group>
                            {error && <p className="error">{error}</p>}
                            {appointmentId && <p className="success">Appointment ID: {appointmentId}</p>}
                            <Form.Group className="purchase-div">
                                <Button 
                                    type="submit" 
                                    disabled={!isValid || isSubmitting || loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </Button>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Schedule;