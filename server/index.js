const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data (Actual Database se pehle yahan se serve karenge)
const jobs = [
    { id: 1, title: 'Frontend Developer', company: 'Meta', location: 'Remote', salary: '$120k+', type: 'Full-time' },
    { id: 2, title: 'Backend Engineer', company: 'Google', location: 'Mountain View', salary: '$140k+', type: 'Full-time' }
];

// Routes
app.get('/api/jobs', (req, res) => {
    res.json(jobs);
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // Simple check for demo
    if (email && password) {
        res.json({
            success: true,
            user: { name: 'Shraddha Rajawat', email, avatar: 'https://github.com/ShraddhaRajawat.png' }
        });
    } else {
        res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
