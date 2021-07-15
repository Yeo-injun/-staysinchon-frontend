/* eslint-disable */
import './Reservation.css'; // css 적용

import React, { useState, useEffect } from 'react'
import moment from "moment";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { SliderData } from '../../components/ImageSlider/Data';
import { Button } from '../../globalStyles';
import axios from 'axios';


function Reservation() {
    
    /************** 전역 변수 *******************/
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    /************** 전역 변수 [끝] *******************/


    /************** useState *******************/ 
    // useState 초기값 설정이 중요함
    // 변환되는 자료형이 배열이면 초기값도 배열로 반영
    let [ roomData, setRoomData ] = useState([]); 
    let [ isOk, setIsOk ] = useState(false);
    /************** useState [끝] **************/ 


    /************** useEffect ************************/ 
    // room 데이터 받아오기 : useEffect() 안에서 Axios로 API서버 호출
    // useEffect 실행시기 1. 컴포넌트 로딩이 끝난 후(mount 완료) 2. 컴포넌트 재렌더링 끝난 후(update 완료)
    useEffect(()=> {
        getRoomList();
    }, []); // useEffect()의 두번째 인자는 useEffect 호출횟수를 지정( []값이 있을때는 1번만 호출 )
    /************** useEffect [끝] *******************/ 

    /* 방 목록 기본값 호출 */
    function getRoomList() {
        axios.get('http://localhost:8080/rooms')
            .then((result)=>{ 
                var rs = result.data;                
                setRoomData(rs);                     
            })
            .catch(()=>{ '요청실패시실행할코드' })
    }

  /************** HTML 화면 영역 **************/ 
  return (
        <div className="contents">
            <ImageSlider slides={SliderData} />
            <div className ="title" >
                <h3>Available Rooms</h3>
            </div>
            <br/>

            {/* DatePicker */}
            <div className = "datepicker">
                <Space direction="vertical" size={12}>
                    <RangePicker 
                    defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                    format={dateFormat} />
                </Space>

                {/* [구현예정] onClick 메소드로 검색 호출 */}
                <Button  style = {{margin: '10px'}}>Search</Button>
            </div>

            {// RommData 뿌려주기 
            roomData.map(
                (room) => { 
                    console.log(room);
                    return (
                    <div className="roomItem">
                        <img src=""/>
                        <span>방 이름</span> {/** DB컬럼 추가 요망 : 방이름 */}
                        <p>Room Type : { room.room_type }</p>
                        <p>Accommodate : { room.capacity }</p>
                        <p>Beds : { room.bed }</p>
                        <p>Bathroom : { room.bathroom }</p>

                        <div className="priceContent">
                            <li>Daily Price : { room.price_day }</li>
                            <li>Monthly Price : { room.price_day }</li>
                        </div>

                        <div className="button">
                            <Button>Book This Room</Button>
                        </div>
                    </div>
               )}
            )
            }
        </div>
    ) /* HTML덩어리 [끝] */
}

export default Reservation
