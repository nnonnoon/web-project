import React from 'react';
import styled from 'styled-components'
import login_pic from '../assets/icon/login.png'
import {TextField, Button} from '@material-ui/core';

const Mainbox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  height: 40.125rem;
  width: 30rem;
  background: rgba(0, 176, 255, 0.52);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  position: absolute;
  border-radius: 2.8125rem;
`;


const Flexbox = styled.div`
  width: 100%;
  /* background: ${(props) =>
    props.left
      ? "linear-gradient(8.65deg, #2D95A8 -0.2%, #000000 117.76%)"
      : " white;"}; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 4rem;
`;

const Text = styled.div`
    font-family: "Roboto";
`;

const StylesTextField = styled(TextField)`
    &&{
        width: 100%;
        margin-top: 2rem;
        color: white;
    }
    & .MuiInput-underline::before{
        height: 0.5rem;
        border-bottom-color: white;
    }
    & .MuiInputLabel-formControl{
        color: #fff;
    }
`

const StyledButton = styled(Button)`
    &&{
        background-color: #00B0FF;
        color: #fff;
        padding: 7px 14px;
        width: 40%;
        font-family: "Roboto";
        font-size: 1.25rem;
        margin-top: 3rem;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    }
    &:hover {
        background-color: white;
    }
`;


export default function login(){
    return (
        <Mainbox>
            <Box>
                <Flexbox>
                    <Text style={{ color: '#FFFFFF', fontSize: '5.5rem', fontWeight: 'bold', fontStyle: 'italic'}}>Running</Text>
                    <img src={login_pic} alt={login_pic} style={{width: '10.625rem', height: '10rem', marginTop: '1rem'}} ></img>
                    <Text style={{ color: 'black', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem'}}>WELCOME</Text>
                    <StylesTextField InputProps={{style: {color: "black"}}} label="Username"/>
                    <StylesTextField InputProps={{style: {color: "black"}}} label="Password"/>
                    <StyledButton>Login</StyledButton>
                </Flexbox>
            </Box>
        </Mainbox>
    );
}
