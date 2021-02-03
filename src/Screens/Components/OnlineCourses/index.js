import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Select from "react-select";
import axios from "axios";
import sitedata from "../../../sitedata";
import MyCourses from "./Components/myCourse";
import AllCourses from "./Components/allCourses";
import { connect } from "react-redux";
import { LoginReducerAim } from "../../Login/actions";
import { Settings } from "../../Login/setting";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Modal from "@material-ui/core/Modal";
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import { ConsoleCustom } from "./../BasicMethod/index";
import Rating from "../Rating";
import { LanguageFetchReducer } from "../../actions";
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
import StripeCheckout from "react-stripe-checkout";
import $ from "jquery"
const CURRENCY = "USD";
const STRIPE_PUBLISHABLE = "pk_live_SUaxHsAUa2ebLQXAa7NoMwPQ";
// const STRIPE_PUBLISHABLE = "pk_test_qoJaLAHMXbv3fzci2AEcmkYX";

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
    };
  }
  handleChange = (event, value) => {
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
    let { all, language_all, topic_all } = translate;
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
      { value: "ch", label: "Chainese" },
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
    let { all } = translate;
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + "/admin/topic", {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
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

  //for getting the All wishlists
  getAllwishlist = () => {
    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + "/lms/getWishlist",
        {
          user_id: this.props.stateLoginValueAim.user._id,
        },
        {
          headers: {
            token: this.props.stateLoginValueAim.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.hassuccessed) {
          this.setState({ Allwishlist: res.data.data });
        }
        this.setState({ loaderImage: false });
      })
      .catch((err) => {});
  };

  //For remove wishlist
  removeWishlist = (event) => {
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .delete(sitedata.data.path + "/admin/removeWishlist/" + event._id, {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        this.getAllwishlist();
      })
      .catch((err) => {});
  };
  //Get current User Information
  patientinfo() {
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + "/UserProfile/Users/" + user_id, {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
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
      if (comeFrom == "all") {
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
        this.props.stateLoginValueAim.user.first_name +
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
          {
            headers: {
              token: user_token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.setState({ addedCart: true, loaderImage: false });
          setTimeout(() => {
            this.setState({ addedCart: false });
          }, 3000);
          this.getAllCart();
        })
        .catch((err) => {});
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
        {
          headers: {
            token: user_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        this.setState({ removeTrue: true, loaderImage: false });
        setTimeout(() => {
          this.setState({ removeTrue: false });
        }, 3000);
        this.getAllCart();
      })
      .catch((err) => {});
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
        {
          headers: {
            token: this.props.stateLoginValueAim.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
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
      .catch((err) => {});
  };
  //Using to convert the currency
  fromDollarToCent = (amount) => {
    return parseInt(amount * 100);
  };

  onClicks = () => {
    this.handleCloseCart();
    this.StripeClick.onClick();
  };

  onClosed = ()=>{
    $("body").css("overflow", "auto");
 }

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
      all_course,
      ok,
      pay_with_stripe,
      my_course,
      paymnt_err,
      paymnt_processed,
      topic_all,
      language_all,
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
              this.props.stateLoginValueAim.user.first_name +
              this.props.stateLoginValueAim.user.last_name,
            userType: this.props.stateLoginValueAim.user.type,
            paymentData: data,
            orderlist: this.state.AllCart,
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
          this.getAllCart();
        })
        .catch((err) => {});
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
      name = "Aimedis",
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
        closed = {this.onClosed}
      />
    );
    return (
      <Grid className="onlineCoursesList">
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12} md={10}>
            <Grid className="onlinCours">
              <Grid container direction="row">
                <Grid item xs={12} md={6} className="onlinLft">
                  <h4>Aimedis {online_course}</h4>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid className="onlinRght">
                    <a>
                      <img
                        src={require("../../../assets/images/wishFill.png")}
                        onClick={this.handleOpenWish}
                        alt=""
                        title=""
                      />
                    </a>
                    <a>
                      <img
                        src={require("../../../assets/images/cart.png")}
                        onClick={this.handleOpenCart}
                        alt=""
                        title=""
                      />
                    </a>
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
                }
              >
                <div className="wishListCntnt">
                  <div className="wshLstHai">
                    <div className="wshLstHaiLft">
                      <label>{wishlist}</label>
                    </div>
                    <div className="wshLstHaiRght">
                      <a onClick={this.handleCloseWish}>
                        <img
                          src={require("../../../assets/images/close-search.svg")}
                          alt=""
                          title=""
                        />
                      </a>
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
                                  src={require("../../../assets/images/lectures.svg")}
                                  alt=""
                                  title=""
                                />
                                {item.attachment.length} {lectures}
                              </a>
                            </Grid>
                            {/* <Grid><a><img src={require('../../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid> */}
                          </Grid>
                          <Grid className="wshCorStar">
                            <Rating
                              size="20"
                              rating={
                                item.courseContent && item.courseContent.average
                              }
                            />
                            {/* <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-half.svg')} alt="" title="" /></a> */}
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
                                      src={require("../../../assets/images/fillWish.png")}
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
                          src={require("../../../assets/images/close-search.svg")}
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
                                  src={require("../../../assets/images/lectures.svg")}
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
                            {/* <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-half.svg')} alt="" title="" /></a> */}
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

                  {/* <Grid className="crtCorList">
                                        <Grid className="crtCorListLbl"><label>What is Diabetes?</label></Grid>
                                        <Grid className="crtCorListInr">
                                            <Grid className="crtCorListPara">
                                                <p>Here you see what diabetes is, how it comes to diabetes and why a good treatment is so crucial.</p>
                                            </Grid>
                                            <Grid className="crtCorListTime">
                                                <Grid><a><img src={require('../../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                <Grid><a><img src={require('../../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                            </Grid>
                                            <Grid className="crtCorStar">
                                                <a><img src={require('../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                <a><img src={require('../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                <a><img src={require('../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                <a><img src={require('../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                <a><img src={require('../../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                <span>4.5<a>(38)</a></span>
                                            </Grid>
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={6} md={6}>
                                                    <Grid className="crtCorPrice"><label>19 €</label></Grid>
                                                </Grid>
                                                <Grid item xs={6} md={6}>
                                                    <Grid className="crtCorRmv">
                                                        <a>Remove</a>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid> */}

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
            <Grid className="coursesTab">
              <Grid container direction="row">
                <Grid item xs={12} md={4}>
                  <AppBar position="static">
                    <Tabs
                      value={value}
                      onChange={this.handleChange}
                      className="onlineTabs"
                    >
                      <Tab label={all_course} className="onlineTabsIner" />
                      <Tab label={my_course} className="onlineTabsIner" />
                    </Tabs>
                  </AppBar>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                    className="topicLang"
                  >
                    <Grid item xs={12} md={4}></Grid>
                    <Grid item xs={12} md={3}>
                      <Select
                        // value={this.state.SelectedTopic}
                        onChange={(e) => this.setState({ SelectedTopic: e })}
                        options={this.state.courseTopics}
                        placeholder={topic_all}
                        className="topicAll"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Select
                        // value={this.state.SelectedLanguage}
                        onChange={(e) => this.setState({ SelectedLanguage: e })}
                        options={this.state.Languages}
                        placeholder={language_all}
                        className="topicAll"
                      />
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <Grid className="topicSrch">
                        <img
                          src={require("../../../assets/images/search-entries.svg")}
                          alt=""
                          title=""
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {value === 0 && (
              <TabContainer>
                <AllCourses
                  cartAlready={this.state.cartAlready}
                  removeWishlist={this.removeWishlist}
                  Allwishlist={this.state.Allwishlist}
                  AddtoCard={this.AddtoCard}
                  getAllwishlist={this.getAllwishlist}
                  SelectedLanguage={this.state.SelectedLanguage}
                  SelectedTopic={this.state.SelectedTopic}
                />
              </TabContainer>
            )}

            {value === 1 && (
              <TabContainer>
                <MyCourses
                  AllCart={this.state.AllCart}
                  SelectedLanguage={this.state.SelectedLanguage}
                  SelectedTopic={this.state.SelectedTopic}
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
