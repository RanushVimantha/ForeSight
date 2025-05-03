import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from '@components/layout/AppHeader';
import AppDrawer from '@components/layout/AppDrawer';
import DashboardPage from '@pages/DashboardPage';
import ProjectsPage from '@pages/ProjectsPage';
import RisksPage from '@pages/RisksPage';

const drawerWidth = 240; // Must match AppDrawer.jsx

function App() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                {/* App Bar */}
                <AppHeader handleDrawerToggle={handleDrawerToggle} />

                {/* Drawer */}
                <AppDrawer
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                />

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        ml: { sm: `${drawerWidth}px` } // Push content right on desktop
                    }}
                >
                    <Toolbar /> {/* This ensures content is below the AppBar */}
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/risks" element={<RisksPage />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
