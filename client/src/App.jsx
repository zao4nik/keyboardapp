import './App.css';
import React from 'react';
// import Signup from './components/Signup/Signup';
// import Signin from './components/Signin/Signin';
import { Routes, Route } from 'react-router-dom';

//import components
import {Typing} from './components'

function App() {
  return (
    <div className="App">
      <div>Hello</div>
      <Typing></Typing>
    </div>
  );
}

export default App;
