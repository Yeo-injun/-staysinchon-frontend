import './Reservation.css'; // css 적용

import React, { useState } from 'react'

import 'antd/dist/antd.css';
import { Form, Input, Button, Cascader, Radio} from 'antd';

import axios from 'axios';


const countries = [
    {
        value: 'Republic of Korea',
        label: 'Republic of Korea',
    },
    
    {
        value: 'Australia',
        label: 'Australia',
    },
    
    {
        value: 'Estonia',
        label: 'Estonia',
    },
  ];

  const age_group = [
    {
        value: 1,
        label: '~ 19',
    },
    {
        value: 2,
        label: '20 ~ 29',
    },
    {
        value: 3,
        label: '30 ~ 39',
    },
    {
        value: 4,
        label: '40 ~ 49',
    },
    {
        value: 5,
        label: '50 ~ 59',
    },
    {
        value: 6,
        label: '60 ~',
    },
  ];

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

  


/* input태그 안에 입력값 POST로 보내기 */
// Link 태그에 url 설정시 데이터값 넘겨줄 수 있음
function Reservationinfo({location}) {


    /************** 전역 변수 *******************/
    const [form] = Form.useForm(); 
    let room_name = location.state.room_name;
    let price = location.state.price;

    // 숙박일수(check out - check in) * payment
    /* POST */ let totalPayment = () => {
      let chkIn = new Date(check_in);
      let chkOut = new Date(check_out);
      let mSecHourDay = chkOut.getTime() - chkIn.getTime();
      let days = mSecHourDay / 1000 / 60 / 60 /24;
      return price * days;
    };
    /************** 전역 변수 [끝] *******************/

    /************** useState *******************/ 
    
    /* POST */ let room_ID = location.state.room_ID;
    /* POST */ let check_in = location.state.check_in;
    /* POST */ let check_out = location.state.check_out;
    /* POST */ let [ stayPurpose, setStayPurpose ] = useState('');
    /* POST */ let [ numOfGuests, setNumOfGuests ] = useState('');
        
    let [ firstname, setFirstname ] = useState('');
    let [ lastname, setLastname ] = useState('');
    let [ sex, setSex ] = useState('');
    let [ country, setCountry ] = useState('');
    let [ ageGroup, setAgeGroup ] = useState('');
    let [ NA_foods, setNA_foods ] = useState('');

    let [ isLoading, setIsLoading ] = useState(true); // 본문 렌더링 전에 axios호출해서 UserInfo를 set할 수 있게끔 제어 
    let [ userInfoYN, setUserInfoYN ] = useState(false);
    
    /************** useState [끝] **************/ 

    function getUserInfo(){
      axios.get(  "http://localhost:8080/reservation/form"
              , { headers : { 
                              'Authorization': localStorage.getItem("authToken") 
                            }
              })
      .then(function (response) {
          let data = response.data;
          if(data.userInfo){
              console.log("예약이력 존재");
              setFirstname(data.firstname);
              setLastname(data.lastname);
              setSex(data.sex);
              setCountry(data.country);
              setNA_foods(data.NA_foods);
              setAgeGroup(data.age_group);
              setUserInfoYN(true);
              setIsLoading(false);
          }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function setDefaultAgeGroup() {
        for (var idx = 1; idx <= age_group.length; idx++){
            if (ageGroup == idx) {
              return age_group[ageGroup-1].label;
            }
        }
    }

    /************** useEffect ************************/ 
    useState( async ()=> {
        await getUserInfo(); // Axios 동기 처리 : Axios는 기본적으로 비동기통신으로 Javascript렌더링시 마지막에 처리됨.
        alert("통신 종료");
    }, []);
    /************** useEffect [끝] *******************/ 


    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

  
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

    return (
        <div className="contents">
        <div>
          <h2>Room to Reserve : {room_ID}</h2>
          <h3>Check In : {check_in}</h3>
          <h3>Check Out : {check_out}</h3>
          <h3>Total payment : {totalPayment()}</h3>
        </div>

        <Form
          {...formItemLayout}
          form={form}
          name="reservation"
          onFinish={onFinish}
          scrollToFirstError
        >
          {/* 이름 입력창 */}
          <Form.Item
              name="Firstname"
              label="Firstname"
              rules={[
              {
                  required: true,
                  message: 'Please input your firstname!',
              },
              ]}
          >
          
          {(userInfoYN) ? 
                  <Input 
                      disabled = "true"
                      defaultValue = { firstname }
                      onChange={(e)=>{ setFirstname(e.target.value) }}
                  />
                  : 
                  <Input
                      onChange={(e)=>{ setFirstname(e.target.value) }}
                  />
          }
          </Form.Item>

          {/* 성 입력창 */}
          <Form.Item
              name="Lastname"
              label="Lastname"
              rules={[
              {
                  required: true,
                  message: 'Please input your Lastname!',
              },
              ]}
          >
              {(userInfoYN)  
                  ? <Input 
                      disabled = "true"
                      defaultValue = { lastname }
                      onChange={(e)=>{ setLastname(e.target.value) }}
                  />
                  : <Input
                      onChange={(e)=>{ setLastname(e.target.value) }}
                  />
              }
          </Form.Item>
          
          {/* 국가 입력창 */}
          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select your Country!',
              },
            ]}
          >
            {(userInfoYN) 
                ? <Input 
                defaultValue = {country}
                disabled = "true"/>
                : <Cascader 
                      options = {countries}
                      onChange = {(e) => {setCountry(e.target.value)}} />
            }
          </Form.Item>


          {/* 연령대 입력창 */}
          <Form.Item
            name="age_group"
            label="Age Group"
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select your Age Group!',
              },
            ]}
          >
            {(userInfoYN) 
                ? <Input 
                defaultValue = {setDefaultAgeGroup()}
                disabled = "true"/>
                : <Cascader 
                      options = {age_group}
                      onChange = {(e) => {setAgeGroup(e.target.value)}} />
            }
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
            ]}>
            
              {(userInfoYN)
                  ? (sex == 0) // sex값이 0(false)이면 남자, 1이면(true) 여자 
                        ? <Radio.Group defaultValue = "0">
                              <Radio value="0" disabled = "true">Male</Radio>
                              <Radio value="1" disabled = "true">Female</Radio> 
                          </Radio.Group>
                        : <Radio.Group defaultValue = "1">
                              <Radio value="0" disabled = "true">Male</Radio>
                              <Radio value="1" disabled = "true">Female</Radio>
                          </Radio.Group>
                  : <Radio.Group>
                        <Radio value="0" >Male</Radio>
                        <Radio value="1">Female</Radio>
                    </Radio.Group>
              }
          </Form.Item>

          {/* 알레르기 입력창 */}
          <Form.Item
              name="NA_foods"
              label="Allergy info"
          >
              {(userInfoYN) 
                ? <Input 
                defaultValue = {NA_foods}
                disabled = "true"/>
                : <Input 
                      onChange = {(e) => {setNA_foods(e.target.value)}} />
              }
          </Form.Item>

          {/* 기타 요청사항 입력창 */}
          <Form.Item
              name="etc_info"
              label="message"
          >
            <Input />
          </Form.Item>

          {/* 제출 버튼 */}
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
    )
}

export default Reservationinfo
