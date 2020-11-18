import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { LoginReducerAim } from '../../../Login/actions';
import { Settings } from '../../../Login/setting';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from '../../../actions';
import { slide as Menu } from "react-burger-menu";
import LogOut from './../../LogOut/index';
import Timer from './../../TimeLogOut/index';
import Mode from './../../ThemeMode/index.js';
import sitedata from "../../../../sitedata"
import axios from "axios"
import SetLanguage from './../../SetLanguage/index.js';
import Notification from "../../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import * as translationEN from "../../../../translations/en.json"
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/nl.json';
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


    //For logout the User
    logOutClick = () => {
        let email = "";
        let password = "";
        this.props.LoginReducerAim(email, password);
        let languageType = 'en';
        this.props.LanguageFetchReducer(languageType);
    }

    openLanguageModel =()=> {
        this.setState({ openFancyLanguage: true })
    }

    handleCloseFancyLanguage=()=> {
        this.setState({ openFancyLanguage: false })
    }

    //For Profile Course
    ProfileLink = ()=>{
        this.props.history.push('/insurance/profile');    
    }
    //For online Course
    OnlineCourse = ()=>{
        this.props.history.push('/insurance/online-course');    
    }
    //For Emergency page
    Emergency = ()=>{
        this.props.history.push('/insurance');    
    }
    //For Chat page
    Chats = ()=>{
        this.props.history.push('/insurance/chats');  
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
                        <li className={this.props.currentPage === 'emergency' ? "menuActv" : ""}>
                            <a onClick={this.Emergency}>
                            {this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' 
                            ? <img src={require('../../../../assets/images/ermerAccess-white.svg')} alt="" title="" />
                            : <img src={require('../../../../assets/images/ermerAccess.svg')} alt="" title="" />}
                                <span>{emegancy_access}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'course' ? "menuActv" : ""}>
                            <a onClick={this.OnlineCourse} >
                            {this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' 
                            ? <img src={require('../../../../assets/images/onlineCourses-white.svg')} alt="" title="" />
                            : <img src={require('../../../../assets/images/onlineCourses.svg')} alt="" title="" />}
                                <span>Aimedis {online_course}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'chat' ? "menuActv" : ""}>
                            <a onClick={this.Chats}>
                            {this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' 
                            ? <img src={require('../../../../assets/images/nav-chat-white.svg')} alt="" title="" />
                            : <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />}
                               
                                <span>{chat_vdocall}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'profile' ? "menuActv" : ""}>
                            <a className="profilMenu">
                            <img src={require('../../../../assets/images/nav-my-profile.svg')} alt="" title="" />
                               
                                <span>{my_profile}</span>
                                <div className="profilMenuList">
                                    <ul>
                                        <li><a onClick={this.ProfileLink}>{this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' 
                                            ? <img src={require('../../../../assets/images/menudocs-white.jpg')} alt="" title="" />
                                            : <img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />}{profile_setting}</a></li>
                                        <li><a onClick={this.openLanguageModel}>{this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' 
                                            ? <img src={require('../../../../assets/images/menudocs-white.jpg')} alt="" title="" />
                                            : <img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />}{Language}</a></li>
                                        <li><a>{this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' 
                                            ? <img src={require('../../../../assets/images/menudocs-white.jpg')} alt="" title="" />
                                            : <img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />}{DarkMode} <Mode mode={this.state.mode} name="mode" getSetting={this.getSetting} /></a></li>
                                        <li onClick={this.logOutClick}><a>{this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' 
                                            ? <img src={require('../../../../assets/images/menudocs-white.jpg')} alt="" title="" />
                                            : <img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />}{logout}</a></li>
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
            {/* For set the language  */}
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