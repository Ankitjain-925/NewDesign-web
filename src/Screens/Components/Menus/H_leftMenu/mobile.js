import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { LoginReducerAim } from '../../../Login/actions';
import { Settings } from '../../../Login/setting';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from '../../../actions';
import { slide as Menu } from "react-burger-menu";
import LogOut from './../../LogOut/index';
import Timer from './../../TimeLogOut/index';
import Loader from './../../../Components/Loader/index';
import Notification from "../../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import Modal from '@material-ui/core/Modal';
import axios from "axios"
import sitedata from "../../../../sitedata"
import * as translationEN from '../../../hospital_Admin/translations/en_json_proofread_13072020.json';
import * as translationDE from "../../../hospital_Admin/translations/de.json"
import CreateAdminUser from "../../CreateHospitalUser/index"

class Index extends Component {
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
            openFancyLanguage: false,
            addCreate: false
        };
        new Timer(this.logOutClick.bind(this))
        this.openLanguageModel = this.openLanguageModel.bind(this)
        this.handleCloseFancyLanguage = this.handleCloseFancyLanguage.bind(this)
    }

    //For loggedout if logged in user is deleted 
    componentDidMount() {
        if (this.props.stateLoginValueAim.token) {
            new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
            this.props.Settings(this.props.stateLoginValueAim.token);
        } else {
            this.props.history.push("/")
        }

    }

    getSetting = () => {
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/UserProfile/updateSetting',
            {
                headers: {
                    'token': this.props.stateLoginValueAim.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                if (responce.data.hassuccessed && responce.data.data) {
                    this.setState({ timeF: { label: responce.data.data.time_format, value: responce.data.data.time_format }, dateF: { label: responce.data.data.date_format, value: responce.data.data.date_format }, })
                }
                this.setState({ loaderImage: false, languageValue: responce.data.data && responce.data.data.language != null ? responce.data.data.language : "en" })
            })
    }

    openLanguageModel() {
        this.setState({ openFancyLanguage: true })
    }

    handleCloseFancyLanguage() {
        this.setState({ openFancyLanguage: false, PassDone: false })
    }

    handleOpenCreate = () => {
        this.setState({ addCreate: true })
    }
    handleCloseCreate = () => {
        this.setState({ addCreate: false })
    }

    // Change Language function
    changeLanguage = (e) => {
        this.setState({ languageValue: e.target.value })
    }
    //For set the language
    SetLanguage = () => {
        this.setState({ loaderImage: true })
        if (!this.state.languageValue) {
            this.setState({ loaderImage: false, languageBlank: true })
        } else {
            this.setState({ languageBlank: false })
            axios.put(sitedata.data.path + '/UserProfile/updateSetting', {
                language: this.state.languageValue,
                user_id: this.props.stateLoginValueAim.user._id,
                user_profile_id: this.props.stateLoginValueAim.user.profile_id
            }, {
                headers: {
                    'token': this.props.stateLoginValueAim.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                this.setState({ PassDone: true, loaderImage: false })
                this.props.Settings(this.props.stateLoginValueAim.token);
                setTimeout(() => { this.setState({ PassDone: false, openFancyLanguage: false }) }, 5000)
            })
        }
    }


    //For logout the User
    logOutClick = () => {
        let email = "";
        let password = "";
        this.props.LoginReducerAim(email, password);
        let languageType = 'en';
        this.props.LanguageFetchReducer(languageType);
        this.props.history.push('/')
    }

    //For My Profile link
    ProfileLink = () => {
        this.props.history.push('/patient');
    }
    //For Emergency Access link
    EmergencyLink = () => {
        this.props.history.push('/patient/emergency');
    }
    //For Second opinion link
    SecondLink = () => {
        this.props.history.push('/patient/second-opinion');
    }
    //For Extra service link
    ExtraLink = () => {
        this.props.history.push('/patient/extra-services');
    }
    // For ournal Archive Link
    JournalArchiveLink = () => {
        this.props.history.push('/patient/archiveJournal');
    }
    //For Document link
    DocumentLink = () => {
        this.props.history.push('/patient/documents');
    }
    //For online Course
    OnlineCourse = () => {
        this.props.history.push('/patient/online-course');
    }
    //For Tracker / Withings
    Tracker = () => {
        this.props.history.push('/patient/tracker');
    }
    // For Appointment Link
    AppointmentLink = () => {
        this.props.history.push('/patient/appointment');
    }
    //For Timeline / Journal
    Journal = () => {
        this.props.history.push('/patient/journal');
    }
    //For chat
    Chats = () => {
        this.props.history.push('/patient/chats');
    }
    //For block chain Access 
    BlockChain = () => {
        this.props.history.push('/patient/blockchain');
    }
    render() {
        let translate={};
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            default :
                translate = translationEN.text
        }
        let { capab_Patients, capab_Doctors, archive, SelectLanguage, More, Savechanges, LanUpdated, LanSel, capab_Hospitals, documents, paramedic, srvc_Nurses, insurance, online_course, add_new, user, my_profile, dark_mode, profile_setting, Language, logout, Patient, find_patient, ID, Status, no_, recEmp_FirstName,
            previous, next, Normal, Blocked, recEmp_LastName, imprint_Email, restore, Delete, see_detail } = translate

        return (
            <Grid className="MenuMob">
                <Grid container direction="row" alignItems="center">
                    {this.state.loaderImage && <Loader />}
                    <Grid item xs={6} md={6} sm={6} className="MenuMobLeft">
                        <a><img src={require('../../../../assets/images/navigation-drawer.svg')} alt="" title="" className="MenuImg" /></a>
                        <Menu className="addCstmMenu">
                            <Grid className="menuItems adminmenuItems">
                                <ul>
                                    <li className={this.props.currentPage === 'patient_List' ? "menuActv" : ""}>
                                        <a onClick={() => this.props.history.push("/h-patients")}>
                                            <img src={require('../../../../assets/images/admin/patintIcon.png')} alt="" title="" />
                                            <span>{capab_Patients}</span>
                                        </a>
                                    </li>
                                    <li className={this.props.currentPage === 'doctor_List' ? "menuActv" : ""}>
                                        <a onClick={() => this.props.history.push("/h-doctors")} >
                                            <img src={require('../../../../assets/images/admin/DoctorsIcon.png')} alt="" title="" />
                                            <span>{capab_Doctors}</span>
                                        </a>
                                    </li>
                                    <li className={this.props.currentPage === 'nurse_List' ? "menuActv" : ""}>
                                        <a onClick={() => this.props.history.push("/h-nurses")}>
                                            <img src={require('../../../../assets/images/therapist_green.svg')} alt="" title="" />
                                            <span>{srvc_Nurses}</span>
                                        </a>
                                    </li>
                                    <li className={this.props.currentPage === "h_document" ? "menuActv" : ''}>
                                        <a onClick={() => this.props.history.push("/h-documents")}>
                                            <img src={require('../../../../assets/images/admin/docsIcon.png')} alt="" title="" />
                                            <span>{documents}</span>
                                        </a>
                                    </li>
                                    <li className={this.props.currentPage === 'archive_choose' ? "menuActv" : ""}>
                                        <a onClick={() => this.props.history.push("/h-archivechoose")}>
                                            <img src={require('../../../../assets/images/admin/ParamedicIcon.png')} alt="" title="" />
                                            <span>{archive}</span>
                                        </a>
                                    </li>
                                    {/* <li>
                            <a className="moreMenu">
                                <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                <span>More</span>
                                <div className="moreMenuList">
                                    <ul>
                                        <li><a onClick={() => this.props.history.push("/nurses")}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{srvc_Nurses}</a></li>
                                        <li><a onClick={() => this.props.history.push("/insurances")}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{insurance}</a></li>
                                        <li><a onClick={() => this.props.history.push("/pharmacies")}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{pharmacy}</a></li>
                                        <li><a onClick={() => this.props.history.push("/onlinecourses")}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Aimedis {online_course}</a></li>
                                        <li><a onClick={() => this.props.history.push("/topics")}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{course_topic}</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Journal Archive</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Blockchain Access Log</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li> */}
                                    <li className={this.props.currentPage === 'createnewuser' ? "menuActv" : ""}>
                                        <a className="addNewPlus" onClick={this.handleOpenCreate}>
                                            <img src={require('../../../../assets/images/admin/plusnew.png')} alt="" title="" />
                                            <span>{add_new} <br /> {user}</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a className="profilMenu">
                                            <img src={require('../../../../assets/images/nav-my-profile.svg')} alt="" title="" />
                                            <span>{my_profile}</span>
                                            <div className="profilMenuList">
                                                <ul>
                                                    <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{profile_setting}</a></li>
                                                    <li><a onClick={this.openLanguageModel}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{Language}</a></li>
                                                    <li><a onClick={this.logOutClick}><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />{logout}</a></li>
                                                </ul>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </Grid>
                        </Menu>
                    </Grid>
                    <Grid item xs={6} md={6} sm={6} className="MenuMobRght">
                        <a href="/"><img src={require('../../../../assets/images/logo_new.png')} alt="" title="" /></a>
                    </Grid>
                </Grid>
                <Modal
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    open={this.state.openFancyLanguage}
                    onClose={this.handleCloseFancyLanguage}>
                    <Grid className="LanguageBoxMain">
                        <Grid className="nwPresCourse">
                            <Grid className="nwPresCloseBtn nwEntrCloseBtnAdd">
                                <a onClick={this.handleCloseFancyLanguage}>
                                    <img src={require('../../../../assets/images/close-search.svg')} alt="" title="" />
                                </a>
                            </Grid>
                            <Grid><label>{SelectLanguage}</label></Grid>
                        </Grid>
                        {this.state.PassDone && <div className="success_message">{LanUpdated}</div>}
        {this.state.languageBlank && <div className="err_message">{LanSel}</div>}
                        <div className="languageHead"></div>
                        <Grid className="languageBox SetLanguage">
                            <Grid className="row">
                                <Grid className="col-sm-6 col-xl-6">
                                    <Grid>
                                        <input value="en" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "en" ? "checked" : ""} />
                                        <label><img src={require('../../../../assets/images/english.png')} alt="English" title="English" />English (English)</label>
                                    </Grid>
                                </Grid>
                                <Grid className="col-sm-6 col-xl-6">
                                    <Grid>
                                        <input value="de" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "de" ? "checked" : ""} />
                                        <label><img src={require('../../../../assets/images/german.jpg')} alt="Germany" title="Germany" />German (Deutsch)</label>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="infoShwHidBrdr2"></Grid>
                        <Grid className="infoShwHidIner2">
                            <Grid className="infoShwSave2">
                                <input type="submit" value={Savechanges} onClick={this.SetLanguage} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                <CreateAdminUser addCreate={this.state.addCreate} handleCloseCreate={this.handleCloseCreate} openBy="left_menu" />
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    // const { settings } = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        // settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));