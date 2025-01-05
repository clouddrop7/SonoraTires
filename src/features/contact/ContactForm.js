import { Button, Label, Col, FormGroup} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const ContactForm = () => {
 
     return (
         <Formik initialValues={{
             name:'',
             email:'',
             subject:'',
             message:'',
         }}
         >
         <Form className="form">
           <FormGroup className="form-row" row>
               <Label htmlFor="name">full name</Label>
               <Col className="field-col" xs='6'>
                    <Field className='form-control' name="name" placeholder="Full Name"/>
                    <ErrorMessage name="name">
                         {(msg) => <p>{msg}</p>}
                    </ErrorMessage>
               </Col>
           </FormGroup>
           <FormGroup className="form-row" row>
               <Label htmlFor="email">email address</Label>
               <Col className="field-col" xs='6'>
                    <Field className='form-control' name="email" placeholder="email address"/>
                    <ErrorMessage name="email">
                         {(msg) => <p>{msg}</p>}
                    </ErrorMessage>
               </Col>
           </FormGroup>
           <FormGroup className="form-row" row>
               <Label htmlFor="subject">subject</Label>
               <Col className="field-col" xs='6'>
                    <Field className='form-control' name="subject" placeholder="subject"/>
                    <ErrorMessage name="subject">
                         {(msg) => <p>{msg}</p>}
                    </ErrorMessage>
               </Col>
           </FormGroup>
           <FormGroup className="form-row" row>
               <Label htmlFor="message">message</Label>
               <Col className="field-col" xs='6'>
                    <Field className='form-control' name="message" as="textarea" rows='8' placeholder="message"/>
                    <ErrorMessage name="message">
                         {(msg) => <p>{msg}</p>}
                    </ErrorMessage>
               </Col>
           </FormGroup>
           <FormGroup>
               <Col>
                    <Button className="contact-btn">Send Message</Button>
               </Col>
           </FormGroup>
         </Form>
         </Formik>
     )
 }
 
 export default ContactForm;