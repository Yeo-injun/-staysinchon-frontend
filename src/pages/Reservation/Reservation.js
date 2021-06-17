import React, { useState, useEffect } from 'react'
import moment from "moment";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { SliderData } from '../../components/ImageSlider/Data';
import { Button} from '../../globalStyles';
import RoomInfoSection from '../../components/InfoSection/RoomInfoSection';
import axios from 'axios';

const Reservation = () => {
    
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';

    const config = {
        headers: { 'Authorization' : 'Bearer ${ }' },
    }

    // room 데이터 State변수에 담기
    let [ roomData, setRoomData ] = useState(null); 

    // room 데이터 받아오기 : useEffect() 안에서 Axios로 API서버 호출
    // useEffect 실행시기 1. 컴포넌트 로딩이 끝난 후(mount 완료) 2. 컴포넌트 재렌더링 끝난 후(update 완료)
    useEffect( ()=> {
        console.log('실행?');
        axios.get('http://localhost:8080/rooms/')
        .then((result)=>{ 
            setRoomData(result.data);
            console.log("____________");
            console.log(roomData);
            console.log(roomData[0].room_type);
            console.log(roomData[2].room_type)
            
        })
        .catch(()=>{ '요청실패시실행할코드' })

    }, []); // useEffect()의 두번째 인자는 useEffect 호출횟수를 지정( []값이 있을때는 1번만 호출 )


    /* HTML덩어리 */
    return (
        <div>
            <ImageSlider slides={SliderData} />;
            <div className = 'datepicker' style = {{textAlign: 'center'}}/>
                Available Bedrooms
                <br/>
                <br/>
                <Space direction="vertical" size={12}>
                    <RangePicker 
                    defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                    format={dateFormat} />
                </Space>
                {/* onClick 메소드로 검색 호출 */}
                <Button  style = {{marginTop: '15px'}}>Search</Button>

                
                
                {// RommData 뿌려주기 
                roomData.map(
                    (room) => {
                    return (
                        <div>
                            {room.room_type}
                        </div>
                    )
                    }
                )}
        </div>
    )
}
export default Reservation
