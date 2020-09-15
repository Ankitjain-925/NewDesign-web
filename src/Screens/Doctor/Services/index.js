import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
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
import LeftMenu from './../../Components/Menus/DoctorLeftMenu/index';
import { LanguageFetchReducer } from './../../actions';
import Loader from './../../Components/Loader/index';
import { Redirect, Route } from 'react-router-dom';
import moment from 'moment';
import translate from './../../Components/Translator/index.js';
var letter = /([a-zA-Z])+([ -~])*/, number = /\d+/, specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
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
            AskPatient: ''
        };
    }

    componentDidMount() {
        this.getMypatientsData();
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

                this.setState({ currentList: response.data.data });
            }
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }


    //Sent mail for asking personal doctor to patient
    sentmail = () => {
        const AskPatient = this.state.AskPatient;
        if (!AskPatient || AskPatient === '') {
            this.setState({ errorSentMsg: 'Please enter the email or id of the patient' })
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
                    console.log('dataProfile', responce.data.data)
                    var user_id = responce.data.data.profile_id;
                    console.log('user_id', user_id)
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
                                        setTimeout(
                                            function () {
                                                this.setState({ sentmessages: false });
                                            }
                                                .bind(this),
                                            3000
                                        );
                                    }
                                    else {
                                        this.setState({ ne: true });
                                    }
                                })
                            }
                            else {
                                this.setState({ loaderImage: false, error_message_1: responce.data.message })
                            }
                        })
                }
                else {
                    this.setState({ loaderImage: false, error_message_1: responce.data.message })
                }

            })
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
        this.setState({ openReq: true });
    };
    handleCloseReq = () => {
        this.setState({ openReq: false });
    };

    handleOpenNewPatient = () => {
        this.setState({ openNew: true });
    };
    handleCloseNewPatient = () => {
        this.setState({ openNew: false });
    };
    //For chnage the page
    onChangePage = (pageNumber) => {
        this.setState({ currentList: this.state.AllPres.slice((pageNumber - 1) * 10, pageNumber * 10), currentPage: pageNumber })
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
    //Delete Patient
    deleteClickPatient = () => {
        const { profileDetail } = this.state;
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        axios.delete(sitedata.data.path + '/UserProfile/Users/' + profileDetail.patient_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                axios.delete('https://api-us.cometchat.io/v2.0/users/' + profileDetail.profile_id.toLowerCase(),
                    {
                        headers: {
                            'appId': '15733dce3a73034',
                            'apiKey': '44c13a774f7cf0a9809d0792dae638a9f74a6702',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })

            }).catch((error) => { });
    }

    handleChange = (e) => {
        const state = this.state.userDetails
        if (e.target.name === 'terms_and_conditions' || e.target.name === 'license_of_practice', e.target.name === 'is2fa') {
            state[e.target.name] = e.target.checked;
        }
        else {
            state[e.target.name] = e.target.value;
        }
        this.setState({ userDetails: state });
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

    removePatient = () => {
        this.handleCloseShowPatient();
        confirmAlert({
            title: "Remove Patient",
            message: "Are you sure to remove the Patient",
            buttons: [{
                label: 'YES',
                onClick: () => { this.deleteClickPatient() }
            }, {
                label: 'NO',
            }]
        })
    }




    render() {
        const { specialistOption } = this.state;
        const { value, profileDetail } = this.state;
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'doctor') {
            return (<Redirect to={'/'} />);
        }
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
                                    <Grid className="docOpinion">
                                        <Grid container direction="row" className="docAddUpr">
                                            <Grid item xs={12} md={6} className="docOpinLbl"><label>Patients</label></Grid>
                                            <Grid item xs={12} md={6} className="docAddPatient"><a onClick={this.handleOpenNewPatient}>+ Add new patient</a></Grid>
                                        </Grid>
                                        <Grid className="findpatient">
                                            <input type="text" placeholder="Find a patient…" />
                                            <Grid className="findpatientReq">
                                                <a onClick={this.handleOpenData}>Patient Data Access</a>
                                                <a onClick={this.handleOpenReq}>Private Doctor Request</a>
                                            </Grid>
                                        </Grid>
                                        <Grid className="docOpinionIner">
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Patient</Th>
                                                        <Th>Age</Th>
                                                        <Th>Gender</Th>
                                                        <Th>Mobile number</Th>
                                                        <Th>Patient ID</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>

                                                    {this.state.currentList && this.state.currentList.length > 0 && this.state.currentList.map((data, index) => (
                                                        <Tr>
                                                            <Td className="docphrImg">
                                                                <img src={data.new_image} alt="" title="" />
                                                                {data.first_name ? data.first_name + " " + data.last_name : 'Not  mentioned'}
                                                            </Td>
                                                            <Td>{data.birthday ? this.getAge(data.birthday) : 'Not mentioned'}</Td>
                                                            <Td style={{ textTransform: 'capitalize' }}>{data.sex ? data.sex : 'Not mentioned'}</Td>
                                                            <Td>{data.mobile ? data.mobile : 'Not mentioned'}</Td>
                                                            <Td>{data.alies_id ? data.alies_id : 'Not mentioned'}</Td>
                                                            <Td className="presEditDot scndOptionIner">
                                                                <a onClick={(e) => this.handleshowPatient(data)}>
                                                                    <img src={require('../../../assets/images/threedots.jpg')} alt="" title="" className="openScnd" />
                                                                </a>
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                            {/*Start of Patient detail Modal*/}
                                            <Modal
                                                open={this.state.showPatient}
                                                onClose={this.handleCloseShowPatient}
                                            >
                                                <Grid className="infoBoxCntnt">
                                                    <Grid className="infoCourse">
                                                        <Grid className="shPatientProfile">
                                                            <Grid className="infoCloseBtn">
                                                                <a onClick={this.handleCloseShowPatient}>
                                                                    <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                                </a>
                                                            </Grid>
                                                            <Grid className="userDetail">
                                                                <Grid className="userDetailLft"><img src={profileDetail.new_image} /></Grid>
                                                                <Grid className="userDetailRght">
                                                                    <Grid><label>{profileDetail.first_name + ' ' + profileDetail.last_name}</label></Grid>
                                                                    <Grid><span>{profileDetail.sex}</span></Grid>
                                                                    <Grid>
                                                                        <p>{`${moment(profileDetail.birthday).format('DD/MM/YYYY')}`}
                                                                            <a>{`(${this.getAge(profileDetail.birthday)} years)`}</a>
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
                                                                <p>{profileDetail.phone}</p>
                                                            </Grid>
                                                            <Grid className="userAdres">
                                                                <Grid><img src={require('../../../assets/images/email11.svg')} alt="" title="" /></Grid>
                                                                <p>{profileDetail.email}</p>
                                                            </Grid>
                                                            <Grid className="userAdres">
                                                                <Grid><img src={require('../../../assets/images/language11.svg')} alt="" title="" /></Grid>
                                                                <p>{profileDetail.language}</p>
                                                            </Grid>
                                                            <Grid className="insureMe">
                                                                <Grid><label>Insurance</label></Grid>
                                                                <Grid container direction="row">
                                                                    <Grid item xs={5} md={5}>
                                                                        <p>{profileDetail.insurance && profileDetail.insurance.length ? profileDetail.insurance[0].insurance : ''}</p>
                                                                    </Grid>
                                                                    <Grid item xs={7} md={7}>
                                                                        <p>{profileDetail.insurance && profileDetail.insurance.length ? profileDetail.insurance[0].insurance_number : ''}</p>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="openJournal">
                                                                <Grid container direction="row" justifyContent="center" alignItems="center">
                                                                    <Grid item xs={9} md={9}>
                                                                        <input type="submit" value="Open Journal" />
                                                                    </Grid>
                                                                    <Grid item xs={3} md={3}>
                                                                        <Grid className="openJourMenu">
                                                                            <a><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" />
                                                                                <ul>
                                                                                    <li><a><img src={require('../../../assets/images/journal1.svg')} alt="" title="" />Open Journal</a></li>
                                                                                    <li><a><img src={require('../../../assets/images/personal-info.svg')} alt="" title="" />Personal info</a></li>
                                                                                    <li><a onClick={this.removePatient}><img src={require('../../../assets/images/del.png')} alt="" title="" />Remove patient</a></li>
                                                                                </ul>
                                                                            </a>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Modal>
                                            {/* End of Model setup */}
                                            {/* Model Patient Data Access */}
                                            <Modal
                                                open={this.state.openData}
                                                onClose={this.handleCloseData}
                                            >
                                                <Grid className="dataBoxCntnt">
                                                    <Grid className="dataCourse">
                                                        <Grid className="dataCloseBtn">
                                                            <a onClick={this.handleCloseData}>
                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <Grid><label>Patient Data Access</label></Grid>
                                                        <p>Healthdata access for non-connected patient</p>
                                                    </Grid>
                                                    <Grid className="dataBoxUpr">
                                                        <Grid className="dataBoxInput">
                                                            <Grid>
                                                                <Grid><label>Patient ID</label></Grid>
                                                                <Grid><input type="text" /></Grid>
                                                            </Grid>
                                                            <Grid>
                                                                <Grid><label>PIN</label></Grid>
                                                                <Grid><input type="text" /></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="dataBoxSub">
                                                            <input type="submit" value="View Data" />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Modal>
                                            {/* End of Model Patient Data Access */}

                                            {/* Model Private Doctor Request */}
                                            <Modal
                                                open={this.state.openReq}
                                                onClose={this.handleCloseReq}>
                                                <Grid className="dataBoxCntnt">
                                                    <Grid className="dataCourse">
                                                        <Grid className="dataCloseBtn">
                                                            <a onClick={this.handleCloseReq}>
                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <Grid><label>Private Doctor Request</label></Grid>
                                                        <p>Ask patient to become a private doctor</p>
                                                    </Grid>
                                                    <Grid className="dataBoxUpr">
                                                        <Grid className="dataBoxInput entrpatId">
                                                            {this.state.errorSentMsg && this.state.errorSentMsg != '' && <div className="err_message">{this.state.errorSentMsg}</div>}
                                                            <Grid>
                                                                <Grid><label>Email or ID</label></Grid>
                                                                <Grid><input type="text" placeholder="Enter patients email or ID" onChange={(event) => this.setState({ AskPatient: event.target.value })} /></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="dataBoxSub">
                                                            <input type="submit" value="Ask" onClick={this.sentmail} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Modal>
                                            {/* End of Private Doctor Request */}
                                            {/* Modal for New Patient Enter */}
                                            <Modal
                                                open={this.state.openNew}
                                                onClose={this.handleCloseNewPatient}
                                            >
                                                <Grid className="dataBoxCntnt">
                                                    <Grid className="dataCourse">
                                                        <Grid className="dataCloseBtn">
                                                            <a onClick={this.handleCloseNewPatient}>
                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <Grid><label>New Patient</label></Grid>
                                                        <p>Add new patient in your list</p>
                                                    </Grid>
                                                    
                                                        <Grid className="registerForm">
                                                                <Grid className="registerRow">
                                                                    <Grid><label>First Name</label></Grid>
                                                                    <Grid><input type="text" name="first_name" onChange={this.handleChange} /></Grid>
                                                                </Grid>

                                                                <Grid className="registerRow">
                                                                    <Grid><label>Last Name</label></Grid>
                                                                    <Grid><input type="text" name="last_name" onChange={this.handleChange} /></Grid>
                                                                </Grid>

                                                                <Grid className="registerRow">
                                                                    <Grid><label>{translate('Register_email', this.state.stateLanguageType)}</label></Grid>
                                                                    <Grid><input type="text" name="email" onChange={this.handleChange} /></Grid>
                                                                </Grid>

                                                                <Grid className="registerRow passInstMain">
                                                                    <Grid><label>{translate('Register_Password', this.state.stateLanguageType)}</label></Grid>
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
                                                                    {this.state.userDetails && this.state.userDetails.password ?
                                                                        <div className="passInst">
                                                                            <div className="passInstIner">
                                                                                <p>{translate('Register_Passwordshould', this.state.stateLanguageType)}</p>
                                                                                <img src={require('../../../assets/images/passArrow.png')} alt="" title="" className="passArow" />
                                                                                <ul>
                                                                                    <li>{this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.length > 8 && <a><img src={require('../../../assets/images/CheckCircle.svg')} alt="" title="" />{translate('Register_characters', this.state.stateLanguageType)}</a>}
                                                                                        {this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.length <= 8 && <a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{translate('Register_characters', this.state.stateLanguageType)}</a>}
                                                                                    </li>
                                                                                    <li>{this.state.userDetails && this.state.userDetails.password && !this.state.userDetails.password.match(letter) && <a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{translate('Register_letter', this.state.stateLanguageType)}</a>}
                                                                                        {this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.match(letter) && <a><img src={require('../../../assets/images/CheckCircle.svg')} alt="" title="" />{translate('Register_letter', this.state.stateLanguageType)}</a>}
                                                                                    </li>
                                                                                    <li>{this.state.userDetails && this.state.userDetails.password && !this.state.userDetails.password.match(number) && <a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{translate('Register_number', this.state.stateLanguageType)}</a>}
                                                                                        {this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.match(number) && <a><img src={require('../../../assets/images/CheckCircle.svg')} alt="" title="" />{translate('Register_number', this.state.stateLanguageType)}</a>}
                                                                                    </li>
                                                                                    <li>
                                                                                        {this.state.userDetails && this.state.userDetails.password && !this.state.userDetails.password.match(specialchar) && <a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />{translate('Register_special', this.state.stateLanguageType)}</a>}
                                                                                        {this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.match(specialchar) && <a><img src={require('../../../assets/images/CheckCircle.svg')} alt="" title="" />{translate('Register_special', this.state.stateLanguageType)}</a>}
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        : <div className="passInst">
                                                                            <div className="passInstIner">
                                                                                <p>Password should contain at least:</p>
                                                                                <img src={require('../../../assets/images/passArrow.png')} alt="" title="" className="passArow" />
                                                                                <ul>
                                                                                    <li><a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />8 characters</a></li>
                                                                                    <li><a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />1 letter</a></li>
                                                                                    <li><a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />1 number</a></li>
                                                                                    <li><a><img src={require('../../../assets/images/CloseCircle.svg')} alt="" title="" />1 special character</a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>}
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
                                                            {this.state.currentPage != 1 && <a className="prevpag" onClick={() => { this.onChangePage(this.state.currentPage - 1) }}>Previous</a>}
                                                            {this.state.pages && this.state.pages.length > 0 && this.state.pages.map((item, index) => (
                                                                <a className={this.state.currentPage == item && "activePageDocutmet"} onClick={() => { this.onChangePage(item) }}>{item}</a>
                                                            ))}
                                                            {this.state.currentPage != this.state.totalPage && <a className="nxtpag" onClick={() => { this.onChangePage(this.state.currentPage + 1) }}>Next</a>}
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
    console.log("stateLoginValueAim", stateLoginValueAim)
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