import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
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
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import { LanguageFetchReducer } from './../../actions';
import Loader from './../../Components/Loader/index';
import { Redirect, Route } from 'react-router-dom';
import SickList from './Components/sickcertificate';
import PrecriptionList from './Components/prescription';
import { AddFavDoc, ConsoleCustom } from './../../Components/BasicMethod/index';
import * as translationEN from '../../../translations/en_json_proofread_13072020.json';


const specialistOptions = [
    { value: 'Specialist1', label: 'Specialist1' },
    { value: 'Specialist2', label: 'Specialist2' },
];

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
            newItems: {},
            share_to_doctor: false,
            share_to_doctor1: false,
            found1: false,
            found: false,
            selectedSub: {}
        };
    }

    // Open and Close Prescription form
    handleaddInqry = () => {
        this.setState({ addInqry: true });
    };
    handleCloseInqry = () => {
        this.setState({ addInqry: false });
    };

    //open and close Sick certificate form
    handleaddSick = () => {
        this.setState({ addSick: true });
    };
    handleCloseSick = () => {
        this.setState({ addSick: false });
    };

    handleSpecialist = specialistOption => {
        this.setState({ specialistOption });
    };

    //For change the Tab
    handleChangeTabs = (event, value) => {
        this.setState({ value })
    };


    //Set the data of Tab of Pescription or Sick certificate
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount() {
        this.patientinfo();
        this.allSdoctors();
        this.alldoctor();
    }

    //Get current User Information
    patientinfo() {
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id,
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                this.setState({ personalinfo: response.data.data, loaderImage: false })
            })
    }

    //For submit the Sick Certificate
    Submitcertificate = () => {
        var data = this.state.AddSickCertificate;
        if (data.doctor_id) {
            var user_token = this.props.stateLoginValueAim.token;
            data.patient_id = this.props.stateLoginValueAim.user._id;
            data.patient_email = this.props.stateLoginValueAim.user.email;
            data.first_name = this.state.personalinfo.first_name;
            data.last_name = this.state.personalinfo.last_name;
            data.email = this.props.stateLoginValueAim.user.email;
            data.birthday = this.state.personalinfo.birthday;
            data.profile_image = this.state.personalinfo.image;
            data.patient_profile_id = this.props.stateLoginValueAim.user.profile_id;
            data.patient_info = {
                patient_id: this.props.stateLoginValueAim.user.profile_id,
                first_name: this.state.personalinfo.first_name,
                last_name: this.state.personalinfo.last_name,
                email: this.props.stateLoginValueAim.user.email,
                birthday: this.state.personalinfo.birthday,
                profile_image: this.state.personalinfo.image,
                bucket: this.props.stateLoginValueAim.user.bucket,
            };
            data.status = "free";
            data.view_status = "free";
            data.lan = this.props.stateLanguageType;
            data.docProfile = {
                patient_id: this.state.docProfile1.profile_id,
                first_name: this.state.docProfile1.first_name,
                last_name: this.state.docProfile1.last_name,
                email: this.state.docProfile1.email,
                birthday: this.state.docProfile1.birthday,
                profile_image: this.state.docProfile1.image
            };
            data.send_on = new Date();
            this.setState({ loaderImage: true })
            axios.post(sitedata.data.path + '/UserProfile/SickCertificate', data).then((response) => {
                if (this.state.share_to_doctor1) {
                    AddFavDoc(this.state.docProfile1.profile_id, this.state.docProfile1.profile_id, this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user.profile_id);
                }
                this.setState({ newItems: data, docProfile: false, AddSickCertificate: {}, selectedSdoc: {}, loaderImage: false, successfullsent1: true, addSick: false })
            })
            setTimeout(() => { this.setState({ successfullsent1: false }); }, 5000);
        }
        else {
            this.setState({ error1: true });
            setTimeout(() => { this.setState({ error1: false }); }, 5000);
        }
    }

    //For submit the Prescriptions
    SubmitPrescription = () => {
        this.setState({ error: false });
        var data = this.state.AddPrescription;
        if (data.doctor_id) {
            this.setState({ error: false });
            var user_token = this.props.stateLoginValueAim.token;
            data.status = "free";
            data.first_name = this.state.personalinfo.first_name;
            data.last_name = this.state.personalinfo.last_name;
            data.birthday = this.state.personalinfo.birthday;
            data.profile_image = this.state.personalinfo.image;
            data.patient_id = this.props.stateLoginValueAim.user._id;
            data.patient_profile_id = this.props.stateLoginValueAim.user.profile_id;
            data.patient_email = this.props.stateLoginValueAim.user.email;
            data.patient_info = {
                patient_id: this.props.stateLoginValueAim.user.profile_id,
                first_name: this.state.personalinfo.first_name,
                last_name: this.state.personalinfo.last_name,
                email: this.props.stateLoginValueAim.user.email,
                birthday: this.state.personalinfo.birthday,
                profile_image: this.state.personalinfo.image,
                bucket: this.props.stateLoginValueAim.user.bucket
            };
            data.view_status = "free";
            data.lan = this.props.stateLanguageType;
            data.docProfile = {
                patient_id: this.state.docProfile.profile_id,
                first_name: this.state.docProfile.first_name,
                last_name: this.state.docProfile.last_name,
                email: this.state.docProfile.email,
                birthday: this.state.docProfile.birthday,
                profile_image: this.state.docProfile.image
            };
            data.send_on = new Date();
            this.setState({ loaderImage: true })
            axios.post(sitedata.data.path + '/UserProfile/Prescription', data).then((response) => {
                if (this.state.share_to_doctor) {
                    AddFavDoc(this.state.docProfile.profile_id, this.state.docProfile.profile_id, this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user.profile_id);
                }
                this.setState({ newItemp: data, docProfile: false, addInqry: false, AddPrescription: {}, selectedSub: {}, selectedPdoc: {}, loaderImage: false, successfullsent: true })
            })
            setTimeout(() => { this.setState({ successfullsent: false }); }, 5000);
        }
        else {
            this.setState({ error: true });
            setTimeout(() => { this.setState({ error: false }) }, 5000);
        }
    }

    //Add doctor for Prescription
    AddDoctor = (e, name) => {
        const state = this.state.AddPrescription;
        state[name] = e.value;
        this.setState({ AddPrescription: state, selectedPdoc: e }, () => {
            if (this.state.AddPrescription.doctor_id) {
                let doctor_id = this.state.AddPrescription.doctor_id
                axios.get(sitedata.data.path + '/UserProfile/DoctorProfile/' + doctor_id, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    const found = this.state.personalinfo.fav_doctor && this.state.personalinfo.fav_doctor.length > 0 && this.state.personalinfo.fav_doctor.some(el => el.doctor === response.data.data.profile_id);
                    this.setState({ docProfile: response.data.data, found: found })
                })
            }
        })
    }
    //Add Sick Cerificate Doctor
    AddDocotor = (e, name) => {
        const state = this.state.AddSickCertificate;
        state[name] = e.value;
        this.setState({ AddSickCertificate: state, selectedSdoc: e }, () => {
            if (this.state.AddSickCertificate.doctor_id) {
                let doctor_id = this.state.AddSickCertificate.doctor_id
                axios.get(sitedata.data.path + '/UserProfile/DoctorProfile/' + doctor_id, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    const found = this.state.personalinfo.fav_doctor && this.state.personalinfo.fav_doctor.length > 0 && this.state.personalinfo.fav_doctor.some(el => el.doctor === response.data.data.profile_id);
                    this.setState({ docProfile1: response.data.data, found1: found })
                })
            }
        })
    }
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

    //All doctors of the Pres
    alldoctor() {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/certificate/DoctorUsersP',
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                }
            }).then((response) => {
                if (response.data.data && response.data.data.length > 0) {
                    var data = [];
                    response.data.data.map((item) => {
                        var name = '';
                        if (item.first_name && item.last_name) {
                            name = item.first_name + ' ' + item.last_name
                        }
                        else if (item.first_name) {
                            name = item.first_name
                        }
                        data.push({ value: item._id, label: name });
                    })
                    this.setState({ Pdoctors: data })
                }
            })
    }
    //All doctors of the SC
    allSdoctors() {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/certificate/DoctorUsersSc',
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.data.data && response.data.data.length > 0) {
                    var data = [];
                    response.data.data.map((item) => {
                        var name = '';
                        if (item.first_name && item.last_name) {
                            name = item.first_name + ' ' + item.last_name
                        }
                        else if (item.first_name) {
                            name = item.first_name
                        }
                        data.push({ value: item._id, label: name });
                    })
                    this.setState({ Sdoctors: data })
                }
            })
    }

    render() {
        const { specialistOption } = this.state;
        const { value } = this.state;
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient') {
            return (<Redirect to={'/'} />);
        }

        let translate;
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
        let { sick_cert, my_doc, prescription, New, r_u_tracking_medi, inquiry, select, for_sick_cert_req_doc, share_health_status_info_from_journal, share_health_status, see_list_shared_info, share_ur_jounral_status,
            country_u_live, dieseases_etc, allergies, health_issue, doc_and_statnderd_ques, doc_aimedis_private, how_u_feeling, is_ur_temp_high_to_38, which_symptoms_do_u_hav, since_when,
            have_u_already_been_sick, how_long_do_u_unable_to_work, days, it_is_known_dieseas, do_u_hv_allergies, what_ur_profession, Annotations, details, questions, for_pres_req_doc_require,
            is_this_follow_pres, how_u_like_rcv_pres, Medicine, Substance, Dose, mg, trade_name, atc_if_applicable, manufacturer, pack_size,  } = translate

        return (
            <Grid className="homeBg">
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <LeftMenu currentPage="documents" />
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={9}>

                                    <Grid className="docsOpinion">

                                        <Grid container direction="row" className="docsOpinLbl">
                                            <Grid item xs={12} md={6}><label>{my_doc}</label></Grid>
                                            <Grid item xs={12} md={6} className="docsOpinRght">
                                                {value == 0 && <a onClick={this.handleaddInqry}>+ {New} {prescription} {inquiry}</a>}
                                                {value == 1 && <a onClick={this.handleaddSick}>+ {New} {sick_cert}</a>}
                                            </Grid>
                                        </Grid>

                                        {/* Model setup for sick sertificate*/}
                                        <Modal
                                            open={this.state.addSick}
                                            onClose={this.handleCloseSick}
                                            className="nwPresModel">
                                            <Grid className="nwPresCntnt">
                                                <Grid className="nwPresCntntIner">
                                                    <Grid className="nwPresCourse">
                                                        <Grid className="nwPresCloseBtn">
                                                            <a onClick={this.handleCloseSick}>
                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <p>{New} {inquiry}</p>
                                                        <Grid><label>{sick_cert}</label></Grid>
                                                    </Grid>
                                                    {this.state.error1 && <div className="err_message">{for_sick_cert_req_doc}</div>}
                                                    <Grid className="docHlthMain">
                                                        {!this.state.found1 && <Grid className="docHlth">
                                                            <h2>{share_health_status}</h2>
                                                            <Grid className="docHlthChk">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            value="checkedB"
                                                                            color="#00ABAF"
                                                                            name="share_to_doctor"
                                                                            checked={this.state.share_to_doctor1 === true && this.state.share_to_doctor1} onChange={(e) => { this.setState({ share_to_doctor1: e.target.checked }) }}
                                                                        />
                                                                    }
                                                                    label={share_ur_jounral_status}
                                                                />
                                                            </Grid>
                                                            <p>{share_health_status_info_from_journal}</p>
                                                            <p>{see_list_shared_info}
                                                                <a className="vsblTime" data-tip data-for="timeIconTip">
                                                                    <img src={require('../../../assets/images/Info.svg')} alt="" title="" />
                                                                </a>
                                                                <ReactTooltip className="cntryLiv" id="timeIconTip" place="right" effect="solid" backgroundColor="#ffffff">
                                                                    <p>- {country_u_live}</p>
                                                                    <p>- {dieseases_etc}</p>
                                                                    <p>- {allergies}</p>
                                                                    <p>- {health_issue}</p>
                                                                </ReactTooltip>
                                                            </p>
                                                        </Grid>}
                                                        <Grid className="drstndrdQues">
                                                            <h3>{doc_and_statnderd_ques}</h3>
                                                            <Grid className="drsplestQues">
                                                                <Grid><label>{doc_aimedis_private}</label></Grid>
                                                                <Grid>
                                                                    <Select
                                                                        value={this.state.selectedSdoc}
                                                                        onChange={(e) => this.AddDocotor(e, 'doctor_id')}
                                                                        options={this.state.Sdoctors}
                                                                        placeholder={select}
                                                                        isSearchable={false}
                                                                        isMulti={false}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="drsplestQues">
                                                                <Grid><label>{how_u_feeling}?</label></Grid>
                                                                <Grid>
                                                                    <input type="text" name="how_are_you" value={this.state.AddSickCertificate.how_are_you} onChange={this.AddSickState} />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="ishelpUpr">
                                                            <Grid className="ishelpLbl"><label>{is_ur_temp_high_to_38}?</label></Grid>
                                                            <Grid className="ishelpChk">
                                                                <FormControlLabel control={<Radio />} name="fever" value="yes" color="#00ABAF" checked={this.state.AddSickCertificate.fever === 'yes'} onChange={this.AddSickState} label="Yes" />
                                                                <FormControlLabel control={<Radio />} name="fever" color="#00ABAF" value="no" checked={this.state.AddSickCertificate.fever === 'no'} onChange={this.AddSickState} label="No" />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>{which_symptoms_do_u_hav}?</label></Grid>
                                                            <Grid><input type="text" name="which_symptomps" value={this.state.AddSickCertificate.which_symptomps} onChange={this.AddSickState} /></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub sncWhen">
                                                            <Grid><label>{since_when}?</label></Grid>
                                                            <Grid>
                                                                <a className={this.state.AddSickCertificate.since_when === 'Today' && "current_since_when"} onClick={() => { this.eventnameSet('since_when', 'Today') }}>Today</a>
                                                                <a className={this.state.AddSickCertificate.since_when === 'Yesterday' && "current_since_when"} onClick={() => { this.eventnameSet('since_when', 'Yesterday') }}>Yesterday</a>
                                                                <a className={this.state.AddSickCertificate.since_when === '2 days ago' && "current_since_when"} onClick={() => { this.eventnameSet('since_when', '2 days ago') }}>2 days ago</a>
                                                                <a className={this.state.AddSickCertificate.since_when === '3-6 days ago' && "current_since_when"} onClick={() => { this.eventnameSet('since_when', '3-6 days ago') }}>3-6 days ago</a>
                                                                <a className={this.state.AddSickCertificate.since_when === 'Week or more' && "current_since_when"} onClick={() => { this.eventnameSet('since_when', 'Week or more') }}>Week or more</a></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>{have_u_already_been_sick}?</label></Grid>
                                                            <Grid><input type="text" name="same_problem_before" value={this.state.AddSickCertificate.same_problem_before} onChange={this.AddSickState} /></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>{how_long_do_u_unable_to_work}?</label></Grid>
                                                            <Grid className="doseMg"><input type="text" name="time_unable_work" value={this.state.AddSickCertificate.time_unable_work} onChange={this.AddSickState} />
                                                                <span>{days}</span>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>{it_is_known_dieseas}?</label></Grid>
                                                            <Grid><input type="text" name="known_diseases" value={this.state.AddSickCertificate.known_diseases} onChange={this.AddSickState} /></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>{r_u_tracking_medi}?</label></Grid>
                                                            <Grid><input type="text" name="medication" value={this.state.AddSickCertificate.medication} onChange={this.AddSickState} /></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>{do_u_hv_allergies}?</label></Grid>
                                                            <Grid><input type="text" name="allergies" value={this.state.AddSickCertificate.allergies} onChange={this.AddSickState} /></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>{what_ur_profession}?</label></Grid>
                                                            <Grid><input type="text" name="professions" value={this.state.AddSickCertificate.professions} onChange={this.AddSickState} /></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>{Annotations} / {details} / {questions}</label></Grid>
                                                            <Grid><textarea name="annotations" value={this.state.AddSickCertificate.annotations} onChange={this.AddSickState}> </textarea></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="infoShwHidBrdr2"></Grid>
                                                    <Grid className="infoShwHidIner2">
                                                        {/* <Grid className="infoShwHidMain2">
                                                            <Grid container direction="row" justify="center" alignItems="center">
                                                                <Grid item xs={6} md={6}>
                                                                    <Grid className="infoShwHid2">
                                                                        <a>Show or Hide <img src={require('../../../assets/images/Info.svg')} alt="" title="" /></a>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={6} md={6} className="editShwHid2">
                                                                    <a>Edit</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid> */}
                                                        <Grid className="infoShwSave2">
                                                            <input type="submit" onClick={this.Submitcertificate} value="Save entry" />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of Model setup */}

                                        {/* Model setup for Prescription*/}
                                        <Modal
                                            open={this.state.addInqry}
                                            onClose={this.handleCloseInqry}
                                            className="nwPresModel">
                                            <Grid className="nwPresCntnt">
                                                <Grid className="nwPresCntntIner">

                                                    <Grid className="nwPresCourse">
                                                        <Grid className="nwPresCloseBtn">
                                                            <a onClick={this.handleCloseInqry}>
                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <p>{New} {inquiry}</p>
                                                        <Grid><label>{prescription}</label></Grid>
                                                    </Grid>
                                                    {this.state.error && <div className="err_message">{for_pres_req_doc_require}</div>}
                                                    <Grid className="docHlthMain">

                                                        {!this.state.found && <Grid className="docHlth">
                                                            <h2>{share_health_status}</h2>
                                                            <Grid className="docHlthChk">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            value="checkedB"
                                                                            color="#00ABAF"
                                                                            checked={this.state.share_to_doctor === true && this.state.share_to_doctor} onChange={(e) => { this.setState({ share_to_doctor: e.target.checked }) }}
                                                                        />
                                                                    }
                                                                    label="Share journal health status with Doctor"
                                                                />
                                                            </Grid>
                                                            <p>{share_health_status_info_from_journal}</p>
                                                            <p>{see_list_shared_info}

                                                                <a className="vsblTime" data-tip data-for="timeIconTip">
                                                                    <img src={require('../../../assets/images/Info.svg')} alt="" title="" />
                                                                </a>
                                                                <ReactTooltip className="cntryLiv" id="timeIconTip" place="right" effect="solid" backgroundColor="#ffffff">
                                                                    <p>- {country_u_live}</p>
                                                                    <p>- {dieseases_etc}</p>
                                                                    <p>- {allergies}</p>
                                                                    <p>- {health_issue}</p>
                                                                </ReactTooltip>
                                                            </p>
                                                        </Grid>}

                                                        <Grid className="drstndrdQues">
                                                                <h3>{doc_and_statnderd_ques}</h3>
                                                            <Grid className="drsplestQues">
                                                                <Grid><label>{doc_aimedis_private}</label></Grid>
                                                                <Grid>
                                                                    <Select
                                                                        value={this.state.selectedPdoc}
                                                                        onChange={(e) => this.AddDoctor(e, 'doctor_id')}
                                                                        options={this.state.Pdoctors}
                                                                        placeholder={select}
                                                                        isSearchable={false}
                                                                        isMulti={false}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="ishelpUpr">
                                                            <Grid className="ishelpLbl"><label>{is_this_follow_pres}?</label></Grid>
                                                            <Grid className="ishelpChk">
                                                                <FormControlLabel control={<Radio />} name="follow_up_prescription" value="yes" color="#00ABAF" checked={this.state.AddPrescription.follow_up_prescription === 'yes'} onChange={this.AddState} label="Yes" />
                                                                <FormControlLabel control={<Radio />} name="follow_up_prescription" color="#00ABAF" value="no" checked={this.state.AddPrescription.follow_up_prescription === 'no'} onChange={this.AddState} label="No" />
                                                            </Grid>
                                                            <Grid className="ishelpLbl">
                                                                <label>{how_u_like_rcv_pres}?</label>
                                                            </Grid>
                                                            <Grid className="ishelpChk">
                                                                <FormControlLabel control={<Radio />} name="prescription_type" value="online" color="#00ABAF" checked={this.state.AddPrescription.prescription_type === 'online'} onChange={this.AddState} label="Online" />
                                                                <FormControlLabel control={<Radio />} name="prescription_type" color="#00ABAF" value="offline" checked={this.state.AddPrescription.prescription_type === 'offline'} onChange={this.AddState} label="Home address mailbox" />
                                                                {/* <FormControlLabel
                                                                    control={
                                                                        <Checkbox value="checkedB" color="#00ABAF" />
                                                                    }
                                                                    label="Online"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox value="checkedB" color="#00ABAF"
                                                                        />
                                                                    }
                                                                    label="Home address mailbox"
                                                                /> */}
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <h4>{Medicine} {inquiry}</h4>
                                                            <Grid><label>{Medicine} / {Substance}</label></Grid>
                                                            <Grid>
                                                                <Select
                                                                    value={this.state.selectedSub}
                                                                    onChange={(e) => this.eventnameSetP('medication', e)}
                                                                    options={specialistOptions}
                                                                    placeholder={select}
                                                                    isSearchable={false}
                                                                    isMulti={false}
                                                                />
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>{Dose}</label></Grid>
                                                            <Grid className="doseMg"><input type="text" name="dose" value={this.state.AddPrescription.dose} onChange={this.AddState} />
                                                                <span>{mg}</span>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>{trade_name}</label></Grid>
                                                            <Grid><input type="text" name="trade_name" value={this.state.AddPrescription.trade_name} onChange={this.AddState} /></Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>{atc_if_applicable}</label></Grid>
                                                            <Grid><input type="text" name="atc_code" value={this.state.AddPrescription.atc_code} onChange={this.AddState} /></Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>{manufacturer}</label></Grid>
                                                            <Grid><input type="text" name="manufacturer" value={this.state.AddPrescription.manufacturer} onChange={this.AddState} /></Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>{pack_size}</label></Grid>
                                                            <Grid><input type="text" name="pack_size" value={this.state.AddPrescription.pack_size} onChange={this.AddState} /></Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>{Annotations} / {details} / {questions}</label></Grid>
                                                            <Grid><textarea name="annotations" value={this.state.AddPrescription.annotations} onChange={this.AddState}></textarea></Grid>
                                                        </Grid>

                                                    </Grid>

                                                    <Grid className="infoShwHidBrdr2"></Grid>
                                                    <Grid className="infoShwHidIner2">
                                                        {/* <Grid className="infoShwHidMain2">
                                                            <Grid container direction="row" justify="center" alignItems="center">
                                                                <Grid item xs={6} md={6}>
                                                                    <Grid className="infoShwHid2">
                                                                        <a>Show or Hide <img src={require('../../../assets/images/Info.svg')} alt="" title="" /></a>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={6} md={6} className="editShwHid2">
                                                                    <a>Edit</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid> */}
                                                        <Grid className="infoShwSave2">
                                                            <input type="submit" onClick={this.SubmitPrescription} value="Save entry" />
                                                        </Grid>
                                                    </Grid>


                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of Model setup */}

                                        <Grid className="presPkgIner1">
                                            {/* Tabs  */}
                                            <AppBar position="static" className="presTabsUpr">
                                                <Grid container direction="row">
                                                    <Grid item xs={8} md={8}>
                                                        <Tabs value={value} onChange={this.handleChangeTabs} className="presTabs">
                                                            <Tab label="Prescriptions" className="presTabsIner" />
                                                            <Tab label="Sick Certificates" className="presTabsIner" />
                                                        </Tabs>
                                                    </Grid>
                                                    <Grid item xs={4} md={4} className="presSrch">
                                                        <a><img src={require('../../../assets/images/search-entries.svg')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </AppBar>
                                        </Grid>

                                        <Grid className="presPkgIner2">

                                            {value === 0 && <TabContainer>
                                                {this.state.successfullsent && <div className="success_message">Request sent Sucessfully</div>}
                                                <PrecriptionList newItem={this.state.newItemp} />
                                            </TabContainer>}

                                            {value === 1 && <TabContainer>
                                                {this.state.successfullsent1 && <div className="success_message">Request sent Sucessfully</div>}
                                                <SickList newItem={this.state.newItems} />
                                            </TabContainer>}
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