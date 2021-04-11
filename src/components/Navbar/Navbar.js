import React, {useState, useEffect} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
import Signup from '../../components/Form/Signup'
import { Modal } from 'antd';
import {Button} from '../../globalStyles';
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
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    
    const handleClick = () => setClick(!click)

    const showButton = () => {
        if(window.innerwidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    useEffect(() => {
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
    setIsModalVisible(true);
    };

    const handleOk = () => {
    setIsModalVisible(false);
    };

    const handleCancel = () => {
    setIsModalVisible(false);
    };
  //

    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/" onClick={handleClick} click={click}>
                        <NavIcon />
                        Sinchon Stay
                    </NavLogo>
                    <MobileIcon onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </MobileIcon>
                    
                    
                    <NavMenu onClick={handleClick} click={click}>
                
                        {/* 첫화면 */}
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
                            <Button primary onClick={showModal}>
                            SIGN UP
                            </Button>
                            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                               
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
