import { Form,Button, } from 'react-bootstrap';
import { Formik} from 'formik';
import { useContext } from 'react';
import ContactContext from '../../ContactContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ContactForm = () => {
    // const { handleSubmit: submitForm, contactValidation } = useContext(ContactContext);
    const handleSubmit = () => {
        // Placeholder for actual submission logic
    };

    const submitForm = (values, resetForm) => {
        // Logic for form submission goes here
        console.log(values); // Log values for demonstration
        resetForm(); // Reset form after submission
    };

    const contactValidation = (values) => {
        // Placeholder for validation logic
        const errors = {};
        if (!values.name) {
            errors.name = 'Name is required';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        }
        if (!values.message) {
            errors.message = 'Message is required';
        }
        return errors;
    };

    return (
        <Formik 
            initialValues={{
                name: '',
                email: '',
                message: '',
            }}
            onSubmit={(values, { resetForm }) => {
                submitForm(values, resetForm);
            }}
            validate={contactValidation}
        >
            <Form className="form">
                <Form.Group className="form-row name-group">
                    <Form.Label htmlFor="name">Full Name</Form.Label>
                    <Form.Control className='form-control' name="name" placeholder="Full Name"/>
                    <Form.Control.Feedback name="name">
                        {(msg) => <p className="text-danger">{msg}</p>}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-row email-group">
                    <Form.Label htmlFor="email">Email Address</Form.Label>
                    <Form.Control className='form-control' name="email" placeholder="Email Address"/>
                    <Form.Control.Feedback name="email">
                        {(msg) => <p className="text-danger">{msg}</p>}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-row message-group">
                    <Form.Label className="message-label" htmlFor="message">Message</Form.Label>
                    <Form.Control className='form-control message' name="message" as="textarea" rows='8' placeholder="Message"/>
                    <Form.Control.Feedback name="message">
                        {(msg) => <p className="message-error">{msg}</p>}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-row btn-group">
                    <Button type="submit" className="contact-btn">
                         Send Message
                         <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
                    </Button>
                </Form.Group>
            </Form>
        </Formik>
    );
};

export default ContactForm;