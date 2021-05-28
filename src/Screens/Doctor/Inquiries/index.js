import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import LeftMenu from "Screens/Components/Menus/DoctorLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/DoctorLeftMenu/mobile";
import sitedata from "sitedata";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import Loader from "Screens/Components/Loader/index";
import { authy } from "Screens/Login/authy.js";
import PrecriptionList from "./Components/prescription.js";
import SickCertificateList from "./Components/sickCertificate.js";
import SentPrescriptionList from "./Components/sentPricription.js";
import {
  getLanguage
} from "translations/index"
import { Redirect } from "react-router-dom";
import SecondOpinion from "./Components/secondOpinion";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import { commonHeader } from "component/CommonHeader/index.js";

// import * as translationDE from '../../../translations/de_json_proofread_13072020.json';
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
      openPrescp: false,
      openReject: false,
      specialistOption: null,
      value: 0,
      MypatientsData: [],
      prescData: {},
    };
  }

  componentDidMount() {
    this.getUserData();
    // this.getMyprescriptionssData()
  }

  getUserData() {
    this.setState({ loaderImage: true });
    let user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    axios
      .get(sitedata.data.path + "/UserProfile/Users/" + user_id, commonHeader(user_token))
      .then((response) => {
        this.setState({ loaderImage: false });
        this.setState({ myData: response.data.data });
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
  }

  saveUserData(id) {
    this.setState({ serverMsg: "" });
    if (this.state.uploadedimage == "") {
      this.setState({ serverMsg: "please upload documents" });
    } else {
      this.setState({ loaderImage: true });
      const user_token = this.props.stateLoginValueAim.token;
      axios
        .put(
          sitedata.data.path + "/UserProfile/UpdatePrescription/" + id,
          {
            docs: this.state.uploadedimage,
          },
          commonHeader(user_token)
        )
        .then((responce) => {
          this.setState({ serverMsg: responce.data.message });
          this.setState({ loaderImage: false });
        });
    }
  }

  handleSpecialist = (specialistOption) => {
    this.setState({ specialistOption });
    //// console.log(`Option selected:`, specialistOption);
  };

  handleChangeTabs = (event, value) => {
    this.setState({ value });
  };

  handleOpenReject = () => {
    this.setState({ openReject: true });
  };
  handleCloseReject = () => {
    this.setState({ openReject: false });
  };

  render() {
    const { specialistOption, prescData } = this.state;
    const { value } = this.state;
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      Inquiries,
      prescriptions,
      ScndOpinion,
      sickcsrtificates,
      rqst_sent_succefully,
      SentPrescriptions
    } = translate;
    const { stateLoginValueAim, Doctorsetget } = this.props;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      stateLoginValueAim.user.type !== "doctor" ||
      !this.props.verifyCode ||
      !this.props.verifyCode.code
    ) {
      return <Redirect to={"/"} />;
    }
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
          {this.state.loaderImage && <Loader />}
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="inquiries" />
                <LeftMenuMobile isNotShow={true} currentPage="inquiries" />
                <Notification />
                {/* End of Website Menu */}

                <Grid item xs={12} md={11} lg={9}>
                  <Grid className="docsOpinion">
                    <Grid container direction="row" className="docsOpinLbl">
                      <Grid item xs={12} md={12}>
                        <label>{Inquiries}</label>
                      </Grid>
                    </Grid>
                    <Grid className="presPkgIner1">
                      {/* Tabs  */}
                      <AppBar position="static" className="presTabsUpr">
                        <Grid container direction="row">
                          <Grid item xs={12} md={8} sm={8}>
                            <Tabs
                              value={value}
                              onChange={this.handleChangeTabs}
                              className="presTabs"
                            >
                              <Tab
                                label={prescriptions}
                                className="presTabsIner"
                              />
                              <Tab
                                label={sickcsrtificates}
                                className="presTabsIner"
                              />
                              <Tab
                                label={ScndOpinion}
                                className="presTabsIner"
                              />
                              <Tab
                                label={SentPrescriptions}
                                className="presTabsIner"
                              />
                            </Tabs>
                          </Grid>
                          <Grid item xs={12} md={4} sm={4} className="presSrch">
                            <a>
                              <img
                                src={require("assets/images/search-entries.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                          </Grid>
                        </Grid>
                      </AppBar>
                    </Grid>

                    <Grid className="presPkgIner2">
                      {value === 0 && (
                        <TabContainer>
                          {this.state.successfullsent && (
                            <div className="success_message">
                              {rqst_sent_succefully}
                            </div>
                          )}
                          <PrecriptionList
                            newItem={this.state.newItemp}
                            myData={this.state.myData}
                          />
                        </TabContainer>
                      )}
                      {value === 1 && (
                        <TabContainer>
                          {this.state.successfullsent1 && (
                            <div className="success_message">
                              {rqst_sent_succefully}
                            </div>
                          )}
                          <SickCertificateList
                            newItem={this.state.newItemp}
                            myData={this.state.myData}
                          />
                        </TabContainer>
                      )}
                      {value === 2 && (
                        <TabContainer>
                          {this.state.successfullsent1 && (
                            <div className="success_message">
                              {rqst_sent_succefully}
                            </div>
                          )}
                          <SecondOpinion
                            newItem={this.state.newItemp}
                            myData={this.state.myData}
                          />
                        </TabContainer>
                      )}
                       {value === 3 && (
                        <TabContainer>
                          <SentPrescriptionList
                            newItem={this.state.newItemp}
                            myData={this.state.myData}
                          />
                        </TabContainer>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
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
