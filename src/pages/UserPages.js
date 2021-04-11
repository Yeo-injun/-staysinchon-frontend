import React from 'react';
import '../App.css';
import GlobalStyle from '../globalStyles'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from '../pages/HomePage/Home';
import Reservation from '../pages/Reservation/Reservation'
import {Navbar} from '../components';
import Signup from '../components/Form/Signup';

function UserPages() {
    return (
      <Router>
        <GlobalStyle />
        <Navbar />
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route exact path='/reservation' component = {Reservation} />
          <Route exact path='/signup' component={Signup} />
      
        </Switch>
      </Router>
    );
  }
  
  export default UserPages;