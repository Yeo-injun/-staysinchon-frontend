import React, {useState, useEffect} from 'react';
import { Button } from 'antd';
import {
    Img,
    InfoContainer,
    TextWrapper,
    TopLine,
    Subtitle,
    Price,
} from './RowInfoSection.elements';
import {NavBtnLink} from '../Navbar/Navbar.elements';
import { Modal} from 'antd';
import Reservationinfo from '../Form/Reservationinfo'

import axios from "axios";




const RoomInfoSection = () => {
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
                console.log(response.data); // 데이터는 response.data 안에 들어있습니다.
                
                // 선언된 state값에 axios로 받아온 데이터 넣어주기 
                for (let i = 0; i<response.data.length; i++){
                    setRoom_img(response.data[i].room_img);
                    setRoom_type(response.data[i].room_type);
                    setBed(response.data[i].bed);
                    setBathroom(response.data[i].bathroom);
                    setCapacity(response.data[i].setCapacity);

                }
                const roomlist = response.data.map((room) => (<InfoContainer/>));
                
            } catch (e) {
                setError(e);
              }
              setLoading(false);
            };
        
            getRoomInfo();
          }, []);


        const [isModalVisible, setIsModalVisible] = useState(false);

        const showModal = () => {
        setIsModalVisible(true);
        };
    
        const handleOk = () => {
        setIsModalVisible(false);
        };
    
        const handleCancel = () => {
        setIsModalVisible(false);
        };

    return (
        <>
        <div>
            
        </div>
        
        <InfoContainer>
            <Img src = {room_img} alt={alt} />
            <TextWrapper>
            <TopLine>Room {room_ID}<br />__________</TopLine>
            
            <Subtitle>Room Type: {room_type}</Subtitle>
            <Subtitle>Bed: {bed}</Subtitle>
            <Subtitle>BathRoom: {bathroom}</Subtitle>
            <Subtitle>Accommodate: {capacity} person</Subtitle>
            <Price>${price_day}/ night</Price>
            <Price>${price_month}/ month</Price>
            <br/>
            <NavBtnLink>
                    <Button primary onClick={showModal}>
                    Book this Room
                </Button>
                    <Modal title="Reservation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Reservationinfo />
                    </Modal>
                </NavBtnLink>
            </TextWrapper>
        </InfoContainer>
        
        </>
    )
}

export default RoomInfoSection