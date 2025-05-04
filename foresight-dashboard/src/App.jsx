import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AppHeader from './components/layout/AppHeader';
import AppDrawer from './components/layout/AppDrawer';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import RisksPage from './pages/RisksPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

function AppContent() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const token = localStorage.getItem('token');

    // 👇 Use location.pathname instead of window.location.pathname
    const isLoginPage = location.pathname === '/login';

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Show AppBar and Drawer only if logged in and not on login page */}
            {token && !isLoginPage && (
                <>
                    <AppHeader handleDrawerToggle={handleDrawerToggle} />
                    <AppDrawer
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                    />
                </>
            )}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: token && !isLoginPage ? { sm: `${drawerWidth}px` } : 0
                }}
            >
                {!isLoginPage && <Toolbar />}
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/projects"
                        element={
                            <PrivateRoute>
                                <ProjectsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/projects/:id"
                        element={
                            <PrivateRoute>
                                <ProjectDetailsPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/risks"
                        element={
                            <PrivateRoute>
                                <RisksPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute>
                                <UsersPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute>
                                <SettingsPage />
                            </PrivateRoute>
                        }
                    />

                </Routes>
            </Box>
            <ToastContainer position="top-right" />
        </Box>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
