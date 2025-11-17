// Email configuration using Nodemailer with SMTP
const nodemailer = require('nodemailer');

// Creates and configures email transporter with SMTP settings from environment variables
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

module.exports = { createTransporter };
