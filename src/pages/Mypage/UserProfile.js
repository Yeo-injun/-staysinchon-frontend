import React, { useState, useEffect } from 'react';
import axios from 'axios';


function UserProfile() {

    return (
        <div>
            <h2>My Profile</h2>
            
            <div>First name<span>YEO</span></div> 
            <div>Last name</div>
            <div>Gender</div>
            <div>Country</div>
            <div>Age Group</div>
            <div>Allergy info</div>
        </div>
    );
}

export default UserProfile
