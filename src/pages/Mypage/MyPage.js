import axios from 'axios';
import React, { useState, useEffect } from 'react'

function MyPage() {
    /************** useState *******************/ 
    let [ data, setData ] = useState(''); // 임시용
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
        .then(function(response) {
            setData(response.data);
            console.log(data);
        })
    }
    return (
        <div>
            마이페이지여~!
            {/* {data.map(
                (obj) => {

                    return (
                        <>
                            {obj}
                        </>
                    
                )}
            )} */}
        </div>

    );
}

export default MyPage