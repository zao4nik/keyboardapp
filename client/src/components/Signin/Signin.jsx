/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ATYPES from '../../store/types';
import './Signin.css';

export function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.isAuth);

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth]);

  const [userSignin, setUserSignin] = useState({ email: '', password: '' });
  const [errorSignin, setErrorSignin] = useState('');
  const [alertClass, setAlertClass] = useState('d-none');

  const handleChange = (event) => {
    setUserSignin({ ...userSignin, [event.target.name]: event.target.value });
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://keyboarder.onrender.com/auth/signin ', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSignin),
      });
      if (response.status !== 200) {
        const data = await response.json();
        setErrorSignin(capitalize(data.errMsg));
        setAlertClass('alert alert-danger');
      } else {
        const data = await response.json();
        const { userId, login, email } = data;
        setAlertClass('alert alert-success');
        setErrorSignin("Well done! You're logged in!");
        dispatch({ type: ATYPES.SET_USER, payload: { userId, login, email } });
      }
      setUserSignin({ email: '', password: '' });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className="signinContainer">
      <form
        onSubmit={formSubmitHandler}
      >
        <h1> Sign In</h1>
        <div className="mb-3">
          <label
            className="form-label w-100"
            htmlFor="exampleInputEmail1"
          >
            <div
              className="form-text"
              id="usernameText"
            >
              Email address
            </div>
            <input
              placeholder="Email..."
              className="form-control"
              id="exampleInputEmail1"
              type="email"
              name="email"
              value={userSignin.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label
            className="form-label w-100"
            htmlFor="exampleInputPassword1"
          >
            <div
              id="usernameText"
              className="form-text"
            >
              Password
            </div>
            <input
              placeholder="Password..."
              className="form-control"
              id="exampleInputPassword1"
              type="password"
              name="password"
              value={userSignin.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={alertClass} role="alert">
          {errorSignin}
        </div>
        <button
          type="submit"
          className="btn btn-dark signinButton"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
