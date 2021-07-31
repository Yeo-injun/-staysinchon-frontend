import '../common-component.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Button } from '../../globalStyles';

import ReservationState from '../Reservation/ReservationState';

function MyPage() {
    /************** useState *******************/ 
    // .map() 메소드는 Arrays형태만 사용가능
    // 그렇기 때문에 .map()을 통해 화면에 데이터를 뿌려주기 위해서는
    // useState의 초기값을 배열로 선언해주어야 오류가 안뜸
    // 왜냐하면 react는 HTML 요소들이 return되고, useEffect가 실행되기 때문에.
    // 즉, HTML요소들이 먼저 출력되고 axios통신으로 데이터를 받아온다.
    let [ myReservationList , setMyReservationList ] = useState([]); 
    /************** useState [끝] *******************/ 

    
    /************** useEffect ************************/ 
    useEffect(()=> {
        getMyReservationList();
    }, []);
    /************** useEffect [끝] *******************/ 

    // 사용자별 예약이력 데이터 가져오기    
    function getMyReservationList() {
        axios.get(
            "http://localhost:8080/reservations"
            , { headers : { 
                'Authorization': localStorage.getItem("authToken") 
              }
        })
        .then((response) => {
            let myData = response.data;
            setMyReservationList(myData);
        })
        .catch(()=>{ '요청실패시실행할코드' })
    }

    function dateFormater(date) {
        let dateFormat = new Date(date);
        let yyyy = dateFormat.getFullYear();
        let mm = dateFormat.getMonth();
        let dd = dateFormat.getDate();

        let result = yyyy+'-'+mm+'-'+dd;
        return result;

    }

    // 예약 상태 반환 함수 (예약신청 : 1 / 예약확정 : 2 - / 예약취소 : 3)

    return (
        <div className="contents">
            <h2>My Profile</h2>

            <h3>-----------------------------</h3>
            <h2>My Reservations</h2>
            your total reservation : {myReservationList.length}

            {myReservationList.map(
                (res) => {
                    /* 예약이력 목록*/
                    return (
                        <div className="item">
                            Image -- 사진 추가하기...!
                            <div>{res.res_date}</div>
                            <div> Reservation ID : {res.res_ID} </div>
                            <div> Room Name : {res.room_ID} Room Name으로 바꾸기</div> 
                            <div> Check in : {dateFormater(res.check_in)} </div> 
                            <div> Check out : {dateFormater(res.check_out)} </div>
                            <div> Guests : {res.num_of_guests} </div>
                            <div> Purpose for stay : {res.stay_purpose} </div>
                            <div> Message : {res.message} </div>
                            <div> Payment : {res.payment} </div>
                         
                            <ReservationState state={res.state}/>
                        </div>

                )}
            )}
        </div>

    );
}

export default MyPage