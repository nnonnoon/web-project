import React, { Component } from 'react';
import styled from 'styled-components'
import Navbar from '../component/navbar';
import MediaQuery from "react-responsive";
import { Button, Modal, Form, Input, Dropdown, Menu, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const ContainerLayout = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 3.5rem 10% 0 10%;
`

const ContainerOption = styled.div`
    display: flex;
    justify-content: flex-end;
    background: red;
`
const StyledButton = styled(Button)`
    display:flex;
    justify-content: center;
    position: relative;
    margin-top: 3rem;
    border-radius: 2.8125rem;
    cursor: pointer;
    background: #7FD2F8;
    color: #fff;
    font-family: "Roboto";
    font-weight: bold;
    font-size: 16px;
    width: 5rem;
    &:hover{
        background: #00B0FF;
        border-color: #fff;
        color: #fff;
    }
`

const StyledModal = styled(Modal)`
    .ant-modal-content{
        background: #7FD2F8;
        border-radius: 2rem;
    }
    .ant-modal-close-x{
        position:relative;
        top: 10px;
        right: 10px;
    }
`

const Text = styled.div`
    display: flex;
    justify-content: ${props => props.caption ? "center":"flex-start"};
    font-size: ${props => props.caption ? "2rem":"1rem"};
    margin-bottom: 0.5rem;
`;

const FormAll = styled(Form)`
    width: 100%;
`
const LitleSpace = styled.div`
    width: 5rem;
`

const ContainerSubmit = styled.div`
    display:flex;
    justify-content: center;
    width: 100%;
    margin-top: 2rem;
`


class competition extends Component {

    constructor(props){
        super(props);
        this.state = {
            competitionName: "",
            location: "Insee Chantarasatit Stadium",
            date: "",
            visible: false,
            loading: false
        }
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    handleOk = () => {
        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState({
                loading: false, 
                visible: false 
            });
        }, 1000);
    }

    handleCancel = () => {
        this.setState({ 
            visible: false 
        });
    }

    onFinish = (values) => {
       this.setState(values);
       this.check();
    }

    check(){
        const payload = {
            competitionName: this.state.competitionName,
            location: this.state.location,
            date: this.state.date
          };
        console.log(payload);
    }

    handleMenuClick = (values) => {
        this.setState({
            location: values.key
        });
    }

    onChange = (data ,dateString) => {
        this.setState({
            date: dateString
        });
    }
      
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="Insee Chantarasatit Stadium" >
                Insee Chantarasatit Stadium
              </Menu.Item>
              <Menu.Item key="Computer Engineering" >
                Computer Engineering
              </Menu.Item>
            </Menu>
        );

        return (
            <ContainerLayout>
                <Navbar/>
                <StyledModal
                    visible={this.state.visible}
                    onOK={this.handleOK}
                    onCancel={this.handleCancel}
                    title={null}
                    footer= {null}
                >
                        <Text caption >Competition</Text>
                        <FormAll onFinish={this.onFinish} >
                            <Text>Competition Name</Text>
                            <Form.Item name="competitionName">
                                <Input style={{borderRadius:'2rem'}}/>
                            </Form.Item>
                            <Text>Location</Text>
                                <Form.Item>
                                    <Dropdown overlay={menu} >
                                        <Button style={{width:'100%', borderRadius:'2rem'}}>
                                            {this.state.location} <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                </Form.Item>
                            <Text style={{ marginTop: '24px'}}>Date</Text>
                               <Form.Item> <DatePicker style={{width:'100%', cursor: 'pointer', borderRadius:'2rem'}} onChange={this.onChange}/></Form.Item>
                            <ContainerSubmit>
                                <Form.Item>
                                    <Button key="back" style={{borderRadius:'2rem', background: '#E5E5E5'}} onClick={this.handleCancel}>
                                        cancle
                                    </Button>
                                </Form.Item>
                                <LitleSpace/>
                                <Form.Item>
                                    <Button key="submit"  htmlType="submit"  style={{borderRadius:'2rem', background: '#F9A826', color: 'black'}}loading={this.state.loading} onClick={this.handleOk}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </ContainerSubmit>
                        </FormAll>
                </StyledModal>
                <MediaQuery minDeviceWidth={680}>
                    <ContainerOption>
                        <StyledButton onClick={this.showModal}>ADD</StyledButton>
                    </ContainerOption>
                </MediaQuery>
            </ContainerLayout>
        );
    }
}

export default competition;