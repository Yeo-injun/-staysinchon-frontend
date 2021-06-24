import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

function Register() {

    /************** useState영역 *******************/ 
    let [ user_ID, setUserName ] = useState(''); // 사용자 ID
    let [ pwd, setPassword ] = useState(''); // 사용자 PW
    let [ checkPwd, setCheckPassword ] = useState(''); // 사용자 PW 확인
    let [ email, setEmail ] = useState(''); // 사용자 email

    let [ authToken, setAuthToken ] = useState(null); // login Token
    /************** useState영역 [끝] **************/ 

    /* @@ 아이디 중복 확인 */

    /* 비밀번호 확인 */
    function isSamePassword() {
        if ( pwd === checkPwd ) {
            return true;
        }
        return false;
    }

    /* 회원가입 요청 */
    function tryRegister() {
        console.log(user_ID);
        // 호출 URL
        const url = "http://localhost:8080/user/register";
        
        // post 데이터
        const data = {
          user_ID : user_ID,
          pwd : pwd,
          email : email
        };
    
        // header 설정
        const header =  { 
          'Access-Control-Allow-Origin' : ''
        };
        
        // 비밀번호가 같을 경우 axios POST 요청 
        if( isSamePassword() ){
            axios.post(url, data)
                .then(function (response) {            
                    console.log(response.data);    
                })
                .catch(function (error) {
                    alert("Error!!");
                    console.log(error);
                }); // axios [끝]
            return;        
        } 
        alert("비밀번호를 확인해주세요!");
    }

    /************** HTML 화면 영역 **************/ 
    return (
        <>
            <h2>회원가입페이지</h2>

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
                <Form.Item>
                    <Button onClick={ tryRegister } type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Register;
