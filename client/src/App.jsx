import './App.css';
import * as React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import GlobalStyles from './components/Global.styles';

// import components
import {
  Typing, Signup, Signin, MyStatistics,
} from './components';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyles />
        {/* <Navbar /> */}
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/typing" element={<Typing />} />
          <Route path="/stats" element={<MyStatistics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
