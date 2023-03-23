import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import components
import {

  Typing, Signup, Signin, Navbar, Keyboard, MyStatistics, Add,
} from './components';

import { GamePage, OnlineGamePage } from './screens';

import ATYPES from './store/types';
import PageNotFound from './components/Page404/Page404';

function App() {
  const dispatch = useDispatch();
  // console.log('isAuth: ', isAuth);

  React.useEffect(() => {
    fetch('http://localhost:3001/auth/userinfo', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => dispatch({ type: ATYPES.SET_USER, payload: result }));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signout" />
          <Route path="/typing" element={<Typing />} />
          <Route path="/keyboard" element={<Keyboard />} />
          <Route path="/game_page" element={<GamePage />} />
          <Route path="/game_add" element={<Add />} />
          <Route path="/online_game_page" element={<OnlineGamePage />} />
          <Route path="/stats" element={<MyStatistics />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
