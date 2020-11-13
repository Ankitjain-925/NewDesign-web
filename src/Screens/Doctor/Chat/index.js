import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from './../../Components/Menus/DoctorLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/DoctorLeftMenu/mobile';
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import { connect } from "react-redux";
import { Redirect, Route } from 'react-router-dom';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import CometChat from '../../Components/CometChat';
import { LanguageFetchReducer } from './../../actions';
import Loader from './../../Components/Loader/index';
import axios from "axios";
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
        var doctorArray = ['admin'];
        let user_token = this.props.stateLoginValueAim.token
        let user_id    = this.props.stateLoginValueAim.user._id
        // axios.get(sitedata.data.path + '/UserProfile/UserlistSize',{
        //     headers: {
        //         'token': user_token,
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // }).then((response) => {
        //   this.setState({sizeList : response.data.data})
        // })
        this.setState({loaderImage : true})
        axios.get(sitedata.data.path + '/UserProfile/Users/'+user_id, {headers:{
          'token': user_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          }}).then((response) =>{
            
            axios.get(sitedata.data.path + '/UserProfile/Mypatients', {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{  
                    if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
                        doctorArray.push(data.profile_id.toLowerCase())
                    }
                 
              })
            })
            response.data.data && (response.data.data.email=== 'doctor4@aimedis.com' ||  response.data.data.email=== 'doctor5@aimedis.com' ||  response.data.data.email=== 'doctor3@aimedis.com' ||  response.data.data.email=== 'doctor6@aimedis.com' ||  response.data.data.email=== 'doctor7@aimedis.com') &&
            axios.get(sitedata.data.path + '/UserProfile/NursePharmaChat',{
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{ 
                    if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){  
                        doctorArray.push(data.profile_id.toLowerCase())
                    }
                })
            })
            response.data.data && (response.data.data.paid_services && response.data.data.paid_services.length>0) || (response.data.data.email=== 'doctor4@aimedis.com' ||  response.data.data.email=== 'doctor5@aimedis.com' ||  response.data.data.email=== 'doctor3@aimedis.com' ||  response.data.data.email=== 'doctor6@aimedis.com' ||  response.data.data.email=== 'doctor7@aimedis.com') &&
            axios.get(sitedata.data.path + '/UserProfile/PatientUsersChat',{
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{
                    if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){   
                        doctorArray.push(data.profile_id.toLowerCase())
                    }
                })
        })
        axios.get(sitedata.data.path + '/UserProfile/DoctorUsersChat',{
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{  
             if(data.email === 'doctor4@aimedis.com' || data.email === 'doctor5@aimedis.com' || data.email === 'doctor3@aimedis.com' || data.email === 'doctor6@aimedis.com' || data.email === 'doctor7@aimedis.com')
             {
                if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
                    doctorArray.push(data.profile_id.toLowerCase())
                }
             } 
            })
        })
    })

   
    // axios.get(sitedata.data.path + '/UserProfile/getFvDoc', {headers:{
    //     'token': user_token,
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //     }}).then((response) =>{
    //         response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{  
    //          doctorArray.push(data.profile_id.toLowerCase())
    //       })
    //     })
        this.setState({doctorArray : doctorArray})
        setTimeout(()=>{ this.setState({loaderImage : false})}, 5000)
    }

    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;
            if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'doctor') {
                return (<Redirect to={'/'} />);
            }
           
        return(
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
            <Grid container direction="row" justify="center">
            {this.state.loaderImage && <Loader />}
                <Grid item xs={12} md={12}>
                    <Grid container direction="row">
                        <LeftMenu  isNotShow ={true} currentPage="chat"/>
                        <LeftMenuMobile isNotShow ={true}  currentPage ="chat"/>
                        {/* <Notification /> */}
                        {/* Website Mid Content */}
                        <Grid item xs={12} md={11}>
                            {/* Inbox page Content */}
                            <Grid container style={{fontSize: "16px"}} direction="row" justify="left" alignItems="center">
                                <CometChat lan= {this.props.stateLanguageType} Uid={this.props.stateLoginValueAim.user.profile_id} Userlist={this.state.doctorArray && this.state.doctorArray}  sizeList = {this.state.sizeList && this.state.sizeList}/> 
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
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(index));