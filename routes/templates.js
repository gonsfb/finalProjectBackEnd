const express = require('express');
const router = express.Router();
const db = require('../models');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

// Get templates created by the logged-in user
router.get('/mine', authenticateToken, async (req, res) => {
    console.log('User ID:', req.user.userId);  // Log the user ID
    try {
        const templates = await db.Template.findAll({
            where: { authorId: req.user.userId },
            include: [{ model: db.User, as: 'author', attributes: ['name', 'email'] }]
        });
        res.json(templates);
    } catch (err) {
        console.error('Error fetching user templates:', err);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
});

// Full-text search route (Public)
router.get('/search', async (req, res) => {
    console.log('Search route hit without token validation');
    const { query } = req.query;

    try {
        const templates = await db.Template.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { title: { [db.Sequelize.Op.iLike]: `%${query}%` } },
                    { description: { [db.Sequelize.Op.iLike]: `%${query}%` } }
                ]
            },
            include: [{ model: db.User, as: 'author', attributes: ['name', 'email'] }]
        });
        res.json(templates);
    } catch (err) {
        console.error('Server error during search:', err);
        res.status(500).json({ error: 'Server error during search' });
    }
});

// Create a new template (User or Admin)
router.post('/', authenticateToken, async (req, res) => {
    const { title, description, customFields } = req.body;

    try {
        const template = await db.Template.create({
            title,
            description,
            authorId: req.user.userId,  // req.user.userId comes from the token
            ...customFields  // Spread the custom fields (custom_string1_state, etc.)
        });
        res.status(201).json(template);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create template' });
    }
});

// Get all templates (Public)
router.get('/', async (req, res) => {
    try {
        const templates = await db.Template.findAll({
            include: [{ model: db.User, as: 'author', attributes: ['name', 'email'] }]
        });
        res.json(templates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});




// View a single template by ID
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const template = await db.Template.findByPk(id, {
            include: [{ model: db.User, as: 'author', attributes: ['name', 'email'] }]
        });
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json(template);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Update a template by id (Author or Admin)
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, customFields } = req.body;
    try {
        const template = await db.Template.findByPk(id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        // Only the author or admin can update the template
        if (template.authorId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        template.title = title;
        template.description = description;
        Object.assign(template, customFields); // Update custom fields
        await template.save();

        res.json(template);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a template by id (Author or Admin)
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const template = await db.Template.findByPk(id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        // Only the author or admin can delete the template
        if (template.authorId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        await template.destroy();
        res.json({ message: 'Template deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// View responses for a template (only accessible by the creator or an admin)
router.get('/:id/responses', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const template = await db.Template.findByPk(id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        // Check if the user is the author or an admin
        if (template.authorId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const responses = await db.Form.findAll({
            where: { templateId: id },
        });

        res.json(responses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get popular templates (sorted by form count or other criteria)
router.get('/popular', async (req, res) => {
    try {
        const templates = await db.Template.findAll({
            include: [{ model: db.Form }], // Include forms to count responses
            order: [['createdAt', 'DESC']], // Sort by creation date (or other criteria)
        });
        res.json(templates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

