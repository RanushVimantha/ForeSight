import React, { useContext, useState } from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, Avatar,
    Box, Menu, MenuItem, InputBase, alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '@theme/ColorModeContext';
import { useNavigate } from 'react-router-dom';   // ✅ Add this import

const AppHeader = ({ handleDrawerToggle }) => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();   // ✅ Hook to redirect

    const [anchorEl, setAnchorEl] = useState(null);

    const SearchBar = () => (
        <Box
            sx={{
                position: 'relative',
                borderRadius: 1,
                backgroundColor: alpha(theme.palette.common.black, 0.05),
                '&:hover': { backgroundColor: alpha(theme.palette.common.black, 0.1) },
                marginRight: 2,
                width: { xs: '100%', sm: 250 },
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                pl: 1,
                pr: 1,
            }}
        >
            <SearchIcon />
            <InputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                sx={{ ml: 1, flex: 1 }}
            />
        </Box>
    );

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderBottom: '1px solid',
                borderColor: theme.palette.divider,
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* LEFT SIDE */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        ForeSight AI Risk Dashboard
                    </Typography>
                </Box>

                {/* RIGHT SIDE */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SearchBar />

                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>

                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
                        <Avatar>U</Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>  {/* ✅ Updated */}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;
