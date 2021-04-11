import React from 'react'
import { Button } from 'antd';
import {
    Img,
    InfoContainer,
    TextWrapper,
    TopLine,
    Subtitle,
} from './RowInfoSection.elements';

const UserInfoSection = ({
    user_img,
    alt,
    firstname,
    lastname,
    reserved_count,
    country,
    age_group,
    NA_foods,
    email,
    sex,
    etc_info
}) => {
    return (
        <>
        <InfoContainer>
            <Img src = {user_img} alt={alt} />
            <TextWrapper>
            <TopLine>
                이름 : {firstname} {lastname}<br/>______
            </TopLine>
            <Subtitle>예약횟수: {reserved_count}</Subtitle>
            <Subtitle>국가: {country}</Subtitle>
            <Subtitle>연령대: {age_group}</Subtitle>
            <Subtitle>성별: {sex}</Subtitle>   
            <Subtitle>알레르기: {NA_foods}</Subtitle>
            <Subtitle>이메일주소: {email}</Subtitle>
            <Subtitle>기타: {etc_info}</Subtitle>      
            <br/>
            <Button>수정하기</Button>
            <Button>남긴리뷰보기</Button>
            </TextWrapper>
        </InfoContainer>
        </>
    )
}

export default UserInfoSection
