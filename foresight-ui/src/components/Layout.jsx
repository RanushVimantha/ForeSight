import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Toolbar, Box } from "@mui/material";

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}
      >
        <Header />
        <Toolbar /> {/* To push content below the header */}
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
