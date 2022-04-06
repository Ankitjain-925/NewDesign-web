import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Loader from "Screens/Components/Loader/index";
import { LanguageFetchReducer } from "Screens/actions";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import sitedata from "sitedata";
import "react-calendar/dist/Calendar.css";
import { getLanguage } from "translations/index"
import io from "socket.io-client";

var socket;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkexpire: false,
      actiondone: false
    };
    socket = io("http://localhost:5000");

  }

  notApprove = () => {
    this.props.history.push("/");
  };

  redirectPage = (status) => {
    this.setState({ loaderImage: true });
    axios.put(
      sitedata.data.path + "/cases/verifiedbyPatient/" + this.props.match.params.id,
      {  verifiedbyPatient : status
      },
    )
      .then((responce1) => {
        console.log("rep",responce1)
        if(!responce1.data.hassuccessed){
          this.setState({ linkexpire: true });
          setTimeout(() => {
          this.setState({ linkexpire: false })
          },5000);
        }
        else{
          if(status){
            socket.emit("addpatient",{verifiedbyPatient:status,case_id:this.props.match.params.id})
            this.setState({actiondone : "Your are approved the hospital to share information successfully, Thanks for your co-operation"})
          }
          else{
            socket.emit("decline",{verifiedbyPatient:status,case_id:this.props.match.params.id})
            this.setState({actiondone : "Your are not approved the hospital, Thanks for your co-operation"})
          }
        }
        this.setState({ loaderImage: false });
      })
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
         {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={10} md={10}>
              <Grid className="webLogo">
                <a href="/">
                  <img
                    src={require("assets/images/LogoPNG.png")}
                    alt=""
                    title=""
                  />
                </a>
              </Grid>
              {this.state.linkexpire &&
              <div className="err_message">{"Link limit is exceed, for getting new link must to contact hospital authority"}</div>}
              <div className="err_message">{"This link is valid till 24 hr Only or till you approve that. after that link will be deactivate."}</div>
              <div className="NotFound">
                <h1>Approve the hospital to access your information</h1>
              </div>
              <div className="NotFoundContent">
               {this.state.actiondone && <>
                <div className="OopsContent">{this.state.actiondone}</div>
                </>}
                {!this.state.actiondone && <>
                <div className="OopsContent"></div>
                <div>{"A hosptial wants the access to get your infomration for your treatment, If you approve the hospital then, you are able to admin in hospital for the futher treatment/ chechup."}</div>
                <div className="err_message">{"Note : - If any condition you are not approve the hospital then hospital are not able to admit you in hospital. And this link is available only for 24hr for approve."}</div>
                <div onClick={()=>this.redirectPage(true)} className="BackHomeBtn">
                  {"Approve"}
                </div>
                <div onClick={()=>this.redirectPage(false)} className="BackHomeBtn">
                  {"Not Approve"}
                </div>
                </>}
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
