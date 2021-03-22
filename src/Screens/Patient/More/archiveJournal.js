import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";
import sitedata from "sitedata";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import { LanguageFetchReducer } from "Screens/actions";
import {
  SortByEntry,
  SortByDiagnose,
} from "Screens/Components/BasicMethod/index";
import FilterSec from "Screens/Components/TimelineComponent/Filter/index";
import ViewTimeline from "Screens/Components/TimelineComponent/ViewTimeline/index";
import Loader from "Screens/Components/Loader/index.js";
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
import { authy } from "Screens/Login/authy.js";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderImage: false,
      images: [],
      allTrack2: [],
      allTrack: [],
      defaultValue : 20,
    };
    // new Timer(this.logOutClick.bind(this))
  }

  componentDidMount() {
    this.getTrack();
    this.getGender();
    this.cur_one();
  }

  LoadMore=(allTrack)=>{
    this.setState({loading: true, defaultValue : this.state.defaultValue+20}, 
      ()=>{ this.Showdefaults(allTrack, this.state.defaultValue)
        setTimeout(()=>{this.setState({loading: false})}, 1000)
      })
  }
  //For render 10 entries at one time 
  Showdefaults = (allTrack, defaultValue )=>{
    allTrack = allTrack?.length>0 && allTrack?.slice(0, defaultValue);
    this.setState({ allTrack : allTrack })
  }
  //Get the Current User Profile
  cur_one = () => {
    var user_token = this.props.stateLoginValueAim.token;
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
        this.setState({ cur_one: response.data.data });
      });
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
    //For clear the filter
    ClearData = () => {
      this.setState(
        { Sort: "diagnosed_time", allTrack2: this.state.allTrack1, allTrack: this.state.allTrack1, defaultValue: 20 },
        ()=>{this.SortData()
          this.Showdefaults(this.state.allTrack2, this.state.defaultValue) }
      ); 
    };

  FilterText = (text) => {
    let track = this.state.allTrack1;
    let FilterFromSearch =
      track &&
      track.length > 0 &&
      track.filter((obj) => {
        return this.isThisAvilabel(obj, text && text.toLowerCase());
      });
      this.setState({ allTrack2: FilterFromSearch, defaultValue: 20  },
        ()=>{ this.Showdefaults(FilterFromSearch, this.state.defaultValue) } );
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
    this.setState({ allTrack2: FilterFromUserType,  defaultValue: 20 },
      ()=>{ this.Showdefaults(FilterFromUserType, this.state.defaultValue) } );
  };

  //Filter according to date range
  FilterFromTime = (Datas, time_range) => {
    if (time_range && time_range.length > 0) {
      let start_date = new Date(time_range[0]);
      let end_date = new Date(time_range[1]);
      start_date = start_date.setHours(0, 0, 0, 0);
      end_date = end_date.setDate(end_date.getDate() + 1);
      end_date = new Date(end_date).setHours(0, 0, 0, 0);
      if (Datas && Datas.length > 0) {
        return Datas.filter(
          (obj) =>
            new Date(obj.datetime_on) >= start_date &&
            new Date(obj.datetime_on) <= end_date
        );
      } else {
        return [];
      }
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
          var dts = Datas.filter(
            (obj) => obj.created_by_temp.indexOf(ob.value) > -1
          );
          Datas1 = Datas1.concat(dts);
        });
        return Datas1;
      }
    }
    return null;
  };

  //For get the Track
  getTrack = () => {
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;

    this.setState({ loaderImage: true });
    axios
      .get(sitedata.data.path + "/User/ArchivedTrack/" + user_id, {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.hassuccessed === true) {
          var images = [];
           response.data.data = response.data.data.filter((e) => e != null);
          // response.data.data &&
          //   response.data.data.length > 0 &&
          //   response.data.data.map((data1, index) => {
          //     var find2 = data1 && data1.created_by_image;
          //     if (find2) {
          //       var find3 = find2.split(".com/")[1];
          //       axios
          //         .get(sitedata.data.path + "/aws/sign_s3?find=" + find3)
          //         .then((response2) => {
          //           if (response2.data.hassuccessed) {
          //             images.push({
          //               image: find2,
          //               new_image: response2.data.data,
          //             });
          //             this.setState({ images: images });
          //           }
          //         });
          //     }
          //     data1.attachfile &&
          //       data1.attachfile.length > 0 &&
          //       data1.attachfile.map((data, index) => {
          //         var find = data && data.filename && data.filename;
          //         if (find) {
          //           var find1 = find.split(".com/")[1];
          //           axios
          //             .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
          //             .then((response2) => {
          //               if (response2.data.hassuccessed) {
          //                 images.push({
          //                   image: find,
          //                   new_image: response2.data.data,
          //                 });
          //                 this.setState({ images: images });
          //               }
          //             });
          //         }
          //       });
          //   });

          this.setState({ allTrack1: response.data.data,  allTrack2 : response.data.data, allTrack: response.data.data, loaderImage: false },
            ()=>{this.Showdefaults(this.state.allTrack2, this.state.defaultValue)});
        } else {
          this.setState({ allTrack1: [], allTrack2 : [], allTrack: [], loaderImage: false });
        }
      });
  };

  //For getting the information of the Patient Gender
  getGender() {
    var user_token = this.props.stateLoginValueAim.token;
    var user_id = this.props.stateLoginValueAim.user._id;
    axios
      .get(sitedata.data.path + "/User/Get_patient_gender/" + user_id, {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.hassuccessed === true) {
          this.setState({ patient_gender: response.data.data });
        }
      });
  }

  //Modal Open on Archive the Journal
  ArchiveTrack = (data) => {
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
  deleteClickTrack = (deletekey) => {
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;
    this.setState({ loaderImage: true });
    axios
      .delete(
        sitedata.data.path + "/User/AddTrack/" + user_id + "/" + deletekey,
        {
          headers: {
            token: user_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        this.setState({ loaderImage: false });
        this.getTrack();
      })
      .catch((error) => {});
  };
  //Update Archive Track State
  updateArchiveTrack = (data) => {
    data.archive = false;
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;
    var track_id = data.track_id;
    this.setState({ loaderImage: true });
    axios
      .put(
        sitedata.data.path + "/User/AddTrack/" + user_id + "/" + track_id,
        { data },
        {
          headers: {
            token: user_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        this.setState({
          ismore_five: false,
          updateTrack: {},
          updateOne: "",
          isfileupload: false,
          isfileuploadmulti: false,
          loaderImage: false,
        });
        this.getTrack();
      });
  };

  render() {
    let translate;
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
    let { archive_journal, Seemore10entries, loadingref} = translate;
    const { stateLoginValueAim, Doctorsetget } = this.props;
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
        {this.state.loaderImage && <Loader />}
        <Grid container direction="row" justify="center" className="homeBgIner">
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              {/* Website Menu */}
              <LeftMenu isNotShow={true} currentPage="more" />
              <LeftMenuMobile isNotShow={true} currentPage="more" />
              <Notification />
              {/* End of Website Menu */}

              {/* Website Mid Content */}
              <Grid item xs={12} md={8}>
                {/* Start of Depression Section */}
                <Grid className="descpCntntMain">
                  <Grid className="journalAdd">
                    <Grid container direction="row">
                      <Grid item xs={11} md={11}>
                        <Grid container direction="row">
                          <Grid item xs={6} md={6}>
                            <h1>{archive_journal}</h1>
                          </Grid>
                          <Grid item xs={6} md={6}></Grid>
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
                  <div>
                    {this.state.allTrack &&
                      this.state.allTrack.length > 0 &&
                      this.state.allTrack.map((item, index) => (
                        <ViewTimeline
                          TrackRecord={this.state.allTrack1}
                          Archive={true}
                          OpenGraph={this.OpenGraph}
                          comesfrom="patient"
                          downloadTrack={(data) => this.downloadTrack(data)}
                          from="patient"
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
                          time_format={this.props.settings.setting.time_format}
                          Track={item}
                          from="patient"
                          loggedinUser={this.state.cur_one}
                          patient_gender={this.state.patient_gender}
                        />
                      ))}
                       {this.state.allTrack2 > this.state.allTrack && <div className="more10entries" onClick={()=>this.LoadMore(this.state.allTrack2)}>
                        {Seemore10entries}
                      </div>}
                      {this.state.loading && <div className="more10entries">
                        {loadingref}
                      </div>}
                  </div>
                </Grid>
              </Grid>
              {/* End of Website Right Content */}
            </Grid>
          </Grid>
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
  const { verifyCode } = state.authy;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    //   Doctorsetget,
    //   catfil
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
  })(Index)
);
