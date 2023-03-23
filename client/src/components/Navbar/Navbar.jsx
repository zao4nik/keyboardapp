/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ATYPES from '../../store/types';
import './Navbar.css';

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
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main>
      {isAuth ? (
        <div className="navbarContainer">
          <NavLink
            to="/"
            className="btnLink btn-dark"
          >
            Practice
          </NavLink>

          <NavLink
            to="/online_game_page"
            className="btnLink btn-dark"

          >
            Online Practice
          </NavLink>

          <NavLink
            to="/stats"
            className="btnLink btn-dark"
          >
            My Stats
          </NavLink>

          <NavLink
            to="/auth/signout"
            onClick={onSignOut}
            className="btnLink btn-dark"
          >
            Sign out
          </NavLink>
        </div>
      ) : (
        <div className="navbarContainer">
          <NavLink
            to="/"
            className="btnLink btn-dark"
          >
            Practice
          </NavLink>

          <NavLink
            to="/auth/signup"
            className="btnLink btn-dark"
          >
            Sign Up
          </NavLink>

          <NavLink
            to="/auth/signin"
            className="btnLink btn-dark"
          >
            Sign In
          </NavLink>

        </div>
      )}
    </main>
  );
}
