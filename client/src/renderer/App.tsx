import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserForm } from './users-form';
import { UsersList } from './users-list';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/form" element={<UserForm />} />
      </Routes>
    </Router>
  );
}
