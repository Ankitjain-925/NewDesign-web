import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import sitedata from "sitedata";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import {
  getLanguage
} from "translations/index"
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import LogOut from "Screens/Components/LogOut/index";
import Timer from "Screens/Components/TimeLogOut/index";
import Mode from "Screens/Components/ThemeMode/index.js";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
import { update_CometUser } from "Screens/Components/CommonApi/index";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

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
      openFancyLanguage: false,
      mode: "normal",
    };
    new Timer(this.logOutClick.bind(this));
  }

  //For loggedout if logged in user is deleted
  componentDidMount() {
    this.getSetting();
    new LogOut(
      this.props.stateLoginValueAim.token,
      this.props.stateLoginValueAim.user._id,
      this.logOutClick.bind(this)
    );
  }

  getSetting = () => {
    this.setState({ loaderImage: true });
    axios
      .get(sitedata.data.path + "/UserProfile/updateSetting", {
        headers: {
          token: this.props.stateLoginValueAim.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
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
  // Change Language function
  changeLanguage = (e) => {
    this.setState({ languageValue: e.target.value });
  };

  openLanguageModel = () => {
    this.setState({ openFancyLanguage: true });
  };

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
  //For Profile Course
  ProfileLink = () => {
    this.props.history.push("/paramedic/profile");
  };
  //For online Course
  OnlineCourse = () => {
    this.props.history.push("/paramedic/online-course");
  };
  //For Emergency page
  Emergency = () => {
    this.props.history.push("/paramedic");
  };
  //For Chat page
  Chats = () => {
    this.props.history.push("/paramedic/chats");
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
                <span>Aimedis {online_course}</span>
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
                        {" "}
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
                        {" "}
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
                        {" "}
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
                          mode={this.state.mode}
                          name="mode"
                          getSetting={this.getSetting}
                        />
                      </a>
                    </li>
                    <li onClick={this.logOutClick}>
                      <a>
                        {" "}
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
