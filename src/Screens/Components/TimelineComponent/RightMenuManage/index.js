import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { getDate, getTime, GetUrlImage, getSpec, getImage } from '../../BasicMethod';
import axios from 'axios';
import sitedata from '../../../../sitedata';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {pure} from 'recompose';
import { LanguageFetchReducer } from '../../../actions';
import GraphView from "../GraphView/JournalGraphView"
import moment from 'moment';
import GraphSec from './../GraphSec/index'
import HC_more from "highcharts/highcharts-more"; //module3
// Import Highcharts
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import * as translationEN from "../../../../translations/en.json"
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/nl.json';
HC_more(Highcharts); //init modules

class RightManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            personalinfo: this.props.personalinfo,
            upcoming_appointment: this.props.upcoming_appointment,
            added_data: this.props.added_data,
            time_format: this.props.time_format,
            date_format: this.props.date_format,
            loggedinUser: this.props.loggedinUser,
            doc_image: '',
            images: [],
        };
    }

    componentDidMount = () => {

    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.personalinfo !== this.props.personalinfo || nextProps.upcoming_appointment !== this.props.upcoming_appointment
        ||nextProps.added_data !== this.props.added_data || nextProps.stateLanguageType !== this.props.stateLanguageType ||
        nextState.laboratory_result!== this.state.laboratory_result || nextState.blood_pressure !== this.state.blood_pressure||
        nextState.weight_bmi !== this.state.weight_bmi || nextState.heart_rate !== this.state.heart_rate || nextState.blood_sugar !== this.state.blood_sugar
    }
    //On change the User Data
    componentDidUpdate = (prevProps) => {
        if (prevProps.added_data !== this.props.added_data) {
            this.setState({ added_data: this.props.added_data })
        }
        if (prevProps.personalinfo !== this.props.personalinfo || prevProps.stateLanguageType !== this.props.stateLanguageType) {
            this.setState({ personalinfo: this.props.personalinfo },
                () => {
                    // var find = this.state.personalinfo && this.state.personalinfo.upcoming_appointment && this.state.personalinfo.upcoming_appointment.length > 0 && this.state.personalinfo.upcoming_appointment[0] && this.state.personalinfo.upcoming_appointment[0].docProfile && this.state.personalinfo.upcoming_appointment[0].docProfile.profile_image
                    // if (find) {
                    //     var find1 = find.split('.com/')[1]
                    //     axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find1,)
                    //         .then((response) => {
                    //             if (response.data.hassuccessed) {
                    //                 this.setState({ doc_image: response.data.data })
                    //             }
                    //         })
                    // }
                    var images=[];
                    this.state.personalinfo && this.state.personalinfo.last_dv && this.state.personalinfo.last_dv.length>0 &&
                    this.state.personalinfo.last_dv.map((item)=>{
                        if(item.image){
                            var find = item && item.image; 
                            if (find) {
                                var find1 = find.split('.com/')[1]
                                axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find1,)
                                .then((response) => {
                                    if (response.data.hassuccessed) {
                                        images.push({ image: find, new_image: response.data.data })
                                        this.setState({images : images})
                                    }
                                })
                            }
                        }
                    })
                })
            var laboratory_result = this.getOptions('laboratory_result')
            var blood_pressure = this.getOptions('blood_pressure')
            var weight_bmi = this.getOptions('weight_bmi')
            var heart_rate = this.getOptions('heart_rate')
            var blood_sugar = this.getOptions('blood_sugar')
            this.setState({
                laboratory_result: laboratory_result, blood_pressure: blood_pressure, weight_bmi: weight_bmi,
                heart_rate: heart_rate, blood_sugar: blood_sugar
            })
        }
        if (prevProps.upcoming_appointment !== this.props.upcoming_appointment) {
            this.setState({ upcoming_appointment: this.props.upcoming_appointment })
        }
    }

    getOptions = (current_Graph) => {
        let translate;
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "default":
                translate = translationEN.text
        }
        let { blood_pressure, date, heart_frequency, lwr_limit, upr_limit, Creatinine, RR_diastolic,
            frequency, rr_systolic, value, weight, height, weight_bmi, BMI, blood_sugar } = translate

        if (current_Graph === 'blood_pressure' || current_Graph === 'heart_rate') {
            var categoriesbp = [], databp_d = [], databp_s = [], dataf = [], oldone;
            this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure.length > 0 && this.state.personalinfo.blood_pressure.map((data, index) => {
                databp_d.push({
                    "y": parseFloat(data.rr_diastolic)
                })
                databp_s.push({
                    "y": parseFloat(data.rr_systolic)
                })
                dataf.push({
                    "y": parseFloat(data.heart_frequncy)
                })
                if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.created_at) {
                    categoriesbp.push(getTime(new Date(data.datetime_on, this.state.time_foramt)))
                }
                else {
                    categoriesbp.push(getDate(data.datetime_on, this.state.date_format))
                }
                oldone = data;
            })
            if (current_Graph === 'blood_pressure') {
                var options = {
                    title: {
                        text: blood_pressure
                    },

                    yAxis: {
                        title: {
                            text: blood_pressure
                        }

                    },
                    xAxis: {
                        title: {
                            text: date
                        },
                        categories: categoriesbp
                    },

                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {    
                        type: 'line'

                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: RR_diastolic,
                        data: databp_d,
                        type: 'line',
                        color: '#008080'

                    },
                    {
                        name: rr_systolic,
                        data: databp_s,
                        type: 'line',
                        color: '#0000A0'

                    }]
                }
            }
            else {
                var options = {
                    title: {
                        text: heart_frequency
                    },

                    yAxis: {
                        title: {
                            text: heart_frequency
                        }

                    },
                    xAxis: {
                        title: {
                            text: date
                        },
                        categories: categoriesbp
                    },

                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'line'

                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: frequency,
                        data: dataf,
                        type: 'line',
                        color: '#008080'

                    }]
                }
            }

            return options;
        }
        if (current_Graph === 'laboratory_result') {
            var categorieslr = [], datalr1_u = [], datalr1_l = [], datalr1_v = [], oldone, myFilterlr1 = [];
            {
                this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.map((data, index) => {
                    datalr1_u.push({
                        "y": parseFloat(data.upper_limit)
                    })
                    datalr1_l.push({
                        "y": parseFloat(data.lower_limit)
                    })
                    datalr1_v.push({
                        "y": parseFloat(data.value)
                    })
                    myFilterlr1.push(data);
                    if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
                        categorieslr.push(getTime(new Date(data.datetime_on, this.state.time_foramt)))
                    }
                    else {
                        categorieslr.push(getDate(data.datetime_on, this.state.date_format))
                    }
                    oldone = data;
                })
            }
            var options = {
                title: {
                    text: Creatinine + ' (mg/dl)'
                },

                yAxis: {
                    title: {
                        text: Creatinine + ' (mg/dl)'
                    }
                },
                xAxis: {
                    title: {
                        text: date
                    },
                    categories: categorieslr
                },

                plotOptions: {
                    series: {
                        marker: {
                            enabled: true,
                            radius: 3
                        }
                    }
                },
                chart: {
                    type: 'line'

                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: value,
                    data: datalr1_v,
                    type: 'line',
                    color: '#800000'

                }, {
                    name: upr_limit,
                    data: datalr1_u,
                    type: 'line',
                    dashStyle: 'dot',
                    color: '#008080'

                },
                {
                    name: lwr_limit,
                    data: datalr1_l,
                    type: 'line',
                    dashStyle: 'dot',
                    color: '#0000A0'

                }]
            }
            return options;
        }

        if (current_Graph === 'weight_bmi') {
            var oldthree, weightbmi=[],Ibmi=[],heightbmi=[],categoriesbmi=[];
            {this.state.personalinfo && this.state.personalinfo.weight_bmi &&  this.state.personalinfo.weight_bmi.length>0 && this.state.personalinfo.weight_bmi.map((data, index) => {
            weightbmi.push({
                "y": parseFloat(data.weight)
            })
            var BMI = (data.weight / (data.height * data.height) * 10000).toFixed(2)
            Ibmi.push({
                "y": parseFloat(BMI)
            })
            heightbmi.push({
                "y": parseFloat(data.height)
            })
            if (oldthree && oldthree.datetime_on && oldthree.datetime_on === oldthree.datetime_on && oldthree.created_at) {
                categoriesbmi.push(getTime(new Date(data.datetime_on, this.state.time_foramt)))
            }
            else {
                categoriesbmi.push(getDate(data.datetime_on, this.state.date_format))
            }
            oldthree = data;
            })}
            options ={
                title: {
                    text: weight_bmi
                },

                yAxis: {
                    title: {
                        text: weight
                    }
                },
                yAxis: [{
                    title: {
                        text: BMI,
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: weight
                    }
                }],
                xAxis: {
                    title: {
                        text: date
                    },
                    categories: categoriesbmi
                },
                plotOptions: {
                    series: {
                        marker: {
                            enabled: true,
                            radius: 3
                        }
                    }
                },
                chart: {
                    type: 'line'
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: weight,
                    data: weightbmi,
                    type: 'line'
                },
                {
                    name: height,
                    data: heightbmi,
                    type: 'line',
                    color: 'red'
                },
                {
                    name: BMI,
                    data: Ibmi,
                    type: 'line'
                }]
            }
            return options;
        }
        if (current_Graph === 'blood_sugar') {
            var categoriesbs = [], oldtwo, hbac = [], blood_s = [];
            {
                this.state.personalinfo && this.state.personalinfo.blood_sugar && this.state.personalinfo.blood_sugar.length > 0 && this.state.personalinfo.blood_sugar.map((data, index) => {
                    hbac.push({
                        "y": parseFloat(data.Hba1c)
                    })
                    blood_s.push({
                        "y": parseFloat(data.blood_sugar)
                    })
                    if (oldtwo && oldtwo.datetime_on && oldtwo.datetime_on === data.datetime_on && oldtwo.created_at) {
                        categoriesbs.push(getTime(new Date(data.datetime_on, this.state.time_foramt)))
                    }
                    else {
                        categoriesbs.push(getDate(data.datetime_on, this.state.date_format))
                    }
                    oldtwo = data;
                })
            }
            options = {
                title: {
                    text: blood_sugar
                },

                yAxis: {
                    title: {
                        text: blood_sugar
                    }
                },
                xAxis: {
                    title: {
                        text: date
                    },
                    categories: categoriesbs
                },

                plotOptions: {
                    series: {
                        marker: {
                            enabled: true,
                            radius: 3
                        }
                    }
                },
                chart: {
                    type: 'line'
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: blood_sugar,
                    data: blood_s,
                    type: 'line'
                },
                {
                    name: 'HBA1c',
                    data: hbac,
                    type: 'line'
                }]
            }
            return options;
        }
    }


    GetTimess = (start_time) => {
        let da1 = new Date();
        if (start_time) {
            var t1 = start_time.split(":");
        }

        if (t1 && t1.length > 0) {
            da1.setHours(t1[0]);
            da1.setMinutes(t1[1]);
        }
        else {
            da1.setHours('00');
            da1.setMinutes('00');
        }
        if (this.state.time_format === '12') {
            return moment(da1).format('hh:mm a')
        }
        else {
            return moment(da1).format('HH:mm')
        }
    }

    
    getFileName=(file)=>{
        if(file && file.filename)
        {
            if(file.filename.split('Trackrecord/')[1])
            {
                if((file.filename.split('Trackrecord/')[1]).split("&bucket=")[0]){
                    return  file.filename.split('Trackrecord/')[1].split("&bucket=")[0]
                }
                else{
                    return  file.filename.split('Trackrecord/')[1]
                }
            }
            else {
                return file.filename;   
            }
        } 
        else return '';
    }

    render() {
        let translate;
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "default":
                translate = translationEN.text
        }
        let {open, blood_pressure, visible, feeling, show, date, time, hide, until, archive, rr_systolic, view_all, vdo_call, office_visit, consultancy, appointments,
            visibility, edit, Delete, RR_diastolic, heart_rate, always, VeiwGraph, no_data_avlbl, add_new_entry, weight_bmi, Creatinine, blood_sugar, last_doc_visit, upcming_apointment, last_document, prescriptions, sick_cert,
            Change, de_archive, Download } = translate;
        var item = this.state.item;
        return (
            <div>
                {this.state.added_data && this.state.added_data.length > 0 && this.state.added_data.map((item,index) => (
                    <div key={index}>
                        {item === 'graph_blood_pressure' &&
                            <Grid className="persBlodMesur">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item sxs={6} md={6} className="lstView">
                                        <label>{blood_pressure}</label>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="persBlodImg scndOptionIner1">
                                            {this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure.length > 0 && <a className="openScndhrf1">
                                                <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                                <ul>
                                                    {this.props.from === 'patient' && <li>
                                                        {this.state.personalinfo.blood_pressure[0].created_by === this.state.loggedinUser._id && (!this.state.personalinfo.blood_pressure[0].updated_by || this.state.personalinfo.blood_pressure[0].updated_by === "") ?
                                                            <a onClick={() => this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                            : <a onClick={() => this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0], true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                        }
                                                    </li>}
                                                    {this.props.from !== 'patient' && <li><a onClick={() => this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                                    <li><a onClick={() => this.props.downloadTrack(this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                                    <li><a onClick={() => this.props.OpenGraph('blood_pressure')}><img src={require('../../../../assets/images/eye2.png')} alt="" title="" />{VeiwGraph}</a></li>
                                                </ul>
                                            </a>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure.length > 0 ?
                                    <div>
                                        <Grid className="presureData">
                                            <h3>{this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure[0] && (this.state.personalinfo.blood_pressure[0].rr_systolic + '/' + this.state.personalinfo.blood_pressure[0].rr_diastolic)} <span>mmHg</span></h3>
                                            <p>{getDate(this.state.personalinfo.blood_pressure[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_pressure[0].datetime_on), this.state.time_foramt)}</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            {/* <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" /> */}

                                            <HighchartsReact
                                                constructorType={"chart"}
                                                ref={this.chartComponent}
                                                highcharts={Highcharts}
                                                options={this.state.blood_pressure}
                                            />
                                            <a onClick={() => this.props.OpenGraph('blood_pressure')}>{VeiwGraph}</a>
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        {this.props.from === 'patient' && <h3 onClick={() => this.props.SelectOption('blood_pressure')}>+ {add_new_entry}</h3>}
                                    </Grid>}
                            </Grid>
                        }

                        {item === 'graph_weight_bmi' &&
                            <Grid className="persBlodMesur">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6} className="lstView">
                                        <label>{weight_bmi}</label>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="persBlodImg scndOptionIner1">
                                            {this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi.length > 0 && <a className="openScndhrf1">
                                                <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                                <ul>
                                                    {this.props.from === 'patient' && <li>
                                                        {this.state.personalinfo.weight_bmi[0].created_by === this.state.loggedinUser._id && (!this.state.personalinfo.weight_bmi[0].updated_by || this.state.personalinfo.weight_bmi[0].updated_by === "") ?
                                                            <a onClick={() => this.props.EidtOption(this.state.personalinfo.weight_bmi[0].type, this.state.personalinfo.weight_bmi[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                            : <a onClick={() => this.props.EidtOption(this.state.personalinfo.weight_bmi[0].type, this.state.personalinfo.weight_bmi[0], true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                        }
                                                    </li>}
                                                    {this.props.from !== 'patient' && <li><a onClick={() => this.props.EidtOption(this.state.personalinfo.weight_bmi[0].type, this.state.personalinfo.weight_bmi[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                                    <li><a onClick={() => this.props.downloadTrack(this.state.personalinfo.weight_bmi[0])}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                                    <li><a onClick={() => this.props.OpenGraph('weight_bmi')}><img src={require('../../../../assets/images/eye2.png')} alt="" title="" />{VeiwGraph}</a></li>
                                                </ul>
                                            </a>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi.length > 0 ?
                                    <div>
                                        <Grid className="presureData">
                                        
                                            <h3>{this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi[0] && ((this.state.personalinfo.weight_bmi[0].weight/(this.state.personalinfo.weight_bmi[0].height * this.state.personalinfo.weight_bmi[0].height)* 10000).toFixed(2))} <span>BMI</span></h3>
                                            <p>{getDate(this.state.personalinfo.weight_bmi[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.weight_bmi[0].datetime_on), this.state.time_foramt)}</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <HighchartsReact
                                                constructorType={"chart"}
                                                ref={this.chartComponent}
                                                highcharts={Highcharts}
                                                options={this.state.weight_bmi}
                                            />
                                            <a onClick={() => this.props.OpenGraph('weight_bmi')}>{VeiwGraph}</a>
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        {this.props.from === 'patient' && <h3 onClick={() => this.props.SelectOption('weight_bmi')}>+ {add_new_entry}</h3>}
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'graph_heart_rate' &&
                            <Grid className="persBlodMesur">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6} className="lstView">
                                        <label>{heart_rate}</label>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="persBlodImg scndOptionIner1">
                                            {this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure.length > 0 && <a className="openScndhrf1">
                                                <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                                <ul>
                                                    {this.props.from === 'patient' && <li>
                                                        {this.state.personalinfo.blood_pressure[0].created_by === this.state.loggedinUser._id && (!this.state.personalinfo.blood_pressure[0].updated_by || this.state.personalinfo.blood_pressure[0].updated_by === "") ?
                                                            <a onClick={() => this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                            : <a onClick={() => this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0], true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                        }
                                                    </li>}
                                                    {this.props.from !== 'patient' && <li><a onClick={() => this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                                    <li><a onClick={() => this.props.downloadTrack(this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                                    <li> <a onClick={() => this.props.OpenGraph('heart_rate')}><img src={require('../../../../assets/images/eye2.png')} alt="" title="" />{VeiwGraph}</a></li>
                                                </ul>
                                            </a>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure.length > 0 ?
                                    <div>
                                        <Grid className="presureData">
                                            <h3>{this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure[0] && (this.state.personalinfo.blood_pressure[0].heart_frequncy)} <span>b/min</span></h3>
                                            <p>{getDate(this.state.personalinfo.blood_pressure[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_pressure[0].datetime_on), this.state.time_foramt)}</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <HighchartsReact
                                                constructorType={"chart"}
                                                ref={this.chartComponent}
                                                highcharts={Highcharts}
                                                options={this.state.heart_rate}
                                            />
                                            <a onClick={() => this.props.OpenGraph('heart_rate')}>{VeiwGraph}</a>
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        {this.props.from === 'patient' && <h3 onClick={() => this.props.SelectOption('blood_pressure')}>+ {add_new_entry}</h3>}
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'creatnine' &&
                            <Grid className="persBlodMesur">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6} className="lstView">
                                        <label>{Creatinine}</label>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="persBlodImg scndOptionIner1">
                                            {this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && <a className="openScndhrf1">
                                                <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                                <ul>
                                                    {this.props.from === 'patient' && <li>
                                                        {this.state.personalinfo.laboratory_result[0].created_by === this.state.loggedinUser._id && (!this.state.personalinfo.laboratory_result[0].updated_by || this.state.personalinfo.laboratory_result[0].updated_by === "") ?
                                                            <a onClick={() => this.props.EidtOption(this.state.personalinfo.laboratory_result[0].type, this.state.personalinfo.laboratory_result[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                            : <a onClick={() => this.props.EidtOption(this.state.personalinfo.laboratory_result[0].type, this.state.personalinfo.laboratory_result[0], true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                        }
                                                    </li>}
                                                    {this.props.from !== 'patient' && <li><a onClick={() => this.props.EidtOption(this.state.personalinfo.laboratory_result[0].type, this.state.personalinfo.laboratory_result[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                                    <li><a onClick={() => this.props.downloadTrack(this.state.personalinfo.laboratory_result[0])}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                                    <li> <a onClick={() => this.props.OpenGraph('laboratory_result')}><img src={require('../../../../assets/images/eye2.png')} alt="" title="" />{VeiwGraph}</a></li>
                                                </ul>
                                            </a>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 ?
                                    <div>
                                        <Grid className="presureData">
                                            <h3>{this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result[0] && (this.state.personalinfo.laboratory_result[0].value)} <span>mmol/l</span></h3>
                                            <p>{getDate(this.state.personalinfo.laboratory_result[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.laboratory_result[0].datetime_on), this.state.time_foramt)}</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <HighchartsReact
                                                constructorType={"chart"}
                                                ref={this.chartComponent}
                                                highcharts={Highcharts}
                                                options={this.state.laboratory_result}
                                            />
                                            <a onClick={() => this.props.OpenGraph('laboratory_result')}>{VeiwGraph}</a>
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        {this.props.from === 'patient' && <h3 onClick={() => this.props.SelectOption('laboratory_result')}>+ {add_new_entry}</h3>}
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'graph_blood_sugar' &&
                            <Grid className="persBlodMesur">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6} className="lstView">
                                        <label>{blood_sugar}</label>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="persBlodImg scndOptionIner1">
                                            {this.state.personalinfo && this.state.personalinfo.blood_sugar && this.state.personalinfo.blood_sugar.length > 0 && <a className="openScndhrf1">
                                                <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                                <ul>
                                                    {this.props.from === 'patient' && <li>
                                                        {this.state.personalinfo.blood_sugar[0].created_by === this.state.loggedinUser._id && (!this.state.personalinfo.blood_sugar[0].updated_by || this.state.personalinfo.blood_sugar[0].updated_by === "") ?
                                                            <a onClick={() => this.props.EidtOption(this.state.personalinfo.blood_sugar[0].type, this.state.personalinfo.blood_sugar[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                            : <a onClick={() => this.props.EidtOption(this.state.personalinfo.blood_sugar[0].type, this.state.personalinfo.blood_sugar[0], true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                        }
                                                    </li>}
                                                    {this.props.from !== 'patient' && <li><a onClick={() => this.props.EidtOption(this.state.personalinfo.blood_sugar[0].type, this.state.personalinfo.blood_sugar[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                                    <li><a onClick={() => this.props.downloadTrack(this.state.personalinfo.blood_sugar[0])}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                                    <li><a onClick={() => this.props.OpenGraph('blood_sugar')}><img src={require('../../../../assets/images/eye2.png')} alt="" title="" />{VeiwGraph}</a></li>
                                                </ul>
                                            </a>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.blood_sugar && this.state.personalinfo.blood_sugar.length > 0 ?
                                    <div>
                                        <Grid className="presureData">
                                            <h3>{this.state.personalinfo && this.state.personalinfo.blood_sugar && this.state.personalinfo.blood_sugar[0] && (this.state.personalinfo.blood_sugar[0].blood_sugar)} <span>mg/dl</span></h3>
                                            <p>{getDate(this.state.personalinfo.blood_sugar[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_sugar[0].datetime_on), this.state.time_foramt)}</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <HighchartsReact
                                                constructorType={"chart"}
                                                ref={this.chartComponent}
                                                highcharts={Highcharts}
                                                options={this.state.blood_sugar}
                                            />
                                            <a onClick={() => this.props.OpenGraph('blood_sugar')}>{VeiwGraph}</a>
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        {this.props.from === 'patient' && <h3 onClick={() => this.props.SelectOption('blood_sugar')}>+ {add_new_entry}</h3>}
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'last_doctor_visit' &&
                            <Grid className="drVisit">
                                <h3>{last_doc_visit}</h3>
                                {this.state.personalinfo && this.state.personalinfo.last_dv && this.state.personalinfo.last_dv.length > 0 ?
                                    <div>
                                        {this.state.personalinfo.last_dv.map((data, index) => (
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={2} md={2}>
                                                    <Grid className="drVisitImg">
                                                        <img src={data && data.image ? getImage(data.image, this.state.images) : require('../../../../assets/images/dr1.jpg')} alt="" title="" />
                                                        {/* <img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" /> */}
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={10} md={10}>
                                                    <Grid className="drVisitData">
                                                        <label>{data.doctor_name}</label>
                                                        <p>{getDate(data.datetime_on, this.state.date_format)}, {getTime(new Date(data.datetime_on), this.state.time_foramt)}</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        ))}
                                    </div>
                                    : <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        {this.props.from === 'patient' && <h3 onClick={() => this.props.SelectOption('doctor_visit')}>+ {add_new_entry}</h3>}
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'upcomming_appointments' &&
                            <Grid className="comeAppoint">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={10} md={10}>
                                        <Grid className="upcomView"><label>{upcming_apointment}</label> {this.props.from === 'patient' && <a onClick={this.props.MoveAppoint}>{view_all}</a>}</Grid>
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        {/* <Grid className="allViewDots scndOptionIner1">
                                        <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                        <ul>
                                            {this.props.from === 'patient' &&  <li>
                                                    {item.created_by === this.state.loggedinUser._id && ( !item.updated_by || item.updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                    : <a onClick={()=>this.props.EidtOption(item.type, item, true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                    }
                                                 </li>}
                                                {this.props.from !== 'patient' && <li><a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                            <li><a onClick={() => this.props.downloadTrack(item)}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                          
                                        </ul>
                                    </a>
                                    </Grid> */}
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>

                                {this.state.upcoming_appointment && this.state.upcoming_appointment.length > 0 ?
                                    <div>

                                        {this.state.upcoming_appointment.map((data, index) => (
                                            <div>
                                                <Grid className="oficVisit">
                                                    <label>{getDate(data.date, this.state.date_format)}, {data.start_time && this.GetTimess(data.start_time)}</label>

                                                    {data.appointment_type === 'appointments' && <a><img src={require('../../../../assets/images/office-visit.svg')} alt="" title="" /> {office_visit}</a>}
                                                    {data.appointment_type === 'online_appointment' && <a><img src={require('../../../../assets/images/video-call.svg')} alt="" title="" />{vdo_call}</a>}
                                                    {data.appointment_type === 'practice_days' && <a><img src={require('../../../../assets/images/cal.png')} alt="" title="" />{consultancy} {appointments}</a>}
                                                </Grid>
                                                <Grid className="neuroSection">
                                                    <h3>{data.docProfile && data.docProfile.speciality &&  getSpec(data.docProfile.speciality, this.props.stateLanguageType)}</h3>
                                                    <p>{data.docProfile && data.docProfile.subspeciality && getSpec(data.docProfile.subspeciality, this.props.stateLanguageType)}</p>
                                                    <Grid><a><img src={this.state.doc_image} alt="" title="" />{data.docProfile && data.docProfile.first_name && data.docProfile.first_name} {data.docProfile && data.docProfile.last_name && data.docProfile.last_name} (Doctor)</a></Grid>
                                                    {/* <Grid><a><img src={require('../../../../assets/images/h2Logo.jpg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid> */}
                                                </Grid>
                                            </div>))}
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        {this.props.from === 'patient' && <h3 onClick={() => this.props.MoveAppoint()}>+ {add_new_entry}</h3>}
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'last_documents' &&
                            <Grid className="lstDocs">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={10} md={10}>
                                        <Grid className="lstView">
                                            <label>{last_document}</label> {this.props.from === 'patient' && <a onClick={() => this.props.MoveDocument()}>{view_all}</a>}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        {/* <Grid className="lstViewDots scndOptionIner1">
                                    <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                        <ul>
                                            {this.props.from === 'patient' &&  <li>
                                                    {item.created_by === this.state.loggedinUser._id && ( !item.updated_by || item.updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                    : <a onClick={()=>this.props.EidtOption(item.type, item, true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                    }
                                                 </li>}
                                                {this.props.from !== 'patient' && <li><a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                            <li><a onClick={() => this.props.downloadTrack(item)}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                          
                                        </ul>
                                    </a>
                                    </Grid> */}
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>

                                <Grid className="presSec">
                                    <a className="presSecAncr">
                                        <h4>{prescriptions}</h4>
                                        {this.state.personalinfo && this.state.personalinfo.prescriptions && this.state.personalinfo.prescriptions.length > 0 ?
                                            <div>
                                                {this.state.personalinfo.prescriptions.map((itm) => (
                                                    <div className="metroDoctor">
                                                        <Grid container direction="row" alignItems="center" className="metroPro">
                                                            <Grid item xs={9} md={9}>{ itm.attachfile && itm.attachfile.length>0 && itm.attachfile[0] &&  this.getFileName(itm.attachfile[0])}</Grid>
                                                            <Grid item xs={3} md={3} className="metroPrOpen">
                                                                {itm.attachfile && itm.attachfile.length > 0 && itm.attachfile[0] && itm.attachfile[0].filename && <a onClick={() => GetUrlImage(itm.attachfile[0].filename)}>{open}</a>}
                                                            </Grid>
                                                            <Grid className="clear"></Grid>
                                                        </Grid>
                                                        <Grid>
                                                            {/* <a><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" /> </a> */}
                                                        </Grid>
                                                    </div>
                                                ))}
                                            </div> :
                                            <Grid className="noBpData">
                                                <p>{no_data_avlbl}</p>
                                                {this.props.from === 'patient' && <h3 onClick={() => this.props.MoveDocument()}>+{add_new_entry}</h3>}
                                            </Grid>}
                                    </a>

                                    <a className="presSecAncr">
                                        <h4>{sick_cert}</h4>
                                        {this.state.personalinfo && this.state.personalinfo.sick_certificates && this.state.personalinfo.sick_certificates.length > 0 ?
                                            <div>
                                                {this.state.personalinfo.sick_certificates.map((itm) => (
                                                    <div className="metroDoctor">
                                                        <Grid container direction="row" alignItems="center" className="metroPro">
                                                            <Grid item xs={9} md={9}>{itm.attachfile && itm.attachfile.length>0 && itm.attachfile[0] &&  this.getFileName(itm.attachfile[0])}</Grid>
                                                            <Grid item xs={3} md={3} className="metroPrOpen">
                                                                {itm.attachfile && itm.attachfile.length > 0 && itm.attachfile[0] && itm.attachfile[0].filename && <a onClick={() => GetUrlImage(itm.attachfile[0].filename)}>{open}</a>}
                                                            </Grid>
                                                            <Grid className="clear"></Grid>
                                                        </Grid>
                                                        <Grid>
                                                            {/* <a><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" /> </a> */}
                                                        </Grid>
                                                    </div>
                                                ))}
                                            </div> :
                                            <Grid className="noBpData">
                                                <p>{no_data_avlbl}</p>
                                                {this.props.from === 'patient' && <h3 onClick={() => this.props.MoveDocument()}>+ {add_new_entry}</h3>}
                                            </Grid>}
                                    </a>
                                </Grid>
                            </Grid>
                        }
                    </div>
                ))}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
const FinalExport = withRouter(connect(mapStateToProps, { LanguageFetchReducer })(RightManage));
export default pure(FinalExport);