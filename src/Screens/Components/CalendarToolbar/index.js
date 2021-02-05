import React from "react";
import Toolbar from "react-big-calendar/lib/Toolbar";
// import { usePopper } from 'react-popper';
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import sitedata from "sitedata";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
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
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { pure } from "recompose";

const CURRENT_DATE = moment().toDate();
const localizer = momentLocalizer(moment);
const options = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
];
class Index extends Toolbar {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: "month", label: "Month" },
    };
  }
  componentDidMount() {
    const view = this.props.view;
  }

  handleChange = (changedata) => {
    this.view(changedata.value);
    this.setState({ selectedOption: changedata });
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
    let { sync_ur_calander, today } = translate;
    const { selectedOption } = this.state;
    var CLIENT_ID =
      "172543130849-d1oc9tut1v70c67fbd6nodrnbdlbina1.apps.googleusercontent.com";
    var API_KEY = "AIzaSyBEhx3eyniA0yy1Zx-Mia7_EAupS3Lih_A";
    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/calendar";

    const handleClick = () => {
      window.gapi.load("client:auth2", () => {
        window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });

        window.gapi.client.load("calendar", "v3", () => console.log(""));
        window.gapi.auth2
          .getAuthInstance()
          .signIn()
          .then(() => {
            //  var event = {
            //    'summary': 'New event By Me',
            //    'description': 'A chance to hear more about Google\'s developer products.',
            //    'start': {
            //      'dateTime': new Date(),
            //      'timeZone': 'Asia/Kolkata'
            //    },
            //    'end': {
            //      'dateTime': "2020-08-21T09:00:00-07:00",
            //      'timeZone': 'Asia/Kolkata'
            //    }
            //  };

            this.state.myEventsList1 &&
              this.state.myEventsList1.length > 0 &&
              this.state.myEventsList1.map((event) => {
                var request = window.gapi.client.calendar.events.insert({
                  calendarId: "primary",
                  resource: event,
                });

                request.execute((event) => {
                  window.open(event.htmlLink);
                });
              });
          });

        // var request = gapi.client.calendar.events.insert({
        //   'calendarId': 'primary',
        //   'resource': event
        // });

        // request.execute(function(event) {
        //   appendPre('Event created: ' + event.htmlLink);
        // });
      });
    };

    return (
      <div>
        <Grid className="todaySrch">
          <Grid container direction="row">
            <Grid item xs={12} md={12} alignItems="center" justify="center">
              <Grid container direction="row">
                <Grid item xs={12} md={6} className="todayMnth">
                  <Grid className="todaySrchLft">
                    <label onClick={() => this.navigate("TODAY")}>
                      {today}
                    </label>
                  </Grid>
                  <Grid className="movMnth">
                    {/* <a onClick={() => this.navigate('PREV')}><img src={require('assets/images/leftArow.jpg')} alt="" title="" /></a>
										<a onClick={() => this.navigate('NEXT')}><img src={require('assets/images/rightArow.jpg')} alt="" title="" /></a> */}
                    <a onClick={() => this.navigate("PREV")}>
                      <NavigateBeforeIcon />
                    </a>
                    <a onClick={() => this.navigate("NEXT")}>
                      <NavigateNextIcon />
                    </a>
                  </Grid>
                  <Grid className="crntMonth">{this.props.label}</Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid className="todaySrchRght todayAddons">
                    {/* <a onClick={handleClick} className="syncRght">{sync_ur_calander}</a>
										<a className="toolSearch"><img src={require('assets/images/search-entries.svg')} alt="" title="" /></a> */}
                    <Select
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={options}
                      // placeholder="Day"

                      className="allTimeSelnw comonSelnw"
                      //isMulti= {true}
                      isSearchable={false}
                    />
                    <a
                      onClick={() => {
                        this.handleChange({ value: "month", label: "Month" });
                      }}
                      className={
                        this.state.selectedOption &&
                        this.state.selectedOption.value === "month"
                          ? "calViewnw nowactive"
                          : "calViewnw"
                      }
                    >
                      <img
                        src={require("assets/images/calendar-view.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                    <a
                      onClick={() => {
                        this.handleChange({ value: "week", label: "Week" });
                      }}
                      className={
                        this.state.selectedOption &&
                        this.state.selectedOption.value === "week"
                          ? "barViewnw nowactive"
                          : "barViewnw"
                      }
                    >
                      <img
                        src={require("assets/images/bar1.svg")}
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default pure(withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(Index)
));
