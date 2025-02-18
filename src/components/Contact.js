import {Container, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../styles/contact/contact.scss';

const Contact = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const validationSchema = Yup.object().shape({
        fullName: Yup.string(),
        email: Yup.string(),
        message: Yup.string(),
    })

    const handleSubmit = () => {

    };

    return (
        <Container className='contact-container'>
            <h2 className="h3 contact-title">contact us</h2>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    message: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({handleSubmit,handleChange, handleBlur, isTouched, fullName, email, message }) => (
                    <Form className="contact-form">
                    <Form.Group>
                        <Form.Label htmlFor={fullName}>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="fullName" 
                            value={fullName} 
                            placeholder="Name"
                            onChange={handleChange}
                            onBlur={isTouched}
                            required

                        />
                        <Form.Control.Feedback>
                            {}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor={email}>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            value={email} 
                            placeholder="Email Address"
                            onChange={handleChange}
                            onBlur={isTouched}
                            required
                        />
                        <Form.Control.Feedback>
                            {}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor={message}>Message</Form.Label>
                        <Form.Control 
                            type="text-area"
                            name="message" 
                            value={message} 
                            placeholder="Message"
                            onChange={handleChange}
                            onBlur={isTouched}

                        />
                        <Form.Control.Feedback>
                            {}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Button 
                            className="contact-btn" 
                            type="submit" 
                            disabled={!isValidated}
                        >
                            Send Message
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </Button>
                    </Form.Group>
                </Form>
                )}
            </Formik>
        </Container>
    )
}

export default Contact;