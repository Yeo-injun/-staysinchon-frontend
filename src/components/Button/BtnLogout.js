/* eslint-disable */

import React, {useState, useEffect} from 'react'

import { Button } from '../../globalStyles';

function BtnLogout(props) {

    // 로그아웃 요청 : authToken 삭제
    const tryLogout = () => {
        localStorage.removeItem('authToken');
        history.push('/register'); // 로그아웃 후 redirect 설정...
    }

    return (
        <Button>
            LOG OUT
        </Button>
    )
}

export default BtnLogout