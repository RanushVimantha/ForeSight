import React from 'react';
import {
    Drawer, List, ListItemButton, ListItemIcon,
    ListItemText, Box, Toolbar, Typography, Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const AppDrawer = ({ mobileOpen, handleDrawerToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const navItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, route: '/' },
        { text: 'Projects', icon: <AssessmentIcon />, route: '/projects' },
        { text: 'Risk List', icon: <WarningIcon />, route: '/risks' },
        { text: 'Users', icon: <PeopleIcon />, route: '/users' }, 
        { text: 'Settings', icon: <SettingsIcon />, route: '/settings' },
    ];

    const drawerContent = (
        <Box>
            <Toolbar sx={{ mb: 2, px: 2 }}>
                <Typography variant="h6" noWrap>
                    ForeSight
                </Typography>
            </Toolbar>
            <Divider />
            <Box sx={{ px: 2, pt: 2 }}>
                <List>
                    {navItems.map((item) => (
                        <ListItemButton
                            key={item.text}
                            selected={location.pathname === item.route}
                            onClick={() => navigate(item.route)}
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                color:
                                    location.pathname === item.route
                                        ? theme.palette.primary.main
                                        : theme.palette.text.primary,
                                backgroundColor:
                                    location.pathname === item.route
                                        ? theme.palette.mode === 'dark'
                                            ? 'rgba(90, 150, 240, 0.2)'
                                            : 'rgba(25, 118, 210, 0.1)'
                                        : 'transparent',
                                '&:hover': {
                                    backgroundColor:
                                        theme.palette.mode === 'dark'
                                            ? 'rgba(90, 150, 240, 0.1)'
                                            : 'rgba(25, 118, 210, 0.08)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        borderRight: '1px solid',
                        borderColor: theme.palette.divider,
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default AppDrawer;
