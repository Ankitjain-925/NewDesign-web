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
        };
        new Timer(this.logOutClick.bind(this))
    }

    //For loggedout if logged in user is deleted 
    componentDidMount() {
        new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        this.props.Settings(this.props.stateLoginValueAim.token);
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
        this.props.history.push('/doctor/mydocument');
    }

    //For My Profile
    Myprofile = () => {
        this.props.history.push('/doctor/profile')
    }

    render() {
        return (
            <Grid item xs={12} md={1} className="MenuLeftUpr ">
                {!this.props.isNotShow && <Notification />}
                <Grid className="webLogo">
                    <a href="/"><img src={require('../../../../assets/images/logo_new.png')} alt="" title="" /></a>
                </Grid>
                <Grid className="menuItems">
                    <ul>
                        <li className={this.props.currentPage === 'jounral' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'jounral' ? <img src={require('../../../../assets/images/nav-journal.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-journal.svg')} alt="" title="" />}
                                <span>Journal</span>
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
                        <li className={this.props.currentPage === 'appointment' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'appointment' ? <img src={require('../../../../assets/images/nav-appointments.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-appointments.svg')} alt="" title="" />}
                                <span>Appointments</span>
                            </a>
                        </li><li className={this.props.currentPage === 'mydocument' ? "menuActv" : ""}>
                            <a onClick={this.MyDocument}>
                                {this.props.currentPage === 'mydocument' ? <img src={require('../../../../assets/images/nav-my-documents-inquiries.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-my-documents-inquiries.svg')} alt="" title="" />}
                                <span>My Documents</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'tracker' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'tracker' ? <img src={require('../../../../assets/images/nav-trackers.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-trackers.svg')} alt="" title="" />}
                                <span>Trackers & <br /> Self Data</span>
                            </a>
                        </li>
                        <li>
                            <a className="moreMenu">
                                <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                <span>More</span>
                                <div className="moreMenuList">
                                    <ul>
                                        <li><a href="/secondopinion"><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Second Opinion</a></li>
                                        <li><a href="emergencypatientdata"><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Emergency Patient Data</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Aimedis Online Courses</a></li>
                                        <li><a href="/extraservices"><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Extra Services</a></li>
                                        <li><a href="/journalarchive"><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Journal Archive</a></li>
                                        <li><a href="/blockchainaccesslog"><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Blockchain Access Log</a></li>
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