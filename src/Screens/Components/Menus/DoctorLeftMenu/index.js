import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import LogOut from "Screens/Components/LogOut/index";
import Timer from "Screens/Components/TimeLogOut/index";
// import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

// import Modal from "@material-ui/core/Modal";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import sitedata from "sitedata";
import axios from "axios";
import Mode from "Screens/Components/ThemeMode/index.js";
import PharamacyModal from "Screens/Doctor/PharamacyInfo/index.js";
import DoctorInviteModal from "Screens/Doctor/DoctorInvite/index.js";
import {
  getLanguage
} from "translations/index"
import { update_CometUser } from "Screens/Components/CommonApi/index";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
import { commonHeader } from "component/CommonHeader/index";

class Index extends Component {
  constructor(props) {
    super(props);
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

      UpDataDetails: [],
      invitation: {},
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
    this.getSetting();
    this.getUserData();
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

  getUserData() {
    this.setState({ loaderImage: true, UpDataDetails: [] });
    let user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    axios
      .get(sitedata.data.path + "/UserProfile/Users/" + user_id,  commonHeader(user_token))
      .then((response) => {
        this.setState({ loaderImage: false });

        this.setState({
          UpDataDetails: response.data.data,
          city: response.data.data.city,
          area: response.data.data.area,
          profile_id: response.data.data.profile_id,
        });
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
  }

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

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      appointments,
      chat_vdocall,
      capab_Patients,
      Inquiries,
      emegancy_access,
      more,
      my_profile,
      invite_doc,
      pharma_prescription,
      online_course,
      profile_setting,
      Language,
      DarkMode,
      logout,
    } = translate;
    const { inputValue, value } = this.state;
    const { selectedOption } = this.state;
    return (
      <Grid
        item
        xs={12}
        md={1}
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "MenuLeftUpr MenuLeftDrkUpr"
            : "MenuLeftUpr"
        }
      >
        {/* <Notification /> */}
        <Grid className="webLogo">
          <a>
            <img
              src={require("assets/images/LogoPNG.png")}
              alt=""
              title=""
            />
          </a>
        </Grid>
        <Grid className="menuItems">
          <ul>
            <li
              className={
                this.props.currentPage === "appointment" ? "menuActv" : ""
              }
            >
              <a onClick={this.Appointment}>
                {this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/nav-appointments-white.svg")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/nav-appointments.svg")}
                    alt=""
                    title=""
                  />
                )}
                <span>{appointments}</span>
              </a>
            </li>
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
              className={this.props.currentPage === "patient" ? "menuActv" : ""}
            >
              <a onClick={this.Service}>
                {this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/nav-patients-active.svg")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/patientinfo.png")}
                    alt=""
                    title=""
                  />
                )}
                <span>{capab_Patients}</span>
              </a>
            </li>
            <li
              className={
                this.props.currentPage === "inquiries" ? "menuActv" : ""
              }
            >
              <a onClick={this.MyDocument}>
                {this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/nav-my-documents-inquiries-active.svg")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/nav-my-documents-inquiries.svg")}
                    alt=""
                    title=""
                  />
                )}
                <span>{Inquiries}</span>
              </a>
            </li>
            <li
              className={this.props.currentPage === "tracker" ? "menuActv" : ""}
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
            <li>
              <a className="moreMenu">
                {this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/nav-more-white.svg")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/nav-more.svg")}
                    alt=""
                    title=""
                  />
                )}
                <span>{more}</span>
                <div className="moreMenuList">
                  <ul>
                    <li>
                      <a onClick={this.handleOpenInvt}>
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
                        {invite_doc}
                      </a>
                    </li>
                    <li>
                      <a onClick={this.handleOpenPharma}>
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
                        {pharma_prescription}
                      </a>
                    </li>
                    <li className="doctor-menu">
                      <a onClick={this.Online}>
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
                        Aimedis {online_course}
                      </a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
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
                      <a onClick={this.Myprofile}>
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
                        {DarkMode}{" "}
                        <Mode
                           mode={this.props.settings?.setting?.mode ? this.props.settings?.setting?.mode : 'normal'}
                          name="mode"
                          getSetting={this.getSetting}
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
          getSetting={this.getSetting}
          openFancyLanguage={this.state.openFancyLanguage}
          languageValue={this.state.languageValue}
          handleCloseFancyLanguage={this.handleCloseFancyLanguage}
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
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);
