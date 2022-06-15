import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LeftMenu from 'Screens/Components/Menus/VirtualHospitalMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/VirtualHospitalMenu/mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import axios from 'axios';
import { LanguageFetchReducer } from 'Screens/actions';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index';
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from '../Institutes/selecthouseaction';
import Loader from 'Screens/Components/Loader/index';
import TaskSectiuonVH from 'Screens/Components/VirtualHospitalComponents/TaskSectionVH';
import { Speciality } from 'Screens/Login/speciality.js';
import { Redirect, Route } from 'react-router-dom';
import { getLanguage } from 'translations/index';
import { filterPatient } from 'Screens/Components/BasicMethod/index';
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
      ArchivedTasks: [],
      loaderImage: false,
      Open: 0,
      doneToday: 0,
      AllTasks: [],
      DoneTask: [],
      tabvalue2: 0,
    };
  }

  componentDidMount() {
    this.getAddTaskData();
  }

  //User list will be show/hide
  toggle = () => {
    this.setState({
      shown: !this.state.shown,
    });
  };

  //Get Archived
  getArchived = () => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path +
          '/vh/GetAllArchivedTask/' +
          this.props?.House?.value,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        if (response.data.hassuccessed) {
          this.setState({ ArchivedTasks: response.data.data, tabvalue2: 4 });
        }
        this.setState({ loaderImage: false });
      });
  };

  //get Add task data
  getAddTaskData = (tabvalue2) => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + '/vh/GetAllTask/' + this.props?.House?.value,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        this.setState({ AllTasks: response.data.data });
        if (response.data.hassuccessed) {
          if (response?.data?.data) {
            var patientForFilterArr = filterPatient(response.data.data);
            this.setState({ patientForFilter: patientForFilterArr });
          }
          var Done =
            response.data.data?.length > 0 &&
            response.data.data.filter((item) => item.status === 'done');
          var Open =
            response.data.data?.length > 0 &&
            response.data.data.filter(
              (item) =>
                item.status === 'open' &&
                (!item.is_decline || item.is_decline === false)
            );
          var Decline =
            response.data.data?.length > 0 &&
            response.data.data.filter(
              (item) => item.is_decline && item.is_decline === true
            );
          var GetDate =
            response.data.data?.length > 0 &&
            response.data.data.filter((item) => {
              var d1 = new Date(item.done_on).setHours(0, 0, 0, 0);
              var d2 = new Date().setHours(0, 0, 0, 0);
              return d1 === d2;
            });
          this.setState({
            AllTasks: response.data.data,
            DeclinedTask: Decline,
            DoneTask: Done,
            OpenTask: Open,
            Open: Open?.length,
            doneToday: GetDate?.length,
            tabvalue2: tabvalue2 ? tabvalue2 : 0,
          });
        }

        this.setState({ loaderImage: false });
      });
  };

  render() {
    const { stateLoginValueAim, House } = this.props;
    if (
      stateLoginValueAim.user === 'undefined' ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === 'undefined' ||
      stateLoginValueAim.user.type !== 'adminstaff'
    ) {
      return <Redirect to={'/'} />;
    }
    if (House && House?.value === null) {
      return <Redirect to={'/VirtualHospital/space'} />;
    }
    let translate = getLanguage(this.props.stateLanguageType);
    let { Tasks_overview, ShowArchivedTasks, Open, Donetoday } = translate;
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === 'dark'
            ? 'homeBg darkTheme'
            : 'homeBg'
        }
      >
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row">
            <Grid item xs={12} md={12}>
              <LeftMenuMobile isNotShow={true} currentPage="task" />
              <Grid container direction="row">
                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}

                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="task" />
                </Grid>
                {/* End of Menu */}
                {/* Start of Right Section */}
                <Grid item xs={12} md={11}>
                  <Grid container direction="row">
                    <Grid item xs={12} md={2} className="tskOverWeb">
                      <Grid className="tskOverView">
                        <h1>{Tasks_overview}</h1>
                        <Grid className="taskNum taskYelow">
                          <label>
                            <span></span>
                            {Open}
                          </label>
                          <p>{this.state.Open}</p>
                        </Grid>
                        <Grid className="taskNum taskGren">
                          <label>
                            <span></span>
                            {Donetoday}
                          </label>
                          <p>{this.state.doneToday}</p>
                        </Grid>
                        <Grid className="showArchiv">
                          <p
                            onClick={() => {
                              this.getArchived();
                            }}
                          >
                            <a>{ShowArchivedTasks}</a>
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <TaskSectiuonVH
                        comesFrom="adminstaff"
                        patientForFilter={this.state.patientForFilter}
                        getArchived={() => this.getArchived()}
                        getAddTaskData={(tabvalue2) => {
                          this.getAddTaskData(tabvalue2);
                        }}
                        AllTasks={this.state.AllTasks}
                        DoneTask={this.state.DoneTask}
                        OpenTask={this.state.OpenTask}
                        DeclinedTask={this.state.DeclinedTask}
                        ArchivedTasks={this.state.ArchivedTasks}
                        tabvalue2={this.state.tabvalue2}
                      />
                    </Grid>
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
    houseSelect,
    Speciality,
  })(Index)
);
