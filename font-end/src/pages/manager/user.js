import React, { Component  } from 'react';
import Navbar from '../component/navbar';
import MediaQuery from "react-responsive";
import { Button, Modal, Form, Input, message,  Dropdown, Menu } from 'antd';
import { manager } from '../../services/api'
import styled from 'styled-components'
import edit from '../../assets/icon/edit.svg'
import trashIcon from '../../assets/icon/bin.svg'
import trash_comfirm from '../../assets/icon/trash_comfirm.svg'
import { DownOutlined } from '@ant-design/icons';
import ReactFileReader from 'react-file-reader';

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
    margin-bottom: 2rem;
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

const MenuOption = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    background: ${props => props.competition_name ? "#FF5050" : 
                props.menu_users ?  "#FF9D00" :
                props.menu_gates ?  "#FF9D00" :
                props.menu_start ?  "#FF9D00" : "#FFD085"};
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
    height: auto;
`

const MenuTextStyled = styled.div``

const ContainerConfigGate = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 35rem;
`

const  ContainerAllGate = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    border-bottom: #FFD085 solid;
`

// const ContainerDelGate = styled.div`
//     display: flex;
//     align-items: center;
//     width: 20%;

// `

const GateStyle = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center;
    height: 3rem;
    font-size: "16px";
    width: 20% ;
    cursor: pointer;

    :hover{
        background: ${props => props.edit ? "#FFE4B8" : "#FFB5B5" } ;
    }
`

const ButtonOfCompetition = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%; 
    width: 20%; 
    font-size: 2rem;
    background-color: ${ props => props.started ? "#58D1B4": props.pause ? "#FFBD54" : props.reset? "#7FD2F8": "#FF6666"}; 
    color: white; 
    border-radius: 2rem;
    cursor: pointer;

    :hover{
        background: #E5E5E5;
        border-color: white 1rem;
        border-style: solid;
    }
`



class user extends Component {
    formRef = React.createRef();

    constructor(props){
        super(props);
        this.fetchAllUser();
        this.fetchCompetition();
        this.fetchAllGate();
        this.state = {
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
            user: [],
            gate: [],
            visibleGate: false,
            visibleGateEdit: false,
            visibleGateDel: false,
            gateIndex: "",
            gateNo: "",
            gateIP: "",
            used: "Not Used",
            disableAddGate: false,
            ableGate: true,
            csvfile: undefined,

            menu_users: true,
            menu_gates: false,
            menu_start: false,

            timerStarted: false,
            timerPause: true,
            hours: 0,
            miniutes: 0,
            seconds: 0
            
        }
        this.handleDel = this.handleDel.bind(this);
    }

//---Fetch_Competition---//

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

//---Fetch_User---//
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
    
//---Fetch_Gate---//
    fetchAllGate() {
        let competition_index = window.location.pathname.split("=")[1];
        manager.fetchAllGate(
            competition_index,
            ({ data }) => {
                this.setState({
                    gate: data.gate
                });
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        );
    }

//---Change_Mode---//  

    changeModeUser = () => {
        this.setState({
            menu_users: true,
            menu_gates: false,
            menu_start: false
        });
    }

    changeModeGate = () => {
        this.setState({
            menu_users: false,
            menu_gates: true,
            menu_start: false
        });
    }

    changeModeStart = () => {
        this.setState({
            menu_users: false,
            menu_gates: false,
            menu_start: true
        });
    }

    handleMenuClick = (values) => {
        this.setState({
            status: values.key
        });
    }

//---User_Add---//

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


//---User_Edit---//

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

//---User_Delete---//

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

    handleCancelDel = () => {
        this.setState({ 
            visibleDel: false 
        });
    }

//---User_Upload---//

    handleFiles = files => {

        var reader = new window.FileReader();

        reader.readAsText(files[0]);
        
        reader.onload = (e) => {
        
        // Use reader.result

        let csv = reader.result;

        let final = [];

        var lines = csv.split("\n");

        var headers = lines[0].split(",");
      
            for(var i=1;i<lines.length;i++){

                var obj = {};
                var currentline = lines[i].split(",");
        
                for(var j=0;j<headers.length;j++){
                    obj[headers[j]] = currentline[j];
                    obj["competition_index"] = window.location.pathname.split("=")[1];
                }
        
                final.push(obj);
            }

            console.log(final)
            manager.uploadUsers(
                final,
                ({ data }) => {
                    message.success("Upload users is success");
                    this.fetchAllUser();
                },
                (response) => {
                    if (response && response.status === 400) {
                        message.error(response.data.message);
                    }
                }
            );
            
        }

    }

//----------------------------------------------------------------//

//---Gate_Delete---//

    showModalGateDel = (gateIndex) => {
        console.log(gateIndex)
        this.setState({
            visibleGateDel: true,
            gateIndex: gateIndex
        });
    }

    handleGateDel = () => {
        let gateindex = this.state.gateIndex;
        manager.deleteGate(
            gateindex ,
            ({ data }) => {
                this.setState({ 
                    visibleGateDel: false 
                });
                message.success("Delete gate success");
                this.fetchAllGate();
            },
            (response) => {
                console.log(response.data.message);
            }
        );
    }

    handleGateCancelDel  = () => {
        this.setState({ 
            visibleGateDel: false 
        });
    }


//---Gate_Add---//

    showModelGateAdd = () => {
        this.setState({
            visibleGate: true
        })
    }

    onGateFinish = (values) => {
        this.setState(values);
        this.handleAddGate();
    }

    handleAddGate(){
        let competition_index = window.location.pathname.split("=")[1];
        const payload = {
            competition_index: competition_index,
            gate_number: this.state.gateNo,
            gate_ip: this.state.gateIP,
            used: this.state.used,
        };

        console.log(payload)

        manager.addGate(
            payload,
            ({ data }) => {
                this.setState({ 
                    visible: false,
                    gate_number: "",
                    gate_ip: "",
                    used: "Not Used",
                    visibleGate: false 
                });
                message.success("Add gate success");
                this.formRef.current.resetFields();
                this.fetchAllGate();
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        )
    }

//---Gate_Edit---//

    editGate = (values) => {
        console.log(values)
        this.setState(values);
        this.updateGate();
    }

    updateGate () {
        let competition_index = window.location.pathname.split("=")[1];
        let gate_index = this.state.gateIndex;
        const payload = {
            competition_index: competition_index,
            gate_number: this.state.gateNo,
            gate_ip: this.state.gateIP,
            used: this.state.used
        };

        console.log(payload)

        manager.updateGate(
            gate_index,
            payload,
            ({ data }) => {
                this.setState({ 
                    gateNo: "",
                    gateIP: "",
                    used: "Not Used",
                    visibleGateEdit: false 
                });
                message.success("Edit user success");
                this.fetchAllGate();
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        );
    }

    showModalGateEdit = (gateIndex) => {
        this.setState({
            visibleGateEdit: true,
            gateIndex: gateIndex
        })

        let competition_index = window.location.pathname.split("=")[1];
        const payload = {
            competition_index: competition_index
        };
        manager.fetchGate(
            gateIndex ,
            payload,
            ({ data }) => {
                console.log(data.gate[0].used)
                this.formRef.current.setFieldsValue({
                    gateNo: data.gate[0].gate_number,
                    gateIP: data.gate[0].gate_ip,
                });
                this.setState({
                    used: data.gate[0].used
                })
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        );
    }

    handleGateCancelEdit = () => {
        this.setState({
            visibleGateEdit: false,
            used: "Not Used"
        });
    }

//---Other---//

    checkGateIP = (gate_ip) =>{
        const payload = {
            gate_ip : gate_ip
        }

        console.log(gate_ip)

        manager.checkGateIP(
            payload,
            ({ data }) => {
                message.success("success");
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        )
    }

    changeUsed = (value) => {
        console.log(value.key)
        this.setState({
            used: value.key
        })
    }

    // toggle() {
    //     this.setState({
    //         disable: false
    //     });
    // }

    // editGate = () => {
    //     this.setState({
    //         disable: false,
    //         disableAddGate: true,
    //         ableGate: false
    //     });
    // }

//---Timer---//

    handelTimerStart(e){
        e.preventDefault();

        if(this.state.timerPause){
            this.timer = setInterval(() => {
                this.setState({timerStarted: true, timerPause: false})
                if(this.state.timerStarted){
                    if(this.state.seconds > 60){
                        this.setState((prevState) => ({ miniutes: prevState.miniutes + 1, seconds: 0}))
                    }
                    if(this.state.miniutes > 60){
                        this.setState((prevState) => ({ hours: prevState.hours + 1, miniutes: 0, seconds: 0}))
                    }
                    this.setState((prevState) => ({ seconds: prevState.seconds + 1}))
                }
            }, 1000)
        }
    }  
    
    handelTimerPause(e) {
        e.preventDefault();

        this.setState({timerStarted: false, timerPause: true});
        clearInterval(this.timer);
    }

    handelTimerReset() {
        this.setState({ timerStarted: false, timerPause: true, hours: 0, miniutes: 0, seconds: 0});
        clearInterval(this.timer);
    }


//---Mode---//

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
                                            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                                                <StyledButton style={{ width: "10rem"}} onClick={this.importCSV}>Upload user</StyledButton>
                                            </ReactFileReader>
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

    isGateMode = () => {
        const menu = (
            <Menu onClick={this.changeUsed}>
                <Menu.Item key="Used" >
                    Used
                </Menu.Item>
                <Menu.Item key="Not Used" >
                    Not Used
                </Menu.Item>
            </Menu>
        );

        return(
            <>
                <StyledModal
                    visible={this.state.visibleGate}
                    onCancel={ () => this.setState({visibleGate: false })}
                    title={null}
                    footer= {null}
                >
                            <Text caption >Gate</Text>
                            <FormAll onFinish={this.onGateFinish}  ref={this.formRef}>
                                <Text>Gate No</Text>
                                    <Form.Item name="gateNo" rules={[{ required: true, message: 'Missing gate no' }]} >
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true" />
                                    </Form.Item>
                                <Text>IP Address</Text>
                                    <Form.Item name="gateIP" rules={[{ required: true, message: 'Missing ip address' }]} >
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/>
                                    </Form.Item>
                                <Text>Used</Text>
                                    <Form.Item>
                                        <Dropdown overlay={menu}  >
                                            <Button style={{width:'100%', borderRadius:'2rem', height: '2.5rem'}}>
                                                {this.state.used} <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </Form.Item>
                                <ContainerSubmit>
                                    <Form.Item>
                                        <Button key="back" style={{borderRadius:'2rem', background: '#E5E5E5', fontSize: '18px', height: '2.5rem'}} onClick={() => this.setState({visibleGate: false})}>
                                            Cancle
                                        </Button>
                                    </Form.Item>
                                    <LitleSpace/>
                                    <Form.Item>
                                        <Button 
                                            key="submit"  htmlType="submit"  
                                            style={{borderRadius:'2rem', background: '#F9A826', color: 'black', fontSize: '18px', height: '2.5rem'}} 
                                        >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </ContainerSubmit>
                            </FormAll>
                    </StyledModal>
                    
                    <StyledModal
                        visible={this.state.visibleGateEdit}
                        onCancel={this.handleGateCancelEdit}
                        title={null}
                        footer= {null}
                    >
                        <Text caption >Edit Gate</Text>
                        <FormAll onFinish={this.editGate} autoComplete="off"  ref={this.formRef}>
                                <Text>Gate No.</Text>
                                    <Form.Item name="gateNo" rules={[{ required: true, message: 'Missing Gate No' }]} initialValue={this.state.gateNo} >
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/> 
                                    </Form.Item>
                                <Text>IP Address</Text>
                                    <Form.Item name="gateIP" rules={[{ required: true, message: 'Missing Gate IP' }]} initialValue={this.state.gateIP}>
                                        <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/>
                                    </Form.Item>
                                <Text>Used</Text>
                                    <Form.Item>
                                        <Dropdown overlay={menu}>
                                            <Button style={{width:'100%', borderRadius:'2rem', height: '2.5rem'}}>
                                                {this.state.used} <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </Form.Item>
                                <ContainerSubmit>
                                    <Form.Item >
                                        <Button key="back" style={{borderRadius:'2rem', background: '#E5E5E5', fontSize: '18px', height: '2.5rem'}} onClick={this.handleGateCancelEdit}>
                                            Cancle
                                        </Button>
                                    </Form.Item>
                                    <LitleSpace/>
                                    <Form.Item>
                                        <Button 
                                            key="submit"  htmlType="submit"  
                                            style={{borderRadius:'2rem', background: '#F9A826', color: 'black', fontSize: '18px', height: '2.5rem'}} 
                                        >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </ContainerSubmit>
                            </FormAll>
                    </StyledModal>

                    <StyledModal
                        visible={this.state.visibleGateDel}
                        onCancel={this.handleGateCancelDel}
                        title={null}
                        footer= {null}
                    >
                        <ContainerPicture>
                            <img src={trash_comfirm} alt={trash_comfirm}/>
                        </ContainerPicture>
                        <Text caption >Confirm to delete ?</Text>
                        <ContainerSubmit del>
                            <Button key="back" style={{borderRadius:'2rem', background: '#E5E5E5', fontSize: '18px', height: '2.5rem'}} onClick={this.handleGateCancelDel}>
                                    Cancle
                            </Button>
                            <LitleSpace/>
                            <Button 
                                key="submit"  htmlType="submit"  
                                style={{borderRadius:'2rem', background: '#F9A826', color: 'black', fontSize: '18px', height: '2.5rem'}} 
                                onClick={this.handleGateDel}
                            >
                                Submit
                            </Button>
                        </ContainerSubmit>
                    </StyledModal>


    
               <ContainerDisplay>
                    <MediaQuery minDeviceWidth={680}>
                        <ContainerOption >
                                <ContainerHeader>
                                    <Header>Gates</ Header>
                                </ContainerHeader>
                                <ContainerButton>
                                    {/* <StyledButton style={{ width: "6rem"}} onClick={this.editGate}>EDIT</StyledButton>
                                    <TextOr>OR</TextOr> */}
                                    <StyledButton style={{ width: "6rem", }} onClick={this.showModelGateAdd} disabled={this.state.disableAddGate}>ADD</StyledButton>
                                </ContainerButton>
                        </ContainerOption>

                            <div style={{display: "flex", justifyContent: "space-between" , alignItems: "center", width: "100%", fontSize: "1.5rem", height: "2.5rem",
                                        background: "#FFD085", marginTop: "2rem" }}>
                                <div style={{fontSize: "1rem", fontWeight: "bold", width: "20%"}}>
                                    Gate No.
                                </div>
                                <div style={{fontSize: "1rem", fontWeight: "bold", width: "20%", marginRight: "1rem"}}>
                                    IP Address
                                </div>
                                <div style={{fontSize: "1rem", fontWeight: "bold", width: "20%"}}>
                                    Used
                                </div>
                                <div style={{fontSize: "1rem", fontWeight: "bold", width: "20%", paddingRight: "2%"}}>
                                    Edit
                                </div>
                                <div style={{fontSize: "1rem", fontWeight: "bold", width: "20%"}}>
                                    Delete
                                </div>
                            </div>
                        
                        <ContainerConfigGate>
                            {

                                this.state.ableGate ? this.showGate(): this.showEditGate () 
                            }
                        </ContainerConfigGate>
                    </MediaQuery>
                </ContainerDisplay>
            </>
        )
    }

    isStartMode = () => {
        return(
            // <ContainerDisplay>

                   <div style={{ width: "80%", height: "35rem", marginLeft: "5%"}}>
                        {/* <MediaQuery minDeviceWidth={680}> */}
                            <ContainerOption >
                                    <div style={{fontSize: "2rem"}}>Start</div>
                                    <div style={{width: "2%"}}/>
                                    <div style={{fontSize: "2rem"}}>The</div>
                                    <div style={{width: "2%"}}/>
                                    <div style={{fontSize: "2rem"}}>Competition</div>
                            </ContainerOption>
        
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center" , width: "100%", height: "30%", marginBottom: "2rem"}}>
                                <ButtonOfCompetition  started onClick={this.handelTimerStart.bind(this)}>Start</ButtonOfCompetition>
                                <div style={{height: "30%", width: "5%"}}/>
                                <ButtonOfCompetition  pause onClick={this.handelTimerPause.bind(this)}>Pause</ButtonOfCompetition>
                                <div style={{height: "30%", width: "5%"}}/>
                                <ButtonOfCompetition  reset onClick={this.handelTimerReset.bind(this)}>Reset</ButtonOfCompetition>
                                <div style={{height: "30%", width: "5%"}}/>
                                <ButtonOfCompetition >End</ButtonOfCompetition>
                            </div>
                            
                           <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "10%", fontSize: "3rem", marginBottom: "2rem"}}>Time</div>
                           <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40%"}}>
                                <div style={{height: "100%", width: "22%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", backgroundColor: "#E6E6E6", borderRadius: "50%", border: "solid 6px", borderColor: "#58D1B4", color: "black"}}>
                                        {this.state.hours + " H" }
                                </div>
                                <div style={{height: "30%", width: "5%"}}/>
                                <div style={{height: "100%", width: "22%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", backgroundColor: "#E6E6E6", borderRadius: "50%", border: "solid 6px", borderColor: "#FFD085",  color: "black"}}>
                                        {this.state.miniutes + " M"} 
                                </div>
                                <div style={{height: "30%", width: "5%"}}/>
                                <div style={{height: "100%", width: "22%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", backgroundColor: "#E6E6E6", borderRadius: "50%", border: "solid 6px", borderColor: "#FF7D7D",  color: "black"}}>
                                        { this.state.seconds + " S"}                                    
                                </div>
                           </div>
                        {/* </MediaQuery> */}
                   </div>
            // </ContainerDisplay>
        );
    } 

//---Edit_Gates_Mode---//

    showGate = ()  => {
        return(
            this.state.gate.map((gate, index) => {
                if(gate.used === "Used"){
                    return (
                        <div style={{display: "flex", flexDirection: "row"}}>
                        <ContainerAllGate key={index+1} style={{display: "flex", justifyContent: "flex-start"}}>
                            <div style={{fontSize: "16px", width: "20%", paddingRight: "2%"}}>{gate.gate_number}</div>
                            <div style={{fontSize: "16px", width: "20%", paddingRight: "1%"}}>{gate.gate_ip}</div>
                            <div style={{fontSize: "16px", fontWeight: "bold", width: "20%", paddingLeft: "2%", color: "green"}}>{gate.used}</div>
                            <GateStyle edit onClick = {() => this.showModalGateEdit(gate.index)}>
                                    <img src={edit} alt={edit}/>
                            </GateStyle>
                            <GateStyle onClick={() => this.showModalGateDel(gate.index)} > 
                                    <img src={trashIcon} alt={trashIcon}/>
                            </GateStyle>
                        </ContainerAllGate>
                        </div> 
                    
                    )
                }else{
                    return (
                        <div style={{display: "flex", flexDirection: "row"}}>
                        <ContainerAllGate key={index+1} style={{display: "flex", justifyContent: "flex-start"}}>
                            <div style={{fontSize: "16px", width: "20%", paddingRight: "2%"}}>{gate.gate_number}</div>
                            <div style={{fontSize: "16px", width: "20%", paddingRight: "1%"}}>{gate.gate_ip}</div>
                            <div style={{fontSize: "16px", fontWeight: "bold", width: "20%", paddingLeft: "2%", color: "red"}}>{gate.used}</div>
                            <GateStyle edit onClick = {() => this.showModalGateEdit(gate.index)}>
                                    <img src={edit} alt={edit}/>
                            </GateStyle>
                            <GateStyle onClick={() => this.showModalGateDel(gate.index)} > 
                                    <img src={trashIcon} alt={trashIcon}/>
                            </GateStyle>
                        </ContainerAllGate>
                        </div> 
                    
                    )
                }
            })
        )
    }

    showEditGate = () => {
        return(
            // this.state.gate.map((gate, index) => {
            //     return (
            //         <div style={{display: "flex", flexDirection: "row"}}>
            //             <ContainerAllGate key={index+1} style={{display: "flex", justifyContent: "flex-start"}}>
            //                 <div style={{fontSize: "16px", width: "30%"}}>
            //                     <Input  defaultValue={gate.gate_number}/>
            //                 </div>
            //                 <div style={{fontSize: "16px", width: "30%", paddingLeft: "2%"}}>
            //                     <Input  defaultValue={gate.gate_ip} />
            //                 </div>
            //                 <div style={{fontSize: "16px", width: "30%", paddingLeft: "8%"}}>
            //                     <Switch disabled={this.state.disable}/>
            //                 </div>
            //             </ContainerAllGate>

            //             <ContainerDelGate>
            //                 <GateDelete onClick={() => this.showModalDel(gate.index)} > 
            //                     <img src={trashIcon} alt={trashIcon}/>
            //                 </GateDelete>
            //             </ContainerDelGate>
            //         </div>   
            //     )
            // })
            <></>
        )
    }


//---Main---//
    render() {
        return (
            <ContainerLayout>
                <Navbar/>
                <ContainerMenu>
                    <MenuOption competition_name style={{ marginTop: '1.75rem',  width: '100%'}}>
                        <MenuTextStyled style={{ fontFamily: "Roboto", width: '100%' , fontWeight: 'bold',  
                                                fontSize: '1.35rem', color: 'white'}} >
                            {this.state.competition_name}
                        </MenuTextStyled>
                    </MenuOption>
                    <MenuOption menu_users={this.state.menu_users} style={{ marginTop: '2rem',  width: '70%'}} onClick={this.changeModeUser}>
                        <MenuTextStyled style={{ fontFamily: "Roboto", width: '100%' , fontWeight: 'bold',  
                                                fontSize: '1.25rem', color: 'white'}} >
                            Users
                        </MenuTextStyled>
                    </MenuOption>

                    <MenuOption menu_gates={this.state.menu_gates} style={{ marginTop: '2rem',  width: '70%'}} onClick={this.changeModeGate}>
                        <MenuTextStyled style={{ fontFamily: "Roboto", width: '100%' , fontWeight: 'bold',  
                                                fontSize: '1.25rem', color: 'white'}}  
                        >
                            Gates
                        </MenuTextStyled>
                    </MenuOption>

                    <MenuOption menu_start={this.state.menu_start} style={{ marginTop: '2rem',  width: '70%'}} onClick={this.changeModeStart}>
                        <MenuTextStyled style={{ fontFamily: "Roboto", width: '100%' , fontWeight: 'bold',  
                                                fontSize: '1.25rem', color: 'white'}}  
                        >
                            Start 
                        </MenuTextStyled>
                    </MenuOption>

                </ContainerMenu>
                    {
                        this.state.menu_users ? this.isStartMode() : this.state.menu_gates ? this.isGateMode() : this.isUserMode()
                    }
            </ContainerLayout>
        );
    }
}

export default user;