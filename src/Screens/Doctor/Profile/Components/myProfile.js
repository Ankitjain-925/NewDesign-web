/*global google*/
import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import DatePicker from "react-date-picker";
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import ReactFlagsSelect from "react-flags-select";
import sitedata from "../../../../sitedata";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { connect } from "react-redux";
import { LoginReducerAim } from "./../../../Login/actions";
import { Settings } from "./../../../Login/setting";
import npmCountryList from "react-select-country-list";
import FileUploader from "./../../../Components/FileUploader/index";
import { GetUrlImage1 } from "./../../../Components/BasicMethod/index";
import { Table } from "reactstrap";
import * as AustraliaC from "../../../Components/insuranceCompanies/australia.json";
import * as AustriaC from "../../../Components/insuranceCompanies/austria.json";
import * as NetherlandC from "../../../Components/insuranceCompanies/dutch.json";
import * as GermanC from "../../../Components/insuranceCompanies/german.json";
import * as PhillipinesC from "../../../Components/insuranceCompanies/phillippines.json";
import * as SwitzerlandC from "../../../Components/insuranceCompanies/switzerland.json";
import * as AmericaC from "../../../Components/insuranceCompanies/us.json";
import * as ThailandC from "../../../Components/insuranceCompanies/thailand.json";
import { LanguageFetchReducer } from "./../../../actions";
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
import Loader from "./../../../Components/Loader/index";
import DateFormat from "./../../../Components/DateFormat/index";
import Autocomplete from "./../../../Components/Autocomplete/index.js";
import Modal from "@material-ui/core/Modal";
import { subspeciality } from "../../../../subspeciality.js";
import SPECIALITY from "../../../../speciality";
import { OptionList } from "Screens/Login/metadataaction";
import {
  GetLanguageDropdown,
  GetShowLabel12,
} from "./../../../Components/GetMetaData/index.js";
import QRCode from "qrcode.react";

const options = [
  { value: "Mr", label: "Mr." },
  { value: "Mrs", label: "Mrs." },
];
var datas = [];

class Index extends Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.city = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.filterList = this.filterList.bind(this);
    this.state = {
      date: new Date(),
      labelWidth: "",
      gender: "",
      language: [],
      userDetails: [],
      weoffer: [],
      language: [],
      speciality: [],
      uploadedimage: "",
      file: "",
      imagePreviewUrl: "",
      genderdata: [],
      languageData: [],
      specialityData: [],
      subspecialityData: [],
      addressDetails: [],
      title_degreeData: [],
      subspeciality: [],
      UpDataDetails: [],
      speciality_multi: [],
      subspeciality_multi: [],
      insurance_count: 1,
      insuranceDetails: {},
      insurancefull: [],
      UpDataDetailsdicard: [],
      speciality_multidiscard: [],
      name_multidiscard: [],
      passwordDetails: [],
      loaderImage: false,
      regisError1: "",
      regisError2: "",
      city: "",
      area: "",
      allDocData: {},
      insuranceArray: {},
      moreone: false,
      profile_id: "",
      selectCountry: [],
      flag_fax: "DE",
      flag_phone: "DE",
      flag_mobile: "DE",
      flag_emergency_number: "DE",
      mobile: "",
      phone: "",
      fax: "",
      updateIns: -1,
      error3: false,
      succUpdate: false,
      copied: false,
      value: 0,
      qrOpen: false,
      chngPinOpen: false,
      ChangedPIN: false,
      DuplicateAlies: false,
      toSmall: false,
      phonevalidate: false,
      addInsuranceOpen: false,
      editInsuranceOpen: false,
      editInsuData: {},
      insurnanceAdded: false,
      selectedCountry: "",
      q: "",
      filteredCompany: [],
      editIndex: null,
      toSmall1: false,
    };
    // new Timer(this.logOutClick.bind(this))
  }

  // On change the Birthday
  onChange = (date) => {
    const state = this.state.UpDataDetails;
    state["birthday"] = date;
    this.setState({ UpDataDetails: state });
  };

  componentDidMount() {
    // $("#clickIcon").click(function () {
    //     $("input[id='my_file']").click();
    //   });
    // this.setState({
    //     labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    // });
    this.getMetadata();
    // this.getUserData();
    this.alldoctor();
    var npmCountry = npmCountryList().getData();
    this.setState({ selectCountry: npmCountry });
    /*---location---*/
    this.city = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.city.addListener("place_changed", this.handlePlaceChanged);
  }

  //For upload the Profile pic
  fileUpload = (event, filed_name) => {
    if (event[0].type === "image/jpeg" || event[0].type === "image/png") {
      this.setState({ loaderImage: true });
      let reader = new FileReader();
      let file = event[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl1: reader.result,
        });
      };
      let user_token = this.props.stateLoginValueAim.token;
      reader.readAsDataURL(file);
      const data = new FormData();
      let fileParts = event[0].name.split(".");
      let fileName = fileParts[0];
      let fileType = fileParts[1];
      axios
        .post(sitedata.data.path + "/aws/sign_s3", {
          fileName: fileName,
          fileType: fileType,
          folders: this.props.stateLoginValueAim.user.profile_id + "/",
          bucket: this.props.stateLoginValueAim.user.bucket,
        })
        .then((response) => {
          var returnData = response.data.data.returnData;
          var signedRequest = returnData.signedRequest;
          var url = returnData.url;
          if (fileType === "pdf") {
            fileType = "application/pdf";
          }
          // Put the fileType in the headers for the upload
          var options = {
            headers: {
              "Content-Type": fileType,
            },
          };
          axios
            .put(signedRequest, file, options)
            .then((result) => {
              this.setState(
                {
                  uploadedimage:
                    response.data.data.returnData.url +
                    "&bucket=" +
                    this.props.stateLoginValueAim.user.bucket,
                  loaderImage: false,
                },
                () => {
                  this.saveUserData1();
                }
              );
            })
            .catch((error) => {});
        })
        .catch((error) => {});
    } else {
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
      let { plz_upload_png_jpeg, ok } = translate;
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div
              className={
                this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode === "dark"
                  ? "dark-confirm react-confirm-alert-body"
                  : "react-confirm-alert-body"
              }
            >
              <h1>{plz_upload_png_jpeg}</h1>
              <div className="react-confirm-alert-button-group">
                <button
                  onClick={() => {
                    onClose();
                  }}
                >
                  {ok}
                </button>
              </div>
            </div>
          );
        },
      });
    }
  };

  //FOR UPLOADING THE IMAGE
  saveUserData1 = () => {
    this.setState({ loaderImage: true });
    const user_token = this.props.stateLoginValueAim.token;
    axios
      .put(
        sitedata.data.path + "/UserProfile/Users/updateImage",
        {
          image: this.state.uploadedimage,
        },
        {
          headers: {
            token: user_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((responce) => {
        axios
          .put(
            "https://api-eu.cometchat.io/v2.0/users/" +
              this.props.stateLoginValueAim.user.profile_id.toLowerCase(),
            {
              avatar: this.state.uploadedimage,
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
        var find1 = this.state.uploadedimage;
        this.SettingImage(find1);
      });
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
  //Compare the
  // compare = (a, b) => {
  //     const bandA = a.label.toUpperCase();
  //     const bandB = b.label.toUpperCase();

  //     let comparison = 0;
  //     if (bandA > bandB) {
  //         comparison = 1;
  //     } else if (bandA < bandB) {
  //         comparison = -1;
  //     }
  //     return comparison;
  // }

  // Copy the Profile id and PIN
  copyText = (copyT) => {
    this.setState({ copied: false });
    var copyText = document.getElementById(copyT);
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 5000);
  };

  //For update the mobile number
  updateMOBILE = (str) => {
    if (!str || str === "undefined" || str === null || str === "") {
      return str;
    } else {
      var mob = str && str.split("-");
      return mob.pop();
    }
  };

  // fOR update the flag of mobile
  updateFLAG = (str) => {
    var mob = str && str.split("-");
    if (mob && mob.length > 0) {
      if (mob[0] && mob[0].length == 2) {
        return mob[0];
      } else {
        return "DE";
      }
    }
  };

  //Update the states
  updateEntryState1 = (e) => {
    const state = this.state.UpDataDetails;
    if (e.target.name === "mobile") {
      state[e.target.name] = this.state.flag_mobile + "-" + e.target.value;
      this.setState({ mobile: e.target.value });
    }
    if (e.target.name === "fax") {
      state[e.target.name] = this.state.flag_fax + "-" + e.target.value;
      this.setState({ fax: e.target.value });
    }
    if (e.target.name === "phone") {
      state[e.target.name] = this.state.flag_phone + "-" + e.target.value;
      this.setState({ phone: e.target.value });
    }
    if (e.target.name === "emergency_number") {
      state[e.target.name] =
        this.state.flag_emergency_number + "-" + e.target.value;
      this.setState({ phone: e.target.value });
    }
    this.setState({ UpDataDetails: state });
  };

  //For open QR code
  handleQrOpen = () => {
    this.setState({ qrOpen: true });
  };
  handleQrClose = () => {
    this.setState({ qrOpen: false });
  };

  //for open the Change profile Dialog
  handlePinOpen = () => {
    this.setState({ chngPinOpen: true });
  };
  handlePinClose = (key) => {
    this.setState({ [key]: false });
  };

  //For change the title of user
  onSelectDegree(event) {
    this.setState({ title: event });
    const state = this.state.UpDataDetails;
    state["title"] = event.label;
    this.setState({ UpDataDetails: state });
  }

  //For update the flags
  updateFlags = (e, name) => {
    const state = this.state.UpDataDetails;
    if (name === "flag_mobile") {
      state["mobile"] = e + "-" + this.state.mobile;
      this.setState({ flag_mobile: e });
    }
    if (name === "flag_fax") {
      state["fax"] = e + "-" + this.state.fax;
      this.setState({ flag_fax: e });
    }

    if (name === "flag_phone") {
      state["phone"] = e + "-" + this.state.phone;
      this.setState({ flag_phone: e });
    }
    if (name === "flag_emergency_number") {
      state["emergency_number"] = e + "-" + this.state.phone;
      this.setState({ flag_emergency_number: e });
    }
    this.setState({ UpDataDetails: state });
  };

  //For chnaging the Place of city.
  handlePlaceChanged() {
    const place = this.city.getPlace();
    this.setState({ city: place.formatted_address });
    this.setState({
      area: {
        type: "Point",
        coordinates: [
          place.geometry.location.lng(),
          place.geometry.location.lat(),
        ],
      },
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
      this.GetLanguageMetadata();
      this.GetSpec(this.state.speciality_multi, this.state.subspeciality_multi);
    }
  };

  //For getting the dropdowns from the database
  getMetadata() {
    this.setState({ allMetadata: this.props.metadata},
      ()=>{
          this.GetLanguageMetadata();
      })
    // axios.get(sitedata.data.path + "/UserProfile/Metadata").then((responce) => {
    //   if (responce && responce.data && responce.data.length > 0) {
    //     this.setState({ allMetadata: responce.data[0] });
    //     this.GetLanguageMetadata();
    //   }
    // });
  }

  GetLanguageMetadata = () => {
    var Allgender = GetLanguageDropdown(
      this.state.allMetadata &&
        this.state.allMetadata.gender &&
        this.state.allMetadata.gender.length > 0 &&
        this.state.allMetadata.gender,
      this.props.stateLanguageType
    );
    this.setState(
      {
        genderdata: Allgender,
        languageData:
          this.state.allMetadata &&
          this.state.allMetadata.languages &&
          this.state.allMetadata.languages.length > 0 &&
          this.state.allMetadata.languages,
        specialityData: GetLanguageDropdown(
          SPECIALITY.speciality.english,
          this.props.stateLanguageType
        ),
        title_degreeData:
          this.state.allMetadata &&
          this.state.allMetadata.title_degreeData &&
          this.state.allMetadata.title_degreeData.length > 0 &&
          this.state.allMetadata.title_degreeData,
        subspecialityData: GetLanguageDropdown(
          subspeciality.english,
          this.props.stateLanguageType
        ),
      },
      () => {
        this.getUserData();
      }
    );
  };
  GetSpec = (speciality, subspeciality_m) => {
    this.setState({
      speciality_multi: GetShowLabel12(
        this.state.specialityData,
        speciality,
        this.props.stateLanguageType
      ),
      subspeciality_multi: GetShowLabel12(
        this.state.subspecialityData,
        subspeciality_m,
        this.props.stateLanguageType
      ),
    });
  };
  //Getting Doctor to add as Famisly doctor
  alldoctor() {
    const user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + "/UserProfile/DoctorUsers", {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ allDocData: response.data.data });
      });
  }

  //For change the language and the Speciality
  handleChange_multi = (event, name) => {
    const state = this.state.UpDataDetails;
    if (name == "languages") {
      this.setState({ name_multi: event });
      state["language"] =
        event && Array.prototype.map.call(event, (s) => s.value);
    }
    if (name == "speciality") {
      this.setState({ speciality_multi: event });
    }
    if (name == "subspeciality") {
      this.setState({ subspeciality_multi: event });
    }
    this.setState({ UpDataDetails: state });
  };

  //For update the state of the Profile
  handleChange1 = (e) => {
    const state = this.state.userDetails;
    state[e.target.name] = e.target.value;
    this.setState({ userDetails: state });
  };

  //For checkbox to offer things
  handleweoffer = (e) => {
    const state = this.state.weoffer;
    state[e.target.name] = e.target.value;
    this.setState({ weoffer: state });
  };

  // For add the insurance
  addmore_insurance() {
    datas.push(this.state.insuranceDetails);
    this.setState({
      insurance_count: this.state.insurance_count + 1,
      insurancefull: datas,
    });
    this.setState({
      insuranceDetails: {
        insurance: "",
        insurance_type: "",
        insurance_number: "",
      },
    });
    this.setState({ moreone: true });
  }

  //Save the User profile
  saveUserData = () => {
    const { UpDataDetails } = this.state;
    if (
      this.state.insuranceDetails.insurance !== "" &&
      this.state.insuranceDetails.insurance_number !== "" &&
      this.state.insuranceDetails.insurance_country !== ""
    ) {
      if (
        datas.some(
          (data) => data.insurance === this.state.insuranceDetails.insurance
        )
      ) {
      } else {
        datas.push(this.state.insuranceDetails);
        this.setState({ insurancefull: datas });
      }
    }
    if (
      this.state.flag_emergency_number &&
      this.state.flag_emergency_number === "" &&
      this.state.flag_emergency_number === "undefined"
    ) {
      this.setState({ flag_emergency_number: "DE" });
    }
    if (
      this.state.flag_mobile &&
      this.state.flag_mobile === "" &&
      this.state.flag_mobile === "undefined"
    ) {
      this.setState({ flag_mobile: "DE" });
    }
    if (
      this.state.flag_phone &&
      this.state.flag_phone === "" &&
      this.state.flag_phone === "undefined"
    ) {
      this.setState({ flag_phone: "DE" });
    }
    if (
      this.state.flag_fax &&
      this.state.flag_fax === "" &&
      this.state.flag_fax === "undefined"
    ) {
      this.setState({ flag_fax: "DE" });
    }
    this.setState({ loaderImage: true, phonevalidate: false });
    this.setState({ regisError1: "" });
    this.setState({ regisError2: "" });
    const user_token = this.props.stateLoginValueAim.token;
    this.setState({
      insuranceDetails: {
        insurance: "",
        insurance_number: "",
        insurance_country: "",
      },
    });
    var parent_id = UpDataDetails.parent_id ? UpDataDetails.parent_id : "0";

    axios
      .put(
        sitedata.data.path + "/UserProfile/Users/update",
        {
          first_name: UpDataDetails.first_name,
          last_name: UpDataDetails.last_name,
          title: UpDataDetails.title,
          birthday: UpDataDetails.birthday,
          language: UpDataDetails.language,
          speciality: this.state.speciality_multi,
          subspeciality: this.state.subspeciality_multi,
          phone: UpDataDetails.phone,
          mobile: UpDataDetails.mobile,
          fax: UpDataDetails.fax,
          sex: UpDataDetails.sex,
          street: UpDataDetails.street,
          city: this.state.city,
          area: this.state.area,
          address: UpDataDetails.address,
          country: UpDataDetails.country,
          pastal_code: UpDataDetails.pastal_code,
        },
        {
          headers: {
            token: user_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          this.setState({
            editInsuranceOpen: false,
            addInsuranceOpen: false,
            succUpdate: true,
            insuranceDetails: {
              insurance: "",
              insurance_number: "",
              insurance_country: "",
            },
          });
          this.setState({ loaderImage: false });
          setTimeout(() => {
            this.setState({ succUpdate: false });
          }, 5000);
          this.getUserData();
          axios
            .put(
              "https://api-eu.cometchat.io/v2.0/users/" +
                this.state.profile_id.toLowerCase(),
              {
                name: UpDataDetails.first_name + " " + UpDataDetails.last_name,
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
        } else {
          this.setState({ loaderImage: false });
          if (responce.data.message === "Phone is not verified") {
            this.setState({ phonevalidate: true });
          }
          this.setState({ error3: true });
          setTimeout(() => {
            this.setState({ error3: false });
          }, 5000);
        }
      });
  };

  // Check the Alies is duplicate or not
  changePin = (e) => {
    const state = this.state.UpDataDetails;
    state[e.target.name] = e.target.value;
    this.setState({ UpDataDetails: state });
    if (e.target.value.length > 3 && e.target.value !== "") {
      this.setState({ toSmall1: false });
    } else {
      this.setState({ toSmall1: true });
    }
  };

  //Chnage Id Pin by here
  ChangeIDPIN = () => {
    if (
      !this.state.DuplicateAlies &&
      !this.state.toSmall &&
      !this.state.toSmall1
    ) {
      this.setState({ loaderImage: true });
      const user_token = this.props.stateLoginValueAim.token;
      axios
        .put(
          sitedata.data.path + "/UserProfile/Users/update",
          {
            pin: this.state.UpDataDetails.pin,
            alies_id: this.state.UpDataDetails.alies_id,
          },
          {
            headers: {
              token: user_token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            this.setState({ ChangedPIN: true });
            setTimeout(() => {
              this.setState({ ChangedPIN: false });
            }, 5000);
          }
          this.setState({ loaderImage: false });
          this.getUserData();
          this.handlePinClose("chngPinOpen");
        });
    }
  };

  // Check the Alies is duplicate or not
  changeAlies = (e) => {
    const state = this.state.UpDataDetails;
    state[e.target.name] = e.target.value;
    this.setState({ UpDataDetails: state });
    if (e.target.value.length > 5 && e.target.value !== "") {
      this.setState({ loaderImage: true, toSmall: false });
      const user_token = this.props.stateLoginValueAim.token;
      axios
        .get(
          sitedata.data.path +
            "/UserProfile/checkAlies?alies_id=" +
            e.target.value,
          {
            headers: {
              token: user_token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            this.setState({ DuplicateAlies: true });
          } else {
            this.setState({ DuplicateAlies: false });
          }
          this.setState({ loaderImage: false });
        });
    } else {
      this.setState({ toSmall: true });
    }
  };

  //For open the Insurance Edit popup
  editKYCopen(event, i) {
    this.setState({
      editInsuranceOpen: true,
      insuranceDetails: event,
      editIndex: i,
    });
  }

  //For update the insurance country
  updatesinsurancesCountry(keys, e) {
    datas[keys].insurance_country = e.value;
    this.setState({ insurancefull: datas });
  }

  //Update Insurance
  updatesinsurances = (keys, e) => {
    if (e.target.name === "insurance") {
      datas[keys].insurance = e.target.value;
      const q = e.target.value.toLowerCase();
      this.setState({ q }, () =>
        this.filterList(datas[keys].insurance_country)
      );
      this.setState({ updateIns: keys });
    }
    if (e.target.name === "insurance_number") {
      datas[keys].insurance_number = e.target.value;
    }
    // if (e.target.name === 'insurance_country') {
    //     datas[keys].insurance_country = e.target.value;
    // }
    this.setState({ insurancefull: datas });
  };

  //For removing the insurance
  removeInsurance = (keys, e) => {
    datas.splice(keys, 1);
    this.setState({ insurancefull: datas });
  };

  //For getting User Data
  getUserData() {
    this.setState({ loaderImage: true });
    let user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    axios
      .get(sitedata.data.path + "/UserProfile/Users/" + user_id, {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        var title = {},
          titlefromD = response.data.data.title;
        var language = [],
          languagefromD = response.data.data.language;
        if (languagefromD && languagefromD.length > 0) {
          languagefromD.map((item) => {
            language.push({ value: item, label: item.replace(/_/g, " ") });
          });
        }

        if (titlefromD && titlefromD !== "") {
          title = { label: titlefromD, value: titlefromD };
        }

        if (response.data.data.mobile && response.data.data.mobile !== "") {
          let mob = response.data.data.mobile.split("-");
          if (mob && mob.length > 0) {
            this.setState({ flag_mobile: mob[0] });
          }
        }
        if (response.data.data.phone && response.data.data.phone !== "") {
          let pho = response.data.data.phone.split("-");
          if (pho && pho.length > 0) {
            this.setState({ flag_phone: pho[0] });
          }
        }
        if (response.data.data.fax && response.data.data.fax !== "") {
          let fx = response.data.data.fax.split("-");
          if (fx && fx.length > 0) {
            this.setState({ flag_fax: fx[0] });
          }
        }
        if (
          response.data.data.emergency_number &&
          response.data.data.emergency_number !== ""
        ) {
          let fen = response.data.data.emergency_number.split("-");
          if (fen && fen.length > 0) {
            this.setState({ flag_emergency_number: fen[0] });
          }
        }

        this.setState({
          UpDataDetails: response.data.data,
          city: response.data.data.city,
          area: response.data.data.area,
          profile_id: response.data.data.profile_id,
        });
        this.setState({ name_multi: language, title: title });
        this.setState({
          insurancefull: this.state.UpDataDetails.insurance,
          insuranceDetails: {
            insurance: "",
            insurance_number: "",
            insurance_type: "",
          },
        });
        datas = this.state.UpDataDetails.insurance;
        var find =
          response.data && response.data.data && response.data.data.image;
        this.SettingImage(find);
        this.GetSpec(
          response.data.data.speciality,
          response.data.data.subspeciality
        );
        this.setState({ loaderImage: false });
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
  }

  //Update the State
  updateEntryState = (e) => {
    const state = this.state.UpDataDetails;
    state[e.target.name] = e.target.value;
    this.setState({ UpDataDetails: state });
  };

  //For updating gender and country
  EntryValueName = (value, name) => {
    const state = this.state.UpDataDetails;
    state[name] = value;
    this.setState({ UpDataDetails: state });
  };

  //Calling when city is updated
  updateEntryCity = (place) => {
    this.setState({ city: place.formatted_address });
    this.setState({
      area: {
        type: "Point",
        coordinates: [
          place.geometry.location.lng(),
          place.geometry.location.lat(),
        ],
      },
    });
    const state = this.state.UpDataDetails;
    state["city"] = place.formatted_address;
    this.setState({ UpDataDetails: state });
  };

  // For update full insurance
  updateInsurancee = (e) => {
    if (e.target.name === "insurance") {
      const q = e.target.value.toLowerCase();
      this.setState({ q }, () =>
        this.filterList(this.state.insuranceDetails.insurance_country)
      );
      this.setState({ updateIns: -2 });
    }
    const state = this.state.insuranceDetails;
    state[e.target.name] = e.target.value;
    this.setState({ insuranceDetails: state });
  };

  // For Add more insurance model
  handleAddInsurance = () => {
    this.setState({ addInsuranceOpen: true });
  };

  //To add Insurance
  insuranceForm = (e) => {
    const state = this.state.insuranceDetails;
    if (e.target.name == "insurance") {
      const q = e.target.value.toLowerCase();
      this.setState({ q }, () => this.filterList());
    }
    state[e.target.name] = e.target.value;
    this.setState({ insuranceDetails: state });
  };

  selectCountry = (event) => {
    const state = this.state.insuranceDetails;
    state["insurance_country"] = event.value;
    this.setState({ insuranceDetails: state });
    this.setState({ selectedCountry: event });
  };

  //For insurance Countries getting the list
  filterList() {
    let iCompany;
    switch (this.state.selectedCountry.value) {
      case "AU":
        iCompany = AustraliaC.australia;
        break;
      case "AT":
        iCompany = AustriaC.austria;
        break;
      case "US":
        iCompany = AmericaC.us;
        break;
      case "NL":
        iCompany = NetherlandC.dutch;
        break;
      case "DE":
        iCompany = GermanC.german;
        break;
      case "PH":
        iCompany = PhillipinesC.phillippines;
        break;
      case "CH":
        iCompany = SwitzerlandC.switzerland;
        break;
      case "TH":
        iCompany = ThailandC.thailand;
        break;
    }
    let q = this.state.q;
    iCompany =
      iCompany &&
      iCompany.length > 0 &&
      iCompany.filter(function (company) {
        const companyLower = company.toLowerCase();
        return companyLower.indexOf(q) != -1;
      });
    this.setState({ filteredCompany: iCompany });
    if (this.state.q == "") {
      this.setState({ filteredCompany: [] });
    }
  }

  toggle = (event) => {
    const state = this.state.insuranceDetails;
    state["insurance"] = event;
    this.setState({ insuranceDetails: state });
    if (this.state.active === event) {
      this.setState({ active: null });
    } else {
      this.setState({ active: event });
    }
  };

  //For filter the country for add insuance
  filterCountry = (i) => {
    let countryList = this.state.selectCountry;
    let name;
    name = countryList.filter((value) => {
      if (value.value == i) {
        return value.label;
      }
    });
    return name[0].label;
  };

  //For filter the country for add insuances
  filterCountry1 = (i) => {
    let countryList = this.state.selectCountry;
    let name;
    name = countryList.filter((value) => {
      if (value.value == i) {
        return value.label;
      }
    });
    return name[0];
  };

  render() {
    const { stateLoginValueAim, Doctorsetget, selectedOption } = this.props;
    const {
      value,
      editInsuData,
      insurancefull,
      subspecialityData,
      UpDataDetails,
    } = this.state;
    const companyList =
      this.state.filteredCompany &&
      this.state.filteredCompany.map((company) => {
        return (
          <li
            className="list-group-item"
            value={company}
            onClick={() => {
              this.setState({ q: company });
              this.toggle(company);
              this.setState({ filteredCompany: [] });
            }}
          >
            {company}
          </li>
        );
      });

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
      profile_info,
      profile,
      information,
      ID,
      pin,
      pin_greater_then_4,
      QR_code,
      done,
      Change,
      edit_id_pin,
      edit,
      and,
      is,
      changed,
      profile_id_taken,
      profile_id_greater_then_5,
      male,
      female,
      other,
      save_change,
      email,
      title,
      degree,
      first,
      last,
      name,
      dob,
      gender,
      street,
      add,
      city,
      postal_code,
      country,
      home_telephone,
      phone,
      country_code,
      Delete,
      mobile_number,
      number,
      mobile,
      Languages,
      spoken,
      insurance,
      add_more,
      company,
      of,
      info_copied,
      profile_updated,
      profile_not_updated,
      mobile_number_not_valid,
      insurance_added,
      speciality,
      profile_information,
      this_is_ur_profile_info,
      change_id,
      edit_id_or_pin,
      profile_id_pin_changed,
      profile_id,
      fax_nmbr,
      sub_specilaity,
      profile_qr_code,
    } = translate;

    return (
      <div>
        {this.state.loaderImage && <Loader />}
        <Grid className="profileMy">
          <Grid className="profileInfo">
            {this.state.copied && (
              <div className="success_message">{info_copied}</div>
            )}
            {this.state.succUpdate && (
              <div className="success_message">{profile_updated}</div>
            )}
            {this.state.error3 && (
              <div className="err_message">{profile_not_updated}</div>
            )}
            {this.state.phonevalidate && (
              <div className="err_message">{mobile_number_not_valid}</div>
            )}
            {this.state.ChangedPIN && (
              <div className="success_message">
                {profile} {ID} {and} {pin} {is} {changed}
              </div>
            )}
            <h1>{profile_information}</h1>
            <p>{this_is_ur_profile_info}</p>
          </Grid>
        </Grid>

        <Grid className="profileId">
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} md={8}>
              <Grid className="profileIdLft">
                <Grid container direction="row" alignItems="center" spacing={1}>
                  <Grid item xs={12} md={7}>
                    <label>
                      {profile} {ID}
                    </label>
                    <span id="profile_id">
                      {UpDataDetails.alies_id && UpDataDetails.alies_id}
                    </span>
                    <a>
                      <img
                        src={require("../../../../assets/images/copycopy.svg")}
                        alt=""
                        onClick={() => this.copyText("profile_id")}
                        title=""
                      />
                    </a>
                    <a>
                      <img
                        src={require("../../../../assets/images/qr-code.svg")}
                        alt=""
                        title=""
                        onClick={this.handleQrOpen}
                      />
                    </a>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <label>{pin}</label>
                    <span id="profile_pin">
                      {UpDataDetails.pin && UpDataDetails.pin}
                    </span>
                    <a>
                      <img
                        src={require("../../../../assets/images/copycopy.svg")}
                        onClick={() => this.copyText("profile_pin")}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="profileIdRght">
                <a onClick={this.handlePinOpen}>{change_id}</a>
              </Grid>
            </Grid>
          </Grid>
          {/* Change ID and Pin */}
          <Modal
            open={this.state.chngPinOpen}
            onClose={() => this.handlePinClose("chngPinOpen")}
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === "dark"
                ? "darkTheme editBoxModel"
                : "editBoxModel"
            }
          >
            <Grid className="editBoxCntnt">
              <Grid className="editCourse">
                <Grid className="editCloseBtn">
                  <a onClick={() => this.handlePinClose("chngPinOpen")}>
                    <img
                      src={require("../../../../assets/images/close-search.svg")}
                      alt=""
                      title=""
                    />
                  </a>
                </Grid>
                <Grid>
                  <label>{edit_id_or_pin}</label>
                </Grid>
                <p>{edit_id_pin}</p>
              </Grid>
              <Grid className="editPinform">
                <Grid className="editField">
                  {this.state.ChangedPIN && (
                    <div className="success_message">
                      {profile_id_pin_changed}
                    </div>
                  )}
                  <label>{profile_id}</label>
                  <Grid>
                    <input
                      type="text"
                      name="alies_id"
                      onChange={this.changeAlies}
                      value={UpDataDetails.alies_id}
                    />
                  </Grid>
                  {this.state.DuplicateAlies && <p>{profile_id_taken}</p>}
                  {this.state.toSmall && <p>{profile_id_greater_then_5}</p>}
                </Grid>
                <Grid className="editField">
                  <label>{pin}</label>
                  <Grid>
                    <input
                      type="text"
                      name="pin"
                      onChange={this.changePin}
                      value={this.state.UpDataDetails.pin}
                    />
                  </Grid>
                  {this.state.toSmall1 && <p>{pin_greater_then_4}</p>}
                </Grid>
                <Grid>
                  <input
                    type="submit"
                    onClick={this.ChangeIDPIN}
                    value={save_change}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Modal>
          {/* End of Change ID and Pin */}
        </Grid>

        <Grid container direction="row" alignItems="center">
          <Grid item xs={12} md={8}>
            <Grid className="profileInfo">
              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={12}>
                    <label>{email}</label>
                    <Grid>
                      <input
                        type="text"
                        onChange={this.updateEntryState}
                        value={UpDataDetails.email}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner titleDegre">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={3}>
                    <label>
                      {title} / {degree}
                    </label>
                    <Grid>
                      <Select
                        value={this.state.title}
                        onChange={(e) => this.onSelectDegree(e)}
                        options={this.state.title_degreeData}
                        placeholder="Mr."
                        isSearchable={false}
                        className="mr_sel"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      {first} {name}
                    </label>
                    <Grid>
                      <input
                        type="text"
                        name="first_name"
                        value={UpDataDetails.first_name}
                        onChange={this.updateEntryState}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      {last} {name}
                    </label>
                    <Grid>
                      <input
                        type="text"
                        name="last_name"
                        onChange={this.updateEntryState}
                        value={UpDataDetails.last_name}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoDate">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={4}>
                    <label>{dob}</label>
                    <Grid>
                      <DateFormat
                        name="birthday"
                        value={
                          UpDataDetails.birthday
                            ? new Date(UpDataDetails.birthday)
                            : new Date()
                        }
                        onChange={this.onChange}
                        date_format={
                          this.props.settings.setting &&
                          this.props.settings.setting.date_format
                        }
                        onChange={this.onChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <label>{gender}</label>
                    <Grid>
                      <a
                        onClick={() => this.EntryValueName("male", "sex")}
                        className={
                          UpDataDetails.sex &&
                          UpDataDetails.sex === "male" &&
                          "SelectedGender"
                        }
                      >
                        {male}
                      </a>
                      <a
                        onClick={() => this.EntryValueName("female", "sex")}
                        className={
                          UpDataDetails.sex &&
                          UpDataDetails.sex === "female" &&
                          "SelectedGender"
                        }
                      >
                        {female}
                      </a>
                      <a
                        onClick={() => this.EntryValueName("other", "sex")}
                        className={
                          UpDataDetails.sex &&
                          UpDataDetails.sex === "other" &&
                          "SelectedGender"
                        }
                      >
                        {" "}
                        {other}
                      </a>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>
                      {street} {add}
                    </label>
                    <Grid>
                      <input
                        type="text"
                        name="address"
                        onChange={this.updateEntryState}
                        value={
                          UpDataDetails.address ? UpDataDetails.address : ""
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>{city}</label>
                    <Grid>
                      <Autocomplete
                        value={this.state.city}
                        stateLanguageType={this.props.stateLanguageType}
                        onPlaceChanged={this.updateEntryCity.bind(this)}
                      />{" "}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>{postal_code}</label>
                    <Grid>
                      <input
                        type="text"
                        name="pastal_code"
                        onChange={this.updateEntryState}
                        value={
                          UpDataDetails.pastal_code
                            ? UpDataDetails.pastal_code
                            : ""
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>{country}</label>
                    <Grid>
                      <Select
                        value={UpDataDetails.country}
                        onChange={(e) => this.EntryValueName(e, "country")}
                        options={this.state.selectCountry}
                        placeholder=""
                        isSearchable={true}
                        className="cntryDrop"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid className="clear"></Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>{home_telephone}</label>
                    <Grid>
                      {this.updateFLAG(UpDataDetails.phone) &&
                        this.updateFLAG(UpDataDetails.phone) !== "" && (
                          <ReactFlagsSelect
                            placeholder={country_code}
                            onSelect={(e) => {
                              this.updateFlags(e, "flag_phone");
                            }}
                            name="flag_phone"
                            showSelectedLabel={false}
                            defaultCountry={this.updateFLAG(
                              UpDataDetails.phone
                            )}
                          />
                        )}
                      <input
                        type="text"
                        className="Mobile_extra"
                        placeholder={phone}
                        name="phone"
                        onChange={this.updateEntryState1}
                        value={
                          UpDataDetails.phone &&
                          this.updateMOBILE(UpDataDetails.phone)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid className="clear"></Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>{mobile_number}</label>
                    <Grid>
                      {this.updateFLAG(UpDataDetails.mobile) &&
                        this.updateFLAG(UpDataDetails.mobile) !== "" && (
                          <ReactFlagsSelect
                            placeholder={country_code}
                            onSelect={(e) => {
                              this.updateFlags(e, "flag_mobile");
                            }}
                            name="flag_mobile"
                            showSelectedLabel={false}
                            defaultCountry={this.updateFLAG(
                              UpDataDetails.mobile
                            )}
                          />
                        )}
                      <input
                        type="text"
                        className="Mobile_extra"
                        placeholder={mobile}
                        name="mobile"
                        type="text"
                        onChange={this.updateEntryState1}
                        value={
                          UpDataDetails.mobile &&
                          this.updateMOBILE(UpDataDetails.mobile)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid className="clear"></Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>{fax_nmbr}</label>
                    <Grid>
                      {this.updateFLAG(UpDataDetails.fax) &&
                        this.updateFLAG(UpDataDetails.fax) !== "" && (
                          <ReactFlagsSelect
                            placeholder={country_code}
                            onSelect={(e) => {
                              this.updateFlags(e, "flag_fax");
                            }}
                            name="flag_fax"
                            showSelectedLabel={false}
                            defaultCountry={this.updateFLAG(UpDataDetails.fax)}
                          />
                        )}
                      <input
                        type="text"
                        className="Mobile_extra"
                        placeholder={fax_nmbr}
                        name="fax"
                        type="text"
                        onChange={this.updateEntryState1}
                        value={
                          UpDataDetails.fax &&
                          this.updateMOBILE(UpDataDetails.fax)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid className="clear"></Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>
                      {Languages} {spoken}
                    </label>
                    <Grid>
                      <Select
                        value={this.state.name_multi}
                        name="languages"
                        closeMenuOnSelect={false}
                        onChange={(e) => {
                          this.handleChange_multi(e, "languages");
                        }}
                        options={this.state.languageData}
                        placeholder=""
                        isSearchable={true}
                        className="profile-language"
                        isMulti={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid className="clear"></Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>{speciality}</label>
                    <Grid>
                      <Select
                        value={this.state.speciality_multi}
                        name="speciality"
                        closeMenuOnSelect={false}
                        onChange={(e) => {
                          this.handleChange_multi(e, "speciality");
                        }}
                        options={this.state.specialityData}
                        placeholder=""
                        isSearchable={true}
                        className="profile-language"
                        isMulti={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid className="clear"></Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>{sub_specilaity}</label>
                    <Grid>
                      <Select
                        value={this.state.subspeciality_multi}
                        name="subspeciality"
                        closeMenuOnSelect={false}
                        onChange={(e) => {
                          this.handleChange_multi(e, "subspeciality");
                        }}
                        options={
                          subspecialityData !== undefined
                            ? Array.from(new Set(subspecialityData))
                            : []
                        }
                        placeholder=""
                        isSearchable={true}
                        className="profile-language"
                        isMulti={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid className="clear"></Grid>
                </Grid>
              </Grid>

              <Grid className="kycForms sprtImg">
                <Grid item xs={12} md={11}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} md={6}>
                      <FileUploader
                        name="uploadImage"
                        fileUpload={this.fileUpload}
                        isMulti={false}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {this.state.image && this.state.image !== "" && (
                        <img
                          className="ProfileImage"
                          onClick={() => GetUrlImage1(this.state.image)}
                          src={this.state.image}
                          alt=""
                          title=""
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Grid className="clear"></Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid className="infoSub">
              <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item xs={12} md={8}>
                  <Grid>
                    <input
                      type="submit"
                      onClick={this.saveUserData}
                      value={save_change}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
                <Grid className="clear"></Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* QR Model setup */}
          <Modal
            open={this.state.qrOpen}
            onClose={this.handleQrClose}
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === "dark"
                ? "darkTheme qrBoxModel"
                : "qrBoxModel"
            }
          >
            <Grid className="qrBoxCntnt">
              <Grid className="qrCourse">
                <Grid className="qrCloseBtn">
                  <a onClick={this.handleQrClose}>
                    <img
                      src={require("../../../../assets/images/close-search.svg")}
                      alt=""
                      title=""
                    />
                  </a>
                </Grid>
                <Grid>
                  <label>{profile_qr_code}</label>
                </Grid>
              </Grid>
              <Grid className="qrCourseImg">
                {/* <Grid><img src={require('../../../../assets/images/qrimg.jpg')} alt="" title="" /></Grid> */}
                <Grid>
                  {" "}
                  <QRCode
                    value={
                      UpDataDetails.profile_id
                        ? "" + UpDataDetails.profile_id
                        : ""
                    }
                  />{" "}
                </Grid>
                <Grid>
                  <input
                    type="submit"
                    value={done}
                    onClick={this.handleQrClose}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Modal>
          {/* End of QR Model setup */}
          <Grid item xs={12} md={4}></Grid>
          <Grid className="clear"></Grid>
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
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings,OptionList })(
    Index
  )
);
