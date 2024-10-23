const express = require('express');
const router = express.Router();
const db = require('../models');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

// Create a new form (Authenticated Users)
router.post('/', authenticateToken, async (req, res) => {
    const { templateId, answers } = req.body;
    try {
        const form = await db.Form.create({
            templateId,
            userId: req.user.userId,
            ...answers // Include custom answers here
        });
        res.status(201).json(form);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all forms for a template (Authenticated Users)
router.get('/:templateId', authenticateToken, async (req, res) => {
    const { templateId } = req.params;
    try {
        const forms = await db.Form.findAll({
            where: { templateId },
            include: [{ model: db.User, attributes: ['name', 'email'] }]
        });
        res.json(forms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a form by id (Author or Admin)
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { answers } = req.body;
    try {
        const form = await db.Form.findByPk(id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        // Only the user who created the form or an admin can update it
        if (form.userId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        Object.assign(form, answers); // Update the answers
        await form.save();

        res.json(form);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a form by id (Author or Admin)
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const form = await db.Form.findByPk(id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        // Only the user who created the form or an admin can delete it
        if (form.userId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        await form.destroy();
        res.json({ message: 'Form deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
    