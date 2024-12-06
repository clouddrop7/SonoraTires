import {Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../../styles/contact/contact.scss';

const ContactForm = () => {
    return (
        <>
            <Form className='contact-form-container'>
               <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control />
                    <Form.Text></Form.Text>
               </Form.Group>
               <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control />
                    <Form.Text></Form.Text>
               </Form.Group>
               <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control />
                    <Form.Text></Form.Text>
               </Form.Group>
               <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control />
                    <Form.Text></Form.Text>
               </Form.Group>
               <Button>Send Message</Button>
            </Form>
        </>
    )
}

export default ContactForm;
