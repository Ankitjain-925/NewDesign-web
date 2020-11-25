import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ReactTooltip from "react-tooltip";
import sitedata, { data } from '../../../sitedata';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LeftMenu from './../../Components/Menus/DoctorLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/DoctorLeftMenu/mobile';
import { LanguageFetchReducer } from './../../actions';
import Loader from './../../Components/Loader/index';
import { Redirect, Route } from 'react-router-dom';
import moment from 'moment';
import { authy } from './../../Login/authy.js';
// import translate from './../../Components/Translator/index.js';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import 'react-flags-select/scss/react-flags-select.scss';
import { getDate, getImage } from './../../Components/BasicMethod/index';
import npmCountryList from 'react-select-country-list'
import * as translationEN from '../../../translations/en.json';
import * as translationDE from '../../../translations/de.json';
import * as translationPT from '../../../translations/pt.json';
import * as translationSP from '../../../translations/sp.json';
import * as translationRS from '../../../translations/rs.json';
import * as translationSW from '../../../translations/sw.json';
import * as translationCH from '../../../translations/ch.json';
import * as translationNL from '../../../translations/nl.json';
import { AddFavDoc2, ConsoleCustom } from './../../Components/BasicMethod/index';
import { Doctorset } from '../../Doctor/actions';
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

var letter = /([a-zA-Z])+([ -~])*/, number = /\d+/, specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function TabContainer(props) {
    return (
        <Typography component="div" className="tabsCntnts">
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.country = null;
        this.state = {
            addInqry: false,
            addSick: false,
            specialistOption: null,
            value: 0,
            activeTab: '1',
            modal: false,
            AddPrescription: {},
            loaderImage: false,
            successfullsent: false,
            successfullsent1: false,
            Pdoctors: [],
            Sdoctors: [],
            country: '',
            error1: false,
            error: false,
            docProfile: false,
            docProfile1: false,
            AddSickCertificate: {},
            selectedSdoc: {},
            selectedPdoc: {},
            AllSick: [],
            newItemp: {},
            currentList: [],
            currentPage: 1,
            totalPage: 1,
            AllPres: [],
            pages: [1],
            images: [],
            addPatient: false,
            showPatient: false,
            openNew: false,
            openData: false,
            AddPrescription: {},
            profileDetail: {},
            successfullsent: false,
            AskPatient: '',
            userDetails: {},
            hidden: true,
            Mnotvalid: false,
            regisError: null,
            gettrackdatas: {},
            patDeleteErr: null,
            error_message_1:null,
            sentmessages: true,
            selectCountry:[]
        };
    }

    //for get the track data on the bases of pateint
    GetTrackData = (e) => {
        const state = this.state.gettrackdatas;
        state[e.target.name] = e.target.value;
        this.setState({ gettrackdatas: state });
    }

    //Go to journal direct
    GotoJournal = (currentone) => {

        if (currentone && currentone._id) {
            this.props.Doctorset(currentone._id, currentone.pin);
            this.props.history.push('/doctor/journal');
        }
    }

    componentDidMount() {
        var npmCountry = npmCountryList().getData()
        this.setState({ selectCountry: npmCountry })
        this.getUserData()
        this.getMypatientsData();
    }

    //Get my data
    getUserData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ loaderImage: false });
            this.setState({ UpDataDetails: response.data.data });
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    //Get patients 
    getMypatientsData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        axios.get(sitedata.data.path + '/UserProfile/Mypatients', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ loaderImage: false });
            if (response.data.hassuccessed) {
                var images = []
                response.data.data && response.data.data.length > 0 && response.data.data.map((item) => {
                    var find = item && item.image && item.image
                    if (find) {
                        find = find.split('.com/')[1]
                        axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find,)
                            .then((response2) => {
                                if (response2.data.hassuccessed) {
                                    item.new_image = response2.data.data

                                }
                            })
                    }
                })
                var totalPage = Math.ceil(response.data.data.length / 10);
                this.setState({ AllPres: response.data.data, loaderImage: false, totalPage: totalPage, currentPage: 1 },
                    () => {
                        if (totalPage > 1) {
                            var pages = [];
                            for (var i = 1; i <= this.state.totalPage; i++) {
                                pages.push(i)
                            }
                            this.setState({ MypatientsData: this.state.AllPres.slice(0, 10), pages: pages })
                        }
                        else {
                            this.setState({ MypatientsData: this.state.AllPres })
                        }
                    })


                // this.setState({ MypatientsData: response.data.data });
            }
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }


    //Sent mail for asking personal doctor to patient
    sentmail = () => {
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
        let{plz_enter_email_id_patient }= translate
        const AskPatient = this.state.AskPatient;
        if (!AskPatient || AskPatient === '') {
            this.setState({ errorSentMsg: plz_enter_email_id_patient })
            return
        }
        this.setState({ loaderImage: true, ne: false, ve: false, error_message_1: '' });
        let user_token = this.props.stateLoginValueAim.token

        axios.get(sitedata.data.path + '/UserProfile/AskPatientProfile/' + AskPatient,
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((responce) => {
                if (responce.data.hassuccessed) {
                    var user_id = responce.data.data.profile_id;
                    axios.put(sitedata.data.path + '/UserProfile/AddFavTDoc/' + user_id, {
                    }, {
                        headers: {
                            'token': user_token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((responce) => {
                            if (responce.data.hassuccessed) {
                                axios.post(sitedata.data.path + '/UserProfile/AskPatient/' + user_id, {
                                    lan: this.props.stateLanguageType,
                                    first_name: this.state.UpDataDetails.first_name,
                                    last_name: this.state.UpDataDetails.last_name
                                }, {
                                    headers: {
                                        'token': user_token,
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    }
                                }).then((response) => {
                                    this.setState({ loaderImage: false });
                                    if (response.data.hassuccessed) {
                                        this.setState({ sentmessages: true });
                                        setTimeout(() =>{
                                            this.setState({ sentmessages: false });
                                            this.handleCloseReq();
                                        },3000);
                                    }
                                    else {
                                        this.setState({ ne: true });
                                    }
                                })
                            }
                            else {
                                this.setState({ loaderImage: false, error_message_1: responce.data.msg? responce.data.msg: responce.data.message })
                            }
                        })
                }
                else {
                    this.setState({ loaderImage: false, error_message_1: responce.data.msg? responce.data.msg: responce.data.message })
                }

            })
    }


    //For save data of user
    saveUserData() {
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
        let{plz_fill_mob_number, pswd_not_valid, email_not_valid, plz_fill_fullname_user }= translate
        const { userDetails } = this.state;
        let user_token = this.props.stateLoginValueAim.token;
        this.setState({ regisError: null })
        if (userDetails.first_name && userDetails.last_name && userDetails.first_name !== '' && userDetails.last_name !== '') {
            if (this.validateEmail(userDetails.email)) {
                if (userDetails && userDetails.password && userDetails.password.match(letter) && userDetails.password.match(number) && userDetails.password.match(specialchar)) {
                    if (userDetails.mobile && userDetails.mobile !== '') {
                        this.setState({ loaderImage: true })
                        if (userDetails.country_code) {
                            var country_code = userDetails.country_code
                        }
                        else {
                            var country_code = 'de'
                        }

                        axios.post(sitedata.data.path + '/UserProfile/AddUser/', {
                            type: 'patient',
                            email: userDetails.email,
                            password: userDetails.password,
                            country_code: country_code,
                            mobile: userDetails.mobile,
                            is2fa: userDetails.is2fa ? false : userDetails.is2fa,
                            lan: this.props.stateLanguageType,
                            first_name: userDetails.first_name,
                            last_name: userDetails.last_name
                        })
                            .then((responce) => {
                                this.setState({ loaderImage: false });
                                if (responce.data.hassuccessed === true) {
                                    this.setState({ openNew: false })
                                    axios.post('https://api-eu.cometchat.io/v2.0/users', {
                                        uid: responce.data.data.profile_id,
                                        name: userDetails.first_name+' '+userDetails.last_name
                                    },
                                        {
                                            headers: {
                                                'appId': '220824e717b58ac',
                                                'apiKey': 'fc177a4e50f38129dca144f6270b91bfc9444736',
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then((res) => { })
                                        console.log('responce', responce)
                                        AddFavDoc2(this.props.stateLoginValueAim.user.profile_id, this.props.stateLoginValueAim.user.profile_id, this.props.stateLoginValueAim.token, responce.data.data.profile_id);
                                    // axios.post(sitedata.data.path + '/UserProfile/AddtoPatientList/' + this.props.stateLoginValueAim.user.profile_id, {
                                    //     profile_id: responce.data.data.profile_id
                                    // }, {
                                    //     headers: {
                                    //         'token': user_token,
                                    //         'Accept': 'application/json',
                                    //         'Content-Type': 'application/json'
                                    //     }
                                    // }).then((responce) => { })
                                    this.setState({ successfull: true, alreadyerror: false, Mnotvalid: false, regisError: null })
                                   
                                    setTimeout(
                                        function () {
                                            this.getMypatientsData()
                                        }
                                            .bind(this),
                                        2000
                                    );
                                   
                                    setTimeout(
                                        function () {
                                            this.setState({ successfull: false });
                                        }
                                            .bind(this),
                                        5000
                                    );
                                   
                                }
                                else if (responce.data.message === "Phone is not verified") {
                                    this.setState({ successfull: false, Mnotvalid: true, alreadyerror: false })
                                }
                                else {
                                    this.setState({ successfull: false, alreadyerror: true, Mnotvalid: false })

                                }
                            })
                            .catch(err => { })



                    }
                    else { this.setState({ regisError: plz_fill_mob_number }) }
                }
                else { this.setState({ regisError: pswd_not_valid }) }
            }
            else { this.setState({ regisError: email_not_valid }) }
        }
        else { this.setState({ regisError: plz_fill_fullname_user }) }
    }

    // Open and Close Prescription Edit Form
    handleaddPatient = (data) => {
        this.setState({ addPatient: true, showPatient: false, profileDetail: data });
    };
    handleClosePatient = () => {
        this.setState({ addPatient: false, showPatient: false });
    };


    //open and close Prescription Details
    handleshowPatient = (data) => {
      
        this.setState({ showPatient: true, addPatient: false, profileDetail: data });
    };
    handleCloseShowPatient = () => {
        this.setState({ showPatient: false });
    };

    //Open patient data
    handleOpenData = () => {
        this.setState({ openData: true });
    };
    handleCloseData = () => {
        this.setState({ openData: false });
    };

    handleOpenReq = () => {
        this.setState({ openReq: true, error_message_1: '', errorSentMsg: '', sentmessages: false });
    };
    handleCloseReq = () => {
        this.setState({ openReq: false, error_message_1: '', errorSentMsg: '', sentmessages: false });
    };

    handleOpenNewPatient = () => {
        this.setState({ openNew: true });
    };
    handleCloseNewPatient = () => {
        this.setState({ openNew: false });
    };


    // Add the Sick Certificate State
    AddSickState = (e) => {
        const state = this.state.AddSickCertificate;
        state[e.target.name] = e.target.value;
        this.setState({ AddSickCertificate: state })
    }

    //For set the Name by Event like since_when for Sick certificate
    eventnameSet = (name, value) => {
        const state = this.state.AddSickCertificate;
        state[name] = value;
        this.setState({ AddSickCertificate: state })
    }

    //For set the Name by Event like since_when for Sick certificate
    eventnameSetP = (name, value) => {
        const state = this.state.AddPrescription;
        state[name] = value.value;
        this.setState({ AddPrescription: state, selectedSub: value })
    }

    // Add the Prescription State
    AddState = (e) => {
        const state = this.state.AddPrescription;
        state[e.target.name] = e.target.value;
        this.setState({ AddPrescription: state })
    }
    //Delete Patient
    deleteClickPatient = () => {
        const { profileDetail } = this.state;

        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token

        axios.delete(sitedata.data.path + '/UserProfile/favPatients/' + profileDetail.profile_id + "/" + this.props.stateLoginValueAim.user.alies_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                this.setState({ loaderImage: false });
              
                if (response.data.hassuccessed) {
                    // axios.delete('https://api-eu.cometchat.io/v2.0/users/' + profileDetail.profile_id.toLowerCase(),
                    //     {
                    //         headers: {
                    //             'appId': '220824e717b58ac',
                    //             'apiKey': '44c13a774f7cf0a9809d0792dae638a9f74a6702',
                    //             'Accept': 'application/json',
                    //             'Content-Type': 'application/json'
                    //         }
                    //     })
                    //     .then((response) => {
                            this.getMypatientsData();
                        // })
                }
                else {
                    this.setState({ patDeleteErr: 'Something happened Wrong, Patient delete unsuccessfull' })
                    setTimeout(() => { this.setState({ patDeleteErr: null }); }, 3000)
                }
            }).catch((error) => {
                this.setState({ loaderImage: false });
            });
    }

    handleChange = (e) => {
        const state = this.state.userDetails
        if (e.target.name === 'is2fa') {
            state[e.target.name] = e.target.checked;
        }
        else {
            state[e.target.name] = e.target.value;
        }
        this.setState({ userDetails: state });
    }

    //For select the country code Flag
    onSelectFlag = (countryCode) => {
        const state = this.state.userDetails
        state['country_code'] = countryCode.toLowerCase();
        this.setState({ userDetails: state });
    }

    //For show or hide the Password
    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    //For validate the email is correct or not
    validateEmail = (elementValue) => {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }

    //Get Age 
    getAge(agedate) {
        var today = new Date();
        var birthDate = new Date(agedate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    removePatient = (patientData) => {
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
        let { remove_patient, yes, r_u_sure_remove_patient, no } = translate;
        this.setState({ profileDetail: patientData })
        this.handleCloseShowPatient();
        confirmAlert({
            title: remove_patient,
            message: r_u_sure_remove_patient,
            buttons: [{
                label: yes,
                onClick: () => { this.deleteClickPatient() }
            }, {
                label: no,
            }]
        })
    }

    getImage = (image) => {
        const myFilterData = this.state.images && this.state.images.length > 0 && this.state.images.filter((value, key) =>
            value.image === image);
        if (myFilterData && myFilterData.length > 0) {
            return myFilterData[0].new_image;
        }
    }

    //For filter the country for add insuance
    filterCountry = (i) => {
        let countryList = this.state.selectCountry
        let name
        name = countryList.filter(value => {
            if (value.value == i) {
                return value.label
            }
        })
        return name[0].label
    }

    //For the GetTrack for the patient
    setTrack = () => {
        var user_id = this.state.gettrackdatas.patient_id;
        var pin = this.state.gettrackdatas.pin;
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true })
        if (user_id === "") {
            this.setState({ error_msg: true, loaderImage: false })
        }
        else {
            axios.get(sitedata.data.path + '/User/getUser/' + user_id + '?pin=' + pin + '&&comefrom=healthdata',
                {
                    headers: {
                        'token': user_token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    if (response.data.hassuccessed === true) {
                        this.setState({})
                        this.props.Doctorset(response.data.user_id, pin);
                        this.props.history.push('/doctor/journal');
                    }
                    else {
                        this.setState({ error_msg: true, loaderImage: false, })
                    }
                })
        }
    }

    //For chnage the page
    onChangePage = (pageNumber) => {
        const { searchWord } = this.state;
        if (searchWord && searchWord !== '') {
            let searchdta = this.state.AllPres.filter(e => e.first_name.toLowerCase().indexOf(searchWord) > -1 || e.last_name.toLowerCase().indexOf(searchWord) > -1 || (e.first_name + " " + e.last_name).toLowerCase().indexOf(searchWord) > -1)
            this.setState({ MypatientsData: searchdta.slice((pageNumber - 1) * 10, pageNumber * 10), currentPage: pageNumber })
        }
        else {
            this.setState({ MypatientsData: this.state.AllPres.slice((pageNumber - 1) * 10, pageNumber * 10), currentPage: pageNumber })
        }

    }


    searchPatient = (value) => {
        let searchdta = this.state.AllPres.filter(e => e.first_name.toLowerCase().indexOf(value.toLowerCase()) > -1 || e.last_name.toLowerCase().indexOf(value.toLowerCase()) > -1 || (e.first_name + " " + e.last_name).toLowerCase().indexOf(value.toLowerCase()) > -1)
        this.setState({ MypatientsData: searchdta, currentPage: 0, searchWord: value.toLowerCase() })
    }


    render() {
        const { profileDetail, userDetails } = this.state;
        const { stateLoginValueAim, stateLanguageType } = this.props;
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
        let { succ1, Register_email, Register_Password,pin, Register_Passwordshould, enter_pin, Register_characters, Register_letter, Register_number, Register_special, Register_Mobilenumber, Register_activate_auth, enter,
            Mnotvalids, Register_CREATE, capab_Patients, not_mentioned, age,gender, patient_id, openjournal, personal_info, remove_patient, insurance, id_pin_not_correct, patient_data_access, healthcare_access_for_non_conn_patient, view_data, private_doc_rest, ask_patient_to_become_a_private_doctor, Ask, email_or_id, enter_patient_email_id, new_patient, add_new_patient, first, name,last, country_code, previous, next, find_patient, Patient, add_new_patient_in_list } = translate
        const enter_patient_id = enter+" "+patient_id
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'doctor' || !this.props.verifyCode || !this.props.verifyCode.code) {
            return (<Redirect to={'/'} />);
        }
        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "homeBg homeBgDrk" : "homeBg"}>
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <LeftMenu isNotShow={true} currentPage="patient" />
                                <LeftMenuMobile isNotShow={true} currentPage="patient" />
                                <Notification />
                                {/* End of Website Menu */}
                                
                                <Grid item xs={12} md={9}>
                                    <Grid className="docOpinion">
                                        <Grid container direction="row" className="docAddUpr">
                                            <Grid item xs={12} md={6} className="docOpinLbl"><label>{capab_Patients}</label></Grid>
                                            <Grid item xs={12} md={6} className="docAddPatient"><a onClick={this.handleOpenNewPatient}>+ {add_new_patient}</a></Grid>
                                        </Grid>
                                        <Grid className="findpatient">
                                            <input type="text" onChange={(e) => this.searchPatient(e.target.value)} placeholder={find_patient} />
                                            <Grid className="findpatientReq">
                                                <a onClick={this.handleOpenData}>{patient_data_access}</a>
                                                <a onClick={this.handleOpenReq}>{private_doc_rest}</a>
                                            </Grid>
                                        </Grid>
                                        <Grid className="docOpinionIner">
                                            {this.state.patDeleteErr && <div className="err_message">{this.state.patDeleteErr}</div>}
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>{Patient}</Th>
                                                        <Th>{age}</Th>
                                                        <Th>{gender}</Th>
                                                        <Th>{Register_Mobilenumber}</Th>
                                                        <Th>{patient_id}</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>

                                                    {this.state.MypatientsData && this.state.MypatientsData.length > 0 && this.state.MypatientsData.map((data, index) => (
                                                        <Tr>
                                                            <Td className="docphrImg">
                                                                <img src={
                                                                    this.state.MypatientsData[index].new_image ?
                                                                        this.state.MypatientsData[index].new_image
                                                                        :
                                                                        require('../../../assets/images/dr1.jpg')
                                                                } alt="" title="" />
                                                                {data.first_name ? data.first_name + " " + data.last_name : not_mentioned}
                                                            </Td>
                                                            <Td>{data.birthday ? this.getAge(data.birthday) : not_mentioned}</Td>
                                                            <Td style={{ textTransform: 'capitalize' }}>{data.sex ? data.sex : not_mentioned}</Td>
                                                            <Td>{data.mobile ? data.mobile : not_mentioned}</Td>
                                                            <Td>{data.alies_id ? data.alies_id : not_mentioned}</Td>
                                                            <Td className="presEditDot scndOptionIner openJourMenu">
                                                                <a><img src={require('../../../assets/images/three_dots_t.png')} alt="" title="" className="openScnd" />
                                                                    <ul>
                                                                        <li onClick={() => { this.GotoJournal(data) }}><img src={require('../../../assets/images/journal1.svg')} alt="" title="" />{openjournal}</li>
                                                                        <li onClick={(e) => this.handleshowPatient(data)}><img src={require('../../../assets/images/personal-info.svg')} alt="" title="" />{personal_info}</li>
                                                                        <li onClick={(e) => this.removePatient(data)}><img src={require('../../../assets/images/del.png')} alt="" title="" />{remove_patient}</li>
                                                                    </ul>
                                                                </a>
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                            {/*Start of Patient detail Modal*/}
                                            <Modal
                                                className={this.props.settings&&this.props.settings.setting && this.props.settings.setting.mode &&this.props.settings.setting.mode === 'dark' ?"darkTheme":""}
                                                open={this.state.showPatient}
                                                onClose={this.handleCloseShowPatient}
                                            >
                                                <Grid className="infoBoxCntnt">
                                                    <Grid className="infoCourse">
                                                        <Grid className="shPatientProfile">
                                                            <Grid className="infoCloseBtn">
                                                                <a onClick={this.handleCloseShowPatient}>
                                                                    <img src={require('../../../assets/images/close-search.svg')} alt="" title="" />
                                                                </a>
                                                            </Grid>
                                                            <Grid className="userDetail">
                                                                <Grid className="userDetailLft"><img src={profileDetail.new_image} /></Grid>
                                                                <Grid className="userDetailRght">
                                                                    <Grid><label>{profileDetail.first_name + ' ' + profileDetail.last_name}</label></Grid>
                                                                    <Grid><span>{profileDetail.sex}</span></Grid>
                                                                    <Grid>
                                                                        <p>{`${moment(profileDetail.birthday).format('DD/MM/YYYY')}`}
                                                                            {profileDetail.birthday && <a>{`(${this.getAge(profileDetail.birthday)} years)`}</a>}
                                                                        </p>
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="userAdresInfo">
                                                            <Grid className="userAdres">
                                                                <Grid><img src={require('../../../assets/images/location-pin2.svg')} alt="" title="" /></Grid>
                                                                <p>{profileDetail.address} <br />
                                                                    {profileDetail.city} <br />
                                                                    {profileDetail.country ? profileDetail.country.label : ''}
                                                                </p>
                                                            </Grid>
                                                            <Grid className="userAdres">
                                                                <Grid><img src={require('../../../assets/images/phone2.svg')} alt="" title="" /></Grid>
                                                                <p>{profileDetail.mobile}</p>
                                                            </Grid>
                                                            <Grid className="userAdres">
                                                                <Grid><img src={require('../../../assets/images/email11.svg')} alt="" title="" /></Grid>
                                                                <p>{profileDetail.email}</p>
                                                            </Grid>
                                                            <Grid className="userAdres">
                                                                <Grid><img src={require('../../../assets/images/language11.svg')} alt="" title="" /></Grid>
                                                                <p>{profileDetail.language && profileDetail.language.map((data,inde)=>
                                                                    ((inde!==0)?
                                                                        (', '+data)
                                                                    :
                                                                    (data))
                                                                    )}</p>
                                                            </Grid>
                                                            <Grid className="insureMe">
                                                                <Grid><label>{insurance}</label></Grid>
                                                                {profileDetail.insurance && profileDetail.insurance.map((data, index) => (<Grid container direction="row">
                                                                    <Grid item xs={4} md={4}>
                                                                        <p>{data ? this.filterCountry(data.insurance_country) : ''}</p>
                                                                    </Grid>
                                                                    <Grid item xs={4} md={4}>
                                                                        <p>{data ? data.insurance : ''}</p>
                                                                    </Grid>
                                                                    <Grid item xs={4} md={4}>
                                                                        <p>{data ? data.insurance_number : ''}</p>
                                                                    </Grid>
                                                                </Grid>))}
                                                            </Grid>
                                                            <Grid className="openJournal">
                                                                <Grid container direction="row" justifyContent="center" alignItems="center">
                                                                    <Grid item xs={12} md={12}>
                                                                        <input type="submit" onClick={() => { this.GotoJournal(profileDetail) }} value={openjournal} />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Modal>
                                            {/* End of Model setup */}
                                            {/* Model Patient Data Access */}
                                            <Modal open={this.state.openData} onClose={this.handleCloseData} className={this.props.settings&&this.props.settings.setting && this.props.settings.setting.mode &&this.props.settings.setting.mode === 'dark' ?"darkTheme":""}>
                                                <Grid className="dataBoxCntnt">
                                                    <Grid className="dataCourse">
                                                        <Grid className="dataCloseBtn">
                                                            <a onClick={this.handleCloseData}>
                                                                <img src={require('../../../assets/images/close-search.svg')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <Grid>{this.state.error_msg && <div className="err_message">{id_pin_not_correct}</div>}</Grid>
                                                        <Grid><label>{patient_data_access}</label></Grid>
                                                        <p>{healthcare_access_for_non_conn_patient}</p>
                                                    </Grid>
                                                    <Grid className="dataBoxUpr">
                                                        <Grid className="dataBoxInput">
                                                            <Grid>
                                                                <Grid><label>{patient_id}</label></Grid>
                                                                <Grid><input type="text" name="patient_id" placeholder={enter_patient_id} id="login-name" onChange={this.GetTrackData} /></Grid>
                                                            </Grid>
                                                            <Grid>
                                                                <Grid><label>{pin}</label></Grid>
                                                                <Grid><input type="text" id="pin" name="pin" placeholder={enter_pin} onChange={this.GetTrackData} /></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="dataBoxSub">
                                                            <input type="submit" value={view_data} onClick={this.setTrack} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Modal>
                                            {/* End of Model Patient Data Access */}

                                            {/* Model Private Doctor Request */}
                                            <Modal
                                                open={this.state.openReq}
                                                onClose={this.handleCloseReq}
                                                className={this.props.settings&&this.props.settings.setting && this.props.settings.setting.mode &&this.props.settings.setting.mode === 'dark' ?"darkTheme":""}>
                                                <Grid className="dataBoxCntnt">
                                                    <Grid className="dataCourse">
                                                        <Grid className="dataCloseBtn">
                                                            <a onClick={this.handleCloseReq}>
                                                                <img src={require('../../../assets/images/close-search.svg')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <Grid><label>{private_doc_rest}</label></Grid>
                                                        <p>{ask_patient_to_become_a_private_doctor}</p>
                                                    </Grid>
                                                    <Grid className="dataBoxUpr">
                                                        <Grid className="dataBoxInput entrpatId">
                                                            {this.state.errorSentMsg && this.state.errorSentMsg != '' && <div className="err_message">{this.state.errorSentMsg}</div>}
                                                            {this.state.error_message_1 && this.state.error_message_1 != '' && <div className="err_message">{this.state.error_message_1}</div>}
                                                            {this.state.sentmessages && <div className="success_message">{succ1}</div>}
                                                            <Grid>
                                                                <Grid><label>{email_or_id}</label></Grid>
                                                                <Grid><input type="text" placeholder={enter_patient_email_id} onChange={(event) => {this.setState({ AskPatient: event.target.value, errorSentMsg:'' });}} /></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="dataBoxSub">
                                                            <input type="submit" value={Ask} onClick={this.sentmail} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Modal>
                                            {/* End of Private Doctor Request */}
                                            {/* Modal for New Patient Enter */}
                                            <Modal
                                                open={this.state.openNew}
                                                onClose={this.handleCloseNewPatient}
                                                className={this.props.settings&&this.props.settings.setting && this.props.settings.setting.mode &&this.props.settings.setting.mode === 'dark' ?"darkTheme nwPresModel":"nwPresModel"}
                                                 
                                            >
                                                <Grid className="dataBoxCntnt">
                                                    <Grid className="dataCourse">
                                                        <Grid className="dataCloseBtn">
                                                            <a onClick={this.handleCloseNewPatient}>
                                                                <img src={require('../../../assets/images/close-search.svg')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <Grid><label>{new_patient}</label></Grid>
                                                        <p>{add_new_patient_in_list}</p>
                                                    </Grid>

                                                    <Grid className="dataBoxUpr patietnRegister">
                                                        <Grid className="registerRow">
                                                            <Grid><label>{first} {name}</label></Grid>
                                                            <Grid><input type="text" name="first_name" onChange={this.handleChange} /></Grid>
                                                        </Grid>

                                                        <Grid className="registerRow">
                                                            <Grid><label>{last} {name}</label></Grid>
                                                            <Grid><input type="text" name="last_name" onChange={this.handleChange} /></Grid>
                                                        </Grid>

                                                        <Grid className="registerRow">
                                                            <Grid><label>{Register_email}</label></Grid>
                                                            <Grid><input type="text" name="email" onChange={this.handleChange} /></Grid>
                                                        </Grid>

                                                        <Grid className="registerRow passInstMain rlativeDiv">
                                                            <Grid><label>{Register_Password}</label></Grid>
                                                            <Grid className="registerPass">
                                                                <input
                                                                    type={this.state.hidden ? "password" : "text"}
                                                                    name="password"
                                                                    onChange={this.handleChange}
                                                                />
                                                                {this.state.hidden &&
                                                                    <a onClick={this.toggleShow}>
                                                                        <img src={require('../../../assets/images/showeye.svg')} alt="" title="" />
                                                                    </a>
                                                                }
                                                                {!(this.state.hidden) &&
                                                                    <a onClick={this.toggleShow}>
                                                                        <img src={require('../../../assets/images/hide.svg')} alt="" title="" />
                                                                    </a>
                                                                }
                                                            </Grid>

                                                            {userDetails && userDetails.password ?
                                                                <div className="passInst">
                                                                    <div className="passInstIner">
                                                                        <p>{Register_Passwordshould}</p>
                                                                        {/* <img src={require('../../../assets/images/passArrow.png')} alt="" title="" className="passArow" /> */}
                                                                        <ul>
                                                                            <li>{userDetails && userDetails.password && userDetails.password.length > 8 && <a><img src={require('../../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_characters}</a>}
                                                                                {userDetails && userDetails.password && userDetails.password.length <= 8 && <a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_characters}</a>}
                                                                            </li>
                                                                            <li>{userDetails && userDetails.password && !userDetails.password.match(letter) && <a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_letter}</a>}
                                                                                {userDetails && userDetails.password && userDetails.password.match(letter) && <a><img src={require('../../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_letter}</a>}
                                                                            </li>
                                                                            <li>{userDetails && userDetails.password && !userDetails.password.match(number) && <a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_number}</a>}
                                                                                {userDetails && userDetails.password && userDetails.password.match(number) && <a><img src={require('../../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_number}</a>}
                                                                            </li>
                                                                            <li>
                                                                                {userDetails && userDetails.password && !userDetails.password.match(specialchar) && <a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_special}</a>}
                                                                                {userDetails && userDetails.password && userDetails.password.match(specialchar) && <a><img src={require('../../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_special}</a>}
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                : <div className="passInst">
                                                                    <div className="passInstIner">
                                                                        <p>{Register_Passwordshould}</p>
                                                                        <img src={require('../../../assets/images/passArrow.png')} alt="" title="" className="passArow" />
                                                                        <ul>
                                                                            <li><a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_characters}</a></li>
                                                                            <li><a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_letter}</a></li>
                                                                            <li><a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_number}</a></li>
                                                                            <li><a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_special}</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>}
                                                        </Grid>
                                                        <Grid className="registerRow regMobNum">
                                                            <Grid><label>{Register_Mobilenumber}</label></Grid>
                                                            <Grid>
                                                                <ReactFlagsSelect placeholder={country_code} name="country_code" onSelect={this.onSelectFlag} showSelectedLabel={false} defaultCountry="DE" />
                                                                <input type="text" className="mobileReg" type="number" name="mobile" onChange={this.handleChange} />
                                                            </Grid>
                                                            <FormControlLabel className="regMob"
                                                                control={<Checkbox value="checkedA" onChange={this.handleChange}
                                                                    name="is2fa" />}
                                                                label={Register_activate_auth}
                                                            />
                                                        </Grid>
                                                        <div className="err_message">
                                                            {this.state.regisError}
                                                            {this.state.namevald}
                                                            {this.state.Mnotvalid && Mnotvalids}
                                                        </div>
                                                        <Grid className="registerRow">
                                                            <Grid className="regCrtAc">
                                                                <input type="submit" value={Register_CREATE} onClick={this.saveUserData.bind(this)} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                </Grid>
                                            </Modal>
                                            {/* End of Modal for New Patient Enter */}
                                            <Grid className="tablePagNum">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6}>
                                                        <Grid className="totalOutOff">
                                                            <a>{this.state.currentPage} of {this.state.totalPage}</a>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {this.state.totalPage > 1 && <Grid className="prevNxtpag">
                                                            {this.state.currentPage != 1 && <a className="prevpag" onClick={() => { this.onChangePage(this.state.currentPage - 1) }}>{previous}</a>}
                                                            {this.state.pages && this.state.pages.length > 0 && this.state.pages.map((item, index) => (
                                                                <a className={this.state.currentPage == item && "activePageDocutmet"} onClick={() => { this.onChangePage(item) }}>{item}</a>
                                                            ))}
                                                            {this.state.currentPage != this.state.totalPage && <a className="nxtpag" onClick={() => { this.onChangePage(this.state.currentPage + 1) }}>{next}</a>}
                                                        </Grid>}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
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
    const { settings } = state.Settings;
    const { Doctorsetget } = state.Doctorset;
    const { verifyCode } = state.authy;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        Doctorsetget,
        verifyCode,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { Doctorset, LoginReducerAim, LanguageFetchReducer, Settings,authy })(Index));