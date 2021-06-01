import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Toggle from "react-toggle";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import { LanguageFetchReducer } from "Screens/actions";
import Loader from "Screens/Components/Loader/index";
import { Redirect, Route } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import sitedata from "sitedata";
import "react-toggle/style.css";
import { authy } from "Screens/Login/authy.js";
import HomePage from 'Screens/Components/CardInput/PayforSubscription';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {
  getLanguage
} from "translations/index"
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import { commonHeader } from "component/CommonHeader/index";
const stripePromise = loadStripe('pk_test_qoJaLAHMXbv3fzci2AEcmkYX');
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderImage: false,
      paid_services: [],
      firstServiceData: {},
      secondServiceData: {},
      firstActive: false,
      secondActive: false,
      activated: false,
      deactivated: false,
      error3: false,
      show2: false,
      show1: false,
      first_sub: false,
      second_sub: false,
    };
    // new Timer(this.logOutClick.bind(this))
  }

  componentDidMount() {
    this.getUserData();
  }

  //Not need yet this for the payment
  fromDollarToCent = (amount) => {
    return parseInt(amount * 100);
  };
  fromEuroToCent = (amount) => {
    return parseInt(amount * 100);
  };
  successPayment = (data) => {
    this.setState({ activated: true, show1 : false, show2: false });
    setTimeout(() => {
      this.setState({ activated: false });
    }, 5000);
    this.getUserData();
  };

  //If error comes from the API
  errorPayment = (data) => {
    this.setState({ error3: true , show1 : false, show2: false});
    setTimeout(() => {
      this.setState({ error3: false });
    }, 5000);
    this.getUserData();
  };

  //Other API with no payment setting for Activate services
  onToken = (description, subscription) => {
    this.setState({ loaderImage: true, activated: false, deactivated: false });
    const user_token = this.props.stateLoginValueAim.token;
    var payment_info = subscription;
    var sb=  subscription?.created ? subscription?.created: new Date();
    var subscription_info= {
      subscribed_on: new Date(sb),
      subscribed_from: 'web',
    } 
    axios
      .put(
        sitedata.data.path + "/UserProfile/Bookservice",
        {
          description,
          payment_info,
          subscription_info,
        },
        commonHeader(user_token)
      )
      .then(this.successPayment)
      .catch(this.errorPayment);
  };

  //For deactivate the services
  DeactivateSub = async (desc, sub_id) => {
    this.setState({ loaderImage: true, activated: false, deactivated: false });
    const res = await axios.delete(sitedata.data.path + "/stripeCheckout/sub/"+sub_id );
  if(res.data.hassuccessed){
    axios
    .delete(sitedata.data.path + "/UserProfile/Bookservice/" + desc, commonHeader(this.props.stateLoginValueAim.token))
    .then((responce) => {
      this.setState({ loaderImage: false});
      if (responce.data.hassuccessed) {
        if (desc === "Doc Around The Clock") {
          this.setState({ firstActive: false, deactivated: true });
        }
        if (desc === "Data services") {
          this.setState({ secondActive: false, deactivated: true });
        }
        setTimeout(() => {
          this.setState({ deactivated: false });
        }, 5000);
      } else {
        this.setState({ error3: true });
        setTimeout(() => {
          this.setState({ error3: false });
        }, 5000);
      }
      this.getUserData();
    });
  }
    
  };

  Deactivate= (desc, sub_id)=>{
    let translate = getLanguage(this.props.stateLanguageType)
    let { yes, no, r_u_want_cancel_sub, cancel_subscription} = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === "dark"
                ? "dark-confirm react-confirm-alert-body"
                : "react-confirm-alert-body"
            }
          >
            <h1>{cancel_subscription}</h1>
            <p>{r_u_want_cancel_sub}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{no}</button>
              <button
                onClick={() => {
                  this.DeactivateSub(desc, sub_id);
                  onClose();
                }}
              >
                {yes}
              </button>
            </div>
          </div>
        );
      },
    });
  }

  //Get the current user data
  getUserData() {
    this.setState({ loaderImage: true });
    let user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    axios
      .get(sitedata.data.path + "/UserProfile/Users/" + user_id, commonHeader(user_token))
      .then((response) => {
        if (response.data.data.paid_services) {
          this.setState({
            paid_services: response.data.data.paid_services,
            firstServiceData: {},
            secondServiceData: {},
          });
          for (let i = 0; i < this.state.paid_services.length; i++) {
            if (
              this.state.paid_services[i].description == "Doc Around The Clock"
            ) {
              this.setState({
                firstServiceData: this.state.paid_services[i],
                firstActive: true,
                first_sub: this.state.paid_services[i]?.payment_info.id
              });
            }
            if (this.state.paid_services[i].description == "Data services") {
              this.setState({
                secondServiceData: this.state.paid_services[i],
                secondActive: true,
                second_sub: this.state.paid_services[i]?.payment_info.id 
              });
            }
          }
        }
        this.setState({ loaderImage: false });
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
  }
  CancelClick=()=>{
    this.setState({show1 : false, show2: false})
  }
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
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      extra,
      cancel,
      recEmp_SUBSCRIBE,
      srvc,
      is,
      activated,
      activate,
      available,
      deactivated,
      srvc_not_updt_cannt_reach_srvr,
      on,
      doc_around_clock,
      cntct_aimedis_medi_team_24_7,
      data_srvcs,
      stay_upto_date_orgnize_data,
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
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              {/* Website Menu */}
              <LeftMenu isNotShow={true} currentPage="more" />
              <LeftMenuMobile isNotShow={true} currentPage="more" />
              <Notification />
              {/* End of Website Menu */}

              {/* Website Mid Content */}
              <Grid item xs={12} md={11}>
                <Grid className="extraSrvcUpr">
                  <Grid container direction="row">
                    <Grid item xs={12} md={10}>
                      <Grid className="extraSrvc">
                        <h1>
                          {extra} {srvc}
                        </h1>
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.activated && (
                    <div className="success_message">
                      {srvc} {is} {activated}
                    </div>
                  )}
                  {this.state.deactivated && (
                    <div className="success_message">
                      {srvc} {is} {deactivated}
                    </div>
                  )}
                  {this.state.error3 && (
                    <div className="err_message">
                      {srvc_not_updt_cannt_reach_srvr}
                    </div>
                  )}

                  <Grid className="actvMain">
                    <h2>{activated}</h2>
                    <Grid container direction="row" spacing="3">
                      {this.state.firstServiceData &&
                        this.state.firstServiceData.created && (
                          <Grid item xs={12} md={3}>
                            <Grid className="docArundUpr">
                              <Grid className="docArund">
                                <Grid>
                                  <img
                                    src={require("assets/images/24.svg")}
                                    alt=""
                                    title=""
                                  />
                                </Grid>
                                <Grid>
                                  <label>{doc_around_clock}</label>
                                </Grid>
                                <Grid>
                                  <p>{cntct_aimedis_medi_team_24_7}</p>
                                </Grid>
                              </Grid>
                              <Grid className="srvcActiv">
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={12} md={6}>
                                    <p>
                                      {srvc} {activated} {on}{" "}
                                      <span>
                                        {this.state.firstServiceData.created}
                                      </span>
                                    </p>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {this.state.firstServiceData?.subscription_info?.subscribed_from === 'web' && 
                                    <Grid className="acvtTogle">
                                      <div className="sbu_button">
                                        <button
                                          onClick={() => {
                                            this.Deactivate(
                                              "Doc Around The Clock",
                                              this.state.first_sub
                                            )
                                          }}
                                          className="cancel"
                                        >
                                          {cancel}
                                        </button>
                                      </div>
                                    </Grid>}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}

                      {this.state.secondServiceData &&
                        this.state.secondServiceData.created && (
                          <Grid item xs={12} md={3}>
                            <Grid className="docArundUpr">
                              <Grid className="docArund">
                                <Grid className="dataSrvcImg">
                                  <img
                                    src={require("assets/images/dataSrvc.png")}
                                    alt=""
                                    title=""
                                  />
                                </Grid>
                                <Grid>
                                  <label>{data_srvcs}</label>
                                </Grid>
                                <Grid>
                                  <p>{stay_upto_date_orgnize_data}</p>
                                </Grid>
                              </Grid>
                              <Grid className="srvcActiv">
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={12} md={6}>
                                    <p>
                                      {srvc} {activated} {on}{" "}
                                      <span>
                                        {this.state.secondServiceData.created}
                                      </span>
                                    </p>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                      {this.state.secondServiceData?.subscription_info?.subscribed_from === 'web' && <Grid className="acvtTogle">
                                      <div className="sbu_button">
                                        <button
                                          onClick={() => {
                                            this.Deactivate("Data services",
                                            this.state.second_sub)
                                          }}
                                          className="cancel"
                                        >
                                          {cancel}
                                        </button>
                                      </div>
                                    </Grid>}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                    </Grid>
                  </Grid>

                  <Grid className="actvMain">
                    <h2>{available}</h2>
                    <Elements stripe={stripePromise}>
                      <HomePage languageType={this.props.stateLanguageType} show1={this.state.show1} show2={this.state.show2} CancelClick={this.CancelClick} onToken={this.onToken}/>
                    </Elements>
                    <Grid container direction="row" spacing="3">
                      {!this.state.firstServiceData ||
                        (!this.state.firstServiceData.created && (
                          <Grid item xs={12} md={3}>
                            <Grid className="docArundUpr">
                              <Grid className="docArund">
                                <Grid>
                                  <img
                                    src={require("assets/images/24.svg")}
                                    alt=""
                                    title=""
                                  />
                                </Grid>
                                <Grid>
                                  <label>{doc_around_clock}</label>
                                </Grid>
                                <Grid>
                                  <p>{cntct_aimedis_medi_team_24_7}</p>
                                </Grid>
                              </Grid>
                              <Grid className="srvcActiv">
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={12} md={5}>
                                    <p>
                                      {activate} {srvc}{" "}
                                    </p>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Grid className="acvtTogle">
                                      {!this.state.show1 &&
                                      <div className="sbu_button">
                                      <button
                                          onClick={() => {
                                            this.setState({show1: true, show2: false})
                                          }}
                                        >
                                          {recEmp_SUBSCRIBE}
                                        </button>
                                      </div>}
                                      
                                        {/* <Toggle
                                        
                                          icons={false}
                                          onClick={() =>
                                            this.onToken("Doc Around The Clock")
                                          }
                                        /> */}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}

                      {!this.state.secondServiceData ||
                        (!this.state.secondServiceData.created && (
                          <Grid item xs={12} md={3}>
                            <Grid className="docArundUpr">
                              <Grid className="docArund">
                                <Grid className="dataSrvcImg">
                                  <img
                                    src={require("assets/images/dataSrvc.png")}
                                    alt=""
                                    title=""
                                  />
                                </Grid>
                                <Grid>
                                  <label>{data_srvcs}</label>
                                </Grid>
                                <Grid>
                                  <p>{stay_upto_date_orgnize_data}</p>
                                </Grid>
                              </Grid>
                              <Grid className="srvcActiv">
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={12} md={5}>
                                    <p>
                                      {activate} {srvc}
                                    </p>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Grid className="acvtTogle">
                                      <div className="sbu_button">
                                      {!this.state.show2 && <button
                                          onClick={() => {
                                            this.setState({show2: true, show1: false})
                                          }}
                                        >
                                          {recEmp_SUBSCRIBE}
                                        </button>}
                                        </div>
                                        {/* <Toggle
                                        
                                          icons={false}
                                          onClick={() =>
                                            this.onToken("Data services")
                                          }
                                        /> */}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
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
