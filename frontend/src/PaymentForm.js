import React, { useState } from 'react';
import './PaymentForm.css'; // Import the CSS file

function PaymentForm() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input using regex
    const namePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces
    const amountPattern = /^[0-9]+(\.[0-9]{1,2})?$/; // Positive numbers with optional decimal

    if (!namePattern.test(name)) {
      setError('Invalid name. Only letters and spaces are allowed.');
      return;
    }

    if (!amountPattern.test(amount)) {
      setError('Invalid amount. Please enter a valid number.');
      return;
    }

    // Submit form data to API (to be implemented)
    console.log({ name, amount });
    setError('');
    // Reset form fields if necessary
    setName('');
    setAmount('');
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default PaymentForm;
