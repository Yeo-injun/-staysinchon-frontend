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


// import {useEffect, useState} from "react";
// import {ApiGet, bsApi} from "./Api";

// const App = () => {

//     const [data, setData] = useState();

//     const getRoomList = async () => {

//         const resultData = await bsApi.get('/roomlist');
//         setData(resultData.data);
//         console.log(resultData.data,'????');
//     }

//     useEffect(() => {
//         getRoomList();
//     }, [])


//     return (
//         <>
//             <div>
//                 {data.map((value,index) => {
//                     return <>
//                         <div>{index + 1}번째 데이터</div>
//                         <div>bathroom :{value.bathroom}</div>
//                         <div>bed :{value.bed}</div>
//                         <div>price_day :{value.price_day}</div>
//                         <div>price_month :{value.price_month}</div>
//                         <div>room_ID :{value.room_ID}</div>
//                         <div>room_img :{value.room_img}</div>
//                         <div>room_type :{value.room_type}</div>
//                         <br/>
//                         <br/>
//                     </>
//                 })}
//             </div>
//         </>
//     );
// }

// export default App;
