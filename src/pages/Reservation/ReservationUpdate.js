import './Reservation.css'; // css 적용

import React, { useState } from 'react'
import { useHistory } from 'react-router'; // 특정경로로 이동시키기 위한 함수

import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Button, Cascader, Radio} from 'antd';

import axios from 'axios';

function ReservationUpdate(props){
    /************** 전역 변수 *******************/
    const [form] = Form.useForm(); 

    /************** useState *******************/ 
    let [ numOfGuests, setNumOfGuests ] = useState('');
    let [ stayPurpose, setStayPurpose ] = useState('');
    let [ message, setMessage ] = useState('dd123');
    
    /************** useEffect ************************/ 
    // 동기 처리를 통한 초기값 설정 
    useState(async () => {
        await setInitValue();
    });

    function setInitValue() {
        setNumOfGuests(props.numOfGuests);
        setStayPurpose(props.stayPurpose);
        setMessage(props.message);
    }
    return(
        <div>
            <h3>You can update only info that include number of guests, purpose of Stay, Message.</h3>
            <h5>If you want to change other info like check in, check out etc, cancel your reservation and do reserve new reservation.</h5>
            <Form
                form={form}
                name="update reservation info"
            >
                {/* 게스트 숫자 update */}
                <Form.Item
                    name="numOfGuests"
                    label="Number of Guests"
                >
                    <InputNumber 
                      defaultValue = {numOfGuests}
                      min = {1}
                      max = {4}
                      onChange = {(num) => {setNumOfGuests(num)}} /> <e> Maximum for staying is 4.</e>
                </Form.Item>

                {/* 숙박목적 */}
                <Form.Item
                    name="stayPurpose"
                    label="Purpose of Stay"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your purpose of stay!',
                        },
                        ]}
                >
                    <Input
                        defaultValue = { stayPurpose } 
                        onChange = {(e) => {setStayPurpose(e.target.value)}}/>
                </Form.Item>

                {/* 기타 요청사항 입력창 update */}
                <Form.Item
                    name="message"
                    label="Message"
                >
                    <Input 
                        defaultValue = { message } 
                        onChange = {(e) => {setMessage(e.target.value)}} />
                </Form.Item>
            </Form>
        </div>
    )
}

export default ReservationUpdate