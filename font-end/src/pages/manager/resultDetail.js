import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from "react-responsive";


const ContainerLayout = styled.div`
    display: flex;
    flex-direction: column;
    padding: 6.5rem 20% 0 20%;
    height: 100vh;
`

const Header = styled.div`
    font-size: ${(props) => props.fontSize};
    margin-bottom: 1%;
`

const ContainerTable = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding-left: 15%;
    padding-right: 15%;
    height: 6%;
    background: #FFA378;
`

const HeaderTable = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:  16%;
    font-size: 16px;
    font-weight: bold;
    color: black;
    cursor: pointer;
`

const ContainerItems = styled.div`
    display: flex;
    flex-direction: column;
    height: 30rem;
    overflow: scroll;
`

const ContainerAllItems = styled.div`
    display: flex;
    height: 6vh;
    :hover{
        background: #F0F0F0;
    }
`

const ItemsTable = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:  100%;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 3px solid #E6E6E6;
    color: black;
    cursor: pointer;
`

class resultDetail extends Component {
    render() {
        return (
            <MediaQuery minDeviceWidth={680}>
                 <ContainerLayout> 
                    <Header fontSize= "2rem">การทดสอบสมรรถภาพครั้งที่ 1</Header>
                    <Header fontSize= "1.5rem">นายตะวัน จันทรา</Header>
                        <ContainerTable>
                            <HeaderTable>Date</HeaderTable>
                            <HeaderTable>Lap</HeaderTable>
                            <HeaderTable>Times (m.s)</HeaderTable>
                        </ContainerTable>
                        <ContainerItems>
                            <ContainerAllItems>
                                <ItemsTable style={{paddingLeft: "6%"}}>25/10/2020</ItemsTable>
                                <ItemsTable>1</ItemsTable>
                                <ItemsTable style={{paddingRight: "6%"}}>12.00</ItemsTable>
                            </ContainerAllItems>
                            <ContainerAllItems>
                                <ItemsTable style={{paddingLeft: "6%"}}>25/10/2020</ItemsTable>
                                <ItemsTable>1</ItemsTable>
                                <ItemsTable style={{paddingRight: "6%"}}>12.00</ItemsTable>
                            </ContainerAllItems>
                            <ContainerAllItems>
                                <ItemsTable style={{paddingLeft: "6%"}}>25/10/2020</ItemsTable>
                                <ItemsTable>1</ItemsTable>
                                <ItemsTable style={{paddingRight: "6%"}}>12.00</ItemsTable>
                            </ContainerAllItems>
                            <ContainerAllItems>
                                <ItemsTable style={{paddingLeft: "6%"}}>25/10/2020</ItemsTable>
                                <ItemsTable>1</ItemsTable>
                                <ItemsTable style={{paddingRight: "6%"}}>12.00</ItemsTable>
                            </ContainerAllItems>
                            <ContainerAllItems>
                                <ItemsTable style={{paddingLeft: "6%"}}>25/10/2020</ItemsTable>
                                <ItemsTable>1</ItemsTable>
                                <ItemsTable style={{paddingRight: "6%"}}>12.00</ItemsTable>
                            </ContainerAllItems>
                            <ContainerAllItems>
                                <ItemsTable style={{paddingLeft: "6%"}}>25/10/2020</ItemsTable>
                                <ItemsTable>1</ItemsTable>
                                <ItemsTable style={{paddingRight: "6%"}}>12.00</ItemsTable>
                            </ContainerAllItems>
                        </ContainerItems>
                </ContainerLayout>
            </MediaQuery>
        );
    }
}

export default resultDetail;