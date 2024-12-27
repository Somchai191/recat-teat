require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./routes/user');

const app = express();
app.use(express.json());
app.use('/user', User);

const PORT = process.env.PORT || 5000;

// ตรวจสอบ URL ของ MongoDB
console.log('Mongo URI:', process.env.MONGO_URI);

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// ทดสอบ API
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
