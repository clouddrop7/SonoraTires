import { useState, useEffect } from 'react';
import ServiceContext from '../ServiceContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../utils/serviceApi';
const ServiceProvider = ({ children }) => {

    const dispatch = useDispatch();
    const servicesArray = useSelector(state => state.services.servicesArray);
    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const contextValue = {
        servicesArray,
    }

    return (
        <ServiceContext.Provider value={contextValue}>
            {children}
        </ServiceContext.Provider>
    )
};

export default ServiceProvider;