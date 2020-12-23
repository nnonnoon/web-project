import React, { Component } from 'react';
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { redirectTo } from "../../services/redirect";
import { message, Button } from "antd";
import { subDomain } from '../../services/redirect'
import { NavLink } from "react-router-dom";

const Bar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(163, 213, 252);
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 900;
    padding-left: 10%;
    padding-right: 10%;
`
const Text = styled.div`
    display: flex;
    font-family: "Roboto";
    font-weight: bold;
    color: #fff;
    font-style: italic;
    font-size: 32px;
    cursor: pointer;
`

const List = styled.div`
    display: flex;
    align-items: center;
    width: 5%;
`

const ButtonStyled = styled(Button)`
    display:flex;
    align-items: center;
    position: relative;
    font-family: "Roboto";
    background: #F9A826;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border-radius: 2.8125rem;
    cursor: pointer;
    &:hover{
        background: rgba(255, 208, 133, 1);
        border-color: #fff;
        color: #fff;
    }
`

const Link = styled.div`
    display: flex;
    align-items: flex-start;
    width: 90%;
`

const ListStyled = styled(NavLink)`
    display:flex;
    justify-content: center;
    font-family: "Roboto";
    color: black;
    font-size: 1.3rem;
    font-weight: 500;
    border-radius: 5px;
    width: 20%;
    &.active{
        background: white;
        font-weight: 800;
    }
    &:hover{
        color: black;
        font-weight: 800;
        cursor: pointer;
    }
`

const Space = styled.div`
    width: ${props => props.space};
`

class navbar extends Component {

    handleLogout(){
        localStorage.clear();
        message.loading("Logout");
        let secondsToGo = 1;
        const timer = setInterval(() => {
            secondsToGo -= 1;
          }, 500);
          setTimeout(() => {
            clearInterval(timer);
            redirectTo(`/login`);
        }, secondsToGo * 500);
    }

    render() {
        return (
            <Bar>
                <MediaQuery minDeviceWidth={680}>
                    <List>
                        <Text onClick= {this.handleLinkCompetition}>Running</Text>
                    </List>
                    <Space space ="20%"/>
                    <Link>
                        <ListStyled to={`${subDomain}/competition`}>Competition</ListStyled>
                        <Space space ="5%"/>
                        <ListStyled to={`${subDomain}/tags`}>Tags</ListStyled>
                    </Link>
                    <Space  space ="20%"/>
                    <List>
                        <ButtonStyled onClick= {this.handleLogout}>Logout</ButtonStyled>
                    </List>
                </MediaQuery>
            </Bar>
        );
    }
}

export default navbar;