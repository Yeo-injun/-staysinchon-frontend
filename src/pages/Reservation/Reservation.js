/* eslint-disable */
import './Reservation.css'; // css 적용

import React, { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom';

import moment from "moment";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";

import axios from 'axios';

import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { SliderData } from '../../components/ImageSlider/Data';
import { Button } from '../../globalStyles';



function Reservation() {
    
    /************** 전역 변수 *******************/
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    /************** 전역 변수 [끝] *******************/


    /************** useState *******************/ 
    // useState 초기값 설정이 중요함
    // 변환되는 자료형이 배열이면 초기값도 배열로 반영
    let [ roomData, setRoomData ] = useState([]); 
    let [ isLogin, setIsLogin ] = useState(false); // 로그인여부 확인 : Auth확인 (향후 공통으로 작업하기..)

    let [ searchCond, setSearchCond ] = useState([]); // 검색일자 State
    let [ searchState, setSearchState ] = useState(false);
    let [ isCallable, setIsCallable ] = useState(false);
    /************** useState [끝] **************/ 


    /************** useEffect ************************/ 
    // room 데이터 받아오기 : useEffect() 안에서 Axios로 API서버 호출
    // useEffect 실행시기 1. 컴포넌트 로딩이 끝난 후(mount 완료) 2. 컴포넌트 재렌더링 끝난 후(update 완료)
    useEffect(()=> {
        checkLogin();
        getRoomList();
    }, [isLogin]); 
    // isLogin State가 변화할때마다 useEffect호출됨
    // useEffect()의 두번째 인자는 useEffect 호출횟수를 지정( []값이 있을때는 1번만 호출 )
    /************** useEffect [끝] *******************/ 

    /* 로그인 상태 확인 메서드 */
    function checkLogin() {
        let token = localStorage.getItem('authToken');
        if (token != null) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
    }

    /* 방 목록 기본값 호출 */
    function getRoomList() {
        axios.get('http://localhost:8080/rooms')
            .then((result)=>{ 
                var rs = result.data;                
                setRoomData(rs);                     
            })
            .catch(()=>{ '요청실패시실행할코드' })
    }

    /* 방 목록 Search */
    function getSearchRoom() {
        console.log(searchCond);
        // 쿼리 스트링 사용하기
        axios.get('http://localhost:8080/rooms/search?check_in=' + searchCond[0] +'&check_out='+ searchCond[1])
             .then((result)=>{
                 setSearchState(true);
                 var rs = result.data;
                 setRoomData(rs);
             })
             .catch(()=>{ '요청실패시실행할코드' })

    }

    /* Form이동 전 check in, check out 입력 상태 확인하기 */
    function checkValidClick() {
        if(searchCond[0] === undefined) {
            alert("Please select check in date.");
            return;
        }
        
        if(searchCond[1] === undefined) {
            alert("Pleass select check out date.");
            return;
        }

        if(!searchState) {
            alert("Please push search button");
            return;
        }
        
        setIsCallable(true);
    }

    /* datePicker에서 날짜값 가져오기 */
    function updateDate(value, dateString) {
        // Q. value, dateString 파라미터값이 무엇하고 매칭되는지 확인 필요...
        setSearchCond(dateString);
        setSearchState(false);
        console.log(searchCond);
    }


    /************** HTML 화면 영역 **************/ 
    return (
        <div className="contents">
            <ImageSlider slides={SliderData} />
            <div className ="title" >
                <h3>Available Rooms</h3>
            </div>
            <br/>

            {/* DatePicker : https://ant.design/components/date-picker/*/}
            <div className = "datepicker">
                <Space direction="vertical" size={12}>
                    <RangePicker
                        dateRender={current => {
                            const style = {};
                            if (current.date() === 1) {
                            style.border = '1px solid #1890ff';
                            style.borderRadius = '50%';
                            }
                            return (
                            <div className="ant-picker-cell-inner" style={style}>
                                {current.date()}
                            </div>
                            );
                        }}
                        onChange={ updateDate } // 날짜가 변경될때 콜백함수 호출
                    />
                </Space>

                {/* onClick 메소드로 검색 호출 */}
                <Button style = {{marginRight: '10px'}} onClick={ getSearchRoom }>Search</Button>
            </div>

            {/* RommData 뿌려주기 */
            roomData.map(
                (room) => { 
                    console.log(room);
                    return (
                    <div className="roomItem">
                        <img src=""/>
                        <span><h3>{room.room_name}</h3></span>
                        <p>Room Type : { room.room_type }</p>
                        <p>Accommodate : { room.capacity }</p>
                        <p>Beds : { room.bed }</p>
                        <p>Bathroom : { room.bathroom }</p>

                        <div className="priceContent">
                            <li>Daily Price : { room.price_day }</li>
                            <li>Monthly Price : { room.price_day }</li>
                        </div>

                        {/* 화면 전환은 Link태그 활용 : 로그인시에만 화면 전환되도록 구현해야함...*/}
                        <div className="button">
                            {(!isLogin) 
                            ? console.log("login")
                            /* Link태그에서 데이터를 넘겨주는 방법 3가지 
                            /       1. App.js Router에 url 등록시 param 값 설정
                            /       2. QueryString값 설정 (ex. ?key=Value)
                            /       --------------------------------- 이상의 방법 단점 : URL에 전달하고자하는 값이 노출됨
                            /       3. to 속성을 객체로 만들어서 넘겨줌. 
                            /            - to속성내의 객체 속성 : pathname, state 등
                            /            - 데이터를 넘겨받는 컴포넌트에서는 함수의 파라미터값으로 {location} 추가
                            /            참고자료 : https://wodyios.tistory.com/6
                            */
                            : 
                                <Button onClick={checkValidClick}>
                                    {/* checkValidDate 함수에서 check in, check out 검증 후 
                                        입력값이 존재할 경우에 isCallable State값을 true로 변환. 
                                        삼항연산자를 통해 isCallable 값에 따라 Link적용 여부 분기*/}
                                    {(isCallable) 
                                    ?   <Link to={{ 
                                                pathname : '/reservation/form',
                                                state : {
                                                    check_in : searchCond[0],
                                                    check_out : searchCond[1],
                                                    room_ID : room.room_ID
                                                }
                                            }} 
                                        >
                                            <Button>Book This Room</Button>
                                        </Link>
                                    : <Button>Book This Room</Button>
                                    }
                                </Button>
                              
                            }
                        
                        </div>
                    </div>
               )}
            )
            }
        </div>
    ) /* HTML덩어리 [끝] */
}

export default Reservation
