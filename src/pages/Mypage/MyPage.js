import axios from 'axios';
import React, { useState, useEffect } from 'react'

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
    
    return (
        <div>
            마이페이지여~!
            {myReservationList.map(
                (reservation) => {

                    return (
                        <>
                            {reservation.res_ID}
                        </>
                    
                )}
            )}
        </div>

    );
}

export default MyPage