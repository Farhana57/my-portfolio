const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static folder handling
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.log('DB Connection Error:', err));

// Contact Form Schema & Model
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'farhanakhatun22@gmail.com', 
        pass: process.env.EMAIL_PASS || 'farhanat50575253'
    }
});

// Home Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API Endpoint for Contact Form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // 1. Save to Database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // 2. Send Email Notification (English)
        const mailOptions = {
            from: email,
            to: 'farhanakhatun22@gmail.com',
            subject: `New Portfolio Message from: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: 'Message saved to MongoDB and email sent successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Database or email error, please try again.' });
    }
});

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
