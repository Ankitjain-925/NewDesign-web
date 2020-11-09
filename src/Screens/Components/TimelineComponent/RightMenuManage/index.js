import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { getDate, getTime, GetUrlImage, getSpec } from '../../BasicMethod';
import axios from 'axios';
import sitedata from '../../../../sitedata';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from '../../../actions';
import * as translationEN from "../../../../translations/en.json"
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/en.json';


class RightManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            personalinfo: this.props.personalinfo,
            upcoming_appointment : this.props.upcoming_appointment,
            added_data: this.props.added_data,
            time_format : this.props.time_format,
            date_format : this.props.date_format,
            loggedinUser : this.props.loggedinUser, 
            doc_image : '',
        };
    }

    componentDidMount = () => {

    }
    
    //On change the User Data
    componentDidUpdate = (prevProps) => {
        if (prevProps.added_data !== this.props.added_data) {
            this.setState({ added_data: this.props.added_data })
        }
        if (prevProps.personalinfo !== this.props.personalinfo) {
            this.setState({ personalinfo: this.props.personalinfo },
                ()=>{
                    var find = this.state.personalinfo && this.state.personalinfo.upcoming_appointment && this.state.personalinfo.upcoming_appointment.length>0 && this.state.personalinfo.upcoming_appointment[0] && this.state.personalinfo.upcoming_appointment[0].docProfile && this.state.personalinfo.upcoming_appointment[0].docProfile.profile_image
                    if(find)
                    {
                        var find1 = find.split('.com/')[1]
                        axios.get(sitedata.data.path + '/aws/sign_s3?find='+find1,)
                        .then((response) => {
                            if(response.data.hassuccessed) { 
                               this.setState({doc_image : response.data.data})
                            }
                        })
                    }
                })
            
        }
        if (prevProps.upcoming_appointment !== this.props.upcoming_appointment) {
            this.setState({ upcoming_appointment: this.props.upcoming_appointment })
            console.log('upcoming_appointment', this.props.upcoming_appointment)
        }
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
          let {blood_pressure, visible,feeling,show, date, time, hide, until, archive, rr_systolic,
            visibility, edit, Delete, RR_diastolic, heart_rate,always, VeiwGraph,
            Change,de_archive,Download } = translate;
        var item = this.state.item;
        return (
            <div>
                {this.state.added_data && this.state.added_data.length > 0 && this.state.added_data.map((item) => (
                    <div>
                        {item ==='graph_blood_pressure' && 
                        <Grid className="persBlodMesur">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="lstView">
                                    <label>Blood Pressure</label>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Grid className="persBlodImg scndOptionIner1">
                                    {this.state.personalinfo && this.state.personalinfo.blood_pressure &&  this.state.personalinfo.blood_pressure.length>0 && <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                        <ul>
                                            {this.props.from === 'patient' &&  <li>
                                                    {this.state.personalinfo.blood_pressure[0].created_by === this.state.loggedinUser._id && ( !this.state.personalinfo.blood_pressure[0].updated_by || this.state.personalinfo.blood_pressure[0].updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                    : <a onClick={()=>this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0], true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                    }
                                                 </li>}
                                                {this.props.from !== 'patient' && <li><a onClick={()=>this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                            <li><a onClick={() => this.props.downloadTrack(this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                          <li><a onClick={()=> this.props.OpenGraph('blood_pressure')}>View Graph</a></li>
                                        </ul>
                                    </a>}
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.blood_pressure &&  this.state.personalinfo.blood_pressure.length>0 ?
                                <div>
                                    <Grid className="presureData">
                                        <h3>{this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure[0] && (this.state.personalinfo.blood_pressure[0].rr_systolic +'/'+  this.state.personalinfo.blood_pressure[0].rr_diastolic)} <span>mmHg</span></h3>
                                        <p>{getDate(this.state.personalinfo.blood_pressure[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_pressure[0].datetime_on), this.state.time_foramt)}</p>
                                    </Grid>
                                    <Grid className="presureDataGrph">
                                        <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                        <a onClick={()=> this.props.OpenGraph('blood_pressure')}>View Graph</a>
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    {this.props.from==='patient' && <h3 onClick={()=>this.props.SelectOption('blood_pressure')}>+ add new entry</h3>}
                                </Grid>}
                        </Grid>
                         }

                        {item ==='graph_weight_bmi' && 
                        <Grid className="persBlodMesur">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="lstView">
                                    <label>Weight BMI</label>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Grid className="persBlodImg scndOptionIner1">
                                        {this.state.personalinfo && this.state.personalinfo.weight_bmi &&  this.state.personalinfo.weight_bmi.length>0 && <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                        <ul>
                                            {this.props.from === 'patient' &&  <li>
                                                    {this.state.personalinfo.weight_bmi[0].created_by === this.state.loggedinUser._id && ( !this.state.personalinfo.weight_bmi[0].updated_by || this.state.personalinfo.weight_bmi[0].updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(this.state.personalinfo.weight_bmi[0].type, this.state.personalinfo.weight_bmi[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                    : <a onClick={()=>this.props.EidtOption(this.state.personalinfo.weight_bmi[0].type, this.state.personalinfo.weight_bmi[0], true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                    }
                                                 </li>}
                                                {this.props.from !== 'patient' && <li><a onClick={()=>this.props.EidtOption(this.state.personalinfo.weight_bmi[0].type, this.state.personalinfo.weight_bmi[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                            <li><a onClick={() => this.props.downloadTrack(this.state.personalinfo.weight_bmi[0])}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                            <li><a onClick={()=> this.props.OpenGraph('weight_bmi')}>View Graph</a></li>
                                        </ul>
                                    </a>}
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.weight_bmi &&  this.state.personalinfo.weight_bmi.length>0 ?
                                <div>
                                    <Grid className="presureData">
                                        <h3>{this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi[0] && (this.state.personalinfo.weight_bmi[0].height + '/'+this.state.personalinfo.weight_bmi[0].weight )} <span>mmHg</span></h3>
                                        <p>{getDate(this.state.personalinfo.weight_bmi[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.weight_bmi[0].datetime_on), this.state.time_foramt)}</p>
                                    </Grid>
                                    <Grid className="presureDataGrph">
                                        <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                        <a onClick={()=> this.props.OpenGraph('weight_bmi')}>View Graph</a>
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    {this.props.from==='patient' && <h3 onClick={()=>this.props.SelectOption('weight_bmi')}>+ add new entry</h3>}
                                </Grid>}
                        </Grid>
                        }
                        {item ==='graph_heart_rate' && 
                        <Grid className="persBlodMesur">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="lstView">
                                    <label>Heart Rate</label>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Grid className="persBlodImg scndOptionIner1">
                                        {this.state.personalinfo && this.state.personalinfo.blood_pressure &&  this.state.personalinfo.blood_pressure.length>0 && <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                        <ul>
                                            {this.props.from === 'patient' &&  <li>
                                                    {this.state.personalinfo.blood_pressure[0].created_by === this.state.loggedinUser._id && ( !this.state.personalinfo.blood_pressure[0].updated_by || this.state.personalinfo.blood_pressure[0].updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                    : <a onClick={()=>this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0], true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                    }
                                                 </li>}
                                                {this.props.from !== 'patient' && <li><a onClick={()=>this.props.EidtOption(this.state.personalinfo.blood_pressure[0].type, this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                            <li><a onClick={() => this.props.downloadTrack(this.state.personalinfo.blood_pressure[0])}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                            <li> <a onClick={()=> this.props.OpenGraph('heart_rate')}>View Graph</a></li>
                                        </ul>
                                    </a>}
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.blood_pressure &&  this.state.personalinfo.blood_pressure.length>0 ?
                                <div>
                                    <Grid className="presureData">
                                        <h3>{this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure[0] && (this.state.personalinfo.blood_pressure[0].heart_frequncy )} <span>b/min</span></h3>
                                        <p>{getDate(this.state.personalinfo.blood_pressure[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_pressure[0].datetime_on), this.state.time_foramt)}</p>
                                    </Grid>
                                    <Grid className="presureDataGrph">
                                        <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                        <a onClick={()=> this.props.OpenGraph('heart_rate')}>View Graph</a>
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    {this.props.from==='patient' && <h3 onClick={()=>this.props.SelectOption('blood_pressure')}>+ add new entry</h3>}
                                </Grid>}
                        </Grid>
                        }
                        {item ==='creatnine' && 
                        <Grid className="persBlodMesur">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="lstView">
                                    <label>Creatinine</label>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Grid className="persBlodImg scndOptionIner1">
                                        {this.state.personalinfo && this.state.personalinfo.laboratory_result &&  this.state.personalinfo.laboratory_result.length>0 && <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                        <ul>
                                            {this.props.from === 'patient' &&  <li>
                                                    {this.state.personalinfo.laboratory_result[0].created_by === this.state.loggedinUser._id && ( !this.state.personalinfo.laboratory_result[0].updated_by || this.state.personalinfo.laboratory_result[0].updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(this.state.personalinfo.laboratory_result[0].type, this.state.personalinfo.laboratory_result[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                    : <a onClick={()=>this.props.EidtOption(this.state.personalinfo.laboratory_result[0].type, this.state.personalinfo.laboratory_result[0], true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                    }
                                                 </li>}
                                                {this.props.from !== 'patient' && <li><a onClick={()=>this.props.EidtOption(this.state.personalinfo.laboratory_result[0].type, this.state.personalinfo.laboratory_result[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                            <li><a onClick={() => this.props.downloadTrack(this.state.personalinfo.laboratory_result[0])}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                          <li> <a onClick={()=> this.props.OpenGraph('laboratory_result')}>View Graph</a></li>
                                        </ul>
                                    </a>}
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.laboratory_result &&  this.state.personalinfo.laboratory_result.length>0 ?
                                <div>
                                    <Grid className="presureData">
                                        <h3>{this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result[0] && (this.state.personalinfo.laboratory_result[0].value )} <span>mmol/l</span></h3>
                                        <p>{getDate(this.state.personalinfo.laboratory_result[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.laboratory_result[0].datetime_on), this.state.time_foramt)}</p>
                                    </Grid>
                                    <Grid className="presureDataGrph">
                                        <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                        <a onClick={()=> this.props.OpenGraph('laboratory_result')}>View Graph</a>
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    {this.props.from==='patient' && <h3 onClick={()=>this.props.SelectOption('laboratory_result')}>+ add new entry</h3>}
                                </Grid>}
                        </Grid>
                        }
                        {item ==='graph_blood_sugar' && 
                        <Grid className="persBlodMesur">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="lstView">
                                    <label>Blood Sugar</label>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Grid className="persBlodImg scndOptionIner1">
                                        {this.state.personalinfo && this.state.personalinfo.blood_sugar &&  this.state.personalinfo.blood_sugar.length>0 && <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                        <ul>
                                            {this.props.from === 'patient' &&  <li>
                                                    {this.state.personalinfo.blood_sugar[0].created_by === this.state.loggedinUser._id && ( !this.state.personalinfo.blood_sugar[0].updated_by || this.state.personalinfo.blood_sugar[0].updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(this.state.personalinfo.blood_sugar[0].type, this.state.personalinfo.blood_sugar[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                    : <a onClick={()=>this.props.EidtOption(this.state.personalinfo.blood_sugar[0].type, this.state.personalinfo.blood_sugar[0], true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                    }
                                                 </li>}
                                                {this.props.from !== 'patient' && <li><a onClick={()=>this.props.EidtOption(this.state.personalinfo.blood_sugar[0].type, this.state.personalinfo.blood_sugar[0])}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                                <li><a onClick={() => this.props.downloadTrack(this.state.personalinfo.blood_sugar[0])}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                                <li><a onClick={()=> this.props.OpenGraph('blood_sugar')}>View Graph</a></li>
                                        </ul>
                                    </a>}
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.blood_sugar &&  this.state.personalinfo.blood_sugar.length>0 ?
                                <div>
                                    <Grid className="presureData">
                                        <h3>{this.state.personalinfo && this.state.personalinfo.blood_sugar && this.state.personalinfo.blood_sugar[0] && (this.state.personalinfo.blood_sugar[0].blood_sugar )} <span>mg/dl</span></h3>
                                        <p>{getDate(this.state.personalinfo.blood_sugar[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_sugar[0].datetime_on), this.state.time_foramt)}</p>
                                    </Grid>
                                    <Grid className="presureDataGrph">
                                        <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                        <a onClick={()=> this.props.OpenGraph('blood_sugar')}>View Graph</a>
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    {this.props.from==='patient' && <h3 onClick={()=>this.props.SelectOption('blood_sugar')}>+ add new entry</h3>}
                                </Grid>}
                        </Grid>
                        }
                        {item ==='last_doctor_visit' && 
                        <Grid className="drVisit">
                            <h3>Last doctor visits</h3>
                            {this.state.personalinfo && this.state.personalinfo.last_dv &&  this.state.personalinfo.last_dv.length>0 ?
                                <div>
                                    {this.state.personalinfo.last_dv.map((data, index) => (
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={2} md={2}>
                                                <Grid className="drVisitImg">
                                                    <img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />
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
                                    <p>No data available</p>
                                    {this.props.from==='patient' &&  <h3 onClick={()=>this.props.SelectOption('doctor_visit')}>+ add new entry</h3>}
                                </Grid>}
                        </Grid>
                        }
                        {item ==='upcomming_appointments' && 
                        <Grid className="comeAppoint">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={10} md={10}>
                                <Grid className="upcomView"><label>Upcoming appointment</label> {this.props.from==='patient' &&  <a onClick={this.props.MoveAppoint}>View all</a>}</Grid>
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
                            
                            {this.state.upcoming_appointment && this.state.upcoming_appointment.length>0 ?
                                <div>
                                    {this.state.upcoming_appointment.map((data, index) => (
                                        <div>
                                        <Grid className="oficVisit">
                                            <label>{getDate(data.date, this.state.date_format)}, {data.start_time && data.start_time}</label>
                                            <a><img src={require('../../../../assets/images/h2Logo.jpg')} alt="" title="" /> 
                                            {data.appointment_type === 'private_appointment' && 'Office visit'}
                                            {data.appointment_type === 'online_appointment' && 'Video call'}
                                            {data.appointment_type === 'practice_appointment' && 'consultancy Appointment'}</a>
                                        </Grid>
                                        <Grid className="neuroSection">
                                            <h3>{data.docProfile && data.docProfile.speciality &&  getSpec(data.docProfile.speciality)}</h3>
                                            <p>{data.docProfile && data.docProfile.subspeciality &&  getSpec(data.docProfile.subspeciality)}</p>
                                            <Grid><a><img src={this.state.doc_image} alt="" title="" />{data.docProfile && data.docProfile.first_name && data.docProfile.first_name} {data.docProfile && data.docProfile.last_name && data.docProfile.last_name} (Doctor)</a></Grid>
                                            {/* <Grid><a><img src={require('../../../../assets/images/h2Logo.jpg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid> */}
                                        </Grid>
                                        </div>))}
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    {this.props.from==='patient' &&  <h3 onClick={()=>this.props.MoveAppoint()}>+ add new entry</h3>}
                                </Grid>}
                        </Grid>
                        }
                        {item ==='last_documents' && 
                        <Grid className="lstDocs">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={10} md={10}>
                                    <Grid className="lstView">
                                        <label>Last Documents</label> {this.props.from==='patient' &&  <a onClick={()=>this.props.MoveDocument()}>View all</a>}
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
                                    <h4>Prescription</h4>
                                   
                                    {this.state.personalinfo && this.state.personalinfo.prescriptions && this.state.personalinfo.prescriptions.length>0 ?
                                        <div>
                                            {this.state.personalinfo.prescriptions.map((itm)=>(
                                                <div>
                                                    <Grid container direction="row" alignItems="center" className="metroPro">
                                                        <Grid item xs={6} md={6} className="metroPrOpen">
                                                            {itm.attachfile && itm.attachfile.length>0 && itm.attachfile[0] && itm.attachfile[0].filename && <a onClick={()=>GetUrlImage(itm.attachfile[0].filename)}>Open</a>}
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                    <Grid className="metroDoctor">
                                                        <a><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" /> </a>
                                                    </Grid>
                                                </div>
                                            ))}
                                        </div> :
                                        <Grid className="noBpData">
                                            <p>No data available</p>
                                            {this.props.from==='patient' && <h3 onClick={()=>this.props.MoveDocument()}>+ add new entry</h3>}
                                        </Grid>}
                                </a>

                                <a className="presSecAncr">
                                    <h4>Sick Certificate</h4>
                                    {this.state.personalinfo && this.state.personalinfo.prescriptions && this.state.personalinfo.prescriptions.length>0 ?
                                        <div>
                                            {this.state.personalinfo.prescriptions.map((itm)=>(
                                                <div>
                                                    <Grid container direction="row" alignItems="center" className="metroPro">
                                                        <Grid item xs={6} md={6} className="metroPrOpen">
                                                            {itm.attachfile && itm.attachfile.length>0 && itm.attachfile[0] && itm.attachfile[0].filename && <a onClick={()=>GetUrlImage(itm.attachfile[0].filename)}>Open</a>}
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                    <Grid className="metroDoctor">
                                                        <a><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" /> </a>
                                                    </Grid>
                                                </div>
                                            ))}
                                        </div> :
                                        <Grid className="noBpData">
                                            <p>No data available</p>
                                            {this.props.from==='patient' &&  <h3 onClick={()=>this.props.MoveDocument()}>+ add new entry</h3>}
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
  export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(RightManage));