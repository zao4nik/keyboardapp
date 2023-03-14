import './App.css';
import React from 'react';
// import { Routes, Route } from 'react-router-dom';

//import components
import {Typing, Signup, Signin} from './components'

function App() {
  return (
    <div className="App">
      <div>Hello</div>
      <Typing></Typing>
      <Signin />
      <Signup />
    </div>
  );
}

export default App;
