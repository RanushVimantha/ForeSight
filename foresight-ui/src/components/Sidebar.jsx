import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

function Sidebar({ open, toggleDrawer }) {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'New Risk', path: '/risks/new', icon: <AssignmentIcon /> },
    { text: 'Risk List', path: '/risks', icon: <ListIcon /> },
    { text: 'Profile', path: '/profile', icon: <PersonIcon /> },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box fontWeight="bold">ForeSight</Box>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
