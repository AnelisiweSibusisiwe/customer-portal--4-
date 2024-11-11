const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const { MongoClient } = require('mongodb');
const path = require('path'); // For handling file paths

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection URI
const uri = 'mongodb+srv://st10083712:RykztHtkQzbx7Zdl@cluster0.nz3ze.mongodb.net/PoePart2?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let database; // To store the database connection for later use

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Serve the JavaScript files when the user navigates to them
app.get('/login.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.js'));
});

app.get('/registration.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/registration.js'));
});

// Endpoint for user registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const customersCollection = database.collection("customers");

        const existingUser = await customersCollection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = { username, password: hashedPassword };
        await customersCollection.insertOne(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint for user login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const customersCollection = database.collection("customers");

        const user = await customersCollection.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server and connect to MongoDB once
async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        database = client.db('PoePart2'); // Assign database connection
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

startServer();
