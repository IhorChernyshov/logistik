// Main Express server file for handling contact form submissions
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contact');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/v1/users', contactRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Test SMTP connection on startup
const { createTransporter } = require('./config/email');
const testSMTPConnection = async () => {
  console.log('🔍 Testing SMTP connection...');
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
  } catch (error) {
    console.error('❌ SMTP connection FAILED:', error.message);
    console.error('   Code:', error.code);
    console.error('   Command:', error.command);
  }
};

// Start server
app.listen(PORT, async () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📧 SMTP configured with ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
  await testSMTPConnection();
});
