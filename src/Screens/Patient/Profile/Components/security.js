import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "./../../../Login/actions";
import { LanguageFetchReducer } from "./../../../actions";
import { Settings } from "./../../../Login/setting";
import { withRouter } from "react-router-dom";

import sitedata from "../../../../sitedata";
import axios from "axios";
import Loader from "./../../../Components/Loader/index";
import {
  translationAR,
  translationSW,
  translationSP,
  translationRS,
  translationEN,
  translationNL,
  translationDE,
  translationCH,
  translationPT,
  translationFR
} from "translations/index"

var letter = /([a-zA-Z])+([ -~])*/,
  number = /\d+/,
  specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Current_state: this.props.LoggedInUser,
      Password: {},
      is2fa: this.props.LoggedInUser.is2fa,
      is2faDone: false,
      PassDone: false,
      notmatch: false,
      loaderImage: false,
      fillall: false,
    };
  }

  //For Change Password State
  ChangePass = (e) => {
    const state = this.state.Password;
    state[e.target.name] = e.target.value;
    this.setState({ Password: state }, () => {
      if (
        this.state.Current_state.password !== this.state.Password.current_pass
      ) {
        this.setState({ notmatch: true, fillall: false });
      } else {
        this.setState({ notmatch: false, fillall: false });
      }
    });
  };

  // For Change Password
  ChangePassword = () => {
    if (
      this.state.Password.new_pass &&
      this.state.Password.new_pass !== "" &&
      this.state.Password.current_pass &&
      this.state.Password.current_pass !== ""
    ) {
      if (!this.state.notmatch) {
        if (
          this.state.Password.new_pass !== "" &&
          this.state.Password.new_pass === this.state.Password.new_pass_comfirm
        ) {
          this.setState({
            notVlidpass: false,
            notmatchCon: false,
            loaderImage: true,
            fillall: false,
          });
          if (
            this.state.Password.new_pass.match(letter) &&
            this.state.Password.new_pass.match(number) &&
            this.state.Password.new_pass.match(specialchar)
          ) {
            axios
              .put(
                sitedata.data.path + "/UserProfile/Users/update",
                {
                  password: this.state.Password.new_pass,
                },
                {
                  headers: {
                    token: this.props.user_token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((responce) => {
                this.setState({ PassDone: true, loaderImage: false });
                setTimeout(() => {
                  this.setState({ PassDone: false });
                }, 5000);
              });
          } else {
            this.setState({
              notmatchCon: false,
              notVlidpass: true,
              loaderImage: false,
              fillall: false,
            });
          }
        } else {
          this.setState({ notmatchCon: true, fillall: false });
        }
      }
    } else {
      this.setState({ fillall: true });
    }
  };

  //For Change Password State For version V4
  // ChangePass = (e) => {
  //   const state = this.state.Password;
  //   state[e.target.name] = e.target.value;
  //   if (
  //     e.target.value &&
  //     e.target.value.length > 0 &&
  //     e.target.name === "current_pass"
  //   ) {
  //     axios
  //       .post(
  //         sitedata.data.path + "/UserProfile/Users/checkPass",
  //         {
  //           password: this.state.Password.current_pass,
  //         },
  //         {
  //           headers: {
  //             token: this.props.user_token,
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((responce) => {
  //         if (responce.data.data) {
  //           this.setState({ notmatch: false, fillall: false });
  //         } else {
  //           this.setState({ notmatch: true, fillall: false });
  //         }
  //       });
  //   }
  //   this.setState({ Password: state });
  // };

  // //For Change Password
  // ChangePassword = () => {
  //   if (
  //     this.state.Password.new_pass &&
  //     this.state.Password.new_pass !== "" &&
  //     this.state.Password.current_pass &&
  //     this.state.Password.current_pass !== ""
  //   ) {
  //     if (!this.state.notmatch) {
  //       if (
  //         this.state.Password.new_pass !== "" &&
  //         this.state.Password.new_pass === this.state.Password.new_pass_comfirm
  //       ) {
  //         this.setState({
  //           notVlidpass: false,
  //           notmatchCon: false,
  //           loaderImage: true,
  //           fillall: false,
  //         });
  //         if (
  //           this.state.Password.new_pass.match(letter) &&
  //           this.state.Password.new_pass.match(number) &&
  //           this.state.Password.new_pass.match(specialchar)
  //         ) {
  //           axios
  //             .put(
  //               sitedata.data.path + "/UserProfile/Users/changePass",
  //               {
  //                 password: this.state.Password.new_pass,
  //               },
  //               {
  //                 headers: {
  //                   token: this.props.user_token,
  //                   Accept: "application/json",
  //                   "Content-Type": "application/json",
  //                 },
  //               }
  //             )
  //             .then((responce) => {
  //               this.setState({ PassDone: true, loaderImage: false });
  //               setTimeout(() => {
  //                 this.setState({ PassDone: false });
  //               }, 5000);
  //             });
  //         } else {
  //           this.setState({
  //             notmatchCon: false,
  //             notVlidpass: true,
  //             loaderImage: false,
  //             fillall: false,
  //           });
  //         }
  //       } else {
  //         this.setState({ notmatchCon: true, fillall: false });
  //       }
  //     }
  //   } else {
  //     this.setState({ fillall: true });
  //   }
  // };

  // for Enable/Disable 2fa
  Change2fa = () => {
    this.setState({ is2fa: !this.state.is2fa }, () => {
      this.setState({ loaderImage: true });
      axios
        .put(
          sitedata.data.path + "/UserProfile/Users/update",
          {
            is2fa: this.state.is2fa,
          },
          {
            headers: {
              token: this.props.user_token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((responce) => {
          this.setState({ is2faDone: true, loaderImage: false });
          setTimeout(() => {
            this.setState({ is2faDone: false });
          }, 5000);
        });
    });
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
      Change,
      password,
      is,
      we_use_authy,
      supportive_text,
      Passwordisnotvalid,
      Current,
      confirm_password,
      new_password,
      two_fac_auth,
      password_changed,
      new_and_confirm_pass_not_same,
      enabled,
      disabled,
      current_pass_not_match,
      plz_fill_fields,
      Register_characters,
      Disable,
      Enable,
      change_password,
      Register_Passwordshould,
      Register_letter,
      Register_number,
      Register_special,
    } = translate;

    return (
      <div>
        {this.state.loaderImage && <Loader />}
        {this.state.PassDone && (
          <div className="success_message">{password_changed}</div>
        )}
        {this.state.notVlidpass && (
          <div className="err_message">{Passwordisnotvalid}</div>
        )}
        {this.state.notmatchCon && (
          <div className="err_message">{new_and_confirm_pass_not_same}</div>
        )}
        {this.state.notmatch && (
          <div className="err_message">{current_pass_not_match}</div>
        )}
        {this.state.fillall && (
          <div className="err_message">{plz_fill_fields}</div>
        )}
        {this.state.is2faDone && (
          <div className="success_message">
            {two_fac_auth} {this.state.is2fa ? enabled : disabled}
          </div>
        )}
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} md={5}>
            <Grid className="chngPasswrd">
              <h2>{change_password}</h2>
              {/* <p>{supportive_text}</p> */}
            </Grid>
            <Grid className="genPass">
              <Grid className="genPassInr">
                <label>
                  {Current} {password}
                </label>
                <Grid>
                  <input
                    type="password"
                    name="current_pass"
                    onChange={this.ChangePass}
                  />
                </Grid>
              </Grid>
              <Grid className="genPassInr RelativeatSecurity">
                <label>{new_password}</label>
                <Grid>
                  <input
                    type="password"
                    name="new_pass"
                    onChange={this.ChangePass}
                  />
                </Grid>

                {this.state.Password && this.state.Password.new_pass ? (
                  <div className="passInst">
                    <div className="passInstIner ">
                      <p>{Register_Passwordshould}</p>
                      <img
                        src={require("../../../../assets/images/passArrow.png")}
                        alt=""
                        title=""
                        className="passArow"
                      />
                      <ul>
                        <li>
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            this.state.Password.new_pass.length > 8 && (
                              <a>
                                <img
                                  src={require("../../../../assets/images/CheckCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_characters}
                              </a>
                            )}
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            this.state.Password.new_pass.length <= 8 && (
                              <a>
                                <img
                                  src={require("../../../../assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_characters}
                              </a>
                            )}
                        </li>
                        <li>
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            !this.state.Password.new_pass.match(letter) && (
                              <a>
                                <img
                                  src={require("../../../../assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_letter}
                              </a>
                            )}
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            this.state.Password.new_pass.match(letter) && (
                              <a>
                                <img
                                  src={require("../../../../assets/images/CheckCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_letter}
                              </a>
                            )}
                        </li>
                        <li>
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            !this.state.Password.new_pass.match(number) && (
                              <a>
                                <img
                                  src={require("../../../../assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_number}
                              </a>
                            )}
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            this.state.Password.new_pass.match(number) && (
                              <a>
                                <img
                                  src={require("../../../../assets/images/CheckCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_number}
                              </a>
                            )}
                        </li>
                        <li>
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            !this.state.Password.new_pass.match(
                              specialchar
                            ) && (
                              <a>
                                <img
                                  src={require("../../../../assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_special}
                              </a>
                            )}
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            this.state.Password.new_pass.match(specialchar) && (
                              <a>
                                <img
                                  src={require("../../../../assets/images/CheckCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_special}
                              </a>
                            )}
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="passInst">
                    <div className="passInstIner">
                      <p>{Register_Passwordshould}</p>
                      <img
                        src={require("../../../../assets/images/passArrow.png")}
                        alt=""
                        title=""
                        className="passArow"
                      />
                      <ul>
                        <li>
                          <a>
                            <img
                              src={require("../../../../assets/images/CloseCircle.svg")}
                              alt=""
                              title=""
                            />
                            {Register_characters}
                          </a>
                        </li>
                        <li>
                          <a>
                            <img
                              src={require("../../../../assets/images/CloseCircle.svg")}
                              alt=""
                              title=""
                            />
                            {Register_letter}
                          </a>
                        </li>
                        <li>
                          <a>
                            <img
                              src={require("../../../../assets/images/CloseCircle.svg")}
                              alt=""
                              title=""
                            />
                            {Register_number}
                          </a>
                        </li>
                        <li>
                          <a>
                            <img
                              src={require("../../../../assets/images/CloseCircle.svg")}
                              alt=""
                              title=""
                            />
                            {Register_special}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </Grid>
              <Grid className="genPassInr">
                <label>{confirm_password}</label>
                <Grid>
                  <input
                    type="password"
                    name="new_pass_comfirm"
                    onChange={this.ChangePass}
                  />
                </Grid>
              </Grid>
              <Grid className="genPassInr">
                <Grid>
                  <input
                    type="submit"
                    value={change_password}
                    onClick={this.ChangePassword}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid className="twofactorAuth">
              <Grid className="factorAuth">
                <h3>{two_fac_auth}</h3>
                <p>{we_use_authy}</p>
              </Grid>
              <Grid className="factorAuthEnbl">
                <h4>
                  {this.state.is2fa && (
                    <img
                      src={require("../../../../assets/images/watched.svg")}
                      alt=""
                      title=""
                    />
                  )}{" "}
                  {two_fac_auth} {is} {this.state.is2fa ? enabled : disabled}
                </h4>
                <Grid>
                  <input
                    type="submit"
                    onClick={this.Change2fa}
                    value={
                      this.state.is2fa
                        ? `${Disable} ${two_fac_auth}`
                        : `${Enable} ${two_fac_auth}`
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7}></Grid>
        </Grid>
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
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
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
