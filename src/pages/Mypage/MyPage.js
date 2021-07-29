import '../common-component.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Button } from '../../globalStyles';

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
                            
                            <div>
                                {res.state} State 값에 따라서 상태 출력(예약신청 - 예약확정 - 예약취소 - 숙박중 - 숙박완료) 
                                State값에 따라 버튼 3개 만들기
                                위 사항들을 하나의 자식 컴포넌트로 만들어 주기 : res.State값을 props로 넘겨줌
                            </div>    

                        </div>

                )}
            )}
        </div>

    );
}

export default MyPage