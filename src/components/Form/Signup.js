import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

function Signup() {

  /* 관련 변수 선언 */ 
  let [user_ID, setUserName] = useState(''); // 사용자 ID
  let [pwd, setUserPassword] = useState(''); // 사용자 PW


  /* 관련 메소드 선언 */
  function onFinish(values) {
    console.log('Received values of form: ', values);
  } // onFinish()

  function tryLogin() {
    console.log(user_ID);
    // 호출 URL
    const url = "http://localhost:8080/login";
    
    // post 데이터
    const data = {
      user_ID : user_ID,
      pwd : pwd
    };

    // header 설정
    const header =  { 
      'Access-Control-Allow-Origin' : ''
    };

    // axios POST 요청
    axios.post(url, data, header)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  } // tryLogin()

  return (
    <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true, }}
        onFinish={onFinish}
    >   
        {/* 아이디 입력창 */ }
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input id="hi" prefix={<UserOutlined className="site-form-item-icon" />} 
          placeholder="Username" 
          onChange={(e)=>{ setUserName(e.target.value) }} />
        </Form.Item>

        {/* 패스워드 입력창 */ }
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            className='userInput'
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e)=>{ setUserPassword(e.target.value) }}
          />
        </Form.Item>
        
        {/* @@ 자동로그인 여부 Check */}
        <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>
        
        {/* @@ 비밀번호 찾기 */}
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item>
          <Button onClick={ tryLogin } type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
           Or <a href="">Register Now!</a>
        </Form.Item>
      </Form>

  )

}
export default Signup;
