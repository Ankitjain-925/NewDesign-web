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
import Notification from "../../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import sitedata from '../../../../sitedata';
import axios from 'axios';
import PharamacyModal from './../../../Doctor/PharamacyInfo/index.js';
import DoctorInviteModal from './../../../Doctor/DoctorInvite/index.js'



class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
            diagnosisdata: [],
            mediacationdata: [],
            allergydata: [],
            family_doc: [],
            donar: {},
            contact_partner: {},
            loaderImage: false,
            openInvt: false,
            openPharma: false,
            
            UpDataDetails: [],
            invitation: {}
        };
        new Timer(this.logOutClick.bind(this))
    }

    //For loggedout if logged in user is deleted 
    componentDidMount() {
        new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        this.props.Settings(this.props.stateLoginValueAim.token);
        this.getUserData();
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

    //For Appointmet
    Appointment = () => {
        this.props.history.push('/doctor/appointment')
    }

    render() {
        const { inputValue, value } = this.state;
        const { selectedOption } = this.state
        return (
            <Grid item xs={12} md={1} className="MenuLeftUpr ">
                {!this.props.isNotShow && <Notification />}
                <Grid className="webLogo">
                    <a href="/"><img src={require('../../../../assets/images/logo_new.png')} alt="" title="" /></a>
                </Grid>
                <Grid className="menuItems">
                    <ul>
                        <li className={this.props.currentPage === 'appointment' ? "menuActv" : ""}>
                            <a onClick={this.Appointment}>
                                {this.props.currentPage === 'appointment' ? <img src={require('../../../../assets/images/appointActive.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-appointments.svg')} alt="" title="" />}
                                <span>Appointments</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'chat' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'chat' ? <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />}
                                <span>Chat & <br /> Videocalls</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'patient' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'patient' ? <img src={require('../../../../assets/images/patientinfo.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/patientinfo.png')} alt="" title="" />}
                                <span>Patients</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'inquiries' ? "menuActv" : ""}>
                            <a onClick={this.MyDocument}>
                                {this.props.currentPage === 'inquiries' ? <img src={require('../../../../assets/images/activeDocs.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-my-documents-inquiries.svg')} alt="" title="" />}
                                <span>Inquiries</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'tracker' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'tracker' ? <img src={require('../../../../assets/images/nav-trackers.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-trackers.svg')} alt="" title="" />}
                                <span>Emergency Access</span>
                            </a>
                        </li>
                        <li>
                            <a className="moreMenu">
                                <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                <span>More</span>
                                <div className="moreMenuList">
                                    <ul>
                                        <li><a onClick={this.handleOpenInvt}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Invite Doctors</a></li>
                                        <li className="doctor-menu"><a onClick={this.handleOpenPharma}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Pharmacy Prescription</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="profilMenu" className={this.props.currentPage === 'profile' ? "menuActv" : ""} onClick={this.Myprofile}>
                                <img src={require('../../../../assets/images/nav-my-profile.svg')} alt="" title="" />
                                <span>My Profile</span>
                                <div className="profilMenuList">
                                    <ul>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Dark Mode</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Log out</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li>
                    </ul>
                </Grid>
                {/* Model setup */}
                <DoctorInviteModal openInvt={this.state.openInvt} handleOpenInvt={this.handleOpenInvt} handleCloseInvt={this.handleCloseInvt} />
                {/* End of Model setup */}
                {/* Pharmacy Prescription */}
                <PharamacyModal openPharma={this.state.openPharma} handleOpenPharma={this.handleOpenPharma} handleClosePharma={this.handleClosePharma} />
                {/* End of Pharmacy Prescription */}

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