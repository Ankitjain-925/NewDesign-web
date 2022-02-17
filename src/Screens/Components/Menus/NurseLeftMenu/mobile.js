import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import LogOut from "Screens/Components/LogOut/index";
import Timer from "Screens/Components/TimeLogOut/index";
import { slide as Menu } from "react-burger-menu";
import Mode from "Screens/Components/ThemeMode/index.js";
import sitedata from "sitedata";
import axios from "axios";
import PharamacyModal from "Screens/Doctor/PharamacyInfo/index.js";
import DoctorInviteModal from "Screens/Doctor/DoctorInvite/index.js";
import { getLanguage } from "translations/index"
import { update_CometUser } from "Screens/Components/CommonApi/index";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
import { commonHeader } from "component/CommonHeader/index"
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import { getSetting } from "../api";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagnosisdata: [],
      mediacationdata: [],
      allergydata: [],
      family_doc: [],
      donar: {},
      contact_partner: {},
      loaderImage: false,
      mode: "normal",
    };
    new Timer(this.logOutClick.bind(this));
  }

  //For loggedout if logged in user is deleted
  componentDidMount() {
    new LogOut(
      this.props.stateLoginValueAim.token,
      this.props.stateLoginValueAim.user._id,
      this.logOutClick.bind(this)
    );
   getSetting(this)
  }

  //For change Institutes
  MoveInstitute = () => {
    this.props.houseSelect({ value: null });
    this.props.history.push('/nurse/institutes')
  };
  
   //For change Institutes
   NormalView = () => {
    this.props.houseSelect({ value: null });
    this.props.history.push('/nurse/journal')
  };

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

  handleOpenInvt = () => {
    this.setState({ openInvt: true });
  };
  handleCloseInvt = () => {
    this.setState({ openInvt: false });
  };

  handleOpenPharma = () => {
    this.setState({ openPharma: true });
  };
  handleClosePharma = () => {
    this.setState({ openPharma: false });
  };

  //For close the model
  openLanguageModel = () => {
    this.setState({ openFancyLanguage: true });
  };

  //For open Model
  handleCloseFancyLanguage = () => {
    this.setState({ openFancyLanguage: false });
  };

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
  };

  //For Patient
  Service = () => {
    this.props.history.push("/doctor/patient");
  };
  //For My Document
  MyDocument = () => {
    this.props.history.push("/doctor/inquiries");
  };

  //For My Profile
  Myprofile = () => {
    this.props.history.push("/doctor/profile");
  };
  //For Chat
  Chats = () => {
    this.props.history.push("/doctor/chats");
  };

  //For Emergency
  Emergency = () => {
    this.props.history.push("/doctor/emergency");
  };

  //For Online Course
  Online = () => {
    this.props.history.push("/doctor/online-course");
  };

  //For Appointmet
  Appointment = () => {
    this.props.history.push("/doctor/appointment");
  };

    //For Task
    handlePTask = () => {
      this.props.history.push("/doctor/professional-task");
    }

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      chat_vdocall,
      emegancy_access,
      my_profile,
      online_course,
      profile_setting,
      Language,
      DarkMode,
      logout,
      patient_access_data,
      ProfessionalTask,
      Nurse_view,
      VHS_view
    } = translate;
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "MenuMob MenuLeftDrkUpr"
            : "MenuMob"
        }
      >
        {/* <Notification /> */}
        <Grid container direction="row" alignItems="center">
          <Grid item xs={6} md={6} sm={6} className="MenuMobLeft">
            <a>
              <img
                src={require("assets//images/navigation-drawer.svg")}
                alt=""
                title=""
                className="MenuImg"
              />
            </a>
            <Menu className="addCstmMenu">
              <Grid className="menuItems">
              <ul>
          {this.props?.House?.value &&
              <>
                <li
                  className={
                    this.props.currentPage === "task" ? "menuActv" : ""
                  }
                >
                  <a onClick={this.handlePTask}>
                    {this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode &&
                      this.props.settings.setting.mode === "dark" ?
                      (<img
                        src={require("assets/virtual_images/rightIcon2.png")}
                        alt=""
                        title=""
                      />) : (
                        <img
                          src={this.props.currentPage === "task" ? require("assets/virtual_images/rightIcon2.png") : require("assets/virtual_images/rightpng.png")}
                          alt=""
                          title=""
                        />
                      )}
                    <span>{ProfessionalTask}</span>
                  </a>
                </li>
                <li
              className={
                this.props.currentPage === "institute" ? "menuActv" : ""
              }
            >
              <a onClick={this.NormalView}>
                {this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === "dark" ?
                  (<img
                    src={require("assets/virtual_images/hospitalIcon2.png")}
                    alt=""
                    title=""
                  />) : (
                    <img
                      src={this.props.currentPage === "institute" ? require("assets/virtual_images/hospitalIcon2.png") : require("assets/virtual_images/hospitalIcon.png")}
                      alt=""
                      title=""
                    />
                  )}
                <span>{Nurse_view}</span>
              </a>
            </li>
              </>}
          {!this.props?.House?.value && <>
            <li className={this.props.currentPage === "chat" ? "menuActv" : ""}>
              <a onClick={this.Chats}>
                {this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/nav-chat-white.svg")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/nav-chat.svg")}
                    alt=""
                    title=""
                  />
                )}

                <span>{chat_vdocall}</span>
              </a>
            </li>
            <li
              className={this.props.currentPage === "journal" ? "menuActv" : ""}
            >
              <a onClick={this.Journal}>
                {this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/nav-journal-white.svg")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/nav-journal.svg")}
                    alt=""
                    title=""
                  />
                )}

                <span>{patient_access_data}</span>
              </a>
            </li>
            <li
              className={
                this.props.currentPage === "emergency" ? "menuActv" : ""
              }
            >
              <a onClick={this.Emergency}>
                {this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/ermerAccess-white.svg")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/ermerAccess.svg")}
                    alt=""
                    title=""
                  />
                )}

                <span>{emegancy_access}</span>
              </a>
            </li>
            <li
              className={this.props.currentPage === "course" ? "menuActv" : ""}
            >
              <a onClick={this.OnlineCourse}>
                {this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/onlineCourses-white.svg")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/onlineCourses.svg")}
                    alt=""
                    title=""
                  />
                )}
                <span>AIS {online_course}</span>
              </a>
            </li>
            <li
              className={
                this.props.currentPage === "institute" ? "menuActv" : ""
              }
            >
              <a onClick={this.MoveInstitute}>
                {this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === "dark" ?
                  (<img
                    src={require("assets/virtual_images/hospitalIcon2.png")}
                    alt=""
                    title=""
                  />) : (
                    <img
                      src={this.props.currentPage === "institute" ? require("assets/virtual_images/hospitalIcon2.png") : require("assets/virtual_images/hospitalIcon.png")}
                      alt=""
                      title=""
                    />
                  )}
                <span>{VHS_view}</span>
              </a>
            </li>
            </>}
            <li
              className={this.props.currentPage === "profile" ? "menuActv" : ""}
            >
              <a className="profilMenu">
                <img
                  src={require("assets/images/nav-my-profile.svg")}
                  alt=""
                  title=""
                />

                <span>{my_profile}</span>
                <div className="profilMenuList">
                  <ul>
                    <li>
                      <a onClick={this.ProfileLink}>
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
                        {profile_setting}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.openLanguageModel();
                        }}
                      >
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
                        {Language}
                      </a>
                    </li>
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
                        {DarkMode}
                        <Mode
                           mode={this.props.settings?.setting?.mode ? this.props.settings?.setting?.mode : 'normal'}
                          name="mode"
                          getSetting={()=>getSetting(this)}
                        />
                      </a>
                    </li>
                    <li onClick={this.logOutClick}>
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
                        {logout}
                      </a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
          </ul>
              </Grid>
            </Menu>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className="MenuMobRght">
            <a>
              <img
                src={require("assets//images/LogoPNG.png")}
                alt=""
                title=""
              />
            </a>
          </Grid>
        </Grid>
        {/* Model setup */}
        <DoctorInviteModal
          openInvt={this.state.openInvt}
          handleOpenInvt={this.handleOpenInvt}
          handleCloseInvt={this.handleCloseInvt}
        />
        {/* End of Model setup */}
        {/* Pharmacy Prescription */}
        {this.state.openPharma && (
          <PharamacyModal
            openPharma={this.state.openPharma}
            handleOpenPharma={this.handleOpenPharma}
            handleClosePharma={this.handleClosePharma}
          />
        )}
        {/* End of Pharmacy Prescription */}
        {/* For set the language  */}
        <SetLanguage
          getSetting={()=>getSetting(this)}
          openFancyLanguage={this.state.openFancyLanguage}
          languageValue={this.state.languageValue}
          handleCloseFancyLanguage={this.handleCloseFancyLanguage}
          getSetting={()=>getSetting(this)}
          openLanguageModel={this.openLanguageModel}
        />
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { House } = state.houseSelect;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    House,
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, houseSelect })(
    Index
  )
);

