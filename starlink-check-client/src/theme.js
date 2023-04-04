// theme.js
import {createTheme} from '@mui/material/styles';

const theme = createTheme ({
  palette: {
    primary: {
      main: '#FAF9F7',
    },
    secondary: {
      main: '#DF3E49',
    },
    background: {
      default: '#2A6095',
    },
    text: {
      primary: '#FAF9F7',
    },
  },
  typography: {
    fontFamily: 'D-DIN, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          borderRadius: '5px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: '2px solid rgba(256,256,256,.25)',
        },
      },
    },
    MuiFormLabel:{
      styleOverrides:{
        root: {
          color: 'rgba(256,256,256,.25)'
        }
      }
    },
  },
  globals: {
    '@global': {
      '*': {
        textTransform: 'uppercase',
      },
    },
  },
});

export default theme;
