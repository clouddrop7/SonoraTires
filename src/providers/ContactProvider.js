import ContactContext from '../ContactContext';
import { contactValidation } from '../utils/contactValidation';
import { postMessage } from '../utils/contactApi';
import { useDispatch } from 'react-redux'; 

const ContactProvider = ({ children }) => {
    const dispatch = useDispatch();
    const handleSubmit = async (values, resetForm) => {
        const message = {
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
        }
        dispatch(postMessage(message));
        resetForm();
    };

    const contextValue = {
        handleSubmit,
        contactValidation,
    };

    return (
        <ContactContext.Provider value={contextValue}>
            {children}
        </ContactContext.Provider>
    )
};

export default ContactProvider;