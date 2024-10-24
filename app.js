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
  'https://finalprojectclient-rhcb.onrender.com', // Your frontend on Render (if applicable)
  'http://localhost:5173', // Local development frontend
  'https://final-project-client-ashy.vercel.app' // Deployed Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
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
