import React from 'react';
import '../App.css';
import GlobalStyle from '../globalStyles'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from '../pages/HomePage/Home';
import Reservation from '../pages/Reservation/Reservation'
import ReservationForm from '../pages/Reservation/ReservationForm'
import { Navbar } from '../components';
import Signup from '../components/Form/Signup';
import Register from '../components/Form/Register';

function UserPages() {
    return (
      <Router>
        <GlobalStyle />
        <Navbar />
        {/* 아래 컴포넌트 중에 하나만 실행되어야 할때는 Switch 태그로 감싸줘야 한다. */}
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route exact path='/reservation' component = {Reservation} />
          <Route exact path='/reservation/form/:check_in/:check_out/:room_ID' component = {ReservationForm} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path="/register" component={Register} /> 
        </Switch>
      </Router>
    );
  }
  
  export default UserPages;