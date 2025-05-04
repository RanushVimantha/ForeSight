const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');
const { authenticate } = require('../middlewares/authMiddleware');

// ✅ Get all projects
router.get('/', authenticate, async (req, res) => {
    const projects = await Project.findAll();
    res.json(projects);
});

router.post('/', authenticate, async (req, res) => {
    const { name, description, status, duration_days, team_size, budget_lkr, scope_description } = req.body;

    const project = await Project.create({
        name,
        description,
        status: status || 'Active',
        duration_days,
        team_size,
        budget_lkr,
        scope_description
    });

    res.status(201).json(project);
});

router.put('/:id', authenticate, async (req, res) => {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.update(req.body);
    res.json({ message: 'Project updated', project });
});


// ✅ Delete project
router.delete('/:id', authenticate, async (req, res) => {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.destroy();
    res.json({ message: 'Project deleted' });
});
// Get single project by ID
router.get('/:id', authenticate, async (req, res) => {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
});


module.exports = router;
