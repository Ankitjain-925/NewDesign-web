import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import Loader from "Screens/Components/Loader/index";
import { authy } from "Screens/Login/authy.js";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
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
                <LeftMenu isNotShow={true} currentPage="more" />
                <LeftMenuMobile isNotShow={true} currentPage="more" />
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
