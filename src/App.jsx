
import React from 'react';
import Home from './pages/home';
import Habits from './pages/habits';
import Tasks from './pages/tasks';
import Finances from './pages/finances';
import TopActBar from './comps/top-bar'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"

import "../src/css/App.css"


function App() {
  return (
    <>
      <div className="App">
        <TopActBar/>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={ <Home/> }/>
            <Route path="/habits" element={ <Habits/> } />
            <Route path="/tasks" element={ <Tasks/> } />
            <Route path="/finances" element={ <Finances /> } />
          </Routes>
          
          
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
