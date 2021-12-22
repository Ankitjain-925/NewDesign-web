import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import { Speciality } from "Screens/Login/speciality.js";
import sitedata from "sitedata";
import TaskSectiuonVH from "Screens/Components/VirtualHospitalComponents/TaskSectionVH"
import {
  commonHeader,
  commonCometDelHeader,
} from "component/CommonHeader/index";
import { authy } from "Screens/Login/authy.js";

import Loader from "Screens/Components/Loader/index";

var patientArray = [];

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTask: false,
      tabvalue: 0,
      tabvalue2: 0,
      DoneTask: [],
      AllTasks: [],
      ArchivedTasks: [],
      loaderImage: false,
      hope: false,
      openDate: true,
      specilaityList: [],
      assignedTo: [],
      selectSpec: {},
      patient: {}
    };
  }

  componentDidMount() {
    this.getAddTaskData();
    this.getCase();
  }

  handleChangeTab = (event, tabvalue) => {
    this.setState({ tabvalue });
  };

  //User list will be show/hide
  toggle = () => {
    this.setState({
      shown: !this.state.shown,
    });
  };

  getCase = () => {
    this.setState({ loaderImage: true });
    let case_id = this.props.match.params.case_id;
    axios.get(
      sitedata.data.path + "/cases/AddCase/" + case_id,
      commonHeader(this.props.stateLoginValueAim.token)
    )
      .then((responce1) => {
        if (responce1.data.hassuccessed) {
          this.setState({
            caseData: responce1.data.data,
            patient: {
              last_name: responce1.data.data?.patient?.last_name,
              patient_id: responce1.data.data?.patient_id,
              image: responce1.data.data?.patient?.image,
              first_name: responce1.data.data?.first_name,
              profile_id: responce1.data.data?.patient?.profile_id,
              alies_id: responce1.data.data?.patient?.alies_id,
              type: responce1.data.data?.patient?.type,
              case_id: responce1.data.data?._id,
            }
          })
        }
      })
  }

  //get Add task data
  getAddTaskData = () => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + "/vh/PatientsTask/" + this.props.match.params.id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        this.setState({ AllTasks: response.data.data });
        if (response.data.hassuccessed) {
          var Done =
            response.data.data?.length > 0 &&
            response.data.data.filter((item) => item.status === "done");
          var Open =
            response.data.data?.length > 0 &&
            response.data.data.filter((item) => item.status === "open");
          this.setState({
            AllTasks: response.data.data,
            DoneTask: Done,
            OpenTask: Open,
          });
        }
        this.setState({ loaderImage: false });
      });
  };

  render() {
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
        <Grid className="homeBgIner">
          <Grid container direction="row">
            <Grid item xs={12} md={12}>
              <TaskSectiuonVH patient={this.state.patient} getAddTaskData={() => { this.getAddTaskData() }} AllTasks={this.state.AllTasks} DoneTask={this.state.DoneTask} OpenTask={this.state.OpenTask} ArchivedTasks={[]} comesFrom={"detailTask"} tabvalue2={this.state.tabvalue2} />
            </Grid>
            {/* End of Right Section */}
          </Grid>
        </Grid>
      </Grid>
      // </Grid >
      // </Grid >
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
  const { speciality } = state.Speciality;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    House,
    settings,
    verifyCode,
    speciality,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    Speciality,
  })(Index)
);
