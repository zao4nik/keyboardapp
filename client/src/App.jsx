import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import components
import {

  Typing, Signup, Signin, Navbar, Keyboard, MyStatistics, Add,
} from './components';
import { appTheme } from './components/MUIstyles/Styles';
import { GamePage, OnlineGamePage } from './screens';


import ATYPES from './store/types';
import PageNotFound from './components/Page404/Page404';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isAuth);
  // console.log('isAuth: ', isAuth);

  React.useEffect(() => {
    if (isAuth) {
      fetch('http://localhost:3001/auth/userinfo', {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((result) => dispatch({ type: ATYPES.SET_USER, payload: result }));
    }
  }, [isAuth]);

  return (
    <ThemeProvider theme={appTheme}>
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
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
