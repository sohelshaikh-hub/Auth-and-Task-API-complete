const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Check for token in headers (Standard REST practice) 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from string "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify token using the secret from .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user data (id and role) to the request object 
            req.user = decoded;
            
            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "You must login first. No token provided." });
    }
};

// CRITICAL: You must export the function so routes can use it
module.exports = { protect };