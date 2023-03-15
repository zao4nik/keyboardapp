import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import ATYPES from '../../store/types';

export function Signup() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const isAuth = useSelector((state) => state.isAuth);
  console.log('isAuth: ', isAuth);

  // useEffect(() => {
  //   if (isAuth) navigate('/');
  // }, [isAuth]);

  const [userSignup, setUserSignup] = useState({ login: '', email: '', password: '' });
  const [errorSignup, setErrorSignup] = useState('');
  const [alertClass, setAlertClass] = useState('d-none');

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleChange = (event) => {
    setUserSignup({ ...userSignup, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/auth/signup ', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSignup),
      });

      console.log('response: ', response);
      if (response.status !== 200) {
        const data = await response.json();
        setErrorSignup(capitalize(data.errMsg));
        setAlertClass('alert alert-danger');
      } else {
        setAlertClass('alert alert-success');
        setErrorSignup("Well done! You're logged in!");
        dispatch({ type: ATYPES.SET_USER, payload: {} });
      }
      setUserSignup({ login: '', email: '', password: '' });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={formSubmitHandler}
      >
        <h1> Sign Up</h1>
        <div className="mb-3">
          <label
            className="form-label w-100"
            htmlFor="exampleInputUsername1"
          >
            <div
              id="loginText"
              className="form-text"
            >
              login
            </div>
            <input
              className="form-control w-100"
              id="exampleInputLogin1"
              type="text"
              name="login"
              value={userSignup.login}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label
            className="form-label w-100"
            htmlFor="exampleInputEmail1"
          >
            <div
              id="emailText"
              className="form-text"
            >
              Email address
            </div>
            <input
              className="form-control"
              id="exampleInputEmail1"
              type="email"
              name="email"
              aria-describedby="emailHelp"
              value={userSignup.email}
              onChange={handleChange}
            />
          </label>
          <div
            id="emailHelp"
            className="form-text"
          >
            We&apos;ll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label
            className="form-label w-100"
            htmlFor="exampleInputPassword1"
          >
            <div
              id="passwordText"
              className="form-text"
            >
              Password
            </div>

            <input
              className="form-control mb-3"
              id="exampleInputPassword1"
              type="password"
              name="password"
              value={userSignup.password}
              onChange={handleChange}
            />
          </label>
          <div className={alertClass} role="alert">
            {errorSignup}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
