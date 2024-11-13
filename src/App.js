import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap';


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
