const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
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
        pass: 'farhanat50575253' 
    }
});

// Home Route
app.get('/', (req, res) => {
  res.send('Portfolio Server is Running Successfully!');
});

// API Endpoint for Contact Form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // ১. ডাটাবেজে সেভ করা
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // ২. ইমেইল নোটিফিকেশন পাঠানো
        const mailOptions = {
            from: email,
            to: 'farhanakhatun22@gmail.com',
            subject: `নতুন পোর্টফোলিও মেসেজ এসেছে: ${name}`,
            text: `নাম: ${name}\nইমেইল: ${email}\nমেসেজ: ${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: 'Message saved to MongoDB and email sent successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Database or email error, please try again.' });
    }
});

// Server Port
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});