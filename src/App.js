import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap';
import Header from '../components/Header.js';
import Footer from '../componentsFooter.js';
import HomePage from '../pages/HomePage.js';

import '../styles/main/main.scss';

function App() {
  return (
    <Container>
      <Header />
        <Routes>
          <Route />
          <Route />
          <Route />
          <Route />
          <Route />
          <Route />
          <Route />
          <Route />
        </Routes>
      <Footer />
    </Container>
  );
}

export default App;
