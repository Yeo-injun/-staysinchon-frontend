/* eslint-disable */
import './Reservation.css';

import React, {useState, useEffect, useRef} from 'react';

import axios from 'axios';

import { Modal } from 'antd';
import { Button } from '../../globalStyles';

import UpdateModal from './ReservationUpdate';
import CancelModal from './ReservationCancel';

function ReservationState(props) {
    /************** useState영역 *******************/ 
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    let [ isModalVisible, setIsModalVisible ] = useState(false); // Modal 상태

    let [curState, setCurState] = useState('');
    let [isDisableBtn, setIsDisableBtn] = useState(true);

    let [isUpdate, setIsUpdate] = useState(true); // 취소버튼 누를경우 false
    /************** useState영역 [끝] **************/ 

    /************** useEffect 영역 ************************/ 
    useState(()=>{
        setCurState(checkState(props.state, props.checkIn, props.checkOut));
    }, [props.state]);
    /************** useEffect 영역 [끝] *******************/ 

    const handleClick = () => setClick(!click);  // 기본값이 false

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    /* 예약 상태 반환 함수 
        State 값에 따라서 상태 출력(예약신청 - 예약확정 - 예약취소 - 숙박중 - 숙박완료) 
        예약신청 : state값 1
        예약취소 : state값 3
        숙박완료 : state값 2 + checkOut 날짜 이후
        숙박중 : state값 2 + checkIn 날짜 이후 + checkOut 날짜 전
        예약확정 : state값 2 + checkIn 날짜 전            
    */
    function checkState(state, checkIn, checkOut) {
        let now = uniDateType(new Date());
        let checkInDate = uniDateType(new Date(checkIn));
        let checkOutDate = uniDateType(new Date(checkOut));

        // 예약 신청 상태
        if(state == 1) {
            setIsDisableBtn(false);
            return 'apply';
        } 

        // 예약 취소 상태
        if(state == 3) {
            return 'cancel';
        }

        // 체크아웃 후 : 숙박종료
        if (now >= checkOutDate) {
            return 'stayEnd';
        }

        // 체크인 후 + 체크아웃 전 : 숙박중
        if(now >= checkInDate && now < checkOutDate) {
            return 'stayStart';
        }

        // 체크인 이전 : 예약확정
        if(now < checkInDate) {
            setIsDisableBtn(false);
            return 'confirm';
        }

    }

    // date비교를 위해 전처리 함수
    function uniDateType(date) {
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        let uniType = new Date(yyyy + '-' + mm + '-' + dd);
        return uniType;
    }


    // 예약 취소하기 API 호출
    function cancelReservation() {
        setIsUpdate(false); // 모달창 띄울때 구분자
        setIsModalVisible(true);
    }

    // 예약 수정하기 API 호출
    function updateReservation() {
        setIsUpdate(true); // 모달창 띄울때 구분자
        setIsModalVisible(true);
    }

    return (
        <div>
            <button className={(curState == 'apply') ? "stateItem currentState" : "stateItem"}>예약신청</button>
            <button className={(curState == 'confirm') ? "stateItem currentState" : "stateItem"}>예약확정</button>
            <button className={(curState == 'cancel') ? "stateItem currentState" : "stateItem"}>예약취소</button>
            <button className={(curState == 'stayStart') ? "stateItem currentState" : "stateItem"}>숙박중</button>
            <button className={(curState == 'stayEnd') ? "stateItem currentState" : "stateItem"}>숙박종료</button>          

            {/* 숙박종료, 예약취소, 숙박중 상태면 비활성화 */}
            <Button className={(curState == 'apply' || curState == 'confirm') ? "btn" : "btn disabled"}
                    onClick={cancelReservation}
                    disabled={isDisableBtn}>
                Cancel
            </Button> 

            {/* 숙박종료, 예약취소, 숙박중 상태면 비활성화 */}
            <Button className={(curState == 'apply' || curState == 'confirm') ? "btn" : "btn disabled"}
                    onClick={updateReservation}
                    disabled={isDisableBtn}>
                Update
            </Button>

            {/* 예약취소 또는 예약수정 버튼 클릭시 모달창 팝업 */}
            <Modal 
                title={(isUpdate) ? "Update Reservation" : "Cancel Reservation"} 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={null}>
                {/* cancel 또는 update에 따라 다른 태그 보여주기 */}
                {(isUpdate) 
                    ? <UpdateModal/> 
                    : <CancelModal 
                        res_ID = {props.res_ID}
                        checkIn = {props.checkIn}
                        checkOut = {props.checkOut}
                        setIsModalVisible={setIsModalVisible}/>} 
            </Modal>

        </div>
    );
}

export default ReservationState