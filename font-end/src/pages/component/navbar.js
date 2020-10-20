import React, { Component } from 'react';
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { redirectTo } from "../../services/redirect";
import { message, Button } from "antd";

const ContainerLayout = styled.div`
  max-width: 136.6rem;
  width: 82%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Bar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 176, 255, 0.52);
    height: 7%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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



class navbar extends Component {

    handleLogout(){
        localStorage.clear();
        message.loading("Logout");
        let secondsToGo = 1;
        const timer = setInterval(() => {
            secondsToGo -= 1;
          }, 1000);
          setTimeout(() => {
            clearInterval(timer);
            redirectTo(`/login`);
        }, secondsToGo * 1000);
    }

    handleRefresh() {
        window.location.reload();
    }


    render() {
        return (
           <ContainerLayout>
                <Bar>
                    <MediaQuery minDeviceWidth={680}>
                        <List>
                            <Text onClick= {this.handleRefresh}>Running</Text>
                        </List>
                        <List>
                            <ButtonStyled onClick= {this.handleLogout}>Logout</ButtonStyled>
                        </List>
                    </MediaQuery>
                </Bar>
           </ContainerLayout>
        );
    }
}

export default navbar;