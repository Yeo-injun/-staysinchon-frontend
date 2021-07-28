import React from 'react';
import '../App.css';
import GlobalStyle from '../globalStyles'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Navbar } from '../components';

import Home from '../pages/HomePage/Home';

// 예약을 위한 화면
import Reservation from '../pages/Reservation/Reservation'
import ReservationForm from '../pages/Reservation/ReservationForm'

// 로그인, 회원가입을 위한 화면
import Signup from '../components/Form/Signup';
import Register from '../components/Form/Register';

// 게스트의 예약 관리 화면
import MyPage from '../pages/Mypage/MyPage';

function UserPages() {
    return (
      <Router>
        <GlobalStyle />
        <Navbar />
        {/* 아래 컴포넌트 중에 하나만 실행되어야 할때는 Switch 태그로 감싸줘야 한다. */}
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route exact path='/reservation' component = {Reservation} />
          <Route exact path='/reservation/form' component = {ReservationForm} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/mypage" component = {MyPage} /> 
        </Switch>
      </Router>
    );
  }
  
  export default UserPages;