import logo from './logo.svg';
import './App.css';
import User from './User'
import axios from 'axios'
import React,{useState} from 'react'

function App() {
  return (
    <div className="App">
      <div>
        <User />
      </div>
    </div>
  );
}

export default App;
