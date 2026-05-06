const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');

// Routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static frontend files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Catch-all route to serve the React frontend for non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;
