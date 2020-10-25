import React, { Component } from 'react';
import Navbar from '../component/navbar';
import MediaQuery from "react-responsive";
import { Button } from 'antd';
import styled from 'styled-components'
import trashIcon from '../../assets/icon/bin.svg';

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

const CompetitionStyled = styled.div`
    display: flex;
    height: 3rem;
    cursor: pointer;
`

const ContainerButton = styled.div`
    display: flex;
    justify-content: flex-end;
    width : 10%;
`;

const ContainerItems = styled.div`
    display: flex;
    flex-direction: column;
    height: 27rem;
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
    width: 6rem;
    &:hover{
        background: #00B0FF;
        border-color: #fff;
        color: #fff;
    }
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
    width:  ${props => props.small? "10%": props.big? "25%": "20%"};;
    font-size: ${props => props.header? "16px": "14px"};
    font-weight: ${props => props.header? "bold": ""};
    border-bottom: ${props => props.item? "3px solid #E6E6E6": null}; 
`

const LitleSpace = styled.div`
    width: ${props => props.header ? "7rem": props.spaceName ? "1rem" : "5rem"};
`


class user extends Component {

    render() {
        return (
            <ContainerLayout>
                <Navbar/>
                <MediaQuery minDeviceWidth={680}>
                        <ContainerOption>
                            <ContainerHeader>
                                <Header>User</ Header>
                            </ContainerHeader>
                            <ContainerButton>
                                <StyledButton onClick={this.showModal}>ADD</StyledButton>
                            </ContainerButton>
                        </ContainerOption>
                        <ContainerTable>
                            <HeaderText  header small>No.</HeaderText>
                            <HeaderText  header big>Competition name</HeaderText>
                            <HeaderText  header>Location</HeaderText>
                            <HeaderText  header>Date</HeaderText>
                            <HeaderText  header >Manager</HeaderText>
                            <HeaderText  header small>Delete</HeaderText>
                        </ContainerTable>
                        {/* <ContainerItems>
                            {
                                this.state.competition.map((competition, index) => {
                                    return(
                                        <CompetitionStyled key={index+1} onClick={() => this.handleLinkPage(competition.index)}>
                                            <HeaderText  small item>{index+1}</HeaderText>
                                            <HeaderText big item>{competition.competition_name}</HeaderText>
                                            <HeaderText item>{competition.location}</HeaderText>
                                            <HeaderText item>{competition.date}</HeaderText>
                                            <HeaderText item >
                                                {competition.manager_name_title}
                                                {competition.manager_first_name}
                                                <LitleSpace spaceName/>
                                                {competition.manager_last_name}
                                            </HeaderText>
                                            <HeaderText small item onClick={() => this.showModalDel(competition.index)} >
                                                <img src={trashIcon} alt={trashIcon}></img>
                                            </HeaderText>
                                        </CompetitionStyled>
                                    )
                                })
                            }
                        </ContainerItems> */}
                    </MediaQuery>
            </ContainerLayout>
        );
    }
}

export default user;