// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const usersRouter = require('./routes/users');
const templatesRouter = require('./routes/templates');
const formsRouter = require('./routes/forms'); // Add forms router

// Middleware
// Configure CORS to allow requests only from your frontend domain
const allowedOrigins = [
    'https://finalprojectclient-rhcb.onrender.com', // Deployed frontend
    'http://localhost:5173'  // Local frontend running on port 5173
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests, etc.)
      if (!origin) return callback(null, true);
      
      // Allow requests from allowed origins
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    credentials: true // If using cookies, sessions, or any credentials
  }));

app.use(bodyParser.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/forms', formsRouter); // Include forms routes

// Error handling middleware (optional, but useful for debugging)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Sync models with database
const db = require('./models');
db.sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing the database:', err);
    });
