import React, {useState} from 'react';
import { useHistory } from 'react-router'; // 특정경로로 이동시키기 위한 함수

import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './Form.css'; // css 적용

import axios from 'axios';
import { PinDropSharp } from '@material-ui/icons';

/*
* 회원가입 완료시 화면 전환 >> 홈화면으로 이동 - 로그인을 위한 모달창 팝업 (구현 요망)
*
*/ 


function Register(props) {

    /************** useState영역 *******************/ 
    let [ userId, setUserName ] = useState(null); // 사용자 ID
    let [ pwd, setPassword ] = useState(null); // 사용자 PW
    let [ checkPwd, setCheckPassword ] = useState(null); // 사용자 PW 확인
    let [ email, setEmail ] = useState(null); // 사용자 email

    let [ isDuplicate, setIsDuplicate ] = useState(true); // 아이디 중복체크

    let [ authToken, setAuthToken ] = useState(null); // login Token
    /************** useState영역 [끝] **************/ 

    /************** 변수 영역 *******************/
    const inputRef = React.useRef(null); // // ref를 위한 변수 선언
    let history = useHistory();
    /************** 변수 영역 [끝] *******************/


    /* 아이디 중복 확인 */
    function checkDuplicationForUserId() {
        
        if (userId == null) {
            alert("Please typing username")
            return;
        }

        // axios POST 요청         
        axios.post
            ( "http://localhost:8080/user/check"
            , { userId : userId }
            )
            .then(function (response) {
                setIsDuplicate(false);
                alert("You can use this ID.");
            })
            .catch(function (error) {
                console.log(error);
                setIsDuplicate(true);
                alert("아이디 중복됐습니다!");
            }); // axios [끝]
    }
    
    
    /* 비밀번호 확인 */
    function isSamePassword() {
        if ( pwd === checkPwd ) {
            return true;
        }
        return false;
    }

    /* 입력값 유효성 확인 */
    function validationCheck() {
        if (userId === null || userId === '') {
            return false;
        }
        if (pwd === null || pwd === '') {
            return false;
        }
        if (email === null || email === '') {
            return false;
        }
        return true;
    }

    /* 회원가입 요청 : 이메일 중복 여부 체크 및 이메일 인증 기능 구현 필요 (추후 작업 요망)*/
    function tryRegister() {
        // 입력값 유효성 검증
        if (!validationCheck()) {
            console.log("입력값 유효성 검증 - False!!!");
            return;
        }

        // 아이디 중복 Check : true면 아이디 중복이 있다는 것
        if (isDuplicate){
            alert("Check your ID Whether duplicate or not");
            inputRef.current.focus();
            return;
        };
    
        // 비밀번호가 같을 경우 axios POST 요청 
        if( isSamePassword() ){
            axios.post
                ( "http://localhost:8080/user/register"
                , {
                    userId : userId,
                    pwd : pwd,
                    email : email
                  })
                .then(function (response) {            
                    console.log(response.data);
                    alert("회원가입이 완료되었습니다!");
                    history.push('/'); // 회원가입 완료되면 home화면 이동 
                })
                .catch(function (error) {
                    alert("Error!!");
                    console.log(error);
                }); // axios [끝]
            return; // 비밀번호가 같으면 아래 alert창 실행되지 않음   
        } 
        alert("비밀번호가 일치하지 않습니다!");
    }


    /************** HTML 화면 영역 **************/ 
    return (
        <div className="register-form">
            <h2>Register Form</h2>
            <h2>{props.test}</h2> 
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true, }}
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
                    <Input id="hi" 
                    ref = {inputRef}
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Username" 
                    onChange={(e)=>{ setUserName(e.target.value); setIsDuplicate(true); }} /> {/* 입력 ID가 바뀌면 다시 중복체크를 하게끔 제어 */}

                    <Button onClick={ checkDuplicationForUserId } htmlType="submit" className="login-form-button">
                        Check your ID!
                    </Button>
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
                        onChange={(e)=>{ setPassword(e.target.value) }}
                    />
                </Form.Item>

                {/* 확인 패스워드 입력창 */ }
                <Form.Item
                name="passwordCheck"
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
                        placeholder="Check Password"
                        onChange={(e)=>{ setCheckPassword(e.target.value);  }}
                    />
                </Form.Item>
                
                {/* Email 입력창 */ }
                <Form.Item
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Please input your email!',
                    },
                ]}
                >
                    <Input id="hi" prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Email" 
                    onChange={(e)=>{ setEmail(e.target.value) }} />
                </Form.Item>

                
                {/* 회원가입 버튼 */}
                <Form.Item className="register-btn">
                    <Button onClick={ tryRegister } type="primary" htmlType="submit" className="login-form-button">
                        Join Us!
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register;
