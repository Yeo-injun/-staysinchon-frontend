import React from 'react'
import moment from "moment";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { SliderData } from '../../components/ImageSlider/Data';
import { Button} from '../../globalStyles';
import {roomOne, roomTwo, roomThree} from './Data';
import RoomInfoSection from '../../components/InfoSection/RoomInfoSection';

const Reservation = () => {
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
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
        <RoomInfoSection {...roomOne}/>
        <RoomInfoSection {...roomTwo}/>
        <RoomInfoSection {...roomThree}/>
            
        </div>
        </>
    )
}
export default Reservation

