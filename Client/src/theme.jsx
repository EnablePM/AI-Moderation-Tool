import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#222222',
      light: '#ff6363ff',
      dark: '#a00000ff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0', 
      contrastText: '#fff',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#5f6368',
    },
    navbar: {
      backgroundColor: '#121621',
      color: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h5: { fontWeight: 600 },
    h6: { fontWeight: 400, fontSize: '1rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          padding: '8px 20px',
        },
        containedPrimary: {
          backgroundColor: '#931111ff',
          '&:hover': { backgroundColor: '#741010ff' },
        },
        containedNavbar: {
          backgroundColor: '#ffffff',
          color: '#121621', 
          '&:hover': { backgroundColor: '#f5f5f5' },
        },
      },
    },
  },
});

export default theme;
