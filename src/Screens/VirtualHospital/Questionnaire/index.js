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
import { getLanguage } from "translations/index"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SelectByTwo from "Screens/Components/SelectbyTwo/index";

const options = [{ label: "Classic", value: "classic" }, { label: "Rating scale", value: "rating_scale" }];
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
      editopenOpti: false,
      errorMsg: ''
    }
  }

  componentDidMount() {
    this.getAllQuestions();
  }

  //Modal Open 
  handleOpenQues = () => {
    this.setState({ openQues: true, openOpti: this.state.myQuestions?.type === 'classic' ? true : false, });
  }

  //Modal Close
  handleCloseQues = () => {
    this.setState({ openQues: false });
  }
  //Modal edit Open
  handleEditCloseQues = () => {
    this.setState({ editQues: false, });
  }

  //state change on add
  updateEntryState1 = (e, name, index) => {
    var state = this.state.myQuestions;
    if (name === 'type') {
      state = [{}];
      state[index][name] = e.value;
      let setView = e.value === 'classic' ? true : false;
      this.setState({ openOpti: setView })
    }
    else if (name === 'options' || name === 'other' || name === 'multiple_answer') {
      state[index][name] = e;
    }
    else {
      state[index][name] = e.target.value;
    }
    this.setState({ myQuestions: state });
  }

  // for delete choice fields
  deleteQuestions = (index) => {
    var QuesAy = this.state.myQuestions[0]?.length > 0 && this.state.myQuestions.filter((data, index1) => index1 !== index);
    this.setState({ myQuestions: QuesAy });
  };
  //for submit the questionaire

  // conditioning function for addition questionaire
  conditionFunc = (myQuestions) => {
    if (this.state.perticular_id) {
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

  handleSubmit = () => {
    this.setState({ errorMsg: "" })
    // this.setState({myQuestions: {} ,openOpti: true})
    var myQuestions = this.state.AllQuestions;
    myQuestions = [...myQuestions, ...this.state.myQuestions]
    let length = myQuestions.length
    if (!myQuestions[length - 1]?.type || (myQuestions[length - 1]?.type.length < 1)) {
      this.setState({ errorMsg: "Please select question type" })
    }
    else if (myQuestions[length - 1].type == "rating_scale") {
      if (!myQuestions[length - 1].title || myQuestions[length - 1].title.length < 1) {
        this.setState({ errorMsg: "Title can't be empty" })
      }
      else if (!myQuestions[length - 1].question || myQuestions[length - 1].question.length < 1) {
        this.setState({ errorMsg: "Question can't be empty" })
      }
      else {
        this.conditionFunc(myQuestions)
      }
    }
    else if (myQuestions[length - 1].type == "classic") {
      if (!myQuestions[length - 1].question || myQuestions[length - 1].question.length < 1) {
        this.setState({ errorMsg: "Question can't be empty" })
      }
      else {
        this.conditionFunc(myQuestions)
      }
    }
  }

  //for sunit the edit form
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
    let translate = getLanguage(this.props.stateLanguageType);
    let { removeQuestion, No, Yes, are_you_sure_removeQuestion } = translate;
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
              <h1>{removeQuestion}</h1>
            ) : (
              <h1>{removeQuestion}</h1>
            )}
            <p>{are_you_sure_removeQuestion}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>
              <button
                onClick={() => {
                  this.removeQuestions2(status, perticular_id);
                  // onClose();
                }}
              >
                {Yes}
              </button>
            </div>
          </div>
        );
      },
    });
  };

  removeQuestions2 = (status, perticular_id) => {
    this.setState({ message: null });
    let translate = getLanguage(this.props.stateLanguageType);
    let { Yes, No, removeQuestion, are_you_sure_removeQuestion } = translate;
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
              <h1 class="alert-btn">{removeQuestion}</h1>
            ) : (
              <h1>{removeQuestion}</h1>
            )}
            <p>{are_you_sure_removeQuestion}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>
              <button
                onClick={() => {
                  this.deleteClickQuestion(status, perticular_id);
                  onClose();
                }}
              >
                {Yes}
              </button>
            </div>
          </div>
        );
      },
    });
  };
  //Manage edit questionnaire
  editQuestion = (data, _id) => {
    this.setState({ editQuestions: data, editQues: true, editopenOpti: data?.type === 'classic' ? true : false });
  };
  //Delete the quesitonnaire
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
  //update the state on eidt the questionnaire
  editQuestionState = (e, name) => {
    var QuesAy = this.state.editQuestions;
    if (name === 'options') {
      QuesAy["options"] = e;
    }
    else if (name === 'type') {
      QuesAy = {};
      QuesAy["type"] = e.value;
      let setView = e.value === 'classic' ? true : false;
      this.setState({ editopenOpti: setView })
    }
    else if (name === 'multiple_answer' || name === 'other') {
      QuesAy[name] = e.target.checked;
    }
    else {
      QuesAy[name] = e.target.value;
    }
    this.setState({ editQuestions: QuesAy });
  }
  //on changing the page
  onChangePage = (pageNumber) => {
    this.setState({
      questions_data: this.state.AllQuestions.slice(
        (pageNumber - 1) * 10,
        pageNumber * 10
      ),
      currentPage: pageNumber,
    });
  };
  //get the selected value of type of question
  SelectedValue = (value) => {
    var selected = options?.length > 0 && options.filter((e) => e.value === value)
    if (selected?.length > 0) return selected[0]
    return {}
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { type, Question, Options, AddQuestionnaire, Add_other, EditQuestionnaire, Add_a_Choice, Questionnairetitle, Make_it_multiple_questionnaire,
      Choose_questionnaire_type, NewQuestion, QuestionnaireDescription, save_and_close, EditQuestion, DeleteQuestion, of } = translate;
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
              <LeftMenuMobile isNotShow={true} currentPage="more" />
              <Grid container direction="row">
                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="more" />
                </Grid>
                {/* End of Menu */}

                {/* Start of Right Section */}
                <Grid item xs={12} md={10}>
                  <Grid className="topLeftSpc">
                    <Grid container direction="row">
                      <Grid item xs={6} md={6}>
                        {/* Back common button */}
                        <Grid className="extSetting">
                        </Grid>
                        {/* End of Back common button */}
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Grid className="newServc que-mbottom">
                          <Button onClick={this.handleOpenQues}>
                            {NewQuestion}
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
                              <Grid className="addSpeclContntIner">
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
                                            label={Choose_questionnaire_type}
                                            options={options}
                                            onChange={(e) => this.updateEntryState1(e, "type", 0)}
                                            value={this.SelectedValue(this.state.myQuestions[0]?.type)}
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
                                                label={Make_it_multiple_questionnaire}
                                              />
                                            </Grid>

                                            <Grid>
                                              <VHfield
                                                label={Question}
                                                name="question"
                                                placeholder={"Enter a question"}
                                                onChange={(e) =>
                                                  this.updateEntryState1(e, "question", 0)
                                                }
                                                value={this.state.myQuestions[0]?.question}
                                              />
                                            </Grid>

                                            <Grid className="add_a_choice">
                                              <AddHouses
                                                label={Add_a_Choice}
                                                name="choice"
                                                placeholder={"Enter choice"}
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
                                                label={Add_other}
                                              />

                                            </Grid>
                                          </>
                                        ) : (
                                          <>
                                            <Grid className="questionfieldprop">
                                              <VHfield
                                                label={Questionnairetitle}
                                                name="title"
                                                placeholder={"Enter title"}
                                                onChange={(e) =>
                                                  this.updateEntryState1(e, "title", 0)
                                                }
                                                value={this.state.myQuestions[0]?.title}
                                              />
                                            </Grid>

                                            <Grid item xs={12} md={12} className="taskDescp">
                                              <label>{QuestionnaireDescription}</label>
                                              <Grid>
                                                <textarea
                                                  placeholder={"Enter description"}
                                                  name="description"
                                                  onChange={(e) =>
                                                    this.updateEntryState1(e, "description", 0)
                                                  }
                                                  value={this.state.myQuestions[0]?.description}
                                                >
                                                </textarea>
                                              </Grid>
                                            </Grid>

                                            <Grid>
                                              <VHfield
                                                label={Question}
                                                name="question"
                                                placeholder={"Enter question"}
                                                onChange={(e) =>
                                                  this.updateEntryState1(e, "question", 0)
                                                }
                                                value={this.state.myQuestions[0]?.question}
                                              />
                                            </Grid>

                                          </>
                                        )}
                                      </Grid>
                                      <p className='err_message'>{this.state.errorMsg}</p>
                                    </Grid>
                                  </Grid>
                                )}
                                <Grid className="infoSub2">
                                    <Button  onClick={() => this.handleSubmit()}>
                                      {save_and_close}
                                    </Button>
                                </Grid>
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
                              <Grid className="addSpeclContntIner">
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
                                    <label>{EditQuestionnaire}</label>
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
                                                        e,
                                                        "multiple_answer",
                                                      )
                                                    }
                                                  />
                                                }
                                                label={Make_it_multiple_questionnaire}
                                              />
                                            </Grid>

                                            <Grid>
                                              <VHfield
                                                label={Question}
                                                name="question"
                                                placeholder={"Enter a question"}
                                                onChange={(e) =>
                                                  this.editQuestionState(e, "question")
                                                }
                                                value={this.state.editQuestions?.question}
                                              />
                                            </Grid>

                                            <Grid className="add_a_choice">
                                              <AddHouses
                                                label={Add_a_Choice}
                                                name="choice"
                                                placeholder={"Enter choice"}
                                                onChange={(e) =>
                                                  this.editQuestionState(e, "options")
                                                }
                                                comesFrom={'questionaire'}
                                                roomArray={this.state.editQuestions?.options}
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
                                                        e,
                                                        "other",
                                                      )
                                                    }
                                                  />
                                                }
                                                label={Add_other}
                                              />

                                            </Grid>
                                          </>
                                        ) : (
                                          <>
                                            <Grid className="questionfieldprop">
                                              <VHfield
                                                label={Questionnairetitle}
                                                name="title"
                                                placeholder={"Enter title"}
                                                onChange={(e) =>
                                                  this.editQuestionState(e, "title")
                                                }
                                                value={this.state.editQuestions?.title}
                                              />
                                            </Grid>

                                            <Grid item xs={12} md={12} className="taskDescp">
                                              <label>{QuestionnaireDescription}</label>
                                              <Grid>
                                                <textarea
                                                  placeholder={"Enter description"}
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
                                                label={Question}
                                                name="question"
                                                placeholder={"Enter question"}
                                                onChange={(e) =>
                                                  this.editQuestionState(e, "question")
                                                }
                                                value={this.state.editQuestions?.question}
                                              />
                                            </Grid>

                                          </>
                                        )}
                                      </Grid>
                                    </Grid>

                                  </Grid>
                                )}
                                <Grid className="infoSub2">
                                    <Button onClick={() => { this.handleeditSubmit(); this.handleEditCloseQues() }}>
                                      {save_and_close}
                                    </Button>
                                </Grid>
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
                            <Th>{type}</Th>
                            <Th>{Question}</Th>
                            <Th>{Options}</Th>
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
                                <Td>{data.options ? data.options?.join(', ') : '-'}</Td>
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
                                          {EditQuestion}
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
                                            {DeleteQuestion}
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
                                {this.state.currentPage} {of} {this.state.totalPage}
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
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { House } = state.houseSelect;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
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