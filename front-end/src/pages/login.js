import React, { Component } from 'react';
import styled from 'styled-components'
import login_pic from '../assets/icon/login.png'
import { Form, Button, Input, message } from "antd";
import { authentication } from "../services/api"
import { subDomain } from "../services/redirect"

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 4rem;
  justify-content: center;
`;

const FormAll = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    &.ant-form label {
        font-weight: 500;
    }
`

const Text = styled.div`
    font-family: "Roboto";
`;

const Formitem = styled(Form.Item)`
    display: flex;
    border-radius: 1rem;
    align-items: center; 
    justify-content: center;
    margin-top: 1rem;
    width: 100%;
`;
const StyledButton = styled(Button)`
    color: #fff;
    height: 100%;
    width: 40%;
    font-family: "Roboto";
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;
    border-radius: 1rem;
    background: #00B0FF;
    border-color: #00B0FF;
    cursor: pointer;
`;

class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            username: "",
            password: "",
            incorrect: false
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(){
        const payload = {
            username: this.state.username,
            password: this.state.password,
        };
        console.log(payload);

        authentication.Login(
            payload,
            ({ data }) => {
                console.log(data);
                localStorage.setItem("access-token", data.accessToken);
                localStorage.setItem("refresh-token", data.refreshToken);
                this.confirmLogin();
            },
            (response) => {
                console.log(response.data.message);
                if (response && response.status === 400) {
                    this.setState({
                        incorrect: true,
                    });
                    message.error("Login failed");
                  }
            }
        );
    } 

    onFinish = (values) => {
        console.log(values)
        this.setState(values);
        this.handleLogin();
    }

    confirmLogin() {
        message.success("Login successful");
        let secondsToGo = 1;
        const timer = setInterval(() => {
          secondsToGo -= 1
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          window.location = `${subDomain}/competition`
        }, secondsToGo * 1000);
    }

    render() {
        return (
            <Mainbox>
                <Box>
                    <Flexbox>
                        <Text style={{ color: '#FFFFFF', fontSize: '5.5rem', fontWeight: 'bold', fontStyle: 'italic'}}>Running</Text>
                        <img src={login_pic} alt={login_pic} style={{width: '10.625rem', height: '10rem', marginTop: '0.2rem'}} ></img>
                        <Text style={{ color: 'black', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '1rem'}}>WELCOME</Text>
                        <FormAll layout="vertical" onFinish={this.onFinish}>
                            <Text style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 'bold', marginLeft: '-17.5rem', marginBottom: '-0.5rem'}}>username</Text>
                            <Formitem  name="username">
                                <Input />
                            </Formitem>
                            <Text style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 'bold', marginLeft: '-17.5rem', marginBottom: '-0.5rem'}}>password</Text>
                            <Formitem name="password" style={{ marginBottom: '0' }}>
                                <Input.Password />
                            </Formitem>
                            <Formitem>
                                <StyledButton  htmlType="submit">Login</StyledButton>
                            </Formitem>
                        </FormAll>
                    </Flexbox>
                </Box>
            </Mainbox>
        );
    }
}
export default Login;
