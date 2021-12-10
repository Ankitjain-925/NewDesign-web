import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import Timer from "Screens/Components/TimeLogOut/index";
import { slide as Menu } from "react-burger-menu";
import Mode from "Screens/Components/ThemeMode/index.js";
import LogOut from "Screens/Components/LogOut/index";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
import { update_CometUser } from "Screens/Components/CommonApi/index";
import { getLanguage } from "translations/index"
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

  //For My Profile link
  ProfileLink = () => {
    this.props.history.push("/nurse/profile");
  };

  //For online Course
  OnlineCourse = () => {
    this.props.history.push("/nurse/online-course");
  };
  //For Timeline / Journal
  Journal = () => {
    this.props.history.push("/nurse/journal");
  };
  //For chat
  Chats = () => {
    this.props.history.push("/nurse");
  };

  //For Emergency
  Emergency = () => {
    this.props.history.push("/nurse/emergency");
  };

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
                src={require("assets/images/navigation-drawer.svg")}
                alt=""
                title=""
                className="MenuImg"
              />
            </a>
            <Menu className="addCstmMenu">
              <Grid className="menuItems">
                <ul>
                  <li
                    className={
                      this.props.currentPage === "chat" ? "menuActv" : ""
                    }
                  >
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
                    className={
                      this.props.currentPage === "journal" ? "menuActv" : ""
                    }
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
                    className={
                      this.props.currentPage === "course" ? "menuActv" : ""
                    }
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
                  <li
                    className={
                      this.props.currentPage === "profile" ? "menuActv" : ""
                    }
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
        <SetLanguage
          getSetting={()=>getSetting(this)}
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
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);
