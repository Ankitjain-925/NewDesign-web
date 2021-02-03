import React from "react";
import { connect } from "react-redux";
import { LoginReducerAim } from "../../Login/actions";
import { Settings } from "../../Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "../../actions";
import CancelIcon from "@material-ui/icons/Cancel";
import sitedata from "../../../sitedata";
import axios from "axios";
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
// import { CometChatUnified } from '../react-chat-ui-kit/CometChat';
var NewM = false;
class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      ShowTime: false,
      docs: [],
      allDocData1: [],
    };
  }

  componentDidMount() {
    this.alldocs();
  }
  //Get the all doctor
  alldocs = () => {
    const user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + "/UserProfile/DoctorUsersChat", {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ allDocData1: response.data.data });
        this.getUserData();
      });
  };

  redirectPage = () => {
    this.props.history.push(`/${this.props.stateLoginValueAim.user.type}`);
  };

  //Get the current User Data
  getUserData = () => {
    var myfavDoctors = [];
    var reccomend = [];
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
        var myFilterData = [];
        if (
          response.data.data.family_doc &&
          response.data.data.family_doc.length > 0
        ) {
          response.data.data.family_doc.map((item) => {
            myFilterData =
              this.state.family_doc_list &&
              this.state.family_doc_list.length > 0 &&
              this.state.family_doc_list.filter((ind) => ind.value === item);
          });
        }
        this.setState({
          family_doc: myFilterData,
          family_doc1: response.data.data.family_doc,
        });
        if (response.data.data.fav_doctor) {
          for (let i = 0; i < response.data.data.fav_doctor.length; i++) {
            if (response.data.data.fav_doctor[i].doctor) {
              var datas =
                this.state.allDocData1 &&
                this.state.allDocData1.length > 0 &&
                this.state.allDocData1.filter(
                  (data) =>
                    data.profile_id === response.data.data.fav_doctor[i].doctor
                );
              if (datas && datas.length > 0) {
                if (
                  response.data.data.fav_doctor[i].type &&
                  response.data.data.fav_doctor[i].type === "recommended"
                ) {
                  reccomend.push(datas[0]);
                }
              }
            }
          }
          var recom =
            reccomend &&
            reccomend.length > 0 &&
            reccomend.map((itm) => {
              if (
                itm.first_name &&
                itm.last_name &&
                itm.title &&
                itm.title !== ""
              ) {
                return (
                  itm.title +
                  " " +
                  itm.first_name +
                  " " +
                  itm.last_name +
                  " -(" +
                  itm.alies_id +
                  ") "
                );
              }
              if (itm.first_name && itm.last_name) {
                return (
                  itm.first_name +
                  " " +
                  itm.last_name +
                  " - (" +
                  itm.alies_id +
                  ") "
                );
              } else {
                return "Dr. " + itm.first_name + " -(" + itm.alies_id + ") ";
              }
            });
          this.setState({ docs: recom, ShowTime: true });
          setTimeout(() => {
            this.setState({ ShowTime: false });
          }, 5000);
        }
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
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
    let { requesteddoctor, accpetRemove, BodySchemeNotes } = translate;
    return (
      <div>
        {this.state.docs &&
          this.state.docs.length > 0 &&
          this.state.ShowTime === true && (
            <div className="unreadsec">
              <div className="unread_msg_notify" onClick={this.redirectPage}>
                {" "}
                {this.state.docs.join(", ")}
                {requesteddoctor}
                <br />
                {accpetRemove}
              </div>
              <span
                className="unread_msg_notifyspan"
                onClick={() => this.setState({ ShowTime: false })}
              >
                <CancelIcon />
              </span>
            </div>
          )}
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
