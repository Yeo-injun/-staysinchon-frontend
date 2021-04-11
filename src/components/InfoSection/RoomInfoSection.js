import React, {useState} from 'react';
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

const RoomSearchResult = ({
    room_img,
    alt,
    room_ID,
    room_type,
    bed,
    bathroom,
    capacity,
    price_day,
    price_month
}) => {
        // Modal
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

export default RoomSearchResult
