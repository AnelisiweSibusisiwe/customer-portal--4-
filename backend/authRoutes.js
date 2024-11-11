// authRoutes.js (Backend)

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'your-mongo-atlas-connection-string'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// POST route for employee login
router.post('/employee-login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    await client.connect();
    const database = client.db('PoePart2');  // Use your database name
    const employeesCollection = database.collection('employees');  // Make sure this collection exists

    const user = await employeesCollection.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token (you can use JWT here if needed)
    const token = 'someToken';  // Replace with actual token generation logic

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
});

module.exports = router;

 