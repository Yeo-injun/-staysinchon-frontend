/* eslint-disable */

import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'; // 특정경로로 이동시키기 위한 함수

import Signup from '../../components/Form/Signup' // 로그인 화면 컴포넌트

import { Modal } from 'antd';
import { Button } from '../../globalStyles';

import axios from 'axios';

function BtnLogin(props) {
  
    /************** useState영역 *******************/ 
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    let [isModalVisible, setIsModalVisible] = useState(false); // Modal 상태
    let [ isLogin, setIsLogin ] = useState(false); // 기본값 : 회원정보 없는 상태
    /************** useState영역 [끝] **************/ 

    /************** 변수 영역 *******************/
    let history = useHistory();
    /************** 변수 영역 [끝] *******************/

    const handleClick = () => setClick(!click);  // 기본값이 false

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


  // 로그아웃 요청 : authToken 삭제
  const tryLogout = () => {
      localStorage.removeItem('authToken');
      history.push('/'); // 로그아웃 후 redirect 설정...
  }

  /************** useEffect 영역 ************************/ 
  useEffect(() => {
    if (props.authToken != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }); // 로그인 상태를 확인하여 rendering을 진행해야 하기 때문에 2번째 인자값 제거  /************** useEffect 영역 [끝] *******************/ 


  /************** HTML 화면 영역 **************/ 

  if (isLogin) {
  /* 로그인 상태 : LOG OUT버튼 노출 */
    return <Button onClick={ tryLogout }>LOG OUT</Button>;
  } 

  /* 비로그인 상태 : LOG IN버튼 노출 */
  return (
  <>
  <Button onClick={ showModal }>LOG IN</Button>

  {/* 로그인 Modal 팝업 */}
  <Modal 
      title="Login Form" 
      visible={isModalVisible} 
      onOk={handleOk} 
      onCancel={handleCancel}
      footer={null}>
      {/* 로그인 완료시 모달을 종료하기 위해 props넘기기 */}
      <Signup setIsModalVisible={setIsModalVisible} click={click}/>
  </Modal>
  </>
  );
}

export default BtnLogin

