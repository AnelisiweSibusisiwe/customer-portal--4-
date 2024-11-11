// src/EmployeeLogin.js
import React, { useState } from 'react';
import { employeeLogin } from './services/authRoutes'; // Import the function from authRoutes.js

function EmployeeLogin({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Call the employeeLogin function from authRoutes.js
    const { success, message } = await employeeLogin(username, password, title);

    if (success) {
      setIsLoggedIn(true); // If login is successful, update state to logged in
      alert('Employee login successful!');
    } else {
      alert(message); // Show the error message if login fails
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-title">Employee Login Portal</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default EmployeeLogin;

  