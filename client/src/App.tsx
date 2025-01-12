import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ProtectedPage from './components/ProtectedPage';
import RouteProtected from './components/RouteProtected';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/protected" element={<RouteProtected />}>
          <Route path="/protected" element={<ProtectedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
