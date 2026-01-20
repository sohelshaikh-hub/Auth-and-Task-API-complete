const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

console.log("Register Function:", typeof register);
console.log("Login Function:", typeof login);
console.log("Protect Function:", typeof protect);

router.post('/register', register); 
router.post('/login', login);       

// Protected route for the Admin check [cite: 12, 22]
router.get('/admin-only', protect, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    res.json({ message: "Success! You are an Admin." });
});

module.exports = router;