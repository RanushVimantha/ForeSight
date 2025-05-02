import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const drawerWidth = 240;

function Layout() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginLeft: open ? `${drawerWidth}px` : '0px',
          transition: 'margin-left 0.3s',
          width: `calc(100% - ${open ? drawerWidth : 0}px)`,
        }}
      >
        <Toolbar /> {/* Push content below the AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
