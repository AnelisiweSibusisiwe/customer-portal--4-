// src/authRoutes.js (Frontend)

const API_URL = 'http://localhost:5001/api'; // Replace with your backend API URL

// Function for handling employee login
export const employeeLogin = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/employee-login`, {  // Corrected the URL to match the backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store the token (for example, in localStorage) if login is successful
      localStorage.setItem('token', data.token);
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};


