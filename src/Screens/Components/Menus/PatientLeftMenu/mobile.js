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

    //For My Profile link
    ProfileLink = () => {
        this.props.history.push('/patient');
    }
    //For Emergency Access link
    EmergencyLink = () => {
        this.props.history.push('/patient/emergency');
    }
    //For Second opinion link
    SecondLink = () => {
        this.props.history.push('/patient/second-opinion');
    }
    //For Extra service link
    ExtraLink = () => {
        this.props.history.push('/patient/extra-services');
    }
    // For ournal Archive Link
    JournalArchiveLink=()=>{
        this.props.history.push('/patient/archiveJournal');
    }
    //For Document link
    DocumentLink = () => {
        this.props.history.push('/patient/documents');
    }
    //For online Course
    OnlineCourse = () => {
        this.props.history.push('/patient/online-course');
    }
    //For Tracker / Withings
    Tracker = () => {
        this.props.history.push('/patient/tracker');
    }
    // For Appointment Link
    AppointmentLink = () => {
        this.props.history.push('/patient/appointment');
    }
    //For Timeline / Journal
    Journal = () => {
        this.props.history.push('/patient/journal');
    }
    //For chat
    Chats = () => {
        this.props.history.push('/patient/chats');
    }
    //For block chain Access 
    BlockChain = () => {
        this.props.history.push('/patient/blockchain');
    }
    render() {
        return (
            <Grid className="MenuMob">
                  {!this.props.isNotShow && <Notification />}
            <Grid container direction="row" alignItems="center">
                <Grid item xs={6} md={6} sm={6} className="MenuMobLeft">
                    <a><img src={require('../../../../assets//images/navigation-drawer.svg')} alt="" title="" className="MenuImg" /></a>
                    <Menu className="addCstmMenu">
                        <Grid className="menuItems">
                        <ul>
                        <li className={this.props.currentPage === 'journal' ? "menuActv" : ""}>
                            <a onClick={this.Journal}>
                                {this.props.currentPage === 'journal' ? <img src={require('../../../../assets/images/menu1.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/inactiveJournal.jpg')} alt="" title="" />}
                                <span>Journal</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'chat' ? "menuActv" : ""}>
                            <a onClick={this.Chats}>
                                {this.props.currentPage === 'chat' ? <img src={require('../../../../assets/images/chatVideoActive.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/chatVideo.jpg')} alt="" title="" />}
                                <span>Chat & <br /> Videocalls</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'appointment' ? "menuActv" : ""}>
                            <a onClick={this.AppointmentLink}>
                                {this.props.currentPage === 'appointment' ? <img src={require('../../../../assets/images/appointActive.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/calenderIcon.jpg')} alt="" title="" />}
                                <span>Appointments</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'documents' ? "menuActv" : ""}>
                            <a onClick={this.DocumentLink}>
                                {this.props.currentPage === 'documents' ? <img src={require('../../../../assets/images/activeDocs.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/apoint.jpg')} alt="" title="" />}
                                <span>My Documents</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'tracker' ? "menuActv" : ""}>
                            <a onClick={this.Tracker}>
                                {this.props.currentPage === 'tracker' ? <img src={require('../../../../assets/images/track.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/tracker.jpg')} alt="" title="" />}
                                <span>Trackers & <br /> Self Data</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'more' ? "menuActv" : ""}>
                            <a className="moreMenu">
                                {this.props.currentPage === 'more' ? <img src={require('../../../../assets/images/moreActive.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/moreicon.jpg')} alt="" title="" />}
                                <span>More</span>

                                <div className="moreMenuList">
                                    <ul>
                                        <li><a onClick={this.SecondLink}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Second Opinion</a></li>
                                        <li><a onClick={this.EmergencyLink}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Emergency Patient Data</a></li>
                                        <li><a onClick={this.OnlineCourse}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Aimedis Online Courses</a></li>
                                        <li><a onClick={this.ExtraLink}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Extra Services</a></li>
                                        <li><a onClick={this.JournalArchiveLink}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Journal Archive</a></li>
                                        <li><a onClick={this.BlockChain}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Blockchain Access Log</a></li>
                                    </ul>
                                </div>
                            </a>

                        </li>
                        <li className={this.props.currentPage === 'profile' ? "menuActv" : ""}>
                            <a className="profilMenu">
                                {this.props.currentPage === 'profile' ? <img src={require('../../../../assets/images/profileActv.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/useru.jpg')} alt="" title="" />}
                                <span>My Profile</span>
                                <div className="profilMenuList">
                                    <ul>
                                        <li><a onClick={this.ProfileLink}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Dark Mode</a></li>
                                        <li onClick={this.logOutClick}><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Log out</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li>
                    </ul>
                        </Grid>
                    </Menu>
                </Grid>
                <Grid item xs={6} md={6} sm={6} className="MenuMobRght">
                    <a href="/"><img src={require('../../../../assets//images/logo_new.png')} alt="" title="" /></a>
                </Grid>
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