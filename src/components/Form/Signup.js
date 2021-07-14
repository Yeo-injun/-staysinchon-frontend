import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import './Form.css'; // css 적용
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Route, Link } from 'react-router-dom';
import Register from './Register';
import axios from 'axios';

import { useHistory } from 'react-router'; // 특정경로로 이동시키기 위한 함수


function Signup(props) {

  /************** 전역 변수 영역 *******************/
  let history = useHistory();
  /************** 변수 영역 [끝] *******************/

  /************** useState영역 *******************/ 
  let [ user_ID, setUserName ] = useState(''); // 사용자 ID
  let [ pwd, setUserPassword ] = useState(''); // 사용자 PW
  let [ authToken, setAuthToken ] = useState(null); // login Token
  /************** useState영역 [끝] **************/ 
  
  /************** useEffect 영역 ************************/ 
  useEffect(() => {
    // 로그인 요청 후 authToken useState값이 변할때만 useEffect()가 호출됨
    // Token이 정상 발급되면 모달창 종료(부모 컴포넌트에서 모달 조작 useState값 조작)
    if(authToken != null && authToken != ''){
      localStorage.setItem('authToken', authToken); // axios.defaults.headers.common['Authorization'] = authToken; // Request시 header값 초기화
      props.setIsModalVisible(false); // 부모 컴포넌트 함수 호출 : 모달창 끄기          
      props.setIsLogin(true); // 로그인 버튼 조작을 위해 useState함수를 넘겨받음.
      history.push('/'); // 로그인 완료되면 home화면 이동 
    } 
  }, [authToken]); 
  /************** useEffect 영역 [끝] *******************/ 

  
  /* onFinish() */
  function onFinish(values) {
    console.log('Received values of form: ', values);
  } // onFinish()

  /* 유효성 검증 */
  function isValidate() {
    if (user_ID === null || user_ID === '') {
      return false;
    }

    if (pwd === null || pwd === '') {
      return false;
    }

    return true;
  }


  /* 로그인 요청 */
  function tryLogin() {
    // 로컬변수 
    let rsAuth = null;

    alert("1. 로그인 시도");
    
    // 입력값 유효성 체크
    if (!isValidate()) {
      alert("Please input your ID or password");
      return;
    }

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
        rsAuth = response.headers.authorization;
        setAuthToken(rsAuth); // authToken 보관
        
        // ID-Password가 맞지 않을 경우 Token은 undefined 반환
        if (rsAuth == undefined){
          alert("Please Check your ID or Password being correct");
        }

        alert("통신 정상 종료");
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
          <Button onClick={ tryLogin } click={props.click} type="primary" htmlType="submit" className="login-form-button">
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
