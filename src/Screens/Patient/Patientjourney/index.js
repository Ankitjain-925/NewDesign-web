import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import sitedata from "sitedata";
import axios from "axios";
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
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction.js";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { updateBlockchain } from "Screens/Components/BlockchainEntry/index.js";
import { Button } from '@material-ui/core';
import {
  SortByEntry,
  SortByDiagnose,
} from "Screens/Components/BasicMethod/index";
import Loader from "Screens/Components/Loader/index.js";
import npmCountryList from "react-select-country-list";
import FloatArrowUp from "../../Components/FloatArrowUp/index";
import { authy } from "Screens/Login/authy.js";
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import { getLanguage } from "translations/index"
import { get_cur_one, get_gender, get_track, delete_click_track, download_track } from "Screens/Components/CommonApi/index.js";
import { commonHeader } from "component/CommonHeader/index.js";
import ViewJourney from "Screens/Components/TimelineComponent/ViewJourney/index";

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
      AllQuestions1: [],
      ratingValue: false,
    };
  }

  viewDemos = () => {
    this.setState({ viewDemo: true });
  }
  CloseFile = () => {
    this.setState({ viewDemo: false });
  }

  handleSubmit = (question_id, type, rating , index) => {
    const answers = this.state.answers;
    var finalIndex = answers && answers.findIndex(x => x.question_id === question_id);
    if(type === 'classic'){
      if(finalIndex>-1){
        answers[finalIndex].question_id = question_id;
        answers[finalIndex].options = this.state.updateTrack?.options ? this.state.updateTrack?.options : []
      }
      else{
        answers.push({
          question_id, options: this.state.updateTrack?.options ? this.state.updateTrack?.options : []
        });
      }
      this.setState({
        answers,
        updateTrack: []
      });
    } else {
      if (finalIndex > -1) {
        answers[finalIndex].question_id = question_id;
        answers[finalIndex].rating = rating
      }
      else {
        answers.push({
          question_id, rating
        });
      }
      this.setState({
        answers, ratingValue: false
      });
    }
  };


  handleSubmit2 = (qustiondata, index) => {
    var data = this.state.answers;
    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + '/questionaire/AddAnswerspatient',
        {
          answers: data,
          house_name: qustiondata?.house_name,
          patient_id: this.props.stateLoginValueAim.user._id,
          house_id: qustiondata?.house_id,
          questionaire_id: qustiondata?._id,
          created_at: new Date(),
          question: qustiondata.questions
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

  options = (e, id, type, index) => {
    const state = this.state.updateTrack;
    var data = state.options ? state.options : []
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
        this.handleSubmit(id, type, false, index)
      });


  };
  otheranswer = (value) => {
    this.setState({ otherField: value })
  }

  updateEntry2 = (e, name, id, type, index) => {
    var state = this.state.updateTrack;
    state[name] = e.target.value;
    this.setState({ updateTrack: state }, () => {
      this.handleSubmit(id, type, false, index)
    });
  }

  componentDidMount() {
    var npmCountry = npmCountryList().getData();
    this.setState({ selectCountry: npmCountry });
    this.cur_one();
    this.getQuestionnaire();
    this.viewdata();
  }


  getActive = (activeIndex, question_id) => {
    var finalIndex = this.state.answers && this.state.answers.findIndex(x => x.question_id === question_id);
    if (finalIndex > -1) {
      return this.state.answers?.length > 0 ? this.state.answers?.[finalIndex]?.rating == activeIndex ? true : false : false
    }
    else {
      return false
    }
  }
  //Get Questionnaire
  getQuestionnaire = () => {
    let { AllQuestions } = this.state
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + '/vh/patientjourneyQue/' + this.props.stateLoginValueAim.user._id,
        commonHeader(this.props.stateLoginValueAim.token),
      )
      .then((response) => {
        if (response.data.hassuccessed) {
          this.setState({ AllQuestions1: response.data.data });
        }
        this.setState({ loaderImage: false });
      });
  }

  viewdata = () => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + '/vh/patientjourney/' + this.props.stateLoginValueAim.user._id,
        commonHeader(this.props.stateLoginValueAim.token),
      )
      .then((response) => {
        if (response.data.hassuccessed) {
          this.setState({ view: response.data.data });
        }
        this.setState({ loaderImage: false });
      });
  }

  //For get the Track
  getTrack = async () => {
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;
    this.setState({ loaderImage: true });
    let response = await get_track(user_token, user_id)
    if (response?.data?.hassuccessed === true) {
      //This is for Aimedis Blockchain Section
      updateBlockchain(
        this.props.stateLoginValueAim.user,
        response.data.data
      );
      var images = [];
      response.data.data = response.data.data.filter((e) => e != null);

      this.rightInfo();
      this.setState({
        allTrack1: response.data.data,
        allTrack2: response.data.data,
        loaderImage: false,
        // defaultValue : 10,
      },
        () => { this.Showdefaults(this.state.allTrack2, this.state.defaultValue) });
    } else {
      this.setState({ allTrack1: [], allTrack2: [], allTrack: [], loaderImage: false });
    }
  };

  //get the Current User Profile
  cur_one = async () => {
    var user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    let response = await get_cur_one(user_token, user_id)
    this.setState({ cur_one: response?.data?.data });
  };


  render() {
    const { stateLoginValueAim, Doctorsetget, House } = this.props;
    const { AllQuestions1 } = this.state

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
    let { Patientjourney, Questionnaire, Questionnaire_of, FinalSubmit } = translate;
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
        {this.state.loaderImage && <Loader />}
        <Notification />
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              {!this.state.isGraph && (
                <Grid container direction="row">
                  {/* Website Menu */}
                  <LeftMenu isNotShow={true} currentPage="patient-journey" />
                  <LeftMenuMobile isNotShow={true} currentPage="patient-journey" />
                  {/* End of Website Menu */}

                  {/* Website Mid Content */}
                  {/* <Grid item xs={12} md={8}> */}
                  {/* Start of Depression Section */}
                  <Grid item xs={11} md={11}>
                    <Grid className="descpCntntMain">
                      <Grid className="journalAdd">
                        <Grid container direction="row">
                          <Grid item xs={11} md={11}>
                            <Grid container direction="row">
                              <Grid item xs={6} md={6}>
                                <h1>{Patientjourney}</h1>
                              </Grid>
                              <Grid item xs={6} md={6}>

                              </Grid>
                              <Grid container direction="row">
                                <Grid item xs={11} md={11}>
                                  {/* For the filter section */}
                                  {/* <FilterSec
                                    FilterText={this.FilterText}
                                    settings={this.props.settings}
                                    FilterData={this.FilterData}
                                    SortData={this.SortData}
                                    ClearData={this.ClearData}
                                    sortBy={this.state.Sort}
                                    comesFrom="patient-journey"
                                  /> */}
                                  {this.state.AllQuestions1?.length > 0 &&
                                    <Grid item xs={12} md={8} className="SApratQuestion">
                                      {this.state.AllQuestions1?.length > 0 && this.state.AllQuestions1.map((item, index) => (<>
                                        <h1>{Questionnaire}</h1>
                                        {item?.length > 0 && item.map((data2, index2) => (
                                          <>
                                            <label>{Questionnaire_of} {data2.house_name}</label>
                                            {data2?.questions?.length > 0 && data2.questions.map((data1, index1) => (
                                              <>
                                                <Grid>
                                                  {data1.type === "classic" ?
                                                    <Grid className="QuesMrktUpr">
                                                      <Grid container direction="row">
                                                        <Grid item xs={12} md={12}>
                                                          <Grid className="QuesMrkt">
                                                            <h1>{data1?.question}</h1>
                                                          </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                          <Grid className="onlineBox">
                                                            {data1?.options.map((data3) => (
                                                              <>
                                                                <Grid><FormControlLabel
                                                                  control={<Checkbox
                                                                    value={data3}
                                                                    checked={this.state.newTask.options ? this.state.newTask.options : null}
                                                                    onChange={(e) => this.options(e, data1._id, data1.type, index1)}
                                                                    name={data3}
                                                                    color="primary"
                                                                  />} />{data3}</Grid>
                                                              </>))}

                                                            {data1?.other === true && (
                                                              <Grid className="otherBrdrUpr">
                                                                <FormControlLabel
                                                                  control={<Checkbox
                                                                    name="other"
                                                                    color="primary"
                                                                    checked={this.state.newTask.other ? this.state.newTask.other : null}
                                                                    onChange={(e) =>
                                                                      this.otheranswer(e.target.checked, "value", data1._id, data1.type, index1)
                                                                    }
                                                                    value="checkedB"
                                                                  />
                                                                  }
                                                                  label="other" />
                                                                {/* <Grid  className="otherBorder"></Grid> */}
                                                                {this.state.otherField && (
                                                                  <input type="text"
                                                                    onChange={(e) => { this.updateEntry2(e, "other", data1._id, data1.type, index1) }
                                                                    }
                                                                    name="other"></input>
                                                                )}
                                                              </Grid>
                                                            )}
                                                          </Grid>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={12}>
                                                      <Grid className="asnswerSbmt"><Button onClick={() => this.handleSubmit(data1._id, data1.type)}>Submit Answer</Button></Grid>
                                                    </Grid> */}
                                                      </Grid>
                                                    </Grid>
                                                    :
                                                    <Grid className="QuesMrktUpr">
                                                      <Grid container direction="row">
                                                        <Grid item xs={12} md={12}>
                                                          <Grid className="QuesMrkt">
                                                            {/* <Grid><a><img src={require('../../assets/images/germanMedical.png')} alt="" title="" /></a></Grid> */}
                                                            {/* <Grid><a><img src={require('../../assets/images/close-search.svg')} alt="" title="" /></a></Grid> */}
                                                          </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                          <h1>{data1.question}</h1>
                                                          <p>{data1.description}</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                          <Grid className="rateExp">
                                                            {/* <h3>How would you rate your experience with us?</h3> */}
                                                            <Grid>
                                                              <ul >
                                                                <li className={this.state.answers?.length > 0 && this.getActive(1, data1._id) ? 'activesecRating' : ''} onClick={() => this.handleSubmit(data1._id, data1.type, 1, index1)}><a >1</a></li>
                                                                <li className={this.state.answers?.length > 0 && this.getActive(2, data1._id) ? 'activesecRating' : ''} onClick={() => this.handleSubmit(data1._id, data1.type, 2, index1)}><a >2</a></li>
                                                                <li className={this.state.answers?.length > 0 && this.getActive(3, data1._id) ? 'activesecRating' : ''} onClick={() => this.handleSubmit(data1._id, data1.type, 3, index1)}><a >3</a></li>
                                                                <li className={this.state.answers?.length > 0 && this.getActive(4, data1._id) ? 'activesecRating' : ''} onClick={() => this.handleSubmit(data1._id, data1.type, 4, index1)} ><a >4</a></li>
                                                                <li className={this.state.answers?.length > 0 && this.getActive(5, data1._id) ? 'activesecRating' : ''} onClick={() => this.handleSubmit(data1._id, data1.type, 5, index1)}><a >5</a></li>
                                                                <li className={this.state.answers?.length > 0 && this.getActive(6, data1._id) ? 'activesecRating' : ''} onClick={() => this.handleSubmit(data1._id, data1.type, 6, index1)}><a >6</a></li>
                                                                <li className={this.state.answers?.length > 0 && this.getActive(7, data1._id) ? 'activesecRating' : ''} onClick={() => this.handleSubmit(data1._id, data1.type, 7, index1)}><a >7</a></li>
                                                                <li className={this.state.answers?.length > 0 && this.getActive(8, data1._id) ? 'activesecRating' : ''} onClick={() => this.handleSubmit(data1._id, data1.type, 8, index1)}><a >8</a></li>
                                                                <li className={this.state.answers?.length > 0 && this.getActive(9, data1._id) ? 'activesecRating' : ''} onClick={() => this.handleSubmit(data1._id, data1.type, 9, index1)}><a >9</a></li>
                                                                <li className={this.state.answers?.length > 0 && this.getActive(10, data1._id) ? 'activesecRating' : ''} onClick={() => this.handleSubmit(data1._id, data1.type, 10, index1)}><a >10</a></li>
                                                              </ul>
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={12}>
                                                      <Grid className="asnswerSbmt"><Button onClick={() => this.handleSubmit(data1._id, data1.type)}>Submit Feedback</Button></Grid>
                                                    </Grid> */}
                                                      </Grid>
                                                    </Grid>}
                                                </Grid>
                                              </>
                                            ))}
                                            {data2?.questions?.length > 0 && <Grid item xs={12} md={12}>
                                              <Grid className="asnswerSbmt"><Button onClick={() => this.handleSubmit2(data2, index2)}>{FinalSubmit}</Button></Grid>
                                            </Grid>}
                                          </>

                                        ))}
                                      </>))}
                                    </Grid>
                                  }
                                  {this.state.view &&
                                    this.state.view.length > 0 && (
                                      <div>
                                        {this.state.view.map((item, index) => (
                                          <ViewJourney
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
                                            images={this.state.images}
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
                                        {/* {this.state.allTrack2 > this.state.allTrack && <div className="more10entries" onClick={() => this.LoadMore(this.state.allTrack2)}>
                                    Seemore10entries
                                  </div>} */}
                                        {/* {this.state.loading && <div className="more10entries">
                                    loadingref
                                  </div>} */}
                                      </div>)
                                  }
                                </Grid>
                              </Grid>

                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>


                      {/* For Empty Entry */}

                    </Grid>
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
