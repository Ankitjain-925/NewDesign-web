import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import LeftMenu from "Screens/Components/Menus/NurseLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/NurseLeftMenu/mobile";
import Loader from "Screens/Components/Loader/index";
import { LanguageFetchReducer } from "Screens/actions";
import { withRouter } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import { LoginReducerAim } from "Screens/Login/actions";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import { Settings } from "Screens/Login/setting";
import Institutes from "Screens/Components/Institutes/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPara: false,
      gettrackdatas: {},
      error_msg: false,
      loaderImage: false,
      personalinfo: {},
      terms_condition: false,
      error_msg1: false,
    };
  }

  redirectSpace = (data) => {
    this.props.houseSelect(data);
    this.props.history.push("/nurse/professional-task");
  };

 
  render() {
    const { stateLoginValueAim, Doctorsetget } = this.props;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      !this.props.verifyCode ||
      !this.props.verifyCode.code
    ) {
      if (stateLoginValueAim.user) {
        if (
          stateLoginValueAim?.user?.type === "nurse" ||
          stateLoginValueAim?.user?.type === "therapist"
        ) {
        } else {
          return <Redirect to={"/"} />;
        }
      } else {
        return <Redirect to={"/"} />;
      }
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
        <Grid className="homeBgIner">
          {this.state.loaderImage && <Loader />}
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="emergency" />
                <LeftMenuMobile isNotShow={true} currentPage="emergency" />
                <Notification />
                {/* End of Website Menu */}

                <Grid item xs={12} md={11}>
                <Institutes comesFrom="professional" redirectSpace={(data) => this.redirectSpace(data)}/>
                  {/* End of Model setup */}
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
