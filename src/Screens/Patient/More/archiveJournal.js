import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {Redirect, Route} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import { Editor } from 'react-draft-wysiwyg';
import sitedata, { data } from '../../../sitedata';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DatePicker from 'react-date-picker';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/PatientLeftMenu/mobile';
import { LanguageFetchReducer } from './../../actions';
import AddEntry from './../../Components/AddEntry/index';
import PersonalizedData from './../../Components/TimelineComponent/PersonalizedData/index';
import FilterSec from './../../Components/TimelineComponent/Filter/index';
import ProfileSection from './../../Components/TimelineComponent/ProfileSection/index';
import RightManage from './../../Components/TimelineComponent/RightMenuManage/index';
import { ConsoleCustom, getTime, getDate } from './../../Components/BasicMethod/index';
import ViewTimeline from './../../Components/TimelineComponent/ViewTimeline/index';
import Loader from './../../Components/Loader/index.js';
import translationEN from "../../../translations/en.json"
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaderImage: false,
           
        };
        // new Timer(this.logOutClick.bind(this))
      }
    
    componentDidMount() {
        this.getTrack();
        this.getGender();
        this.cur_one();
        
    }

     //Get the Current User Profile
    cur_one = () => {
        var user_token = this.props.stateLoginValueAim.token;
        let user_id = this.props.stateLoginValueAim.user._id;
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id,
        {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            this.setState({ cur_one: response.data.data })
        })
    }

    //For get the Track
    getTrack = () => {
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
   
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/User/ArchivedTrack/' + user_id,
        {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.data.hassuccessed === true) {
                this.setState({ allTrack: response.data.data, loaderImage: false })
            }
            else { this.setState({ allTrack: [], loaderImage: false })  }
        })
    }

    //For getting the information of the Patient Gender
    getGender() {
        var user_token = this.props.stateLoginValueAim.token;
        var user_id = this.props.stateLoginValueAim.user._id;
        axios.get(sitedata.data.path + '/User/Get_patient_gender/' + user_id,
        {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.data.hassuccessed === true) {
                this.setState({ patient_gender: response.data.data })
            }
        });
    }
    
    //Modal Open on Archive the Journal
  ArchiveTrack=(data)=>{

    confirmAlert({
        customUI: ({ onClose }) => {
        return (
        <div className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "dark-confirm react-confirm-alert-body" : "react-confirm-alert-body"} >
        <h1>Archive item</h1>
        <p>Do you really want to De - archive the item?</p>
        <div className="react-confirm-alert-button-group">
        <button
        onClick= {() => {this.updateArchiveTrack(data); onClose()}}
        >
        Yes
        </button>
        <button
        onClick={() => {onClose();}}
        >
        No
        </button>
        </div>
        </div>
        );
        }
        })
}
//Delete the perticular track confirmation box
DeleteTrack=(deletekey)=> {
    confirmAlert({
        customUI: ({ onClose }) => {
        return (
        <div className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "dark-confirm react-confirm-alert-body" : "react-confirm-alert-body"} >
        <h1>Delete item</h1>
        <p>Do you really want to delete the item?</p>
        <div className="react-confirm-alert-button-group">
        <button
        onClick= {() => {this.deleteClickTrack(deletekey); onClose()}}
        >
        Yes
        </button>
        <button
        onClick={() => {onClose();}}
        >
        No
        </button>
        </div>
        </div>
        );
        }
        })
}
 
    //Delete the track
    deleteClickTrack=(deletekey)=> {
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true })
        axios.delete(sitedata.data.path + '/User/AddTrack/' + user_id + '/' + deletekey, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                this.setState({ loaderImage: false })
                this.getTrack();
            }).catch((error) => {

            });
    }
    //Update Archive Track State
    updateArchiveTrack=(data)=>{
        data.archive = false;
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        var track_id = data.track_id;
        this.setState({ loaderImage: true })
        axios.put(sitedata.data.path + '/User/AddTrack/' + user_id + '/' + track_id, { data },
        {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            this.setState({
                ismore_five: false, updateTrack: {}, updateOne: '', isfileupload: false, isfileuploadmulti: false, loaderImage: false,
            })
            this.getTrack();
        })
    }

   

    
    render() {
        let translate
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            // case "de":
            //     translate = translationDE.text
            //     break;
            // case "pt":
            //     translate = translationPT.text
            //     break;
            // case "sp":
            //     translate = translationSP.text
            //     break;
            // case "rs":
            //     translate = translationRS.text
            //     break;
            // case "nl":
            //     translate = translationNL.text
            //     break;
            // case "ch":
            //     translate = translationCH.text
            //     break;
            // case "sw":
            //     translate = translationSW.text
            //     break;
            case "default":
                translate = translationEN.text
        }
        let {archive_journal,}=translate
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient') {
            return (<Redirect to={'/'} />);
        }
        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
                {this.state.loaderImage && <Loader />}
                <Grid container direction="row" justify="center" className="homeBgIner">
                    <Grid item xs={12} md={12}>
                        <Grid container direction="row">

                            {/* Website Menu */}
                            <LeftMenu  isNotShow ={true} currentPage ="more"/>
                            <LeftMenuMobile isNotShow ={true}  currentPage ="more"/>
                            {/* End of Website Menu */}

                            {/* Website Mid Content */}
                            <Grid item xs={12} md={8}>
                                   {/* Start of Depression Section */}
                                   <Grid className="descpCntntMain">
                                        <Grid className="journalAdd">
                                            <Grid container direction="row">
                                                <Grid item xs={11} md={11}>
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6}>
                                                            <h1>{archive_journal}</h1>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    
                                 {/* For the filter section */}
                                    <FilterSec />

                                    {/* For Empty Entry */}
                                    <div>
                                    {this.state.allTrack && this.state.allTrack.length > 0 &&
                                        this.state.allTrack.map((item, index) => (
                                            <ViewTimeline Archive={true} DeleteTrack={(deleteKey)=>this.DeleteTrack(deleteKey)} ArchiveTrack={(data)=> this.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.EidtOption(value, updateTrack, visibility)} date_format={this.props.settings.setting.date_format}  time_format={this.props.settings.setting.time_format} Track={item} from="patient" loggedinUser={this.state.cur_one} patient_gender={this.state.patient_gender} />
                                            ))
                                    }
                                    </div>
                                </Grid>
                            </Grid>
                            {/* End of Website Right Content */}

                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
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