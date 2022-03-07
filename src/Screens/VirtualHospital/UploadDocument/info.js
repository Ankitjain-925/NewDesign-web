/*global google*/import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import DatePicker from "react-date-picker";
import ReactFlagsSelect from "react-flags-select";
import sitedata from "sitedata";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Autocomplete from "Screens/Components/Autocomplete/index";
import { OptionList } from "Screens/Login/metadataaction";
import FileUploader from "Screens/Components/FileUploader/index";
import { LanguageFetchReducer } from "Screens/actions";
import Modal from "@material-ui/core/Modal";
import npmCountryList from "react-select-country-list";
import Loader from "Screens/Components/Loader/index";
import DateFormat from "Screens/Components/DateFormat/index";
import QRCode from "qrcode.react";
import { GetUrlImage1, blobToFile, resizeFile } from "Screens/Components/BasicMethod/index";
import SPECIALITY from "speciality";
import { GetLanguageDropdown } from "Screens/Components/GetMetaData/index.js";
import { getLanguage } from "translations/index"
import { update_CometUser } from "Screens/Components/CommonApi/index";
import { commonHeader, commonCometHeader } from "component/CommonHeader/index";
import ReactToPrint, { PrintContext } from 'react-to-print';
import { ComponentToPrint } from "./ComponentTo";
import ReactQuill from "react-quill";

class Index extends Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    // this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.state = {
      header: 0,
      footer: 0,
      patinfo: this.props.patinfo,
      editor: ''

    };
  }

  getDate(date, dateFormat) {
    var d = new Date(date);
    var monthNames = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ],
      month = monthNames[d.getMonth()],
      day = d.getDate(),
      year = d.getFullYear();
    if (day.length < 2) day = "0" + day;
    if (dateFormat === "YYYY/DD/MM") {
      return year + " / " + day + " / " + month;
    } else if (dateFormat === "DD/MM/YYYY") {
      return day + " / " + month + " / " + year;
    } else {
      return month + " / " + day + " / " + year;
    }
  }

  handlelatestChange = (value) => {
    this.setState({ editor: value })
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.patinfo !== this.props.patinfo) {
      this.setState({ patinfo: this.props.patinfo }, () => {
      })
    }
  }

  handleOnBeforeGetContent = () => {
    this.setState({ loaderImage: true, first_name: this.state.patinfo?.first_name, last_name: this.state.patinfo?.last_name, mobile: this.state.patinfo?.mobile, DoB: this.state.patinfo?.DoB, editor: this.state.editor });
    return new Promise((resolve) => {
      setTimeout(() => {
        this.setState(
          { loaderImage: false },
          resolve
        );
      }, 2000);
    });
  };

  reactToPrintContent = () => {
    return this.componentRef
  };
  //For setting the image
  SettingImage = (find) => {
    if (find) {
      find = find.split(".com/")[1];

      axios
        .get(sitedata.data.path + "/aws/sign_s3?find=" + find)
        .then((response) => {
          if (response.data.hassuccessed) {
            this.setState({ image: response.data.data });
            setTimeout(() => {
              this.setState({ loaderImage: false });
            }, 5000);
          }
        });
    }
  };
  handleChange1 = (input, value) => {
    this.setState({ [input]: value });

  };
  getMetadata() {
    this.setState({ allMetadata: this.props.metadata },
      () => {
        this.GetLanguageMetadata();
      })
  }

  upload = () => {
    this.props.history.push({
      pathname: '/virtualHospital/approved_add',
      state: { data: this.state.patinfo._id, needUpload: true }
    })
  }
  GetLanguageMetadata = () => {
    var Allgender = GetLanguageDropdown(this.state.allMetadata && this.state.allMetadata.gender && this.state.allMetadata.gender.length > 0 && this.state.allMetadata.gender, this.props.stateLanguageType)
    var rhesusgroup = GetLanguageDropdown(this.state.allMetadata && this.state.allMetadata.rhesus && this.state.allMetadata.rhesus.length > 0 && this.state.allMetadata.rhesus, this.props.stateLanguageType)
    let AllMaritalOption = GetLanguageDropdown(this.state.allMetadata && this.state.allMetadata.maritalStatus && this.state.allMetadata.maritalStatus.length > 0 && this.state.allMetadata.maritalStatus, this.props.stateLanguageType)
    this.setState({
      AllMaritalOption: AllMaritalOption,
      genderdata: Allgender,
      languageData: this.state.allMetadata && this.state.allMetadata.languages && this.state.allMetadata.languages.length > 0 && this.state.allMetadata.languages,
      specialityData: GetLanguageDropdown(SPECIALITY.speciality.english, this.props.stateLanguageType),
      title_degreeData: this.state.allMetadata && this.state.allMetadata.title_degreeData && this.state.allMetadata.title_degreeData.length > 0 && this.state.allMetadata.title_degreeData,
      bloodgroup: this.state.allMetadata && this.state.allMetadata.bloodgroup && this.state.allMetadata.bloodgroup.length > 0 && this.state.allMetadata.bloodgroup,
      rhesusgroup: rhesusgroup,
      handleMaritalStatus: AllMaritalOption
    });
  }

  render() {
    return (
      <div>
        <Grid className={
          this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
            ? "homeBg darkTheme"
            : "homeBg"
        }>
      
          {this.state.loaderImage && <Loader />}
          <Grid container direction="row" justifyContent="center" >
            <Grid item xs={11} md={10}>
              <Grid className='headercont headercontSec'>
                <Grid className="allheadercont">
                  <Grid className="profileInfoSection">  <h1>Personal Information</h1></Grid>
                  <Grid item xs={12} md={8}>
                    <Grid className="headerCountTxt">
                      <label>Header(inches)</label>
                      <input
                        name="header"
                        type="text"
                        onChange={(e) => { this.handleChange1("header", e.target.value) }}
                        value={this.state.header}

                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid className="headerCountTxt">
                      <label>Footer(inches)</label>
                      <input
                        name="footer"
                        type="text"
                        onChange={(e) => { this.handleChange1("footer", e.target.value) }}
                        value={this.state.footer}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid className="headerCountTxt">
                      <label>First Name</label>
                      <input
                        name="first_name"
                        type="text"
                        // onChange={(e) => { this.handleChange1("first_name", e.target.value) }}
                        value={this.state.patinfo?.first_name}
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid className="headerCountTxt">
                      <label>Last Name</label>
                      <input
                        name="last_name"
                        type="text"
                        // onChange={(e) => { this.handleChange1("last_name", e.target.value) }}
                        value={this.state.patinfo?.last_name}
                        disabled
                      />
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={12} md={8}>
                  <Grid className="headerCountTxt">
                    <label>Mobile</label>
                    <input
                      name="mobile"
                      type="text"
                      // onChange={(e) => { this.handleChange1("mobile", e.target.value) }}
                      value={this.state.mobile}
                      disabled
                    />
                  </Grid>
                </Grid> */}
                  <Grid item xs={12} md={8}>
                    <Grid className="headerCountTxt">
                      <label>Birthday</label>
                      <input
                        name="DoB"
                        type="text"
                        // onChange={(e) => { this.handleChange1("DoB", e.target.value) }}
                        value={this.getDate(this.state.patinfo?.birthday)}
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid className="headerCountTxt">
                      <label>Free Content</label>
                      <ReactQuill
                        name="editor"
                        // value={this.state.editorText?.editor}
                        onChange={(e) => this.handlelatestChange(e, "editor")}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="center" >
                  <Grid item xs={12} md={8} lg={8}>
                    <Grid className="allInfoSection">
                      <Grid container direction="row" justifyContent="center" >
                        <Grid item xs={12} md={4} lg={4}>
                          <Grid className="headerCountTxt infoSubInpSection">
                            <ReactToPrint
                              content={() => this.reactToPrintContent()}
                              documentTitle="Report.pdf"
                              onBeforeGetContent={() => this.handleOnBeforeGetContent(this.state.first_name)}
                              removeAfterPrint
                              trigger={() => <input
                                type="submit"

                                value={"Print Preview"}
                              />}

                            />

                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                          <Grid className="headerCountTxt infoSubInpSection">

                            <ReactToPrint
                              content={() => this.reactToPrintContent()}
                              documentTitle="Report.pdf"
                              onBeforeGetContent={() => this.handleOnBeforeGetContent(this.state.first_name)}
                              removeAfterPrint
                              trigger={() => <input
                                type="submit"

                                value={"Print"}
                              />}

                            />
                            {/* {this.state.first_name &&
                    // this.state.last_name&&  */}
                            <ComponentToPrint ref={el => (this.componentRef = el)} first_name={this.state.first_name} last_name={this.state.last_name}
                              DoB={this.state.DoB} mobile={this.state.mobile} header={this.state.header} footer={this.state.footer} editor={this.state.editor} />
                            {/* } */}
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                          <Grid className="headerCountTxt infoSubInpSection">
                            <input
                              type="submit"
                              onClick={this.upload}
                              value={"Next"}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>



            </Grid>
          </Grid>
        </Grid>

      </div >
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
  const { metadata } = state.OptionList;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    metadata,
    //   Doctorsetget,
    //   catfil
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, OptionList })(
    Index
  )
);