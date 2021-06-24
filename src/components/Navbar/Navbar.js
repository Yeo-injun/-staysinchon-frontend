/* eslint-disable */

import React, {useState, useEffect} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
import Signup from '../../components/Form/Signup' // 로그인 화면 컴포넌트
import { Modal } from 'antd';
import { Button } from '../../globalStyles';
import axios from 'axios';
import {
    Nav,
    NavbarContainer,
    NavLogo, 
    NavIcon, 
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavLinks, 
    NavItemBtn, 
    NavBtnLink} from './Navbar.elements';


const Navbar = () => {

    /************** useState영역 *******************/ 
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    let [isModalVisible, setIsModalVisible] = useState(false); // Modal 상태
    let [ isLogin, setIsLogin ] = useState(false);
    /************** useState영역 [끝] **************/ 
    
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

    const showButton = () => {
        if(window.innerwidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }
    
    // 로그인 여부 확인
    const checkLogin = () => {
        let authToken = localStorage.getItem('authToken');
        if (authToken != null && authToken != '') {
            setIsLogin(true);
        }
    }

    // 로그아웃 요청
    const callLogout = () => {
        alert("로그아웃 요청을 매핑시켜주세요!");
    }
    

    /************** useEffect 영역 ************************/ 
    useEffect(() => {
        showButton();
        checkLogin();
    }, []);
    /************** useEffect 영역 [끝] *******************/ 

    window.addEventListener('resize', showButton);




  
    /************** HTML 화면 영역 **************/ 
    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <Nav>
                <NavbarContainer>
                    {/* 메인 로고 >> Main페이지로 접근 */}
                    <NavLogo to="/" onClick={handleClick} click={click}>
                        <NavIcon />
                        Sinchon Stay
                    </NavLogo>

                    <MobileIcon onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </MobileIcon>
                    
                    
                    <NavMenu onClick={handleClick} click={click}>
                
                        {/* 첫 화면 */}
                        <NavItem>
                            <NavLinks to ='/'>About</NavLinks>
                        </NavItem>
                        
                        {/* 예약하기 */}
                        <NavItem>
                            <NavLinks to ='/reservation'>Reservation</NavLinks>
                        </NavItem>

                        {/* 마이페이지 */}
                        <NavItem>
                            <NavLinks to ='/mypage'>mypage</NavLinks>
                        </NavItem>
                        
                        <NavItemBtn>
                            <NavBtnLink>
                            {/* 로그인 버튼 : 로그인시 사라짐*/}
                            { !isLogin && <Button primary onClick={ showModal }>         
                            SIGN UP
                            </Button> }

                            {/* 로그아웃 버튼 : 로그인시 나타남*/}
                            { isLogin && <Button onClick={ callLogout }>Log Out</Button>}

                            {/* 로그인 입력 Modal 팝업 */}
                            <Modal 
                                title="Login Form" 
                                visible={isModalVisible} 
                                onOk={handleOk} 
                                onCancel={handleCancel}
                                footer={null}>
                                {/* 로그인 완료시 모달을 종료하기 위해 props넘기기 */}
                                <Signup setIsModalVisible={setIsModalVisible} click={click}/>
                            </Modal>
                            </NavBtnLink>
                        </NavItemBtn>
                        </NavMenu>
                    
                </NavbarContainer>
            </Nav>
            </IconContext.Provider>  
        </>
    )
}

export default Navbar
