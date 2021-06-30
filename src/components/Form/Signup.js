import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './Form.css'; // css 적용
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Route, Link } from 'react-router-dom';
import Register from './Register';
import axios from 'axios';

function Signup(props) {

  /************** useState영역 *******************/ 
  let [ user_ID, setUserName ] = useState(''); // 사용자 ID
  let [ pwd, setUserPassword ] = useState(''); // 사용자 PW
  let [ authToken, setAuthToken ] = useState(null); // login Token

  /************** useState영역 [끝] **************/ 
  
  /* onFinish() */
  function onFinish(values) {
    console.log('Received values of form: ', values);
  } // onFinish()


  /* 로그인 요청 */
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
        setAuthToken(response.headers.authorization); // authToken 보관   
        
        // 로그인이 처리 여부 확인 : 정상처리시 모달창 종료(부모 컴포넌트에서 모달 조작 useState값 조작)
        if(authToken != null && authToken != ''){
          localStorage.setItem('authToken', authToken); // axios.defaults.headers.common['Authorization'] = authToken; // Request시 header값 초기화
          props.setIsModalVisible(false); // 부모 컴포넌트 함수 호출 : 모달창 끄기          
        } else {
          alert("아이디 혹은 비밀번호를 확인해주세요.");
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  } // tryLogin()

  // 회원가입 페이지로 이동 
  function moveToRegister() {
    props.setIsModalVisible(false);
  }

  /************** HTML 화면 영역 **************/ 
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
          {/* 로그인 버튼 */}
          <Button onClick={ tryLogin } type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          {/* 회원가입 버튼 : 부모 컴포넌트 UserPages에서 Routes 등록이 되어야 함*/}
          {/* ## click 속성에 부모 컴포넌트의 click useState값을 넣어줘야 함. 이유는 추후 확인 필요... */}
          Or <Link to="/register" onClick={moveToRegister} click={props.click}>Register Now!</Link>
        </Form.Item>
      </Form>

  )

}
export default Signup;
