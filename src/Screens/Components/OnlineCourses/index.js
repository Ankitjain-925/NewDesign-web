import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Select from "react-select";
import axios from "axios";
import sitedata from "sitedata";
import MyCourses from "./Components/myCourse";
import AllCourses from "./Components/allCourses";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Modal from "@material-ui/core/Modal";
// import { Doctorset } from 'Screens/Doctor/actions';
// import { filterate } from 'Screens/Doctor/filteraction';
import { withRouter } from "react-router-dom";
import Rating from "../Rating";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"
import StripeCheckout from "react-stripe-checkout";
import $ from "jquery"
import { getPublishableKey } from "Screens/Components/CardInput/getPriceId"
import { commonHeader } from "component/CommonHeader/index"
const CURRENCY = "USD";
//  const STRIPE_PUBLISHABLE = "pk_live_SUaxHsAUa2ebLQXAa7NoMwPQ";
// const STRIPE_PUBLISHABLE = "pk_test_qoJaLAHMXbv3fzci2AEcmkYX";
const STRIPE_PUBLISHABLE = getPublishableKey()

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
    this.StripeClick = React.createRef();
    this.state = {
      value: 0,
      selectedOption: null,
      openFancy: false,
      openWish: false,
      openCart: false,
      courseTopics: [],
      SelectedLanguage: { value: "All", label: "" },
      SelectedTopic: { value: "All", label: "" },
      Allwishlist: [],
      AllCart: [],
      addedCart: false,
      removeTrue: false,
      amount: 0,
      cartAlready: false,
      someIssue: false,
      SearchValue: '',
      forSearch: false
    };
  }
  handleChange = (event, value) => {
    let translate = getLanguage(this.props.stateLanguageType)
    let { language_all, topic_all } = translate;
    this.setState({
      value: value,
      SelectedLanguage: { value: "All", label: language_all },
      SelectedTopic: { value: "All", label: topic_all },
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedOption });
  };

  changeLanguageState() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { all } = translate;
    const Languages = [
      { value: "All", label: all },
      { value: "en", label: "English" },
      { value: "de", label: "German" },
      { value: "nl", label: "Dutch" },
      { value: "sp", label: "Spanish" },
      { value: "rs", label: "Russian" },
      { value: "pt", label: "Portuguese" },
      { value: "sw", label: "Swahili" },
      { value: "ch", label: "Chinese" },
      { value: "ar", label: "Arabic" },
      { value: "tr", label: "Turkish" },
    ];
    this.setState({ Languages });
  }

  componentDidMount() {
    this.changeLanguageState();
    this.getAlltopic();
    this.getAllwishlist();
    this.getAllCart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
      this.changeLanguageState();
      this.getAlltopic();
    }
  }

  //for getting the all Topic
  getAlltopic = () => {
    let translate = getLanguage(this.props.stateLanguageType)
    let { all } = translate;
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + "/admin/topic", commonHeader(user_token))
      .then((res) => {
        var topics = [{ label: all, value: all }];
        res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.map((item) => {
            topics.push({ label: item.topic_name, value: item.topic_name });
            this.setState({ courseTopics: topics });
          });
      });
  };

  //for searching 
  searchFilter = (e)=>{
    this.setState({ SearchValue: e.target.value })
  }  
  //for getting the All wishlists
  getAllwishlist = () => {
    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + "/lms/getWishlist",
        {
          user_id: this.props.stateLoginValueAim.user._id,
        },
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((res) => {
        if (res.data.hassuccessed) {
          this.setState({ Allwishlist: res.data.data });
        }
        this.setState({ loaderImage: false });
      })
      .catch((err) => { });
  };

  //For remove wishlist
  removeWishlist = (event) => {
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .delete(sitedata.data.path + "/admin/removeWishlist/" + event._id, commonHeader(user_token))
      .then((res) => {
        this.getAllwishlist();
      })
      .catch((err) => { });
  };
  //Get current User Information
  patientinfo() {
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + "/UserProfile/Users/" + user_id, commonHeader(user_token))
      .then((response) => {
        this.setState({ personalinfo: response.data.data, loaderImage: false });
      });
  }

  // fancybox open
  handleOpenFancy = () => {
    this.setState({ openFancy: true });
  };
  handleCloseFancy = () => {
    this.setState({ openFancy: false });
  };

  //For open or close the Wishlist
  handleOpenWish = () => {
    this.setState({ openWish: true });
  };
  handleCloseWish = () => {
    this.setState({ openWish: false });
  };

  //for open and close the cart
  handleOpenCart = () => {
    this.setState({ openCart: true });
  };
  handleCloseCart = () => {
    this.setState({ openCart: false });
  };

  //For add to card
  AddtoCard = (element, comeFrom) => {
    var data = element;
    if (!data._id) {
      data._id = data.courseId;
    }
    if (data.price === 0) {
      if (!data.courseId) {
        data.courseId = data._id;
      }
      let user_token = this.props.stateLoginValueAim.token;
      data.user_id = this.props.stateLoginValueAim.user._id;
      data.user_profile_id = this.props.stateLoginValueAim.user.profile_id;
      data.userName =
        this.props.stateLoginValueAim.user.first_name + ' ' +
        this.props.stateLoginValueAim.user.last_name;
      data.userType = this.props.stateLoginValueAim.user.type;
      data.email = this.props.stateLoginValueAim.user.email;
      delete data._id;

      this.setState({ loaderImage: true });
      axios
        .post(
          sitedata.data.path + "/lms_stripeCheckout/saveDataNotCart",
          {
            user_id: this.props.stateLoginValueAim.user._id,
            userName:
              this.props.stateLoginValueAim.user.first_name + ' ' +
              this.props.stateLoginValueAim.user.last_name,
            userType: this.props.stateLoginValueAim.user.type,
            orderlist: [data],
          },
          commonHeader(user_token)
        )
        .then((res) => {
          this.setState({ loaderImage: false });
          if (res.data.hassuccessed) {
            let translate = getLanguage(this.props.stateLanguageType)
            let {
              CourseAddedMyCourses, ok } = translate;
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
                    <h1>{CourseAddedMyCourses}</h1>
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
          else {
            this.setState({ someIssue: true })
            setTimeout(() => {
              this.setState({ someIssue: false });
            }, 3000);
          }
          this.getAllCart();
        })
        .catch((err) => {
          this.setState({ loaderImage: false });
          this.setState({ someIssue: true })
          setTimeout(() => {
            this.setState({ someIssue: false });
          }, 3000);
        });
    }
    else {
      var GetAllCart = this.state.AllCart;
      var GetCart =
        GetAllCart &&
        GetAllCart.length > 0 &&
        GetAllCart.filter((itm) => itm.courseId === data.courseId);
      if (GetCart && GetCart.length > 0) {
        this.setState({ cartAlready: true });
        setTimeout(() => {
          this.setState({ cartAlready: false });
        }, 3000);
      } else {
        let user_token = this.props.stateLoginValueAim.token;
        if (comeFrom === "all") {
          data.courseId = data._id;
          delete data.isActive;
          delete data.permission;
        } else {
          data.courseId = data.courseId;
          delete data.isActive;
          delete data.permission;
          delete data.wishlistAddedDate;
          delete data.createdAt;
          delete data.createdBy;
        }
        data.user_id = this.props.stateLoginValueAim.user._id;
        data.user_profile_id = this.props.stateLoginValueAim.user.profile_id;
        data.userName =
          this.props.stateLoginValueAim.user.first_name + ' ' +
          this.props.stateLoginValueAim.user.last_name;
        data.userType = this.props.stateLoginValueAim.user.type;
        data.email = this.props.stateLoginValueAim.user.email;
        delete data._id;
        GetAllCart.push(data);
        this.setState({ loaderImage: true });
        axios
          .post(
            sitedata.data.path + "/lms/addtocart",
            {
              user_id: this.props.stateLoginValueAim.user._id,
              cartList: GetAllCart,
            },
            commonHeader(user_token)
          )
          .then((res) => {
            this.setState({ addedCart: true, loaderImage: false });
            setTimeout(() => {
              this.setState({ addedCart: false });
            }, 3000);
            this.getAllCart();
          })
          .catch((err) => { });
      }
    }

  };

  //For remove the Cart
  RemoveCart = (data) => {
    let user_token = this.props.stateLoginValueAim.token;
    this.setState({ loaderImage: true });
    axios
      .delete(
        sitedata.data.path +
        "/lms/removeCart/" +
        data.user_id +
        "/" +
        data.courseId,
        commonHeader(user_token)
      )
      .then((res) => {
        this.setState({ removeTrue: true, loaderImage: false });
        setTimeout(() => {
          this.setState({ removeTrue: false });
        }, 3000);
        this.getAllCart();
      })
      .catch((err) => { });
  };

  //For get the Cart
  getAllCart = () => {
    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + "/lms/getCart",
        {
          user_id: this.props.stateLoginValueAim.user._id,
        },
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((res) => {
        if (res.data.hassuccessed) {
          if (res.data.data && res.data.data.cartList) {
            this.setState({ AllCart: res.data.data.cartList }, () => {
              var sum = 0;
              this.state.AllCart.forEach((element) => {
                sum = element.price + sum;
              });
              this.setState({ amount: sum });
            });
          }
        }
        this.setState({ loaderImage: false });
      })
      .catch((err) => { });
  };
  //Using to convert the currency
  fromDollarToCent = (amount) => {
    return parseInt(amount * 100);
  };

  onClicks = () => {
    this.handleCloseCart();
    this.StripeClick.onClick();
  };

  onClosed = () => {
    $("body").css("overflow", "auto");
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      all_course,
      Search,
      ok,
      pay_with_stripe,
      my_course,
      paymnt_err,
      paymnt_processed,
      topic_all,
      language_all,
      wishlist,
      cart_removed,
      remove,
      lectures,
      add_to_cart,
      cart,
      online_course,
    } = translate;

    const { value } = this.state;
    const { selectedOption } = this.state;
    //Success payment alert after payment is success
    const successPayment = (data) => {
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
              <h1>{paymnt_processed}</h1>
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

      let user_token = this.props.stateLoginValueAim.token;
      axios
        .post(
          sitedata.data.path + "/lms_stripeCheckout/saveData",
          {
            user_id: this.props.stateLoginValueAim.user._id,
            userName:
              this.props.stateLoginValueAim.user.first_name + ' ' +
              this.props.stateLoginValueAim.user.last_name,
            userType: this.props.stateLoginValueAim.user.type,
            paymentData: data,
            orderlist: this.state.AllCart,
          },
          commonHeader(user_token)
        )
        .then((res) => {
          this.getAllCart();
        })
        .catch((err) => { });
    };

    //Alert of the Error payment
    const errorPayment = (data) => {
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
              <h1>{paymnt_err}</h1>
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
    };

    //For convert EuroToCent
    const fromEuroToCent = (amount) => parseInt(amount * 100);

    //For payment
    const onToken = (token) =>
      axios
        .post(sitedata.data.path + "/lms_stripeCheckout", {
          source: token.id,
          currency: CURRENCY,
          amount: fromEuroToCent(this.state.amount),
        })
        .then(successPayment, this.setState({ addtocart: [] }))
        .catch(errorPayment);

    //For checkout Button
    const Checkout = ({
      name = "AIS",
      description = "Stripe Payment",
      amount = this.state.amount,
    }) => (
      <StripeCheckout
        ref={(ref) => {
          this.StripeClick = ref;
        }}
        name={name}
        image="https://sys.aimedis.io/static/media/LogoPNG.03ac2d92.png"
        billingAddress
        description={description}
        amount={this.fromDollarToCent(amount)}
        token={onToken}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
        label={pay_with_stripe}
        className="CutomStripeButton"
        closed={this.onClosed}
      />
    );
    return (
      <Grid className="onlineCoursesList">
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12} md={10}>
            <Grid className="onlinCours">
              <Grid container direction="row">
                <Grid item xs={12} md={6} className="onlinLft">
                  <h4>AIS {online_course}</h4>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid className="onlinRght">
                    <a><img src={require("assets/images/wishFill.png")} onClick={this.handleOpenWish} alt="" title="" /></a>
                    <a><img src={require("assets/images/cart.png")} onClick={this.handleOpenCart} alt="" title="" /></a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Open WishList Model setup */}
            <div className="fancyBoxMain">
              <Modal
                open={this.state.openWish}
                onClose={this.handleCloseWish}
                className={
                  this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode === "dark"
                    ? "wishListModel darkTheme"
                    : "wishListModel"
                }>
                <div className="wishListCntnt">
                  <div className="wshLstHai">
                    <div className="wshLstHaiLft"><label>{wishlist}</label></div>
                    <div className="wshLstHaiRght">
                      <a onClick={this.handleCloseWish}><img src={require("assets/images/close-search.svg")} alt="" title="" /> </a>
                    </div>
                  </div>
                  {/* WishList Content */}
                  {this.state.Allwishlist &&
                    this.state.Allwishlist.length > 0 &&
                    this.state.Allwishlist.map((item, index) => (
                      <Grid className="wshCorList">
                        <Grid className="wshCorListLbl">
                          <label>{item.courseTitle}</label>
                        </Grid>
                        <Grid className="wshCorListInr">
                          <Grid className="wshCorListPara">
                            <p>{item.courseDesc}</p>
                          </Grid>
                          <Grid className="wshCorListTime">
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
                          <Grid className="wshCorStar">
                            <Rating
                              size="20"
                              rating={
                                item.courseContent && item.courseContent.average
                              }
                            />

                            <span>
                              {item.courseContent && item.courseContent.average}
                              <a>
                                {item.courseContent &&
                                  "(" + item.courseContent.count + ")"}
                              </a>
                            </span>
                          </Grid>
                          <Grid className="wshCorPrice">
                            <label>{item.price} €</label>
                          </Grid>
                          <Grid className="nwWshCrtUpr">
                            <Grid container direction="row" alignItems="center">
                              <Grid item xs={12} md={9}>
                                <Grid
                                  className="nwWshCrt"
                                  onClick={() => this.AddtoCard(item)}
                                >
                                  <a>{add_to_cart}</a>
                                </Grid>
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Grid className="nwWshCrtRght">
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
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  {/* End of WishList Content */}
                </div>
              </Modal>
            </div>
            {/* End of WishList Model setup */}

            {/* online cart design */}
            <div className="fancyBoxMain">
              <Modal
                open={this.state.openCart}
                onClose={this.handleCloseCart}
                className={
                  this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode === "dark"
                    ? "crtListModel darkTheme"
                    : "crtListModel"
                }
              >
                <div className="crtListCntnt">
                  <div className="crtLstHai">
                    <div className="crtLstHaiLft">
                      <label>{cart}</label>
                    </div>
                    <div className="crtLstHaiRght">
                      <a onClick={this.handleCloseCart}>
                        <img
                          src={require("assets/images/close-search.svg")}
                          alt=""
                          title=""
                        />
                      </a>
                    </div>
                  </div>
                  {this.state.removeTrue && (
                    <div className="success_message">{cart_removed}</div>
                  )}
                  {this.state.AllCart &&
                    this.state.AllCart.length > 0 &&
                    this.state.AllCart.map((item, index) => (
                      <Grid className="crtCorList">
                        <Grid className="crtCorListLbl">
                          <label>{item.courseTitle}</label>
                        </Grid>
                        <Grid className="crtCorListInr">
                          <Grid className="crtCorListPara">
                            <p>{item.courseDesc}</p>
                          </Grid>
                          <Grid className="crtCorListTime">
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
                          <Grid className="crtCorStar">
                            <Rating
                              size="20"
                              rating={
                                item.courseContent && item.courseContent.average
                              }
                            />

                            <span>
                              {item.courseContent && item.courseContent.average}
                              <a>
                                {item.courseContent &&
                                  "(" + item.courseContent.count + ")"}
                              </a>
                            </span>
                          </Grid>
                          <Grid container direction="row" alignItems="center">
                            <Grid item xs={6} md={6}>
                              <Grid className="crtCorPrice">
                                <label>{item.price} €</label>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <Grid className="crtCorRmv">
                                <a
                                  onClick={() => {
                                    this.RemoveCart(item);
                                  }}
                                >
                                  {remove}
                                </a>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}

                  <Grid className="crtChekOut">
                    {/* <input type="submit" value="Checkout" /> */}
                    {this.state.AllCart && this.state.AllCart.length > 0 && (
                      <input
                        type="button"
                        value={pay_with_stripe}
                        onClick={this.onClicks}
                      />
                    )}
                  </Grid>
                </div>
              </Modal>
            </div>
            {/* End of online cart design */}

            {/* Tabs  */}
            <Grid className="coursesTab 11">
              <Grid container direction="row">
                <Grid item xs={12} md={12} lg={4}>
                  <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange} className="onlineTabs">
                      <Tab label={all_course} className="onlineTabsIner" />
                      <Tab label={my_course} className="onlineTabsIner" />
                    </Tabs>
                  </AppBar>
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                  <Grid container direction="row"
                    justify="center" alignItems="center" spacing={2} className="topicLang">
                    <Grid item xs={12} lg={4}></Grid>
                    {this.state.forSearch ? <>
                    <Grid item xs={12} md={5} lg={7}>
                       <input name="Search" className="searchonLMS" placeholder={Search} value={this.state.SearchValue} onChange={(e) => this.searchFilter(e)} />
                    </Grid>
                    </>
                    :<>
                    <Grid item xs={12} md={5} lg={3}>
                      <Select
                        // value={this.state.SelectedTopic}
                        onChange={(e) => this.setState({ SelectedTopic: e })}
                        options={this.state.courseTopics}
                        placeholder={topic_all}
                        className="topicAll cstmSelect1"
                        isSearchable={true}
                      />
                    </Grid>
                    <Grid item xs={12} md={5} lg={4}>
                      <Select
                        // value={this.state.SelectedLanguage}
                        onChange={(e) => this.setState({ SelectedLanguage: e })}
                        options={this.state.Languages}
                        placeholder={language_all}
                        className="topicAll cstmSelect1"
                        isSearchable={true}
                      />
                    </Grid>
                    </>}
                    {this.state.forSearch ? 
                    <Grid item xs={12} md={2} lg={1}>
                      <Grid className="topicSrch" onClick={()=>{this.setState({forSearch: false})}}>
                        <img src={require("assets/images/close-search.svg")} alt="" title="" />
                      </Grid>
                    </Grid>
                    :
                    <Grid item xs={12} md={2} lg={1}>
                      <Grid className="topicSrch" onClick={()=>{this.setState({forSearch: true})}}>
                        <img src={require("assets/images/search-entries.svg")} alt="" title="" />
                      </Grid>
                    </Grid>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {value === 0 && (
              <TabContainer>
                <AllCourses
                  someIssue={this.state.someIssue}
                  cartAlready={this.state.cartAlready}
                  removeWishlist={this.removeWishlist}
                  Allwishlist={this.state.Allwishlist}
                  AddtoCard={this.AddtoCard}
                  getAllwishlist={this.getAllwishlist}
                  SelectedLanguage={this.state.SelectedLanguage}
                  SelectedTopic={this.state.SelectedTopic}
                  SearchValue={this.state.SearchValue}
                />
              </TabContainer>
            )}

            {value === 1 && (
              <TabContainer>
                <MyCourses
                  AllCart={this.state.AllCart}
                  SelectedLanguage={this.state.SelectedLanguage}
                  SelectedTopic={this.state.SelectedTopic}
                  SearchValue={this.state.SearchValue}
                />
              </TabContainer>
            )}
            {/* End of Website Right Content */}
          </Grid>
        </Grid>
        {this.state.AllCart && this.state.AllCart.length > 0 && <Checkout />}
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
