import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import Modal from '@material-ui/core/Modal';
import sitedata from "../../../../sitedata"
import axios from "axios"
import { LoginReducerAim } from '../../../Login/actions';
import { Settings } from '../../../Login/setting';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from '../../../actions';
import LogOut from './../../LogOut/index';
import Timer from './../../TimeLogOut/index';
import Mode from './../../ThemeMode/index.js';
import SetLanguage from './../../SetLanguage/index.js';
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
            openFancyLanguage: false,
            PassDone:false,
            mode:'normal', 
        };
        new Timer(this.logOutClick.bind(this))
    }

    //For loggedout if logged in user is deleted 
    componentDidMount() {
        this.getSetting();
        new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
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
                    // this.props.LanguageFetchReducer(this.state.languageValue);
                })
            })
    }
    // Change Language function
    changeLanguage = (e) => {
        this.setState({ languageValue: e.target.value })
    }

    openLanguageModel=() =>{
        this.setState({ openFancyLanguage: true })
    }

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

    //For My Profile link
    ProfileLink = () => {
        this.props.history.push('/nurse/profile');
    }

    //For online Course
    OnlineCourse = () => {
        this.props.history.push('/nurse/online-course');
    }
    //For Timeline / Journal
    Journal = () => {
        this.props.history.push('/nurse/journal');
    }
    //For chat
    Chats = () => {
        this.props.history.push('/nurse');
    }

    //For Emergency
    Emergency = () => {
        this.props.history.push('/nurse/emergency');
    }

    render() {
        return (
            <Grid item xs={12} md={1} className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "MenuLeftUpr MenuLeftDrkUpr" : "MenuLeftUpr"}>
                {!this.props.isNotShow && <Notification />}
                <Grid className="webLogo">
                    <a><img src={require('../../../../assets/images/LogoPNG.png')} alt="" title="" /></a>
                </Grid>
                <Grid className="menuItems">
                    <ul>
                        <li className={this.props.currentPage === 'chat' ? "menuActv" : ""}>
                            <a onClick={this.Chats}>
                            <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />
                                {/* {this.props.currentPage === 'chat' ? <img src={require('../../../../assets/images/chatVideoActive.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/chatVideo.jpg')} alt="" title="" />} */}
                                <span>Chat & <br /> Videocalls</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'journal' ? "menuActv" : ""}>
                            <a onClick={this.Journal}>
                            <img src={require('../../../../assets/images/nav-journal.svg')} alt="" title="" />
                                {/* {this.props.currentPage === 'journal' ? <img src={require('../../../../assets/images/menu1.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/inactiveJournal.jpg')} alt="" title="" />} */}
                                <span>Patient Access Data</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'emergency' ? "menuActv" : ""}>
                            <a onClick={this.Emergency}>
                            <img src={require('../../../../assets/images/para.png')} alt="" title="" />
                                {/* {this.props.currentPage === 'appointment' ? <img src={require('../../../../assets/images/appointActive.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/calenderIcon.jpg')} alt="" title="" />} */}
                                <span>Emergency Access</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'course' ? "menuActv" : ""}>
                            <a onClick={this.OnlineCourse} >
                                <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />
                                <span>Aimedis Online Courses</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'profile' ? "menuActv" : ""}>
                            <a className="profilMenu">
                            <img src={require('../../../../assets/images/nav-my-profile.svg')} alt="" title="" />
                                {/* {this.props.currentPage === 'profile' ? <img src={require('../../../../assets/images/profileActv.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/useru.jpg')} alt="" title="" />} */}
                                <span>My Profile</span>
                                <div className="profilMenuList">
                                    <ul>
                                        <li><a onClick={this.ProfileLink}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                        <li><a onClick={this.openLanguageModel}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Dark Mode<Mode mode={this.state.mode} name="mode" getSetting={this.getSetting} /></a></li>
                                        <li onClick={this.logOutClick}><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Log out</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li>
                    </ul>
                </Grid>
                <SetLanguage getSetting={this.getSetting} openFancyLanguage={this.state.openFancyLanguage} languageValue={this.state.languageValue} handleCloseFancyLanguage={this.handleCloseFancyLanguage} openLanguageModel={this.openLanguageModel}/>
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