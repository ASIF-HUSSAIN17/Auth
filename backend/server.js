const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS to allow the frontend app to access the backend
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Replace with your MySQL username
  password: 'your_password',  // Replace with your MySQL password
  database: 'userDB',     // Your database name
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL Database');
});

// Signup Route (POST)
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving user to the database' });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error hashing password' });
  }
});

// Signin Route (POST)
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Query the database for the user with the provided email
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token with the user's id
    const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });

    // Send the token as the response
    res.status(200).json({ message: 'Signin successful', token });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
