import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import Input from "@material-ui/core/Input";
import Select from "react-select";
import Loader from "Screens/Components/Loader/index";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  getSteps,
  getAuthor,
  updateInActualData,
  MoveAllCases,
  setAssignedTo,
  getProfessionalData,
  PatientMoveFromHouse
} from "./data";
import Drags from "./drags.js";
import sitedata from "sitedata";
import { withRouter } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import Modal from "@material-ui/core/Modal";
import { commonHeader } from "component/CommonHeader/index";
import { houseSelect } from "../Institutes/selecthouseaction";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import _ from "lodash";
import { getLanguage } from "translations/index";
import { Speciality } from "Screens/Login/speciality.js";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      view: "vertical",
      openAddP: false,
      fullData: {},
      actualData: [],
      edit: false,
      addp: {},
      case: {},
      caseAlready: false,
      AddstpId: false,
      searchValue: '',
      idpinerror: false,
    };
  }
  static defaultProps = {
    isCombineEnabled: false,
  };
  boardRef;

  componentDidMount() {
    this.getProfessionalData();
    var steps = getSteps(
      this.props?.House?.value,
      this.props.stateLoginValueAim.token
    );
    steps.then((data) => {
      var stepData = data ? data : [];
      this.setDta(stepData);
    });

    var specsMap1 = [{ label: 'All Specialities', value: 'all' }];
    var specsMap = this.props.speciality && this.props.speciality?.SPECIALITY?.length > 0 && this.props.speciality?.SPECIALITY.map((item) => {
      return { label: item.specialty_name, value: item._id };
    })
    if (specsMap && specsMap?.length > 0) {
      specsMap = [...specsMap1, ...specsMap];
      this.setState({ specialitiesList: specsMap });
    }
    else {
      this.setState({ specialitiesList: specsMap1 });
    }

  }

  MovetoTask = (speciality, patient_id) => {
    this.props.history.push({
      pathname: '/virtualhospital/tasks',
      state: { speciality: speciality, user: { value: patient_id } }
    })
  }

  moveDetial = (id, case_id) => {
    this.props.history.push(`/virtualhospital/patient-detail/${id}/${case_id}`);
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

  //Select the professional name
  updateEntryState3 = (e, case_id) => {
    var data =
      e?.length > 0 &&
      e.reduce((last, current, index) => {
        let isProf =
          this.state.professionalArray?.length > 0 &&
          this.state.professionalArray.filter(
            (data, index) => data.user_id === current.value
          );
        if (isProf && isProf.length > 0) {
          last.push(isProf[0]);
        }
        return last;
      }, []);
    this.setState({ loaderImage: true });
    var response = setAssignedTo(
      data,
      case_id,
      this.props.stateLoginValueAim.token
    );
    response.then((responce1) => {
      if (responce1.data.hassuccessed) {
        var steps = getSteps(
          this.props?.House?.value,
          this.props.stateLoginValueAim.token
        );
        steps.then((data) => {
          var stepData = data ? data : [];
          this.setDta(stepData);
        });
        this.setState({ loaderImage: false });
      } else {
        this.setState({ loaderImage: false });
      }
    });
  };
  // Get the Professional data
  getProfessionalData = async () => {
    this.setState({ loaderImage: true });
    var data = await getProfessionalData(
      this.props?.House?.value,
      this.props.stateLoginValueAim.token
    );
    if (data) {
      this.setState({
        loaderImage: false,
        professionalArray: data.professionalArray,
        professional_id_list: data.professionalList,
      });
    } else {
      this.setState({ loaderImage: false });
    }
  };

  //Change the value of the step_name
  onChange = (e, index) => {
    var state = this.state.actualData;
    var changes = state.filter((newa) => {
      return newa.step_name?.toLowerCase() === e.target?.value?.toLowerCase();
    })
    if (!(changes?.length > 0)) {
      state[index][e.target.name] = e.target.value;
      this.setDta(state);
      this.setState({ edit: false });
      this.CallApi();
    }
  };

  //Edit the name of step
  editName = (index) => {
    this.setState({ edit: index });
  };

  //Add new step
  AddStep = () => {
    var state = this.state.actualData;
    state.push({ step_name: "Step" + (new Date()).getTime(), case_numbers: [] });
    this.setDta(state);
    this.CallApi();
  };

  //Set data according to package
  setDta = (stepData) => {
    var author = getAuthor(stepData);
    console.log("STEP DATA", stepData)
    stepData.map((item, index1) => {
      item?.case_numbers?.length > 0 &&
        item.case_numbers.map((data, index) => {
          data["author"] = author[index1];
        });
    });
    this.setState({ actualData: stepData });
    this.mapActualToFullData(stepData);
  };

  //Open case model
  openAddPatient = (index = 0) => {
    this.setState({ openAddP: true, AddstpId: index, addp: {}, idpinerror: false, case: {}, });
  };

  //Close case model
  closeAddP = () => {
    this.setState({ openAddP: false });
  };

  //Delete the Step
  DeleteStep = (index) => {
    var state = this.state.actualData;
    if (state[index]?.case_numbers?.length > 0) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <Grid className={this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode === "dark"
              ? "dark-confirm deleteStep"
              : "deleteStep"}>
              <Grid className="deleteStepLbl">
                <Grid><a onClick={() => { onClose(); }}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
                <label>Delete Step</label>
              </Grid>
              <Grid className="deleteStepInfo">
                <p>All Patients in this Step will be removed from the flow. This action can not be reversed.</p>
                <Grid><label>Are you sure you want to do this?</label></Grid>
                <Grid>
                  <Button onClick={() => { this.DeleteStepOk(state, index) }}>Yes, Delete Step</Button>
                  <Button onClick={() => { onClose(); }}>Cancel, Keep Step</Button>
                </Grid>
              </Grid>
            </Grid>
          );
        },
      });
    }
    else {
      this.DeleteStepOk(state, index)
    }

  };

  DeleteStepOk = (state, index) => {
    if (state[index]?.case_numbers?.length > 0) {
      var yt = state[index]?.case_numbers.map((item) => {
        var response = PatientMoveFromHouse(item._id, this.props.stateLoginValueAim.token, 5, false)
      })
    }
    state.splice(index, 1);
    this.setDta(state);
    this.CallApi();
  }

  //On Add case
  AddCase = () => {
    var data = this.state.addp;
    data.institute_id =
      this.props.stateLoginValueAim?.user?.institute_id?.length > 0
        ? this.props.stateLoginValueAim?.user?.institute_id[0]
        : "";
    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + "/vh/checkPatient",
        data,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          var case_data = {
            house_id: this.props?.House.value,
            inhospital: true,
            case_number: this.state.case.case_number,
            patient_id: responce.data.data._id,
            patient: {
              first_name: responce.data.data.first_name,
              last_name: responce.data.data.last_name,
              image: responce.data.data.image,
              profile_id: responce.data.data.profile_id,
              alies_id: responce.data.data.alies_id,
            },
          };
          axios
            .post(
              sitedata.data.path + "/cases/AddCase",
              case_data,
              commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((responce1) => {
              if (responce1.data.hassuccessed) {
                this.setState({
                  idpinerror: false,
                  openAddP: false,
                  case: {},
                  addp: {},
                });
                var state = this.state.actualData;
                if (this.state.AddstpId) {
                  state[this.state.AddstpId].case_numbers.push({
                    case_id: responce1.data.data,
                  });
                } else {
                  state[0].case_numbers.push({ case_id: responce1.data.data });
                }
                this.setState({ AddstpId: false });
                // console.log('state', state, responce1.data.data )
                this.setDta(state);
                this.CallApi();
              } else {
                this.setState({ caseAlready: true, loaderImage: false });
                setTimeout(() => {
                  this.setState({ caseAlready: false });
                }, 3000);
              }
            });
          this.setState({ loaderImage: false });
        } else {
          this.setState({ idpinerror: true, loaderImage: false });
          setTimeout(() => {
            this.setState({ idpinerror: false });
          }, 3000);
        }
      });
  };

  //On change the case
  onChangeCase = (e) => {
    var state = this.state.case;
    state[e.target.name] = e.target.value;
    this.setState({ case: state });
  };

  //On change the id or pin
  changeAddp = (e) => {
    var state = this.state.addp;
    state[e.target.name] = e.target.value;
    this.setState({ addp: state });
  };

  onChooseSpeciality = (selectedOption) => {
    this.setState({ selectedOption });
    const searchQuery = selectedOption.value;
    let result = this.state.actualData;
    var actualData = _.cloneDeep(this.state.actualData);
    if (searchQuery !== 'all') {
      result = actualData && actualData.length > 0 && actualData.map((item) => {
        var getdata = item && item.case_numbers && item.case_numbers.length > 0 && item.case_numbers.filter((value) => {
          const specialityId = value.speciality?._id;
          let testCondition = (specialityId === searchQuery);
          return testCondition;
        })
        item.case_numbers = getdata.length > 0 ? getdata : [];
        return item;
      })
    }
    this.mapActualToFullData(result);
  };

  moveStep = (to, from, item) => {
    var result = {
      type: "COLUMN",
      draggableId: item,
      source: { droppableId: "board", index: from },
      destination: { droppableId: "board", index: to },
    };
    var actualData = updateInActualData(this.state.actualData, result);
    actualData.then((result) => {
      this.setState({ actualData: result }, () => {
        this.CallApi();
      });
    });
  };

  dragDropFlow = (result) => {
    var actualData = updateInActualData(this.state.actualData, result);
    actualData.then((result) => {
      this.setState({ actualData: result }, () => {
        this.CallApi();
      });
    });
  };

  moveAllPatient = (to, from, data) => {
    var to32 =
      this.state.actualData.length > 0 &&
      this.state.actualData
        .map(function (e) {
          return e.step_name;
        })
        .indexOf(to);
    var actualData = MoveAllCases(this.state.actualData, from, to32, data);
    actualData.then((result) => {
      this.setState({ actualData: result }, () => {
        this.CallApi();
      });
    });
  };

  handleSearch = (event) => {
    const searchQuery = event.target.value;
    var actualData = _.cloneDeep(this.state.actualData);
    this.setState({
      [event.target.name]: event.target.value,
    });
    let result = actualData && actualData.length > 0 && actualData.map((item) => {
      var getdata = item && item.case_numbers && item.case_numbers.length > 0 && item.case_numbers.filter((value) => {
        const patientFirstName = value.patient.first_name.toLowerCase();
        const patientLastName = value.patient.last_name.toLowerCase();
        const patientId = value.patient.alies_id.toLowerCase();
        const patientFullName = `${value.patient.first_name.toLowerCase()} ${value.patient.last_name.toLowerCase()}`;
        let testCondition = (patientFirstName.includes(searchQuery)
          || patientLastName.includes(searchQuery)
          || patientId.includes(searchQuery)
          || patientFullName.includes(searchQuery))
        return testCondition;
      })
      item.case_numbers = getdata.length > 0 ? getdata : [];
      return item;
    })
    this.mapActualToFullData(result);
  }

  newPatient = () => {
    this.props.history.push('/virtualHospital/new-user')
  }

  clearFilters = () => {
    this.setState({
      searchValue: '',
      selectedOption: { label: 'All Specialities', value: 'all' }
    });
    this.mapActualToFullData(this.state.actualData);
  }

  mapActualToFullData = (result) => {
    const authorQuoteMap = result && result.length > 0 && result.reduce(
      (previous, author) => ({
        ...previous,
        [author.step_name]: author.case_numbers,
      }),
      {}
    );
    this.setState({ fullData: authorQuoteMap });
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { PatientFlow, AddPatienttoFlow, PatientID, PatientPIN, CaseNumber } =
      translate;
    const { searchValue, specialitiesList, selectedOption } = this.state;
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
          { }
          <Grid container direction="row">
            <Grid item xs={12} md={12}>
              <LeftMenuMobile isNotShow={true} currentPage="flow" />
              <Grid container direction="row" className="flowContentAdd">
                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="flow" />
                </Grid>
                {/* End of Menu */}
                <Grid item xs={11} md={11}>
                  <Grid className="cmnLftSpc ptntFlowSpc">
                    <Grid className="addFlow">
                      <Grid container direction="row" justify="center">
                        <Grid item xs={12} sm={8} md={8}>
                          <h1>{PatientFlow}</h1>
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} className="addFlowRght">
                          <a onClick={() => this.newPatient()}>
                            + Create New Patient
                          </a>
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} className="addFlowRght">
                          <a onClick={() => this.openAddPatient(0)}>
                            + Add patient
                          </a>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="srchPatient">
                      <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={5} className="srchLft">
                          <Input name="searchValue" value={searchValue} placeholder="Search by Patient ID, Patient name, Doctor..." onChange={this.handleSearch} />
                          <a><img src={require("assets/virtual_images/InputField.svg")} alt="" title="" /></a>
                        </Grid>
                        <Grid item xs={12} md={7}>
                          <Grid className="srchRght">
                            <a className="srchSort" onClick={this.clearFilters}>
                              <img src={require("assets/virtual_images/sort.png")} alt="" title="" />
                            </a>
                            <Select
                              value={selectedOption}
                              onChange={this.onChooseSpeciality}
                              options={specialitiesList}
                              placeholder="All Specialities"
                              className="allSpec"
                              isSearchable={false}
                            />
                            <a
                              className={this.state.view === 'vertical' ? "horzSort" : "lineSort"}
                              onClick={() => {
                                this.setState({ view: "vertical" });
                              }}
                            >
                              {this.state.view === 'vertical' ?
                                <img
                                  src={require("assets/virtual_images/active-vertical.png")}
                                  alt=""
                                  title=""
                                /> :
                                <img
                                  src={require("assets/virtual_images/lines.png")}
                                  alt=""
                                  title=""
                                />}
                            </a>
                            <a
                              className={this.state.view === 'horizontal' ? "horzSort" : "lineSort"}
                              onClick={() => {
                                this.setState({ view: "horizontal" });
                              }}
                            >
                              {this.state.view === 'horizontal' ?

                                <img
                                  src={require("assets/virtual_images/active-horizontal.png")}
                                  alt=""
                                  title=""
                                />
                                : <img
                                  src={require("assets/virtual_images/non-active-horizontal.png")}
                                  alt=""
                                  title=""
                                />}
                            </a>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Drags
                      moveDetial={(id, case_id) => this.moveDetial(id, case_id)}
                      DeleteStep={(index) => this.DeleteStep(index)}
                      onKeyDownlogin={this.onKeyDownlogin}
                      editName={this.editName}
                      edit={this.state.edit}
                      onChange={this.onChange}
                      AddStep={this.AddStep}
                      openAddPatient={this.openAddPatient}
                      initial={this.state.fullData}
                      dragDropFlow={this.dragDropFlow}
                      moveAllPatient={(to, from, data) =>
                        this.moveAllPatient(to, from, data)
                      }
                      view={this.state.view}
                      moveStep={(to, from, item) => {
                        this.moveStep(to, from, item);
                      }}
                      setDta={(item) => this.setDta(item)}
                      professional_id_list={this.state.professional_id_list}
                      updateEntryState3={(e, case_id) => {
                        this.updateEntryState3(e, case_id);
                      }}
                      MovetoTask={(speciality, patient_id) => {
                        this.MovetoTask(speciality, patient_id)
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Modal
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          open={this.state.openAddP} onClose={this.closeAddP}>
          <Grid className={
            this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === "dark"
              ? "addFlowContnt darkTheme"
              : "addFlowContnt"}>
            <Grid className="addFlowIner">
              <Grid className="addFlowLbl">
                <Grid className="addFlowClose">
                  <a onClick={this.closeAddP}>
                    <img src={require("assets/virtual_images/closefancy.png")} alt="" title="" />
                  </a>
                </Grid>
                <label>{AddPatienttoFlow}</label>
              </Grid>
              <Grid className="patentInfo">
                {this.state.caseAlready && (
                  <div className="err_message">
                    Case Already exists in hospital
                  </div>
                )}
                {this.state.idpinerror && (
                  <div className="err_message">ID and PIN is not correct</div>
                )}
                <Grid className="patentInfoTxt">
                  <Grid>
                    <label>{PatientID}</label>
                  </Grid>
                  <TextField
                    name="patient_id"
                    value={this.state.addp.patient_id}
                    onChange={this.changeAddp}
                  />
                </Grid>
                <Grid className="patentInfoTxt">
                  <Grid>
                    <label>{PatientPIN}</label>
                  </Grid>
                  <TextField
                    name="pin"
                    value={this.state.addp.pin}
                    onChange={this.changeAddp}
                  />
                </Grid>
                <Grid className="patentInfoTxt">
                  <Grid>
                    <label>{CaseNumber}</label>
                  </Grid>
                  <TextField
                    name="case_number"
                    value={this.state.case.case_number}
                    onChange={this.onChangeCase}
                  />
                </Grid>
                <Grid className="patentInfoBtn">
                  <Button onClick={this.AddCase}>Add Patient to Flow</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
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
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
    speciality
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
    houseSelect,
    Speciality
  })(Index)
);

