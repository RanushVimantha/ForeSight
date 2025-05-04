const Project = require('../models/projectModel');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch project' });
    }
};

exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ message: 'Project created', project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create project' });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        await project.update(req.body);
        res.json({ message: 'Project updated', project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update project' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        await project.destroy();
        res.json({ message: 'Project deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete project' });
    }
};
