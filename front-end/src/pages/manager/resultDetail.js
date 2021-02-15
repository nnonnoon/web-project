import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from "react-responsive";
import { results_api } from '../../services/api';
import { message } from 'antd';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
    Sarabun: {
        normal: 'Sarabun-Bold.ttf',
        bold: 'Sarabun-BoldItalic.ttf',
        italics: 'Sarabun-Italic.ttf',
        bolditalics: 'Sarabun-Regular.ttf'
    },
    Roboto: {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-MediumItalic.ttf'
    }
}

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
    height: 25rem;
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

const ContainerOption = styled.div`
    display: flex;
`

const ContainerTotal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: #FFD085;
    width: ${(props) => props.width};
    border-radius: 5px;
    padding: 10px 10px 10px 10px ;
`

const ItemTotal = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    font-weight: bold;
`

const DownloadPDF = styled.button`
    background: #D5DBDB ; 
    width: 50%; 
    height: 100%; 
    margin-left: 2%;
    font-weight: bold;
    border-radius: 5px;
    border-color: black;
    cursor: pointer;

    :hover{
        background: white;
    }

`

class resultDetail extends Component {
    constructor(props){
        super(props);
        this.fetchResults();
        this.fetchTotalResults();
        this.state = {
            results : [],
            totalResult: [],
            user_index : Number(window.location.pathname.split("=")[1]),
            
            competition_name : "",
            name_title : "",
            first_name : "",
            last_name : "",
            times_total : "qqq",
            round_total : ""
        }   
    }

    fetchResults() {
        let competition_index = window.location.pathname.split("/")[2];
        let user_index = Number(window.location.pathname.split("=")[1]);

        results_api.fetchResultDetail(
            competition_index,
            user_index,
            ({data}) => {
                for(let i = 0 ; i < data.results.length ; i ++){
                    console.log(data.results[i].competition_name )
                    this.setState({
                        results: data.results,
                        competition_name: data.results[i].competition_name,
                        name_title : data.results[i].name_title,
                        first_name : data.results[i].first_name,
                        last_name : data.results[i].last_name,
                    });
                }
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        );
    }

    fetchTotalResults() {
        let competition_index = window.location.pathname.split("/")[2];
        let user_index = Number(window.location.pathname.split("=")[1]);

        results_api.fetchResult(
            competition_index,
            ({ data }) => {
                for(let i = 0 ; i < data.results.length ; i ++){
                    if(user_index === data.results[i].index){
                        this.setState({
                            totalResult : data.results,
                            times_total : data.results[i].times_total,
                            round_total : data.results[i].round_total
                        });
                    }
                }
            },
            (response) => {
                if (response && response.status === 400) {
                    message.error(response.data.message);
                }
            }
        );
    }


    printPDF () {

        var docDefinition = {
            content: [
                // { text: `${this.state.competition_name} 
                //          ${this.state.name_title} ${this.state.first_name} ${this.state.last_name}
                //          ${this.state.times_total}
                //          ${this.state.round_total}` , fontSize: 15 },
                { text : `${this.state.competition_name}`, style: 'header', fontSize: 16},
                { text : `ชื่อ-สกุล : ${this.state.name_title}${this.state.first_name} ${this.state.last_name}`, style: 'subheader', fontSize: 10},
                {
                    table: {
                      body: [
                       ['วัน/เดือน/ปี', 'รอบ', 'เวลาที่ใช้'],
                            [
                            this.state.results.map((results, index) =>{
                                    return results.date
                                }),
                            this.state.results.map((results, index) =>{
                                    return results.round
                                }) ,
                            this.state.results.map((results, index) =>{
                                    return results.time
                                }) 
                            ]     
                      ]
                    }
                }
            ],


            defaultStyle:{
                font: 'Sarabun'
            }
        };
        pdfMake.createPdf(docDefinition).open()
    }
    

    render() {
        return (
            <MediaQuery minDeviceWidth={680}>
                 <ContainerLayout> 
                 {
                        this.state.results.map((results, index) => {
                            if(index > 0){
                                return (<></>)
                            }
                            return(
                                <Header fontSize= "2rem" key={index + 1} >{results.competition_name}</Header>
                            )
                        })
                    }

                    {
                            this.state.results.map((results, index) => {
                                if(index > 0){
                                    return (<></>)
                                }
                                return(
                                    <Header fontSize= "1.5rem" key={index + 1}>{results.name_title}{results.first_name}  {results.last_name}</Header>
                                )
                            })

                    }
                    <ContainerOption>
                        <ContainerTotal width = "60%">
                            <ItemTotal >Times Total ==> <div style={{color:"#1E8449 " }}> {this.state.times_total} </div></ItemTotal>
                            <ItemTotal >Round Total ==> <span style={{color:"#1E8449 "}}> {this.state.round_total} </span></ItemTotal>       
                        </ContainerTotal>
                        <DownloadPDF onClick = { () => this.printPDF()}>EXPORT</DownloadPDF>
                    </ContainerOption>


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