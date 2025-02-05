import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import './styles/main/main.scss';

function App() {
  return (
        <Routes>
          <Route path='/' element={<HomePage />}/>
        </Routes>
  );
}

export default App;
