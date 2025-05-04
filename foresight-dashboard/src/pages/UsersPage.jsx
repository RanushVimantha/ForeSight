import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
    Box, Typography, Button, Table, TableHead, TableRow,
    TableCell, TableBody, TextField, MenuItem, IconButton, CircularProgress, InputAdornment
} from '@mui/material';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'User' });
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const currentUserId = localStorage.getItem('userId');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/users');
            setUsers(res.data);
            setFilteredUsers(res.data);  // Initialize filtered list
        } catch (err) {
            console.error('Failed to load users:', err);
            toast.error('Failed to load users');
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleCreateUser = async () => {
        if (!newUser.username || !newUser.email || !newUser.password) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            await axiosInstance.post('/users', newUser);
            toast.success('User created');
            setNewUser({ username: '', email: '', password: '', role: 'User' });
            fetchUsers();
        } catch (err) {
            console.error('Failed to create user:', err);
            toast.error(err.response?.data?.message || 'Failed to create user');
        }
    };

    const handleToggleStatus = async (id, status) => {
        try {
            await axiosInstance.put(`/users/${id}`, { status: status === 'Active' ? 'Inactive' : 'Active' });
            toast.success('User status updated');
            fetchUsers();
        } catch (err) {
            console.error('Failed to update status:', err);
            toast.error('Failed to update user status');
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            await axiosInstance.put(`/users/${id}`, { role: newRole });
            toast.success('Role updated');
            fetchUsers();
        } catch (err) {
            console.error('Failed to update role:', err);
            toast.error('Failed to update user role');
        }
    };

    const handleDelete = async (id) => {
        if (id.toString() === currentUserId) {
            toast.error("You can't delete yourself!");
            return;
        }

        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await axiosInstance.delete(`/users/${id}`);
            toast.success('User deleted');
            fetchUsers();
        } catch (err) {
            console.error('Failed to delete user:', err);
            toast.error('Failed to delete user');
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        const lowerTerm = term.toLowerCase();
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(lowerTerm) ||
            user.email.toLowerCase().includes(lowerTerm)
        );
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Box>
            <Typography variant="h4" mb={2}>Users</Typography>

            {/* Search Bar */}
            <TextField
                placeholder="Search by username or email"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
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

            {/* New User Form */}
            <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                <TextField
                    label="Username"
                    name="username"
                    value={newUser.username}
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={newUser.password}
                    onChange={handleChange}
                />
                <TextField
                    select
                    label="Role"
                    name="role"
                    value={newUser.role}
                    onChange={handleChange}
                >
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
                <Button variant="contained" onClick={handleCreateUser}>
                    Create User
                </Button>
            </Box>

            {/* Loading Spinner */}
            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <TextField
                                        select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        size="small"
                                    >
                                        <MenuItem value="User">User</MenuItem>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                    </TextField>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleToggleStatus(user.id, user.status)}
                                    >
                                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(user.id)}
                                        disabled={user.id.toString() === currentUserId}
                                    >
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

export default UsersPage;
