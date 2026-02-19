const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/jobs', async (req, res) => {
    const job = new Job(req.body);
    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        res.json({
            success: true,
            user: {
                name: 'Shraddha Rajawat',
                email,
                avatar: 'https://github.com/ShraddhaRajawat.png'
            }
        });
    } else {
        res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
