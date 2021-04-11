import React, {useState, useEffect} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
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
                        {/* 고객관리 */}
                        <NavItem>
                            <NavLinks to ='/manage'>고객관리</NavLinks>
                        </NavItem>
                        {/* 방관리 */}
                        <NavItem>
                            <NavLinks to ='/manage/room'>방관리</NavLinks>
                        </NavItem>
                        {/* 예약&리뷰 */}
                        <NavItem>
                            <NavLinks to ='/manage/reservation_review'>예약 & 리뷰</NavLinks>
                        </NavItem>
                        <NavItemBtn>
                            
                            <NavBtnLink>
                            <Button primary onClick={showModal}>
                            Log-Out
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
