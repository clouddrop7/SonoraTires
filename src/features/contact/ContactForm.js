import { Button, Label, Col, FormGroup} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useContext } from 'react';
import ContactContext from '../../ContactContext';

const ContactForm = () => {

     const { handleSubmit: submitForm, contactValidation } = useContext(ContactContext);

     return (
         <Formik initialValues={{
             name:'',
             email:'',
             subject:'',
             message:'',
         }}
         onSubmit={(values, {resetForm }) => {
          submitForm(values, resetForm);
         }}
         validate={contactValidation}
         >
         <Form className="form">
           <FormGroup row className="form-row name-group">
               <Col className="field-col" xs='12'>
                    <Label htmlFor="name">full name</Label>
                    <Field className='form-control' name="name" placeholder="full name"/>
                    <ErrorMessage name="name">
                         {(msg) => <p className="text-danger">{msg}</p>}
                    </ErrorMessage>
               </Col>
           </FormGroup>
           <FormGroup row className="form-row email-group">
               <Col className="field-col" md='12'>
                    <Label htmlFor="email">email address</Label>
                    <Field className='form-control' name="email" placeholder="email address"/>
                    <ErrorMessage name="email">
                         {(msg) => <p className="text-danger">{msg}</p>}
                    </ErrorMessage>
               </Col>
           </FormGroup>
           <FormGroup row className="form-row subject-group">
               <Col className="field-col" md='12'>
                    <Label htmlFor="subject">subject</Label>
                    <Field className='form-control' name="subject" placeholder="subject"/>
                    <ErrorMessage name="subject">
                         {(msg) => <p className="subject-error">{msg}</p>}
                    </ErrorMessage>
               </Col>
               <Col className="field-col message-group" md='1'>
                    <Label htmlFor="message">message</Label>
                    <Field className='form-control message' name="message" as="textarea" rows='8' placeholder="message"/>
                    <ErrorMessage name="message">
                         {(msg) => <p className="message-error">{msg}</p>}
                    </ErrorMessage>
               </Col>
           </FormGroup>
           <FormGroup className="form-row btn-group">
               <Col className="field-col" md='12'>
                    <Button type="submit" className="contact-btn">Send Message</Button>
               </Col>
           </FormGroup>
         </Form>
         </Formik>
     )
 }
 
 export default ContactForm;