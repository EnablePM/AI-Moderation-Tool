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
      pill: '#ffffff',
    },
    navbar: {
      backgroundColor: '#121621',
      color: '#ffffff',
    },
    Coke: {
      main: '#FE001A',
      contrastText: '#fff',
    },
    pill: {
      danger: '#b80012ff',
      warning: '#d62222ff',
      alert: '#ffae00ff',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h5: { fontWeight: 500, fontSize: '1.3rem' },
    h6: { fontWeight: 400, fontSize: '1rem' },
    button: { textTransform: 'none', fontWeight: 500 },
    span: { fontWeight: 600 },
    span2: { fontWeight: 200 },
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
          borderRadius: 8,
          padding: '5px 20px',
          fontWeight: 500,
          fontSize: '0.9rem',
        },
        containedPrimary: {
          backgroundColor: '#be1818ff',
          '&:hover': { backgroundColor: '#911616ff' },
        },
        containedCoke: {
          backgroundColor: '#FE001A',
          '&:hover': { backgroundColor: '#d8061bff' },
        },
        outlinedPrimary: {
          borderColor: '#be1818ff',
          color: '#be1818ff',
          '&:hover': { 
            backgroundColor: '#be1818ff', 
            color: '#ffffff',
            borderColor: '#be1818ff'
          },
        },
        containedSecondary: {
          backgroundColor: '#000000ff',
          '&:hover': { backgroundColor: '#1d1d1dff' },
        },
        containedNavbar: {
          backgroundColor: '#ffffff',
          color: '#121621', 
          '&:hover': { backgroundColor: '#f5f5f5' },
        },
      },
    },
    MuiLinearProgress:{
      styleOverrides:{
        root:{
          height:8, 
          borderRadius:5,
          backgroundColor: '#8d8b8b11',
        },
        bar:{
          backgroundColor: '#be1818ff',
          borderRadius:5,
        }
      }
    },
    MuiCard:{
      styleOverrides:{
        root:{ 
          borderRadius:16,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
          '&:hover': { boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.15)' }
        }
      }
    }
  },
});

export default theme;
