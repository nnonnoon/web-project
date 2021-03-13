import React, { Component } from 'react';
import styled from 'styled-components'
import Navbar from '../component/navbar';
import MediaQuery from "react-responsive";
import { Button, Modal, Form, Input, Dropdown, Menu, DatePicker, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { manager } from '../../services/api'
import trashIcon from '../../assets/icon/bin.svg';
import trash_comfirm from '../../assets/icon/trash_comfirm.svg'
import { subDomain } from '../../services/redirect'

const ContainerLayout = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 3.5rem 10% 0 10%;
`

const ContainerOption = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 3rem;
`
const StyledButton = styled(Button)`
    display:flex;
    justify-content: center;
    border-radius: 2.8125rem;
    cursor: pointer;
    background: #7FD2F8;
    color: #fff;
    font-family: "Roboto";
    font-weight: bold;
    font-size: 20px;
    height: 2.5rem;
    width: 6rem;
    &:hover{
        background: #00B0FF;
        border-color: #fff;
        color: #fff;
    }
`

const StyledModal = styled(Modal)`
    .ant-modal-content{
        background: rgba(163, 213, 252);
        border-radius: 2rem;
    }
    .ant-modal-close-x{
        position:relative;
        top: 10px;
        right: 10px;
    }
`

const ContainerHeader = styled.div`
    display: flex;
    justify-content: center;
    width : 90%;
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
`;

const ContainerButton = styled.div`
    display: flex;
    justify-content: flex-end;
    width : 10%;
`;

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
    width: ${props => props.header ? "7rem": props.spaceName ? "1rem" : "5rem"};
`

const ContainerSubmit = styled.div`
    display:flex;
    justify-content: center;
    width: 100%;
    margin-top: ${props => props.del ? "1rem":"2rem"};
    margin-bottom: ${props => props.del ? "0.5rem":""};
`

const ContainerTable = styled.div`
    display: flex;
    margin-top: 2rem;
    height: 2.5rem;
    background: #E6E6E6;
`

const HeaderText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:  ${props => props.small? "15%": props.big? "25%":  props.del? "10%": props.location? "30%"  : props.time? "%":"18%"};;
    font-size: ${props => props.header? "16px": "14px"};
    font-weight: ${props => props.header? "bold": ""};
    border-bottom: ${props => props.item? "3px solid #E6E6E6": null}; 
    cursor: ${props => props.del? "pointer": ""};
    :hover{
        background: ${props => props.del? "#FFB5B5": ""};
    }
`

const ContainerAllItems = styled.div`
    display: flex;
    :hover{
        background: #F0F0F0;
    }
`

const ContainerItems = styled.div`
    display: flex;
    flex-direction: column;
    height: 27rem;
    overflow: scroll;
`

const CompetitionStyled = styled.div`
    display: flex;
    height: 3rem;
    width: 90%;
    cursor: pointer;
`
const ContainerPicture = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`

class competition extends Component {
    formRef = React.createRef();

    constructor(props){
        super(props);
        this.fetchAllCompetition();
        this.state = {
            competitionName: "",
            location: "Seree Trairat",
            date: "",
            timeStart: "",
            timeEnd: "",
            visible: false,
            loading: false,
            competition: [],
            visibleDel: false,
            competition_index: ""
        }
        this.handleDel = this.handleDel.bind(this);
    }

    handleCompetition(){
        var jwt = require("jsonwebtoken");
        var token = localStorage.getItem("access-token");
        var data = jwt.decode(token);
        const payload = {
            index: data.login_index,
            competition_name: this.state.competitionName,
            location: this.state.location,
            date: this.state.date,
            time_start: this.state.timeStart,
            time_end: this.state.timeEnd,
        };

        console.log(payload)

        manager.addCompetition(
            payload,
            ({ data }) => {
                console.log(data);
                message.success("Add competition success");
                this.fetchAllCompetition();
            },
            (response) => {
                console.log(response.data.message);
            }
        );
    }

    fetchAllCompetition(){
        manager.fetchAllCompetition(
            ({ data }) => {
                const compet = data.competition
                console.log(compet);
                this.setState({
                    competition: compet
                });
            },
            (response) => {
                if (response && response.status === 400) {
                    console.log(response.data.message);
                }
            }
        );
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
       this.formRef.current.resetFields();
       this.handleCompetition();
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

    showModalDel = (competition_index) => {
        console.log(competition_index)
        this.setState({
            visibleDel: true,
            competition_index: competition_index
        });
    }

    handleCancelDel= () => {
        this.setState({ 
            visibleDel: false 
        });
    }

    handleDel(){
        let competition_index = this.state.competition_index
        manager.deleteCompetition(
            competition_index ,
            ({ data }) => {
                console.log(data);
                this.setState({ 
                    visibleDel: false 
                });
                message.success("Delete competition success");
                this.fetchAllCompetition();
            },
            (response) => {
                console.log(response.data.message);
            }
        );
    }

    handleLinkPage = (competition_index) => {
        window.location = `${subDomain}/competition/${competition_index}`
    }
      
    render() {
        const dateFormat = 'DD/MM/YYYY';
        const menu = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="Seree Trairat" >
                Seree Trairat
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
                        <FormAll onFinish={this.onFinish} autoComplete="off"  ref={this.formRef}>
                            <Text>Competition Name</Text>
                            <Form.Item name="competitionName">
                                <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/>
                            </Form.Item>
                            <Text>Location</Text>
                                <Form.Item rules={[{ required: true, message: 'Missing last name' }]}>
                                    <Dropdown overlay={menu}>
                                        <Button style={{width:'100%', borderRadius:'2rem', height: '2.5rem'}}>
                                            {this.state.location} <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                </Form.Item>
                            <Text style={{ marginTop: '24px'}}>Date</Text>
                               <Form.Item> 
                                    <DatePicker 
                                    style={{width:'100%', cursor: 'pointer', borderRadius:'2rem', height: '2.5rem'}} 
                                    onChange={this.onChange}
                                    format={dateFormat}
                                    />
                                </Form.Item>
                            <Text  style={{ marginTop: '15px'}}>Time-start</Text>
                            <Form.Item name= "timeStart"> 
                                <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/>
                            </Form.Item>
                            <Text  style={{ marginTop: '15px'}}>Time-end</Text>
                            <Form.Item  name= "timeEnd"> 
                                <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/>
                            </Form.Item> 
                            <ContainerSubmit>
                                <Form.Item>
                                    <Button key="back" style={{borderRadius:'2rem', background: '#E5E5E5', fontSize: '18px', height: '2.5rem'}} onClick={this.handleCancel}>
                                        Cancle
                                    </Button>
                                </Form.Item>
                                <LitleSpace/>
                                <Form.Item>
                                    <Button 
                                        key="submit"  htmlType="submit"  
                                        style={{borderRadius:'2rem', background: '#F9A826', color: 'black', fontSize: '18px', height: '2.5rem'}} 
                                        loading={this.state.loading} 
                                        onClick={this.handleOk}
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </ContainerSubmit>
                        </FormAll>
                </StyledModal>
                <StyledModal
                    visible={this.state.visibleDel}
                    onCancel={this.handleCancelDel}
                    title={null}
                    footer= {null}
                >
                    <ContainerPicture>
                        <img src={trash_comfirm} alt={trash_comfirm}/>
                    </ContainerPicture>
                    <Text caption >Confirm to delete ?</Text>
                    <ContainerSubmit del>
                        <Button key="back" style={{borderRadius:'2rem', background: '#E5E5E5', fontSize: '18px', height: '2.5rem'}} onClick={this.handleCancelDel}>
                                Cancle
                        </Button>
                        <LitleSpace/>
                        <Button 
                            key="submit"  htmlType="submit"  
                            style={{borderRadius:'2rem', background: '#F9A826', color: 'black', fontSize: '18px', height: '2.5rem'}} 
                            onClick={this.handleDel}
                        >
                            Submit
                        </Button>
                    </ContainerSubmit>
                </StyledModal>
                <MediaQuery minDeviceWidth={680}>
                    <ContainerOption>
                        <ContainerHeader>
                            <Header>Competition</ Header>
                        </ContainerHeader>
                        <ContainerButton>
                            <StyledButton onClick={this.showModal}>ADD</StyledButton>
                        </ContainerButton>
                    </ContainerOption>
                    <ContainerTable>
                        <HeaderText  header small>No.</HeaderText>
                        <HeaderText  header location style={{paddingLeft: "3%"}}>Competition name</HeaderText>
                        <HeaderText  header big style={{paddingLeft: "3%"}}>Location</HeaderText>
                        <HeaderText  header style={{paddingLeft: "3%"}}>Date</HeaderText>
                        <HeaderText  header style={{paddingLeft: "3%"}}>Time</HeaderText>
                        <HeaderText  header style={{paddingLeft: "3%"}}>Manager</HeaderText>
                        <HeaderText  header style={{paddingLeft: "3%"}}>Delete</HeaderText>
                    </ContainerTable>
                    <ContainerItems>
                        {
                            this.state.competition.map((competition, index) => {
                                return(
                                   <ContainerAllItems>
                                        <CompetitionStyled key={index+1} onClick={() => this.handleLinkPage(competition.index)}>
                                            <HeaderText item small >{index+1}</HeaderText>
                                            <HeaderText item big >{competition.competition_name}</HeaderText>
                                            <HeaderText item big>{competition.location}</HeaderText>
                                            <HeaderText item small>{competition.date}</HeaderText>
                                            <HeaderText item>{competition.time_start} : {competition.time_end}</HeaderText>
                                            <HeaderText item >
                                                {competition.manager_name_title}
                                                {competition.manager_first_name}
                                                <LitleSpace spaceName/>
                                                {competition.manager_last_name}
                                            </HeaderText>
                                        </CompetitionStyled>
                                        <HeaderText del item 
                                            onClick={() => this.showModalDel(competition.index)} >
                                            <img src={trashIcon} alt={trashIcon}></img>
                                        </HeaderText>
                                   </ContainerAllItems>
                                )
                            })
                        }
                    </ContainerItems>
                </MediaQuery>
            </ContainerLayout>
        );
    }
}

export default competition;