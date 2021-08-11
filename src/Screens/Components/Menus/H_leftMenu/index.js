import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import Modal from '@material-ui/core/Modal';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from 'Screens/actions';
import LogOut from 'Screens/Components/LogOut/index';
import Timer from 'Screens/Components/TimeLogOut/index';
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import sitedata from 'sitedata';
import axios from "axios"
import Mode from "Screens/Components/ThemeMode/index.js";
import Loader from 'Screens/Components/Loader/index';
import { update_CometUser } from "Screens/Components/CommonApi/index";
import * as translationEN from '../../../hospital_Admin/translations/en_json_proofread_13072020.json';
import * as translationDE from "../../../hospital_Admin/translations/de.json"
import CreateAdminUser from "Screens/Components/CreateHospitalUser/index";
import { commonHeader } from "component/CommonHeader/index"
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
            PassDone: false,
            addCreate: false,
            mode: "normal",
        };
        new Timer(this.logOutClick.bind(this))

    }

    //For loggedout if logged in user is deleted 
    componentDidMount() {
        this.getSetting()
        // new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        // this.props.Settings(this.props.stateLoginValueAim.token);
    }

    getSetting = () => {
        this.setState({ loaderImage: true });
        axios
          .get(sitedata.data.path + "/UserProfile/updateSetting",  commonHeader(this.props.stateLoginValueAim.token))
          .then((responce) => {
            if (responce.data.hassuccessed && responce.data.data) {
              this.setState({
                timeF: {
                  label: responce.data.data.time_format,
                  value: responce.data.data.time_format,
                },
                dateF: {
                  label: responce.data.data.date_format,
                  value: responce.data.data.date_format,
                },
              });
              this.props.Settings(responce.data.data);
            } else {
              this.props.Settings({
                user_id: this.props.stateLoginValueAim.user._id,
              });
            }
            this.setState(
              {
                loaderImage: false,
                languageValue:
                  responce.data.data && responce.data.data.language
                    ? responce.data.data.language
                    : "en",
                mode:
                  responce.data.data && responce.data.data.mode
                    ? responce.data.data.mode
                    : "normal",
              },
              () => {
                this.props.LanguageFetchReducer(this.state.languageValue);
              }
            );
          });
      };

    openLanguageModel = () => {
        this.setState({ openFancyLanguage: true })
    }

    handleCloseFancyLanguage = () => {
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
                user_profile_id:  this.props.stateLoginValueAim.user.profile_id
            },  commonHeader(this.props.stateLoginValueAim.token)).then((responce) => {
                this.setState({ PassDone: true,  loaderImage: false })
                this.props.Settings(this.props.stateLoginValueAim.token);
                this.getSetting();
                setTimeout(() => { this.setState({ PassDone: false, openFancyLanguage: false }) }, 5000)
            })
        }
    }

  //For logout the User
  logOutClick = async () => {
    var data = await update_CometUser(this.props?.stateLoginValueAim?.user?.profile_id.toLowerCase() , {lastActiveAt : Date.now()})
    if(data){
      let email = "";
      let password = "";
      this.props.LoginReducerAim(email, password);
      let languageType = "en";
      this.props.LanguageFetchReducer(languageType);
    } 
    localStorage.removeItem("token")
    this.props.history.push('/')
  };

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
        let { capab_Patients, more, capab_Doctors, LanUpdated, LanSel, capab_Hospitals, SelectLanguage, documents, admin_panel, my_profile, paramedic, srvc_Nurses, insurance, pharmacy, online_course, add_new, user, dark_mode, profile_setting, Language, logout, Patient, find_patient, ID, Status, no_, recEmp_FirstName,
            DarkMode, previous, next, Normal, Blocked, recEmp_LastName, Savechanges, archive, restore, Delete, see_detail, course_topic } = translate

        if (!this.props.stateLoginValueAim.token || this.props.stateLoginValueAim.token == 450) {
            this.props.history.push('/')
        }
        return (
            <Grid item xs={12} md={1} 
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark"
                ? " MenuLeftUpr adminMenuLeftUpr darkTheme"
                : " MenuLeftUpr adminMenuLeftUpr"
            }
            >
                {this.state.loaderImage && <Loader />}
                <Grid className="webLogo adminwebLogo">
                    <a href="/"><img src={require('assets/images/logo_new.png')} alt="" title="" /></a>
                    <Grid><label>{admin_panel}</label></Grid>
                </Grid>
                <Grid className="menuItems adminmenuItems">
                <ul>
                        <li className={this.props.currentPage === 'patient_List' ? "menuActv" : ""}>
                            <a onClick={() => this.props.history.push("/h-patients")}>
                                <img src={require('assets/images/admin/patintIcon.png')} alt="" title="" />
                                <span>{capab_Patients}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'doctor_List' ? "menuActv" : ""}>
                            <a onClick={() => this.props.history.push("/h-doctors")} >
                                <img src={require('assets/images/admin/DoctorsIcon.png')} alt="" title="" />
                                <span>{capab_Doctors}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'nurse_List' ? "menuActv" : ""}>
                            <a onClick={() => this.props.history.push("/h-nurses")}>
                                <img src={require('assets/images/nurse_n1.png')} alt="" title="" />
                                <span>{srvc_Nurses}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'staff_List' ? "menuActv" : ""}>
                            <a onClick={() => this.props.history.push("/h-staff")}>
                                <img src={require('assets/images/patientinfo.png')} alt="" title="" />
                                <span>{"Admin Staff"}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === "h_document" ? "menuActv" : ''}>
                            <a onClick={() => this.props.history.push("/h-documents")}>
                                <img src={require('assets/images/admin/docsIcon.png')} alt="" title="" />
                                <span>{documents}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === 'archive_choose' ? "menuActv" : ""}>
                            <a onClick={() => this.props.history.push("/h-archivechoose")}>
                                <img src={require('assets/images/admin/ParamedicIcon.png')} alt="" title="" />
                                <span>{archive}</span>
                            </a>
                        </li>
                        <li className={this.props.currentPage === "more" ? "menuActv" : ""}>
              <a className="moreMenu">
                {/* {this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/nav-more-white.svg")}
                    alt=""
                    title=""
                  />
                ) : ( */}
                  <img
                    src={require("assets/images/nav-more.svg")}
                    alt=""
                    title=""
                  />
                {/* )} */}
                <span>{more}</span>

                <div className="moreMenuList">
                  <ul>
                    <li>
                      <a onClick={() => this.props.history.push("/h-groups")}>
                        {/* {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark" ? (
                          <img
                            src={require("assets/images/menudocs-white.jpg")}
                            alt=""
                            title=""
                          />
                        ) : ( */}
                          <img
                            src={require("assets/images/menudocs.jpg")}
                            alt=""
                            title=""
                          />
                        {/* )} */}
                        Institute Groups
                      </a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
                        {/* <li>
                            <a className="moreMenu">
                                <img src={require('assets/images/nav-more.svg')} alt="" title="" />
                                <span>More</span>
                                <div className="moreMenuList">
                                    <ul>
                                        <li><a onClick={() => this.props.history.push("/nurses")}><img src={require('assets/images/menudocs.jpg')} alt="" title="" />{srvc_Nurses}</a></li>
                                        <li><a onClick={() => this.props.history.push("/insurances")}><img src={require('assets/images/menudocs.jpg')} alt="" title="" />{insurance}</a></li>
                                        <li><a onClick={() => this.props.history.push("/pharmacies")}><img src={require('assets/images/menudocs.jpg')} alt="" title="" />{pharmacy}</a></li>
                                        <li><a onClick={() => this.props.history.push("/onlinecourses")}><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Aimedis {online_course}</a></li>
                                        <li><a onClick={() => this.props.history.push("/topics")}><img src={require('assets/images/menudocs.jpg')} alt="" title="" />{course_topic}</a></li>
                                        <li><a><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Journal Archive</a></li>
                                        <li><a><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Blockchain Access Log</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li> */}
                        <li className={this.props.currentPage === 'createnewuser' ? "menuActv" : ""}>
                            <a className="addNewPlus" onClick={this.handleOpenCreate}>
                                <img src={require('assets/images/admin/plusnew.png')} alt="" title="" />
                                <span>{add_new} <br /> {user}</span>
                            </a>
                        </li>

                        <li>
                            <a className="profilMenu">
                                <img src={require('assets/images/nav-my-profile.svg')} alt="" title="" />
                                <span>{my_profile}</span>
                                <div className="profilMenuList">
                                    <ul>
                                        <li><a onClick={()=>this.props.history.push("/h-profile")}><img src={require('assets/images/menudocs.jpg')} alt="" title="" />{profile_setting}</a></li>
                                        <li><a onClick={this.openLanguageModel}><img src={require('assets/images/menudocs.jpg')} alt="" title="" />{Language}</a></li>
                                        <li>
                      <a>
                        {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark" ? (
                          <img
                            src={require("assets/images/menudocs-white.jpg")}
                            alt=""
                            title=""
                          />
                        ) : (
                          <img
                            src={require("assets/images/menudocs.jpg")}
                            alt=""
                            title=""
                          />
                        )}
                        {DarkMode}{" "}
                        <Mode
                          mode={this.state.mode}
                          name="mode"
                          getSetting={this.getSetting}
                        />
                      </a>
                    </li>
                                        <li><a onClick={this.logOutClick}><img src={require('assets/images/menudocs.jpg')} alt="" title="" />{logout}</a></li>
                                    </ul>
                                </div>
                            </a>
                        </li>
                    </ul>
                    
                </Grid>
                <Modal
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    open={this.state.openFancyLanguage}
                    onClose={this.handleCloseFancyLanguage}>
                    <Grid className="LanguageBoxMain">
                        <Grid className="nwPresCourse">
                            <Grid className="nwPresCloseBtn nwEntrCloseBtnAdd">
                                <a onClick={this.handleCloseFancyLanguage}>
                                    <img src={require('assets/images/close-search.svg')} alt="" title="" />
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
                                        <label><img src={require('assets/images/english.png')} alt="English" title="English" />English (English)</label>
                                    </Grid>
                                </Grid>
                                <Grid className="col-sm-6 col-xl-6">
                                    <Grid>
                                        <input value="de" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "de" ? "checked" : ""} />
                                        <label><img src={require('assets/images/german.jpg')} alt="Germany" title="Germany" />German (Deutsch)</label>
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
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim ? state.LoginReducerAim : {};
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const {Doctorsetget} = state.Doctorset;
    // const {catfil} = state.filterate;
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