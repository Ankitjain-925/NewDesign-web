import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from './../../Components/Menus/NurseLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/NurseLeftMenu/mobile';
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import { connect } from "react-redux";
import {Doctorarrays} from './../../Login/doctorarray';
import { Redirect, Route } from 'react-router-dom';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import CometChat from '../../Components/CometChat';
import { LanguageFetchReducer } from './../../actions';
import axios from "axios";
import { authy } from './../../Login/authy.js';
import Loader from './../../Components/Loader/index';
import sitedata from '../../../sitedata.js';
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
// var doctorArray = ['admin'];
 
class index extends React.Component {
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
            doctorslist: [],
            message : '',
            allMessage: [],
            loggedinuser : {},
            currentUser : false,
            isattach : false,
            attachfile : [],
            unreadm : false,
            doctorArray : [],
            sizeList : 100,
        }
    }

    componentDidMount()
    {
        // new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
    }
    componentWillMount(){
        if(this.props.stateLoginValueAim.user)
        {
            this.props.Doctorarrays(this.props.stateLoginValueAim.user.type, this.props.stateLoginValueAim.user, this.props.stateLoginValueAim.token)
            this.setState({loaderImage : true})
            setTimeout(()=>{ this.setState({loaderImage : false})}, 3000)
        }
    }
    // componentWillMount(){
    //     var doctorArray = ['admin'];
    //         let user_token = this.props.stateLoginValueAim.token
    //         let user_id    = this.props.stateLoginValueAim.user._id
    //         this.setState({loaderImage : true})
            
    //         axios.get(sitedata.data.path + '/UserProfile/Users/'+user_id, {headers:{
    //           'token': user_token,
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //           }}).then((response) =>{
               
    //         axios.get(sitedata.data.path + '/UserProfile/DoctorUsersChat',{
    //             headers: {
    //                 'token': user_token,
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then((response) => {
    //             response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{  
    //              if(data.email === 'doctor4@aimedis.com' || data.email === 'doctor5@aimedis.com' || data.email === 'doctor3@aimedis.com' || data.email === 'doctor6@aimedis.com' || data.email === 'doctor7@aimedis.com')
    //              {
    //                 if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
    //                     doctorArray.push(data.profile_id.toLowerCase()) 
    //                 }
    //              } 
    //              if(data.paid_services && data.paid_services>0)
    //              {
    //                  if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
    //                doctorArray.push(data.profile_id.toLowerCase())
    //                  }
    //              }
    //             })
    //         })
    //     })
        
    //     this.setState({doctorArray : doctorArray})
    //     setTimeout(()=>{ this.setState({loaderImage : false})}, 5000)
    // }

    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || !this.props.verifyCode || !this.props.verifyCode.code) {
            if(stateLoginValueAim.user){
            if(stateLoginValueAim.user.type === 'nurse' || stateLoginValueAim.user.type === 'therapist'){}
            else
            {return (<Redirect to={'/'} />);}   
            }
            else
            {return (<Redirect to={'/'} />);}   
        }
           
        return(
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
            <Grid container direction="row" justify="center">
            {this.state.loaderImage && <Loader />}
            {console.log('doctorArray1', this.state.doctorArray)}
                <Grid item xs={12} md={12}>
                    <Grid container direction="row">
                        <LeftMenu  isNotShow ={true} currentPage="chat"/>
                        <LeftMenuMobile isNotShow ={true}  currentPage ="chat"/>
                        {/* <Notification /> */}
                        {/* Website Mid Content */}
                        <Grid item xs={12} md={11}>
                            {/* Inbox page Content */}
                            <Grid container style={{fontSize: "16px"}} direction="row" justify="left" alignItems="center">
                                <CometChat lan= {this.props.stateLanguageType} Uid={this.props.stateLoginValueAim.user.profile_id} Userlist={this.props.doctorarrays && this.props.doctorarrays.doctorarray}  /> 
                            </Grid>
                        </Grid>
                    </Grid>
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
    const { verifyCode } = state.authy;
    const { doctorarrays } = state.Doctorarrays;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
        doctorarrays,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { Doctorarrays, LoginReducerAim, LanguageFetchReducer, Settings, authy })(index));