import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/DoctorLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/DoctorLeftMenu/mobile";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { connect } from "react-redux";
import { Doctorarrays } from "Screens/Login/doctorarray";
import { Redirect, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import CometChat from "../../Components/CometChat";
import { LanguageFetchReducer } from "Screens/actions";
import Loader from "Screens/Components/Loader/index";
import { authy } from "Screens/Login/authy.js";

// var doctorArray = ['admin'];

class index extends React.Component {
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
      doctorslist: [],
      message: "",
      allMessage: [],
      loggedinuser: {},
      currentUser: false,
      isattach: false,
      attachfile: [],
      unreadm: false,
      doctorArray: [],
      sizeList: 100,
      doctorarrays: this.props.doctorarrays,
    };
    this.props.Doctorarrays(
      this.props.stateLoginValueAim.user.type,
      this.props.stateLoginValueAim.user,
      this.props.stateLoginValueAim.token,
      this.removeLoader
    );
  }
  componentWillMount() {
    if (this.props.stateLoginValueAim.user) {
      this.setState({ loaderImage: true });
      this.props.Doctorarrays(
        this.props.stateLoginValueAim.user.type,
        this.props.stateLoginValueAim.user,
        this.props.stateLoginValueAim.token,
        this.removeLoader
      );
    }
  }
  removeLoader = () => {
    setTimeout(() => {
      this.setState({ loaderImage: false });
    }, 4000);
  };

  render() {
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
        <Grid container direction="row" justify="center">
          {this.state.loaderImage && <Loader />}
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              <LeftMenu isNotShow={true} currentPage="chat" />
              <LeftMenuMobile isNotShow={true} currentPage="chat" />
              {/* <Notification /> */}
              {/* Website Mid Content */}
            
              <Grid item xs={12} md={11}>
                {/* Inbox page Content */}
                <Grid
                  container
                  style={{ fontSize: "16px" }}
                  direction="row"
                  justify="left"
                  alignItems="center"
                >
                  <CometChat
                    lan={this.props.stateLanguageType}
                    Uid={this.props.stateLoginValueAim.user.profile_id}
                    Userlist={
                      this.props.doctorarrays &&
                      this.props.doctorarrays.doctorarray
                    }
                  />
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
  const { doctorarrays } = state.Doctorarrays;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    doctorarrays,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    Doctorarrays,
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
  })(index)
);
