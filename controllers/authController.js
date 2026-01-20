const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // 2. Check password (using bcrypt to compare hashed passwords)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // 3. Create JWT Token (Requirement: Secure JWT token handling)
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Add this below your login function in authController.js

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // 2. Create new user 
        // REMOVED: manual salt/hash here. 
        // Just pass the PLAIN password. User.js will hash it automatically.
        user = new User({
            name,
            email,
            password, // Passing plain password
            role: role || 'user'
        });

        await user.save();

        // 3. Create JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during registration" });
    }
};