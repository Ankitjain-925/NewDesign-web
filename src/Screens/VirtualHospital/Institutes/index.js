import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import {
  commonHeader,
  commonCometDelHeader,
} from "component/CommonHeader/index";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import { authy } from "Screens/Login/authy.js";
import { houseSelect } from "./selecthouseaction";
import { Redirect, Route } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { getLanguage } from "translations/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: [],
    };
  }
  componentDidMount = () => {
    this.allHouses();
    this.getSetting();
  };

  redirectSpace = (data) => {
    this.props.houseSelect(data);
    this.props.history.push("/VirtualHospital/space");
  };

  getSetting = () => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + "/UserProfile/updateSetting",
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          this.setState({
            timeF: {
              label: responce.data.data.time_format,
              value: responce.data.data.time_format,
            },
            dateF: {
              label: responce.data.data.date_format,
              value: responce.data.data.date_format,
            },
          });
          this.props.Settings(responce.data.data);
        } else {
          this.props.Settings({
            user_id: this.props.stateLoginValueAim.user._id,
          });
        }
        this.setState(
          {
            loaderImage: false,
            languageValue:
              responce.data.data && responce.data.data.language
                ? responce.data.data.language
                : "en",
            mode:
              responce.data.data && responce.data.data.mode
                ? responce.data.data.mode
                : "normal",
          },
          () => {
            this.props.LanguageFetchReducer(this.state.languageValue);
          }
        );
      });
  };

  allHouses = () => {
    this.setState({ loaderImage: true });
    let user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    axios
      .get(
        sitedata.data.path + "/UserProfile/Users/" + user_id,
        commonHeader(user_token)
      )
      .then((response) => {
        this.setState({ loaderImage: false });
        this.setState({
          currentList: response.data.data.houses,
        });
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { Institution } = translate;
    const { stateLoginValueAim, House } = this.props;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      stateLoginValueAim.user.type !== "adminstaff"
    ) {
      return <Redirect to={"/"} />;
    }
    if (House?.value) {
      return <Redirect to={"/VirtualHospital/space"} />;
    }
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "homeBg darkTheme"
            : "homeBg"
        }
      >
        <Grid className="homeBgIner">
          <Grid className="homeBgIner vh-section">
            <Grid container direction="row" justify="center">
              <Grid item xs={12} md={12}>
                <LeftMenuMobile isNotShow={true} currentPage="chat" />
                <Grid container direction="row">
                  {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}

                  {/* Start of Menu */}
                  <Grid item xs={12} md={1} className="MenuLeftUpr">
                    <LeftMenu isNotShow={true} currentPage="chat" />
                  </Grid>

                  <Grid item xs={12} md={11}>
                    <Grid className="topLeftSpc">
                      {/* Start of Bread Crumb */}
                      <Grid className="breadCrumbUpr">
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={12} md={9}>
                            <Grid className="roomBreadCrumb medcalCntr">
                              <ul>
                                <li>
                                  <a>
                                    <label>{Institution}</label>
                                  </a>
                                </li>
                              </ul>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Grid className="settingInfo">
                              <a>
                                <img
                                  src={require("assets/virtual_images/search-entries.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                              <a>
                                <img
                                  src={require("assets/virtual_images/setting.png")}
                                  alt=""
                                  title=""
                                />
                              </a>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* End of Bread Crumb */}

                      <Grid className="wardsGrupUpr">
                        <Grid container direction="row">
                          {this.state.currentList?.length > 0 &&
                            this.state.currentList.map((item) => (
                              <Grid
                                item
                                xs={12}
                                md={4}
                                onClick={() => this.redirectSpace(item)}
                              >
                                <Grid className="medcalFZCntnt">
                                  <Grid>
                                    <a>
                                      <img
                                        src={require("assets/virtual_images/bitmap.png")}
                                        alt=""
                                        title=""
                                      />
                                    </a>
                                  </Grid>
                                  <Grid>
                                    <label>{item.label}</label>
                                  </Grid>
                                  <p>{item.group_name}</p>
                                </Grid>
                              </Grid>
                            ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* End of Right Section */}
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
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { House } = state.houseSelect;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    House,
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
    houseSelect,
  })(Index)
);
