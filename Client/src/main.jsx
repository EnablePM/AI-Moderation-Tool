import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App.jsx';
import theme from './theme.jsx';
import './index.css';
import { StackProvider } from '@stackframe/react';
import { stackClientApp } from './stack/client';

console.log('import.meta.env keys:', import.meta.env);
console.log('projectId:', import.meta.env.VITE_STACK_PROJECT_ID);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ✅ Only one provider at root */}
      <StackProvider app={stackClientApp}>
        <App />
      </StackProvider>
    </ThemeProvider>
  </StrictMode>
);
