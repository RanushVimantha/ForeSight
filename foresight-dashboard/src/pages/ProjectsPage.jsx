import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
    Box, Typography, Button, Table, TableHead, TableRow,
    TableCell, TableBody, TextField, MenuItem, IconButton, CircularProgress, Chip
} from '@mui/material';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        name: '', description: '', status: 'Active'
    });
    const [loading, setLoading] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error('Failed to load projects:', err);
            toast.error('Failed to load projects');
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleCreateProject = async () => {
        if (!newProject.name || !newProject.description) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            await axiosInstance.post('/projects', newProject);
            toast.success('Project created');
            setNewProject({ name: '', description: '', status: 'Active' });
            fetchProjects();
        } catch (err) {
            console.error('Failed to create project:', err);
            toast.error('Failed to create project');
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        let newStatus = 'Active';
        if (currentStatus === 'Active') newStatus = 'Completed';
        else if (currentStatus === 'Completed') newStatus = 'Active';

        try {
            await axiosInstance.put(`/projects/${id}`, { status: newStatus });
            toast.success(`Project status updated to ${newStatus}`);
            fetchProjects();
        } catch (err) {
            console.error('Failed to update project status:', err);
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            await axiosInstance.delete(`/projects/${id}`);
            toast.success('Project deleted');
            fetchProjects();
        } catch (err) {
            console.error('Failed to delete project:', err);
            toast.error('Failed to delete project');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <Box>
            <Typography variant="h4" mb={2}>Projects</Typography>

            {/* New Project Form */}
            <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                <TextField
                    label="Name"
                    name="name"
                    value={newProject.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={newProject.description}
                    onChange={handleChange}
                />
                <TextField
                    type="number"
                    label="Duration (days)"
                    name="duration_days"
                    value={newProject.duration_days || ''}
                    onChange={handleChange}
                />
                <TextField
                    type="number"
                    label="Team Size"
                    name="team_size"
                    value={newProject.team_size || ''}
                    onChange={handleChange}
                />
                <TextField
                    type="number"
                    label="Budget (LKR)"
                    name="budget_lkr"
                    value={newProject.budget_lkr || ''}
                    onChange={handleChange}
                />
                <TextField
                    label="Scope Description"
                    name="scope_description"
                    value={newProject.scope_description || ''}
                    onChange={handleChange}
                    multiline
                />
                <TextField
                    select
                    label="Status"
                    name="status"
                    value={newProject.status}
                    onChange={handleChange}
                >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Planning">Planning</MenuItem>
                    <MenuItem value="On Hold">On Hold</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
                <Button variant="contained" onClick={handleCreateProject}>
                    Create Project
                </Button>
            </Box>

            {/* Loading Spinner or Table */}
            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.id}</TableCell>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={project.status}
                                        color={
                                            project.status === 'Active' ? 'success' :
                                            project.status === 'Completed' ? 'primary' :
                                            'default'
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" gap={1} alignItems="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => window.location.href = `/projects/${project.id}`}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => handleToggleStatus(project.id, project.status)}
                                        >
                                            {project.status === 'Active' ? 'Complete' : 'Activate'}
                                        </Button>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(project.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
}

export default ProjectsPage;
