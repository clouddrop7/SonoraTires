import { useState, useEffect } from 'react';
import ServiceContext from '../ServiceContext';
import { useDispatch, useSelector } from 'react-redux';
import services from '../db.json';
const ServiceProvider = ({ children }) => {
    const contextValue = {

    }

    return (
        <ServiceContext.Provider value={contextValue}>
            {children}
        </ServiceContext.Provider>
    )
};

export default ServiceProvider;