const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '\.env') });

// IMPORT ROUTES (Fixes the ReferenceError)
const authRoutes = require('./routes/authRoutes'); 
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// MIDDLEWARE
app.use(express.json()); 
app.use(cors()); 

// DATABASE CONNECTION (Required for the task )
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("✅ Database Connected Successfully"))
    .catch((err) => console.error("❌ Database Connection Error:", err));

// ROUTES
app.get('/', (req, res) => {
    res.send("API is running...");
});

// Mount the routes (Meets API versioning requirement )
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// START SERVER (Cleaned up to use one port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
});