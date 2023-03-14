import './App.css';
import React from 'react';
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
