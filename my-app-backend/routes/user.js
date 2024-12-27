const express = require('express');
const router = express.Router();
const User = require('../models/User'); // อย่าลืมเพิ่มการนำเข้าโมเดล

// Route สำหรับการสมัครสมาชิก (POST)
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // ตรวจสอบว่าผู้ใช้งานมีอยู่แล้วหรือไม่
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // สร้างผู้ใช้ใหม่
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});


// Route สำหรับการดึงข้อมูลผู้ใช้เฉพาะ (GET)
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});
module.exports = router;
