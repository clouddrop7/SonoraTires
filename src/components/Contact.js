import { Container, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { useState } from "react"; // Removed useEffect since it’s not used
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "../styles/contact/contact.scss";

const Contact = () => {
    // Removed isValidated and isTouched states as Formik handles this
    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be 50 characters or less")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        message: Yup.string()
            .min(10, "Message must be at least 10 characters")
            .max(500, "Message must be 500 characters or less")
            .required("Message is required"),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
    
        setTimeout(() => {
            setSubmitting(false); // Reset submitting state
            resetForm(); // Clear form after submission
            alert("Message sent successfully!");
        }, 1000); // Simulate async delay
    };

    return (
        <Container id="contact" className="contact-container">
            <h2 className="h3 contact-title">Contact Us</h2>
            <Formik
                initialValues={{
                    fullName: "",
                    email: "",
                    message: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    isValid,
                }) => (
                    <Form noValidate onSubmit={handleSubmit} className="contact-form">
                        <Form.Group controlId="fullName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={values.fullName}
                                placeholder="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.fullName && !!errors.fullName}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.fullName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                placeholder="Email Address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.email && !!errors.email}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="message">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea" // Corrected from type="text-area"
                                rows={4} // Added for better UX
                                name="message"
                                value={values.message}
                                placeholder="Message"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.message && !!errors.message}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                            <Button
                                className="contact-btn"
                                type="submit"
                                disabled={isSubmitting || !isValid}
                            >
                                Send Message
                                <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
                            </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Contact;