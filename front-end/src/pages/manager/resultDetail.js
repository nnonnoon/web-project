import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from "react-responsive";
import { results_api } from '../../services/api';
import { message } from 'antd';

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
    padding-left: 10%;
    padding-right: 10%;
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
    border-bottom: 3px solid #E6E6E6;
    color: black;
    cursor: pointer;
`

class resultDetail extends Component {
    constructor(props){
        super(props);
        this.fetchResults();
        this.state = {
            results : []
        }   
    }

    fetchResults() {
        let competition_index = window.location.pathname.split("/")[2];
        let user_index = window.location.pathname.split("=")[1];

        results_api.fetchResultDetail(
            competition_index,
            user_index,
            ({data}) => {
                this.setState({
                    results: data.results
                });
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        );
    }


    render() {
        return (
            <MediaQuery minDeviceWidth={680}>
                 <ContainerLayout> 
                 {
                        this.state.results.map((results, index) => {
                            if(index > 0){
                                return
                            }
                            return(
                                <Header fontSize= "2rem" key={index + 1}>{results.competition_name}</Header>
                            )
                        })
                    }

                    {
                            this.state.results.map((results, index) => {
                                if(index > 0){
                                    return
                                }
                                return(
                                    <Header fontSize= "1.5rem" key={index + 1}>{results.name_title}{results.first_name}  {results.last_name}</Header>
                                )
                            })

                    }
                        <ContainerTable>
                            <HeaderTable>Date</HeaderTable>
                            <HeaderTable>Lap</HeaderTable>
                            <HeaderTable>Times</HeaderTable>
                        </ContainerTable>
                        <ContainerItems>
                        {
                            this.state.results.map((results, index) => {
                                return(
                                    <ContainerAllItems key={index+1}>
                                            <ItemsTable>{results.date}</ItemsTable>
                                            <ItemsTable>{results.round}</ItemsTable>
                                            <ItemsTable>{results.time}</ItemsTable>
                                    </ContainerAllItems>
                                )
                            })
                        }
                        </ContainerItems>
                </ContainerLayout>
            </MediaQuery>
        );
    }
}

export default resultDetail;