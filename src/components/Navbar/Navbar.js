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
    /************** useState영역 [끝] **************/ 
    

    const handleClick = () => setClick(!click)

    const showButton = () => {
        if(window.innerwidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    /************** useEffect 영역 ************************/ 
    useEffect(() => {
        showButton()
    }, []);
    /************** useEffect 영역 [끝] *******************/ 

    window.addEventListener('resize', showButton);

    
    

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
  
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
                            {/* 로그인 버튼 */}
                            <Button primary onClick={ showModal }>
                            SIGN UP
                            </Button>

                            {/* 로그인 입력 Modal 팝업 */}
                            <Modal 
                                title="Login" 
                                visible={isModalVisible} 
                                onOk={handleOk} 
                                onCancel={handleCancel}
                                footer={null}>
                                {/* 로그인 완료시 모달을 종료하기 위해 props넘기기 */}
                                <Signup setIsModalVisible={setIsModalVisible}/>
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
