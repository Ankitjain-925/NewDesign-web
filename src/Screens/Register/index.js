import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { LanguageFetchReducer } from "../actions";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from "../Login/actions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import sitedata from "../../sitedata";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import "react-flags-select/scss/react-flags-select.scss";
import Loader from "./../Components/Loader/index";
import { Settings } from "../Login/setting";
import Toggle from "react-toggle";
import "../../assets/css/style_log.css";
import {
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import * as translationEN from "../../translations/en.json";
import * as translationDE from "../../translations/de";
import * as translationSP from "../../translations/sp.json";
import * as translationCH from "../../translations/ch";
import * as translationPT from "../../translations/pt";
import * as translationRS from "../../translations/rs";
import * as translationNL from "../../translations/nl";
import * as translationSW from "../../translations/sw";
import * as translationFR from "../../translations/fr";
import * as translationAR from "../../translations/ar";
import contry from "./../Components/countryBucket/countries.json";
//Values for the validate Password
var letter = /([a-zA-Z])+([ -~])*/,
  number = /\d+/,
  specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      password: "",
      dropDownValue: "Select",
      inputEmail: "",
      inputPass: "",
      selectedOption: "",
      userDetails: {},
      successfull: false,
      loaderImage: false,
      current_select: "",
      regisError1: "",
      regisError2: "",
      regisError3: "",
      regisError: "",
      regisError0: "",
      registerMessage: "",
      error_msg: "",
      uploadLicence: {},
      hidden: true,
      hidden_confirm: true,
      fileupods: false,
      FilesUp: [],
      fileattach: [],
      mode:
        this.props.settings &&
        this.props.settings.setting &&
        this.props.settings.setting.mode
          ? this.props.settings.setting.mode
          : "normal",
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  //For validate the email is correct or not
  validateEmail = (elementValue) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  };

  //For login link
  login = () => {
    this.props.history.push("/");
  };

  //For save data of user
  saveUserData() {
    this.setState({
      regisError: "",
      regisError1: "",
      regisError2: "",
      regisError3: "",
      regisError0: "",
      error_msg: "",
    });
    if (
      this.state.userDetails.first_name &&
      this.state.userDetails.last_name &&
      this.state.userDetails.first_name !== "" &&
      this.state.userDetails.last_name !== ""
    ) {
      if (this.validateEmail(this.state.userDetails.email)) {
        if (
          this.state.userDetails &&
          this.state.userDetails.password &&
          this.state.userDetails.password.match(letter) &&
          this.state.userDetails.password.match(number) &&
          this.state.userDetails.password.match(specialchar)
        ) {
          if (
            this.state.userDetails.mobile &&
            this.state.userDetails.mobile !== ""
          ) {
            if (this.state.selectedOption !== "") {
              if (this.state.userDetails.terms_and_conditions) {
                if (this.state.selectedOption == "patient") {
                  this.setState({ loaderImage: true });
                  if (this.state.userDetails.country_code) {
                    var country_code = this.state.userDetails.country_code;
                  } else {
                    var country_code = "de";
                  }
                  var getBucket =
                    contry &&
                    contry.length > 0 &&
                    contry.filter(
                      (value, key) => value.code === country_code.toUpperCase()
                    );
                  axios
                    .post(sitedata.data.path + "/UserProfile/AddUser/", {
                      type: this.state.selectedOption,
                      email: this.state.userDetails.email,
                      password: this.state.userDetails.password,
                      country_code: country_code,
                      mobile: this.state.userDetails.mobile,
                      is2fa: this.state.userDetails.is2fa,
                      lan: this.props.stateLanguageType,
                      first_name: this.state.userDetails.first_name,
                      last_name: this.state.userDetails.last_name,
                      bucket: getBucket[0].bucket,
                    })
                    .then((responce) => {
                      this.setState({ loaderImage: false });
                      if (responce.data.hassuccessed === true) {
                        axios
                          .post(
                            "https://api-eu.cometchat.io/v2.0/users",
                            {
                              uid: responce.data.data.profile_id,
                              name:
                                responce.data.data.first_name +
                                " " +
                                responce.data.data.last_name,
                            },
                            {
                              headers: {
                                'appId': '220824e717b58ac',
                                'apiKey': 'fc177a4e50f38129dca144f6270b91bfc9444736',
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                            }
                          )
                          .then((res) => {});

                        this.setState({ successfull: true });
                        this.setState({
                          registerMessage:
                            "You are registered successfully, Please check your email for verification.",
                        });
                      } else {
                        this.setState({ successfull: false });
                        this.setState({ error_msg: responce.data.message });
                      }
                    })
                    .catch((err) => {});
                }
                if (
                  this.state.selectedOption == "pharmacy" ||
                  this.state.selectedOption == "nurse" ||
                  this.state.selectedOption == "doctor"
                ) {
                  this.setState({ loaderImage: true });
                  if (this.state.userDetails.country_code) {
                    var country_code = this.state.userDetails.country_code;
                  } else {
                    var country_code = "de";
                  }
                  var getBucket =
                    contry &&
                    contry.length > 0 &&
                    contry.filter(
                      (value, key) => value.code === country_code.toUpperCase()
                    );
                  if (this.state.selectedOption == "doctor") {
                    this.saveDoctor(country_code);
                  } else {
                    axios
                      .post(sitedata.data.path + "/UserProfile/AddUser/", {
                        type: this.state.selectedOption,
                        email: this.state.userDetails.email,
                        password: this.state.userDetails.password,
                        country_code: country_code,
                        mobile: this.state.userDetails.mobile,
                        is2fa: this.state.userDetails.is2fa,
                        lan: this.props.stateLanguageType,
                        first_name: this.state.userDetails.first_name,
                        last_name: this.state.userDetails.last_name,
                        bucket: getBucket[0].bucket,
                      })
                      .then((responce) => {
                        this.setState({ loaderImage: false });
                        if (responce.data.hassuccessed === true) {
                          if (this.state.selectedOption == "nurse") {
                            axios
                              .post(
                                "https://api-eu.cometchat.io/v2.0/users",
                                {
                                  uid: responce.data.data.profile_id,
                                  name:
                                    responce.data.data.first_name +
                                    " " +
                                    responce.data.data.last_name,
                                },
                                {
                                  headers: {
                                    'appId': '220824e717b58ac',
                                    'apiKey': 'fc177a4e50f38129dca144f6270b91bfc9444736',
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                  },
                                }
                              )
                              .then((res) => {});
                          }

                          this.setState({ successfull: true });
                          this.setState({
                            registerMessage:
                              "You are registered successfully, Please check your email for verification.",
                          });
                        } else {
                          this.setState({ successfull: false });
                          this.setState({ error_msg: responce.data.message });
                        }
                      });
                  }
                }
              } else {
                this.setState({
                  regisError0: "Please agree to our terms and conditions",
                });
              }
            } else {
              this.setState({ regisError0: "Please select user type" });
            }
          } else {
            this.setState({ regisError0: "Please fill mobile number" });
          }
        } else {
          this.setState({ regisError0: "Password is not valid" });
        }
      } else {
        this.setState({ regisError0: "E-mail is not valid" });
      }
    } else {
      this.setState({ regisError0: "Please fill the full name of user" });
    }
  }

  //For the set state of the Registration
  handleChange = (e) => {
    const state = this.state.userDetails;
    if (
      (e.target.name === "terms_and_conditions" ||
        e.target.name === "license_of_practice",
      e.target.name === "is2fa")
    ) {
      state[e.target.name] = e.target.checked;
    } else {
      state[e.target.name] = e.target.value;
    }
    this.setState({ userDetails: state });
  };

  //For upload the Doctor Liscence
  UploadFile(e) {
    this.setState({ FilesUp: e.target.files, loaderImage: true });
    setTimeout(() => {
      this.setState({ loaderImage: false });
    }, 3000);
    var Preview = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].name.split(".").pop() === "mp4") {
        Preview.push(require("../../assets/images/videoIcon.png"));
      }
      if (e.target.files[i].name.split(".").pop() === "pdf") {
        Preview.push(require("../../assets/images/pdfimg.png"));
      } else if (
        e.target.files[i].name.split(".").pop() === "doc" ||
        e.target.files[i].name.split(".").pop() === "docx" ||
        e.target.files[i].name.split(".").pop() === "xml" ||
        e.target.files[i].name.split(".").pop() === "txt"
      ) {
        Preview.push(require("../../assets/images/txt1.png"));
      } else if (
        e.target.files[i].name.split(".").pop() === "xls" ||
        e.target.files[i].name.split(".").pop() === "xlsx" ||
        e.target.files[i].name.split(".").pop() === "xml"
      ) {
        Preview.push(require("../../assets/images/xls1.svg"));
      } else if (e.target.files[i].name.split(".").pop() === "csv") {
        Preview.push(require("../../assets/images/csv1.png"));
      } else if (
        e.target.files[i].name.split(".").pop() === "dcm" ||
        e.target.files[i].name.split(".").pop() === "DCM" ||
        e.target.files[i].name.split(".").pop() === "DICOM" ||
        e.target.files[i].name.split(".").pop() === "dicom"
      ) {
        Preview.push(require("../../assets/images/dcm1.png"));
      } else {
        Preview.push(URL.createObjectURL(e.target.files[i]));
      }
    }
    this.setState({ fileattach: Preview });
  }

  //For save the doctor
  saveDoctor = (country_code) => {
    this.setState({ isfileuploadmulti: true });
    var getBucket =
      contry &&
      contry.length > 0 &&
      contry.filter((value, key) => value.code === country_code.toUpperCase());
    if (this.state.FilesUp && this.state.FilesUp.length > 0) {
      for (var i = 0; i < this.state.FilesUp.length; i++) {
        var file = this.state.FilesUp[i];
        let fileParts = this.state.FilesUp[i].name.split(".");
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        axios
          .post(sitedata.data.path + "/aws/sign_s3", {
            fileName: fileName,
            fileType: fileType,
            folders: "registration/",
            bucket: getBucket[0].bucket,
          })
          .then((response) => {
            this.setState(
              {
                uploadLicence: {
                  url:
                    response.data.data.returnData.url +
                    "&bucket=" +
                    getBucket[0].bucket,
                },
              },
              () => {
                this.getUpdate(country_code, getBucket);
              }
            );

            var returnData = response.data.data.returnData;
            var signedRequest = returnData.signedRequest;
            var url = returnData.url;
            if (fileType === "pdf") {
              fileType = "application/pdf";
            }
            // Put the fileType in the headers for the upload
            var options = { headers: { "Content-Type": fileType } };
            axios
              .put(signedRequest, file, options)
              .then((result) => {
                this.setState({ success: true, loaderImage: false });
              })
              .catch((error) => {});
          })
          .catch((error) => {});
      }
    } else {
      this.getUpdate(country_code, getBucket);
    }
  };
  getUpdate = (country_code, getBucket) => {
    axios
      .post(sitedata.data.path + "/UserProfile/AddUser/", {
        type: this.state.selectedOption,
        email: this.state.userDetails.email,
        password: this.state.userDetails.password,
        licence: this.state.uploadLicence,
        licence_detail: this.state.userDetails.upload_licence,
        country_code: country_code,
        mobile: this.state.userDetails.mobile,
        is2fa: this.state.userDetails.is2fa,
        lan: this.props.stateLanguageType,
        first_name: this.state.userDetails.first_name,
        last_name: this.state.userDetails.last_name,
        bucket: getBucket[0].bucket,
      })
      .then((responce) => {
        this.setState({ loaderImage: false, FilesUp: [] });
        if (responce.data.hassuccessed) {
          axios
            .post(
              "https://api-eu.cometchat.io/v2.0/users",
              {
                uid: responce.data.data.profile_id,
                name:
                  responce.data.data.first_name +
                  " " +
                  responce.data.data.last_name,
              },
              {
                headers: {
                  appId: "220824e717b58ac",
                  apiKey: "fc177a4e50f38129dca144f6270b91bfc9444736",
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {});
          this.setState({ successfull: true });
          this.setState({
            registerMessage:
              "You are registered successfully, Please check your email for verification.",
          });
        } else {
          this.setState({ successfull: false });
          this.setState({ error_msg: responce.data.message });
        }
      });
  };
  //For select the country code Flag
  onSelectFlag = (countryCode) => {
    const state = this.state.userDetails;
    state["country_code"] = countryCode.toLowerCase();
    this.setState({ userDetails: state });
  };

  //For show or hide the Password
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  changeValue(languageType, language) {
    this.setState({ dropDownValue: language });
    this.props.LanguageFetchReducer(languageType);
  }

  componentDidMount() {}
  //For set the language
  SetMode = () => {
    var mode = this.state.mode === "normal" ? "dark" : "normal";
    this.setState({ mode: mode }, () => {
      this.props.Settings("loggedOut", mode);
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
      Register_for_Aimedis,
      Register_Name,
      Register_email,
      login_Password,
      recEmp_FirstName,
      recEmp_LastName,
      Register_Mobilenumber,
      Register_activate_auth,
      Register_Accounttype,
      click_here_uplod_license,
      capab_Patients,
      Register_want_register,
      Register_Clicking_box,
      Register_clickingbox,
      Professional,
      capab_Doctors,
      Nurse,
      Pharmacist,
      Register_CREATE,
      Register_havAC,
      Register_lohinher,
      Register_Passwordshould,
      DarkMode,
      file_uploaded,
      Register_characters,
      Register_letter,
      Register_number,
      Register_special,
      country_code,
    } = translate;

    if (this.state.successfull) {
      return <Redirect to={"/register-successfull"} />;
    }
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "loginSiteUpr homeBgDrk"
            : "loginSiteUpr"
        }
      >
        <Grid className="loginSite">
          {this.state.loaderImage && <Loader />}
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={11} md={10}>
              <Grid className="regHead">
                <Grid container direction="row" justify="center">
                  <Grid item xs={6} sm={6} className="LogoForms">
                    <a href={sitedata.data.live_site}>
                      <img
                        src={require("../../assets/images/LogoPNG.png")}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Grid className="regSelectTop">
                      <Grid className="changeLang">
                        <li>
                          <span className="ThemeModeSet1"> {DarkMode} </span>
                          <span className="ThemeModeSet">
                            <Toggle
                              icons={false}
                              checked={this.state.mode === "dark"}
                              name="mode"
                              onClick={(e) => this.SetMode(e)}
                            />
                          </span>
                        </li>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            {this.state.dropDownValue}
                          </DropdownToggle>
                          {/* 
                                                    en => English
                                                    de => German  

                                                */}
                          <DropdownMenu className="langInerFooter">
                            <DropdownItem
                              onClick={() => {
                                this.changeValue("en", "English");
                              }}
                            >
                              <NavLink>English</NavLink>
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                this.changeValue("de", "German");
                              }}
                            >
                              <NavLink>German</NavLink>
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                this.changeValue("ch", "Chinese");
                              }}
                            >
                              <NavLink>Chinese</NavLink>
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                this.changeValue("pt", "Portuguese");
                              }}
                            >
                              <NavLink>Portuguese</NavLink>
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                this.changeValue("sp", "Spanish");
                              }}
                            >
                              <NavLink>Spanish</NavLink>
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                this.changeValue("rs", "Russian");
                              }}
                            >
                              <NavLink>Russian</NavLink>
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                this.changeValue("sw", "Swahili");
                              }}
                            >
                              <NavLink>Swahili</NavLink>
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                this.changeValue("nl", "Dutch");
                              }}
                            >
                              <NavLink>Dutch</NavLink>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={11} sm={10} md={7}>
              <Grid className="regData">
                <h1>{Register_for_Aimedis}</h1>
              </Grid>

              <Grid className="registerFormMain">
                <Grid className="registerForm">
                  <div className="err_message">
                    {this.state.regisError}
                    {this.state.regisError1}
                    {this.state.regisError2}
                    {this.state.regisError3}
                    {this.state.regisError0}
                    {this.state.error_msg}
                    {this.state.namevald}
                  </div>
                  {/* <div className="success_message">
                                    {this.state.registerMessage}
                                </div> */}
                  {this.state.fileupods && (
                    <div className="success_message">{file_uploaded}</div>
                  )}
                  <Grid className="registerRow">
                    <Grid>
                      <label>{recEmp_FirstName}</label>
                    </Grid>
                    <Grid>
                      <input
                        type="text"
                        name="first_name"
                        onChange={this.handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid className="registerRow">
                    <Grid>
                      <label>{recEmp_LastName}</label>
                    </Grid>
                    <Grid>
                      <input
                        type="text"
                        name="last_name"
                        onChange={this.handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid className="registerRow">
                    <Grid>
                      <label>{Register_email}</label>
                    </Grid>
                    <Grid>
                      <input
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid className="registerRow passInstMain">
                    <Grid>
                      <label>{login_Password}</label>
                    </Grid>
                    <Grid className="registerPass">
                      <input
                        type={this.state.hidden ? "password" : "text"}
                        name="password"
                        onChange={this.handleChange}
                      />
                      {this.state.hidden && (
                        <a onClick={this.toggleShow}>
                          <img
                            src={require("../../assets/images/showeye.svg")}
                            alt=""
                            title=""
                          />
                        </a>
                      )}
                      {!this.state.hidden && (
                        <a onClick={this.toggleShow}>
                          <img
                            src={require("../../assets/images/hide.svg")}
                            alt=""
                            title=""
                          />
                        </a>
                      )}
                    </Grid>
                    {this.state.userDetails &&
                    this.state.userDetails.password ? (
                      <div className="passInst">
                        <div className="passInstIner">
                          <p>{Register_Passwordshould}</p>
                          <img
                            src={require("../../assets/images/passArrow.png")}
                            alt=""
                            title=""
                            className="passArow"
                          />
                          <ul>
                            <li>
                              {this.state.userDetails &&
                                this.state.userDetails.password &&
                                this.state.userDetails.password.length > 8 && (
                                  <a>
                                    <img
                                      src={require("../../assets/images/CheckCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_characters}
                                  </a>
                                )}
                              {this.state.userDetails &&
                                this.state.userDetails.password &&
                                this.state.userDetails.password.length <= 8 && (
                                  <a>
                                    <img
                                      src={require("../../assets/images/CloseCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_characters}
                                  </a>
                                )}
                            </li>
                            <li>
                              {this.state.userDetails &&
                                this.state.userDetails.password &&
                                !this.state.userDetails.password.match(
                                  letter
                                ) && (
                                  <a>
                                    <img
                                      src={require("../../assets/images/CloseCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_letter}
                                  </a>
                                )}
                              {this.state.userDetails &&
                                this.state.userDetails.password &&
                                this.state.userDetails.password.match(
                                  letter
                                ) && (
                                  <a>
                                    <img
                                      src={require("../../assets/images/CheckCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_letter}
                                  </a>
                                )}
                            </li>
                            <li>
                              {this.state.userDetails &&
                                this.state.userDetails.password &&
                                !this.state.userDetails.password.match(
                                  number
                                ) && (
                                  <a>
                                    <img
                                      src={require("../../assets/images/CloseCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_number}
                                  </a>
                                )}
                              {this.state.userDetails &&
                                this.state.userDetails.password &&
                                this.state.userDetails.password.match(
                                  number
                                ) && (
                                  <a>
                                    <img
                                      src={require("../../assets/images/CheckCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_number}
                                  </a>
                                )}
                            </li>
                            <li>
                              {this.state.userDetails &&
                                this.state.userDetails.password &&
                                !this.state.userDetails.password.match(
                                  specialchar
                                ) && (
                                  <a>
                                    <img
                                      src={require("../../assets/images/CloseCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_special}
                                  </a>
                                )}
                              {this.state.userDetails &&
                                this.state.userDetails.password &&
                                this.state.userDetails.password.match(
                                  specialchar
                                ) && (
                                  <a>
                                    <img
                                      src={require("../../assets/images/CheckCircle.svg")}
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
                            src={require("../../assets/images/passArrow.png")}
                            alt=""
                            title=""
                            className="passArow"
                          />
                          <ul>
                            <li>
                              <a>
                                <img
                                  src={require("../../assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_characters}
                              </a>
                            </li>
                            <li>
                              <a>
                                <img
                                  src={require("../../assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_letter}
                              </a>
                            </li>
                            <li>
                              <a>
                                <img
                                  src={require("../../assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_number}
                              </a>
                            </li>
                            <li>
                              <a>
                                <img
                                  src={require("../../assets/images/CloseCircle.svg")}
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

                  <Grid className="registerRow regMobNum">
                    <Grid>
                      <label>{Register_Mobilenumber}</label>
                    </Grid>
                    <Grid>
                      {/* <PhoneInput
                                        enableAreaCodes={true}
                                        country={'us'}
                                        value={this.state.phone}
                                        onChange={phone => this.setState({ phone })}
                                    //enableSearch={true}
                                    /> */}
                      <ReactFlagsSelect
                        placeholder={country_code}
                        name="country_code"
                        onSelect={this.onSelectFlag}
                        showSelectedLabel={false}
                        defaultCountry="DE"
                      />
                      <input
                        type="text"
                        className="mobileReg"
                        type="number"
                        name="mobile"
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <FormControlLabel
                      className="regMob"
                      control={
                        <Checkbox
                          value="checkedA"
                          onChange={this.handleChange}
                          name="is2fa"
                        />
                      }
                      label={Register_activate_auth}
                    />
                  </Grid>
                  {this.state.selectedOption == "doctor" && (
                    <Grid item xs={12} sm={12} className="common_name_v2_reg">
                      <label htmlFor="UploadDocument">
                        {" "}
                        {click_here_uplod_license}{" "}
                        <img
                          src={require("../../assets/images/links.png")}
                          alt=""
                          title=""
                          className="link_docs"
                        />
                      </label>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="UploadDocument"
                        name="UploadDocument"
                        onChange={(e) => this.UploadFile(e)}
                        multiple
                      />
                      <div>
                        {this.state.fileattach &&
                          this.state.fileattach.length > 0 &&
                          this.state.fileattach.map((data) => (
                            <span className="ViewImage">
                              <img src={data} />
                            </span>
                          ))}
                      </div>
                    </Grid>
                  )}
                  <Grid className="registerRow accountTyp">
                    <Grid>
                      <label>{Register_Accounttype}</label>
                    </Grid>
                    <Grid className="acPatient">
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item xs={11} sm={6} md={6}>
                          <Grid
                            className={
                              this.state.selectedOption === "patient"
                                ? "acPatientIner"
                                : "acPatientIner onProfessional"
                            }
                          >
                            <a
                              onClick={() => {
                                this.setState({ selectedOption: "patient" });
                              }}
                            >
                              {capab_Patients}
                            </a>
                          </Grid>
                        </Grid>
                        <Grid item xs={11} sm={6} md={6}>
                          <Grid
                            className={
                              this.state.selectedOption === "patient"
                                ? "acType"
                                : "acType ProfSelect"
                            }
                          >
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                <a>
                                  {this.state.selectedOption === "" ||
                                  this.state.selectedOption === "patient"
                                    ? Professional
                                    : this.state.selectedOption
                                        .charAt(0)
                                        .toUpperCase() +
                                      this.state.selectedOption.slice(1)}
                                </a>
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  onClick={() => {
                                    this.setState({ selectedOption: "" });
                                  }}
                                >
                                  <NavLink>{Professional}</NavLink>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    this.setState({ selectedOption: "doctor" });
                                  }}
                                >
                                  <NavLink>{capab_Doctors}</NavLink>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    this.setState({ selectedOption: "nurse" });
                                  }}
                                >
                                  <NavLink>{Nurse}</NavLink>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    this.setState({
                                      selectedOption: "pharmacy",
                                    });
                                  }}
                                >
                                  <NavLink>{Pharmacist}</NavLink>
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid className="registerRow">
                    <FormControlLabel
                      className="regMob"
                      control={
                        <Checkbox
                          value="checkedA"
                          name="Aimedis_health_newletter"
                          onChange={this.handleChange}
                        />
                      }
                      label={Register_want_register}
                    />
                  </Grid>

                  <Grid className="registerRow">
                    <FormControlLabel
                      className="regMob"
                      control={
                        <Checkbox
                          value="checkedA"
                          onChange={this.handleChange}
                          name="terms_and_conditions"
                        />
                      }
                      label={Register_Clicking_box}
                    />
                  </Grid>
                  {this.state.selectedOption !== "patient" && (
                    <Grid className="registerRow">
                      <FormControlLabel
                        className="regMob"
                        control={
                          <Checkbox
                            value="checkedA"
                            onChange={this.handleChange}
                            name="license_of_practice"
                          />
                        }
                        label={Register_clickingbox}
                      />
                    </Grid>
                  )}
                  <Grid className="registerRow">
                    <Grid className="regCrtAc">
                      <input
                        type="submit"
                        value={Register_CREATE}
                        onClick={this.saveUserData.bind(this)}
                      />
                    </Grid>
                  </Grid>

                  <Grid className="havAC">
                    <p>
                      {Register_havAC}{" "}
                      <a onClick={this.login}>{Register_lohinher}</a>
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid className="regFooter"><Footer /></Grid>   */}
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
  LanguageFetchReducer,
  Settings,
})(Index);
// export default Index;
