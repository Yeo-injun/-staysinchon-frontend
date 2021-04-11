import styled from 'styled-components';

export const InfoContainer = styled.div`
  display: flex;
  position: relative;
  margin: 20px auto;
  padding: 20px;
  max-width: 890px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
`
export const Img = styled.img`
/* padding-right: 0;
border: 0;
max-width: 100%;
vertical-align: middle;
display: inline-block; */
  max-height: 240px;
  max-width: 390px;
  border-radius: 10px;
  overflow: hidden;
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 20px;
  text-align: left;
`
export const TopLine = styled.div`
    width: 30vw;
    font-weight: 300;
    margin-top: 10px;
`
export const Subtitle = styled.div`
    width: 30vw;
  margin-top: 10px;
  font-size: 13px;
  color: gray;
`

export const Price = styled.div`
text-align: right;
font-weight: 1000;

`
