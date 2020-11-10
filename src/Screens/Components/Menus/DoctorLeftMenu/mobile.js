import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { LoginReducerAim } from '../../../Login/actions';
import { Settings } from '../../../Login/setting';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from '../../../actions';
import LogOut from './../../LogOut/index';
import Timer from './../../TimeLogOut/index';
import { slide as Menu } from "react-burger-menu";
import Mode from './../../ThemeMode/index.js';
import sitedata from "../../../../sitedata"
import axios from "axios"
import Notification from "../../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import PharamacyModal from './../../../Doctor/PharamacyInfo/index.js';
import DoctorInviteModal from './../../../Doctor/DoctorInvite/index.js'
import * as translationEN from "../../../../translations/en.json"
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/en.json';
import SetLanguage from './../../SetLanguage/index.js';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            diagnosisdata: [],
            mediacationdata: [],
            allergydata: [],
            family_doc: [],
            donar: {},
            contact_partner: {},
            loaderImage: false,
            mode:'normal', 
        };
        new Timer(this.logOutClick.bind(this))
    }

    //For loggedout if logged in user is deleted 
    componentDidMount() {
        this.getSetting();
        new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        this.getUserData();
    }

    getSetting = () => {
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/UserProfile/updateSetting',
            {
                headers: {
                    'token': this.props.stateLoginValueAim.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                if (responce.data.hassuccessed && responce.data.data) {
                    this.setState({ timeF: { label: responce.data.data.time_format, value: responce.data.data.time_format }, dateF: { label: responce.data.data.date_format, value: responce.data.data.date_format }, })
                    this.props.Settings(responce.data.data); 
                }
                else{
                    this.props.Settings({user_id : this.props.stateLoginValueAim.user._id}); 
                }
                this.setState({ loaderImage: false, languageValue: responce.data.data && responce.data.data.language ? responce.data.data.language : 'en', mode : responce.data.data && responce.data.data.mode ? responce.data.data.mode : 'normal' },
                ()=>{
                    this.props.LanguageFetchReducer(this.state.languageValue);
                })
            })
    }

    getUserData() {
        this.setState({ loaderImage: true, UpDataDetails: [] });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ loaderImage: false });

            this.setState({ UpDataDetails: response.data.data, city: response.data.data.city, area: response.data.data.area, profile_id: response.data.data.profile_id });


        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    
    handleOpenInvt = () => {
        this.setState({ openInvt: true });
    };
    handleCloseInvt = () => {
        this.setState({ openInvt: false });
    };

    handleOpenPharma = () => {
        this.setState({ openPharma: true });
    };
    handleClosePharma = () => {
        this.setState({ openPharma: false });
    };

      //For close the model
      openLanguageModel=()=> {
        this.setState({ openFancyLanguage: true })
    }

    //For open Model 
    handleCloseFancyLanguage=()=> {
        this.setState({ openFancyLanguage: false })
    }


    //For logout the User
    logOutClick = () => {
        let email = "";
        let password = "";
        this.props.LoginReducerAim(email, password);
        let languageType = 'en';
        this.props.LanguageFetchReducer(languageType);
    }

    //For Patient
    Service = () => {
        this.props.history.push('/doctor/patient');
    }
    //For My Document
    MyDocument = () => {
        this.props.history.push('/doctor/inquiries');
    }

    //For My Profile
    Myprofile = () => {
        this.props.history.push('/doctor/profile')
    }
    //For Chat
    Chats = ()=>{
        this.props.history.push('/doctor/chats')
    }

     //For Emergency
     Emergency = ()=>{
        this.props.history.push('/doctor/emergency')
    }

      //For Online Course
      Online = ()=>{
        this.props.history.push('/doctor/online-course')
    }

    //For Appointmet
    Appointment = () => {
        this.props.history.push('/doctor/appointment')
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
        let { appointments, chat_vdocall, capab_Patients, Inquiries, emegancy_access, more, my_profile, invite_doc,pharma_prescription, online_course, profile_setting, Language,
            DarkMode, logout } = translate;
        return (
            <Grid  className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "MenuMob MenuLeftDrkUpr" : "MenuMob"}>
                {/* <Notification /> */}
            <Grid container direction="row" alignItems="center">
                <Grid item xs={6} md={6} sm={6} className="MenuMobLeft">
                    <a><img src={require('../../../../assets//images/navigation-drawer.svg')} alt="" title="" className="MenuImg" /></a>
                    <Menu className="addCstmMenu">
                        <Grid className="menuItems">
                        <ul>
                        <li className={this.props.currentPage === 'appointment' ? "menuActv" : ""}>
                            <a onClick={this.Appointment}>
                            <img src={require('../../../../assets/images/nav-appointments.svg')} alt="" title="" />
                                {/* {this.props.currentPage === 'appointment' ? <img src={require('../../../../assets/images/appointActive.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-appointments.svg')} alt="" title="" />} */}
                                <span>{appointments}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'chat' ? "menuActv" : ""}>
                            <a onClick={this.Chats}>
                                {this.props.currentPage === 'chat' ? <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />}
                                <span>{chat_vdocall}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'patient' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'patient' ? <img src={require('../../../../assets/images/patientinfo.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/patientinfo.png')} alt="" title="" />}
                                <span>{capab_Patients}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'inquiries' ? "menuActv" : ""}>
                            <a onClick={this.MyDocument}>
                                {this.props.currentPage === 'inquiries' ? <img src={require('../../../../assets/images/activeDocs.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-my-documents-inquiries.svg')} alt="" title="" />}
                                <span>{Inquiries}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'tracker' ? "menuActv" : ""}>
                            <a onClick={this.Emergency}>
                            <img src={require('../../../../assets/images/ermerAccess.png')} alt="" title="" />
                                {/* {this.props.currentPage === 'tracker' ? <img src={require('../../../../assets/images/nav-trackers.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-trackers.svg')} alt="" title="" />} */}
                                <span>{emegancy_access}</span>
                            </a>
                        </li>
                        <li>
                            <a className="moreMenu">
                                <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                <span>{more}</span>
                                <div className="moreMenuList">
                                    <ul>  
                                        <li><a onClick={this.handleOpenInvt}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{invite_doc}</a></li>
                                        <li><a onClick={this.handleOpenPharma}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{pharma_prescription}</a></li>
                                        <li  className="doctor-menu"><a onClick={this.Online}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Aimedis {online_course}</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'profile' ? "menuActv" : ""}>
                            <a className="profilMenu">
                            <img src={require('../../../../assets/images/nav-my-profile.svg')} alt="" title="" />
                                {/* {this.props.currentPage === 'profile' ? <img src={require('../../../../assets/images/profileActv.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/useru.jpg')} alt="" title="" />} */}
                                <span>{my_profile}</span>
                                <div className="profilMenuList">
                                    <ul>
                                        <li><a onClick={this.Myprofile}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{profile_setting}</a></li>
                                        <li><a onClick={this.openLanguageModel}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{Language}</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{DarkMode}  <Mode mode={this.state.mode} name="mode" getSetting={this.getSetting} /></a></li>
                                        <li onClick={this.logOutClick}><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{logout}</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li>
                    </ul>
                        </Grid>
                    </Menu>
                </Grid>
                <Grid item xs={6} md={6} sm={6} className="MenuMobRght">
                    <a><img src={require('../../../../assets//images/LogoPNG.png')} alt="" title="" /></a>
                </Grid>
            </Grid>
              {/* Model setup */}
              <DoctorInviteModal openInvt={this.state.openInvt} handleOpenInvt={this.handleOpenInvt} handleCloseInvt={this.handleCloseInvt} />
                {/* End of Model setup */}
                {/* Pharmacy Prescription */}
                {this.state.openPharma &&
                <PharamacyModal openPharma={this.state.openPharma} handleOpenPharma={this.handleOpenPharma} handleClosePharma={this.handleClosePharma} />
                }
                {/* End of Pharmacy Prescription */}
                {/* For set the language  */}
                <SetLanguage getSetting={this.getSetting} openFancyLanguage={this.state.openFancyLanguage} languageValue={this.state.languageValue} handleCloseFancyLanguage={this.handleCloseFancyLanguage} getSetting={this.getSetting} openLanguageModel={this.openLanguageModel}/>
        </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));