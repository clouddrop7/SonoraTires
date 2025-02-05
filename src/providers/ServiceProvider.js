// import { useState, useEffect } from 'react';
// import ServiceContext from '../ServiceContext';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchServices } from '../utils/serviceApi';
// import { fetchCarData } from '../utils/carsAPI';
// const ServiceProvider = ({ children }) => {

//     const dispatch = useDispatch();
//     const servicesArray = useSelector(state => state.services.servicesArray);
//     const carsDataArray = useSelector(state => state.cars.carsDataArray);

//     useEffect(() => {
//         dispatch(fetchServices());
//     }, [dispatch]);

//     useEffect(() => {
//         dispatch(fetchCarData());
//     })

//     const contextValue = {
//         servicesArray,
//         carsDataArray,
//     }

//     return (
//         <ServiceContext.Provider value={contextValue}>
//             {children}
//         </ServiceContext.Provider>
//     )
// };

// export default ServiceProvider;