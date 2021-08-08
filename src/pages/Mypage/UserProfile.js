import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Modal } from 'antd';
import { Button } from '../../globalStyles';

import UserProfileUpdateForm from './UserProfileUpdateForm';

function UserProfile() {
    /****** useState영역 ******/ 
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    let [ isModalVisible, setIsModalVisible ] = useState(false);

    let [ userProfile, setUserProfile ] = useState('');
    /*[END] useState영역 ******/ 


    /****** useEffect ******/
    useEffect(()=>{
        getUserProfile()
    }, []) 
    /*[END] useEffect ******/
    

    /* Modal창 조작 함수 */
    const handleClick = () => setClick(!click);  // 기본값이 false

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    /* [END] Modal창 조작 함수 */

    /* UserProfile API */
    function getUserProfile() {
        axios.get(
            "http://localhost:8080/user/profile"
            , { headers : { 
                    'Authorization': localStorage.getItem("authToken") 
                    }
              }
        ).then((response)=>{
            console.log(response);
            setUserProfile(response.data);
        })
    }


    return (
        <div>
            <h2>My Profile</h2>
            
            <div>First name<span>{userProfile.firstname}</span></div> 
            <div>Last name<span>{userProfile.lastname}</span></div>
            <div>Gender<span>{userProfile.sex}</span></div>
            <div>Country<span>{userProfile.country}</span></div>
            <div>Age Group<span>{userProfile.age_group}</span></div>
            <div>Allergy info<span>{userProfile.NA_foods}</span></div>
        
            <Button onClick={showModal}>Update Profile</Button>

            {/* Modal창 */}
            <Modal 
                title="Update Profile" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={null}>
                <UserProfileUpdateForm
                    firstname   = {userProfile.firstname}
                    lastname    = {userProfile.lastname}
                    sex         = {userProfile.sex}
                    country     = {userProfile.country}
                    age_group   = {userProfile.age_group}
                    NA_foods    = {userProfile.NA_foods}
                    closeModal  = {closeModal}    
                />
            </Modal>
        
        </div>
    );
}

export default UserProfile
