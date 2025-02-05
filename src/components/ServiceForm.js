import { Formik } from 'formik';
import { Form, Modal, Button, Image } from 'react-bootstrap';
import * as Yup from 'yup';
import {useState, useEffect } from 'react';
import '../styles/services/serviceform/serviceform.scss';
import sonoraLogo from '../app/assets/images/sonoraIcon.png';

const ServiceForm = ({ show, onHide, service }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name.'),
    lastName: Yup.string().required('Please enter your last name.'),
    email: Yup.string().email('Invalid email').required('Please enter your email address.'),
    phone: Yup.string()
      .matches(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{3}\)?))(-| )?(\d{3}(-| )?\d{4})$/, 'Phone number is not valid')
      .required('Please enter your phone number.'),
    year: Yup.string().required('Please select your vehicle year.'),
    make: Yup.string().required('Please select your vehicle make.'),
    model: Yup.string().required('Please select your vehicle model.'),
    option: Yup.string().required('Please select an option.'),
  });

  const [check, setCheck] = useState(false);
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
    onHide();
  };

  const getModalTitle = (serviceName) => {
    const serviceActions = {
      'Tires': 'Schedule Tire Service',
      'Alignment': 'Schedule Wheel Alignment',
      'Brakes': 'Shop for Brakes',
      'Battery': 'Have a Battery Check',
      'Mufflers': 'Muffler Service',
      'Catalytic Converter': 'Catalytic Converter Service'
    };

    return serviceActions[serviceName] || `Schedule ${serviceName} Service`;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Image className="tire-icon" src={sonoraLogo}/>
        <Modal.Title>{getModalTitle(service)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            year: '',
            make: '',
            model: '',
            option: '',
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
            <Form className="service-form" noValidate onSubmit={handleSubmit}>
              <Form.Group >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                  isInvalid={touched.firstName && !!errors.firstName}
                  placeholder="first name"
                />
                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                  isInvalid={touched.lastName && !!errors.lastName}
                  placeholder="last name"
                />
                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                  placeholder="email"
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  isValid={touched.phone && !errors.phone}
                  isInvalid={touched.phone && !!errors.phone}
                  placeholder="(XXX)XXX-XXXX"
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Control 
                  as="select"
                  name="year"
                  value={values.year}
                  onChange={handleChange}
                  isValid={touched.year && !errors.year}
                  isInvalid={touched.year && !!errors.year}
                >
                  <option value="">Select Year</option>
                  <option key='' value=''>''</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Make</Form.Label>
                <Form.Control 
                  as="select"
                  name="make"
                  value={values.make}
                  onChange={handleChange}
                  isValid={touched.make && !errors.make}
                  isInvalid={touched.make && !!errors.make}
                >
                  <option value="">Select Make</option>
                  <option key='' value=''>''</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.make}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Model</Form.Label>
                <Form.Control 
                  as="select"
                  name="model"
                  value={values.model}
                  onChange={handleChange}
                  isValid={touched.model && !errors.model}
                  isInvalid={touched.model && !!errors.model}
                >
                  <option value="">Select Model</option>
                    <option key='' value=''>''</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.model}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Option</Form.Label>
                <Form.Control 
                  as="select"
                  name="option"
                  value={values.option}
                  onChange={handleChange}
                  isValid={touched.option && !errors.option}
                  isInvalid={touched.option && !!errors.option}
                >
                  <option value="">Select Option</option>
                    <option key='' value=''>''</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.option}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Check 
                  label={
                    <a href="/terms" className="term-link">Accept terms and conditions</a>
                  }
                  type="checkbox"
                  checked={check}
                  onChange={() => setCheck(!check)}
                  className="cart-check"
                />
              </Form.Group>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceForm;