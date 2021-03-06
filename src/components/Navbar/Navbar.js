/* eslint-disable */

import React, {useState, useEffect} from 'react'

import BtnLogin from '../../components/Button/BtnLogin'; // 로그인 버튼 컴포넌트

import {FaBars, FaTimes} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'

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

    let [ authToken, setAuthToken ] = useState(null); // 로그인여부 체크
    /************** useState영역 [끝] **************/ 

    /************** 변수 영역 *******************/
    /************** 변수 영역 [끝] *******************/

    const handleClick = () => setClick(!click);  // 기본값이 false

    // 화면크기에 따라 버튼 노출 여부 결정
    const showButton = () => {
        if(window.innerwidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    /************** useEffect 영역 ************************/ 
    // useEffect의 호출은 2번째 parameter값에 따라 달라짐
    // 특정 useState값이 변화할때마다 useEffect를 호출하고자 할경우
    // 2번째 parameter값에 해당 useState명을 입력
    // 모든 useState값에 대해 useEffect를 호출하고자 할 경우에는 [] 입력.
    useEffect(() => {
        showButton();
    }); 
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
                
                        {/* 첫 화면으로 이동 */}
                        <NavItem>
                            <NavLinks to ='/'>About</NavLinks>
                        </NavItem>
                        
                        {/* 예약하기 화면으로 이동 */}
                        <NavItem>
                            <NavLinks to ='/reservation'>Reservation</NavLinks>
                        </NavItem>

                        {/* 마이페이지 화면으로 이동 */}
                        <NavItem>
                            <NavLinks to ='/mypage'>Mypage</NavLinks>
                        </NavItem>
                        
                        <NavItemBtn>
                            <BtnLogin authToken={authToken}/>
                        </NavItemBtn>
                    </NavMenu>
                    
                </NavbarContainer>
            </Nav>
            </IconContext.Provider>  
        </>
    );
}

export default Navbar
