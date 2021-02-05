import React from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/PharmaLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PharmaLeftMenu/mobile";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { connect } from "react-redux";
import { Doctorarrays } from "Screens/Login/doctorarray";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import CometChat from "Screens/Components/CometChat";
import { LanguageFetchReducer } from "Screens/actions";
import { authy } from "Screens/Login/authy.js";
import Loader from "Screens/Components/Loader/index";


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
      stateLoginValueAim.user.type !== "pharmacy" ||
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
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    doctorarrays,
    //   Doctorsetget,
    //   catfil
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
