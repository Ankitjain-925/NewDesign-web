import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { Redirect, Route } from "react-router-dom";
import Loader from "Screens/Components/Loader/index";
import { authy } from "Screens/Login/authy.js";
import LeftMenuMobile from "Screens/Components/Menus/DoctorLeftMenu/mobile";
import LeftMenu from "Screens/Components/Menus/DoctorLeftMenu/index";
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import Institutes from "Screens/Components/Institutes/index";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addSec: false,
      specialistOption: null,
      successfullsent: false,
      Pdoctors: [],
      error: false,
      docProfile: false,
      loaderImage: false,
      selectedPdoc: {},
      share_to_doctor: false,
      AddSecond: {},
      err_pdf: false,
      personalinfo: {},
      found: false,
      newItemp: {},
    };
  }

  componentDidMount() {}

  redirectSpace = (data) => {
    this.props.houseSelect(data);
    this.props.history.push("/doctor/professional-task");
  };

  render() {
    const { specialistOption } = this.state;
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
            ? "homeBg homeBgDrk darkTheme"
            : "homeBg"
        }
      >
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="institute" />
                <LeftMenuMobile isNotShow={true} currentPage="institute" />
                <Notification />
                {/* End of Website Menu */}
                <Grid item xs={12} md={11}>
                    <Institutes redirectSpace={(data) => this.redirectSpace(data)}/>
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
  const { House } = state.houseSelect;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
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
    houseSelect
  })(Index)
);
