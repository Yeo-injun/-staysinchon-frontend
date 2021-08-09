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

    let [ checkResult, setCheckResult ] = useState(false);
    let [ userProfile, setUserProfile ] = useState('');
    /*[END] useState영역 ******/ 


    /****** useEffect ******/
    useEffect(()=>{
        getUserProfile()
    }, []) 
    /*[END] useEffect ******/
    

    /* Modal창 조작 함수 */
    const handleClick = () => setClick(!click);  // 기본값이 false

    /* 프로필 업데이트 버튼 클릭시 비밀번호 확인 */
    const showModal = async () => {
        let password = prompt("Please input your password for updating your profile");
        let isCorrect = await checkPassword(password); // 동기 처리 
        console.log("API결과", isCorrect);

        if (isCorrect) {        
            setIsModalVisible(true);
        } else {
            alert("Check your password");
        }
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

    /* UserProfile GET API */
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

    /* 수정전 비밀번호 확인 */
    async function checkPassword(password) {
        let result;
        console.log("API호출", result);

        // 비밀번호 검증하기
        await axios.post(
            "http://localhost:3000/user/profile/check"
            , {
                "pwd" : password
              }
            , { headers : { 
                            'Authorization': localStorage.getItem("authToken") 
                            }
               }
        ).then((response)=>{
            console.log(response);
            result = response.data;
        })
        console.log("API종료", result);
        return result;

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
        
            <Button onClick={showModal}>Profile Update</Button>

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
