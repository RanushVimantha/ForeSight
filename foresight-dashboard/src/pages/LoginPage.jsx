import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';  // Use the same axiosInstance everywhere
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axiosInstance.post('/auth/login', {
                email,
                password
            });

            const token = res.data.token;
            console.log('Received JWT Token:', token);

            // // ✅ Save JWT token and user info
            localStorage.setItem('token', token);
            localStorage.setItem('userId', res.data.user.id);

            toast.success('Login successful');
            

            // Redirect after login
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Box width={300}>
                <Typography variant="h5" mb={2}>Login</Typography>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" fullWidth onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </Box>
    );
}

export default LoginPage;
