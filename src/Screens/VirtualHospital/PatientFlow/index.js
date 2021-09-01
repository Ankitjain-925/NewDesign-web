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
import { getSteps, getAuthor } from "./data";
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
      actualData: {},
      edit: false,
      addp:{},
      case: {},
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

  //For calling the API
  CallApi = () => {
    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + "/step/AddStep",
        {
          house_id: this.props?.House?.value,
          steps: this.state.actualData,
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
    if (e.key === "Enter") {
      this.setState({ edit: false });
      this.CallApi();
    }
    var state = this.state.actualData;
    state[index][e.target.name] = e.target.value;
    this.setDta(state);
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
        console.log('index', index, 'index1', index1, 'author', author)
        data['author'] = author[index1];
      })
    })
    console.log('stepData', stepData)
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
  openAddPatient = () => {
    this.setState({ openAddP: true });
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
                  state[0].case_numbers.push({case_id: responce1.data.data })
                  console.log('state+nuw', state)
                  this.setDta(state);
                  this.CallApi();
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

  render() {
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
                          <h1>Patient Flow</h1>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          className="addFlowRght"
                        >
                          <a onClick={this.openAddPatient}>+ Add patient</a>
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
                      DeleteStep={(index) => this.DeleteStep(index)}
                      onKeyDownlogin={this.onKeyDownlogin}
                      editName={this.editName}
                      edit={this.state.edit}
                      onChange={this.onChange}
                      AddStep={this.AddStep}
                      openAddPatient={this.openAddPatient}
                      initial={this.state.fullData}
                      // initial={authorQuoteMap}
                      view={this.state.view}
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
                <label>Add Patient to Flow</label>
              </Grid>
              <Grid className="patentInfo">
                {this.state.idpinerror &&
                <div className="err_message">
                  ID and PIN is not correct 
                </div>}
                <Grid className="patentInfoTxt">
                  <Grid>
                    <label>Patient ID</label>
                  </Grid>
                  <TextField name="patient_id" value={this.state.addp.patient_id} onChange={this.changeAddp}/>
                </Grid>
                <Grid className="patentInfoTxt">
                  <Grid>
                    <label>Patient PIN</label>
                  </Grid>
                  <TextField name="pin" value={this.state.addp.pin} onChange={this.changeAddp}/>
                </Grid>
                <Grid className="patentInfoTxt">
                  <Grid>
                    <label>Case Number</label>
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
