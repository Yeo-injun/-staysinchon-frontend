import './Reservation.css'; // css 적용

import React, { useState } from 'react'
import { useHistory } from 'react-router'; // 특정경로로 이동시키기 위한 함수

import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Button, Cascader, Radio} from 'antd';

import axios from 'axios';


function ReservationCancel(props){
    let resId = props.res_ID;
    let [ content, setContent ] = useState('');

    function callCancelReservation(){
        axios.put(
              "http://localhost:8080/reservation/cancel"
            , { 
                  resId : resId
                , content : content
              }
            , { headers : { 
                            'Authorization': localStorage.getItem("authToken") 
                          }
              }
        ).then((response)=>{
            console.log(response);
            props.setIsModalVisible(false);
        })
    } // callCancelReservation()


    return(
        <div>
            <div><h3>Before Cancel, Check your Reservation Info. </h3></div>
            <div> Check In : {props.checkIn}</div>
            <div> Check Out : {props.checkOut}</div>

            <textarea 
                onChange={(e)=>{setContent(e.target.value)}}
                placeholder="Please let me know Why you cancel reservation?"/>
            
            <Button className="btnCancel" onClick={callCancelReservation}>
                Cancel Now!
            </Button>
        </div>
    )
}

export default ReservationCancel