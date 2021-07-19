import './Reservation.css'; // css 적용

import React from 'react'

import 'antd/dist/antd.css';
import { Form, Input, Button, Cascader, Radio} from 'antd';


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
// {match} 로 받아서 데이터 사용가능 
function Reservationinfo({location}) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };


    return (
        <div className="contents">
        <div>
          <h2>Room to Reserve : {location.state.room_ID}</h2>
          <h3>Check In Date : {location.state.check_in}</h3>
          <h3>Check Out Date : {location.state.check_out}</h3>
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
           <Input />
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
            <Input />
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
            <Cascader options={countries} />
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
            <Cascader options={age_group} />
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
            <Radio.Group>
              <Radio value="1">Male</Radio>
              <Radio value="2">Female</Radio>
            </Radio.Group>
          </Form.Item>

          {/* 알레르기 입력창 */}
          <Form.Item
              name="NA_foods"
              label="Allergy info"
          >
            <Input />
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
