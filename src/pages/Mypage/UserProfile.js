import React, { useState, useEffect } from 'react';
import axios from 'axios';


function UserProfile() {
    let [ userProfile, setUserProfile ] = useState('');

    useEffect(()=>{
        getUserProfile()
    }, []) 

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
        </div>
    );
}

export default UserProfile
