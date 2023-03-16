import './App.css';
import * as React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import components
import {
  Typing, Signup, Signin, Navbar, Keyboard, MyStatistics
} from './components';
import { GamePage } from './screens';
import ATYPES from './store/types';

function App() {
  const dispatch = useDispatch();
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
          <Route path="/auth/signout" element={<Signin />} />
          <Route path="/typing" element={<Typing />} />
          <Route path="/keyboard" element={<Keyboard />} />
          <Route path="/game_page" element={<GamePage />} />
          <Route path="/stats" element={<MyStatistics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
