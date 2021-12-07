import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import LogOut from "Screens/Components/LogOut/index";
import Timer from "Screens/Components/TimeLogOut/index";
import { Fitbit } from "Screens/Patient/Tracker/fitbit";
import { Withings } from "Screens/Patient/Tracker/withing.js";
import { update_CometUser } from "Screens/Components/CommonApi/index";
import Mode from "Screens/Components/ThemeMode/index.js";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
import { getLanguage } from "translations/index"
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
      openFancyLanguage: false,
      PassDone: false,
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
      this.props.houseSelect({value: null});
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

  //For Spaces
  Spaces = () => {
    this.props.history.push('/virtualHospital/space')
  };
  //For Services
  Services = () => {
    this.props.history.push('/virtualHospital/services')
  };
  //For Tasks
  Tasks = () => {
    this.props.history.push('/virtualHospital/tasks')
  };
  //For calendar
  Calendar = () => {
    this.props.history.push('/virtualHospital/calendar')
  };

   //For calendar
   ProfileLink = () => {
    this.props.history.push('/virtualHospital/profile')
  };

  //For change Institutes
  MoveInstitute = () => {
    this.props.houseSelect({value: null});
    this.props.history.push('/virtualHospital/institutes')
  };

  PatientFlow = () => {
    this.props.history.push("/virtualHospital/patient-flow")
  };

  Statistics = () => {
    this.props.history.push("/virtualHospital/statistics")
  };

  Billing = () => {
    this.props.history.push("/virtualHospital/bills")
  };

  Invoice = () => {
    this.props.history.push("/virtualHospital/invoices")
  };

  PatientDetail = () => {
    this.props.history.push("/virtualHospital/patient-detail")
  };

  Questionaires = () => {
    this.props.history.push("/virtualHospital/questionnaire")
  };


  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      my_profile,
      profile_setting,
      Language,
      DarkMode,
      logout,
    } = translate;
    return (
        <Grid className="MenuWeb">
        <Grid className="webLogo">
        {/* {this.state.loaderImage && <Loader />} */}
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
            {this.props?.House?.value && 
            <>
            <li
              className={this.props.currentPage === "flow" ? "menuActv" : ""}
            >
              <a onClick={this.PatientFlow}>
              {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/virtual_images/barMenu2.png")}
                    alt=""
                    title=""
                  />) : (
                  <img
                    src={require("assets/virtual_images/barMenu.png")}
                    alt=""
                    title=""
                  />
                  )}
                <span>Patient flow</span>
              </a>
            </li>
            <li className={this.props.currentPage === "calendar" ? "menuActv" : ""}>
              <a onClick={this.Calendar}>
              {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/virtual_images/calender2.png")}
                    alt=""
                    title=""
                  />)
               :
               (<img
               src={require("assets/virtual_images/calender.png")}
               alt=""
               title=""
             /> )}
                <span>{"Calendar"}</span>
              </a>
            </li>
            <li
              className={
                this.props.currentPage === "task" ? "menuActv" : ""
              }
            >
              <a onClick={this.Tasks}>
              {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark" ? 
                  (<img
                    src={require("assets/virtual_images/rightpng2.png")}
                    alt=""
                    title=""
                  />) : (
                    <img
                    src={require("assets/virtual_images/rightpng.png")}
                    alt=""
                    title=""
                  />
                  )}
                <span>{"Tasks"}</span>
              </a>
            </li>
            <li
              className={
                this.props.currentPage === "space" ? "menuActv" : ""
              }
            >
              <a onClick={this.Spaces}>
              {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark" ? 
                  (<img
                    src={require("assets/virtual_images/bed2.png")}
                    alt=""
                    title=""
                  />) : (
                    <img
                    src={require("assets/virtual_images/bed.png")}
                    alt=""
                    title=""
                  />
                  )}
                <span>{"Space Management"}</span>
              </a>
            </li>
            </>}
            <li
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
                    src={require("assets/virtual_images/hospitalIcon.png")}
                    alt=""
                    title=""
                  />
                  )}
                <span>{"Change Hospital"}</span>
              </a>
            </li>
            {this.props?.House?.value && 
            <>
            <li className={this.props.currentPage === "more" ? "menuActv" : ""}>
              <a className="moreMenu">
              {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark" ? 
                  (<img
                    src={require("assets/virtual_images/nav-more2.png")}
                    alt=""
                    title=""
                   className="manage-dark-back"/>) : (
                    <img
                    src={require("assets/images/nav-more.svg")}
                    alt=""
                    title=""
                  />
                  )}
                <span>{"More"}</span>

                <div className="moreMenuList">
                  <ul>
                    
                    <li>
                      <a onClick={this.Services}>
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
                            src={require("assets/virtual_images/menudocs.jpg")}
                            alt=""
                            title=""
                          />
                        )}
                        {"Services"}
                      </a>
                    </li>
                    <li>
                      <a onClick={this.Statistics}>
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
                            src={require("assets/virtual_images/menudocs.jpg")}
                            alt=""
                            title=""
                          />
                        )}
                    
                        {"Statistics"}
                      </a>
                    </li>
                    <li>
                      <a onClick={this.Billing}>
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
                            src={require("assets/virtual_images/menudocs.jpg")}
                            alt=""
                            title=""
                          />
                        )}
                    
                        {"Billing"}
                      </a>
                    </li>
                    <li>
                      <a onClick={this.Invoice}>
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
                            src={require("assets/virtual_images/menudocs.jpg")}
                            alt=""
                            title=""
                          />
                        )}
                    
                        {"Invoices"}
                      </a>
                    </li>
                    <li>
                      <a onClick={this.Questionaires}>
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
                            src={require("assets/virtual_images/menudocs.jpg")}
                            alt=""
                            title=""
                          />
                        )}
                    
                        {"Questionnaire"}
                      </a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
            </>
            }
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
                            src={require("assets/virtual_images/menudocs.jpg")}
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
  const { fitbit } = state.Fitbit;
  const { withing } = state.Withings;
  const { House } = state.houseSelect;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    fitbit,
    withing,
    House,
    //   Doctorsetget,
    //   catfil
  };
};
export default withRouter(
  connect(mapStateToProps, {
    Fitbit,
    Withings,
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    houseSelect
  })(Index)
);
