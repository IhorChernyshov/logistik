// Email configuration using Nodemailer with SMTP
const nodemailer = require('nodemailer');

// Creates and configures email transporter with SMTP settings from environment variables
const createTransporter = () => {
  console.log('🔑 Using SMTP credentials from .env:');
  console.log('Host:', process.env.SMTP_HOST);
  console.log('Port:', process.env.SMTP_PORT);
  console.log('User:', process.env.SMTP_USER);
  console.log('Pass:', process.env.SMTP_PASS);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false, // false for STARTTLS on port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    requireTLS: true,
    tls: {
      ciphers: 'SSLv3'
    },
    // Additional options for compatibility
    debug: true, // Enable debug output
    logger: true // Log information to console
  });
};

module.exports = { createTransporter };
