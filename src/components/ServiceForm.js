import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Container, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ServiceContext from '../ServiceContext';
const ServiceForm = () => {
    const { carsDataArray } = useContext(ServiceContext);
    const [authorized, setAuthorized] = useState(false);

    return (
        <Container>
            <h2>Shop By Tires</h2>
        {
            authorized && 
            <Formik>
            </Formik>
        }
       </Container>
    )
}

export default ServiceForm;