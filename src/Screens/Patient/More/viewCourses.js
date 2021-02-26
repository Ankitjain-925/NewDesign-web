import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import Loader from "Screens/Components/Loader/index";
import { authy } from "Screens/Login/authy.js";
import LeftMenuPatient from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobilePatient from "Screens/Components/Menus/PatientLeftMenu/mobile";
import LeftMenuDoctor from "Screens/Components/Menus/DoctorLeftMenu/index";
import LeftMenuMobileDoctor from "Screens/Components/Menus/DoctorLeftMenu/mobile";

import LeftMenuPharma from "Screens/Components/Menus/PharmaLeftMenu/index";
import LeftMenuMobilePharma from "Screens/Components/Menus/PharmaLeftMenu/mobile";
import LeftMenuNurse from "Screens/Components/Menus/NurseLeftMenu/index";
import LeftMenuMobileNurse from "Screens/Components/Menus/NurseLeftMenu/mobile";

import LeftMenuParam from "Screens/Components/Menus/ParamedicLeftMenu/index";
import LeftMenuMobileParam from "Screens/Components/Menus/ParamedicLeftMenu/mobile";
import LeftMenuIns from "Screens/Components/Menus/InsuranceLeftMenu/index";
import LeftMenuMobileIns from "Screens/Components/Menus/InsuranceLeftMenu/mobile";

import ViewCourse from "Screens/Components/OnlineCourses/Components/ListandViewCourse";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Course: {},
    };
  }

  componentDidMount() {
    if (
      this.props.location &&
      this.props.location.state !== "undefined" &&
      this.props.location.state &&
      (this.props.location.state.course_id ||
        this.props.location.state.courseId)
    ) {
      this.setState({ Course: this.props.location.state });
    } else {
      this.props.history.push(
        `/${this.props.stateLoginValueAim.user.type}/online-course`
      );
    }
  }

  render() {
    const { specialistOption } = this.state;
    const { stateLoginValueAim } = this.props;

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
                {this.props.stateLoginValueAim.user.type === 'patient' && <LeftMenuPatient isNotShow={true} currentPage="more" />}
                {this.props.stateLoginValueAim.user.type === 'patient' && <LeftMenuMobilePatient isNotShow={true} currentPage="more" />}

                {this.props.stateLoginValueAim.user.type === 'doctor' && <LeftMenuDoctor isNotShow={true} currentPage="more" />}
                {this.props.stateLoginValueAim.user.type === 'doctor' && <LeftMenuMobileDoctor isNotShow={true} currentPage="more" />}

                {this.props.stateLoginValueAim.user.type === 'pharmacy' && <LeftMenuPharma isNotShow={true} currentPage="course" />}
                {this.props.stateLoginValueAim.user.type === 'pharmacy' && <LeftMenuMobilePharma isNotShow={true} currentPage="course" />}

                {this.props.stateLoginValueAim.user.type === 'insurance' && <LeftMenuIns isNotShow={true} currentPage="course" />}
                {this.props.stateLoginValueAim.user.type === 'insurance' && <LeftMenuMobileIns isNotShow={true} currentPage="course" />}

                {this.props.stateLoginValueAim.user.type === 'paramedic' && <LeftMenuParam isNotShow={true} currentPage="course" />}
                {this.props.stateLoginValueAim.user.type === 'paramedic' && <LeftMenuMobileParam isNotShow={true} currentPage="course" />}

                {this.props.stateLoginValueAim.user.type === 'nurse' && <LeftMenuNurse isNotShow={true} currentPage="course" />}
                {this.props.stateLoginValueAim.user.type === 'nurse' && <LeftMenuMobileNurse isNotShow={true} currentPage="course" />}
                <Notification />
                {/* End of Website Menu */}
                <Grid item xs={12} md={11}>
                  <ViewCourse Course={this.state.Course} />
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
