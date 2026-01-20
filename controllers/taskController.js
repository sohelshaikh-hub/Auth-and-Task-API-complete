const Task = require('../models/Task');

// @desc    Get all tasks for logged-in user
// @route   GET /api/v1/tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Create new task
// @route   POST /api/v1/tasks
exports.createTask = async (req, res) => {
    try {
        // Add user ID from the JWT token to the task data
        req.body.user = req.user.id; 
        
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update task status
// @route   PUT /api/v1/tasks/:id
exports.updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        // Ensure user owns the task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: task });
    } catch (err) {
        res.status(400).json({ success: false, message: "Update failed" });
    }
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await task.deleteOne();
        res.status(200).json({ success: true, message: "Task removed" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Not found" });
    
    // Security check: ensure user owns the task [cite: 40]
    if (task.user.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updatedTask });
};

// Delete Task
exports.deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Not found" });

    if (task.user.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

    await task.deleteOne();
    res.json({ success: true, message: "Task deleted" });
};