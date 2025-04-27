// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, )
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error: ', error));

// Contact Schema and Model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// POST API to save contact form data
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    const newContact = new Contact({ name, email, phone, message });

    try {
        await newContact.save();
        res.status(200).json({ success: true, message: 'Data saved successfully!' });
    } catch (error) {
        console.log('Error saving data:', error);
        res.status(500).json({ success: false, message: 'Error saving data' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
