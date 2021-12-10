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
import Collapsible from "react-collapsible";
import sitedata from "sitedata";
import { OptionList } from "Screens/Login/metadataaction";
import "react-toggle/style.css";
import { authy } from "Screens/Login/authy.js";
import {
  getDate,
  getReminder,
  getTime,
  SortByEntry,
} from "Screens/Components/BasicMethod/index";
import { getLanguage } from "translations/index"
import {
  GetShowLabel1,
  GetLanguageDropdown
} from "Screens/Components/GetMetaData/index.js";
import {organDonorLang, KeyLang} from 'Screens/Components/BlockchainEntry/manageLanguage';
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientFullData: {},
    };
    // new Timer(this.logOutClick.bind(this))
  }

  componentDidMount() {
    this.getHyperdata();
  }

  getHyperdata = () => {
    axios
      .post(sitedata.data.path + "/blockchain/dataManager", {
        path: "dataManager/getDetails/patient",
        data: {
          _selfId:
            this.props.stateLoginValueAim &&
            this.props.stateLoginValueAim.user &&
            this.props.stateLoginValueAim.user.profile_id,
          _patientId:
            this.props.stateLoginValueAim &&
            this.props.stateLoginValueAim.user &&
            this.props.stateLoginValueAim.user.profile_id,
        },
      })
      .then((response3) => {
        const allowed = ["Track Record"];
        this.setState({ PatientFullData: response3.data }, () => {
          const filtered = Object.keys(this.state.PatientFullData)
            .filter((key) => allowed.includes(key))
            .reduce((obj, key) => {
              obj[key] = this.state.PatientFullData[key];
              return obj;
            }, {});
          if (filtered["Track Record"] && filtered["Track Record"].length > 0) {
            filtered["Track Record"].sort(SortByEntry);
          }
          this.setState({ PatientFullData1: filtered });
        });
      })
      .catch((err) => {
        axios
          .post(sitedata.data.path + "/blockchain/dataManager", {
            path: "dataManager/generate/token/patient",
            data: { _password: "123456" },
          })
          .then((response5) => {
            axios
              .post(sitedata.data.path + "/blockchain/dataManager", {
                path: "dataManager/add/patient",
                data: {
                  _patientId: this.props.stateLoginValueAim.user.profile_id,
                  _publicKey: response5.data.address,
                  _patientData: {
                    email: this.props.stateLoginValueAim.user.email,
                    "First Name": this.props.stateLoginValueAim.user.first_name,
                    "Last Name": this.props.stateLoginValueAim.user.last_name,
                    DOB: this.props.stateLoginValueAim.user.birthday,
                    Sex: this.props.stateLoginValueAim.user.sex,
                    Address: this.props.stateLoginValueAim.user.city,
                    "Contact Email": this.props.stateLoginValueAim.user.email,
                    Language: this.props.stateLoginValueAim.user.language,
                  },
                },
              })
              .then((response6) => {
                this.getHyperdata();
              });
          });
      });
  };

  getValue = (current_select, value) => {
    if (
      current_select === "date_measured" ||
      current_select === "created_on" ||
      current_select === "diagnosed_on" ||
      current_select === "date_doctor_visits" ||
      current_select === "first_visit_date" ||
      current_select === "from_when" ||
      current_select === "until_when" ||
      current_select === "data_of_vaccination" ||
      current_select === "event_date" ||
      current_select === "prescribed_on" ||
      current_select === "until" ||
      current_select === "dod_onset" ||
      current_select === "dob" ||
      current_select === "last_visit_date" ||
      current_select === "date_doctor_visit"
    ) {
      var dates = getDate(
        value,
        this.props.settings.setting
          ? this.props.settings.setting.date_format
          : "DD/MM/YYYY"
      );
      return dates;
    } else if (current_select === "time_measured") {
      var dates = getTime(
        new Date(value),
        this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.time_format
          ? this.props.settings.setting.time_format
          : "24"
      );
      return dates;
    } else if (
      current_select === "time_taken" ||
      current_select === "reminder_time_taken"
    ) {
      var dates = getReminder(
        value,
        this.props.settings.setting
          ? this.props.settings.setting.time_format
          : "24"
      );
      return dates;
    } else if (
      current_select === "symptoms" ||
      current_select === "remarks" ||
      current_select === "free_text" ||
      current_select === "explanation" 
    ) {
      return <p dangerouslySetInnerHTML={{ __html: value }} />;
    } else {
      return value;
    }
  };

  getOrgans = (optionData) => {
    var rhesus = [];
    optionData = optionData.split(",");
    rhesus = optionData.map((item) => {
      var Alltissues = GetLanguageDropdown(
        this.props?.metadata?.tissue,
        this.props.stateLanguageType
      );
      return GetShowLabel1(
        Alltissues,
        item,
        this.props.stateLanguageType,
        true,
        "organ"
      );
    });
    return rhesus.join(", ");
  };

  render() {
    const { stateLoginValueAim, Doctorsetget } = this.props;
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
      blockchain_access_log,
      organ_donar,
      created_by,
      log_type,
      time_created,
      vaccination
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
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="more" />
                <LeftMenuMobile isNotShow={true} currentPage="more" />
                <Notification />
                {/* End of Website Menu */}

                {/* Website Mid Content */}
                <Grid item xs={12} md={8}>
                  <Grid className="blockChainLog">
                    <h1>{blockchain_access_log}</h1>
                    <Grid className="blockChainDtail1">
                      <Grid className="blockChainUpr">
                        <h2>{organ_donar}</h2>
                        {Object.entries(this.state.PatientFullData).map(
                          ([key, value]) =>
                            key !== "" &&
                            key == "organ_data" && (
                              <div>
                                {Object.entries(value).map(([k, v]) => (
                                  <div>
                                    {k === "selectedOption" && (
                                      <div>
                                        {v === "yes_to_all" && (
                                          <div>
                                            {/* Transplantation of one or more organ
                                            / tissues of mine after doctors have
                                            pronounced me dead */}
                                            {organDonorLang('yes_to_all', this.props.stateLanguageType)}
                                          </div>
                                        )}
                                        {v === "exclude_some" && (
                                          <div>
                                            {/* Transplantation of organ / tissues
                                            of mine after doctors have
                                            pronounced me dead except for
                                            following organ / tissues */}
                                            {organDonorLang('exclude_some', this.props.stateLanguageType)}
                                          </div>
                                        )}
                                        {v === "include_some" && (
                                          <div>
                                            {/* Transplantation of organ / tissues
                                            of mine after doctors have
                                            pronounced me dead only for
                                            following organ / tissues */}
                                            {organDonorLang('include_some', this.props.stateLanguageType)}
                                          </div>
                                        )}
                                        {v === "not_allowed" && (
                                          <div>
                                            {/* NOT allow a transplantation of any
                                            of my organs or tissues */}
                                            {organDonorLang('not_allowed', this.props.stateLanguageType)}
                                          </div>
                                        )}
                                        {v === "decided_by_following" && (
                                          <div>
                                            {/* Transplantation of one or more organ
                                            / tissues of mine after doctors have
                                            pronounced me dead YES or NO shall
                                            be decided by the following person */}
                                            {organDonorLang('decided_by_following', this.props.stateLanguageType)}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    {/* {k==='free_remarks' && <div>{v}</div>} */}
                                    {k === "OptionData" && (
                                      <div>
                                        {typeof v === "string" && (
                                          <div>{this.getOrgans(v)}</div>
                                        )}
                                        {typeof v !== "string" &&
                                          Object.entries(v).map(([k1, v1]) => (
                                            <Grid container direction="row">
                                              <Grid item xs={5} md={5}>
                                                <span>
                                                {KeyLang(k1, this.props.stateLanguageType)}
                                                  {/* {k1.charAt(0).toUpperCase() +
                                                    k1
                                                      .slice(1)
                                                      .replace("_", " ")} */}
                                                </span>
                                              </Grid>
                                              <Grid item xs={7} md={7}>
                                                <label>{v1}</label>
                                              </Grid>
                                            </Grid>
                                          ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )
                        )}
                      </Grid>
                    </Grid>
                    
                    <Grid className="blockChainDtail1">
                      <Grid className="blockChainUpr">
                        <h2>{vaccination}</h2>
                        {Object.entries(this.state.PatientFullData).map(
                          ([key, value]) =>
                            key !== "" &&
                            key == "Vaccination" && (
                              <div>
                                {Object.entries(value).map(([k, v]) => (
                                  <div>
                                    {Object.entries(v).map(([k1, v1]) => (
                                      <span className="setVaccination">
                                       {k1 !== 'date' &&  <label> : {v1}</label> }
                                       {k1 === 'date' && <label> {getDate(
                                          v1,
                                          this.props.settings.setting
                                            ? this.props.settings
                                                .setting.date_format
                                            : "DD/MM/YYYY"
                                       )}</label>}
                                      </span>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            )
                        )}
                      </Grid>
                    </Grid>


                    <Grid className="blockChainDtail">
                      <Grid className="blockChainUpr">
                        <Grid className="blochChainHead">
                          <Grid>
                            <label>{log_type}</label>
                          </Grid>
                          <Grid>
                            <label>{created_by}</label>
                          </Grid>
                          <Grid>
                            <label>{time_created}</label>
                          </Grid>
                        </Grid>
                        {this.state.PatientFullData1 &&
                          Object.entries(this.state.PatientFullData1).map(
                            ([key, value]) =>
                              key !== "" &&
                              key == "Track Record" && (
                                <div>
                                  {typeof value !== "string" && (
                                    <div>
                                      {Object.entries(value).map(([k, v]) => (
                                        <div>
                                          <Grid className="blochChainIner">
                                            <Grid>
                                              <label>
                                              {KeyLang(v.type, this.props.stateLanguageType)}
                                                {/* {v.type &&
                                                  v.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    v.type
                                                      .slice(1)
                                                      .replaceAll("_", " ")} */}
                                              </label>
                                            </Grid>
                                            <Grid>
                                              <label>
                                                {v.created_by_temp &&
                                                  v.created_by_temp}
                                              </label>
                                            </Grid>
                                            <Grid>
                                              <label>
                                                {v.created_on &&
                                                  getDate(
                                                    v.created_on,
                                                    this.props.settings.setting
                                                      ? this.props.settings
                                                          .setting.date_format
                                                      : "DD/MM/YYYY"
                                                  )}
                                              </label>
                                            </Grid>
                                            <img
                                              src={require("assets/images/down2.png")}
                                              alt=""
                                              title=""
                                              className="cstmDown"
                                            />
                                          </Grid>
                                          <Collapsible trigger="">
                                            <Grid
                                              container
                                              direction="row"
                                              className="subsDetails"
                                            >
                                              <Grid item xs={12} md={10}>
                                                {k !== "" &&
                                                typeof v === "string" ? (
                                                  <Grid
                                                    container
                                                    direction="row"
                                                  >
                                                    <Grid item xs={12} md={5}>
                                                      <span>{k}</span>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                      <label>{v}</label>
                                                    </Grid>
                                                  </Grid>
                                                ) : (
                                                  <div>
                                                    {Object.entries(v).map(
                                                      ([k1, v1]) =>
                                                        k1 !== "" &&
                                                        k1 !==
                                                          "created_by_image" &&
                                                        k1 !== "track_id" &&
                                                        k1 !==
                                                          "created_by_temp2" &&
                                                        k1 !==
                                                          "created_by_profile" &&
                                                        k1 !== "review_by" &&
                                                        k1 !== "review_on" &&
                                                        k1 !==
                                                          "review_by_temp" &&
                                                        k1 !==
                                                          "emergency_by_temp" &&
                                                        k1 !== "created_at" &&
                                                        k1 !== "created_by" &&
                                                        k1 !== "public" &&
                                                        k1 !== "emergency_on" &&
                                                        k1 !== "visible" &&
                                                        k1 !== "emergency_by" &&
                                                        k1 !==
                                                          "created_by_temp" &&
                                                        k1 !==
                                                          "created_on" &&
                                                        k1 !==
                                                          "patient_profile_id" &&
                                                        k1 !==
                                                          "pharmacy_id" &&
                                                        k1 !== "datetime_on" &&
                                                        k1 !== "type" &&
                                                        k1 !==
                                                          "publicdatetime" &&
                                                        typeof v1 ===
                                                          "string" && (
                                                          <Grid
                                                            container
                                                            direction="row"
                                                          >
                                                            <Grid
                                                              item
                                                              xs={12}
                                                              md={5}
                                                            >
                                                              <span>
                                                              {KeyLang(k1, this.props.stateLanguageType)}
                                                                {/* {k1
                                                                  .charAt(0)
                                                                  .toUpperCase() +
                                                                  k1
                                                                    .slice(1)
                                                                    .replaceAll(
                                                                      "_",
                                                                      " "
                                                                    )} */}
                                                              </span>
                                                            </Grid>
                                                            <label>
                                                              {this.getValue(
                                                                k1,
                                                                v1
                                                              )}
                                                            </label>
                                                          </Grid>
                                                        )
                                                    )}
                                                  </div>
                                                )}
                                              </Grid>
                                            </Grid>
                                          </Collapsible>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Website Right Content */}
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
  const { metadata } = state.OptionList;
  // const {Doctorsetget} = state.Doctorset;
  // const {catfil} = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    metadata,
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
    OptionList
  })(Index)
);
