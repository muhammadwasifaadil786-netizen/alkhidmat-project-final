import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('DB Connection Error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, select: false },
  role: { type: String, enum: ['donor', 'volunteer', 'admin'], default: 'donor' }
});
const User = mongoose.model('User', userSchema);

const emergencySchema = new mongoose.Schema({
  title: String,
  location: String,
  urgency: String,
  createdAt: { type: Date, default: Date.now }
});
const Emergency = mongoose.model('Emergency', emergencySchema);

const donationSchema = new mongoose.Schema({
  donorName: { type: String, default: 'Anonymous Donor' },
  email: { type: String, default: 'guest@alkhidmat.org' },
  category: String,
  amount: Number,
  paymentMethod: { type: String, default: 'Bank Transfer' },
  trackingCode: String,
  date: { type: Date, default: Date.now }
});
const Donation = mongoose.model('Donation', donationSchema);

// Middleware for Auth
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid Token' });
  }
};

// Seed initial admin and mock emergencies if empty
const seedDatabase = async () => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({ name: 'Admin Nexus', email: 'admin@alkhidmat.org', password: hashedPassword, role: 'admin' });
      
      const volunteerPassword = await bcrypt.hash('volunteer123', 10);
      await User.create({ name: 'Test Volunteer', email: 'volunteer@alkhidmat.org', password: volunteerPassword, role: 'volunteer' });

      await Emergency.create([
        { title: 'Flood Relief Camp - Sindh', location: 'District Badin', urgency: 'Critical' },
        { title: 'Clean Water Project', location: 'Thar Desert', urgency: 'High' }
      ]);
      console.log('Database Seeded with Admin, Volunteer & Mock Data!');
    }
  } catch (err) {
    console.log('Seeding Error:', err.message);
  }
};
setTimeout(seedDatabase, 2000);

// Routes

// 0. Root / Home Route
app.get('/', (req, res) => {
  res.send('Al Khidmat Foundation API is running successfully!');
});

// 1. Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select('+password');
    
    if (!user && email === 'admin@alkhidmat.org') {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      user = await User.create({ name: 'Admin Nexus', email, password: hashedPassword, role: 'admin' });
      user = await User.findOne({ email }).select('+password');
    }

    if (!user) return res.status(400).json({ error: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/emergencies', async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ createdAt: -1 });
    res.json(emergencies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/emergencies', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'volunteer' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access Denied: Only Volunteers and Admins can broadcast emergencies' });
    }
    const newEmergency = await Emergency.create(req.body);
    res.json({ message: 'Emergency Broadcast Published!', newEmergency });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/donations', async (req, res) => {
  try {
    const { donorName, email, category, amount, paymentMethod } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }
    const trackingCode = 'ALKH-' + crypto.randomBytes(4).toString('hex').toUpperCase();
    const donation = await Donation.create({
      donorName: donorName || 'Anonymous Donor',
      email: email || 'guest@alkhidmat.org',
      category: category || 'General Welfare',
      amount,
      paymentMethod: paymentMethod || 'Bank Transfer',
      trackingCode
    });
    res.json({ message: 'Success', donation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/stats', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access Denied: Admins Only' });
    }

    const donations = await Donation.find();
    const totalFunds = donations.reduce((acc, curr) => acc + curr.amount, 0);
    const donationCount = donations.length;
    const emergencyCount = await Emergency.countDocuments();
    
    res.json({ totalFunds, donationCount, emergencyCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));