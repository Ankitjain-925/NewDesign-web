/*global google*/

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Redirect, Route } from "react-router-dom";
import sitedata from "../../../sitedata";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { authy } from "./../../Login/authy.js";
import { connect } from "react-redux";
import { LoginReducerAim } from "./../../Login/actions";
import { Settings } from "./../../Login/setting";
import LeftMenu from "./../../Components/Menus/ParamedicLeftMenu/index.js";
import LeftMenuMobile from "./../../Components/Menus/ParamedicLeftMenu/mobile";
import { LanguageFetchReducer } from "./../../actions";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ProfileSection from "./Components/profileUpdate";
import SecuritySection from "./Components/security";
import DateTimeSection from "./Components/DateTime";
import {
  translationAR,
  translationSW,
  translationSP,
  translationRS,
  translationEN,
  translationNL,
  translationDE,
  translationCH,
  translationPT,
  translationFR
} from "translations/index"
import Timezone from "./../../../timezon.json";
import { GetLanguageDropdown } from "../../Components/GetMetaData/index.js";
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
function TabContainer(props) {
  return (
    <Typography component="div" className="tabsCntnts">
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      openDash: false,
      date: new Date(),
      value: 0,
      LoggedInUser: {},
      times: [],
      tissue: [],
      dates: [],
      timezones: [],
    };
  }

  componentDidMount() {
    this.getUserData();
    this.getMetadata();
  }

  // For change the Tabs
  handleChangeTabs = (event, value) => {
    this.setState({ value });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
      this.GetLanguageMetadata();
    }
  };
  //   //For getting the dropdowns from the database
  getMetadata() {
    axios.get(sitedata.data.path + "/UserProfile/Metadata").then((responce) => {
      if (responce && responce.data && responce.data.length > 0) {
        this.setState({ allMetadata: responce.data[0] });
        this.GetLanguageMetadata();
      }
    });
  }
  GetLanguageMetadata = () => {
    var Alltissues = GetLanguageDropdown(
      this.state.allMetadata &&
        this.state.allMetadata.tissue &&
        this.state.allMetadata.tissue.length > 0 &&
        this.state.allMetadata.tissue,
      this.props.stateLanguageType
    );
    var zones = GetLanguageDropdown(
      Timezone && Timezone.length > 0 && Timezone,
      this.props.stateLanguageType,
      "timezone"
    );
    this.setState({
      tissue: Alltissues,
      dates:
        this.state.allMetadata &&
        this.state.allMetadata.dates &&
        this.state.allMetadata.dates.length > 0 &&
        this.state.allMetadata.dates,
      times:
        this.state.allMetadata &&
        this.state.allMetadata.times &&
        this.state.allMetadata.times.length > 0 &&
        this.state.allMetadata.times,
      timezones: zones,
    });
  };

  //Get the current User Data
  getUserData() {
    this.setState({ loaderImage: true });
    let user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    axios
      .get(sitedata.data.path + "/UserProfile/Users/" + user_id, {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ loaderImage: false, LoggedInUser: response.data.data });
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
  }

  render() {
    const { stateLoginValueAim, Doctorsetget } = this.props;
    const { value } = this.state;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      stateLoginValueAim.user.type !== "paramedic" ||
      !this.props.verifyCode ||
      !this.props.verifyCode.code
    ) {
      return <Redirect to={"/"} />;
    }
    let translate;
    switch (this.props.stateLanguageType) {
      case "en":
        translate = translationEN.text;
        break;
      case "de":
        translate = translationDE.text;
        break;
      case "pt":
        translate = translationPT.text;
        break;
      case "sp":
        translate = translationSP.text;
        break;
      case "rs":
        translate = translationRS.text;
        break;
      case "nl":
        translate = translationNL.text;
        break;
      case "ch":
        translate = translationCH.text;
        break;
      case "sw":
        translate = translationSW.text;
        break;
      case "fr":
        translate = translationFR.text;
        break;
      case "ar":
        translate = translationAR.text;
        break;
      default:
        translate = translationEN.text;
    }
    let { my_profile, Security, date_time } = translate;
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "homeBg homeBgDrk"
            : "homeBg"
        }
      >
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="profile" />
                <LeftMenuMobile isNotShow={true} currentPage="profile" />
                <Notification />
                {/* Website Mid Content */}
                <Grid item xs={12} md={8}>
                  <Grid className="profilePkg ">
                    <Grid className="profilePkgIner1">
                      {/* Tabs  */}
                      <AppBar position="static" className="profileTabsUpr">
                        <Tabs
                          value={value}
                          onChange={this.handleChangeTabs}
                          className="profileTabs"
                        >
                          <Tab label={my_profile} className="aboutTabsIner" />
                          <Tab label={Security} className="aboutTabsIner" />
                          <Tab label={date_time} className="aboutTabsIner" />
                        </Tabs>
                      </AppBar>
                    </Grid>
                    <Grid className="profilePkgIner2">
                      {/* Start of MyProfile */}
                      {value === 0 && (
                        <TabContainer>
                          <ProfileSection />
                        </TabContainer>
                      )}
                      {/* End of MyProfile */}

                      {/* Start of Security */}
                      {value === 1 && (
                        <TabContainer>
                          <SecuritySection
                            user_token={this.props.stateLoginValueAim.token}
                            LoggedInUser={this.state.LoggedInUser}
                            getUserData={this.getUserData}
                          />
                        </TabContainer>
                      )}
                      {/* End of Security */}

                      {/* Start of DateTime */}
                      {value === 2 && (
                        <TabContainer>
                          <DateTimeSection
                            timezones={this.state.timezones}
                            times={this.state.times && this.state.times}
                            dates={this.state.dates && this.state.dates}
                            user_token={this.props.stateLoginValueAim.token}
                            LoggedInUser={this.state.LoggedInUser}
                            getUserData={this.getUserData}
                          />
                        </TabContainer>
                      )}
                      {/* End of DateTime */}
                    </Grid>
                    {/* End of Tabs */}
                  </Grid>
                </Grid>
                {/* Website Right Content */}
                <Grid item xs={12} md={3}></Grid>
                {/* End of Website Right Content */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
  const { verifyCode } = state.authy;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    //   Doctorsetget,
    //   catfil
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
  })(Index)
);
