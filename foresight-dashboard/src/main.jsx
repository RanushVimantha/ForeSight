import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CustomThemeProvider } from '@theme/ColorModeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <CustomThemeProvider>
        <App />
    </CustomThemeProvider>
);
