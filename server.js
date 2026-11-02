// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const medicoRoutes = require('./routes/medicoRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes');
const healthPackageRoutes = require('./routes/healthPackageRoutes');
const contactRoutes = require('./routes/contactRoutes');
const imageGalleryRoutes = require('./routes/imageGalleryRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const hvsbVisitorRoutes = require('./routes/hvsbVisitorRoutes');


const Razorpay = require('razorpay');  // Add Razorpay
require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Uploads directory created');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Serve images from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/medicos', medicoRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/healthPackages', healthPackageRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/image-gallery', imageGalleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/hvsbvisitors', hvsbVisitorRoutes);


// Ping Route to keep server awake
app.get('/ping', (req, res) => {
  res.status(200).send('Working Fine, Thank You Shahid');
});

// Razorpay Configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint to create an order
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Convert to smallest currency unit (paise for INR)
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order); // Send the order details to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// User Registration Route
app.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Registration completed successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/users/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch count' });
  }
});

