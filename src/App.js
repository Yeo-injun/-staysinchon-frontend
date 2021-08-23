/* eslint-disable */

import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Adminpages from './pages/Adminpage/Adminpages'
import UserPages from './pages/UserPages'


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component = {UserPages} />
        <Route exact path='/manage' component= {Adminpages} />
      </Switch>
    </Router>
  );
}

// 다른 소스코드에서 App함수를 활용할 수 있도록 export.
export default App;