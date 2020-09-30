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
    componentDidMount(){
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
    ProfileLink = ()=>{
        this.props.history.push('/nurse/profile');
    }
   
    //For online Course
    OnlineCourse = ()=>{
        this.props.history.push('/nurse/online-course');    
    }
    //For Timeline / Journal
    Journal = ()=>{
        this.props.history.push('/nurse/journal');    
    }
    //For chat
    Chats = ()=>{
        this.props.history.push('/nurse');    
    }

    //For Emergency
    Emergency = ()=>{
        this.props.history.push('/nurse/emergency');    
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
                        <li className={this.props.currentPage==='chat' ? "menuActv" : ""}>
                            <a onClick={this.Chats}>
                            {this.props.currentPage==='chat' ? <img src={require('../../../../assets/images/chatVideoActive.png')} alt="" title="" />
                                : <img src={require('../../../../assets/images/chatVideo.jpg')} alt="" title="" />}
                                <span>Chat & <br /> Videocalls</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage==='journal' ? "menuActv" : ""}>
                            <a onClick={this.Journal}>
                            {this.props.currentPage==='journal' ? <img src={require('../../../../assets/images/menu1.png')} alt="" title="" />
                                :<img src={require('../../../../assets/images/inactiveJournal.jpg')} alt="" title="" />}
                                <span>Patient Access Data</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage==='emergency' ? "menuActv" : ""}>
                            <a onClick={this.Emergency}>
                            {this.props.currentPage==='appointment' ? <img src={require('../../../../assets/images/appointActive.png')} alt="" title="" />
                                : <img src={require('../../../../assets/images/calenderIcon.jpg')} alt="" title="" />}
                                <span>Emergency Access</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage==='course' ? "menuActv" : ""}>
                            <a onClick={this.OnlineCourse} >
                                <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />
                                <span>Aimedis Online Courses</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage==='profile' ? "menuActv" : ""}>
                            <a className="profilMenu">
                            { this.props.currentPage==='profile' ?   <img src={require('../../../../assets/images/profileActv.png')} alt="" title="" />
                            :<img src={require('../../../../assets/images/useru.jpg')} alt="" title="" />}
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
    const {settings} = state.Settings;
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