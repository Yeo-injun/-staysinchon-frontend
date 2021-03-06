import React, { useState, useEffect } from 'react';

import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Button, Select, Radio} from 'antd';

import axios from 'axios';

const { Option } = Select;


function UserProfileUpdateForm(props) {

    let [ firstname, setFirstname ] = useState(props.firstname);
    let [ lastname, setLastname ] = useState(props.lastname);
    let [ sex, setSex ] = useState(props.sex);
    let [ country, setCountry ] = useState(props.country);
    let [ ageGroup, setAgeGroup ] = useState(props.age_group);
    let [ NA_foods, setNA_foods ] = useState(props.NA_foods);

    /* UserProfile 수정하기 */
    function updateUserProfile() {
        let isDone = window.confirm("Are you sure you want to update it?");

        if (isDone) {
            axios.put(
                "http://localhost:8080/user/profile"
                , {
                        "firstname" : firstname
                        , "lastname" : lastname
                        , "sex" : sex
                        , "country" : country
                        , "age_group" : ageGroup
                        , "NA_foods" : NA_foods
                    }
                , { headers : { 
                                'Authorization': localStorage.getItem("authToken") 
                                }
                    }
                ).then((response) => {
                    console.log(response);
                    alert(response.data);
                    props.closeModal(); // Modal창 종료
                })
        } 
    } /* [END] updateUserProfile() */

    return(
        <div>
            <Form>
                {/* 성씨 입력창 */}
                <Form.Item
                 name="firstname"
                 label="Firstname"
                 rules={[
                        {
                            required: true,
                            message: 'Please input your firstname!',
                        },
                    ]}
                >
                    <Input
                        defaultValue = {firstname}
                        onChange={(e)=>{ setFirstname(e.target.value) }}
                    />
                </Form.Item>

                {/* 이름 입력창 */}
                <Form.Item
                 name="lastname"
                 label="Lastname"
                 rules={[
                        {
                            required: true,
                            message: 'Please input your lastname!',
                        },
                    ]}
                >
                    <Input
                        defaultValue = {lastname}
                        onChange={(e)=>{ setLastname(e.target.value) }}
                    />
                </Form.Item>

                {/* 성별 입력창 */}
                <Form.Item
                    name="sex" 
                    label="Gender"
                    rules={[
                    {
                        required: true,
                        message: 'Please select your gender!',
                    },
                    ]}
                >
                    {(sex == 0) // sex값이 0(false)이면 남자, 1이면(true) 여자 
                        ? <Radio.Group defaultValue = "0" onChange={(e)=>{setSex(e.target.value)}}>
                              <Radio value="0">Male</Radio>
                              <Radio value="1">Female</Radio> 
                          </Radio.Group>
                        : <Radio.Group defaultValue = "1" onChange={(e)=>{setSex(e.target.value)}}>
                              <Radio value="0">Male</Radio>
                              <Radio value="1">Female</Radio> 
                          </Radio.Group>
                    }
                </Form.Item>

                 {/* 국가 입력창 */}
                <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                    {
                        required: true,
                        message: 'Please select your Country!',
                    },
                    ]}
                >
                    <Select 
                        defaultValue = {country}
                        onChange = {(value) => {setCountry(value)}} 
                    >
                        <Option value = 'Republic of Korea'>Republic of Korea</Option>
                        <Option value = 'Australia'>Australia</Option>
                        <Option value = 'Estonia'>Estonia</Option>
                    </Select>
                </Form.Item>

                {/* 연령대 입력창 */}
                <Form.Item
                    name="age_group"
                    label="Age Group"
                    rules={[
                    {
                        required: true,
                        message: 'Please select your Age Group!',
                    },
                    ]}
                >
                    <Select 
                        defaultValue = {ageGroup.toString()}
                        onChange = {(value) => {setAgeGroup(parseInt(value))}} 
                    >
                        <Option value = '1' > ~ 19 </Option>
                        <Option value = '2' > 20 ~ 29 </Option>
                        <Option value = '3' > 30 ~ 39 </Option>
                        <Option value = '4' > 40 ~ 49 </Option>
                        <Option value = '5' > 50 ~ 59 </Option>
                        <Option value = '6' > 60 ~ </Option>
                    </Select>
                </Form.Item>

                {/* 알레르기 입력창 */}
                <Form.Item
                    name="NA_foods"
                    label="Allergy info"
                >
                    <Input 
                        defaultValue = {NA_foods}
                        onChange = {(e) => {setNA_foods(e.target.value)}} 
                    />
                </Form.Item>
            </Form>

            {/* 수정 버튼 */}
            <Button onClick={updateUserProfile}>Done</Button>
        </div>
    );
}

export default UserProfileUpdateForm