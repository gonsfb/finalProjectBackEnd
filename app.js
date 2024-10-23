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
app.use(cors());
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
