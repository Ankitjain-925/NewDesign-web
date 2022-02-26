import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "../Institutes/selecthouseaction";
import Loader from "Screens/Components/Loader/index";
import _ from "lodash";
import {
    getSteps,
    getAuthor,
    updateInActualData,
    MoveAllCases,
    setAssignedTo,
    getProfessionalData,
  } from "Screens/VirtualHospital/PatientFlow/data";
import TaskSectiuonVH from "Screens/Components/VirtualHospitalComponents/TaskSectionVH";
import { Speciality } from "Screens/Login/speciality.js";
import { Redirect, Route } from "react-router-dom";
import { getLanguage } from "translations/index";
import FileUploader from "Screens/Components/FileUploader/index";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import Select from "react-select";

function TabContainer(props) {
    return (
        <Typography component="div">
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
            needUpload: false,
            case: {},
            SelectedStep: {},
            errorMsg: "",
            patinfo: {}
        };
    }

    componentDidMount() {
        if (this.props.history.location?.state?.needUpload) {
            this.setState({ needUpload: this.props.history.location?.state?.needUpload })
        }
        if (this.props.history.location?.state?.data) {
            let user_token = this.props.stateLoginValueAim.token;
            let user_id = this.props.history.location?.state?.data;
            axios
              .get(sitedata.data.path + "/UserProfile/Users/" + user_id, commonHeader(user_token))
              .then((response) => {
                  this.setState({patinfo: response.data.data})
              })
        }
       
        var steps = getSteps(
            this.props?.House?.value,
            this.props.stateLoginValueAim.token
          );
          steps.then((data) => {
              console.log('data', data);
            var stepData = data ? data : [];
            this.setDta(stepData);
            this.GetStep(stepData);
          });
    }

    GetStep = (stepData) => {
        var state = stepData;
        console.log('state',state);
        let allSteps = state && state.length > 0 && state.map((item) => {
            return { label: item && item.step_name, value: item && item._id }
        })
        this.setState({ StepNameList: allSteps })
    }

    //for selecting Step name
    onSelectingStep = (e) => {
        this.setState({ SelectedStep: e })
    }

    //On change the case
    onChangeCase = (e) => {
        var state = this.state.case;
        state[e.target.name] = e.target.value;
        this.setState({ case: state });
    };

     //For calling the API
  CallApi = () => {
    var deep = _.cloneDeep(this.state.actualData);
    deep.map((item) => {
      item.case_numbers = item.case_numbers.map((element) => {
        if (element._id) {
          let case_id = element._id;
          element = {};
          element.case_id = case_id;
          return element;
        } else {
          return element;
        }
      });
    });
    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + "/step/AddStep",
        {
          house_id: this.props?.House?.value,
          steps: deep,
        },
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          this.setState({ loaderImage: false });
          var steps = getSteps(
            this.props?.House?.value,
            this.props.stateLoginValueAim.token
          );
          steps.then((data) => {
            var stepData = data ? data : [];
            this.setDta(stepData);
          });
        }
        this.setState({});
      });
  };

    handleTaskSubmit = () => {
        this.setState({ errorMsg: "" })
        this.setState({ loaderImage: true });
        var data = this.state.newTask;
        // if (this.state.needUpload && ) {
        //     this.setState({ errorMsg: "Upload document needed" })
        // } else {
        //     if (this.state.fileupods) {
        //         data.approveDocument = this.state.fileattach;
        //     }
        // }
        if (!this.state.SelectedStep.label) {
            this.setState({ errorMsg: "Select Step name" })
        }
        else if (!this.state.case.case_number) {
            this.setState({ errorMsg: "Case number can't be empty" })
        }
        else{
            console.log('afsdfsdfsdf');
            var case_data = {
                house_id: this.props?.House.value,
                inhospital: true,
                case_number: this.state.case.case_number,
                patient_id: this.state.patinfo._id,
                // patient_id: "4324424242343424234",
                patient: {
                  first_name: this.state.patinfo.first_name,
                  last_name: this.state.patinfo.last_name,
                  image: this.state.patinfo.image,
                  profile_id: this.state.patinfo.profile_id, 
                  alies_id: this.state.patinfo.profile_id
                //   profile_id: responce.data.data.profile_id,
                //   alies_id: responce.data.data.alies_id,
                },
                added_at: new Date(),
                verifiedbyPatient: this.state.needUpload ? true : false,
              };
            axios
                .post(
                  sitedata.data.path + "/cases/AddCase",
                  case_data,
                  commonHeader(this.props.stateLoginValueAim.token)
                )
                .then((responce1) => {
                  if (responce1.data.hassuccessed) {
                    var senddata = {}
                    if(!this.state.needUpload) {
                    if (this.state.patinfo?.email) { senddata.email = this.state.patinfo?.email }
                    if (this.state.patinfo?.mobile) { senddata.mobile = this.state.patinfo?.mobile }
                    senddata.case_id = responce1.data?.data
                    senddata.patient = this.state.patinfo._id
                    senddata.patient_name = this.state.patinfo.last_name ? this.state.patinfo.first_name + ' ' + this.state.patinfo.last_name : this.state.patinfo.first_name
                    axios
                      .post(
                        sitedata.data.path + "/vh/linkforAccepthospital",
                        senddata,
                        commonHeader(this.props.stateLoginValueAim.token)
                      )
                      .then((responce1) => { })
                    } 
                    this.setState({
                      updateState: {},
                      
                    });
                    var state = this.state.actualData;
                    let indexData = ''
                    state && state.length > 0 && state.filter((item, index) => {
                      if (item.step_name.toLowerCase() == this.state.SelectedStep.label.toLowerCase()) {
                        indexData = index;
                      }
                    })
                    state[indexData].case_numbers.push({ case_id: responce1.data.data });
                    this.setState({ SelectedStep: '' });
                    this.setDta(state);
                    this.CallApi();
                  } else {
                    this.setState({ caseAlready: true, loaderImage: false });
                    setTimeout(() => {
                      this.setState({ caseAlready: false });
                    }, 3000);
                  }
                });
        }

        this.setState({ loaderImage: false});
    };

      //Set data according to package
  setDta = (stepData) => {
    var author = getAuthor(stepData);
    stepData.map((item, index1) => {
      item?.case_numbers?.length > 0 &&
        item.case_numbers.map((data, index) => {
          data["author"] = author[index1];
        });
    });
    this.setState({ actualData: stepData });
    this.mapActualToFullData(stepData);
  };

  mapActualToFullData = (result) => {
    const authorQuoteMap = result && result?.length > 0 && result.reduce(
      (previous, author) => {
        if (previous && !previous.hasOwnProperty(author.step_name)) previous = { ...previous, [author.step_name]: author.case_numbers };
        return previous;
      }, {});

    this.setState({ fullData: authorQuoteMap });
  }

    render() {
        const { stateLoginValueAim, House } = this.props;
        // if (
        //   stateLoginValueAim.user === "undefined" ||
        //   stateLoginValueAim.token === 450 ||
        //   stateLoginValueAim.token === "undefined" ||
        //   stateLoginValueAim.user.type !== "adminstaff"
        // ) {
        //   return <Redirect to={"/"} />;
        // }
        // if (House && House?.value === null) {
        //     return <Redirect to={"/VirtualHospital/space"} />;
        //   }
        let translate = getLanguage(this.props.stateLanguageType);
        let { Tasks_overview, ShowArchivedTasks, Open, Donetoday, CaseNumber, step_name, SelectStepName } = translate;
        return (
            <Grid className={
                this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "homeBg darkTheme"
                    : "homeBg"
            }>
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
                                    <Grid container direction="row" justifyContent="center" >
                                        <Grid item xs={11} md={10}>
                                            <Grid className='headercont headercontSec'>
                                                {this.state.needUpload &&
                                                    <Grid className="profileInfoSection">

                                                        <h1>Upload Approval document of patient to the hospital</h1>
                                                        <Grid item xs={12} md={8}>
                                                            <Grid className="headerCountTxt">

                                                                <label>Attachments</label>
                                                                <FileUploader
                                                                    // cur_one={this.props.cur_one}
                                                                    attachfile={
                                                                        this.state.newTask &&
                                                                            this.state.newTask.attachments
                                                                            ? this.state.newTask.attachments
                                                                            : []
                                                                    }
                                                                    name="UploadTrackImageMulti"
                                                                    isMulti="true"
                                                                    fileUpload={(event) => {
                                                                        this.FileAttachMulti(event);
                                                                    }}
                                                                />


                                                            </Grid>
                                                        </Grid>
                                                    </Grid>}

                                                <Grid className="profileInfoSection">

                                                    <h1>Select Step of Patient flow and Add case number of Patient</h1>
                                                    <Grid item xs={12} md={8}>
                                                        <Grid className="headerCountTxt">

                                                            <Grid className="patentInfoTxt">
                                                                <VHfield
                                                                    label={CaseNumber}
                                                                    name="case_number"
                                                                    value={this.state.case?.case_number || ''}
                                                                    onChange={this.onChangeCase}
                                                                />
                                                            </Grid>
                                                            <label>{step_name}</label>
                                                            <Grid className="patentInfoTxt">
                                                                <Select
                                                                    value={this.state.SelectedStep}
                                                                    onChange={this.onSelectingStep}
                                                                    options={this.state.StepNameList}
                                                                    placeholder={SelectStepName}
                                                                    className="allSpeces"
                                                                    isSearchable={true}
                                                                />
                                                            </Grid>

                                                            <div className="err_message">{this.state.errorMsg}</div>

                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid container direction="row" justifyContent="center" >
                                                    <Grid item xs={12} md={8} lg={8}>
                                                        <Grid className="aaa">

                                                                    {console.log('patinfo', this.state.patinfo)}
                                                            <Grid className="headerCountTxt infoSubInpSection">
                                                                <input
                                                                    type="submit"
                                                                    onClick={() => this.handleTaskSubmit()}
                                                                    value={"Submit"}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>




                                        </Grid>
                                    </Grid>

                                </Grid>
                                {/* End of Right Section */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
        state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { House } = state.houseSelect
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
        speciality
    };
};
export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect, Speciality })(
        Index
    )
);