import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Card, CardContent, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axiosInstance.post('/auth/login', { email, password });

            const token = res.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', res.data.user.id);

            toast.success('Login successful');
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{
                background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
                padding: 2
            }}
        >
            <Card
                sx={{
                    width: 400,
                    borderRadius: 4,
                    boxShadow: 10,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    padding: 3
                }}
            >
                <CardContent>

                    {/* Logo / Icon */}
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                    </Box>

                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                        ForeSight
                    </Typography>

                    <Typography variant="subtitle1" align="center" mb={3} color="text.secondary">
                        Please login to continue
                    </Typography>

                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            marginTop: 2,
                            paddingY: 1.5,
                            fontWeight: 'bold',
                            backgroundColor: '#1976d2',
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: '#115293'
                            }
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                    <Typography variant="body2" align="center" color="text.secondary" mt={3}>
                        © 2025 ForeSight | All rights reserved.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default LoginPage;
