import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
    Box, Typography, Button, Table, TableHead, TableRow,
    TableCell, TableBody, TextField, MenuItem, IconButton, CircularProgress, InputAdornment
} from '@mui/material';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

function RisksPage() {
    const [risks, setRisks] = useState([]);
    const [newRisk, setNewRisk] = useState({ title: '', category: '', status: 'Open' });
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchRisks = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/risks');
            setRisks(res.data);
        } catch (err) {
            console.error('Failed to load risks:', err);
            toast.error('Failed to load risks');
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setNewRisk({ ...newRisk, [e.target.name]: e.target.value });
    };

    const handleCreateRisk = async () => {
        if (!newRisk.title || !newRisk.category) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            await axiosInstance.post('/risks', newRisk);
            toast.success('Risk created');
            setNewRisk({ title: '', category: '', status: 'Open' });
            fetchRisks();
        } catch (err) {
            console.error('Failed to create risk:', err);
            toast.error('Failed to create risk');
        }
    };

    const handleToggleStatus = async (id, status) => {
        try {
            await axiosInstance.put(`/risks/${id}`, { status: status === 'Open' ? 'Closed' : 'Open' });
            toast.success('Risk status updated');
            fetchRisks();
        } catch (err) {
            console.error('Failed to update risk status:', err);
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this risk?')) return;

        try {
            await axiosInstance.delete(`/risks/${id}`);
            toast.success('Risk deleted');
            fetchRisks();
        } catch (err) {
            console.error('Failed to delete risk:', err);
            toast.error('Failed to delete risk');
        }
    };

    // ✅ Filter risks by search term
    const filteredRisks = risks.filter(risk =>
        risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        risk.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchRisks();
    }, []);

    return (
        <Box>
            <Typography variant="h4" mb={2}>Risks</Typography>

            {/* Search Bar */}
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

            {/* New Risk Form */}
            <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                <TextField
                    label="Title"
                    name="title"
                    value={newRisk.title}
                    onChange={handleChange}
                />
                <TextField
                    label="Category"
                    name="category"
                    value={newRisk.category}
                    onChange={handleChange}
                />
                <TextField
                    select
                    label="Status"
                    name="status"
                    value={newRisk.status}
                    onChange={handleChange}
                >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                </TextField>
                <Button variant="contained" onClick={handleCreateRisk}>
                    Create Risk
                </Button>
            </Box>

            {/* Loading or Table */}
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
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRisks.map((risk) => (
                            <TableRow key={risk.id}>
                                <TableCell>{risk.id}</TableCell>
                                <TableCell>{risk.title}</TableCell>
                                <TableCell>{risk.category}</TableCell>
                                <TableCell>{risk.status}</TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleToggleStatus(risk.id, risk.status)}
                                    >
                                        {risk.status === 'Open' ? 'Close' : 'Reopen'}
                                    </Button>
                                    <IconButton color="error" onClick={() => handleDelete(risk.id)}>
                                        <DeleteIcon />
                                    </IconButton>
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
