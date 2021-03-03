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
                { svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70pt" height="70pt" viewBox="0 0 100 100" version="1.1">
                <g id="surface1">
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(9.803922%,81.176471%,98.823529%);fill-opacity:1;" d="M 23.632812 19.238281 L 8.789062 19.238281 C 7.167969 19.238281 5.859375 17.929688 5.859375 16.308594 C 5.859375 14.6875 7.167969 13.378906 8.789062 13.378906 L 23.632812 13.378906 C 25.253906 13.378906 26.5625 14.6875 26.5625 16.308594 C 26.5625 17.929688 25.253906 19.238281 23.632812 19.238281 Z M 23.632812 19.238281 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(9.803922%,81.176471%,98.823529%);fill-opacity:1;" d="M 23.632812 42.675781 L 8.789062 42.675781 C 7.167969 42.675781 5.859375 41.367188 5.859375 39.746094 C 5.859375 38.125 7.167969 36.816406 8.789062 36.816406 L 23.632812 36.816406 C 25.253906 36.816406 26.5625 38.125 26.5625 39.746094 C 26.5625 41.367188 25.253906 42.675781 23.632812 42.675781 Z M 23.632812 42.675781 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(9.803922%,81.176471%,98.823529%);fill-opacity:1;" d="M 17.773438 30.957031 L 2.929688 30.957031 C 1.308594 30.957031 0 29.648438 0 28.027344 C 0 26.40625 1.308594 25.097656 2.929688 25.097656 L 17.773438 25.097656 C 19.394531 25.097656 20.703125 26.40625 20.703125 28.027344 C 20.703125 29.648438 19.394531 30.957031 17.773438 30.957031 Z M 17.773438 30.957031 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(15.686275%,39.215686%,94.117647%);fill-opacity:1;" d="M 54.714844 9.96875 C 52.386719 8.421875 49.296875 8.726562 47.320312 10.699219 L 31.207031 26.8125 C 28.921875 29.101562 28.921875 32.8125 31.207031 35.101562 C 33.496094 37.386719 37.207031 37.386719 39.496094 35.101562 L 52.210938 22.382812 L 61.3125 28.9375 L 73.757812 23.152344 Z M 54.714844 9.96875 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(15.686275%,39.215686%,94.117647%);fill-opacity:1;" d="M 42.925781 47.320312 L 4.839844 85.40625 C 2.550781 87.695312 2.550781 91.40625 4.839844 93.695312 C 7.128906 95.980469 10.839844 95.984375 13.128906 93.695312 L 47.070312 59.75 Z M 42.925781 47.320312 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(20%,53.72549%,100%);fill-opacity:1;" d="M 94.140625 39.746094 L 76.367188 39.746094 L 76.367188 28.027344 C 76.367188 25.722656 74.972656 23.542969 72.746094 22.621094 C 70.503906 21.691406 67.980469 22.265625 66.363281 23.886719 L 42.925781 47.320312 C 40.640625 49.609375 40.640625 53.320312 42.925781 55.609375 L 56.363281 69.042969 L 39.996094 85.40625 C 37.710938 87.695312 37.710938 91.40625 39.996094 93.695312 C 42.285156 95.980469 45.996094 95.984375 48.285156 93.695312 L 68.792969 73.1875 C 71.078125 70.898438 71.078125 67.1875 68.792969 64.898438 L 55.355469 51.464844 L 64.648438 42.171875 L 64.648438 45.605469 C 64.648438 48.839844 67.273438 51.464844 70.507812 51.464844 L 94.140625 51.464844 C 97.375 51.464844 100 48.839844 100 45.605469 C 100 42.371094 97.375 39.746094 94.140625 39.746094 Z M 94.140625 39.746094 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(20%,53.72549%,100%);fill-opacity:1;" d="M 93.945312 13.378906 C 93.945312 18.234375 90.011719 22.167969 85.15625 22.167969 C 80.300781 22.167969 76.367188 18.234375 76.367188 13.378906 C 76.367188 8.523438 80.300781 4.589844 85.15625 4.589844 C 90.011719 4.589844 93.945312 8.523438 93.945312 13.378906 Z M 93.945312 13.378906 "/>
                </g>
                </svg>`, alignment: 'center' },
                { text : `${this.state.competition_name}`, style: 'header', fontSize: 16, alignment: 'center', lineHeight: 2},
                { text : `ชื่อ-สกุล : ${this.state.name_title}${this.state.first_name} ${this.state.last_name}`, style: 'subheader', fontSize: 12, lineHeight: 1},
                { text : `ผลการทดสอบสมรรถภาพ`, style: 'tableheader', fontSize: 12, alignment: 'center', lineHeight: 1.5},
                {
                    table: {
                      widths: [ '*', '*', '*' ],
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
                                }) ,
                            ],
                        ['รวม', `${this.state.round_total}`, `${this.state.times_total}`]      
                      ]
                    }
                }
            ],
            defaultStyle:{
                font: 'Sarabun'
            }
        };
        pdfMake.createPdf(docDefinition).open();
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