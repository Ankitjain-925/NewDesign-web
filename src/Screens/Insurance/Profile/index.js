/*global google*/

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Redirect, Route } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import LeftMenu from "Screens/Components/Menus/InsuranceLeftMenu/index.js";
import LeftMenuMobile from "Screens/Components/Menus/InsuranceLeftMenu/mobile";
import { LanguageFetchReducer } from "Screens/actions";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ProfileSection from "Screens/Components/CommonProfileSec/profileUpdate";
import SecuritySection from "Screens/Components/CommonProfileSec/security";
import DateTimeSection from "Screens/Components/CommonProfileSec/DateTime";
import { OptionList } from "Screens/Login/metadataaction";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import { getLanguage } from "translations/index"
import DeleteAccountSection from "Screens/Components/CommonProfileSec/DeleteAccount"; 
import {GetLanguageMetadata, getUserData } from "Screens/Components/CommonProfileSec/api";
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
      GetLanguageMetadata(this);
    }
  };
  //   //For getting the dropdowns from the database
  getMetadata() {
    this.setState({ allMetadata: this.props.metadata},
      ()=>{
          GetLanguageMetadata(this);
      })
  }
  //Get the current User Data
  getUserData() {
    getUserData(this)
  }

  render() {
    const { stateLoginValueAim, Doctorsetget } = this.props;
    const { value } = this.state;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      stateLoginValueAim.user.type !== "insurance" ||
      !this.props.verifyCode ||
      !this.props.verifyCode.code
    ) {
      return <Redirect to={"/"} />;
    }
    let translate = getLanguage(this.props.stateLanguageType)
    let { date_time, Security, my_profile, delete_account } = translate;
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "homeBg homeBgDrk darkTheme"
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
                          <Tab label={delete_account} className="aboutTabsIner" />
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
                       {/* Start of Delete */}
                       {value === 3 && (
                        <TabContainer>
                          <DeleteAccountSection
                            user_token={this.props.stateLoginValueAim.token}
                            LoggedInUser={this.state.LoggedInUser}
                            getUserData={this.getUserData}
                          />
                        </TabContainer>
                      )}
                      {/* End of Delete */}
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
  const { metadata } = state.OptionList;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    metadata,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    OptionList
  })(Index)
);
