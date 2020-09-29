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
import Notification from "../../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import sitedata from '../../../../sitedata';
import axios from 'axios';

const createOption = (label) => ({
    label,
    value: label,
});

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
            diagnosisdata: [],
            mediacationdata: [],
            allergydata: [],
            family_doc: [],
            donar: {},
            contact_partner: {},
            loaderImage: false,
            openInvt: false,
            openPharma: false,
            inputValue: '',
            value: [],
            UpDataDetails:[],
            invitation:{}
        };
        new Timer(this.logOutClick.bind(this))
    }

    //For loggedout if logged in user is deleted 
    componentDidMount() {
        new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        this.props.Settings(this.props.stateLoginValueAim.token);
        this.getUserData();
    }

    getUserData() {
        this.setState({ loaderImage: true, UpDataDetails: [] });
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
            
            this.setState({ UpDataDetails: response.data.data, city: response.data.data.city, area: response.data.data.area, profile_id : response.data.data.profile_id});
            
           
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    sentmail = () => {
        const {invitation} = this.state
        console.log("invitation", invitation)
            this.setState({ loaderImage: true, nv: false });
            let user_token = this.props.stateLoginValueAim.token
            // axios.post(sitedata.data.path + '/UserProfile/AskPatient1/' + this.state.invitation.emails, {
            //     email: this.state.invitation.emails,
            //     message: this.state.invitation.messages,
            //     first_name: this.state.UpDataDetails.first_name ? this.state.UpDataDetails.first_name : '',
            //     last_name: this.state.UpDataDetails.last_name ? this.state.UpDataDetails.last_name : '',
            //     lan: this.props.stateLanguageType
            // }, {
            //     headers: {
            //         'token': user_token,
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     }
            // }).then((response) => {
            //     this.setState({ loaderImage: false });
            //     this.setState({ sentmessages: true });
            //     setTimeout(
            //         function () {
            //             this.setState({ sentmessages: false });
            //         }
            //             .bind(this),
            //         3000
            //     );
            // })
        
    }

    validateEmail = (elementValue) => {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }

    handleOpenInvt = () => {
        this.setState({ openInvt: true });
    };
    handleCloseInvt = () => {
        this.setState({ openInvt: false });
    };

    handleChange = (value, actionMeta) => {
        var state = this.state.invitation;
        if(value){value.map(data=>{
            if(state['emails'])state['emails'].push(data.value)
            else state['emails'] = [data.value]
        })}
        else{
            state['emails'] = []
        }
        console.log("value", value)
        // if(state['emails']){state['emails'] = value}
        
        this.setState({ value, invitation: state });
    };

    invitationState = (e) => {
        var state = this.state.invitation;
        state[e.target.name] = e.target.value;
        this.setState({ invitation: state });
    }

    handleInputChange = (inputValue) => {
        this.setState({ inputValue });
    };

    handleKeyDown = (event) => {
        const { inputValue, value, invitation } = this.state;
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                if (this.validateEmail(inputValue)) {
                    var state = this.state.invitation;
                    if(state['emails']){state['emails'] = [...state['emails'], ...[inputValue]]}
                    else {state['emails'] = [inputValue]};
                    
                    this.setState({
                        invitation: state,
                        nv: false,
                        inputValue: '',
                        value: [...value,  createOption(inputValue)],
                    });
                }
                else {
                    this.setState({ nv: true })
                }
                event.preventDefault();
        }
    };

    handleOpenPharma = () => {
        this.setState({ openPharma: true });
    };
    handleClosePharma = () => {
        this.setState({ openPharma: false });
    };


    //For logout the User
    logOutClick = () => {
        let email = "";
        let password = "";
        this.props.LoginReducerAim(email, password);
        let languageType = 'en';
        this.props.LanguageFetchReducer(languageType);
    }

    //For Patient
    Service = () => {
        this.props.history.push('/doctor/patient');
    }
    //For My Document
    MyDocument = () => {
        this.props.history.push('/doctor/mydocument');
    }

    //For My Profile
    Myprofile = () => {
        this.props.history.push('/doctor/profile')
    }

    //For Appointmet
    Appointment = () => {
        this.props.history.push('/doctor/appointment')
    }

    render() {
        const { inputValue, value } = this.state;
        const { selectedOption } = this.state
        return (
            <Grid item xs={12} md={1} className="MenuLeftUpr ">
                {!this.props.isNotShow && <Notification />}
                <Grid className="webLogo">
                    <a href="/"><img src={require('../../../../assets/images/logo_new.png')} alt="" title="" /></a>
                </Grid>
                <Grid className="menuItems">
                    <ul>
                        <li className={this.props.currentPage === 'jounral' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'jounral' ? <img src={require('../../../../assets/images/nav-journal.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-journal.svg')} alt="" title="" />}
                                <span>Journal</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'chat' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'chat' ? <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-chat.svg')} alt="" title="" />}
                                <span>Chat & <br /> Videocalls</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'patient' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'patient' ? <img src={require('../../../../assets/images/patientinfo.png')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/patientinfo.png')} alt="" title="" />}
                                <span>Patients</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'appointment' ? "menuActv" : ""}>
                            <a onClick={this.Appointment}>
                                {this.props.currentPage === 'appointment' ? <img src={require('../../../../assets/images/nav-appointments.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-appointments.svg')} alt="" title="" />}
                                <span>Appointments</span>
                            </a>
                        </li><li className={this.props.currentPage === 'mydocument' ? "menuActv" : ""}>
                            <a onClick={this.MyDocument}>
                                {this.props.currentPage === 'mydocument' ? <img src={require('../../../../assets/images/nav-my-documents-inquiries.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-my-documents-inquiries.svg')} alt="" title="" />}
                                <span>My Documents</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'tracker' ? "menuActv" : ""}>
                            <a onClick={this.Service}>
                                {this.props.currentPage === 'tracker' ? <img src={require('../../../../assets/images/nav-trackers.svg')} alt="" title="" />
                                    : <img src={require('../../../../assets/images/nav-trackers.svg')} alt="" title="" />}
                                <span>Trackers & <br /> Self Data</span>
                            </a>
                        </li>
                        <li>
                            <a className="moreMenu">
                                <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                <span>More</span>
                                <div className="moreMenuList">
                                    <ul>
                                        <li><a onClick={this.handleOpenInvt}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Invite Doctors</a></li>
                                        <li><a onClick={this.handleOpenPharma}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Pharmacy Prescription</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="profilMenu" className={this.props.currentPage === 'profile' ? "menuActv" : ""} onClick={this.Myprofile}>
                                <img src={require('../../../../assets/images/nav-my-profile.svg')} alt="" title="" />
                                <span>My Profile</span>
                                <div className="profilMenuList">
                                    <ul>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Dark Mode</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Log out</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li>
                    </ul>
                </Grid>
                {/* Model setup */}
                <Modal
                    open={this.state.openInvt}
                    onClose={this.handleCloseInvt}>
                    <Grid className="invtBoxCntnt">
                        <Grid className="invtCourse">
                            <Grid className="invtCloseBtn">
                                <a onClick={this.handleCloseInvt}>
                                    <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                </a>
                            </Grid>
                            <Grid><label>Invite Doctors to Aimedis</label></Grid>
                            <p>You can enter multiple email addresses and add a personal message</p>
                        </Grid>
                        <Grid className="invitLinkUpr">
                            <Grid className="invitLinkInfo">
                                <Grid><label>Who would you like to invite?</label></Grid>
                                <Grid>
                                    <CreatableSelect
                                        inputValue={inputValue}
                                        isClearable
                                        isMulti
                                        menuIsOpen={false}
                                        onChange={this.handleChange}
                                        onInputChange={this.handleInputChange}
                                        onKeyDown={this.handleKeyDown}
                                        placeholder="Enter Emails..."
                                        value={value}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="invitLinkArea">
                                <Grid><label>Who would you like to invite?</label></Grid>
                                <Grid><textarea
                                    name="messages"
                                    onChange={this.invitationState}
                                ></textarea></Grid>
                            </Grid>
                            <Grid className="invitLinkSub">
                                <input type="submit" value="Send invites" onClick={this.sentmail}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                {/* End of Model setup */}
                {/* Pharmacy Prescription */}
                <Modal
                    open={this.state.openPharma}
                    onClose={this.handleClosePharma}>
                    <Grid className="phrmBoxCntnt">
                        <Grid className="phrmCourse">
                            <Grid className="phrmCloseBtn">
                                <a onClick={this.handleClosePharma}>
                                    <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                </a>
                            </Grid>
                            <Grid><label>Pharmacy Prescription</label></Grid>
                            <p>Send prescriptions to pharmacies</p>
                        </Grid>
                        <Grid className="phrmLinkUpr">
                            <Grid className="upScanForms upScanImg">
                                <Grid><label>Upload scanned prescriptions</label></Grid>
                                <Grid className="upScanInput">
                                    <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                    <a>Browse <input type="file" /></a> or drag here
                                                                        </Grid>
                                <p>Supported file types: .jpg, .png, .pdf</p>
                            </Grid>
                            <Grid className="scanInputs">
                                <Grid><label>Patient ID</label></Grid>
                                <Grid><input type="text" /></Grid>
                            </Grid>
                            <Grid className="scanInputs">
                                <Grid><label>Pharmacy</label></Grid>
                                <Grid className="scanInputPhrm">
                                    <input type="text" placeholder="Search Pharmacy by name or ID" />
                                    <img src={require('../../../../assets/images/srchInputField.svg')} alt="" title="" />
                                </Grid>
                            </Grid>
                            <Grid className="scanInputs">
                                <Grid><label>Show Pharmacies within my radius of</label></Grid>
                                <Grid className="scanInputKm">
                                    <input type="text" /><span>km</span>
                                </Grid>
                            </Grid>
                            <Grid className="scanInputs shrtMsgOpt">
                                <Grid><label>Short message (optional)</label></Grid>
                                <Grid><textarea></textarea></Grid>
                            </Grid>
                            <Grid className="jurnlTatent">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="checkedB"
                                            color="#00ABAF"
                                        />
                                    }
                                    label="Add this to Patient Journal"
                                />
                            </Grid>
                            <Grid className="scanInputsSub">
                                <input type="submit" value="Send invites" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                {/* End of Pharmacy Prescription */}

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