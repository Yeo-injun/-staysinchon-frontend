import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Signup() {
  function onFinish(values) {
    console.log('Received values of form: ', values);
  }
  let [user_ID, setUserName] = useState('');
  let [pwd, setUserPassword] = useState('');

  return (
    <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
        {console.log(user_ID, pwd)}
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>

  )

}
export default Signup;
