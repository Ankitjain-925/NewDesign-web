import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from "../../../Login/actions";
import { Settings } from "../../../Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "../../../actions";
import sitedata from "../../../../sitedata";
import Rating from "../../Rating";
import Loader from "./../../../Components/Loader/index.js";
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
function TabContainer(props) {
  return (
    <Typography component="div" style={{ paddingTop: 24 }}>
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MyCourse: [],
      MyCourse1: [],
      ratings: {},
      selectedCourse: "",
      EditRating: false,
      loaderImage: false,
      successfull: false,
      iserr: false,
      MyRating: [],
      MyCourse2: [],
      SelectOne: {},
    };
  }

  componentDidMount() {
    this.getMyRating();
  }

  //For the Star Rating
  ratingChange = (value) => {
    const state = this.state.ratings;
    state["rating"] = value;
    this.setState({ ratings: state });
  };

  //Manage the state Rating
  ManageRating = (e) => {
    const state = this.state.ratings;
    state[e.target.name] = e.target.value;
    this.setState({ ratings: state });
  };

  //Go to the view Courses
  viewCourses = (item) => {
    this.props.history.push({
      pathname: `/${this.props.stateLoginValueAim.user.type}/view-course`,
      state: item,
    });
  };

  //Get My ratings
  getMyRating = () => {
    var user_token = this.props.stateLoginValueAim.token;
    this.setState({ loaderImage: true });
    axios
      .get(sitedata.data.path + "/lms/myRating", {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data && res.data.hassuccessed) {
          this.setState({ MyRating: res.data.data }, () =>
            this.getOrderhistory()
          );
        }
      })
      .catch((err) => {});
  };

  //Get My courses
  getOrderhistory = () => {
    var user_token = this.props.stateLoginValueAim.token;
    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + "/lms/getOrderHistory",
        {
          user_id: this.props.stateLoginValueAim.user._id,
        },
        {
          headers: {
            token: user_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data && res.data.hassuccessed) {
          var Course = [];
          res.data.data &&
            res.data.data.length > 0 &&
            res.data.data.map((item) => {
              item.orderlist &&
                item.orderlist.length > 0 &&
                item.orderlist.map((item2) => {
                  Course.push(item2);
                });
            });

          this.setState({ MyCourse2: Course, loaderImage: false }, () =>
            this.IncludeRating()
          );
        }
      })
      .catch((err) => {});
  };

  //Including the rating on the My courses
  IncludeRating = () => {
    var data = [];
    this.state.MyCourse2 &&
      this.state.MyCourse2.length > 0 &&
      this.state.MyCourse2.map((item) => {
        var myFilterData = this.state.MyRating.filter(
          (value) => value.courseID === item.courseId
        );
        if (
          myFilterData &&
          myFilterData.length > 0 &&
          myFilterData[0] &&
          myFilterData[0].rating
        ) {
          item["rating"] = myFilterData[0].rating;
        }
        data.push(item);
      });
    this.setState({ MyCourse1: data, MyCourse: data });
  };

  //Send the rating on the course
  SendRating = () => {
    if (!this.state.ratings.rating) {
      this.setState({ iserr: true });
    } else {
      this.setState({ iserr: false, loaderImage: true });
      var user_token = this.props.stateLoginValueAim.token;
      axios
        .post(
          sitedata.data.path + "/lms/addRating/",
          {
            courseID: this.state.selectedCourse,
            user_id: this.props.stateLoginValueAim.user._id,
            user_profile_id: this.props.stateLoginValueAim.user.profile_id,
            rating: this.state.ratings.rating,
            short_message: this.state.ratings.short_message,
            addedDate: new Date(),
          },
          {
            headers: {
              token: user_token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.hassuccessed) {
            this.handleCloseFancy();
            this.setState({ loaderImage: false, successfull: true });
            setTimeout(() => {
              this.setState({ successfull: false });
            }, 5000);
            this.getMyRating();
          }
        })
        .catch((err) => {});
    }
  };

  //For getting user rating if user did
  your_rating = (cId) => {
    var myFilterData = this.state.MyRating.filter(
      (value) => value.courseID === cId
    );
    if (
      myFilterData &&
      myFilterData.length > 0 &&
      myFilterData[0] &&
      myFilterData[0].rating
    ) {
      return myFilterData[0].rating;
    }
    return null;
  };

  //Open your Rating Popup
  YourRatingCheck = () => {
    var myFilterData = this.state.MyRating.filter(
      (value) => value.courseID === this.state.selectedCourse
    );
    if (
      myFilterData &&
      myFilterData.length > 0 &&
      myFilterData[0] &&
      myFilterData[0]
    ) {
      this.setState({ ratings: myFilterData[0] });
    }
  };

  //For open to give ratincourseIDg
  handleOpenFancy = (Cid) => {
    var myFilterData = this.state.MyRating.filter(
      (value) => value.courseID === Cid
    );
    if (
      myFilterData &&
      myFilterData.length > 0 &&
      myFilterData[0] &&
      myFilterData[0]
    ) {
      this.setState({ ratings: myFilterData[0], EditRating: true });
    } else {
      this.setState({ ratings: {}, EditRating: false });
    }
    this.setState({ openFancy: true, selectedCourse: Cid });
  };

  //
  handleCloseFancy = () => {
    this.setState({ openFancy: false });
  };

  //on getting filter and filter Accordingly
  componentDidUpdate = (prevProps) => {
    if (
      prevProps.SelectedLanguage !== this.props.SelectedLanguage ||
      prevProps.SelectedTopic !== this.props.SelectedTopic
    ) {
      if (
        this.props.SelectedLanguage.value === "All" &&
        this.props.SelectedTopic.value === "All"
      ) {
        this.setState({ MyCourse: this.state.MyCourse1 });
      } else if (
        this.props.SelectedLanguage.value === "All" &&
        this.props.SelectedTopic.value !== "All"
      ) {
        var myFilterData = this.state.MyCourse1.filter((value) =>
          value.topic.includes(this.props.SelectedTopic.value)
        );
        this.setState({ MyCourse: myFilterData });
      } else if (
        this.props.SelectedLanguage.value !== "All" &&
        this.props.SelectedTopic.value === "All"
      ) {
        var myFilterData = this.state.MyCourse1.filter(
          (value) => value.language === this.props.SelectedLanguage.value
        );
        this.setState({ MyCourse: myFilterData });
      } else {
        var myFilterData = this.state.MyCourse1.filter(
          (value) =>
            value.topic.includes(this.props.SelectedTopic.value) &&
            value.language === this.props.SelectedLanguage.value
        );
        this.setState({ MyCourse: myFilterData });
      }
    }
    if (prevProps.AllCart !== this.props.AllCart) {
      this.getOrderhistory();
    }
  };

  render() {
    const { value } = this.state;
    const { selectedOption } = this.state;

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
      previous_lesson,
      next_lesson,
      plz_give_rate,
      poor,
      save_and_cont,
      fair,
      short_msg,
      good,
      very_good,
      excellent,
      specific_comments,
      rate_this_course,
      all_course,
      my_course,
      leave_rating,
      your_rating,
      start_learning,
      continue_watch,
      rating_sent_success,
      language_eng,
      wishlist,
      prescriptions,
      appointments,
      cart_removed,
      chat_vdocall,
      pharmacy_access,
      remove,
      lectures,
      add_to_cart,
      cart,
      capab_Patients,
      Inquiries,
      emegancy_access,
      archive,
      more,
      my_profile,
      invite_doc,
      pharma_prescription,
      online_course,
      profile_setting,
      Language,
      DarkMode,
      logout,
    } = translate;
    return (
      <div>
        {this.state.loaderImage && <Loader />}
        <Grid className="nwCoursName">
          <h3>{my_course}</h3>
        </Grid>
        {this.state.successfull && (
          <div className="success_message">{rating_sent_success}</div>
        )}
        <Grid container direction="row" spacing={3} className="newCourseCntnt">
          {this.state.MyCourse &&
            this.state.MyCourse.length > 0 &&
            this.state.MyCourse.map((item, index) => (
              <Grid item xs={12} md={4}>
                <Grid className="courseList">
                  <Grid className="courseListLbl">
                    <label>{item.courseTitle}</label>
                  </Grid>
                  <Grid className="courseListInr">
                    <Grid className="courseListPara">
                      <p>{item.courseDesc}</p>
                    </Grid>
                    <Grid className="courseListTime">
                      <Grid>
                        <a>
                          <img
                            src={require("../../../../assets/images/lectures.svg")}
                            alt=""
                            title=""
                          />
                          {item.attachment && item.attachment.length} {lectures}
                        </a>
                      </Grid>
                      {/* <Grid><a><img src={require('../../../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid> */}
                    </Grid>
                    <Grid className="courseStar">
                      {item.rating && item.rating > 0 && (
                        <Rating size="20" rating={item.rating && item.rating} />
                      )}
                      {!item.rating && <Rating size="20" rating={0} />}
                      {item.rating && item.rating == 0 && (
                        <Rating size="20" rating={0} />
                      )}
                      {/* <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a> */}
                      <span
                        onClick={() => this.handleOpenFancy(item.courseId)}
                      >
                        {item && this.your_rating(item.courseId)
                          ? your_rating
                          : leave_rating}
                      </span>
                    </Grid>
                    <Grid className="strtLrn">
                      <label onClick={() => this.viewCourses(item)}>
                        {item && this.your_rating(item.courseId)
                          ? continue_watch
                          : start_learning}
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}

          {/* <Grid item xs={12} md={4}>
                        <Grid className="courseList">
                            <Grid className="courseListLbl"><label>What is Diabetes?</label></Grid>
                            <Grid className="courseListInr">
                                <Grid className="courseListPara">
                                    <p>Here you see what diabetes is, how it comes to
                                    diabetes and why a good treatment is so crucial.
                                                </p>
                                </Grid>
                                <Grid className="courseListTime">
                                    <Grid><a><img src={require('../../../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                    <Grid><a><img src={require('../../../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                </Grid>
                                <Grid className="courseStar">
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                    <span onClick={this.handleOpenFancy}>Your rating</span>
                                </Grid>
                                <Grid className="strtLrn"><label>Continue watching</label></Grid>
                            </Grid>
                        </Grid>
                    </Grid> */}

          <Grid className="clear"></Grid>

          {/* Model setup */}
          <div className="fancyBoxMain">
            <Modal
              open={this.state.openFancy}
              onClose={this.handleCloseFancy}
              // className="fancyBoxModel"
              className={
                this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode === "dark"
                  ? "darkTheme"
                  : ""
              }
            >
              <div className="fancyBoxCntnt">
                <div className="rateCourse">
                  <div className="handleCloseBtn">
                    <a onClick={this.handleCloseFancy}>
                      <img
                        src={require("../../../../assets/images/close-search.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                  </div>
                  <div>
                    <label>{rate_this_course}</label>
                  </div>
                  <p>{specific_comments}</p>
                </div>
                {this.state.iserr && (
                  <div className="err_message">{plz_give_rate}</div>
                )}
                <div className="rateStars">
                  {this.state.ratings.rating > 0 &&
                    this.state.ratings.rating < 2 && <p>{poor}</p>}
                  {this.state.ratings.rating >= 2 &&
                    this.state.ratings.rating < 3 && <p>{fair}</p>}
                  {this.state.ratings.rating >= 3 &&
                    this.state.ratings.rating < 4 && <p>{good}</p>}
                  {this.state.ratings.rating >= 4 &&
                    this.state.ratings.rating < 5 && <p>{very_good}</p>}
                  {this.state.ratings.rating == 5 && <p>{excellent}</p>}
                  <div>
                    <Rating
                      size="50"
                      rating={
                        this.state.ratings &&
                        this.state.ratings.rating &&
                        this.state.ratings.rating
                      }
                      ratingChange={this.ratingChange}
                    />
                  </div>

                  {/* <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a> */}
                </div>
                <div className="shrtMsg">
                  <div>
                    <label>{short_msg}</label>
                  </div>
                  <div>
                    <textarea
                      name="short_message"
                      value={this.state.ratings.short_message}
                      onChange={this.ManageRating}
                    ></textarea>
                  </div>
                  {this.state.EditRating ? (
                    <div>
                      <input
                        type="submit"
                        onClick={this.handleCloseFancy}
                        value="Ok and Close"
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="submit"
                        onClick={this.SendRating}
                        value={save_and_cont}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Modal>
          </div>
          {/* End of Model setup */}
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
