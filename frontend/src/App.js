import React, { useState } from 'react';
import './App.css';
import Registration from './registration';  // Correct import path
import Login from './Login';  // Correct import path for customer login
import EmployeeLogin from './EmployeeLogin';  // Import EmployeeLogin component
import PaymentForm from './PaymentForm';  // Correct import path

function App() {
  const [currentPage, setCurrentPage] = useState('landing');  // Track current page
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Handler for navigation buttons on the landing page
  const handleNavigation = (page) => {
    setCurrentPage(page);  // Set the page based on button click
  };

  // Handle registration submission
  const handleRegister = async (username, password) => {
    const response = await fetch('http://localhost:5001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert('Registration successful!');
      setIsRegistered(true);  // Set registration success
      setCurrentPage('customerLogin');  // Redirect to login
    } else {
      alert('Registration failed');
    }
  };

  // Handle login submission
  const handleLogin = async (username, password) => {
    const response = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert('Login successful!');
      setIsLoggedIn(true);  // Set login success
      setCurrentPage('payment');  // Redirect to payment page
    } else {
      alert('Login failed');
    }
  };

  // Landing page with navigation buttons
  if (currentPage === 'landing') {
    return (
      <div className="landing-page">
        <h1>Welcome to the Customer Portal</h1>
        <button onClick={() => handleNavigation('customerLogin')}>Customer Login</button>
        <button onClick={() => handleNavigation('customerRegister')}>Customer Register</button>
        <button onClick={() => handleNavigation('employeeLogin')}>Employee Login</button>
      </div>
    );
  }

  // Customer Registration page
  if (currentPage === 'customerRegister' && !isRegistered) {
    return <Registration handleRegister={handleRegister} />;
  }

  // Customer Login page
  if (currentPage === 'customerLogin' && !isLoggedIn) {
    return <Login handleLogin={handleLogin} />;
  }

  // Employee Login page
  if (currentPage === 'employeeLogin' && !isLoggedIn) {
    return <EmployeeLogin handleLogin={handleLogin} />;
  }

  // Payment form page after login
  if (currentPage === 'payment' && isLoggedIn) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Customer International Payments Portal</h1>
          <PaymentForm />  {/* Display payment form */}
        </header>
      </div>
    );
  }

  return null;
}

export default App;



