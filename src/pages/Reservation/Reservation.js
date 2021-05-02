import React, {useState, useEffect}from 'react'
import moment from "moment";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { SliderData } from '../../components/ImageSlider/Data';
import { Button} from '../../globalStyles';
import {roomOne, roomTwo, roomThree} from './Data';
import RoomInfoSection from '../../components/InfoSection/RoomInfoSection';
import axios from "axios";

const Reservation = () => {

    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    const [roooms, setRooms] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

        // room 정보 useState
    const [room_img, setRoom_img] = useState(null);
    const [alt, setAlt] = useState(null);
    const [room_ID, setRoom_ID] = useState(null);
    const [room_type, setRoom_type] = useState(null);
    const [bed, setBed] = useState(null);
    const [bathroom, setBathroom] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const [price_day, setPrice_day] = useState(null);
    const [price_month, setPrice_month] = useState(null);

    //room 데이터 받아오기
    useEffect(() => {
    const getRoomInfo = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setRooms(null);
                // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            
                
                //
            const response = await axios.get('http://localhost:8080/rooms');
            const roomdata = response.data;
            console.log(response.data); // 데이터는 response.data 안에 들어있습니다.
            // 선언된 state값에 axios로 받아온 데이터 넣어주기 
            for (let i = 0; i<response.data.length; i++){
                setRoom_img(response.data[i].room_img);
                setRoom_type(response.data[i].room_type);
                setBed(response.data[i].bed);
                setBathroom(response.data[i].bathroom);
                setCapacity(response.data[i].setCapacity);

            
            }
            const roomlist = roomdata.map((room)=>(<RoomInfoSection/>));
        } catch (e) {
            setError(e);
          }
          setLoading(false);
        };
    
        getRoomInfo();
      }, []);
    
    

      
    return (
        <>
        <ImageSlider slides={SliderData} />;
        <div className = 'datepicker' style = {{textAlign: 'center'}}>
        Available Bedrooms<br/><br />
        <Space direction="vertical" size={12}>
            <RangePicker 
            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat} />
        </Space>
        <div>
            <Button style = {{marginTop: '15px'}}>Search</Button>
        </div>
        {/*수정부분*/}
        
        {/* <RoomInfoSection/> */}
            
        </div>
        </>
    )
}
export default Reservation
