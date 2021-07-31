/* eslint-disable */
import './Reservation.css';

import React, {useState, useEffect, useRef} from 'react';

import axios from 'axios';

import { Button } from '../../globalStyles';

function ReservationState(props) {
    
    const apply = useRef('apply');
    const confirm = useRef('confirm');
    const cancel = useRef('cancel');
    const stayStart = useRef('stayStart');
    const stayEnd = useRef('stayEnd');

    useState(()=>{
        checkState(props.state, props.checkIn, props.checkOut);
    });

    // 예약 상태 반환 함수 (예약신청 : 1 / 예약확정 : 2 - / 예약취소 : 3)
    function checkState(state, checkIn, checkOut) {
        if(state == 1) {
            apply.current    
        }    
        
        console.log(state);
        console.log(apply);
    }

    return (
        <div>
            <button className="stateItem" ref={apply}>예약신청</button>
            <button className="stateItem" ref={confirm}>예약확정</button>
            <button className="stateItem" ref={cancel}>예약취소</button>
            <button className="stateItem" ref={stayStart}>숙박중</button>
            <button className="stateItem" ref={stayEnd}>숙박완료</button>
            
            예약버튼 
            예약상태 : {props.state} 
            
            State 값에 따라서 상태 출력(예약신청 - 예약확정 - 예약취소 - 숙박중 - 숙박완료) 
            예약신청 : state값 1
            예약취소 : state값 3
            예약확정 : state값 2 + checkIn 날짜 전
            숙박중 : state값 2 + checkIn 날짜 이후 + checkOut 날짜 전
            숙박완료 : state값 2 + checkOut 날짜 이후
            
            State값에 따라 버튼 3개 만들기
            위 사항들을 하나의 자식 컴포넌트로 만들어 주기 : res.State값을 props로 넘겨줌
               
        </div>
    );
}

export default ReservationState