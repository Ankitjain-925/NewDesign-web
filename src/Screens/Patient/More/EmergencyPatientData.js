import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import sitedata from "sitedata";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { Redirect, Route } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import EmergencyCall from "Screens/Components/EmergencyPage/index";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

const path = sitedata.data.path + "/emergency_record";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { stateLoginValueAim } = this.props;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      stateLoginValueAim.user.type !== "patient" ||
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
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              {/* Website Menu */}
              <LeftMenu isNotShow={true} currentPage="more" comes="emergency" />
              <LeftMenuMobile
                isNotShow={true}
                currentPage="more"
                comes="emergency"
              />
              <Notification />
              {/* End of Website Menu */}

              {/* Website Mid Content */}
              <Grid item xs={12} md={11}>
                <Grid className="emrgncyDataUpr">
                  {/* call Emergency Section */}
                  <EmergencyCall byUser="patient" />
                </Grid>
              </Grid>
              {/* End of Website Right Content */}
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
  return {
    stateLanguageType,
    stateLoginValueAim, 
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
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
