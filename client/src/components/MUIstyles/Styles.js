import { createTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const appTheme = createTheme({
  typography: {
    fontFamily: '"Courier New", Courier, monospace',
    fontWeight: 'bold',
  },
});

export const navTheme = createTheme({
  palette: {
    primary: {
      main: '#fbeee0',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
  },
});

export const NavBarButtonsStyled = styled(Button)(() => ({
  width: 300,
  color: '#1c1c1c',
}));

export const LinkStyled = styled(Link)(() => ({
  textDecoration: 'none',
}));
