import React, { Component } from "react";
import reorder, { reorderQuoteMap } from "./reorder";
import Grid from "@material-ui/core/Grid";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { slide as Menu } from "react-burger-menu";
import axios from "axios";
import Input from "@material-ui/core/Input";
import Select from "react-select";
import Loader from "Screens/Components/Loader/index";
// import { authorQuoteMap, getSteps, authors } from "./data";
import { getSteps, getAuthor, updateInActualData, MoveAllCases } from "./data";
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
import _ from 'lodash';
import {
  getLanguage
}from "translations/index"

const options = [
  { value: "data1", label: "Data1" },
  { value: "data2", label: "Data2" },
  { value: "data3", label: "Data3" },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      view: "vertical",
      openAddP: false,
      fullData: {},
      actualData:[],
      edit: false,
      addp:{},
      case: {},
      caseAlready: false,
      AddstpId: false
    };
  }
  static defaultProps = {
    isCombineEnabled: false,
  };
  boardRef;

  componentDidMount() {
    var steps = getSteps(
      this.props?.House?.value,
      this.props.stateLoginValueAim.token
    );
    steps.then((data) => {
      var stepData = data ? data : [];
      this.setDta(stepData);
    });
  }

  moveDetial=(id)=>{
    alert('Hello', id)
    this.props.history.push(`/virtualhospital/patient-detail/${id}`)
  }

  //For calling the API
  CallApi = () => {
    var deep = _.cloneDeep(this.state.actualData);
    deep.map((item)=>{
      item.case_numbers = item.case_numbers.map((element)=>{
        if(element._id){
          let case_id = element._id
          element={};
          element.case_id=  case_id;
          return element;
        }
        else{
          return element;
        }
      })
    })
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

  //Change the value of the step_name
  onChange = (e, index) => {
    var state = this.state.actualData;
    state[index][e.target.name] = e.target.value;
    this.setDta(state);
    this.setState({ edit: false });
    this.CallApi();
  };

  //Edit the name of step
  editName = (index) => {
    this.setState({ edit: index });
  };

  //Add new step
  AddStep = () => {
    var state = this.state.actualData;
    state.push({ step_name: "Step" + state?.length, case_numbers: [] });
    this.setDta(state);
    this.CallApi();
  };

  // getCurrentAuth=(author, index1)=>{
  //   console.log('index1', index1, 'author', author)
  //   return 
  // }

  //Set data according to package
  setDta = (stepData) => {
    var author = getAuthor(stepData);
    stepData.map((item, index1)=>{
      item?.case_numbers?.length>0 && item.case_numbers.map((data, index)=>{
        data['author'] = author[index1];
      })
    })
    this.setState({ actualData: stepData });
    const authorQuoteMap = stepData.reduce(
      (previous, author) => ({
        ...previous,
        [author.step_name]: author.case_numbers,
      }),
      {}
    );
    this.setState({ fullData: authorQuoteMap });
  };

  //Open case model
  openAddPatient = (index = 0) => {
    this.setState({ openAddP: true, AddstpId: index });
  };

  //Close case model
  closeAddP = () => {
    this.setState({ openAddP: false });
  };

  //Delete the Step
  DeleteStep = (index) => {
    var state = this.state.actualData;
    state.splice(index, 1);
    this.setDta(state);
    this.CallApi();
  };

  //On Add case
  AddCase=()=>{
    var data = this.state.addp;
    data.institute_id = this.props.stateLoginValueAim?.user?.institute_id?.length>0 ?  this.props.stateLoginValueAim?.user?.institute_id[0]:''
      this.setState({ loaderImage: true });
      axios
        .post(
          sitedata.data.path + "/vh/checkPatient",
          data,
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            var case_data = {house_id: this.props?.House.value, 
              inhospital: true, 
              case_number: this.state.case.case_number,
              patient_id: responce.data.data._id,
              patient:{
                first_name: responce.data.data.first_name,
                last_name: responce.data.data.last_name,
                image: responce.data.data.image,
                profile_id: responce.data.data.profile_id,
                alies_id: responce.data.data.alies_id,
              }
            }
              axios
              .post(
                sitedata.data.path + "/cases/AddCase",
                case_data,
                commonHeader(this.props.stateLoginValueAim.token)
              )
              .then((responce1) => {
                if (responce1.data.hassuccessed) {
                  this.setState({idpinerror: false, openAddP: false, case: {},  addp: {}})
                  var state = this.state.actualData;
                  if(this.state.AddstpId){
                    state[this.state.AddstpId].case_numbers.push({case_id: responce1.data.data })
                  }
                  else{
                    state[0].case_numbers.push({case_id: responce1.data.data })
                  }
                  this.setState({AddstpId: false})
                  // console.log('state', state, responce1.data.data )
                  this.setDta(state);
                  this.CallApi();
                }
                else{
                  this.setState({caseAlready: true, loaderImage: false})
                  setTimeout(()=>{ this.setState({caseAlready: false})}, 3000)
                }
              })
              this.setState({ loaderImage: false });
            }
         
          else{
              this.setState({idpinerror: true, loaderImage: false})
              setTimeout(()=>{ this.setState({idpinerror: false})}, 3000)
          }
         
        });
  } 

  //On change the case
  onChangeCase=(e)=>{
    var state=this.state.case;
    state[e.target.name]= e.target.value;
    this.setState({case: state})
  }

  //On change the id or pin
  changeAddp=(e)=>{
    var state=this.state.addp;
    state[e.target.name]= e.target.value;
    this.setState({addp: state})
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  moveStep=(to, from, item)=>{
    var result= {type: 'COLUMN', draggableId: item, source: {droppableId: "board", index: from}, destination: {droppableId: "board", index: to}};
    var actualData = updateInActualData(this.state.actualData, result)
    actualData.then((result)=>{
      this.setState({actualData: result},()=>{
        this.CallApi();
      })
    })
  }

  dragDropFlow=(result)=>{
    var actualData = updateInActualData(this.state.actualData, result)
    actualData.then((result)=>{
      this.setState({actualData: result},()=>{
        this.CallApi();
      })
    })
  }

  moveAllPatient = (to, from, data)=>{
    var to32 = this.state.actualData.length>0 && this.state.actualData.map(function(e) { return e.step_name; }).indexOf(to);
    var actualData = MoveAllCases(this.state.actualData, from, to32, data)
    actualData.then((result)=>{
      this.setState({actualData: result},()=>{
        this.CallApi();
      })
    })
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {PatientFlow, AddPatienttoFlow, PatientID, PatientPIN, CaseNumber} = translate;
    const { selectedOption } = this.state;
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
          {}
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <LeftMenuMobile isNotShow={true} currentPage="flow" />
              <Grid container direction="row">
                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="flow" />
                </Grid>
                {/* End of Menu */}
                <Grid item xs={11} md={11}>
                  <Grid className="cmnLftSpc ptntFlowSpc">
                    <Grid className="addFlow">
                      <Grid container direction="row" justify="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <h1>{PatientFlow}</h1>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          className="addFlowRght"
                        >
                          <a onClick={()=>this.openAddPatient(0)}>+ Add patient</a>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="srchPatient">
                      <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={5} className="srchLft">
                          <Input placeholder="Search by Patient ID, Patient name, Doctor..." />
                          <a>
                            <img
                              src={require("assets/virtual_images/InputField.svg")}
                              alt=""
                              title=""
                            />
                          </a>
                        </Grid>
                        <Grid item xs={12} md={7}>
                          <Grid className="srchRght">
                            <a className="srchSort">
                              <img
                                src={require("assets/virtual_images/sort.png")}
                                alt=""
                                title=""
                              />
                            </a>
                            <Select 
                              value={selectedOption}
                              onChange={this.handleChange}
                              options={options}
                              placeholder="All Specialities"
                              className="allSpec"
                              isSearchable={false}
                            />
                            <a
                              className="lineSort"
                              onClick={() => {
                                this.setState({ view: "vertical" });
                              }}
                            >
                              <img
                                src={require("assets/virtual_images/lines.png")}
                                alt=""
                                title=""
                              />
                            </a>
                            <a
                              className="horzSort"
                              onClick={() => {
                                this.setState({ view: "horizontal" });
                              }}
                            >
                              <img
                                src={require("assets/virtual_images/timeline-view-active.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Drags
                      moveDetial={(id)=>this.moveDetial(id)}
                      DeleteStep={(index) => this.DeleteStep(index)}
                      onKeyDownlogin={this.onKeyDownlogin}
                      editName={this.editName}
                      edit={this.state.edit}
                      onChange={this.onChange}
                      AddStep={this.AddStep}
                      openAddPatient={this.openAddPatient}
                      initial={this.state.fullData}
                      dragDropFlow={this.dragDropFlow}
                      moveAllPatient={(to, from, data) => this.moveAllPatient(to, from , data)}
                      view={this.state.view}
                      moveStep={(to, from, item)=>{this.moveStep(to, from, item)}}
                      setDta={(item)=>this.setDta(item)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={this.state.openAddP}
          onClose={this.closeAddP}
        >
          <Grid className="addFlowContnt">
            <Grid className="addFlowIner">
              <Grid className="addFlowLbl">
                <Grid className="addFlowClose">
                  <a onClick={this.closeAddP}>
                    <img
                      src={require("assets/virtual_images/closefancy.png")}
                      alt=""
                      title=""
                    />
                  </a>
                </Grid>
                <label>{AddPatienttoFlow}</label>
              </Grid>
              <Grid className="patentInfo">
                {this.state.caseAlready &&
                <div className="err_message">
                  Case Already exists in hospital
                </div>}
                {this.state.idpinerror &&
                <div className="err_message">
                  ID and PIN is not correct 
                </div>}
                <Grid className="patentInfoTxt">
                  <Grid>
                    <label>{PatientID}</label>
                  </Grid>
                  <TextField name="patient_id" value={this.state.addp.patient_id} onChange={this.changeAddp}/>
                </Grid>
                <Grid className="patentInfoTxt">
                  <Grid>
                    <label>{PatientPIN}</label>
                  </Grid>
                  <TextField name="pin" value={this.state.addp.pin} onChange={this.changeAddp}/>
                </Grid>
                <Grid className="patentInfoTxt">
                  <Grid>
                    <label>{CaseNumber}</label>
                  </Grid>
                  <TextField name="case_number" value={this.state.case.case_number} onChange={this.onChangeCase}/>
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
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
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
  })(Index)
);
