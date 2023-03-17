/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from '@mui/material/styles';
import { navTheme, NavBarButtonsStyled, LinkStyled } from '../MUIstyles/Styles';
import ATYPES from '../../store/types';

export function Navbar() {
  const isAuth = useSelector((store) => store.isAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignOut = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/signout', {
        credentials: 'include',
      });
      // eslint-disable-next-line no-unused-vars
      const result = await response.json();
      dispatch({ type: ATYPES.SIGN_OUT_USER });
      navigate('/game_page');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ThemeProvider theme={navTheme}>
      <main>
        {isAuth ? (
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar variant="dense">

                <LinkStyled className="navLinks" to="/game_page">
                  <NavBarButtonsStyled variant="h6" color="inherit" component="div">
                    Practice
                  </NavBarButtonsStyled>
                </LinkStyled>
                <LinkStyled className="navLinks" to="/online_game_page">
                  <NavBarButtonsStyled variant="h6" color="inherit" component="div">
                    Online Practice
                  </NavBarButtonsStyled>
                </LinkStyled>

                <LinkStyled className="navLinks" to="/stats">
                  <NavBarButtonsStyled variant="h6" color="inherit" component="div">
                    My Stats
                  </NavBarButtonsStyled>
                </LinkStyled>

                <LinkStyled className="navLinks" to="/auth/signout">
                  <NavBarButtonsStyled onClick={onSignOut} variant="h6" color="inherit" component="div">
                    Sign Out
                  </NavBarButtonsStyled>
                </LinkStyled>

              </Toolbar>
            </AppBar>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar variant="dense">

                <LinkStyled className="navLinks" to="/game_page">
                  <NavBarButtonsStyled variant="h6" color="inherit" component="div">
                    Practice
                  </NavBarButtonsStyled>
                </LinkStyled>

                <LinkStyled className="navLinks" to="/auth/signup">
                  <NavBarButtonsStyled variant="h6" color="inherit" component="div">
                    Sign Up
                  </NavBarButtonsStyled>
                </LinkStyled>

                <LinkStyled className="navLinks" to="/auth/signin">
                  <NavBarButtonsStyled variant="h6" color="inherit" component="div">
                    Sign In
                  </NavBarButtonsStyled>
                </LinkStyled>

              </Toolbar>
            </AppBar>
          </Box>
        )}
      </main>
    </ThemeProvider>
  );
}
