// Contact form controller for handling email submissions
const { createTransporter } = require('../config/email');

// Handles contact form submission and sends email via SMTP
const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate request body
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Bitte füllen Sie alle Felder aus (Name, E-Mail, Nachricht)'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
      });
    }

    // Create email transporter
    const transporter = createTransporter();

    // Email content configuration
    const mailOptions = {
      from: `"Infinity Logistik Support" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #0F3854; margin: 0 0 20px 0;">Neue Kontaktanfrage</h2>

          <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong>E-Mail:</strong> ${email}</p>

          <h3 style="color: #0F3854; margin: 20px 0 10px 0;">Nachricht:</h3>
          <p style="line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>

          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

          <p style="color: #666; font-size: 12px; margin: 0;">
            Diese Nachricht wurde über das Kontaktformular der Website Infinity Logistik & Verpackung gesendet.
          </p>
        </div>
      `,
      text: `
Neue Kontaktanfrage

Name: ${name}
E-Mail: ${email}

Nachricht:
${message}

---
Diese Nachricht wurde über das Kontaktformular der Website Infinity Logistik & Verpackung gesendet.
      `.trim()
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Success response
    res.status(200).json({
      message: 'Ihre Nachricht wurde erfolgreich gesendet. Vielen Dank!',
      success: true
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      message: 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { sendContactEmail };
