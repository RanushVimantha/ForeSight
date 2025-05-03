import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Professional blue
        },
        secondary: {
            main: '#9c27b0',
        },
        background: {
            default: '#f4f6f8',
            paper: '#ffffff'
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12, // modern rounded edges
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: '16px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', // soft shadow
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    marginBottom: 4,
                },
            },
        },
    },
});

export default theme;
