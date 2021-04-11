import React from 'react'
import {userOne, userTwo, userThree} from './UserData';
import UserInfoSection from '../../components/InfoSection/UserInfoSection';


const User = () => {
    return (
        <>
        <h1 style={{textAlign:'center', marginTop: '20px'}}>고객정보</h1>
        <UserInfoSection {...userOne}/>
        <UserInfoSection {...userTwo}/>
        <UserInfoSection {...userThree}/>
        </>
    )
}

export default User
