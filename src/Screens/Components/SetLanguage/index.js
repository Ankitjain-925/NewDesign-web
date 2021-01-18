import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { LoginReducerAim } from "../../Login/actions";
import { Settings } from "../../Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "../../actions";
import sitedata from "../../../sitedata";
import Loader from "../../Components/Loader/index";
import axios from "axios";

import * as translationEN from "../../../translations/en.json";
import * as translationDE from "../../../translations/de.json";
import * as translationPT from "../../../translations/pt.json";
import * as translationSP from "../../../translations/sp.json";
import * as translationRS from "../../../translations/rs.json";
import * as translationSW from "../../../translations/sw.json";
import * as translationCH from "../../../translations/ch.json";
import * as translationNL from "../../../translations/nl.json";
import * as translationFR from "../../../translations/fr.json";
import * as translationAR from "../../../translations/ar.json";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFancyLanguage: this.props.openFancyLanguage,
      languageValue: this.props.languageValue,
      loaderImage: false,
    };
  }

  //For close the pop up
  handleCloseFancyLanguage = () => {
    this.props.handleCloseFancyLanguage();
  };

  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.openFancyLanguage !== this.props.openFancyLanguage) {
      this.setState({ openFancyLanguage: this.props.openFancyLanguage });
    }
    if (prevProps.languageValue !== this.props.languageValue) {
      this.setState({ languageValue: this.props.languageValue });
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.languageValue !== this.state.languageValue ||
      nextState.openFancyLanguage !== this.state.openFancyLanguage ||
      nextProps.languageValue !== this.props.languageValue ||
      nextProps.openFancyLanguage !== this.props.openFancyLanguage
    );
  }

  // Change Language function
  changeLanguage = (e) => {
    this.setState({ languageValue: e.target.value });
  };
  //For set the language
  SetLanguage = () => {
    this.setState({ loaderImage: true });
    if (!this.state.languageValue) {
      this.setState({ loaderImage: false, languageBlank: true });
    } else {
      this.setState({ languageBlank: false });
      axios
        .put(
          sitedata.data.path + "/UserProfile/updateSetting",
          {
            language: this.state.languageValue,
            user_id: this.props.stateLoginValueAim.user._id,
            user_profile_id: this.props.stateLoginValueAim.user.profile_id,
          },
          {
            headers: {
              token: this.props.stateLoginValueAim.token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((responce) => {
          this.setState({ PassDone: true, loaderImage: false });
          this.props.getSetting();
          setTimeout(() => {
            this.setState({ PassDone: false });
            this.handleCloseFancyLanguage();
          }, 5000);
        });
    }
  };

  render() {
    let translate = {};
    switch (this.props.stateLanguageType) {
      case "en":
        translate = translationEN.text;
        break;
      case "de":
        translate = translationDE.text;
        break;
      case "pt":
        translate = translationPT.text;
        break;
      case "sp":
        translate = translationSP.text;
        break;
      case "rs":
        translate = translationRS.text;
        break;
      case "nl":
        translate = translationNL.text;
        break;
      case "ch":
        translate = translationCH.text;
        break;
      case "sw":
        translate = translationSW.text;
        break;
      case "fr":
        translate = translationFR.text;
        break;
      case "ar":
        translate = translationAR.text;
        break;
      default:
        translate = translationEN.text;
    }
    let {
      language_updated,
      save_change,
      select_Language,
      language_not_selected,
      select,
      Language,
    } = translate;
    return (
      <div>
        {this.state.loaderImage && <Loader />}
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={this.state.openFancyLanguage}
          className={
            this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode === "dark"
              ? "darkTheme"
              : ""
          }
          onClose={this.handleCloseFancyLanguage}
        >
          <Grid className="LanguageBoxMain">
            <Grid className="nwPresCourse">
              <Grid className="nwPresCloseBtn">
                <a onClick={this.handleCloseFancyLanguage}>
                  <img
                    src={require("../../../assets/images/close-search.svg")}
                    alt=""
                    title=""
                  />
                </a>
              </Grid>
              <Grid>
                <label>{select_Language}</label>
              </Grid>
            </Grid>
            {this.state.PassDone && (
              <div className="success_message">{language_updated}</div>
            )}
            {this.state.languageBlank && (
              <div className="err_message">{language_not_selected}</div>
            )}
            {/* <div className="languageHead"></div> */}
            <Grid className="languageBox">
              <Grid className="row">
                <Grid className="col-xl-6">
                  <Grid>
                    <input
                      value="ar"
                      onChange={this.changeLanguage}
                      name="language"
                      type="radio"
                      checked={
                        this.state.languageValue == "ar" ? "checked" : ""
                      }
                    />
                    <label>
                      <img
                        src={require("../../../assets/images/Arabic.jpg")}
                        alt="Arabic"
                        title="Arabic"
                      />
                      Arabian (عربى)
                    </label>
                  </Grid>
                  <Grid>
                    <input
                      value="ch"
                      onChange={this.changeLanguage}
                      name="language"
                      type="radio"
                      checked={
                        this.state.languageValue == "ch" ? "checked" : ""
                      }
                    />
                    <label>
                      <img
                        src={require("../../../assets/images/Chinese.png")}
                        alt="Chinese"
                        title="Chinese"
                      />
                      Chinese (中文)
                    </label>
                  </Grid>
                  <Grid>
                    <input
                      value="nl"
                      onChange={this.changeLanguage}
                      name="language"
                      type="radio"
                      checked={
                        this.state.languageValue == "nl" ? "checked" : ""
                      }
                    />
                    <label>
                      <img
                        src={require("../../../assets/images/Dutch.jpg")}
                        alt="Dutch"
                        title="Dutch"
                      />
                      Dutch (Nederlands)
                    </label>
                  </Grid>
                  <Grid>
                    <input
                      value="en"
                      onChange={this.changeLanguage}
                      name="language"
                      type="radio"
                      checked={
                        this.state.languageValue == "en" ? "checked" : ""
                      }
                    />
                    <label>
                      <img
                        src={require("../../../assets/images/english.png")}
                        alt="English"
                        title="English"
                      />
                      English (English)
                    </label>
                  </Grid>
                  <Grid>
                    <input
                      value="fr"
                      onChange={this.changeLanguage}
                      name="language"
                      type="radio"
                      checked={
                        this.state.languageValue == "fr" ? "checked" : ""
                      }
                    />
                    <label>
                      <img
                        src={require("../../../assets/images/France.png")}
                        alt="French"
                        title="French"
                      />
                      French (Francais)
                    </label>
                  </Grid>
                </Grid>
                <Grid className="col-xl-6">
                  <Grid>
                    <input
                      value="de"
                      onChange={this.changeLanguage}
                      name="language"
                      type="radio"
                      checked={
                        this.state.languageValue == "de" ? "checked" : ""
                      }
                    />
                    <label>
                      <img
                        src={require("../../../assets/images/german.jpg")}
                        alt="Germany"
                        title="Germany"
                      />
                      German (Deutsch)
                    </label>
                  </Grid>
                  <Grid>
                    <input
                      value="pt"
                      onChange={this.changeLanguage}
                      name="language"
                      type="radio"
                      checked={
                        this.state.languageValue == "pt" ? "checked" : ""
                      }
                    />
                    <label>
                      <img
                        src={require("../../../assets/images/Portugal.png")}
                        alt="Portuguese"
                        title="Portuguese"
                      />
                      Portuguese (Portugués)
                    </label>
                  </Grid>
                  <Grid>
                    <input
                      value="rs"
                      onChange={this.changeLanguage}
                      name="language"
                      type="radio"
                      checked={
                        this.state.languageValue == "rs" ? "checked" : ""
                      }
                    />
                    <label>
                      <img
                        src={require("../../../assets/images/Russian.jpg")}
                        alt="Russian"
                        title="Russian"
                      />
                      Russian (русский)
                    </label>
                  </Grid>
                  <Grid>
                    <input
                      value="sp"
                      onChange={this.changeLanguage}
                      name="language"
                      type="radio"
                      checked={
                        this.state.languageValue == "sp" ? "checked" : ""
                      }
                    />
                    <label>
                      <img
                        src={require("../../../assets/images/Spanish.png")}
                        alt="Spanish"
                        title="Spanish"
                      />
                      Spanish (Español)
                    </label>
                  </Grid>
                  <Grid>
                    <input
                      value="sw"
                      onChange={this.changeLanguage}
                      name="language"
                      type="radio"
                      checked={
                        this.state.languageValue == "sw" ? "checked" : ""
                      }
                    />
                    <label>
                      <img
                        src={require("../../../assets/images/Swahili.jpg")}
                        alt="Swahili"
                        title="Swahili"
                      />
                      Swahili (Kiswahili)
                    </label>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="infoShwHidBrdr2"></Grid>
            <Grid className="infoShwHidIner2">
              <Grid className="infoShwSave2">
                <input
                  type="submit"
                  value={save_change}
                  onClick={this.SetLanguage}
                />
              </Grid>
            </Grid>
          </Grid>
        </Modal>
      </div>
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
  // const {Doctorsetget} = state.Doctorset;
  // const {catfil} = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    //   Doctorsetget,
    //   catfil
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);
