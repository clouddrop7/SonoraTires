// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { db } from '../firebase.config';
// import { collection, addDoc } from 'firebase/firestore';

// export const postMessage = createAsyncThunk('messages/postMessage', async(payload) => {
//     const docRef = await addDoc(collection(db, 'messages'), {
//         ...payload,
//         date: new Date().toISOString(),
//     });
//     const newMessage = {
//         ...payload,
//         id: docRef.id,
//         date: new Date().toISOString()
//     }
//     return newMessage;
// });

// const initialState = {
//     messageArray : [],
//     isLoading: false,
//     errMsg: ''
// };

// const messagesSlice = createSlice({
//     name: 'messages',
//     initialState,
//     reducers: {
//         addMessage: (state, action) => {
//             const newMessage = {
//                 id: state.messageArray.length + 1,
//                 ...action.payload
//             };
//             state.messageArray.push(newMessage);
//         }
//     },
//     extraReducers: (builder =>
//         builder 
//         .addCase(postMessage.fulfilled, (state, action) => {
//            state.messageArray.push(action.payload);
//         })
//         .addCase(postMessage.rejected, (state, action) => {
//             alert(
//                 'Your message was unable to be sent\nError: ' +
//                 (action.error ? action.error.message : 'Post Failed')
//             );
//         })
//     )
// });

// export const { addMessage } = messagesSlice.actions;