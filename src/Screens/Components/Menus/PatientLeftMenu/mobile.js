import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import { slide as Menu } from "react-burger-menu";
import Timer from "Screens/Components/TimeLogOut/index";
import LogOut from "Screens/Components/LogOut/index";
import Mode from "Screens/Components/ThemeMode/index.js";
import DocSuggetion from "Screens/Components/DocSuggetion/index.js";
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
    getSetting(this);
  }

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
      this.props.Fitbit({
        lifetimeStats: {},
        device: [],
        distance: {},
        steps: {},
        user: {},
        badges: {},
      });
      this.props.Withings([]);
    }
    this.props.history.push("/");
  };

  //For My Profile link
  ProfileLink = () => {
    this.props.history.push("/patient");
  };
  //For Emergency Access link
  EmergencyLink = () => {
    this.props.history.push("/patient/emergency");
  };
  //For Second opinion link
  SecondLink = () => {
    this.props.history.push("/patient/second-opinion");
  };
  //For Extra service link
  ExtraLink = () => {
    this.props.history.push("/patient/extra-services");
  };
  // For ournal Archive Link
  JournalArchiveLink = () => {
    this.props.history.push("/patient/archiveJournal");
  };
  //For Document link
  DocumentLink = () => {
    this.props.history.push("/patient/documents");
  };
  //For online Course
  OnlineCourse = () => {
    this.props.history.push("/patient/online-course");
  };
  //For Tracker / Withings
  Tracker = () => {
    this.props.history.push("/patient/tracker");
  };
  // For Appointment Link
  AppointmentLink = () => {
    this.props.history.push("/patient/appointment");
  };
  //For Timeline / Journal
  Journal = () => {
    this.props.history.push("/patient/journal");
  };
  //For chat
  Chats = () => {
    this.props.history.push("/patient/chats");
  };
  //For block chain Access
  BlockChain = () => {
    this.props.history.push("/patient/blockchain");
  };

   //Forpatient jorney
   pJournry = () => {
    this.props.history.push("/patient/patient-journey");
  };
  
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      appointments,
      chat_vdocall,
      more,
      my_doc,
      my_profile,
      extra_srvc,
      online_course,
      profile_setting,
      Language,
      DarkMode,
      logout,
      journal,
      Patientjourney,
      trackers,
      self_data,
      emrgancy_patient_data,
      blockchain_access_log,
      jrnl_archive,
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
        <DocSuggetion />
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
                      <span>{journal}</span>
                    </a>
                  </li>
                  <li
              className={this.props.currentPage === "patient-journey" ? "menuActv" : ""}
            >
              <a onClick={this.pJournry}>
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
                <span>{ Patientjourney}</span>
              </a>
            </li>
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
                      this.props.currentPage === "appointment" ? "menuActv" : ""
                    }
                  >
                    <a onClick={this.AppointmentLink}>
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
                  <li
                    className={
                      this.props.currentPage === "documents" ? "menuActv" : ""
                    }
                  >
                    <a onClick={this.DocumentLink}>
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
                      <span>{my_doc}</span>
                    </a>
                  </li>
                  <li
                    className={
                      this.props.currentPage === "tracker" ? "menuActv" : ""
                    }
                  >
                    <a onClick={this.Tracker}>
                      {this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode &&
                      this.props.settings.setting.mode === "dark" ? (
                        <img
                          src={require("assets/images/nav-trackers-white.svg")}
                          alt=""
                          title=""
                        />
                      ) : (
                        <img
                          src={require("assets/images/nav-trackers.svg")}
                          alt=""
                          title=""
                        />
                      )}

                      <span>
                        {trackers} & <br /> {self_data}
                      </span>
                    </a>
                  </li>
                  <li
                    className={
                      this.props.currentPage === "more" ? "menuActv" : ""
                    }
                  >
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
                            <a onClick={this.EmergencyLink}>
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
                              {emrgancy_patient_data}
                            </a>
                          </li>
                          <li>
                            <a onClick={this.OnlineCourse}>
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
                          <li>
                            <a onClick={this.ExtraLink}>
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
                              {extra_srvc}
                            </a>
                          </li>
                          <li>
                            <a onClick={this.JournalArchiveLink}>
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
                              {jrnl_archive}
                            </a>
                          </li>
                          <li>
                            <a onClick={this.BlockChain}>
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
                              {blockchain_access_log}
                            </a>
                          </li>
                        </ul>
                      </div>
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
                              {DarkMode}{" "}
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
        {/* For set the language  */}
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
