import React, { Component } from 'react';
import styled from 'styled-components'
import login_pic from '../assets/icon/login.png'
import { Form, Button, Input } from "antd";
import { authentication } from "../services/api"

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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 4rem;
`;

const FormAll = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    position: relative;
    &.ant-form-horizontal{
        width: 0%
    }
`

const Text = styled.div`
    font-family: "Roboto";
`;

// const StylesTextField = styled(TextField)`
//     &&{
//         width: 100%;
//         margin-top: 2rem;
//         color: white;
//     }
//     & .MuiInput-underline::before{
//         height: 0.5rem;
//         border-bottom-color: white;
//     }
//     & .MuiInputLabel-formControl{
//         color: #fff;
//     }
// `

// const StyledButton = styled(Button)`
//     &&{
//         background-color: #00B0FF;
//         color: #fff;
//         padding: 7px 14px;
//         width: 40%;
//         font-family: "Roboto";
//         font-size: 1.25rem;
//         margin-top: 3rem;
//         box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
//     }
//     &:hover {
//         background-color: white;
//     }
// `;

const Formitem = styled(Form.Item)`
    display: flex;
    border-radius: 1rem;
    align-items: center; 
    justify-content: center;
    margin-top: 1rem;
    .ant-input{
        width: 21.5rem;
        height: 1rem;
        border-color: white;
    }
`;
const StyledButton = styled(Button)`
    color: #fff;
    padding: 7px 14px;
    width: 10rem;
    font-family: "Roboto";
    font-size: 1.25rem;
    margin-top: 2rem;
    border-radius: 1rem;
    background: #00B0FF;
    border-color: #00B0FF;
    cursor: pointer;
    .ant-click-animating-without-extra-node {
        border: none !important;
    }
`;


// const initialValues = {
//     username: '',
//     password: ''
// }

class Login extends Component {
// export default function Login(){

    // const [values, setValues] = useState(initialValues);

    // const handleInputChange = e => {
    //     const {name, value} = e.target;
    //     setValues({
    //         ...values,
    //         [name]:value
    //     })
    // }

    constructor(props){
        super(props);
        this.state ={
            username: "",
            password: "",
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
            }
        );
    } 

    onFinish = (values) => {
        this.setState(values);
        this.handleLogin();
    }

    render() {
        return (
            <Mainbox>
                <Box>
                    <Flexbox>
                        <Text style={{ color: '#FFFFFF', fontSize: '5.5rem', fontWeight: 'bold', fontStyle: 'italic'}}>Running</Text>
                        <img src={login_pic} alt={login_pic} style={{width: '10.625rem', height: '10rem', marginTop: '1rem'}} ></img>
                        <Text style={{ color: 'black', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '1rem'}}>WELCOME</Text>
                        <FormAll  onFinish={this.onFinish}>
                        {/* <StylesTextField InputProps={{style: {color: "black"}}} label="username" name="username" value={values.username} onChange={handleInputChange}/>
                        <StylesTextField InputProps={{style: {color: "black"}}} label="password" name="password" value={values.password} onChange={handleInputChange}/> */}
                            <Text style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 'bold', marginLeft: '-18rem', marginBottom: '-0.5rem'}}>username</Text>
                            <Formitem  name="username">
                                <Input/>
                            </Formitem>
                            <Text style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 'bold', marginLeft: '-18rem', marginBottom: '-0.5rem', marginTop: '1rem'}}>password</Text>
                            <Formitem name="password" >
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
