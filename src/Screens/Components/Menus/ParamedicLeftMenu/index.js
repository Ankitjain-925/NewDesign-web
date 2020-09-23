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
    //For Profile Course
    ProfileLink = ()=>{
        this.props.history.push('/paramedic/profile');    
    }
    //For online Course
    OnlineCourse = ()=>{
        this.props.history.push('/paramedic/online-course');    
    }
    //For Emergency page
    Emergency = ()=>{
        this.props.history.push('/paramedic');    
    }
    //For Chat page
    Chats = ()=>{
        this.props.history.push('/paramedic/chats');  
    }
 
    render() {
        return (
            <Grid item xs={12} md={1} className="MenuLeftUpr">
                <Grid className="webLogo">
                    <a href="/"><img src={require('../../../../assets/images/logo_new.png')} alt="" title="" /></a>
                </Grid>
                <Grid className="menuItems">
                    <ul>
                        <li className={this.props.currentPage==='emergency' ? "menuActv" : ""}>
                            <a onClick={this.Emergency}>
                                <img src={require('../../../../assets/images/para.png')} alt="" title="" />
                                <span>Emergency <br /> access</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage==='course' ? "menuActv" : ""}>
                            <a onClick={this.OnlineCourse} >
                                <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />
                                <span>Aimedis Online Courses</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage==='chat' ? "menuActv" : ""}>
                            <a onClick={this.Chats}>
                            {this.props.currentPage==='chat' ? <img src={require('../../../../assets//images/chatVideoActive.png')} alt="" title="" />
                                : <img src={require('../../../../assets//images/chatVideo.jpg')} alt="" title="" />}
                                <span>Chat & <br /> Videocalls</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage==='profile' ? "menuActv" : ""}>
                            <a className="profilMenu">
                            { this.props.currentPage==='profile' ?   <img src={require('../../../../assets//images/profileActv.png')} alt="" title="" />
                            :<img src={require('../../../../assets//images/useru.jpg')} alt="" title="" />}
                                <span>My Profile</span>
                                <div className="profilMenuList">
                                    <ul>
                                        <li><a onClick={this.ProfileLink}><img src={require('../../../../assets//images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                        <li><a><img src={require('../../../../assets//images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                        <li><a><img src={require('../../../../assets//images/menudocs.jpg')} alt="" title="" />Dark Mode</a></li>
                                        <li onClick={this.logOutClick}><a><img src={require('../../../../assets//images/menudocs.jpg')} alt="" title="" />Log out</a></li>
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