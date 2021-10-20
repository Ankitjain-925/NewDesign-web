import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { commonHeader } from "component/CommonHeader/index";
import sitedata from "sitedata";
import { confirmAlert } from "react-confirm-alert";
import { withRouter } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { houseSelect } from "../Institutes/selecthouseaction";
import Loader from "Screens/Components/Loader/index";
import Pagination from "Screens/Components/Pagination/index";
import AddHouses from "Screens/Components/VirtualHospitalComponents/AddRoom/AddHouses.js";
import SelectField from "Screens/Components/Select/index";
import {
  getLanguage
}from "translations/index"

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SelectByTwo from "Screens/Components/SelectbyTwo/index";

const options = [{label: "Classic", value: "classic"}, {label: "Rating scale", value: "rating_scale"}]
;

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openQues: false,
      openOpti: true,
      opeInp: false,
      house_name: '',
      house_id: '',
      question: '',
      options: '',
      type: '',
      myQuestions: [{}],
      option: this.props.option,
      questions_data: [],
      AllQuestions: [],
      perticular_id: false,
      editQuestions: {},
      editQues: false,
      loaderImage: false,
      editopenOpti: false
    }
  }

  componentDidMount() {
    this.getAllQuestions();
  }

  //Modal Open 
  handleOpenQues = () => {
    this.setState({ openQues: true,  openOpti: this.state.myQuestions?.type==='classic'? true : false, });
  }

  //Modal Close
  handleCloseQues = () => {
    this.setState({ openQues: false});
  }

  handleEditCloseQues = () => {
    this.setState({ editQues: false, });
  }

  updateEntryState1 = (e, name, index) => {
    var state = this.state.myQuestions;
    if(name==='type'){
      state=[{}];
      state[index][name] = e.value;
      let setView = e.value === 'classic' ? true: false;
      this.setState({openOpti : setView})
    }
    else if(name==='options' || name==='other' || name==='multiple_answer'){
      state[index][name] = e;
    }
    else{
      state[index][name] = e.target.value;
    }
    this.setState({ myQuestions: state });
  }

  // for delete choice fields
  deleteQuestions = (index) => {
    var QuesAy = this.state.myQuestions[0]?.length > 0 && this.state.myQuestions.filter((data, index1) => index1 !== index);
    this.setState({ myQuestions: QuesAy });
  };

  handleSubmit = () => {
    console.log("myQuestions", this.state.myQuestions)
    // this.setState({myQuestions: {} ,openOpti: true})
    var myQuestions = this.state.AllQuestions;
    myQuestions = [...myQuestions, ...this.state.myQuestions]
    if (this.state.perticular_id) {
      // console.log('on second time add')
      axios
        .put(
          sitedata.data.path + "/questionaire/Question/" + this.state.perticular_id,
          {
            questions: myQuestions
          },
          commonHeader(this.props.stateLoginValueAim.token)
        )

        .then((responce) => {
          this.handleCloseQues();
          this.setState({
            myQuestions: {},
          });
          this.getAllQuestions();
        })
    }
    else {

      axios
        .post(
          sitedata.data.path + "/questionaire/AddQuestionaire",
          {
            house_id: this.props?.House?.value,
            house_name: this.props?.House?.label,
            questions: myQuestions
          },
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          this.setState({ myQuestions: [{}] })
          this.getAllQuestions();
        })
        .catch(function (error) {
          console.log(error);
        });

     }
  }

  handleeditSubmit = () => {
    this.setState({ loaderImage: true });
    axios
      .put(
        sitedata.data.path + "/questionaire/Question/" + this.state.perticular_id,
        {
          questions: this.state.AllQuestions
        },
         commonHeader(this.props.stateLoginValueAim.token)
      )

      .then((responce) => {
        this.setState({
          editQuestions: {},
          loaderImage: false
        });
        this.getAllQuestions();
      })
  }
  // For getting the Question and implement Pagination

  getAllQuestions = () => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path +
        `/questionaire/GetQuestionaire/${this.props?.House?.value}`,
        commonHeader(this.props.stateLoginValueAim.token)
        
      )
      .then((response) => {
        var totalPage = Math.ceil(
          response.data.data?.[0]?.questions?.length / 10
        );
        this.setState(
          {
            myQuestions: [{}],
            AllQuestions: response.data.data?.[0]?.questions || [],
            loaderImage: false,
            totalPage: totalPage,
            currentPage: 1,
            perticular_id: response.data.data?.[0]?._id
              ? response.data.data?.[0]?._id
              : false,
          },
          () => {
            if (totalPage > 1) {
              var pages = [];
              for (var i = 1; i <= this.state.totalPage; i++) {
                pages.push(i);
              }
              this.setState({
                questions_data: this.state.AllQuestions.slice(0, 10),
                pages: pages,
              });
            } else {
              this.setState({ questions_data: this.state.AllQuestions });
            }
          }
        );
      });
  };

  //Delete the perticular question confirmation box
  removeQuestions = (status, perticular_id) => {
    this.setState({ message: null });
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark"
                ? "dark-confirm react-confirm-alert-body"
                : "react-confirm-alert-body"
            }
          >
            {status && status === "remove" ? (
              <h1>Remove the Question ?</h1>
            ) : (
              <h1>Remove the Question ?</h1>
            )}
            <p>Are you sure to remove this Question?</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  this.deleteClickQuestion(status, perticular_id);
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };

  editQuestion = (data, _id) => {
    this.setState({ editQuestions: data, editQues: true, editopenOpti: data?.type==='classic'? true : false });
  };

  deleteClickQuestion(status, perticular_id) {
    const newQuestion = [...this.state.questions_data];
    var QuesAy = newQuestion?.length > 0 &&
      newQuestion.filter((data) => data._id !== perticular_id);

    // this.state.AllQuestions.split(perticular_id)
    this.setState({ loaderImage: true });
    axios
      .put(
        sitedata.data.path +
        "/questionaire/Question/" +
        this.state.perticular_id,
        {
          questions: QuesAy,
        },
         commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.setState({ loaderImage: false });
        this.getAllQuestions();
      });
  }

  editQuestionState = (e, name) => {
    var QuesAy = this.state.editQuestions;
    if (name === 'options') {
      QuesAy["options"] = e;
    }
    else if (name === 'type') {
      QuesAy = {};
      QuesAy["type"] = e.value;
      let setView = e.value === 'classic' ? true: false;
      this.setState({editopenOpti : setView})
    }
    else {
      QuesAy[name] = e.target.value;
    }
    this.setState({ editQuestions: QuesAy });
  }

  onChangePage = (pageNumber) => {
    this.setState({
      questions_data: this.state.AllQuestions.slice(
        (pageNumber - 1) * 10,
        pageNumber * 10
      ),
      currentPage: pageNumber,
    });
  };

  SelectedValue=(value)=>{
    var selected = options?.length>0 && options.filter((e)=> e.value===value)
    if(selected?.length>0) return selected[0]
    return {}
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {AddQuestionnaire, EditQuestionnaire } = translate;
    const { questions_data } = this.state;
    const { stateLoginValueAim, House } = this.props;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      stateLoginValueAim.user.type !== "adminstaff" ||
      !this.props.verifyCode ||
      !this.props.verifyCode.code
    ) {
      return <Redirect to={"/"} />;
    }
    if (House && House?.value === null) {
      return <Redirect to={"/VirtualHospital/institutes"} />;
    }
    var placeholders = "Enter choice 1" 
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

              {/* Mobile menu */}
              <LeftMenuMobile isNotShow={true} currentPage="chat" />
              <Grid container direction="row">
                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="chat" />
                </Grid>
                {/* End of Menu */}

                {/* Start of Right Section */}
                <Grid item xs={12} md={10}>
                  <Grid className="topLeftSpc">
                    <Grid container direction="row">
                      <Grid item xs={6} md={6}>
                        {/* Back common button */}
                        <Grid className="extSetting">
                          {/* <a><img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" />
                                                        Back to Billing</a> */}
                        </Grid>
                        {/* End of Back common button */}
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Grid className="newServc">
                          <Button onClick={this.handleOpenQues}>
                            + New Question
                          </Button>
                          <Modal
                            open={this.state.openQues}
                            onClose={this.handleCloseQues}
                            className={
                              this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode &&
                                this.props.settings.setting.mode === "dark"
                                ? "addSpeclModel darkTheme"
                                : "addSpeclModel"
                            }
                          >
                            <Grid className="addSpeclContnt">
                              <Grid className="addSpeclLbl">
                                <Grid className="nwDiaCloseBtn">
                                  <a onClick={this.handleCloseQues}>
                                    <img
                                      src={require("assets/images/close-search.svg")}
                                      alt=""
                                      title=""
                                    />
                                  </a>
                                </Grid>
                                <Grid>
                                  <label>{AddQuestionnaire}</label>
                                </Grid>
                              </Grid>
                              {this.state.myQuestions && (
                                <Grid>
                                  <Grid className="cnfrmDiaMain">
                                    <Grid className="fillDia">
                                      {/* <Grid> */}
                                        {/* <label>Choose questionnaire type </label> */}
                                        <Grid className="fillDia">
                                          <SelectByTwo
                                            name="situation"
                                            label={"Choose questionnaire type"}
                                            options={options}
                                            onChange={(e) => this.updateEntryState1(e, "type",0)}
                                            value={this.SelectedValue(this.state.myQuestions[0]?.type) }
                                          />
                                      </Grid>
                                      {this.state.openOpti ? (
                                        <>
                                          <Grid>
                                            <FormControlLabel
                                              className="checkboxques"
                                              control={
                                                <Checkbox name="multiple_answer"
                                                  checked={this.state.myQuestions[0]?.multiple_answer === true}
                                                  onChange={(e) =>
                                                    this.updateEntryState1(
                                                      e.target.checked,
                                                      "multiple_answer",
                                                      0
                                                    )
                                                  }
                                                />
                                              }
                                              label="Make it a multiple questionnaire"
                                            />
                                          </Grid>

                                          <Grid>
                                            <VHfield
                                              label="Question"
                                              name="question"
                                              placeholder="Enter a question"
                                              onChange={(e) =>
                                                this.updateEntryState1(e, "question",0)
                                              }
                                            value={ this.state.myQuestions[0]?.question }
                                            />
                                          </Grid>

                                          <Grid className="add_a_choice">
                                            <AddHouses
                                              label="Add a Choice"
                                              name="choice"
                                              placeholder="Enter choice"
                                              onChange={(e) =>
                                                this.updateEntryState1(e, "options", 0)
                                              }
                                              comesFrom={'questionaire'}
                                              roomArray={
                                              this.state.myQuestions[0]?.options
                                            }
                                            />
                                          </Grid>

                                          <Grid>
                                            <FormControlLabel
                                              className="checkboxquestion"
                                              control={
                                                <Checkbox name="other"
                                                  checked={this.state.myQuestions[0]?.other === true}
                                                  onChange={(e) =>
                                                    this.updateEntryState1(
                                                      e.target.checked,
                                                      "other",
                                                      0
                                                    )
                                                  }
                                                />
                                              }
                                              label="Add ''other'' text field"
                                            />

                                          </Grid>
                                        </>
                                      ):(
                                        <>
                                          <Grid className="questionfieldprop">
                                            <VHfield
                                              label="Questionnaire title"
                                              name="title"
                                              placeholder="Enter title"
                                              onChange={(e) =>
                                                this.updateEntryState1(e, "title",0)
                                              }
                                            value={ this.state.myQuestions[0]?.title }
                                            />
                                          </Grid>

                                          <Grid item xs={12} md={12} className="taskDescp">
                                            <label>Questionnaire description</label>
                                            <Grid>
                                              <textarea
                                                placeholder="Enter description"
                                                name="description"
                                                onChange={(e) =>
                                                  this.updateEntryState1(e, "description",0)
                                                }
                                                value={this.state.myQuestions[0]?.description}
                                              >
                                              </textarea>
                                            </Grid>
                                          </Grid>

                                          <Grid>
                                            <VHfield
                                              label="Question"
                                              name="question"
                                              placeholder="Enter question"
                                              onChange={(e) =>
                                                this.updateEntryState1(e, "question",0)
                                              }
                                            value={ this.state.myQuestions[0]?.question }
                                            />
                                          </Grid>

                                        </>
                                      )}
                                    </Grid>
                                  </Grid>
                                  {/* <Grid className="add_a_question">
                                      <a onClick={this.onAddFiled}>
                                        + add a question
                                      </a>
                                    </Grid> */}
                                </Grid>
                              )}
                              <Grid className="infoSub2">
                                <a onClick={this.handleCloseQues}>
                                  <Button onClick={() => this.handleSubmit()}>
                                    Save & Close
                                  </Button>
                                </a>
                              </Grid>
                            </Grid>
                          </Modal>

                          <Modal
                            open={this.state.editQues}
                            onClose={this.handleEditCloseQues}
                            className={
                              this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode &&
                                this.props.settings.setting.mode === "dark"
                                ? "addSpeclModel darkTheme"
                                : "addSpeclModel"
                            }
                          >
                            <Grid className="addSpeclContnt">
                              <Grid className="addSpeclLbl">
                                <Grid className="nwDiaCloseBtn">
                                  <a onClick={this.handleEditCloseQues}>
                                    <img
                                      src={require("assets/images/close-search.svg")}
                                      alt=""
                                      title=""
                                    />
                                  </a>
                                </Grid>
                                <Grid>
                                  <label>{"Edit Questionnaire"}</label>
                                </Grid>
                              </Grid>
                              {this.state.myQuestions && (
                                <Grid>
                                  <Grid className="cnfrmDiaMain">
                                    <Grid className="fillDia">
                                        <Grid className="fillDia">
                                        
                                        </Grid>
                                      {this.state.editopenOpti ? (
                                        <>
                                          <Grid>
                                            <FormControlLabel
                                              className="checkboxques"
                                              control={
                                                <Checkbox name="multiple_answer"
                                                  checked={this.state.editQuestions?.multiple_answer === true}
                                                  onChange={(e) =>
                                                    this.editQuestionState(
                                                      e.target.checked,
                                                      "multiple_answer",
                                                    )
                                                  }
                                                />
                                              }
                                              label="Make it a multiple questionnaire"
                                            />
                                          </Grid>

                                          <Grid>
                                            <VHfield
                                              label="Question"
                                              name="question"
                                              placeholder="Enter a question"
                                              onChange={(e) =>
                                                this.editQuestionState(e, "question")
                                              }
                                            value={ this.state.editQuestions?.question }
                                            />
                                          </Grid>

                                          <Grid className="add_a_choice">
                                            <AddHouses
                                              label="Add a Choice"
                                              name="choice"
                                              placeholder="Enter choice"
                                              onChange={(e) =>
                                                this.editQuestionState(e, "options")
                                              }
                                              comesFrom={'questionaire'}
                                              roomArray={ this.state.editQuestions?.options }
                                            />
                                          </Grid>

                                          <Grid>
                                            <FormControlLabel
                                              className="checkboxquestion"
                                              control={
                                                <Checkbox name="other"
                                                  checked={this.state.editQuestions?.other === true}
                                                  onChange={(e) =>
                                                    this.editQuestionState(
                                                      e.target.checked,
                                                      "other",
                                                    )
                                                  }
                                                />
                                              }
                                              label="Add ''other'' text field"
                                            />

                                          </Grid>
                                        </>
                                      ):(
                                        <>
                                          <Grid className="questionfieldprop">
                                            <VHfield
                                              label="Questionnaire title"
                                              name="title"
                                              placeholder="Enter title"
                                              onChange={(e) =>
                                                this.editQuestionState(e, "title")
                                              }
                                            value={ this.state.editQuestions?.title }
                                            />
                                          </Grid>

                                          <Grid item xs={12} md={12} className="taskDescp">
                                            <label>Questionnaire description</label>
                                            <Grid>
                                              <textarea
                                                placeholder="Enter description"
                                                name="description"
                                                onChange={(e) =>
                                                  this.editQuestionState(e, "description")
                                                }
                                                value={this.state.editQuestions?.description}
                                              >
                                              </textarea>
                                            </Grid>
                                          </Grid>

                                          <Grid>
                                            <VHfield
                                              label="Question"
                                              name="question"
                                              placeholder="Enter question"
                                              onChange={(e) =>
                                                this.editQuestionState(e, "question")
                                              }
                                            value={ this.state.editQuestions?.question }
                                            />
                                          </Grid>

                                        </>
                                      )}
                                    </Grid>
                                  </Grid>
                               
                                </Grid>
                              )}
                              <Grid className="infoSub2">
                                <a onClick={this.handleEditCloseQues}>
                                  <Button onClick={() => this.handleeditSubmit()}>
                                    Save & Close
                                  </Button>
                                </a>
                              </Grid>
                            </Grid>
                          </Modal>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="srvcTable3">
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Type</Th>
                            <Th>Question</Th>
                            <Th>Options</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>

                          {questions_data?.length > 0 && questions_data.map((data, index) => (

                            <>
                              <Tr>
                                <Td>
                                  <label>{data.type}</label>
                                </Td>
                                <Td>
                                  <label>{data.question}</label>
                                </Td>
                                {/* <Td>{data.options?.join(', ') }</Td> */}
                                <Td>{data.options ? data.options?.join(', ') : '-'}</Td>
                                {/* <Td className="srvcDots"> */}
                                <Td className="presEditDot scndOptionIner">
                                  <a className="openScndhrf">
                                    <Button>
                                      <img
                                        src={require("assets/images/three_dots_t.png")}
                                        alt=""
                                        title=""
                                        className="openScnd"
                                      />
                                    </Button>
                                    <ul>
                                      <li>
                                        {/* {console.log('data._id', data._id, data)} */}
                                        <a
                                          onClick={() => {
                                            this.editQuestion(data, data._id);
                                          }}
                                        >
                                          <img
                                            src={require("assets/images/details.svg")}
                                            alt=""
                                            title=""
                                          />
                                          Edit Question
                                        </a>
                                      </li>
                                      {data.status !== "remove" && (
                                        <li
                                          onClick={() => {
                                            this.removeQuestions("remove", data._id);
                                          }}
                                        >
                                          <a>
                                            <img
                                              src={require("assets/images/cancel-request.svg")}
                                              alt=""
                                              title=""
                                            />
                                            Delete Question
                                          </a>
                                        </li>
                                      )}
                                    </ul>
                                  </a>
                                </Td>
                              </Tr>
                            </>
                          ))}
                        </Tbody>
                      </Table>
                      <Grid className="tablePagNum">
                        <Grid container direction="row">
                          <Grid item xs={12} md={6}>
                            <Grid className="totalOutOff">
                              <a>
                                {this.state.currentPage} of {this.state.totalPage}
                              </a>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            {this.state.totalPage > 1 && (
                              <Grid className="prevNxtpag">

                                <Pagination totalPage={this.state.totalPage} currentPage={this.state.currentPage} pages={this.state.pages} onChangePage={(page) => { this.onChangePage(page) }} />
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* end of service price content */}
                  </Grid>
                </Grid>
                {/* End of Right Section */}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              {this.state.totalPage > 1 && (
                <Grid className="prevNxtpag">
                  <Pagination
                    totalPage={this.state.totalPage}
                    currentPage={this.state.currentPage}
                    pages={this.state.pages}
                    onChangePage={(page) => {
                      this.onChangePage(page);
                    }}
                  />
                </Grid>
              )}
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
