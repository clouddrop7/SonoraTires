// import validator from 'validator';

// export const contactValidation = (values) => {
//     const {name, email, subject, message} = values;
//     const sanitizeSubject = subject.trim();
//     const errors = {};

//     if (!name) {
//         errors.name = 'required';
//       } else if (name.length < 2) {
//         errors.name = 'required';
//       } else if (name.length > 50) {
//         errors.name = 'invalid format';
//       } else {
//         const sanitizedName = name.trim();
//         const allowedChars = /^[a-zA-Z\s-]+$/; 
//         if (!allowedChars.test(sanitizedName)) {
//           errors.name = 'invalid format';
//         }
//       }

//     if(!email) {
//         errors.email = 'required';
//     } else if (!validator.isEmail(email)) {
//         errors.email = 'invalid format'
//     }

//     if(!sanitizeSubject) {
//         errors.subject = 'required'
//     } else if (sanitizeSubject.length < 2) {
//         errors.subject = 'Please provide a subject'
//     } else if (!validator.isAlpha(sanitizeSubject)) {
//         errors.subject = 'invalid format'
//     } else {
//         const sanitizedSubject = validator.escape(sanitizeSubject);
//     }

//     if(!message) {
//         errors.message = 'required'
//     } else if (message.length < 10) {
//         errors.message = 'message must be at least 10 characters long';
//     } else if (message.length > 500) {
//         errors.message = 'message cannot exceed 500 characters';
//     } else {
//         const sanitizedMessage = validator.escape(message);
//     }
//     return errors;
// }