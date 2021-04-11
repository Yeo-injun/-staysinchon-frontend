import React from 'react';
import '../../App.css';
import GlobalStyle from '../../globalStyles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AdminNavbar from '../../components/Navbar/AdminNavbar'
import User from './User'


function Adminpages() {
  return (
    <Router>
      <GlobalStyle />
      <AdminNavbar />
      <Switch>
        <Route exact path='/manage' component= {User} />
      </Switch>
    </Router>
  );
}

export default Adminpages;
