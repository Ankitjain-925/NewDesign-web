import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "../../actions";
import { LoginReducerAim } from "../../Login/actions";
import { Settings } from "../../Login/setting";
import Loader from "../../Components/Loader/index";
import { Redirect, Route } from "react-router-dom";
import { authy } from "./../../Login/authy.js";
import LeftMenu from "./../../Components/Menus/InsuranceLeftMenu/index";
import LeftMenuMobile from "./../../Components/Menus/InsuranceLeftMenu/mobile";
import CourseSection from "./../../Components/OnlineCourses/index.js";
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

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

  render() {
    const { specialistOption } = this.state;
    const { stateLoginValueAim, Doctorsetget } = this.props;
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
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="course" />
                <LeftMenuMobile isNotShow={true} currentPage="course" />
                <Notification />
                {/* End of Website Menu */}
                <Grid item xs={12} md={11}>
                  <CourseSection />
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
