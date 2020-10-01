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
            openFancyLanguage:false,
            PassDone:false
        };
        new Timer(this.logOutClick.bind(this))
        this.openLanguageModel =this.openLanguageModel.bind(this);
        this.handleCloseFancyLanguage =this.handleCloseFancyLanguage.bind(this)
    }

    //For loggedout if logged in user is deleted 
    componentDidMount() {
        this.getSetting()
        new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        this.props.Settings(this.props.stateLoginValueAim.token);
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
                console.log("getSetting responce", responce.data.data.language)
                if (responce.data.hassuccessed && responce.data.data) {
                    this.setState({ timeF: { label: responce.data.data.time_format, value: responce.data.data.time_format }, dateF: { label: responce.data.data.date_format, value: responce.data.data.date_format }, })
                }
                this.setState({ loaderImage: false, languageValue: responce.data.data.language })
            })
    }
    // Change Language function
    changeLanguage = (e) => {
        this.setState({ languageValue: e.target.value })
    }

    openLanguageModel() {
        this.setState({ openFancyLanguage: true })
    }

    handleCloseFancyLanguage() {
        this.setState({ openFancyLanguage: false })
    }
    SetLanguage = () => {
        this.setState({ loaderImage: true })
        if (!this.state.languageValue) {
            this.setState({ loaderImage: false, languageBlank: true })
        } else {
            this.setState({ languageBlank: false })
            axios.put(sitedata.data.path + '/UserProfile/updateSetting', {
                language: this.state.languageValue,
                user_id: this.props.stateLoginValueAim.user._id,
            }, {
                headers: {
                    'token': this.props.stateLoginValueAim.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                this.setState({ PassDone: true, loaderImage: false })
                this.props.Settings(this.props.stateLoginValueAim.token);
                setTimeout(() => { this.setState({ PassDone: false, openFancyLanguage: false }) }, 5000)
            })
        }
    }

    //For logout the User
    logOutClick = () => {
        let email = "";
        let password = "";
        this.props.LoginReducerAim(email, password);
        let languageType = 'en';
        this.props.LanguageFetchReducer(languageType);
    }
    //For Profile Course
    ProfileLink = () => {
        this.props.history.push('/insurance/profile');
    }
    //For online Course
    OnlineCourse = () => {
        this.props.history.push('/insurance/online-course');
    }
    //For Emergency page
    Emergency = () => {
        this.props.history.push('/insurance');
    }
    //For Chat page
    Chats = () => {
        this.props.history.push('/insurance/chats');
    }

    render() {
        return (
            <Grid item xs={12} md={1} className="MenuLeftUpr">
                {!this.props.isNotShow && <Notification />}
                <Grid className="webLogo">
                    <a href="/"><img src={require('../../../../assets/images/logo_new.png')} alt="" title="" /></a>
                </Grid>
                <Grid className="menuItems">
                    <ul>
                        <li className={this.props.currentPage === 'emergency' ? "menuActv" : ""}>
                            <a onClick={this.Emergency}>
                                <img src={require('../../../../assets/images/para.png')} alt="" title="" />
                                <span>Emergency <br /> access</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'course' ? "menuActv" : ""}>
                            <a onClick={this.OnlineCourse} >
                                <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />
                                <span>Aimedis Online Courses</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'chat' ? "menuActv" : ""}>
                            <a onClick={this.Chats}>
                                {this.props.currentPage === 'chat' ? <img src={require('../../../../assets//images/chatVideoActive.png')} alt="" title="" />
                                    : <img src={require('../../../../assets//images/chatVideo.jpg')} alt="" title="" />}
                                <span>Chat & <br /> Videocalls</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'profile' ? "menuActv" : ""}>
                            <a className="profilMenu">
                                {this.props.currentPage === 'profile' ? <img src={require('../../../../assets//images/profileActv.png')} alt="" title="" />
                                    : <img src={require('../../../../assets//images/useru.jpg')} alt="" title="" />}
                                <span>My Profile</span>
                                <div className="profilMenuList">
                                    <ul>
                                        <li><a onClick={this.ProfileLink}><img src={require('../../../../assets//images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                        <li><a onClick={this.openLanguageModel}><img src={require('../../../../assets//images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                        <li><a><img src={require('../../../../assets//images/menudocs.jpg')} alt="" title="" />Dark Mode</a></li>
                                        <li onClick={this.logOutClick}><a><img src={require('../../../../assets//images/menudocs.jpg')} alt="" title="" />Log out</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li>
                    </ul>
                </Grid>
                <Modal
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    open={this.state.openFancyLanguage}
                    onClose={this.handleCloseFancyLanguage}>
                    <Grid className="LanguageBoxMain">
                        <Grid className="nwPresCourse">
                            <Grid className="nwPresCloseBtn">
                                <a onClick={this.handleCloseFancyLanguage}>
                                    <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                </a>
                            </Grid>
                            <Grid><label>Select Language</label></Grid>
                        </Grid>
                        {this.state.PassDone && <div className="success_message">Language is Updated!</div>}
                        {this.state.languageBlank && <div className="err_message">Language is not selected.</div>}
                        <div className="languageHead"></div>
                        <Grid className="languageBox">
                            <Grid className="row">
                                <Grid className="col-sm-6 col-xl-6">
                                    <Grid>
                                        <input value="en" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "en" ? "checked" : ""} />
                                        <label>English</label>
                                    </Grid>
                                    <Grid>
                                        <input value="de" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "de" ? "checked" : ""} />
                                        <label>Germany</label>
                                    </Grid>
                                    <Grid>
                                        <input value="rs" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "rs" ? "checked" : ""} />
                                        <label>Russian</label>
                                    </Grid>
                                    <Grid>
                                        <input value="nl" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "nl" ? "checked" : ""} />
                                        <label>Dutch</label>
                                    </Grid>
                                </Grid>
                                <Grid className="col-sm-6 col-xl-6">
                                    <Grid>
                                        <input value="sp" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "sp" ? "checked" : ""} />
                                        <label>Spanish</label>
                                    </Grid>
                                    <Grid>
                                        <input value="pt" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "pt" ? "checked" : ""} />
                                        <label>Portuguese</label>
                                    </Grid>
                                    <Grid>
                                        <input value="ch" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "ch" ? "checked" : ""} />
                                        <label>Chainese</label>
                                    </Grid>
                                    <Grid>
                                        <input value="sw" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "sw" ? "checked" : ""} />
                                        <label>Swahili</label>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="infoShwHidBrdr2"></Grid>
                        <Grid className="infoShwHidIner2">
                            <Grid className="infoShwSave2">
                                <input type="submit" value="Save changes" onClick={this.SetLanguage} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
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