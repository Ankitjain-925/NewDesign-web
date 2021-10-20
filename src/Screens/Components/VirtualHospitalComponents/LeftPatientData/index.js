import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getLanguage } from "translations/index"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import { Redirect, Route } from 'react-router-dom';

class Index extends Component {
    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { BacktoPatientFlow, NewEntry, NewTask, Editinfo, More, MedicalStaff, CompletedTasks, DocumentsFiles, Assignedto, Entries, Billing, Issued, Weight,Height, BMI, Blood, BloodPressure, Lastdoctorvisits, Upcomingappointment, Neurology, LastDocuments, Prescription } = translate;
        return (
            <Grid className="asignStaf">
                <Grid className="backFlow" onClick={()=>{this.props.history.push('/virtualHospital/patient-flow')}}>
                    <a><img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" />{BacktoPatientFlow}</a>
                </Grid>
                <Grid className="asignStafInr">
                    <Grid className="newStaffUpr">
                      <Grid className="newStaffInfo">
                        <Grid className="newStaff">
                            <p>P_mDnkbR30d</p>
                            <Grid><a><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></a></Grid>
                            <Grid><label>James Morrison</label></Grid><p><span>13 / 12 / 1988 (32 years)</span></p>
                        </Grid>
                        <Grid className="entryInfo">
                          <ul>
                            <li className="entryInfoActv"><img src={require('assets/virtual_images/newEntry.png')} alt="" title="" /><label>{+NewEntry}</label></li>
                            <li><img src={require('assets/virtual_images/11.jpg')} alt="" title="" /><label>{+NewTask}</label></li>
                            <li><img src={require('assets/virtual_images/pencil.jpg')} alt="" title="" /><label>{Editinfo}</label></li>
                            <li><img src={require('assets/virtual_images/dotBrdr.jpg')} alt="" title="" /><label>{More}</label></li>
                          </ul>    
                        </Grid>
                       </Grid> 
                        <Grid container direction="row">
                            <Grid item xs={6} md={6}>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={12} md={12}>
                                        <Grid className="mdclStaff">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={6} md={8}>
                                                    <Grid className="mdclStaffLft">
                                                        <Grid><label>{MedicalStaff}</label></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={6} md={4}>
                                                    <Grid className="mdclStaffRght">
                                                      <a><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid className="mdclMembrs">
                                                <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                <a>+3</a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Grid className="cmpleteTask">
                                            <Grid><label>{CompletedTasks}</label></Grid>
                                            <p><span>1</span>/2</p>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Grid className="cmpleteTask docsFile">
                                            <Grid><label>{DocumentsFiles}</label></Grid>
                                            <p>16</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Grid container direction="row" alignItems="center">
                                    <Grid className="assignTo">
                                        <Grid container direction="row">
                                            <Grid item xs={6} md={8}>
                                                <Grid><label>{Assignedto}</label></Grid>
                                            </Grid>
                                            <Grid item xs={6} md={4}>
                                                <Grid className="assignRght"><a><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Grid className="NeuroBtn">
                                                <Grid><Button variant="contained" color="primary">Neurology</Button></Grid>
                                                <Grid className="roomsNum">
                                                    <ul>
                                                        <li><img src={require('assets/virtual_images/ward.png')} alt="" title="" />Adults Ward</li>
                                                        <li><img src={require('assets/virtual_images/room22.svg')} alt="" title="" />Room 1</li>
                                                        <li><img src={require('assets/virtual_images/bedColor.png')} alt="" title="" />Bed 2</li>
                                                    </ul>
                                                </Grid>
                                            </Grid>
                                            <Grid className="exmBtn">
                                                <a><img src={require('assets/virtual_images/content-view-column.svg')} alt="" title="" />Examinations</a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Grid className="cmpleteTask docsFile entrsSec">
                                          <Grid><label>{Entries}</label></Grid><p>26</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="bilingDocs">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={6} md={6} className="billLbl">
                                <label>{Billing}</label>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Grid className="billImg">
                                    <img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <a href className="yearSecBg">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={12} md={8}>
                                    <Grid className="yearSec">
                                        <label>2021-000248</label>
                                        <label>16/03/2020</label>
                                    </Grid>
                                    <Grid className="issuePrice">
                                        <label className="isuLbl">{Issued}</label>
                                        <label>240,00 €</label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Grid className="yearOpen"><a>Open</a></Grid>
                                </Grid>
                            </Grid>
                         </a>
                    </Grid>
                    <Grid className="profileDescp">
                        <Grid className="prfilHght">
                            <Grid className="prfilHghtLft">
                                <label>{Weight}</label>
                                <p>60<span>kg</span></p>
                            </Grid>
                            <Grid className="prfilHghtRght">
                                <label>{Height}</label>
                                <p>177<span>cm</span></p>
                            </Grid>
                        </Grid>
                        <Grid className="prfilHght">
                            <Grid className="prfilHghtLft">
                                <label>{BMI}</label>
                                <p>26.57</p>
                            </Grid>
                            <Grid className="prfilHghtRght">
                                <label>{Blood}</label>
                                <p>-AB</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="persBlodMesur">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={6} md={6} className="persBlod">
                                <label>{BloodPressure}</label>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Grid className="persBlodImg">
                                    <img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="presureData">
                            <h3>121/80 <span>mmHg</span></h3><p>17/07/2020, 12:03 AM</p>
                        </Grid>
                        <Grid className="presureDataGrph">
                            <img src={require('assets/virtual_images/lineGraph.png')} alt="" title="" />
                        </Grid>
                    </Grid>
                    <Grid className="drVisit">
                        <h3>{Lastdoctorvisits}</h3>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={2} md={2}>
                                <Grid className="drVisitImg">
                                    <img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />
                                </Grid>
                            </Grid>
                            <Grid item xs={10} md={10}>
                                <Grid className="drVisitData">
                                    <label>Mark Anderson M.D.</label><p>17/07/2020, 12:03 AM</p>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={2} md={2}>
                                <Grid className="drVisitImg">
                                    <img src={require('assets/virtual_images/dr2.jpg')} alt="" title="" />
                                </Grid>
                            </Grid>
                            <Grid item xs={10} md={10}>
                                <Grid className="drVisitData">
                                    <label>Mark Anderson M.D.</label><p>17/07/2020, 12:03 AM</p>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>
                    </Grid>
                    <Grid className="comeAppoint">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={10} md={10}>
                                <Grid className="upcomView"><label>{Upcomingappointment}</label> <a>View all</a></Grid>
                            </Grid>
                            <Grid item xs={2} md={2}>
                                <Grid className="allViewDots">
                                    <img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" />
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>
                        <Grid className="oficVisit">
                            <label>06/08/2020, 9:00 AM</label> <a><img src={require('assets/virtual_images/h2Logo.jpg')} alt="" title="" /> Office visit</a>
                        </Grid>
                        <Grid className="neuroSection">
                            <h3>{Neurology}</h3>
                            <Grid><a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />Mark Anderson M.D. (Doctor)</a></Grid>
                            <Grid><a><img src={require('assets/virtual_images/h2Logo.jpg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                        </Grid>
                    </Grid>
                    <Grid className="lstDocs">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={10} md={10}>
                                <Grid className="lstView">
                                    <label>{LastDocuments}</label> <a>View all</a>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} md={2}>
                                <Grid className="lstViewDots">
                                    <img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" />
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>
                        <Grid className="presSec">
                            <a className="presSecAncr">
                                <h4>{Prescription}</h4>
                                <Grid container direction="row" alignItems="center" className="metroPro">
                                    <Grid item xs={6} md={6}><h5>Metoprolol</h5></Grid>
                                    <Grid item xs={6} md={6} className="metroPrOpen"><a>Open</a></Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                                <Grid className="metroDoctor">
                                    <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />
                                        Mark Anderson M.D. (Doctor)
                                    </a>
                                </Grid>
                            </a>
                            <a className="presSecAncr">
                                <h4>Sick Certificate</h4>
                                <Grid container direction="row" alignItems="center" className="metroPro">
                                    <Grid item xs={12} md={12}><h5>Temperature and headaches</h5></Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                                <Grid className="metroDoctor">
                                    <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />
                                        Mark Anderson M.D. (Doctor)
                                    </a>
                                </Grid>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>   
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
      state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { House } = state.houseSelect
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    return {
      stateLanguageType,
      stateLoginValueAim,
      loadingaIndicatoranswerdetail,
      House,
      settings,
      verifyCode,
    };
  };
  export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings,authy, houseSelect })(
      Index
    )
  );