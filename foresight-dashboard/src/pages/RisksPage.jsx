import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
    Box, Typography, Button, Table, TableHead, TableRow,
    TableCell, TableBody, TextField, MenuItem, IconButton, CircularProgress, InputAdornment
} from '@mui/material';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

function RisksPage() {
    const [risks, setRisks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [newRisk, setNewRisk] = useState({
        title: '', category: '', probability: 3, impact: 3, status: 'Open', project_id: ''
    });
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [editRiskId, setEditRiskId] = useState(null);
    const [editRiskData, setEditRiskData] = useState({});

    // Fetch all risks
    const fetchRisks = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/risks');
            setRisks(res.data);
        } catch {
            toast.error('Failed to load risks');
        }
        setLoading(false);
    };

    // Fetch all projects
    const fetchProjects = async () => {
        try {
            const res = await axiosInstance.get('/projects');
            setProjects(res.data);
        } catch {
            toast.error('Failed to load projects');
        }
    };

    const handleChange = (e) => {
        setNewRisk({ ...newRisk, [e.target.name]: e.target.value });
    };

    const handleCreateRisk = async () => {
        if (!newRisk.title || !newRisk.category || !newRisk.project_id) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            await axiosInstance.post('/risks', {
                ...newRisk,
                probability: parseInt(newRisk.probability),
                impact: parseInt(newRisk.impact)
            });
            toast.success('Risk created');
            setNewRisk({
                title: '', category: '', probability: 3, impact: 3, status: 'Open', project_id: ''
            });
            fetchRisks();
        } catch {
            toast.error('Failed to create risk');
        }
    };

    const handleToggleStatus = async (id, status) => {
        try {
            await axiosInstance.put(`/risks/${id}`, {
                status: status === 'Open' ? 'Closed' : 'Open'
            });
            fetchRisks();
        } catch {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this risk?')) return;

        try {
            await axiosInstance.delete(`/risks/${id}`);
            fetchRisks();
        } catch {
            toast.error('Failed to delete risk');
        }
    };

    const startEditing = (risk) => {
        setEditRiskId(risk.id);
        setEditRiskData({ ...risk });
    };

    const cancelEditing = () => {
        setEditRiskId(null);
        setEditRiskData({});
    };

    const handleEditChange = (e) => {
        setEditRiskData({ ...editRiskData, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = async () => {
        try {
            await axiosInstance.put(`/risks/${editRiskId}`, {
                ...editRiskData,
                probability: parseInt(editRiskData.probability),
                impact: parseInt(editRiskData.impact)
            });
            toast.success('Risk updated');
            cancelEditing();
            fetchRisks();
        } catch {
            toast.error('Failed to update risk');
        }
    };

    const filteredRisks = risks.filter(risk =>
        risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        risk.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchRisks();
        fetchProjects();
    }, []);

    return (
        <Box>
            <Typography variant="h4" mb={2}>Risks</Typography>

            {/* Search */}
            <TextField
                placeholder="Search by title or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Create new risk form */}
            <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                <TextField label="Title" name="title" value={newRisk.title} onChange={handleChange} />
                <TextField label="Category" name="category" value={newRisk.category} onChange={handleChange} />
                <TextField select label="Probability" name="probability" value={newRisk.probability} onChange={handleChange}>
                    {[1, 2, 3, 4, 5].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                </TextField>
                <TextField select label="Impact" name="impact" value={newRisk.impact} onChange={handleChange}>
                    {[1, 2, 3, 4, 5].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                </TextField>
                <TextField select label="Status" name="status" value={newRisk.status} onChange={handleChange}>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                    <MenuItem value="Monitoring">Monitoring</MenuItem>
                </TextField>
                <TextField select label="Assign to Project" name="project_id" value={newRisk.project_id} onChange={handleChange}>
                    {projects.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                </TextField>
                <Button variant="contained" onClick={handleCreateRisk}>Create Risk</Button>
            </Box>

            {/* Risks Table */}
            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Project</TableCell>
                            <TableCell>Probability</TableCell>
                            <TableCell>Impact</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRisks.map((risk) => (
                            <TableRow key={risk.id}>
                                <TableCell>{risk.id}</TableCell>
                                <TableCell>
                                    {editRiskId === risk.id ? (
                                        <TextField name="title" value={editRiskData.title} onChange={handleEditChange} size="small" />
                                    ) : risk.title}
                                </TableCell>
                                <TableCell>
                                    {editRiskId === risk.id ? (
                                        <TextField name="category" value={editRiskData.category} onChange={handleEditChange} size="small" />
                                    ) : risk.category}
                                </TableCell>
                                <TableCell>{risk.project_id || '—'}</TableCell>
                                <TableCell>
                                    {editRiskId === risk.id ? (
                                        <TextField select name="probability" value={editRiskData.probability} onChange={handleEditChange} size="small">
                                            {[1, 2, 3, 4, 5].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                                        </TextField>
                                    ) : risk.probability}
                                </TableCell>
                                <TableCell>
                                    {editRiskId === risk.id ? (
                                        <TextField select name="impact" value={editRiskData.impact} onChange={handleEditChange} size="small">
                                            {[1, 2, 3, 4, 5].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                                        </TextField>
                                    ) : risk.impact}
                                </TableCell>
                                <TableCell>
                                    {editRiskId === risk.id ? (
                                        <TextField select name="status" value={editRiskData.status} onChange={handleEditChange} size="small">
                                            <MenuItem value="Open">Open</MenuItem>
                                            <MenuItem value="Closed">Closed</MenuItem>
                                            <MenuItem value="Monitoring">Monitoring</MenuItem>
                                        </TextField>
                                    ) : risk.status}
                                </TableCell>
                                <TableCell>
                                    {editRiskId === risk.id ? (
                                        <>
                                            <IconButton onClick={handleSaveEdit}><SaveIcon /></IconButton>
                                            <IconButton onClick={cancelEditing}><CloseIcon /></IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton onClick={() => startEditing(risk)}><EditIcon /></IconButton>
                                            <Button size="small" variant="outlined" onClick={() => handleToggleStatus(risk.id, risk.status)}>
                                                {risk.status === 'Open' ? 'Close' : 'Reopen'}
                                            </Button>
                                            <IconButton color="error" onClick={() => handleDelete(risk.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
}

export default RisksPage;
