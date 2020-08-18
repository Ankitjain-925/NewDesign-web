import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import { LoginReducerAim } from './../../Login/actions';
import { connect } from "react-redux";
import { Redirect, Route } from 'react-router-dom';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import CometChat from '../../Components/CometChat';
import { LanguageFetchReducer } from './../../actions';
import * as translationEN from '../../../translations/en'
import * as translationDE from '../../../translations/de';
import * as translationSP from '../../../translations/sp';
import * as translationPT from '../../../translations/pt';
import * as translationRS from '../../../translations/rs';
import * as translationNL from '../../../translations/nl';
import * as translationCH from '../../../translations/ch';
import * as translationSW from '../../../translations/sw';
import axios from "axios";
import sitedata from '../../../sitedata.js';
// var doctorArray = [];
 
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
        };
        // new Timer(this.logOutClick.bind(this))
    }
    logOutClick= ()=> {
        let email = "";
        let password = "";
        this.props.LoginReducerAim(email, password);
        let languageType = 'en';
        this.props.LanguageFetchReducer(languageType);
    }
    componentDidMount()
    {
        // new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
    }
    componentWillMount(){
        var doctorArray = [];
        let user_token = this.props.stateLoginValueAim.token
        axios.get(sitedata.data.path + '/UserProfile/UserlistSize',{
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
          this.setState({sizeList : response.data.data})
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
                doctorArray.push(data.profile_id.toLowerCase()) 
             } 
              if(data.paid_services && data.paid_services>0)
                {
                  doctorArray.push(data.profile_id.toLowerCase())
                }   
            })
        })
        let user_id    = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/'+user_id, {headers:{
          'token': user_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          }}).then((response) =>{
            response.data.data && response.data.data.fav_doctor && response.data.data.fav_doctor.map((value, i)=>{
                doctorArray.push(value.profile_id.toLowerCase())
            })
        })
        this.setState({doctorArray : doctorArray})
    }
    filterthis=(valuefilter) =>{
        this.props.filterate(valuefilter);
        if(this.props.stateLoginValueAim.user.type==='doctor')
        {  
            this.props.history.push('/doctor/patientTrack');
        }
        else if(this.props.stateLoginValueAim.user.type==='patient')
        {
            this.props.history.push('/patient');
        }
    }
    registration = () => {
        this.props.history.push('/patient/registration');
    };
    myprofile = () => {
        this.props.history.push('/patient/myprofile');
    };
    createpatientlist = () => {
        this.props.history.push('/patient/createpatientlist');
    };
    getappointment = () => {
        this.props.history.push('/patient/getappointment');
    };
    getprescription = () => {
        this.props.history.push('/patient/prescription');
    };
    getsickcertificate = () => {
        this.props.history.push('/patient/sickcertificate');
    };
    secondopinion = () => {
        this.props.history.push('/patient/secondopinion');
    };
    emergency = () => {
        this.props.history.push('/patient/emergency');
    };
    insuranceconnect = () =>{
        this.props.history.push('/patient/insuranceconnect');
    }
    chats = () =>{
        this.props.history.push('/patient/chat');
    }
    qualified_self = () =>{
        this.props.history.push('/patient/quantifiedself');
    }
    movedashboard() {
        var user_id = null;
        var pin = null;
        this.props.Doctorset(user_id, pin);
    }
    hyperledger= () =>{
        this.props.history.push('/patient/blockchain');
     };
    timeline_panel = () => {
        this.props.history.push('/patient');
    }
    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient' ) {
            return (<Redirect to={'/'} />);
            }            
        let dataLoader;
        // if (this.state.loaderImage) {
        //     dataLoader = <Loader />
        // }
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
    case "default" : 
    translate = translationEN.text
}
        let { return_to_timeline,on_blockchain,Contacts} = translate;
           
        return(
            <Grid className="homeBg">
                <Grid container direction="row" justify="center">
                    <Grid item xs={11} md={12}>
                        <Grid container direction="row">
                            <LeftMenu />
                            {/* Website Mid Content */}
                            <Grid item xs={12} md={11}>
                                {/* Inbox page Content */}
                                <Grid container direction="row" justify="center" alignItems="center">
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
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(index));