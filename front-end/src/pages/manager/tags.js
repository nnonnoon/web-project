import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from "react-responsive";
import { tags_backend } from '../../services/api'
import trash_tags from '../../assets/icon/trash_tags.svg'
import { Button, Modal, Form, Input, message } from 'antd';

const ContainerLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 5% 0 5%;
    height: 100vh;
`

const ButtonScan = styled(Button)`
    border-radius: 2rem;
    cursor: pointer;
    background: #7FD2F8;
    color: #fff;
    font-family: "Roboto";
    font-weight: bold;
    font-size: 22px;
    height: 6%;
    width: 15%;
    &:hover{
        background: #00B0FF;
        border-color: #fff;
        color: #fff;
    }
`

const Header = styled.div`
    font-size: 2rem;
    margin-bottom: 2%;
`

const ContainerListTags = styled.div`
    margin-top: 2%;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: repeat( 100, minmax(200px, 200px) ) ;
    grid-row-gap: 5%;
    grid-column-gap: 2%;
    width: 100%;
    height: 62vh;
    overflow: scroll;
`

const ListTags = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #FFD085;
    font-size: 40px;
    width: 100%;
    border-radius: 4px;

    /* &:hover{
        background-color: #FF7C7C;
        background-image: url(${trash_tags}) ;
        background-repeat: no-repeat;
        background-size: 70% 70%;
        background-position: center;
        cursor: pointer;
    } */
`

const TagNumber = styled.div`
    display: flex;
    font-size: 18px;
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




class tags extends Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.fetchTags();
        this.state = {
            visible: false,
            tags: [],
            tags_index: "",
            tag_name: "",
            tag_number: ""
        };
    }

    fetchTags(){
        tags_backend.fetchTags(
            ({ data }) => {
                const data_tags = data.tags
                console.log(data_tags);
                this.setState({
                    tags: data_tags
                });
            },
            (response) => {
                if (response && response.status === 400) {
                    console.log(response.data.message);
                }
            }
        );
    }

    addTags(){
        const payload = {
            tag_name: this.state.tag_name,
            tag_number: this.state.tag_number
        };
        tags_backend.addTags(
            payload,
            ({ data }) => {
                console.log(data);
                message.success("Add tag success");
                this.fetchTags();
            },
            (response) => {
                if (response && response.status === 400) {
                    console.log(response.data.message);
                }
            }
        );
    }

    scanModal= () =>{
        this.setState({
            visible: true
        });
    }

    handleOk = () => {
        // this.setState({
        //     loading: true
        // });
        this.setState({
            loading: false, 
            visible: false 
        });
    }

    handleCancel = () => {
        this.setState({ 
            visible: false 
        });
    }

    onFinish = (values) => {
        this.setState(values);
        this.formRef.current.resetFields();
        this.addTags();
     }

    render() {
        return (
            <>

                <StyledModal
                    visible={this.state.visible}
                    onOK={this.handleOK}
                    onCancel={this.handleCancel}
                    title={null}
                    footer= {null}
                >
                        <Text caption >Add Tag</Text>
                        <FormAll onFinish={this.onFinish} autoComplete="off"  ref={this.formRef}>
                            <Text>Tag Name</Text>
                                <Form.Item name="tag_name">
                                    <Input style={{borderRadius:'2rem', height: '2.5rem'}} allowClear="true"/>
                                </Form.Item>
                            <Text>Tag Number</Text>
                                <Form.Item name="tag_number">
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
                <MediaQuery minDeviceWidth={680}>
                    <ContainerLayout>  
                        <Header>Tags</Header>
                        <ButtonScan onClick={this.scanModal}>SCAN</ButtonScan>
    
                        <ContainerListTags> 
                        {
                            this.state.tags.map((tags, index) => {
                                return(
                                    <ListTags key={index} onClick={() => this.showModalDel(tags.index)}>{tags.tag_name}<br/> 
                                        <TagNumber>No : {tags.tag_number}</TagNumber>
                                    </ListTags>
                                )
                            })
                        }
                        </ContainerListTags>
                    </ContainerLayout>
                </MediaQuery>
            </>
        );
    }
}

export default tags;