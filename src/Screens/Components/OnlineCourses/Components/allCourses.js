import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import Rating from "../../Rating";
import Loader from "Screens/Components/Loader/index.js";
import {
  getLanguage
} from "translations/index"
import { commonHeader } from "component/CommonHeader/index"
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
      allCourse: [],
      allCourse1: [],
      newCourse: [],
      newCourse1: [],
      loaderImage: false,
      addedWish: false,
      Allwishlist: [],
      MyCourse2: [],
      cartAlready: this.props.cartAlready,
      someIssue: this.props.someIssue
    };
  }

  componentDidMount() {
    this.getOrderhistory();
    this.getAllList();
  }


    //Go to the view Courses
  viewCourses = (item) => {
    item.courseId = item._id;
    this.props.history.push({
      pathname: `/${this.props.stateLoginValueAim.user.type}/view-course`,
      state: item,
    });
  };
  
   //Get My courses
   getOrderhistory = () => {
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .post(
        sitedata.data.path + "/lms/getOrderHistory",
        {
          user_id: this.props.stateLoginValueAim.user._id,
        },
        commonHeader(user_token)
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

          this.setState({ MyCourse2: Course});
        }
      })
      .catch((err) => {});
  };
  //get All the Course
  getAllList = () => {
    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + "/lms/getVideoList",
        { user_type: this.props.stateLoginValueAim.user.type },
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        var NewVideo = response.data.data.slice(0, 3);
        // var AllVideo = response.data.data.slice(3)
        this.setState({
          loaderImage: false,
          newCourse: NewVideo,
          newCourse1: NewVideo,
          allCourse: response.data.data,
          allCourse1: response.data.data,
        });
      });
  };

  //For add to wishlist
  AddtoWishtlist = (element) => {
    var data = element;
    if (!data._id) {
      data._id = data.courseId;
    }
    let user_token = this.props.stateLoginValueAim.token;
    data.courseId = data._id;
    data.user_id = this.props.stateLoginValueAim.user._id;
    data.user_profile_id = this.props.stateLoginValueAim.user.profile_id;
    data.userName =
      this.props.stateLoginValueAim.user.first_name +
      this.props.stateLoginValueAim.user.last_name;
    data.userType = this.props.stateLoginValueAim.user.type;
    data.email = this.props.stateLoginValueAim.user.email;
    data.createdBy = this.props.stateLoginValueAim.user._id;
    data.createdAt = new Date();
    data.wishlistAddedDate = new Date();
    delete data.permission;
    delete data._id;

    this.setState({ loaderImage: true });
    axios
      .post(sitedata.data.path + "/lms/addtowishlist", data, commonHeader(user_token))
      .then((res) => {
        this.setState({ addedWish: true, loaderImage: false });
        setTimeout(() => {
          this.setState({ addedWish: false });
        }, 3000);
        this.props.getAllwishlist();
        this.getAllList();
      })
      .catch((err) => {});
  };

  //For open to give rating
  handleOpenFancy = () => {
    this.setState({ openFancy: true });
  };
  handleCloseFancy = () => {
    this.setState({ openFancy: false });
  };

  //For Remove the Wishlist
  removeWishlist = (item) => {
    var Reuslt = this.state.Allwishlist.filter(
      (Wish) => Wish.courseId === item._id
    );
    if (Reuslt && Reuslt.length > 0) {
      this.props.removeWishlist(Reuslt[0]);
    }
  };
  //on getting filter and filter Accordingly
  componentDidUpdate = (prevProps) => {
    if (prevProps.cartAlready !== this.props.cartAlready) {
      this.setState({ cartAlready: this.props.cartAlready });
    }
    if (prevProps.someIssue !== this.props.someIssue) {
      this.setState({ someIssue: this.props.someIssue });
    }
    if (
      prevProps.SelectedLanguage !== this.props.SelectedLanguage ||
      prevProps.SelectedTopic !== this.props.SelectedTopic
    ) {
      if (
        this.props.SelectedLanguage.value === "All" &&
        this.props.SelectedTopic.value === "All"
      ) {
        this.setState({
          allCourse: this.state.allCourse1,
          newCourse: this.state.newCourse1,
        });
      } else if (
        this.props.SelectedLanguage.value === "All" &&
        this.props.SelectedTopic.value !== "All"
      ) {
        var myFilterData1 = this.state.newCourse1.filter((value) =>
          value.topic.includes(this.props.SelectedTopic.value)
        );
        var myFilterData = this.state.allCourse1.filter((value) =>
          value.topic.includes(this.props.SelectedTopic.value)
        );
        this.setState({ allCourse: myFilterData, newCourse: myFilterData1 });
      } else if (
        this.props.SelectedLanguage.value !== "All" &&
        this.props.SelectedTopic.value === "All"
      ) {
        var myFilterData1 = this.state.newCourse1.filter(
          (value) => value.language === this.props.SelectedLanguage.value
        );
        var myFilterData = this.state.allCourse1.filter(
          (value) => value.language === this.props.SelectedLanguage.value
        );
        this.setState({ allCourse: myFilterData, newCourse: myFilterData1 });
      } else {
        var myFilterData1 = this.state.newCourse1.filter(
          (value) =>
            value.topic.includes(this.props.SelectedTopic.value) &&
            value.language === this.props.SelectedLanguage.value
        );
        var myFilterData = this.state.allCourse1.filter(
          (value) =>
            value.topic.includes(this.props.SelectedTopic.value) &&
            value.language === this.props.SelectedLanguage.value
        );
        this.setState({ allCourse: myFilterData, newCourse: myFilterData1 });
      }
    }
    if (prevProps.Allwishlist !== this.props.Allwishlist) {
      this.setState({ Allwishlist: this.props.Allwishlist });
    }
  };

  render() {
    const { value } = this.state;
    const { selectedOption } = this.state;

    let translate = getLanguage(this.props.stateLanguageType)
    let {
      item_present_in_cart,
      new_course,
      item_added_to_wishlist,
      all_course,
      lectures,
      add_to_cart,
      course_not_updt_cannt_reach_srvr,
      Enrolled
      
    } = translate;

    return (
      <div>
        {this.state.loaderImage && <Loader />}

        {this.state.addedWish && (
          <div className="success_message">{item_added_to_wishlist}</div>
        )}
        {this.state.cartAlready && (
          <div className="err_message">{item_present_in_cart}</div>
        )}
        {this.state.someIssue && (
          <div className="err_message">{course_not_updt_cannt_reach_srvr}</div>
        )}
        
        <Grid className="nwCoursName">
          <h3>{new_course}</h3>
        </Grid>

        <Grid container direction="row" spacing={4} className="newCourseCntnt">
          {this.state.newCourse &&
            this.state.newCourse.length > 0 &&
            this.state.newCourse.map((item, index) => (
              <Grid item xs={12} md={4}>
                <Grid
                  className={
                    this.state.Allwishlist.some(
                      (Wish) => Wish.courseId === item._id
                    )
                      ? "courseList cardAddedWish"
                      : "courseList"
                  }
                >
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
                            src={require("assets/images/lectures.svg")}
                            alt=""
                            title=""
                          />
                          {item.attachment.length} {lectures}
                        </a>
                      </Grid>
                      {/* <Grid><a><img src={require('assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid> */}
                    </Grid>
                    <Grid className="courseStar">
                      <Rating
                        size="20"
                        rating={
                          item.courseContent && item.courseContent.average
                        }
                      />
                     
                      <span>
                        {item.courseContent && item.courseContent.average}
                        {item.courseContent && (
                          <a>( {item.courseContent.count})</a>
                        )}
                      </span>
                    </Grid>
                    <Grid className="coursePrice">
                      <label>{item.price} €</label>
                    </Grid>
                  </Grid>
                  {this.state.MyCourse2.some(
                        (Wish) => Wish.courseId === item._id
                      ) ? 
                      <Grid className="add_wishList">
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={10} md={9}>
                          <Grid className="nwCoursCrt">
                            <a onClick={() => this.viewCourses(item)}>
                              {Enrolled}
                            </a>
                          </Grid>
                        </Grid>
                        <Grid item xs={2} md={3}>
                          
                        </Grid>
                      </Grid>
                    </Grid>: 
                  <Grid className="add_wishList">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={10} md={9}>
                      <Grid className="nwCoursCrt">
                        <a onClick={() => this.props.AddtoCard(item, "all")}>
                          {add_to_cart}
                        </a>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} md={3}>
                      <Grid className="nwCoursCrtRght">
                        {this.state.Allwishlist.some(
                          (Wish) => Wish.courseId === item._id
                        ) ? (
                          <a
                            onClick={() => {
                              this.removeWishlist(item);
                            }}
                          >
                            <img
                              src={require("assets/images/fillWish.png")}
                              alt=""
                              title=""
                            />
                           </a>
                        ) : (
                          <a>
                            <img
                              onClick={() => this.AddtoWishtlist(item)}
                              src={require("assets/images/wishlist.png")}
                              alt=""
                              title=""
                            />
                          </a>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>}
                </Grid>
              </Grid>
            ))}
         
          <Grid className="clear"></Grid>
        </Grid>

        {/* Second option */}
        <Grid className="nwCoursName">
          <h3>{all_course}</h3>
        </Grid>
        <Grid container direction="row" spacing={4} className="newCourseCntnt">
          {this.state.allCourse &&
            this.state.allCourse.length > 0 &&
            this.state.allCourse.map((item, index) => (
              <Grid item xs={12} md={4}>
                <Grid
                  className={
                    this.state.Allwishlist.some(
                      (Wish) => Wish.courseId === item._id
                    )
                      ? "courseList cardAddedWish"
                      : "courseList"
                  }
                >
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
                            src={require("assets/images/lectures.svg")}
                            alt=""
                            title=""
                          />
                          {item.attachment.length} {lectures}
                        </a>
                      </Grid>
                     
                    </Grid>
                    <Grid className="courseStar">
                      <Rating
                        size="20"
                        rating={
                          item.courseContent && item.courseContent.average
                        }
                      />
                      
                      <span>
                        {item.courseContent && item.courseContent.average}
                        <a>
                          {item.courseContent && (
                            <a>( {item.courseContent.count})</a>
                          )}
                        </a>
                      </span>
                    </Grid>
                    <Grid className="coursePrice">
                      <label>{item.price} €</label>
                    </Grid>
                  </Grid>
                  {this.state.MyCourse2.some(
                            (Wish) => Wish.courseId === item._id
                          ) ? 
                          <Grid className="add_wishList">
                          <Grid container direction="row" alignItems="center">
                            <Grid item xs={10} md={9}>
                              <Grid className="nwCoursCrt">
                                <a onClick={() => this.viewCourses(item)}>
                                  {Enrolled}
                                </a>
                              </Grid>
                            </Grid>
                            <Grid item xs={2} md={3}>
                              
                            </Grid>
                          </Grid>
                        </Grid>: 
                  <Grid className="add_wishList">
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={10} md={9}>
                      <Grid className="nwCoursCrt">
                        <a onClick={() => this.props.AddtoCard(item, "all")}>
                          {add_to_cart}
                        </a>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} md={3}>
                      <Grid className="nwCoursCrtRght">
                        {this.state.Allwishlist.some(
                          (Wish) => Wish.courseId === item._id
                        ) ? (
                          <a
                            onClick={() => {
                              this.removeWishlist(item);
                            }}
                          >
                            <img
                              src={require("assets/images/fillWish.png")}
                              alt=""
                              title=""
                            />
                           </a>
                        ) : (
                          <a>
                            <img
                              onClick={() => this.AddtoWishtlist(item)}
                              src={require("assets/images/wishlist.png")}
                              alt=""
                              title=""
                            />
                          </a>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>}
                </Grid>
              </Grid>
            ))}
          {/* <Grid item xs={12} md={4}>
                        <Grid className="courseList">
                            <Grid className="courseListLbl"><label>What is Diabetes?</label></Grid>
                            <Grid className="courseListInr">
                                <Grid className="courseListPara">
                                    <p>Here you see what diabetes is, how it comes to
                                    diabetes and why a good treatment is so crucial.</p>
                                </Grid>
                                <Grid className="courseListTime">
                                    <Grid><a><img src={require('assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                    <Grid><a><img src={require('assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                </Grid>
                                <Grid className="courseStar">
                                    <a><img src={require('assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                    <span>4.5<a>(38)</a></span>
                                </Grid>

                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6}>
                                        <Grid className="coursePrice"><label>19 €</label></Grid>
                                    </Grid>
                                    <Grid item xs={6} md={6} className="fillWish">
                                        <a><img src={require('assets/images/fillWish.png')} alt="" title="" /></a>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Grid className="courseList">
                            <Grid className="courseListLbl"><label>What is Diabetes?</label></Grid>
                            <Grid className="courseListInr">
                                <Grid className="courseListPara">
                                    <p>Here you see what diabetes is, how it comes to
                                    diabetes and why a good treatment is so crucial.</p>
                                </Grid>
                                <Grid className="courseListTime">
                                    <Grid><a><img src={require('assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                    <Grid><a><img src={require('assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                </Grid>
                                <Grid className="courseStar">
                                    <a><img src={require('assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                    <span>4.5<a>(38)</a></span>
                                </Grid>
                                <Grid className="coursePrice"><label>19 €</label></Grid>
                            </Grid>
                        </Grid>
                    </Grid> */}
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
