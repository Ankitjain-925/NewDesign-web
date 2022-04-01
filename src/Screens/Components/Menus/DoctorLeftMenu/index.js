import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import LogOut from "Screens/Components/LogOut/index";
import Timer from "Screens/Components/TimeLogOut/index";
import Mode from "Screens/Components/ThemeMode/index.js";
import PharamacyModal from "Screens/Doctor/PharamacyInfo/index.js";
import DoctorInviteModal from "Screens/Doctor/DoctorInvite/index.js";
import { getLanguage } from "translations/index"
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import { update_CometUser } from "Screens/Components/CommonApi/index";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
import { getSetting } from "../api";
import sitedata from "sitedata";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import { commonHeader } from "component/CommonHeader/index"
import Loader from "Screens/Components/Loader/index";
import io from "socket.io-client";

var socket;
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
      CheckCurrent: {},
      UpDataDetails: [],
      invitation: {},
      mode: "normal",
    };
    new Timer(this.logOutClick.bind(this));
    socket = io("http://localhost:5000");

  }
  //For loggedout if logged in user is deleted
  componentDidMount() {
    socket.on('connection', () => {
    })
    new LogOut(
      this.props.stateLoginValueAim.token,
      this.props.stateLoginValueAim.user._id,
      this.logOutClick.bind(this)
      
    );
    getSetting(this)
    this.getavailableUpdate();
  }

  //For logout the User
  logOutClick = async () => {
    var data = await update_CometUser(this.props?.stateLoginValueAim?.user?.profile_id.toLowerCase(), { lastActiveAt: Date.now() })
    if (data) {
      let email = "";
      let password = "";
      this.props.LoginReducerAim(email, password);
      this.props.houseSelect({ value: null });
      let languageType = "en";
      this.props.LanguageFetchReducer(languageType);
      this.setState({ CheckCurrent: { current_available: false } })
      this.availableUpdate();
    }
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

  //For change Institutes
  MoveInstitute = () => {
    this.props.houseSelect({ value: null });
    this.props.history.push('/doctor/institutes')
  };

  //For change Institutes
  NormalView = () => {
    this.props.houseSelect({ value: null });
    this.props.history.push('/doctor/patient')
  };

  handleChange = (e) => {
    const state = this.state.CheckCurrent;
    state[e.target.name] = e.target.value == "true" ? true : false;
    this.setState({ CheckCurrent: state });
    this.availableUpdate();
  }

  availableUpdate = () => {
    this.setState({ loaderImage: true })
    var data = this.state.CheckCurrent
    const user_token = this.props.stateLoginValueAim.token;
    axios.put(sitedata.data.path + '/UserProfile/Users/update', {
      data
    }, commonHeader(user_token))
      .then((responce) => {
        this.getavailableUpdate();
        this.setState({ loaderImage: false })
      }).catch((error) => {
        this.setState({ loaderImage: false })
      });
  }


  getavailableUpdate = () => {
    this.setState({ loaderImage: true })
    const user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    axios.get(sitedata.data.path + "/UserProfile/Users/" + user_id,
      commonHeader(user_token))
      .then((responce) => {
        socket.emit("update",responce)
        let value = responce?.data?.data?.data?.current_available
        this.setState({ CheckCurrent: { current_available: value }, loaderImage: false })
      }).catch((error) => {
        this.setState({ loaderImage: false })
      });
  }

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
      ProfessionalTask,
      Doctor_view,
      VHS_view
    } = translate;
    const { inputValue, value, CheckCurrent } = this.state;
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
        {this.state.loaderImage && <Loader />}
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

        <Grid className="menuCheckBox">
          <Checkbox
            name="current_available"
            value={this.state.CheckCurrent && this.state.CheckCurrent.current_available && this.state.CheckCurrent.current_available == true ? false : true}
            checked={this.state.CheckCurrent.current_available == true ? true : false}
            onChange={(e) =>
              this.handleChange(e)
            }
          />
          {this.state.CheckCurrent.current_available == true ? (
            <p>Currently available</p>
          ) : <p>Not available</p>}
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
                    <span>{Doctor_view}</span>
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
                          AIS {online_course}
                        </a>
                      </li>
                    </ul>
                  </div>
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
                          getSetting={() => getSetting(this)}
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
          getSetting={() => getSetting(this)}
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
  const { House } = state.houseSelect;
  const { stateLanguageType } = state.LanguageReducer;
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
