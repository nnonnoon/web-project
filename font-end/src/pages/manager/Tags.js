import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from "react-responsive";
import { Button } from 'antd';

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
    align-items: center;
    justify-content: center;
    background: #FFD085;
    width: 100%;
    border-radius: 4px;
`


class tags extends Component {
    render() {
        return (
            <MediaQuery minDeviceWidth={680}>
                <ContainerLayout>  
                    <Header>Tags</Header>
                    <ButtonScan>SCAN</ButtonScan>
                    <ContainerListTags> 
                            <ListTags>A</ListTags>
                            <ListTags>B</ListTags>
                            <ListTags>C</ListTags>
                            <ListTags>D</ListTags>
                            <ListTags>A</ListTags>
                            <ListTags>B</ListTags>
                            <ListTags>C</ListTags>
                            <ListTags>D</ListTags>
                            <ListTags>A</ListTags>
                            <ListTags>B</ListTags>
                            <ListTags>C</ListTags>
                            <ListTags>D</ListTags>
                            <ListTags>A</ListTags>
                            <ListTags>A</ListTags>
                            <ListTags>B</ListTags>
                            <ListTags>C</ListTags>
                            <ListTags>D</ListTags>
                            <ListTags>A</ListTags>
                    </ContainerListTags>
                </ContainerLayout>
            </MediaQuery>

            
        );
    }
}

export default tags;