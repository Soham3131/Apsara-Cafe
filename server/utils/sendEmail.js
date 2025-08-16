// utils/sendEmail.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587, // Standard port for SMTP
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `Apsara Cafe <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;