import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import {
    Box, Typography, Card, CardContent, Button, CircularProgress, Divider, Chip, TextField,
    MenuItem, Table, TableHead, TableRow, TableCell, TableBody, IconButton, List, ListItem,
    ListItemIcon, ListItemText
} from '@mui/material';
import { toast } from 'react-toastify';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ScienceIcon from '@mui/icons-material/Science';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SecurityIcon from '@mui/icons-material/Security';
import SearchIcon from '@mui/icons-material/Search';
import InsightsIcon from '@mui/icons-material/Insights';

function ProjectDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedProject, setEditedProject] = useState({});
    const [risks, setRisks] = useState([]);

    const fetchProject = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/projects/${id}`);
            setProject(res.data);
            setEditedProject(res.data);
        } catch (err) {
            toast.error('Failed to load project details');
        }
        setLoading(false);
    };

    const fetchRisks = async () => {
        try {
            const res = await axiosInstance.get('/risks');
            setRisks(res.data.filter(r => r.project_id == id));
        } catch {
            toast.error('Failed to load risks');
        }
    };

    const handleEdit = () => setEditMode(true);
    const handleCancel = () => {
        setEditMode(false);
        setEditedProject(project);
    };

    const handleSave = async () => {
        try {
            const { name, description, status, duration_days, team_size, budget_lkr, scope_description } = editedProject;
            await axiosInstance.put(`/projects/${id}`, { name, description, status, duration_days, team_size, budget_lkr, scope_description });
            toast.success('Project updated');
            setEditMode(false);
            fetchProject();
        } catch {
            toast.error('Failed to update project');
        }
    };

    const handleChange = (e) => {
        setEditedProject({ ...editedProject, [e.target.name]: e.target.value });
    };

    const handleToggleRiskStatus = async (riskId, status) => {
        const newStatus = status === 'Open' ? 'Closed' : 'Open';
        await axiosInstance.put(`/risks/${riskId}`, { status: newStatus });
        fetchRisks();
    };

    const handleDeleteRisk = async (riskId) => {
        if (window.confirm('Delete this risk?')) {
            await axiosInstance.delete(`/risks/${riskId}`);
            fetchRisks();
        }
    };

    useEffect(() => {
        fetchProject();
        fetchRisks();
    }, [id]);

    if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
    if (!project) return <Typography>Project not found</Typography>;

    return (
        <Box>
            <Button onClick={() => navigate('/projects')} sx={{ mb: 2 }}>← Back to Projects</Button>
            <Typography variant="h4" gutterBottom display="flex" alignItems="center">
                <AssignmentIcon sx={{ mr: 1 }} /> Project Details
            </Typography>

            <Card sx={{ maxWidth: 900, padding: 3, boxShadow: 4, borderRadius: 3, position: 'relative' }}>
                <CardContent>

                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ScienceIcon />}
                        sx={{ position: 'absolute', top: 16, right: 16 }}
                        onClick={() => window.open(
                            `http://localhost:8501?projectId=${project.id}&projectName=${encodeURIComponent(project.name)}`,
                            '_blank'
                        )}
                    >
                        Analyze Risks
                    </Button>

                    <Typography variant="h6"><InfoIcon /> ID: {project.id}</Typography>
                    <Divider sx={{ my: 2 }} />

                    {['name', 'description', 'duration_days', 'team_size', 'budget_lkr', 'scope_description'].map(field => (
                        <Box mb={2} key={field}>
                            {editMode ? (
                                <TextField
                                    name={field}
                                    value={editedProject[field] || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline={field === 'description' || field === 'scope_description'}
                                    label={field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    type={['duration_days', 'team_size', 'budget_lkr'].includes(field) ? 'number' : 'text'}
                                />
                            ) : (
                                <Typography><strong>{field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {project[field]}</Typography>
                            )}
                        </Box>
                    ))}

                    <Box mb={2}>
                        {editMode ? (
                            <TextField
                                select
                                name="status"
                                value={editedProject.status}
                                onChange={handleChange}
                                fullWidth
                                label="Status"
                            >
                                {['Active', 'Planning', 'On Hold', 'Completed'].map(status => (
                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                ))}
                            </TextField>
                        ) : (
                            <Typography><strong>Status:</strong> <Chip label={project.status} /></Typography>
                        )}
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2">Created: {new Date(project.createdAt).toLocaleString()}</Typography>
                    <Typography variant="body2">Updated: {new Date(project.updatedAt).toLocaleString()}</Typography>

                    <Divider sx={{ my: 2 }} />

                    {editMode ? (
                        <Box display="flex" gap={2}>
                            <Button startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
                            <Button startIcon={<CloseIcon />} onClick={handleCancel}>Cancel</Button>
                        </Box>
                    ) : (
                        <Button startIcon={<EditIcon />} onClick={handleEdit}>Edit</Button>
                    )}

                </CardContent>
            </Card>

            {/* PM Summary Insights and Suggested Mitigations */}
            <Box mt={5} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
                <Card sx={{ flex: 1, backgroundColor: '#f9f9f9' }}>
                    <CardContent>
                        <Typography variant="h5">📌 PM Summary Insights</Typography>
                        <List dense>
                            <ListItem><ListItemIcon><WarningAmberIcon /></ListItemIcon><ListItemText primary="Risk level is High, with 49% confidence." /></ListItem>
                            <ListItem><ListItemIcon><InsightsIcon /></ListItemIcon><ListItemText primary="Budget limited for high-scope projects." /></ListItem>
                            <ListItem><ListItemIcon><SecurityIcon /></ListItemIcon><ListItemText primary="Scope includes sensitive data — plan compliance." /></ListItem>
                        </List>
                    </CardContent>
                </Card>

                <Card sx={{ flex: 1, backgroundColor: '#f9f9f9' }}>
                    <CardContent>
                        <Typography variant="h5">🛠 Suggested Mitigations</Typography>
                        <List dense>
                            <ListItem><ListItemIcon><WarningAmberIcon /></ListItemIcon><ListItemText primary="Review scope and resourcing." /></ListItem>
                            <ListItem><ListItemIcon><AttachMoneyIcon /></ListItemIcon><ListItemText primary="Consider increasing budget." /></ListItem>
                            <ListItem><ListItemIcon><SearchIcon /></ListItemIcon><ListItemText primary="Involve compliance/legal early." /></ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>

            {/* Risks */}
            <Box mt={5}>
                <Typography variant="h5">Linked Risks</Typography>
                {risks.length === 0 ? <Typography>No risks yet.</Typography> : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell><TableCell>Title</TableCell><TableCell>Category</TableCell><TableCell>Status</TableCell><TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {risks.map(r => (
                                <TableRow key={r.id}>
                                    <TableCell>{r.id}</TableCell>
                                    <TableCell>{r.title}</TableCell>
                                    <TableCell>{r.category}</TableCell>
                                    <TableCell><Chip label={r.status} /></TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleToggleRiskStatus(r.id, r.status)} size="small">Toggle Status</Button>
                                        <IconButton color="error" onClick={() => handleDeleteRisk(r.id)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Box>
        </Box>
    );
}

export default ProjectDetailsPage;
