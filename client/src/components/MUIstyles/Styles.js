import { createTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fbeee0',
    },
  },
});

export const NavBarButtonsStyled = styled(Button)(() => ({
  width: 300,
  color: '#1c1c1c',
  underline: 'none',
}));
