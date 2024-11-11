const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

// MongoDB connection URI and database details
const uri = 'mongodb+srv://st10083712:RykztHtkQzbx7Zdl@cluster0.nz3ze.mongodb.net/PoePart2?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI if hosted
const dbName = 'PoePart2';
const collectionName = 'employees';

// Employee user data
const employeeData = {
  username: 'asandaqwabe',
  password: 'cruzqwabe' // Plain text, will be hashed
  
};

// Connect to MongoDB and add the employee user
async function createEmployeeUser() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Hash the password before storing it
    const saltRounds = 10;
    employeeData.password = await bcrypt.hash(employeeData.password, saltRounds);

    // Insert the employee user into the collection
    const result = await collection.insertOne(employeeData);
    console.log('Employee user created:', result.insertedId);
  } catch (error) {
    console.error('Error creating employee user:', error);
  } finally {
    await client.close();
  }
}

createEmployeeUser();
