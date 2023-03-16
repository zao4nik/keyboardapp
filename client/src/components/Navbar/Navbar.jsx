/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ATYPES from '../../store/types';
import './Navbar.styles.css';

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

  const routePractice = () => {
    const path = '/game_page';
    navigate(path);
  };

  const routeMyStats = () => {
    const path = '/stats';
    navigate(path);
  };

  const routeSignin = () => {
    const path = '/auth/signin';
    navigate(path);
  };

  const routeSignup = () => {
    const path = '/auth/signup';
    navigate(path);
  };

  const routeAdd = () => {
    const path = '/game_add';
    navigate(path);
  };

  return (
    <main>
      {isAuth ? (
        <div className="navbarContainer">
          <button
            onClick={routePractice}
            type="submit"
            className="btn btn-dark"
          >
            Practice
          </button>

          <button
            onClick={routeMyStats}
            type="submit"
            className="btn btn-dark"
          >
            My Stats
          </button>

          <button
            onClick={routeAdd}
            type="submit"
            className="btn btn-dark"
          >
            Add Text
          </button>

          <button
            onClick={onSignOut}
            type="submit"
            className="btn btn-dark"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="navbarContainer">
          <button
            onClick={routePractice}
            type="submit"
            className="btn btn-dark"
          >
            Practice
          </button>

          <button
            onClick={routeSignup}
            type="submit"
            className="btn btn-dark"
          >
            Sign Up
          </button>

          <button
            onClick={routeSignin}
            type="submit"
            className="btn btn-dark"
          >
            Sign In
          </button>

        </div>
      )}
    </main>
  );
}
