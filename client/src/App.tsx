import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './containers/LoginPage';
import { AuthenticatedPath, UnAuthenticatedPath } from './hocs';
import HomePage from './containers/HomePage';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<UnAuthenticatedPath componnent={LoginPage} title="Login" />} />
          <Route path="/" element={<AuthenticatedPath componnent={HomePage} title="Home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
