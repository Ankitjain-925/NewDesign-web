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
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import { LanguageFetchReducer } from './../../actions';
import Loader from './../../Components/Loader/index';
import { Redirect, Route } from 'react-router-dom';
import SickList from './Components/sickcertificate';
import PrecriptionList from './Components/prescription';

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
            selectedSdoc : {},
            selectedPdoc : {}
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
        //console.log(`Option selected:`, specialistOption);
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
        axios.get(sitedata.data.path + '/rightinfo/patient',
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
    Submitcertificate= ()=> {
        var data = this.state.AddSickCertificate;
        if (data.doctor_id) {
            var user_token = this.props.stateLoginValueAim.token;
            data.patient_id = this.props.stateLoginValueAim.user._id;
            data.patient_email = this.props.stateLoginValueAim.user.email;
            data.first_name = this.state.personalinfo.info.first_name;
            data.last_name = this.state.personalinfo.info.last_name;
            data.email = this.props.stateLoginValueAim.user.email;
            data.birthday = this.state.personalinfo.info.birthday;
            data.profile_image = this.state.personalinfo.info.image;
            data.patient_profile_id = this.props.stateLoginValueAim.user.profile_id;
            data.patient_info = {
                patient_id: this.props.stateLoginValueAim.user.profile_id,
                first_name: this.state.personalinfo.info.first_name,
                last_name: this.state.personalinfo.info.last_name,
                email: this.props.stateLoginValueAim.user.email,
                birthday: this.state.personalinfo.info.birthday,
                profile_image: this.state.personalinfo.info.image,
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
                this.setState({ docProfile: false, AddSickCertificate: {}, loaderImage: false, successfullsent1: true })
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
            data.first_name = this.state.personalinfo.info.first_name;
            data.last_name = this.state.personalinfo.info.last_name;
            data.birthday = this.state.personalinfo.info.birthday;
            data.profile_image = this.state.personalinfo.info.image;
            data.patient_id = this.props.stateLoginValueAim.user._id;
            data.patient_profile_id = this.props.stateLoginValueAim.user.profile_id;
            data.patient_email = this.props.stateLoginValueAim.user.email;
            data.patient_info = {
                patient_id: this.props.stateLoginValueAim.user.profile_id,
                first_name: this.state.personalinfo.info.first_name,
                last_name: this.state.personalinfo.info.last_name,
                email: this.props.stateLoginValueAim.user.email,
                birthday: this.state.personalinfo.info.birthday,
                profile_image: this.state.personalinfo.info.image,
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
            axios.post(sitedata.data.path + '/UserProfile/Prescription', data) .then((response) => {
                this.setState({ docProfile: false, AddPrescription: {}, loaderImage: false, successfullsent: true })
            })
            setTimeout(() => { this.setState({ successfullsent: false }); }, 5000);
        }
        else {
            this.setState({ error: true });
            setTimeout(() => { this.setState({ error: false }) }, 5000);
        }
    }

    AddDoctor = (e, name) => {
        const state = this.state.AddPrescription;
        state[name] = e.value;
        this.setState({ AddPrescription: state, selectedPdoc : e }, () => {
            if (this.state.AddPrescription.doctor_id) {
                let doctor_id = this.state.AddPrescription.doctor_id
                axios.get(sitedata.data.path + '/UserProfile/DoctorProfile/' + doctor_id, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    this.setState({ docProfile: response.data.data })
                })
            }
        })
    }
    //Add Sick Cerificate Doctor
    AddDocotor = (e, name) => {
        console.log('HereDoc', e)
        const state = this.state.AddSickCertificate;
        state[name] = e.value;
        this.setState({ AddSickCertificate: state, selectedSdoc : e }, () => {
            if (this.state.AddSickCertificate.doctor_id) {
                console.log('this.state.AddSickCertificate.doctor_id11', this.state.AddSickCertificate.doctor_id)
                let doctor_id = this.state.AddSickCertificate.doctor_id
                axios.get(sitedata.data.path + '/UserProfile/DoctorProfile/' + doctor_id, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    this.setState({ docProfile1: response.data.data })
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
    eventnameSet = (name, value) =>{
        const state = this.state.AddSickCertificate;
        state[name] = value;
        this.setState({ AddSickCertificate: state })
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
            if(response.data.data && response.data.data.length>0)
            {
                var data = [];
                response.data.data.map((item)=>{
                    var name = `${item.first_name && item.first_name} ${item.last_name && item.last_name}`;
                    data.push({value : item._id, label : name});
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
            if(response.data.data && response.data.data.length>0)
            {
                var data = [];
                response.data.data.map((item)=>{
                    var name = `${item.first_name && item.first_name} ${item.last_name && item.last_name}`;
                    data.push({value : item._id, label : name});
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
        return (
            <Grid className="homeBg">
                {this.state.loaderImage && <Loader />}
                {console.log("this.state.AddSickCertificate", this.state.AddSickCertificate)}
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
                                            <Grid item xs={12} md={6}><label>My Documents</label></Grid>
                                            <Grid item xs={12} md={6} className="docsOpinRght">
                                                {value == 0 && <a onClick={this.handleaddInqry}>+ New Prescription Inquiry</a>}
                                                {value == 1 && <a onClick={this.handleaddSick}>+ New Sick Certificate</a>}
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
                                                        <p>New inquiry</p>
                                                        <Grid><label>Sick Certificate</label></Grid>
                                                    </Grid>
                                                    {this.state.successfullsent1 && <div className="success_message">Request sent Sucessfully</div>}
                                                    {this.state.error1 && <div className="err_message">For Sick certificate request Doctor is required</div>}
                                                    <Grid className="docHlthMain">
                                                        <Grid className="docHlth">
                                                            <h2>Share health status</h2>
                                                            <Grid className="docHlthChk">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            value="checkedB"
                                                                            color="#00ABAF"
                                                                            name="share_to_doctor"
                                                                            checked={this.state.share_to_doctor === true && this.state.share_to_doctor} onChange={(e)=>{this.setState({share_to_doctor : e.target.checked})}}
                                                                        />
                                                                    }
                                                                    label="Share journal health status with Doctor"
                                                                />
                                                            </Grid>
                                                            <p>This will share your health status info from your journal, as this is
                                                                    needed for the doctor to be able to approve your prescription request.</p>
                                                            <p>See list of shared information
                                                                    <a className="vsblTime" data-tip data-for="timeIconTip">
                                                                    <img src={require('../../../assets/images/Info.svg')} alt="" title="" />
                                                                </a>
                                                                <ReactTooltip className="cntryLiv" id="timeIconTip" place="right" effect="solid" backgroundColor="#ffffff">
                                                                    <p>- Country you live in</p>
                                                                    <p>- Diseases (Heart, Malignant, Pulmonary, Musculosceletal ...)</p>
                                                                    <p>- Allergies</p>
                                                                    <p>- Health issues (Diabetes, Hypertension ...)</p>
                                                                </ReactTooltip>
                                                            </p>
                                                        </Grid>
                                                        <Grid className="drstndrdQues">
                                                            <h3>Doctor and standard questions</h3>
                                                            <Grid className="drsplestQues">
                                                                <Grid><label>Doctor (Aimedis & Private)</label></Grid>
                                                                <Grid>
                                                                    <Select
                                                                        value={this.state.selectedSdoc}
                                                                        onChange={(e)=>this.AddDocotor(e, 'doctor_id')}
                                                                        options={this.state.Sdoctors}
                                                                        placeholder="Select"
                                                                        isSearchable={false}
                                                                        isMulti={false}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="drsplestQues">
                                                                <Grid><label>How are you feeling?</label></Grid>
                                                                <Grid>
                                                                    <input type="text" name="how_are_you" value={this.state.AddSickCertificate.how_are_you} onChange={this.AddSickState}/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="ishelpUpr">
                                                            <Grid className="ishelpLbl"><label>Is your temperature higher than 38 °C?</label></Grid>
                                                            <Grid className="ishelpChk">
                                                                <FormControlLabel  control={<Radio />} name="fever" value="yes" color="#00ABAF" checked={this.state.AddSickCertificate.fever === 'yes'} onChange={this.AddSickState} label="Yes"  />
                                                                <FormControlLabel control={ <Radio />} name="fever" color="#00ABAF" value="no" checked={this.state.AddSickCertificate.fever === 'no'} onChange={this.AddSickState} label="No"/>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>Which symptoms do you have?</label></Grid>
                                                            <Grid><input type="text" name="which_symptomps" value={this.state.AddSickCertificate.which_symptomps} onChange={this.AddSickState}/></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub sncWhen">
                                                            <Grid><label>Since when?</label></Grid>
                                                            <Grid>
                                                                <a className={this.state.AddSickCertificate.since_when === 'Today' && "current_since_when"} onClick={()=>{this.eventnameSet('since_when', 'Today')}}>Today</a> 
                                                                <a className={this.state.AddSickCertificate.since_when === 'Yesterday' && "current_since_when"} onClick={()=>{this.eventnameSet('since_when', 'Yesterday')}}>Yesterday</a> 
                                                                <a className={this.state.AddSickCertificate.since_when === '2 days ago' && "current_since_when"} onClick={()=>{this.eventnameSet('since_when', '2 days ago')}}>2 days ago</a>
                                                                <a className={this.state.AddSickCertificate.since_when === '3-6 days ago' && "current_since_when"} onClick={()=>{this.eventnameSet('since_when', '3-6 days ago')}}>3-6 days ago</a> 
                                                                <a className={this.state.AddSickCertificate.since_when === 'Week or more' && "current_since_when"} onClick={()=>{this.eventnameSet('since_when', 'Week or more')}}>Week or more</a></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>Have you already been sick at home for the same problem?</label></Grid>
                                                            <Grid><input type="text" name="same_problem_before" value={this.state.AddSickCertificate.same_problem_before} onChange={this.AddSickState}/></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>How long do you think you will be unable to work?</label></Grid>
                                                            <Grid className="doseMg"><input type="text" name="time_unable_work" value={this.state.AddSickCertificate.time_unable_work} onChange={this.AddSickState} />
                                                                <span>days</span>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>Is it a known disease?</label></Grid>
                                                            <Grid><input type="text" name="known_diseases" value={this.state.AddSickCertificate.known_diseases} onChange={this.AddSickState}/></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>Are you taking any medication?</label></Grid>
                                                            <Grid><input type="text" name="medication" value={this.state.AddSickCertificate.medication} onChange={this.AddSickState} /></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>Do you have any allergies?</label></Grid>
                                                            <Grid><input type="text" name="allergies" value={this.state.AddSickCertificate.allergies} onChange={this.AddSickState}/></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>What is your profession?</label></Grid>
                                                            <Grid><input type="text" name="professions" value={this.state.AddSickCertificate.professions} onChange={this.AddSickState}/></Grid>
                                                        </Grid>
                                                        <Grid className="medicnSub">
                                                            <Grid><label>Annotations / details / questions</label></Grid>
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
                                                            <input type="submit"  onClick={this.Submitcertificate} value="Save entry" />
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
                                                        <p>New inquiry</p>
                                                        <Grid><label>Prescription</label></Grid>
                                                    </Grid>
                                                    {this.state.successfullsent && <div className="success_message">Request sent Sucessfully</div>}
                                                    {this.state.error && <div className="err_message">For Precription request Doctor is required</div>}
                                                    <Grid className="docHlthMain">

                                                        <Grid className="docHlth">
                                                            <h2>Share health status</h2>
                                                            <Grid className="docHlthChk">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            value="checkedB"
                                                                            color="#00ABAF"
                                                                        />
                                                                    }
                                                                    label="Share journal health status with Doctor"
                                                                />
                                                            </Grid>
                                                            <p>This will share your health status info from your journal, as this is needed
                                                            for the doctor to be able to approve your prescription request.</p>
                                                            <p>See list of shared information

                                                                <a className="vsblTime" data-tip data-for="timeIconTip">
                                                                    <img src={require('../../../assets/images/Info.svg')} alt="" title="" />
                                                                </a>
                                                                <ReactTooltip className="cntryLiv" id="timeIconTip" place="right" effect="solid" backgroundColor="#ffffff">
                                                                    <p>- Country you live in</p>
                                                                    <p>- Diseases (Heart, Malignant, Pulmonary, Musculosceletal ...)</p>
                                                                    <p>- Allergies</p>
                                                                    <p>- Health issues (Diabetes, Hypertension ...)</p>
                                                                </ReactTooltip>
                                                            </p>
                                                        </Grid>

                                                        <Grid className="drstndrdQues">
                                                            <h3>Doctor and standard questions</h3>
                                                            <Grid className="drsplestQues">
                                                                <Grid><label>Doctor (Aimedis & Private)</label></Grid>
                                                                <Grid>
                                                                    <Select
                                                                        value={specialistOption}
                                                                        onChange={this.handleSpecialist}
                                                                        options={specialistOptions}
                                                                        placeholder="Select"
                                                                        isSearchable={false}
                                                                        isMulti={false}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="ishelpUpr">
                                                            <Grid className="ishelpLbl"><label>Is this a follow-up prescription?</label></Grid>
                                                            <Grid className="ishelpChk">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox value="checkedB" color="#00ABAF" />
                                                                    }
                                                                    label="Yes"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox value="checkedB" color="#00ABAF"
                                                                        />
                                                                    }
                                                                    label="No"
                                                                />
                                                            </Grid>
                                                            <Grid className="ishelpLbl">
                                                                <label>How would you like to receive the prescription?</label>
                                                            </Grid>
                                                            <Grid className="ishelpChk">
                                                                <FormControlLabel
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
                                                                />
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <h4>Medicine inquiry</h4>
                                                            <Grid><label>Medicine / Substance</label></Grid>
                                                            <Grid>
                                                                <Select
                                                                    value={specialistOption}
                                                                    onChange={this.handleSpecialist}
                                                                    options={specialistOptions}
                                                                    placeholder="Select"
                                                                    isSearchable={false}
                                                                    isMulti={false}
                                                                />
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>Dose</label></Grid>
                                                            <Grid className="doseMg"><input type="text" />
                                                                <span>mg</span>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>Trade name</label></Grid>
                                                            <Grid><input type="text" /></Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>ATC code if applicable</label></Grid>
                                                            <Grid><input type="text" /></Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>Manufacturer</label></Grid>
                                                            <Grid><input type="text" /></Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>Pack size</label></Grid>
                                                            <Grid><input type="text" /></Grid>
                                                        </Grid>

                                                        <Grid className="medicnSub">
                                                            <Grid><label>Annotations / details / questions</label></Grid>
                                                            <Grid><textarea></textarea></Grid>
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
                                                            <input type="submit" onClick ={this.SubmitPrescription} value="Save entry" />
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
                                                <PrecriptionList />
                                            </TabContainer>}

                                            {value === 1 && <TabContainer>
                                                <SickList />
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
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Index));