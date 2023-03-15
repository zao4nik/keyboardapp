/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ATYPES from '../../store/types';

export function Navbar() {
  const isAuth = useSelector((store) => store.isAuth);
  console.log('isAuth-->', isAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignOut = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/signout', {
        credentials: 'include',
      });
      console.log('--heheheh-->');
      // eslint-disable-next-line no-unused-vars
      const result = await response.json();
      console.log('--response.json-->', response.json());
      dispatch({ type: ATYPES.SIGN_OUT_USER });
      navigate('/');
    } catch (error) {
      // console.log('--heheheh-->');
      console.log(error.message);
    }
  };

  return (
    <main>
      {isAuth ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense">

              <Link className="navLinks" to="/">
                <Button variant="h6" color="inherit" component="div">
                  Home
                </Button>
              </Link>

              <Link className="navLinks" to="/auth/signout">
                <Button onClick={onSignOut} variant="h6" color="inherit" component="div">
                  Sign Out
                </Button>
              </Link>

            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense">

              <Link className="navLinks" to="/">
                <Button variant="h6" color="inherit" component="div">
                  Home
                </Button>
              </Link>

              <Link className="navLinks" to="/auth/signup">
                <Button variant="h6" color="inherit" component="div">
                  Sign Up
                </Button>
              </Link>

              <Link className="navLinks" to="/auth/signin">
                <Button variant="h6" color="inherit" component="div">
                  Sign In
                </Button>
              </Link>

            </Toolbar>
          </AppBar>
        </Box>
      )}
    </main>
  );
}
