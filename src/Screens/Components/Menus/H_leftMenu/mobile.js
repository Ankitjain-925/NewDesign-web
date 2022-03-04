import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import { slide as Menu } from "react-burger-menu";
import Timer from "Screens/Components/TimeLogOut/index";
import Loader from "Screens/Components/Loader/index";
import Mode from "Screens/Components/ThemeMode/index.js";
import { update_CometUser } from "Screens/Components/CommonApi/index";
import { getLanguage } from "Screens/hospital_Admin/translations/index";
import CreateAdminUser from "Screens/Components/CreateHospitalUser/index";
import LogOut from "Screens/Components/LogOut/index";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
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
      openFancyLanguage: false,
      addCreate: false,
      mode: "normal",
    };
    new Timer(this.logOutClick.bind(this));
    this.openLanguageModel = this.openLanguageModel.bind(this);
    this.handleCloseFancyLanguage = this.handleCloseFancyLanguage.bind(this);
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

  openLanguageModel() {
    this.setState({ openFancyLanguage: true });
  }

  handleCloseFancyLanguage() {
    this.setState({ openFancyLanguage: false, PassDone: false });
  }

  handleOpenCreate = () => {
    this.setState({ addCreate: true });
  };
  handleCloseCreate = () => {
    this.setState({ addCreate: false });
  };

  // Change Language function
  changeLanguage = (e) => {
    this.setState({ languageValue: e.target.value });
  };

  //For logout the User
  logOutClick = async () => {
    var data = await update_CometUser(
      this.props?.stateLoginValueAim?.user?.profile_id.toLowerCase(),
      { lastActiveAt: Date.now() }
    );
    if (data) {
      let email = "";
      let password = "";
      this.props.LoginReducerAim(email, password);
      let languageType = "en";
      this.props.LanguageFetchReducer(languageType);
    }
    this.props.history.push("/");
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      capab_Patients,
      capab_Doctors,
      archive,
      documents,
      srvc_Nurses,
      add_new,
      user,
      my_profile,
      profile_setting,
      Language,
      logout,
      DarkMode,
      InstituteGroups
    } = translate;

    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "MenuMob darkTheme"
            : "MenuMob"
        }
      >
        <Grid container direction="row" alignItems="center">
          {this.state.loaderImage && <Loader />}
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
              <Grid className="menuItems adminmenuItems">
                <ul>
                  <li
                    className={
                      this.props.currentPage === "patient_List"
                        ? "menuActv"
                        : ""
                    }
                  >
                    <a onClick={() => this.props.history.push("/h-patients")}>
                      <img
                        src={require("assets/images/admin/patintIcon.png")}
                        alt=""
                        title=""
                      />
                      <span>{capab_Patients}</span>
                    </a>
                  </li>
                  <li
                    className={
                      this.props.currentPage === "doctor_List" ? "menuActv" : ""
                    }
                  >
                    <a onClick={() => this.props.history.push("/h-doctors")}>
                      <img
                        src={require("assets/images/admin/DoctorsIcon.png")}
                        alt=""
                        title=""
                      />
                      <span>{capab_Doctors}</span>
                    </a>
                  </li>
                  <li
                    className={
                      this.props.currentPage === "nurse_List" ? "menuActv" : ""
                    }
                  >
                    <a onClick={() => this.props.history.push("/h-nurses")}>
                      <img
                        src={require("assets/images/nurse_n1.png")}
                        alt=""
                        title=""
                      />
                      <span>{srvc_Nurses}</span>
                    </a>
                  </li>
                  <li
                    className={
                      this.props.currentPage === "staff_List" ? "menuActv" : ""
                    }
                  >
                    <a onClick={() => this.props.history.push("/h-staff")}>
                      <img
                        src={require("assets/images/patientinfo.png")}
                        alt=""
                        title=""
                      />
                      <span>{"Admin Staff"}</span>
                    </a>
                  </li>
                  <li
                    className={
                      this.props.currentPage === "h_document" ? "menuActv" : ""
                    }
                  >
                    <a onClick={() => this.props.history.push("/h-documents")}>
                      <img
                        src={require("assets/images/admin/docsIcon.png")}
                        alt=""
                        title=""
                      />
                      <span>{documents}</span>
                    </a>
                  </li>
                  <li
                    className={
                      this.props.currentPage === "archive_choose"
                        ? "menuActv"
                        : ""
                    }
                  >
                    <a
                      onClick={() =>
                        this.props.history.push("/h-archivechoose")
                      }
                    >
                      <img
                        src={require("assets/images/admin/ParamedicIcon.png")}
                        alt=""
                        title=""
                      />
                      <span>{archive}</span>
                    </a>
                  </li>
                  <li
                    className={
                      this.props.currentPage === "groups" ? "menuActv" : ""
                    }
                  >
                    <a onClick={() => this.props.history.push("/h-groups")}>
                      {this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode &&
                      this.props.settings.setting.mode === "dark" ? (
                        <img
                          src={require("assets/virtual_images/hospitalIcon2.png")}
                          alt=""
                          title=""
                        />
                      ) : (
                        <img
                          src={require("assets/virtual_images/hospitalIcon.png")}
                          alt=""
                          title=""
                        />
                      )}
                      <span>{InstituteGroups}</span>
                    </a>
                  </li>
                 
                  <li
                    className={
                      this.props.currentPage === "createnewuser"
                        ? "menuActv"
                        : ""
                    }
                  >
                    <a className="addNewPlus" onClick={this.handleOpenCreate}>
                      <img
                        src={require("assets/images/admin/plusnew.png")}
                        alt=""
                        title=""
                      />
                      <span>
                        {add_new} {user}
                      </span>
                    </a>
                  </li>

                  <li>
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
                            <a
                              onClick={() =>
                                this.props.history.push("/h-profile")
                              }
                            >
                              <img
                                src={require("assets/images/menudocs.jpg")}
                                alt=""
                                title=""
                              />
                              {profile_setting}
                            </a>
                          </li>
                          <li>
                            <a onClick={this.openLanguageModel}>
                              <img
                                src={require("assets/images/menudocs.jpg")}
                                alt=""
                                title=""
                              />
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
                                mode={
                                  this.props.settings?.setting?.mode
                                    ? this.props.settings?.setting?.mode
                                    : "normal"
                                }
                                name="mode"
                                getSetting={()=>getSetting(this)}
                              />
                            </a>
                          </li>
                          <li>
                            <a onClick={this.logOutClick}>
                              <img
                                src={require("assets/images/menudocs.jpg")}
                                alt=""
                                title=""
                              />
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
                src={require("assets/images/logo_new.png")}
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
        <CreateAdminUser
          addCreate={this.state.addCreate}
          handleCloseCreate={this.handleCloseCreate}
          openBy="left_menu"
        />
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
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
