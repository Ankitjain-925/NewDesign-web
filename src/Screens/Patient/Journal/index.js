import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
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
import { Redirect, Route } from 'react-router-dom';
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
import { mySorter, SortByEntry, SortByDiagnose, ConsoleCustom, getTime, getDate } from './../../Components/BasicMethod/index';
import ViewTimeline from './../../Components/TimelineComponent/ViewTimeline/index';
import GraphView from './../../Components/TimelineComponent/GraphView/index';
import Loader from './../../Components/Loader/index.js';
import BPFields from './../../Components/TimelineComponent/BPFields/index';
import BSFields from './../../Components/TimelineComponent/BSFields/index';
import BMIFields from './../../Components/TimelineComponent/BMIFields/index';
import MPFields from './../../Components/TimelineComponent/MPFields/index';
import SSFields from './../../Components/TimelineComponent/SSFields/index';
import VaccinationFields from './../../Components/TimelineComponent/VaccinationFields/index';
import MedicationFields from './../../Components/TimelineComponent/MedicationFields/index';
import HVFields from './../../Components/TimelineComponent/HVFields/index';
import DVFields from './../../Components/TimelineComponent/DVFields/index';
import CPFields from './../../Components/TimelineComponent/CPFields/index';
import DiaryFields from './../../Components/TimelineComponent/DiaryFields/index';
import AllL_Ps from '../../Components/Parameters/parameter.js';
import LRFields from './../../Components/TimelineComponent/LRFields/index';
import FUFields from './../../Components/TimelineComponent/FUFields/index';
import FAFields from './../../Components/TimelineComponent/FAFields/index';
import npmCountryList from 'react-select-country-list';
import CovidFields from '../../Components/TimelineComponent/CovidFields/index';
import EmptyData from './../../Components/TimelineComponent/EmptyData';
import DiagnosisFields from './../../Components/TimelineComponent/DiagnosisFields/index';
import PFields from "./../../Components/TimelineComponent/PFields/index.js";
import AnamnesisFields from "./../../Components/TimelineComponent/AnamnesisFields/index.js";
import SCFields from "./../../Components/TimelineComponent/SCFields/index.js";
import SOFields from "./../../Components/TimelineComponent/SOFields/index.js";
import moment from 'moment';
import { authy } from './../../Login/authy.js';
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import translationEN from "../../../translations/en.json"
import * as translationDE from '../../../translations/de.json';
import * as translationPT from '../../../translations/pt.json';
import * as translationSP from '../../../translations/sp.json';
import * as translationRS from '../../../translations/rs.json';
import * as translationSW from '../../../translations/sw.json';
import * as translationCH from '../../../translations/ch.json';
import * as translationNL from '../../../translations/nl.json';

import DownloadFullTrack from "../../Components/DownloadFullTrack/index";
var Datas = [];
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDash: false,
            openEntry: false,
            addInqryNw: false,
            addInqrySw: false,
            current_select: 'diagnosis',
            updateOne: 0,
            updateTrack: {},
            cur_one: {},
            personalinfo: {},
            personalised_card: [],
            Alltemprature: [],
            AllATC_code: [],
            Allpain_type: [],
            Allpain_quality: [],
            Pressuresituation: [],
            Allsituation: [],
            Allsmoking_status: [],
            Allreminder: [],
            AllreminderV: [],
            AllSpecialty: [],
            Allsubstance1: [],
            Allrelation: [],
            Allgender: [],
            AllL_P: [],
            Alltime_taken: [],
            added_data: [],
            allTrack: [],
            selectCountry: [],
            visibility: false,
            images: [],
            allTrack1: [],
            Sort: 'diagnosed_time',
            isGraph: false,
            current_Graph: '',
            upcoming_appointment: []
        };
    }

    //For Close the Graph 
    CloseGraph=()=>{
        this.rightInfo();
        this.getTrack();
        this.setState({isGraph : false})
    }

    OpenGraph = (current_Graph) => {
        this.setState({ current_Graph: current_Graph, isGraph: true })
    }

    //For clear the filter
    ClearData = () => {
        this.setState({ Sort: 'diagnosed_time', allTrack: this.state.allTrack1 },
            this.SortData())
    }

    isThisAvilabel = (object, text) => {
        if (object && typeof object == 'object') {
        if (object.type.replace('_', ' ') && object.type.replace('_', ' ').includes(text)) {
        return true;
        } else if (object.created_by_temp && object.created_by_temp.includes(text)) {
        return true;
        } else {
        return JSON.stringify(object).toLowerCase().includes(text);
        }
        } else {
        return false;
        }
        };

    FilterText = (text) =>{
            let track = this.state.allTrack1;
            let FilterFromSearch = track && track.length>0 && track.filter((obj) => {
            return this.isThisAvilabel(obj, text && text.toLowerCase());
            });
        this.setState({ allTrack: FilterFromSearch })
    }
    
    //For filter the Data
    FilterData = (time_range, user_type, type, facility_type) => {
        var Datas1 = this.state.allTrack1;
        var FilterFromTime = time_range && time_range.length > 0 ? this.FilterFromTime(Datas1, time_range) : Datas1;
        var FilerFromType = type && type.length > 0 ? this.FilerFromType(FilterFromTime, type) : FilterFromTime;
        var FilterFromUserType = user_type && user_type.length > 0 ? this.FilterFromUserType(FilerFromType, user_type) : FilerFromType;
        if (time_range === null && user_type === null && type === null) {
            FilterFromUserType = this.state.allTrack1;
        }
        FilterFromUserType = [...new Set(FilterFromUserType)];
        this.setState({ allTrack: FilterFromUserType })
    }

    //Filter according to date range
    FilterFromTime = (Datas, time_range) => {
        if (time_range && time_range.length > 0) {
            let start_date = new Date(time_range[0])
            let end_date = new Date(time_range[1])
            start_date = start_date.setHours(0, 0, 0, 0);
            end_date = end_date.setDate(end_date.getDate() + 1)
            end_date = new Date(end_date).setHours(0, 0, 0, 0)
            return Datas.filter((obj) => new Date(obj.datetime_on) >= start_date && new Date(obj.datetime_on) <= end_date);
        }
        else {
            return null;
        }
    }

    //Filter according to the type 
    FilerFromType = (Datas, type) => {
        var Datas1 = [];
        if(Datas && Datas.length>0){
            if (type && type.length > 0) {
                type.map((ob) => {
                    var dts = Datas.filter((obj) => obj.type === ob.value);
                    Datas1 = Datas1.concat(dts);
                })
                return Datas1;
            }
            else { return null; }
        }
        else{
            return null;
        }
    }

    //Filter according to User type
    FilterFromUserType = (Datas, user_type) => {
        var Datas1 = [];
        if(Datas && Datas.length>0){
            if (user_type && user_type.length > 0) {
                user_type.map((ob) => {
                    var dts = Datas.filter((obj) => obj.created_by_temp.indexOf(ob.value) > -1);
                    Datas1 = Datas1.concat(dts);
                })
                return Datas1;
            }
        }
        return null;
    }

    //For Sort the Data
    SortData = (data) => {
        if (data === 'entry_time') {
            this.state.allTrack.sort(SortByEntry);
        } else {
            this.state.allTrack.sort(SortByDiagnose);
        }
        this.setState({ Sort: data })
    }

    //Modal Open on Archive the Journal
    ArchiveTrack=(data)=>{
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
    let { archive_item, ok, do_u_really_want_archive_item, yes, no } = translate;

        confirmAlert({
            customUI: ({ onClose }) => {
            return (
            <div className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "dark-confirm react-confirm-alert-body" : "react-confirm-alert-body"} >
            <h1>{archive_item}</h1>
            <p>{do_u_really_want_archive_item}</p>
            <div className="react-confirm-alert-button-group">
            <button
            onClick= {() => {this.updateArchiveTrack(data); onClose()}}
            >
            {yes}
            </button>
            <button
            onClick={() => {onClose();}}
            >
            {no}
            </button>
            </div>
            </div>
            );
            }
            })
    }
    //Delete the perticular track confirmation box
    DeleteTrack = (deletekey) => {
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
    let { delete_item, ok, do_u_really_want_delete_item, yes, no } = translate;
        confirmAlert({
            customUI: ({ onClose }) => {
            return (
            <div className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "dark-confirm react-confirm-alert-body" : "react-confirm-alert-body"} >
            <h1>{delete_item}</h1>
            <p>{do_u_really_want_delete_item}</p>
            <div className="react-confirm-alert-button-group">
            <button
            onClick= {() => {this.deleteClickTrack(deletekey); onClose()}}
            >
            {yes}
            </button>
            <button
            onClick={() => {onClose();}}
            >
            {no}
            </button>
            </div>
            </div>
            );
            }
            })
    }
    //Delete the track
    deleteClickTrack = (deletekey) => {
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
                this.rightInfo();
            }).catch((error) => {

            });
    }
    //Update Archive Track State
    updateArchiveTrack = (data) => {
        data.archive = true;
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
                    ismore_five: false, updateTrack: {}, updateOne: 0, isfileupload: false, isfileuploadmulti: false, loaderImage: false,
                })
                this.getTrack();
            })
    }
    //Select type for the new Entry
    SelectOption = (value) => {
        this.setState({ current_select: value }, () => {
            this.handleaddInqryNw();
        })
    }

    //For open Edit
    EidtOption = (value, updateTrack, visibility) => {
        this.setState({ updateOne: updateTrack.track_id, visibility: visibility, current_select: value, updateTrack: updateTrack }, () => {
            this.handleaddInqryNw();
        })
    }

    // Open Personalized Datas
    handleOpenDash = () => {
        this.setState({ openDash: true });
    };
    // Close Personalized Data
    handleCloseDash = () => {
        this.setState({ openDash: false });
    };

    //Open for the Add entry
    handleOpenEntry = () => {
        this.setState({ openEntry: true });
    };
    //Close for the Add entry
    handleCloseEntry = () => {
        this.setState({ openEntry: false });
    };

    //Open ADD/EDIT popup 
    handleaddInqryNw = () => {
        this.setState({ addInqryNw: true });
    };
    //Close ADD/EDIT popup 
    handleCloseInqryNw = () => {
        this.setState({ addInqryNw: false, visibility: false });
    };

    // handleaddInqrySw = () => {
    //     this.setState({ addInqrySw: true });
    // };
    // handleCloseInqrySw = () => {
    //     this.setState({ addInqrySw: false });
    // };
    componentDidMount() {
        var npmCountry = npmCountryList().getData()
        this.setState({ selectCountry: npmCountry })
        // this.currentinfo();
        this.getGender();
        this.cur_one();
        this.getUpcomingAppointment();
        this.rightInfo();
        this.getTrack();
        this.getMetadata();
        this.getPesonalized();
    }
    getUpcomingAppointment() {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/UpcomingAppintmentPat', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            var upcomingData= response.data.data && response.data.data.length>0 && response.data.data.filter((data)=>data.status!=='cancel' && data.status!=='remove')
            this.setState({ upcoming_appointment: upcomingData })
        })
    }
    //Upload file MultiFiles
    FileAttachMulti = (event) => {
        // this.setState({file:})
        this.setState({ isfileuploadmulti: true })
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        const data = new FormData()
        if (event[0].type === "application/x-zip-compressed") {
            this.setState({ file_type: true, isless_one: false, isless_one: false })
        } else {
            if (event.length < 1) {
                this.setState({ isless_one: true, ismore_five: false, file_type: false })
            }
            if (event.length > 5) {
                this.setState({ ismore_five: true, isless_one: false, file_type: false })
            }
            else {
                var Fileadd = [];
                this.setState({ loaderImage: true, ismore_five: false, isless_one: false, file_type: false })
                for (var i = 0; i < event.length; i++) {
                    let file = event[i];
                    let fileParts = file.name.split('.');
                    let fileName = fileParts[0];
                    let fileType = fileParts[1];
                    axios.post(sitedata.data.path + '/aws/sign_s3', {
                        fileName: fileName,
                        fileType: fileType,
                        folders: this.props.stateLoginValueAim.user.profile_id + '/Trackrecord/',
                        bucket: this.props.stateLoginValueAim.user.bucket
                    }).then(response => {
                        Fileadd.push({ filename: response.data.data.returnData.url + '&bucket=' + this.props.stateLoginValueAim.user.bucket, filetype: fileType })
                        setTimeout(() => { this.setState({ fileupods: false }); }, 3000);
                        let returnData = response.data.data.returnData;
                        let signedRequest = returnData.signedRequest;
                        let url = returnData.url;
                        // Put the fileType in the headers for the upload
                        var options = {
                            headers: {
                                'Content-Type': fileType
                            }
                        };
                        axios.put('https://cors-anywhere.herokuapp.com/' + signedRequest, file, options)
                            .then(result => { })
                            .catch(error => { })
                    }).catch(error => { })
                    this.setState({ fileattach: Fileadd, loaderImage: false, fileupods: true });
                }
            }
        }
        setTimeout(
            function () {
                this.setState({ file_type: false, isless_one: false, ismore_five: false });
            }
                .bind(this),
            2000
        );
    }

    //For getting full data of hide Show
    GetHideShow = (data) => {
        const state = this.state.updateTrack;
        Object.entries(data).map(([k, v]) => {
            if (k === 'publicdatetime') {
                if (v !== null) {
                    state['public'] = moment(v).utc();
                }
            }
            state[k] = v
        })
        this.setState({ updateTrack: state });
    }

    //For update the Track state 
    updateEntryState1 = (value, name) => {
        const state = this.state.updateTrack;
        state[name] = value;
        this.setState({ updateTrack: state });
    }

    //For update the Track state
    updateEntryState = (e) => {
        const state = this.state.updateTrack;
        state[e.target.name] = e.target.value;
        this.setState({ updateTrack: state });
    }

    //For adding the Track entry
    AddTrack = () => {
        this.setState({ loaderImage: true })
        var data = this.state.updateTrack;
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        if (this.state.isfileupload) {
            data.attachfile = this.state.fileattach
        }
        else if (this.state.isfileuploadmulti) {
            data.attachfile = this.state.fileattach
        }
        data.type = this.state.current_select;
        data.created_on = new Date();
        data.datetime_on = new Date();
        if (this.state.current_select === 'blood_pressure' || this.state.current_select === 'weight_bmi' || this.state.current_select === 'blood_sugar' || this.state.current_select === 'marcumar_pass' || this.state.current_select === 'laboratory_result') {
            if (data.date_measured && data.date_measured !== '') {
                data.datetime_on = new Date(data.date_measured);
            }
        }
        else if (this.state.current_select === 'diagnosis') {
            if (data.diagnosed_on && data.diagnosed_on !== '') {
                data.datetime_on = new Date(data.diagnosed_on);
            }
        }
        else if (this.state.current_select === 'doctor_visit') {
            if (data.date_doctor_visit && data.date_doctor_visits !== '') {
                data.datetime_on = new Date(data.date_doctor_visit);
            }
        }
        else if (this.state.current_select === 'hospitalization') {
            if (data.first_visit_date && data.first_visit_date !== '') {
                data.datetime_on = new Date(data.first_visit_date);
            }
        }
        else if (this.state.current_select === 'vaccination') {
            if (data.data_of_vaccination && data.data_of_vaccination !== '') {
                data.datetime_on = new Date(data.data_of_vaccination);
            }
        }
        else {
            if (data.event_date && data.event_date !== '') {
                data.datetime_on = new Date(data.event_date);
            }
        }
        var track_id = this.state.updateTrack.track_id;
        if (this.state.updateTrack && this.state.updateTrack.track_id && this.state.updateTrack.track_id !== '' && this.state.updateTrack.track_id !== 'undefined') {
            axios.put(sitedata.data.path + '/User/AddTrack/' + user_id + '/' + track_id, { data },
                {
                    headers: {
                        'token': user_token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    this.setState({ ismore_five: false, isless_one: false, updateTrack: {}, updateOne: 0, visibleupdate: 0, isfileupload: false, isfileuploadmulti: false, loaderImage: false })
                    this.getTrack();
                    this.handleCloseInqryNw();
                })
        }
        else {
            data.created_by = this.props.stateLoginValueAim.user._id;
            axios.put(sitedata.data.path + '/User/AddTrack/' + user_id, { data },
                {
                    headers: {
                        'token': user_token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    this.setState({
                        updateTrack: {}, isfileupload: false, isfileuploadmulti: false, fileattach: {}, current_select: 'diagnosis', Addmore: true, newElement: false,
                        loaderImage: false, ismore_five: false, isless_one: false
                    })
                    this.getTrack();
                    this.handleCloseInqryNw();
                })
        }
        this.setState({ updateTrack: {} });
    }

    //For get the Track
    getTrack = () => {
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/User/AddTrack/' + user_id,
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.hassuccessed === true) {
                    //This is for Aimedis Blockchain Section
                    axios.post(sitedata.data.path  + '/blockchain/dataManager', {
                        path:"dataManager/getDetails/patient",
                        data:{ "_selfId": this.props.stateLoginValueAim && this.props.stateLoginValueAim.user && this.props.stateLoginValueAim.user.profile_id, "_patientId": this.props.stateLoginValueAim && this.props.stateLoginValueAim.user && this.props.stateLoginValueAim.user.profile_id }})
                    .then(response3 => {
                        if(response3 && response3.data && response3.data.name==='Error'){
                            axios.post(sitedata.data.path  + '/blockchain/dataManager', {
                                path:"dataManager/generate/token/patient",
                                data:{  "_password": '123456'}})
                            .then(response5 => {
                                axios.post(sitedata.data.path  + '/blockchain/dataManager', {
                                    path:"dataManager/add/patient",
                                    data: {  
                                        "_patientId":this.props.stateLoginValueAim.user.profile_id,
                                        "_publicKey":response5.data.address,
                                        "_patientData":{  
                                           "email":this.props.stateLoginValueAim.user.email,
                                           "First Name":this.props.stateLoginValueAim.user.first_name,
                                           "Last Name":this.props.stateLoginValueAim.user.last_name,
                                           "DOB" :this.props.stateLoginValueAim.user.birthday,
                                           "Sex" :this.props.stateLoginValueAim.user.sex,
                                           "Address" :this.props.stateLoginValueAim.user.city,
                                           "Contact Email" :this.props.stateLoginValueAim.user.email,
                                           "Language": this.props.stateLoginValueAim.user.language,
                                           "Track Record": response.data.data 
                                        }
                                        }})
                            .then(response6 => {})
                     })
                        }
                        else{
                            axios.post(sitedata.data.path  + '/blockchain/dataManager', {
                                path:"dataManager/generate/token/patient",
                                data:{ "_password": '123456' }})
                                .then(response5 => {
                                    console.log('hiii2333')
                                    var dataHeightWegiht = response.data.data.filter((value, key) =>
                                        value.type === 'weight_bmi');
                                    var datas = {};
                                    if (dataHeightWegiht && dataHeightWegiht.length > 0) {
                                        response3.data['Weight'] = dataHeightWegiht[0].weight;
                                        response3.data['Height'] = dataHeightWegiht[0].height;
                                    }
                                    response3.data['Track Record'] = response.data.data;
                                    datas['_patientData'] = response3.data;
                                    datas['_publicKey'] = response5.data.address;
                                    datas['_patientId'] = this.props.stateLoginValueAim.user.profile_id;
                                    console.log('Here running')
                                    axios.post(sitedata.data.path  + '/blockchain/dataManager', {
                                        path:"dataManager/update/patient",
                                        data: datas})
                                   .then(response6 => { 
                                    console.log('Here running22')
                                   })
                                })
                        }
                        

                    })
                    .catch(err => {
                        console.log('Found errros')
                        axios.post(sitedata.data.path  + '/blockchain/dataManager', {
                            path:"dataManager/generate/token/patient",
                            data:{  "_password": '123456'}})
                        .then(response5 => {
                            axios.post(sitedata.data.path  + '/blockchain/dataManager', {
                                path:"dataManager/add/patient",
                                data: {  
                                    "_patientId":this.props.stateLoginValueAim.user.profile_id,
                                    "_publicKey":response5.data.address,
                                    "_patientData":{  
                                       "email":this.props.stateLoginValueAim.user.email,
                                       "First Name":this.props.stateLoginValueAim.user.first_name,
                                       "Last Name":this.props.stateLoginValueAim.user.last_name,
                                       "DOB" :this.props.stateLoginValueAim.user.birthday,
                                       "Sex" :this.props.stateLoginValueAim.user.sex,
                                       "Address" :this.props.stateLoginValueAim.user.city,
                                       "Contact Email" :this.props.stateLoginValueAim.user.email,
                                       "Language": this.props.stateLoginValueAim.user.language,
                                       "Track Record": response.data.data 
                                    }
                                    }})
                        .then(response6 => {})
                 })
                })
                    this.rightInfo();
                    var images = [];
                    response.data.data && response.data.data.length > 0 && response.data.data.map((data1, index) => {
                        var find2 = data1 && data1.created_by_image
                        if (find2) {
                            var find3 = find2.split('.com/')[1]
                            axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find3,)
                                .then((response2) => {
                                    if (response2.data.hassuccessed) {
                                        images.push({ image: find2, new_image: response2.data.data })
                                        this.setState({ images: images })
                                    }
                                })
                        }
                        data1.attachfile && data1.attachfile.length > 0 && data1.attachfile.map((data, index) => {
                            var find = data && data.filename && data.filename
                            if (find) {
                                var find1 = find.split('.com/')[1]
                                axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find1,)
                                    .then((response2) => {
                                        if (response2.data.hassuccessed) {
                                            images.push({ image: find, new_image: response2.data.data })
                                            this.setState({ images: images })
                                        }
                                    })
                            }
                        })
                    })
                    this.setState({ allTrack1: response.data.data, allTrack: response.data.data, loaderImage: false })
                }
                else { this.setState({ allTrack1: [], allTrack: [], loaderImage: false }) }
            })
    }

    //Get All information Related to Metadata
    getMetadata() {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/Metadata',
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                this.setState({ allMetadata: response.data[0] })
                if (this.state.allMetadata) {
                    var Alltemprature = [], personalised_card = [], AllATC_code = [], Alltime_taken = [], Allpain_type = [], Allpain_quality = [], Pressuresituation = [], Allsituation = [],
                        Allsmoking_status = [], Allreminder = [], AllreminderV = [{ label: "Yearly", value: "yearly" }], Allrelation = [], AllL_Pt = [], AllSpecialty = [], Allsubstance = [], Allgender = []
                    // var personalised_card = this.state.allMetadata && this.state.allMetadata.personalised_card; 

                    this.state.allMetadata && this.state.allMetadata.personalised_card && this.state.allMetadata.personalised_card.map((item, index) => (
                        personalised_card.push({ id: index, label: item.label, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.time_taken && this.state.allMetadata.time_taken.map((item, index) => (
                        Alltime_taken.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.Temprature && this.state.allMetadata.Temprature.map((item, index) => (
                        Alltemprature.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.ATC_code && this.state.allMetadata.ATC_code.map((item, index) => (
                        AllATC_code.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.pain_type && this.state.allMetadata.pain_type.map((item, index) => (
                        Allpain_type.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.pain_quality && this.state.allMetadata.pain_quality.map((item, index) => (
                        Allpain_quality.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.situation && this.state.allMetadata.situation.map((item, index) => (
                        Allsituation.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.situation_pressure && this.state.allMetadata.situation_pressure.map((item, index) => (
                        Pressuresituation.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.smoking_status && this.state.allMetadata.smoking_status.map((item, index) => (
                        Allsmoking_status.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.reminder && this.state.allMetadata.reminder.map((item, index) => (
                        Allreminder.push({ label: item.title, value: item.value }),
                        AllreminderV.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.relation && this.state.allMetadata.relation.map((item, index) => (
                        Allrelation.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.speciality && this.state.allMetadata.speciality.map((item, index) => (
                        AllSpecialty.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.substance && this.state.allMetadata.substance.map((item, index) => (
                        Allsubstance.push({ label: item.title, value: item.value })
                    ))
                    this.state.allMetadata && this.state.allMetadata.gender && this.state.allMetadata.gender.map((item, index) => (
                        Allgender.push({ label: item.title, value: item.value })
                    ))

                    Alltime_taken.sort(mySorter);
                    this.setState({
                        Alltemprature: Alltemprature,
                        AllATC_code: AllATC_code, Allpain_type: Allpain_type, Allpain_quality: Allpain_quality, Pressuresituation: Pressuresituation, Allsituation: Allsituation,
                        Allsmoking_status: Allsmoking_status, Allreminder: Allreminder, AllreminderV: AllreminderV, AllSpecialty: AllSpecialty, Allsubstance1: Allsubstance,
                        Allrelation: Allrelation, Allgender: Allgender, Alltime_taken: Alltime_taken, personalised_card: personalised_card,
                        // AllL_P: AllL_Ps.AllL_Ps, 
                    })
                }
            })
    }

    //For getting the existing settings
    getPesonalized = () => {
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/UserProfile/updateSetting',
            {
                headers: {
                    'token': this.props.stateLoginValueAim.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                if (responce.data.hassuccessed && responce.data.data && responce.data.data.personalized && responce.data.data.personalized.length > 0) { this.setState({ added_data: responce.data.data.personalized }) }
                else { this.setState({ added_data: [] }) }
                this.setState({ loaderImage: false })
            })
    }

    //For Set Format
    SetPesonalized = (data) => {
        this.setState({ loaderImage: true })
        axios.put(sitedata.data.path + '/UserProfile/updateSetting', {
            personalized: data,
            user_id: this.props.stateLoginValueAim.user._id,
            user_profile_id: this.props.stateLoginValueAim.user.profile_id
        }, {
            headers: {
                'token': this.props.stateLoginValueAim.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((responce) => {
            this.setState({ loaderImage: false })
            this.getPesonalized();
        })
    }

    //Get the RIGHT INFO 
    rightInfo() {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/rightinfo/patient', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                this.setState({ personalinfo: response.data.data })
            })
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

    //Move to Profile page
    MoveProfile = () => {
        this.props.history.push('/patient/')
    }
    //Move to Appointment Page
    MoveAppoint = () => {
        this.props.history.push('/patient/appointment')
    }
    //Move to Document Page
    MoveDocument = () => {
        this.props.history.push('/patient/documents')
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

    //This is for the Download the Track
    downloadTrack = (data) => {
        this.setState({ loaderImage: true })
        axios.post(sitedata.data.path + '/UserProfile/downloadPdf',
            {
                Dieseases: data, patientData: {
                    name: this.props.stateLoginValueAim.user.first_name + " " + this.props.stateLoginValueAim.user.last_name,
                    email: this.props.stateLoginValueAim.user.email,
                    DOB: this.props.stateLoginValueAim.user.birthday,
                    Mobile: this.props.stateLoginValueAim.user.mobile,
                },
            },
            { responseType: 'blob' }
        ).then(res => {
            this.setState({ loaderImage: false })
            var data = new Blob([res.data]);
            if (typeof window.navigator.msSaveBlob === 'function') {
                // If it is IE that support download blob directly.
                window.navigator.msSaveBlob(data, 'report.pdf');
            } else {
                var blob = data;
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'report.pdf';
                document.body.appendChild(link);
                link.click(); // create an <a> element and simulate the click operation.
            }
        }).catch(err => { })
    }


    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient' || !this.props.verifyCode || !this.props.verifyCode.code) {
            return (<Redirect to={'/'} />);
        }
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
        let { add_new_entry, new_entry, blood_pressure, blood_sugar, condition_pain, covid_diary, journal,
            personalize_dashbrd, diagnosis, diary, doc_visit, family_anmnies, file_uplod, hosp_visit, lab_result, marcumar_pass, secnd_openion, sick_cert, prescription, medication, smoking_status, vaccination, weight_bmi, edit, entry, anamnesis } = translate

        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "homeBg homeBgDrk" : "homeBg"}>
                {this.state.loaderImage && <Loader />}
                <Notification />
               
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            {!this.state.isGraph &&
                                <Grid container direction="row">

                                    {/* Website Menu */}
                                    <LeftMenu isNotShow={true} currentPage="journal" />
                                    <LeftMenuMobile isNotShow={true} currentPage="journal" />

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
                                                                <h1>{journal}</h1>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <Grid className="AddEntrynw">
                                                                    <a onClick={this.handleOpenEntry}>+ {add_new_entry}</a>
                                                                </Grid>
                                                                <Grid className="downloadButton">
                                                                    <DownloadFullTrack TrackRecord={this.state.allTrack1}/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        {/* Model setup */}
                                        <PersonalizedData settings={this.props.settings} SetPersonalized={this.SetPesonalized} added_data={this.state.added_data} personalised_card={this.state.personalised_card} openDash={this.state.openDash} onChange={this.UpdatePersonalized} handleCloseDash={this.handleCloseDash} />
                                        {/* End of Model setup */}

                                        {/* For the filter section */}
                                        <FilterSec FilterText={this.FilterText} settings={this.props.settings} FilterData={this.FilterData} SortData={this.SortData} ClearData={this.ClearData} sortBy={this.state.Sort}/>

                                            {/* For Empty Entry */}
                                            <div>
                                                {this.state.allTrack && this.state.allTrack.length > 0 ?
                                                    this.state.allTrack.map((item, index) => (
                                                        <ViewTimeline TrackRecord={this.state.allTrack1} OpenGraph={this.OpenGraph} comesfrom='patient' downloadTrack={(data) => this.downloadTrack(data)} images={this.state.images} DeleteTrack={(deleteKey) => this.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility) => this.EidtOption(value, updateTrack, visibility)} date_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} Track={item} from="patient" loggedinUser={this.state.cur_one} patient_gender={this.state.patient_gender} />
                                                    ))
                                                    : <EmptyData />}
                                            </div>
                                            {/* <ViewTimeline date_format={this.props.settings.setting.date_format}  time_format={this.props.settings.setting.time_format} allTrack={this.state.allTrack} from="patient" loggedinUser={this.state.cur_one} patient_gender={this.state.patient_gender} /> */}

                                        </Grid>
                                    </Grid>
                                    {/* End of Website Mid Content */}


                                    {/* Website Right Content */}
                                    <Grid item xs={12} md={3}>
                                    <ProfileSection settings={this.props.settings} comesFrom="patient" personalinfo={this.state.personalinfo} user={this.state.cur_one} user_token={this.props.stateLoginValueAim.token} getData={this.cur_one} MoveProfile={this.MoveProfile} />
                                        {/* Model setup */}
                                        <Modal
                                            open={this.state.addInqryNw}
                                            onClose={this.handleCloseInqryNw}
                                            className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ?"darkTheme":""}>
                                            <Grid className="nwDiaCntnt">
                                                <Grid className="nwDiaCntntIner">
                                                    <Grid className="nwDiaCourse">
                                                        <Grid className="nwDiaCloseBtn">
                                                            <a onClick={this.handleCloseInqryNw}>
                                                                <img src={require('../../../assets/images/close-search.svg')} alt="" title="" />
                                                            </a>
                                                        </Grid>

                                                        {this.state.updateOne !== this.state.updateTrack.track_id ?
                                                            <div>
                                                                <p>{new_entry}</p>
                                                                <Grid className="nwDiaSel">
                                                                    <select onChange={(e) => this.SelectOption(e.target.value)} value={this.state.current_select}>
                                                                        <option value="blood_pressure">{blood_pressure}</option>
                                                                        <option value="blood_sugar">{blood_sugar}</option>
                                                                        <option value="condition_pain">{condition_pain}</option>
                                                                        <option value="covid_19">{covid_diary}</option>
                                                                        <option value="diagnosis">{diagnosis}</option>
                                                                        <option value="diary">{diary}</option>
                                                                        <option value="doctor_visit">{doc_visit}</option>
                                                                        <option value="family_anamnesis">{family_anmnies}</option>
                                                                        <option value="file_upload">{file_uplod}</option>
                                                                        <option value="hospitalization">{hosp_visit}</option>
                                                                        <option value="laboratory_result">{lab_result}</option>
                                                                        <option value="marcumar_pass">{marcumar_pass}</option>
                                                                        <option value="medication" >{medication}</option>
                                                                        <option value="smoking_status">{smoking_status}</option>
                                                                        <option value="vaccination">{vaccination}</option>
                                                                        <option value="weight_bmi">{weight_bmi}</option>
                                                                    </select>
                                                                </Grid>
                                                            </div> :
                                                            <div>
                                                                <p>{edit} {entry}</p>
                                                                {this.state.current_select === 'anamnesis' && <Grid className="nwDiaSel1">{anamnesis}</Grid>}
                                                                {this.state.current_select === 'blood_pressure' && <Grid className="nwDiaSel1">{blood_pressure}</Grid>}
                                                                {this.state.current_select === 'blood_sugar' && <Grid className="nwDiaSel1">{blood_sugar}</Grid>}
                                                                {this.state.current_select === 'condition_pain' && <Grid className="nwDiaSel1">{condition_pain}</Grid>}
                                                                {this.state.current_select === 'covid_19' && <Grid className="nwDiaSel1">{covid_diary}</Grid>}
                                                                {this.state.current_select === 'diagnosis' && <Grid className="nwDiaSel1">{diagnosis}</Grid>}
                                                                {this.state.current_select === 'diary' && <Grid className="nwDiaSel1">{diary}</Grid>}
                                                                {this.state.current_select === 'doctor_visit' && <Grid className="nwDiaSel1">{doc_visit}</Grid>}
                                                                {this.state.current_select === 'family_anamnesis' && <Grid className="nwDiaSel1">{family_anmnies}</Grid>}
                                                                {this.state.current_select === 'file_upload' && <Grid className="nwDiaSel1">{file_uplod}</Grid>}
                                                                {this.state.current_select === 'hospitalization' && <Grid className="nwDiaSel1">{hosp_visit}</Grid>}
                                                                {this.state.current_select === 'laboratory_result' && <Grid className="nwDiaSel1">{lab_result}</Grid>}
                                                                {this.state.current_select === 'marcumar_pass' && <Grid className="nwDiaSel1">{marcumar_pass}</Grid>}
                                                                {this.state.current_select === 'medication' && <Grid className="nwDiaSel1">{medication}</Grid>}
                                                                {this.state.current_select === 'prescription' && <Grid className="nwDiaSel1">{prescription}</Grid>}
                                                                {this.state.current_select === 'second_opinion' && <Grid className="nwDiaSel1">{secnd_openion}</Grid>}
                                                                {this.state.current_select === 'sick_certificate' && <Grid className="nwDiaSel1">{sick_cert}</Grid>}
                                                                {this.state.current_select === 'smoking_status' && <Grid className="nwDiaSel1">{smoking_status}</Grid>}
                                                                {this.state.current_select === 'vaccination' && <Grid className="nwDiaSel1">{vaccination}</Grid>}
                                                                {this.state.current_select === 'weight_bmi' && <Grid className="nwDiaSel1">{weight_bmi}</Grid>}

                                                            </div>}
                                                    </Grid>
                                                    <Grid>
                                                        {this.state.current_select === 'anamnesis' && <AnamnesisFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} options={this.state.Pressuresituation} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'blood_pressure' && <BPFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} options={this.state.Pressuresituation} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'blood_sugar' && <BSFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} options={this.state.Allsituation} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'condition_pain' && <CPFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' gender={this.state.patient_gender} GetHideShow={this.GetHideShow} options={this.state.Allpain_quality} options2={this.state.Allpain_type} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'covid_19' && <CovidFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' gender={this.state.patient_gender} GetHideShow={this.GetHideShow} options={this.state.selectCountry} options2={this.state.Alltemprature} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'diagnosis' && <DiagnosisFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' gender={this.state.patient_gender} GetHideShow={this.GetHideShow} options={this.state.selectCountry} options2={this.state.Alltemprature} AddTrack={this.AddTrack} date_format={this.props.settings.setting && this.props.settings.setting.date_format && this.props.settings.setting.date_format} time_format={this.props.settings.setting && this.props.settings.setting.time_format && this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'diary' && <DiaryFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} date_format={this.props.settings.setting && this.props.settings.setting.date_format && this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'doctor_visit' && <DVFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} options={this.state.AllSpecialty} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'family_anamnesis' && <FAFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} options={this.state.Allgender} relativeList={this.state.Allrelation} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'file_upload' && <FUFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} options={this.state.AllSpecialty} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'hospitalization' && <HVFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} options={this.state.AllSpecialty} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'laboratory_result' && <LRFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' lrpUnit={AllL_Ps.AllL_Ps.units} lrpEnglish={AllL_Ps.AllL_Ps.english} GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} options={this.state.AllSpecialty} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'marcumar_pass' && <MPFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_formats} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'medication' && <MedicationFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} options={this.state.AllATC_code} reminders={this.state.Allreminder} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'prescription' && <PFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} options={this.state.AllATC_code} reminders={this.state.Allreminder} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'second_opinion' && <SOFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} options={this.state.AllATC_code} reminders={this.state.Allreminder} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'sick_certificate' && <SCFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} options={this.state.AllATC_code} reminders={this.state.Allreminder} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'smoking_status' && <SSFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} options={this.state.Allsmoking_status} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'vaccination' && <VaccinationFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} options={this.state.AllreminderV} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                        {this.state.current_select === 'weight_bmi' && <BMIFields FileAttachMulti={this.FileAttachMulti} visibility={this.state.visibility} comesfrom='patient' GetHideShow={this.GetHideShow} AddTrack={this.AddTrack} date_format={this.props.settings.setting.date_format} time_format={this.props.settings.setting.time_format} updateEntryState={this.updateEntryState} updateEntryState1={this.updateEntryState1} updateTrack={this.state.updateTrack} />}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of Model setup */}

                                        {/* Model setup */}
                                        <AddEntry settings={this.props.settings} new_entry={this.props.new_entry} openBy="patient" openEntry={this.state.openEntry} value="diagnosis" onChange={this.SelectOption} handleCloseEntry={this.handleCloseEntry} />
                                        {/* End of Model setup */}



                                        <Grid className="Personal_dash">
                                            <a onClick={this.handleOpenDash}>
                                                <img src={require('../../../assets/images/bpupr.png')} alt="" title="" />
                                                {personalize_dashbrd}
                                            </a>
                                        </Grid>

                                        <RightManage upcoming_appointment={this.state.upcoming_appointment} OpenGraph={this.OpenGraph} EidtOption={(value, updateTrack, visibility) => this.EidtOption(value, updateTrack, visibility)} date_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.date_format} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} from="patient" added_data={this.state.added_data} MoveDocument={this.MoveDocument} MoveAppoint={this.MoveAppoint} SelectOption={this.SelectOption} personalinfo={this.state.personalinfo} loggedinUser={this.state.cur_one} downloadTrack={(data) => this.downloadTrack(data)} DeleteTrack={(deleteKey) => this.DeleteTrack(deleteKey)}/>

                                    </Grid>
                                    {/* End of Website Right Content */}

                                </Grid>}
                            {this.state.isGraph &&
                                <GraphView date_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.date_format} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} personalinfo={this.state.personalinfo} current_Graph={this.state.current_Graph} CloseGraph={this.CloseGraph} />
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy })(Index));