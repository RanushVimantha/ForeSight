import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, TextField, Button, Divider
} from '@mui/material';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

function SettingsPage() {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        role: ''
    });

    // Fetch profile details (based on logged-in user)
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get('/users/me');
                setProfile({
                    username: res.data.username,
                    email: res.data.email,
                    role: res.data.role
                });
            } catch (err) {
                console.error('Failed to load profile:', err);
                toast.error('Failed to load profile');
            }
        };

        fetchProfile();
    }, []);

    return (
        <Box>
            <Typography variant="h4" mb={3}>Settings</Typography>
            <Paper sx={{ p: 3, maxWidth: 600 }}>
                <Typography variant="h6" gutterBottom>Profile Information</Typography>

                <TextField
                    label="Username"
                    value={profile.username}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                />

                <TextField
                    label="Email"
                    value={profile.email}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                />

                <TextField
                    label="Role"
                    value={profile.role}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="textSecondary">
                    More settings coming soon...
                </Typography>
            </Paper>
        </Box>
    );
}

export default SettingsPage;
