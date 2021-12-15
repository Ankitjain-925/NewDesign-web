import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import sitedata from "sitedata";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { OptionList } from "Screens/Login/metadataaction";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { pure } from "recompose";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import { LanguageFetchReducer } from "Screens/actions";
import FilterSec from "Screens/Components/TimelineComponent/Filter/index";
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction.js";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import VideoDemo from "Screens/Components/VideoDemo/index";
import {
  mySorter,
  SortByEntry,
  SortByDiagnose,
  getReminder,
  isToday
} from "Screens/Components/BasicMethod/index";
import ViewTimeline from "Screens/Components/TimelineComponent/ViewTimeline/index";
import Loader from "Screens/Components/Loader/index.js";
import npmCountryList from "react-select-country-list";
import FloatArrowUp from "../../Components/FloatArrowUp/index";
import { authy } from "Screens/Login/authy.js";
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import { getLanguage } from "translations/index"
import DownloadFullTrack from "../../Components/DownloadFullTrack/index";
import { get_cur_one, get_gender, get_track, delete_click_track, download_track } from "Screens/Components/CommonApi/index.js";
import { commonHeader } from "component/CommonHeader/index.js";

var Datas = [];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_select: "diagnosis",
      updateOne: 0,
      updateTrack: {},
      cur_one: {},
      personalinfo: {},
      medication_unit: [],
      personalised_card: [],
      Alltemprature: [],
      AllATC_code: [],
      Allpain_type: [],
      Allpain_quality: [],
      Pressuresituation: [],
      Allsituation: [],
      Allsmoking_status: [],
      Allreminder: [],
      AllreminderV: [],
      AllSpecialty: [],
      Allsubstance1: [],
      Allrelation: [],
      Allgender: [],
      AllL_P: [],
      Alltime_taken: [],
      added_data: [],
      allTrack: [],
      selectCountry: [],
      visibility: false,
      images: [],
      allTrack1: [],
      allTrack2: [],
      Sort: "diagnosed_time",
      isGraph: false,
      current_Graph: "",
      upcoming_appointment: [],
      SARS: [],
      Positive_SARS: [],
      vaccinations: [],
      defaultValue: 20,
      loading: false,
      AllQuestions: {},
      newTask: [],
      otherField: false,
      options: [],
      rating: "",
      final_Submit: [],
      answers: [],
      view: [],
      house_name: '',
      house_id: '',


    };
  }


  viewDemos = () => {
    this.setState({ viewDemo: true });
  }
  CloseFile = () => {
    this.setState({ viewDemo: false });
  }

  LoadMore = (allTrack) => {
    this.setState({ loading: true, defaultValue: this.state.defaultValue + 20 },
      () => {
        this.Showdefaults(allTrack, this.state.defaultValue)
        setTimeout(() => { this.setState({ loading: false }) }, 1000)
      })
  }
  //For render 10 entries at one time 
  Showdefaults = (allTrack, defaultValue) => {
    allTrack = allTrack?.length > 0 && allTrack?.slice(0, defaultValue);
    this.setState({ allTrack: allTrack })
  }
  OpenGraph = (current_Graph) => {
    this.setState({ current_Graph: current_Graph, isGraph: true });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  setRating = (rating) => {
    // console.log("rating", rating)
    this.setState({ ratingValue: rating })

  }

  handleSubmit = (_id) => {
    // console.log('updateTrack',this.state.updateTrack)
    const answers = this.state.answers;
    if (this.state.ratingValue) {
      var rating = this.state.ratingValue
      answers.push({
        _id, rating
      });
      this.setState({
        answers,
        rating: ""
      });
    } else {
      answers.push({
        _id, data: this.state.updateTrack
      });
      this.setState({
        answers,
        updateTrack: []
      });

    }
    console.log("answer", answers)
  };


  handleSubmit2 = (qustiondata, index) => {
    console.log("qustiondata", qustiondata)
    var data = this.state.answers;
    // data.viewQuestionaire = false;
    // data.submitQuestionaire = true;
    axios
      .post(
        sitedata.data.path + '/questionaire/AddAnswerspatient',
        {
          answers: data,
          house_name: qustiondata[index]?.house_name,
          patient_id: this.props.stateLoginValueAim.user._id,
          house_id: qustiondata[index]?.house_id,
          questionaire_id: qustiondata[index]?._id,

        },
        commonHeader(this.props.stateLoginValueAim.token),
      )
      .then((response) => {
        if (response.data.hassuccessed) {
          this.getQuestionnaire();

        }

        this.setState({ loaderImage: false });
      });
  };

  options = (e) => {
    const state = this.state.updateTrack;
    var data = state.options ? state.options : []
    console.log('e', state.options ? state.options : [])
    if (e.target.checked == true) {
      data.push(e.target.value);
    }
    else {

      if (data.indexOf(e.target.value) > 0) {
        var index = data.indexOf(e.target.value)
        data.splice(index, 1);
      }

    }
    state['options'] = data;
    this.setState({ updateTrack: state },
      () => {
        // console.log("data", this.state.updateTrack)
      });


  };
  otheranswer = (value) => {
    this.setState({ otherField: value })
    // console.log("hello", this.state.otherField)
  }

  updateEntry2 = (e, name) => {
    var state = this.state.updateTrack;
    state[name] = e.target.value;
    this.setState({ updateTrack: state });
    //  console.log("hell", this.state.updateTrack)
  }

  //For clear the filter
  ClearData = () => {
    this.setState(
      { Sort: "diagnosed_time", allTrack2: this.state.allTrack1, allTrack: this.state.allTrack1, defaultValue: 20 },
      () => {
        this.SortData()
        this.Showdefaults(this.state.allTrack2, this.state.defaultValue)
      }
    );
  };

  isThisAvilabel = (object, text) => {
    if (object && typeof object == "object") {
      if (
        object.type.replace("_", " ") &&
        object.type.replace("_", " ").includes(text)
      ) {
        return true;
      } else if (
        object.created_by_temp &&
        object.created_by_temp.includes(text)
      ) {
        return true;
      } else {
        return JSON.stringify(object).toLowerCase().includes(text);
      }
    } else {
      return false;
    }
  };

  FilterText = (text) => {
    let track = this.state.allTrack1;
    let FilterFromSearch =
      track &&
      track.length > 0 &&
      track.filter((obj) => {
        return this.isThisAvilabel(obj, text && text.toLowerCase());
      });
    this.setState({ allTrack2: FilterFromSearch, defaultValue: 20 },
      () => { this.Showdefaults(FilterFromSearch, this.state.defaultValue) });
  };

  //For filter the Data
  FilterData = (time_range, user_type, type, facility_type) => {
    var Datas1 = this.state.allTrack1;
    var FilterFromTime =
      time_range && time_range.length > 0
        ? this.FilterFromTime(Datas1, time_range)
        : Datas1;
    var FilerFromType =
      type && type.length > 0
        ? this.FilerFromType(FilterFromTime, type)
        : FilterFromTime;
    var FilterFromUserType =
      user_type && user_type.length > 0
        ? this.FilterFromUserType(FilerFromType, user_type)
        : FilerFromType;
    if (time_range === null && user_type === null && type === null) {
      FilterFromUserType = this.state.allTrack1;
    }
    FilterFromUserType = [...new Set(FilterFromUserType)];
    this.setState({ allTrack2: FilterFromUserType, defaultValue: 20 },
      () => { this.Showdefaults(FilterFromUserType, this.state.defaultValue) });
  };

  //Filter according to date range
  FilterFromTime = (Datas, time_range) => {
    if (time_range && time_range.length > 0) {
      let start_date = new Date(time_range[0]);
      let end_date = new Date(time_range[1]);
      start_date = start_date.setHours(0, 0, 0, 0);
      end_date = end_date.setDate(end_date.getDate() + 1);
      end_date = new Date(end_date).setHours(0, 0, 0, 0);
      return Datas.filter(
        (obj) =>
          new Date(obj.datetime_on) >= start_date &&
          new Date(obj.datetime_on) <= end_date
      );
    } else {
      return null;
    }
  };

  //Filter according to the type
  FilerFromType = (Datas, type) => {
    var Datas1 = [];
    if (Datas && Datas.length > 0) {
      if (type && type.length > 0) {
        type.map((ob) => {
          var dts = Datas.filter((obj) => obj.type === ob.value);
          Datas1 = Datas1.concat(dts);
        });
        return Datas1;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  //Filter according to User type
  FilterFromUserType = (Datas, user_type) => {
    var Datas1 = [];
    if (Datas && Datas.length > 0) {
      if (user_type && user_type.length > 0) {
        user_type.map((ob) => {
          var dts = Datas?.filter(
            (obj) => obj?.created_by_temp?.indexOf(ob.value) > -1
          );
          Datas1 = Datas1.concat(dts);
        });
        return Datas1;
      }
    }
    return null;
  };

  //For Sort the Data
  SortData = (data) => {
    if (data === "entry_time") {
      this.state.allTrack.sort(SortByEntry);
    } else {
      this.state.allTrack.sort(SortByDiagnose);
    }
    this.setState({ Sort: data });
  };

  //Modal Open on Archive the Journal
  ArchiveTrack = (data) => {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      archive_item,
      ok,
      do_u_really_want_archive_item,
      yes,
      no,
    } = translate;

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
            <h1>{archive_item}</h1>
            <p>{do_u_really_want_archive_item}</p>
            <div className="react-confirm-alert-button-group">
              <button
                onClick={() => {
                  this.updateArchiveTrack(data);
                  onClose();
                }}
              >
                {yes}
              </button>
              <button
                onClick={() => {
                  onClose();
                }}
              >
                {no}
              </button>
            </div>
          </div>
        );
      },
    });
  };
  //Delete the perticular track confirmation box
  DeleteTrack = (deletekey) => {
    let translate = getLanguage(this.props.stateLanguageType)
    let { delete_item, ok, do_u_really_want_delete_item, yes, no } = translate;
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
            <h1>{delete_item}</h1>
            <p>{do_u_really_want_delete_item}</p>
            <div className="react-confirm-alert-button-group">
              <button
                onClick={() => {
                  this.deleteClickTrack(deletekey);
                  onClose();
                }}
              >
                {yes}
              </button>
              <button
                onClick={() => {
                  onClose();
                }}
              >
                {no}
              </button>
            </div>
          </div>
        );
      },
    });
  };
  //Delete the track
  deleteClickTrack = async (deletekey) => {
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;
    this.setState({ loaderImage: true });
    let response = await delete_click_track(user_token, user_id, deletekey)
    if (response) {
      this.setState({ loaderImage: false });
    }
  };


  //Update Archive Track State
  updateArchiveTrack = (data) => {
    data.archive = true;
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;
    var track_id = data.track_id;
    this.setState({ loaderImage: true });
    axios
      .put(
        sitedata.data.path + "/User/AddTrack/" + user_id + "/" + track_id,
        { data },
        commonHeader(user_token)
      )
      .then((response) => {
        this.setState({
          ismore_five: false,
          updateTrack: {},
          updateOne: 0,
          isfileupload: false,
          isfileuploadmulti: false,
          loaderImage: false,
        });
      });
  };
 
  //For open Edit
  EidtOption = (value, updateTrack, visibility) => {
    if (value === "vaccination_trial") {
      this.setState({
        Positive_SARS: updateTrack.Positive_SARS,
        SARS: updateTrack.SARS
      })
    }
    this.setState(
      {
        updateOne: updateTrack.track_id,
        visibility: visibility,
        current_select: value,
        updateTrack: updateTrack
      },
      () => {
      }
    );
  };

  componentDidMount() {
    var npmCountry = npmCountryList().getData();
    this.setState({ selectCountry: npmCountry });
    // this.currentinfo();
    this.cur_one();
    this.getQuestionnaire();
    this.viewdata();
  }

  handleServiceStatus = async service => {
    const { subscription_info, payment_info, description } =
      typeof service == 'object' ? service : {};
    const { subscribed_from, subscribed_on } =
      typeof subscription_info == 'object' ? subscription_info : {};

    if (!description || typeof description !== 'string') return;
    const last_checked_on = await localStorage.getItem(
      'SUBSCRIPTION_CHECKED_ON'
    );
    const { productId, transactionReceipt, transactionId, purchaseToken } =
      typeof payment_info == 'object' ? payment_info : {};
    if (subscribed_from == 'ios') {
      if (
        this.isSubscriptionCheckupNeeded(last_checked_on)
      ) {
        axios
          .post(sitedata.data.path + '/v3/UserProfile/verifyStripe', {
            from: 'ios',
            env: 'production',
            receipt: transactionReceipt,
          })
          .then(responce => {
            let _data = responce.data;
            let { success, product } = typeof _data == 'object' ? _data : {};
            if (Array.isArray(product) && product.length > 0) {
            } else {
              this.canclePaidService(description);
            }
            localStorage.setItem(
              'SUBSCRIPTION_CHECKED_ON',
              new Date().toString(),
            );
          });
      }
    } else if (subscribed_from == 'android') {
      if (
        this.isSubscriptionCheckupNeeded(last_checked_on)
      ) {
        axios
          .post(sitedata.data.path + '/UserProfile/verifyStripe', {
            from: 'android',
            prodcutId: productId,
            purchaseToken: purchaseToken,
          })
          .then(responce => {
            let { product, success } =
              typeof responce.data == 'object' ? responce.data : {};

            if (product && success) {
              let { payload } = product ?? {};
              let { autoRenewing, expiryTimeMillis } = payload;
              if (!autoRenewing) {
                this.canclePaidService(description);
              }
            }
            localStorage.setItem(
              'SUBSCRIPTION_CHECKED_ON',
              new Date().toString(),
            );
          })
          .catch(e => { });
      }
    } else {
      if (this.isSubscriptionCheckupNeeded(last_checked_on)) {
        axios
          .get(sitedata.data.path + '/stripeCheckout/sub/' + payment_info.id)
          .then(responce => {
            if (responce.data.sub_status) {
            } else {
              this.canclePaidService(description);
            }
            localStorage.setItem(
              'SUBSCRIPTION_CHECKED_ON',
              new Date().toString(),
            );
          })
          .catch(e => { });;
      }
    }
  };

  isSubscriptionCheckupNeeded = (last_checked_on) => {

    if (isToday(last_checked_on)) {
      return false;
    } else {
      return true;
    }
  };
  canclePaidService = async description => {
    axios
      .delete(sitedata.data.path + "/UserProfile/Bookservice/" + description,
        commonHeader(this.props.stateLoginValueAim.token))
      .then((responce) => { })
      .catch(() => { });
  };

  //Get Questionnaire
  getQuestionnaire = () => {
    console.log("is",this.props.stateLoginValueAim)
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + '/vh/patientjourneyQue/' + this.props.stateLoginValueAim.user._id,
        commonHeader(this.props.stateLoginValueAim.token),
      )
      .then((response) => {
        console.log("Questionnaire", response)
        if (response.data.hassuccessed) {
          this.setState({ AllQuestions: response.data.data });
          console.log("Questionnaire", this.state.AllQuestions)
        }
        this.setState({ loaderImage: false });
      });
  }

  viewdata = () => {
    console.log("is",this.props.stateLoginValueAim)
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + '/vh/patientjourney/' + this.props.stateLoginValueAim.user._id,
        commonHeader(this.props.stateLoginValueAim.token),
      )
      .then((response) => {
        console.log("response",response)
        if (response.data.hassuccessed) {
          this.setState({ view: response.data.data });
          console.log("view", this.state.view)
        }
        this.setState({ loaderImage: false });
      });
  }

  //For adding the Track entry
  AddTrack = () => {
    this.setState({ loaderImage: true });
    var data = this.state.updateTrack;
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;
    if (this.state.isfileupload) {
      data.attachfile = this.state.fileattach;
    } else if (this.state.isfileuploadmulti) {
      data.attachfile = this.state.fileattach;
    }
    if (this.state.current_select === "vaccination_trial") {
      data.Positive_SARS = this.state.Positive_SARS;
      data.SARS = this.state.SARS;
    }
    data.type = this.state.current_select;
    data.created_on = new Date();
    data.datetime_on = new Date();
    if (
      this.state.current_select === "blood_pressure" ||
      this.state.current_select === "weight_bmi" ||
      this.state.current_select === "blood_sugar" ||
      this.state.current_select === "marcumar_pass" ||
      this.state.current_select === "laboratory_result"
    ) {
      if (data.date_measured && data.date_measured !== "") {
        data.datetime_on = new Date(data.date_measured);
      }
    } else if (this.state.current_select === "diagnosis") {
      if (data.diagnosed_on && data.diagnosed_on !== "") {
        data.datetime_on = new Date(data.diagnosed_on);
      }
    } else if (this.state.current_select === "doctor_visit") {
      if (data.date_doctor_visit && data.date_doctor_visits !== "") {
        data.datetime_on = new Date(data.date_doctor_visit);
      }
    } else if (this.state.current_select === "hospitalization") {
      if (data.first_visit_date && data.first_visit_date !== "") {
        data.datetime_on = new Date(data.first_visit_date);
      }
    } else if (this.state.current_select === "vaccination") {
      if (data.data_of_vaccination && data.data_of_vaccination !== "") {
        data.datetime_on = new Date(data.data_of_vaccination);
      }
    } else {
      if (data.event_date && data.event_date !== "") {
        data.datetime_on = new Date(data.event_date);
      } else {
        data.event_date = new Date();
      }
    }
    var track_id = this.state.updateTrack.track_id;
    if (
      this.state.updateTrack &&
      this.state.updateTrack.track_id &&
      this.state.updateTrack.track_id !== "" &&
      this.state.updateTrack.track_id !== "undefined"
    ) {
      axios
        .put(
          sitedata.data.path + "/User/AddTrack/" + user_id + "/" + track_id,
          { data },
          commonHeader(user_token)
        )
        .then((response) => {
          this.setState({
            ismore_five: false,
            Positive_SARS: [],
            SARS: [],
            isless_one: false,
            updateTrack: {},
            updateOne: 0,
            visibleupdate: 0,
            isfileupload: false,
            isfileuploadmulti: false,
            loaderImage: false,
          });
          this.handleCloseInqryNw();
        });
    } else {
      data.created_by = this.props.stateLoginValueAim.user._id;
      axios
        .put(
          sitedata.data.path + "/User/AddTrack/" + user_id,
          { data },
          commonHeader(user_token)
        )
        .then((response) => {
          this.setState({
            updateTrack: {},
            isfileupload: false,
            Positive_SARS: [],
            SARS: [],
            isfileuploadmulti: false,
            fileattach: {},
            current_select: "diagnosis",
            Addmore: true,
            newElement: false,
            loaderImage: false,
            ismore_five: false,
            isless_one: false,
          });
          this.handleCloseInqryNw();
        });
    }
    this.setState({ updateTrack: {} });
  };

  //For Set Format
  SetPesonalized = (data) => {
    this.setState({ loaderImage: true });
    axios
      .put(
        sitedata.data.path + "/UserProfile/updateSetting",
        {
          personalized: data,
          user_id: this.props.stateLoginValueAim.user._id,
          user_profile_id: this.props.stateLoginValueAim.user.profile_id,
        },
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.setState({ loaderImage: false });
      });
  };

  //Get the Current User Profile
  cur_one = async () => {
    var user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    let response = await get_cur_one(user_token, user_id)
    this.setState({ cur_one: response?.data?.data });
  };

 

  //This is for the Download the Track
  downloadTrack = async (data) => {
    this.setState({ loaderImage: true });
    let response = await download_track(data, this.props.stateLoginValueAim)
    setTimeout(() => {
      this.setState({ loaderImage: false });
    }, 5000)
  };

  render() {
    const { stateLoginValueAim, Doctorsetget, House } = this.props;
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
        <Notification />

        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              {!this.state.isGraph && (
                <Grid container direction="row">
                  {/* Website Menu */}
                  <LeftMenu isNotShow={true} currentPage="journal" />
                  <LeftMenuMobile isNotShow={true} currentPage="journal" />

                  {/* End of Website Menu */}

                  {/* Website Mid Content */}
                  {/* <Grid item xs={12} md={8}> */}
                    {/* Start of Depression Section */}
                    <Grid className="descpCntntMain">
                      <Grid className="journalAdd">
                        <Grid container direction="row">
                          <Grid item xs={11} md={11}>
                            <Grid container direction="row">
                              <Grid item xs={6} md={6}>
                                <h1>Patient journey</h1>
                              </Grid>
                              <Grid item xs={6} md={6}>
                                {/* <Grid className="AddEntrynw">
                                  <a onClick={this.handleOpenEntry}> */}
                                {/* + {add_new_entry} */}
                                {/* </a>
                                </Grid> */}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                   
                      {/* For the filter section */}
                      <FilterSec
                        FilterText={this.FilterText}
                        settings={this.props.settings}
                        FilterData={this.FilterData}
                        SortData={this.SortData}
                        ClearData={this.ClearData}
                        sortBy={this.state.Sort}
                      />

                      {/* For Empty Entry */}
                      <Grid item xs={12} md={8}>
                        <Grid>
                          {this.state.AllQuestions?.length > 0 && this.state.AllQuestions.map((data1, index) => (
                            <>
                              {data1?.questions.map((data) => (
                                <>
                                  {data.type === "classic" ?
                                    <Grid className="QuesMrktUpr">
                                      <Grid container direction="row">
                                        <Grid item xs={12} md={12}>
                                          <Grid className="QuesMrkt">
                                            <h1>{data?.question}</h1>
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Grid className="onlineBox">
                                            {data?.options.map((data3) => (
                                              <>
                                                <Grid><FormControlLabel
                                                  control={<Checkbox
                                                    value={data3}
                                                    checked={this.state.newTask.options ? this.state.newTask.options : null}
                                                    onChange={
                                                      this.options
                                                    }
                                                    name={data3}
                                                  color="primary"
                                                  />} />{data3}</Grid>
                                              </>))}
                                            {/* <Grid><FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="asdasdasd" /></Grid>
                                                            <Grid><FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="asdasdasdsad" /></Grid>
                                                            <Grid><FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="asdasd" /></Grid> */}
                                            {data?.other === true && (
                                              <Grid className="otherBrdrUpr">
                                                <FormControlLabel
                                                  control={<Checkbox
                                                    name="other"
                                                    color="primary"
                                                    checked={this.state.newTask.other ? this.state.newTask.other : null}
                                                    onChange={(e) =>
                                                      this.otheranswer(e.target.checked, "value")
                                                    }
                                                    value="checkedB"
                                                  />
                                                  }
                                                  label="other" />
                                                {/* <Grid  className="otherBorder"></Grid> */}
                                                {this.state.otherField && (
                                                  <input type="text"
                                                    onChange={(e) => { this.updateEntry2(e, "other") }
                                                    }
                                                    name="other"></input>
                                                )}
                                              </Grid>
                                            )}
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Grid className="asnswerSbmt"><Button onClick={() => this.handleSubmit(data._id)}>Submit Answer</Button></Grid>
                                          {/* {console.log('data', data)} */}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    :
                                    <Grid className="QuesMrktUpr">
                                      {/* {console.log("data2", data.type)} */}
                                      <Grid container direction="row">
                                        <Grid item xs={12} md={12}>
                                          <Grid className="QuesMrkt">
                                            {/* <Grid><a><img src={require('../../assets/images/germanMedical.png')} alt="" title="" /></a></Grid> */}
                                            {/* <Grid><a><img src={require('../../assets/images/closefancy.png')} alt="" title="" /></a></Grid> */}
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <h1>{data.question}</h1>
                                          <p>{data.description}</p>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Grid className="rateExp">
                                            {/* <h3>How would you rate your experience with us?</h3> */}
                                            <Grid>
                                              <ul >
                                                <li ><a onClick={() => this.setRating(1)}>1</a></li>
                                                <li><a onClick={() => this.setRating(2)}>2</a></li>
                                                <li><a onClick={() => this.setRating(3)}>3</a></li>
                                                <li><a onClick={() => this.setRating(4)}>4</a></li>
                                                <li><a onClick={() => this.setRating(5)}>5</a></li>
                                                <li><a onClick={() => this.setRating(6)}>6</a></li>
                                                <li><a onClick={() => this.setRating(7)}>7</a></li>
                                                <li><a onClick={() => this.setRating(8)}>8</a></li>
                                                <li><a onClick={() => this.setRating(9)}>9</a></li>
                                                <li><a onClick={() => this.setRating(10)}>10</a></li>
                                              </ul>
                                            </Grid>
                                          </Grid>

                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <Grid className="asnswerSbmt"><Button onClick={() => this.handleSubmit(data._id)}>Submit Feedback</Button></Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>}
                                </>
                              )
                              )}
                              <Grid item xs={12} md={12}>
                                <Grid className="asnswerSbmt"><Button onClick={() => this.handleSubmit2(this.state.AllQuestions, index)}>Final Submit</Button></Grid>
                              </Grid>
                            </>
                          ))}</Grid></Grid>

                      <div>
                        {this.state.allTrack &&
                          this.state.allTrack.length > 0 && (
                          <div>
                            {this.state.allTrack.map((item, index) => (
                              <ViewTimeline
                                indexTimeline={index}
                                // lrp={AllL_Ps.AllL_Ps.english}
                                Allrelation={this.state.Allrelation}
                                Allreminder={this.state.Allreminder}
                                Allpain_type={this.state.Allpain_type}
                                Allsmoking_status={this.state.Allsmoking_status}
                                Allgender={this.state.Allgender}
                                AllSpecialty={this.state.AllSpecialty}
                                Allpain_quality={this.state.Allpain_quality}
                                Allsituation={this.state.Allsituation}
                                Pressuresituation={this.state.Pressuresituation}
                                Anamnesis={this.state.Anamnesis}
                                TrackRecord={this.state.allTrack1}
                                OpenGraph={this.OpenGraph}
                                comesfrom="patient"
                                downloadTrack={(data) => this.downloadTrack(data)}
                                images={this.state.images}
                                DeleteTrack={(deleteKey) =>
                                  this.DeleteTrack(deleteKey)
                                }
                                ArchiveTrack={(data) => this.ArchiveTrack(data)}
                                EidtOption={(value, updateTrack, visibility) =>
                                  this.EidtOption(value, updateTrack, visibility)
                                }
                                date_format={
                                  this.props.settings &&
                                  this.props.settings.setting &&
                                  this.props.settings.setting.date_format
                                }
                                time_format={
                                  this.props.settings.setting.time_format
                                }
                                Track={item}
                                from="patient"
                                loggedinUser={this.state.cur_one}
                                patient_gender={this.state.patient_gender}
                              />
                            ))}
                            {this.state.allTrack2 > this.state.allTrack && <div className="more10entries" onClick={() => this.LoadMore(this.state.allTrack2)}>
                              Seemore10entries
                            </div>}
                            {this.state.loading && <div className="more10entries">
                              loadingref
                            </div>}
                          </div>)
                           }
                      </div>
                      {/* <ViewTimeline date_format={this.props.settings.setting.date_format}  time_format={this.props.settings.setting.time_format} allTrack={this.state.allTrack} from="patient" loggedinUser={this.state.cur_one} patient_gender={this.state.patient_gender} /> */}
                    </Grid>
                  {/* </Grid> */}
               
                </Grid>
              )}
            </Grid>
          </Grid>
          <FloatArrowUp stateLanguageType={this.props.stateLanguageType} />
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
  const { House } = state.houseSelect;
  const { verifyCode } = state.authy;
  const { metadata } = state.OptionList;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    metadata,
    House,
    //   Doctorsetget,
    //   catfil
  };
};
export default pure(withRouter(
  connect(mapStateToProps, {
    OptionList,
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
  })(Index))
);
