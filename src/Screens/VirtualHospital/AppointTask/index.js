import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Button } from "@material-ui/core";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CalendarToolbar from "Screens/Components/CalendarToolbar/index.js";
import moment from "moment";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Select from "react-select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import {
  commonHeader,
  commonCometDelHeader,
} from "component/CommonHeader/index";
import { authy } from "Screens/Login/authy.js";
import { houseSelect } from "../Institutes/selecthouseaction";
import { Redirect, Route } from "react-router-dom";

const options = [
  { value: "data1", label: "Data1" },
  { value: "data2", label: "Data2" },
  { value: "data3", label: "Data3" },
];

const CURRENT_DATE = moment().toDate();
const localizer = momentLocalizer(moment);

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

//  var da1 = new Date(9, 4, 2021);
// let da2 = new Date();
// var d1 = (new Date()).setHours("00");
// var d2 = (new Date()).setHours("05")

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabvalue: 0,
      selectedOption: null,
      events: [],
    };
  }

  componentDidMount() {
    this.getAddTaskData();
  }

  handleChangeTab = (event, tabvalue) => {
    this.setState({ tabvalue });
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  //get Add task data
  getAddTaskData = () => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + "/vh/GetAllTask/" + this.props?.House?.value,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        this.setState({ AllTasks: response.data.data });
        if (response.data.hassuccessed) {
          {
            var data1 =
              response.data.data?.length > 0 &&
              response.data.data.map((data, index) => {
                if (data.due_on?.date) {
                  var d1 = data.due_on?.date
                    ? new Date(data.due_on?.date)
                    : new Date();
                  var d2 = data.due_on?.date
                    ? new Date(data.due_on?.date)
                    : new Date();
                  d2.setDate(d2.getDate() + 1);
                  var title = data?.task_name;
                  return {
                    start: new Date(d1),
                    end: new Date(d2),
                    title: title,
                    id: index,
                  };
                }
              });
            if (data1 && data1.length > 0) {
              this.setState({ events: data1 });
            }
          }
        }
        this.setState({ loaderImage: false });
      });
  };

  render() {
    const { tabvalue, selectedOption, events, data } = this.state;
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
        <Grid className="homeBgIner">
          <Grid container direction="row">
            <Grid item xs={12} md={12}>
              {/* Mobile menu */}
              <LeftMenuMobile isNotShow={true} currentPage="calendar" />
              <Grid container direction="row">
                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}

                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="calendar" />
                </Grid>
                {/* End of Menu */}

                {/* Start of Right Section */}
                <Grid item xs={12} md={11}>
                  <Grid className="topLeftSpc">
                    <Grid container direction="row" alignItems="center">
                      <Grid item xs={12} sm={7} md={6}>
                        <AppBar position="static" className="appTabs">
                          <Tabs
                            value={tabvalue}
                            onChange={this.handleChangeTab}
                          >
                            <Tab label="All" className="appTabIner" />
                            <Tab label="Appointments" className="appTabIner" />
                            <Tab label="Tasks" className="appTabIner" />
                          </Tabs>
                        </AppBar>
                      </Grid>
                      <Grid item xs={12} sm={5} md={6}>
                        <Grid className="appontTask">
                          <Button>+ Appointment or Task</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    {tabvalue === 0 && (
                      <TabContainer>
                        <Grid className="timeSchdul">
                          <Grid className="calenderDetails">
                            <Grid className="getCalapoint">
                              <Grid className="getCalBnr">
                                {console.log("events", this.state.events)}
                                <Calendar
                                  localizer={localizer}
                                  events={this.state.events}
                                  value={this.state.d1}
                                  startAccessor="start"
                                  endAccessor="end"
                                  style={{ minHeight: 900 }}
                                  components={{
                                    month: { event: this.EventComponent },
                                    week: { event: this.EventComponent },
                                    day: { event: this.EventDaysComponent },
                                    dateCellWrapper: this.DateCellCompnent,
                                    toolbar: CalendarToolbar,
                                  }}
                                />
                              </Grid>
                            </Grid>

                            {/* <img src={require('assets/virtual_images/calendar2.jpg')} alt="" title="" /> */}
                          </Grid>
                        </Grid>
                      </TabContainer>
                    )}
                    {tabvalue === 1 && (
                      <TabContainer>Appointments Tab content</TabContainer>
                    )}
                    {tabvalue === 2 && (
                      <TabContainer>Tasks Tab content</TabContainer>
                    )}
                  </Grid>
                </Grid>

                {/* End of Right Section */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { House } = state.houseSelect;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    House,
    settings,
    verifyCode,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
  })(Index)
);
