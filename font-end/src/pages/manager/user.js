import React, { Component  } from 'react';
import Navbar from '../component/navbar';
import MediaQuery from "react-responsive";
import { Button, Modal, Form, Input, message } from 'antd';
import { manager } from '../../services/api'
import styled from 'styled-components'
import edit from '../../assets/icon/edit.svg'
import trashIcon from '../../assets/icon/bin.svg'
import trash_comfirm from '../../assets/icon/trash_comfirm.svg'

const ContainerLayout = styled.div`
    display: flex;
    position: relative;
    padding: 3.5rem 5% 0 0;
    height: 100%;
`
const ContainerOption = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 3rem;
`
const ContainerHeader = styled.div`
    display: flex;
    justify-content: center;
    width : 70%;
`;

const Header = styled.div`
    display: flex;
    padding-left: 20%;
    justify-content: flex-end;
    font-size: 2rem;
`;

const CompetitionStyled = styled.div`
    display: flex;
    width: 100%;
    height: 3rem;
    cursor: pointer;
`

const ContainerButton = styled.div`
    display: flex;
    justify-content: flex-end;
    width : 30%;
`;

const ContainerItems = styled.div`
    display: flex;
    flex-direction: column;
    height: 35rem;
    overflow: scroll;
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
    &:hover{
        background: #00B0FF;
        border-color: #fff;
        color: #fff;
    }
`

const TextOr = styled.div`
    width: 2rem;
    font-size: 1.25rem;
    font-weight: bold;
    padding-top: 5px;
    margin: 0 15px;
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
    width:  ${props => props.small? "12%": props.big? "20%": "16%"};;
    font-size: ${props => props.header? "16px": "14px"};
    font-weight: ${props => props.header? "bold": ""};
    border-bottom: ${props => props.item? "3px solid #E6E6E6": null};
    color: ${props => props.pendding ? "orange": props.pass ? "#10CC9F" :  props.notPass ? "red" : "black"  };
    cursor: ${props => props.option? "pointer": ""};
    :hover{
        background: ${props => props.edit? "#FFD085" : props.del ? "#FFB5B5": ""};
    }
`

const LitleSpace = styled.div`
    width: ${props => props.header ? "7rem": props.spaceName ? "1rem" : "5rem"};
`

const FormAll = styled(Form)`
    width: 100%;
`
const StyledModal = styled(Modal)`
    margin-top: ${props => props.edit ? "-2rem" : props.add ? "-2rem": ""};
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

const Text = styled.div`
    display: flex;
    justify-content: ${props => props.caption ? "center":"flex-start"};
    font-size: ${props => props.caption ? "2rem":"1rem"};
    margin-bottom: 0.5rem;
`;

const ContainerSubmit = styled.div`
    display:flex;
    justify-content: center;
    width: 100%;
    margin-top: ${props => props.del ? "1rem":"2rem"};
    margin-bottom: ${props => props.del ? "0.5rem":""};
`


const ContainerAllItems = styled.div`
    display: flex;
    :hover{
        background: #F0F0F0;
    }
`


const ContainerPicture = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`

const Menu = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    background: ${props => props.competition_name ? "#FF5050" : "#F9A826"};
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    padding: 1rem;
    cursor: ${props => props.competition_name ? "" : "pointer"};
    :hover{
        background: ${props => props.competition_name ? "" : "#FF9D00"};
    }
`

const ContainerDisplay = styled.div`
    display:flex;
    flex-direction: column;
    margin-left: 5%;
    width: 80%;
`

const ContainerMenu = styled.div`
    display:flex;
    flex-direction: column;
    width: 20%;
`

const MenuTextStyled = styled.div``

const ContainerConfigGate = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 35rem;
`


class user extends Component {
    formRef = React.createRef();

    constructor(props){
        super(props);
        this.fetchAllUser();
        this.fetchCompetition();
        this.state = {
            isUserMode : false,
            competition_name: "",
            competition_index: "",
            nameTitle: "",
            firstName: "",
            lastName: "",
            gender: "",
            tag: "",
            status: "Pending",
            visible: false,
            visibleEdit: false,
            visibleDel: false ,
            userIndex: "",
            user: []
        }
        this.handleDel = this.handleDel.bind(this);
    }


    handleCancel = () => {
        this.setState({ 
            visible: false 
        });
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    onFinish = (values) => {
        this.setState(values);
        this.handleAddUser();
    }

    handleAddUser(){
        let competition_index = window.location.pathname.split("=")[1];
        const payload = {
            competition_index: competition_index,
            name_title: this.state.nameTitle,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            gender: this.state.gender,
            tag_name: this.state.tag,
        };

        manager.addUser(
            payload,
            ({ data }) => {
                this.setState({ 
                    visible: false,
                    nameTitle: "",
                    firstName: "",
                    lastName: "",
                    gender: "",
                    tag: ""
                });
                message.success("Add user is success");
                this.formRef.current.resetFields();
                this.fetchAllUser();
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        );
    } 

    fetchAllUser () {
        let competition_index = window.location.pathname.split("=")[1];
        manager.fetchAllUser(
            competition_index,
            ({ data }) => {
                this.setState({
                    user: data.user
                });
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        );
    }

    fetchCompetition() {
        let competition_index = window.location.pathname.split("=")[1];
        manager.fetchCompetition(
            competition_index,
            ({ data }) => {
                console.log(data.competition.competition_name)
                this.setState({
                    competition_name: data.competition.competition_name
                });
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        );
    }

    showModalEdit = (userIndex) => {
        console.log(userIndex)
        this.setState({
            visibleEdit: true,
            userIndex: userIndex
        })
        manager.fetchUser(
            userIndex,
            ({ data }) => {
                this.formRef.current.setFieldsValue({
                    nameTitle: data.user.name_title,
                    firstName: data.user.first_name,
                    lastName: data.user.last_name,
                    gender: data.user.gender,
                    status: data.user.status,
                    tag: data.user.tag_name
                });
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        )
    }

    handleCancelEdit  = () => {
        this.setState({ 
            visibleEdit: false 
        });
    }

    showModalDel = (userIndex) => {
        this.setState({
            visibleDel: true,
            userIndex: userIndex
        });
    }

    handleDel(){
        let user_index = this.state.userIndex;
        console.log(user_index)
        manager.deleteUser(
            user_index ,
            ({ data }) => {
                console.log(data);
                this.setState({ 
                    visibleDel: false 
                });
                message.success("Delete user success");
                this.fetchAllUser();
            },
            (response) => {
                console.log(response.data.message);
            }
        );
    }

    handleCancelDel= () => {
        this.setState({ 
            visibleDel: false 
        });
    }

    editUser = (values) => {
        console.log(values)
        this.setState(values);
        this.updateUser();
    }

    updateUser(){
        let user_index = this.state.userIndex;
        let competition_index = window.location.pathname.split("=")[1];
        console.log(user_index)
        const payload = {
            competition_index: competition_index,
            name_title: this.state.nameTitle,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            gender: this.state.gender,
            tag_name: this.state.tag,
            status: this.state.status
        };

        console.log(payload)
        manager.updateUser(
            user_index,
            payload,
            ({ data }) => {
                this.setState({ 
                    nameTitle: "",
                    firstName: "",
                    lastName: "",
                    gender: "",
                    tag: "",
                    status: "Pending",
                    visibleEdit: false 
                });
                message.success("Edit user success");
                this.fetchAllUser();
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        );
    }

    handleMenuClick = (values) => {
        this.setState({
            status: values.key
        });
    }

    changeModeUser = () => {
        this.setState({
            isUserMode : true
        });
    }

    changeModeGate = () => {
        this.setState({
            isUserMode : false
        });
    }

    isUserMode = () => {
        return(
            <>
                <StyledModal
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            title={null}
                            footer= {null}
                            add
                        >
                            <Text caption >User</Text>
                            <FormAll onFinish={this.onFinish}  ref={this.formRef}>
                                <Text>Name title</Text>
                                    <Form.Item name="nameTitle" rules={[{ required: true, message: 'Missing name title' }]} >
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true" />
                                    </Form.Item>
                                <Text>First name</Text>
                                    <Form.Item name="firstName" rules={[{ required: true, message: 'Missing first name' }]}>
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/>
                                    </Form.Item>
                                <Text>Last name</Text>
                                    <Form.Item  name="lastName" rules={[{ required: true, message: 'Missing last name' }]}>
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/>
                                    </Form.Item>
                                <Text>Gender</Text>
                                    <Form.Item  name="gender" rules={[{ required: true, message: 'Missing gender' }]}>
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/>
                                    </Form.Item>
                                <Text>Tag</Text>
                                    <Form.Item  name="tag" rules={[{ required: true, message: 'Missing tag' }]}>
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
                                        >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </ContainerSubmit>
                            </FormAll>
                    </StyledModal>
    
                    <StyledModal
                        visible={this.state.visibleEdit}
                        onCancel={this.handleCancelEdit}
                        title={null}
                        footer= {null}
                        edit
                    >
                        <Text caption >Edit User</Text>
                        <FormAll onFinish={this.editUser} autoComplete="off"  ref={this.formRef}>
                                <Text>Name title</Text>
                                    <Form.Item name="nameTitle" rules={[{ required: true, message: 'Missing name title' }]} initialValue={this.state.nameTitle} >
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/> 
                                    </Form.Item>
                                <Text>First name</Text>
                                    <Form.Item name="firstName" rules={[{ required: true, message: 'Missing first name' }]} initialValue={this.state.firstName}>
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/>
                                    </Form.Item>
                                <Text>Last name</Text>
                                    <Form.Item  name="lastName" rules={[{ required: true, message: 'Missing last name' }]} initialValue={this.state.lastName}>
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true" />
                                    </Form.Item>
                                <Text>Gender</Text>
                                    <Form.Item  name="gender" rules={[{ required: true, message: 'Missing gender' }]} initialValue={this.state.gender}>
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true" />
                                    </Form.Item>
                                <Text>Tag</Text>
                                    <Form.Item  name="tag" rules={[{ required: true, message: 'Missing tag' }]} initialValue={this.state.tag}>
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true" />
                                    </Form.Item>
                                <ContainerSubmit>
                                    <Form.Item>
                                        <Button key="back" style={{borderRadius:'2rem', background: '#E5E5E5', fontSize: '18px', height: '2.5rem'}} onClick={this.handleCancelEdit}>
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
    
                        <ContainerDisplay>
                            <MediaQuery minDeviceWidth={680}>
                                    <ContainerOption>
                                        <ContainerHeader>
                                            <Header>Users</ Header>
                                        </ContainerHeader>
                                        <ContainerButton>
                                            <StyledButton style={{ width: "10rem"}}>Upload user</StyledButton>
                                            <TextOr>OR</TextOr>
                                            <StyledButton onClick={this.showModal} style={{ width: "6rem", }}>ADD</StyledButton>
                                        </ContainerButton>
                                    </ContainerOption>
                                    <ContainerTable>
                                        <HeaderText  header >No.</HeaderText>
                                        <HeaderText  header >Name title</HeaderText>
                                        <HeaderText  header big>First name</HeaderText>
                                        <HeaderText  header >Last name</HeaderText>
                                        <HeaderText  header >Gender</HeaderText>
                                        <HeaderText  header >Tag</HeaderText>
                                        {/* <HeaderText  header >Status</HeaderText> */}
                                        <HeaderText  header >Edit</HeaderText>
                                        <HeaderText  header >Delete</HeaderText>
                                    </ContainerTable>
                                    <ContainerItems>
                                        {
                                            this.state.user.map((user, index) => {
                                                return(
                                                    <ContainerAllItems>
                                                        <CompetitionStyled key={index+1}>
                                                            <HeaderText item style={{paddingRight: "10px"}}>{index+1}</HeaderText>
                                                            <HeaderText item >{user.name_title}</HeaderText>
                                                            <HeaderText item big >{user.first_name}</HeaderText>
                                                            <HeaderText item >{user.last_name}</HeaderText>
                                                            <HeaderText item >{user.gender}</HeaderText>
                                                            <HeaderText item >{user.tag_name}</HeaderText>
                                                            {/* <HeaderText item style={{paddingRight: "10px", fontWeight: "bold"}} pendding>{user.status}</HeaderText> */}
                                                        </CompetitionStyled>
                                                        <HeaderText option edit item  onClick={() => this.showModalEdit(user.index)}>
                                                            <img src={edit} alt={edit}></img>
                                                        </HeaderText>
                                                        <HeaderText option del item  onClick={() => this.showModalDel(user.index)}>
                                                            <img src={trashIcon} alt={trashIcon}></img>
                                                        </HeaderText>
                                                    </ContainerAllItems>
                                                )
                                            })
                                        }
                                    </ContainerItems>
                                </MediaQuery>
                        </ContainerDisplay>
            </>
        )
    }

    isGatemode = () => {
        return(
            <>
               <ContainerDisplay>
                    <MediaQuery minDeviceWidth={680}>
                        <ContainerOption >
                                <ContainerHeader>
                                    <Header>Gate</ Header>
                                </ContainerHeader>
                                <ContainerButton>
                                    <StyledButton style={{ width: "6rem"}}>EDIT</StyledButton>
                                    <TextOr>OR</TextOr>
                                    <StyledButton style={{ width: "6rem", }}>ADD</StyledButton>
                                </ContainerButton>
                        </ContainerOption>

                        <ContainerConfigGate>
                            <div style={{display: "flex", justifyContent: "space-between" , alignItems: "center", width: "100%", fontSize: "1.5rem", height: "2.5rem",
                                        background: "#FFD085", paddingLeft: "10%", paddingRight: "10%", marginTop: "2rem" }}>
                                <div style={{fontSize: "1rem", fontWeight: "bold"}}>
                                    Gate No.
                                </div>
                                <div style={{fontSize: "1rem", fontWeight: "bold", marginRight: "1rem"}}>
                                    IP Address
                                </div>
                                <div style={{fontSize: "1rem", fontWeight: "bold"}}>
                                    Used
                                </div>
                                <div style={{fontSize: "1rem", fontWeight: "bold"}}>
                                    Delete
                                </div>
                            </div>
                            <div style={{display: "flex", justifyContent: "flex-start" , width: "100%", fontSize: "1.5rem",   }}>Config</div>
                            <div style={{display: "flex", justifyContent: "flex-start" , width: "100%", fontSize: "1.5rem",   }}>Config</div>
                        </ContainerConfigGate>
                        
                    </MediaQuery>
                </ContainerDisplay>
            </>
        )
    }

    render() {
        return (
            <ContainerLayout>
                <Navbar/>
                <ContainerMenu>
                    <Menu competition_name style={{ marginTop: '1.75rem',  width: '100%'}} onClick={this.changeModeUser}>
                        <MenuTextStyled style={{ fontFamily: "Roboto", width: '100%' , fontWeight: 'bold',  
                                                fontSize: '1.35rem', color: 'white'}} >
                            {this.state.competition_name}
                        </MenuTextStyled>
                    </Menu>
                    <Menu style={{ marginTop: '2rem',  width: '70%'}} onClick={this.changeModeUser}>
                        <MenuTextStyled style={{ fontFamily: "Roboto", width: '100%' , fontWeight: 'bold',  
                                                fontSize: '1.25rem', color: 'white'}} >
                            Users
                        </MenuTextStyled>
                    </Menu>

                    <Menu style={{ marginTop: '2rem',  width: '70%'}} onClick={this.changeModeGate}>
                        <MenuTextStyled style={{ fontFamily: "Roboto", width: '100%' , fontWeight: 'bold',  
                                                fontSize: '1.25rem', color: 'white'}}  
                                                >
                            Gates
                        </MenuTextStyled>
                    </Menu>
                </ContainerMenu>
                    {
                        this.state.isUserMode ? this.isUserMode() : this.isGatemode() 
                    }
            </ContainerLayout>
        );
    }
}

export default user;