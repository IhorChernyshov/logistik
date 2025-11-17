// Contact form routes
const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController');

// POST /api/v1/users/contact - Handles contact form submission
router.post('/contact', sendContactEmail);

module.exports = router;
