import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

function Header({ toggleDrawer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    handleClose();
  };

  // Get the username from token
  let username = 'User';
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwt_decode(token);
      username = decoded.username || decoded.email || 'User';
    } catch (err) {
      console.error('Invalid token');
    }
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#1976d2',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          ForeSight Risk Management
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            {username}
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
