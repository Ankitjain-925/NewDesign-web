import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { LanguageFetchReducer } from "Screens/actions";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import sitedata from "sitedata";
import "react-calendar/dist/Calendar.css";
import { getLanguage } from "translations/index"
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  notApprove = () => {
    this.props.history.push("/");
  };

  redirectPage = () => {
    this.setState({ loaderImage: true });
    axios.put(
      sitedata.data.path + "/cases/verifiedbyPatient/" + this.props.match.params.id,
      {  isverifiedbyPatient : true
      },
    )
      .then((responce1) => {})
  }

  render() {
    const { selectedOption } = this.state;
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      page_not_found,
      Oops,
      page_temparary_unavailable,
      go_to_home,
    } = translate;
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
          <Grid container direction="row" justify="center">
            <Grid item xs={6} md={6}>
              <Grid className="webLogo">
                <a href="/">
                  <img
                    src={require("assets/images/LogoPNG.png")}
                    alt=""
                    title=""
                  />
                </a>
              </Grid>
              <div className="NotFound">
                <h1>Approve the hospital to access your information</h1>
              </div>
              <div className="NotFoundContent">
                <div className="OopsContent"></div>
                <div>{page_temparary_unavailable}</div>
                <div onClick={this.redirectPage} className="BackHomeBtn">
                  {"Approve"}
                </div>
                <div onClick={this.notApprove()} className="BackHomeBtn">
                  {"Not Approve"}
                </div>
              </div>
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
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
  };
};
export default connect(mapStateToProps, {
  LoginReducerAim,
  Settings,
  LanguageFetchReducer,
})(Index);
