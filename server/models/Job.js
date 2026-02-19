const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    type: { type: String, required: true },
    logo: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/281/281744.png' },
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);
