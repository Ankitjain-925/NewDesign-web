import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import Modal from '@material-ui/core/Modal';
import axios from "axios";
import { commonHeaderToken } from "component/CommonHeader/index"
import sitedata from "sitedata";
import { confirmAlert } from "react-confirm-alert";
import Pagination from "Screens/Components/Pagination/index";
import AddHouses from "Screens/Components/VirtualHospitalComponents/AddRoom/AddHouses.js";
import SelectField from "Screens/Components/Select/index";

const options = [
    { value: "input", label: "Input" },
    { value: "options", label: "Options" },
];

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openQues: false,
            question: '',
            options: '',
            house_name: '',
            house_id: '',
            speciality_id: '',
            AllQuestions: [],
            updateTrack: {},
            questions: [],
            option: this.props.option,
            openOpti: false,
            opeInp: false,
            questionArr: this.props.questionArr || [],
        }
    }

    componentDidMount() {
        this.getAllQuestions();
    }

    //Modal Open 
    handleOpenQues = () => {
        this.setState({ openQues: true });
    }

    //Modal Close
    handleCloseQues = () => {
        this.setState({ openQues: false });
    }

    onAddFiled = () => {
        let qArray = this.state.questionArr;
        qArray.push({ type: "", question: "", options: "" });
        this.setState({ questionArr: qArray });
    };


    //for adding/updating the questions
    updateEntryState1 = (array) => {
        const state = this.state.updateTrack;
        state["questions"] = array;
        this.setState({ updateTrack: state });
    };

    //for choosing select field value 
    // updateEntryState2 = (e, name) => {
    //     const state = this.state.updateTrack;
    //     state[name] = e.value;
    //     this.setState({ updateTrack: state });
    //     if (e.value == "input") {
    //         this.setState({ openInp: true, openOpti: false });
    //     }
    //     else if (e.value == "options") {
    //         this.setState({ openOpti: true, openInp: false });
    //     }
    // }

    //for adding/updating the options
    // updateEntryState = (array) => {
    //     const state = this.state.updateTrack;
    //     state['options'] = array;
    //     this.setState({ updateTrack: state });
    // };

    //for choosing select field value 
    onFieldChange1 = (type, i) => {
        
        let qArray = this.state.questionArr;
        if (qArray && qArray.length == 0) {
            qArray.push({ type: type, question: "", options: "" });
        } else {
            qArray[i]["type"] = type;
        }
        this.setState({ questionArr: qArray });
        this.props.onChange(qArray);
    };

    //for adding the question
    onFieldChange2 = (question, i) => {
        //  console.log("question", question);
        let qArray = this.state.questionArr;
        if (qArray && qArray.length == 0) {
            qArray.push({ type: "", question: question, options: "" });
        } else {
            qArray[i]["question"] = question;
        }
        this.setState({ questionArr: qArray });
        this.props.onChange(qArray);
    };

    onFieldChange3 = (options, i) => {
        let qArray = this.state.questionArr;
        if (qArray && qArray.length == 0) {
            qArray.push({ type: "", question: "", options: options });
        } else {
            qArray[i]["options"] = options;
        }
        this.setState({ questionArr: qArray });
          this.props.onChange(qArray);
    };




    //For adding the New Question and Update Question
    handleSubmit = () => {
        //  console.log("question", this.state.updateTrack);
        if (this.state.updateTrack._id) {
            axios
                .put(
                    sitedata.data.path + "/questionaire/Question/" + this.state.updateTrack._id,
                    {
                        questions: [{
                            type: this.state.updateTrack.type,
                            question: this.state.updateTrack.question,
                            options: [
                                this.state.updateTrack.options
                            ],
                        }]
                    },
                    commonHeaderToken()
                )
                .then((responce) => {
                    this.setState({
                        updateTrack: {},
                    });
                    this.getAllQuestions();
                })
        }
        else {
            axios
                .post(
                    sitedata.data.path + "/questionaire/AddQuestionaire",
                    {
                        house_id: "600c15c2c983431790f904c3-1627046889451",
                        house_name: "House-2",
                        questions: [{
                            type: this.state.updateTrack.type,
                            question: this.state.updateTrack.question,
                            options: [
                                this.state.updateTrack.options
                            ],
                        }]
                    },
                    commonHeaderToken()
                )
                .then((responce) => {
                    this.getAllQuestions();
                })
                .catch(function (error) {
                    //  console.log(error);
                });
        }
    }

    // Open Edit Model
    editQuestion = (data) => {
        this.setState({ updateTrack: data, openQues: true })
    }

    // For getting the Question and implement Pagination
    getAllQuestions = () => {
        axios
            .get(
                sitedata.data.path + "/questionaire/GetQuestionaire/600c15c2c983431790f904c3-1627046889451",
                commonHeaderToken()
            )
            .then((response) => {
                var totalPage = Math.ceil(response.data.data.length / 10);
                this.setState(
                    {
                        AllQuestions: response.data.data,
                        loaderImage: false,
                        totalPage: totalPage,
                        currentPage: 1,
                    },

                    () => {
                        if (totalPage > 1) {
                            var pages = [];
                            for (var i = 1; i <= this.state.totalPage; i++) {
                                pages.push(i);
                            }
                            this.setState({
                                questions: this.state.AllQuestions.slice(0, 10),
                                pages: pages,
                            });
                        } else {
                            this.setState({ questions: this.state.AllQuestions });
                        }
                    }
                );
                
            });
    };

    //Delete the perticular question confirmation box
    removeQuestions = (status, id) => {
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
                                    this.deleteClickQuestion(status, id);
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
    deleteClickQuestion(status, id) {
        axios
            .delete(
                sitedata.data.path + "/questionaire/Question/ankit" + id,
                commonHeaderToken()
            )
            .then((response) => {
                this.getAllQuestions();
            })
            .catch((error) => { });
    }

    onChangePage = (pageNumber) => {
        this.setState({
            questions: this.state.AllQuestions.slice(
                (pageNumber - 1) * 10,
                pageNumber * 10
            ),
            currentPage: pageNumber,
        });
    };

    render() {
        const { questions } = this.state;
        //  console.log("questions", this.state.updateTrack)
        return (
            <Grid className="homeBg">
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
                                                    <Button onClick={this.handleOpenQues}>+ New Question</Button>
                                                    <Modal
                                                        open={this.state.openQues}
                                                        onClose={this.handleCloseQues}
                                                        className="addSpeclModel">
                                                        <Grid className="addSpeclContnt">
                                                            
                                                            <Grid className="addSpeclLbl">
                                                                <Grid className="nwDiaCloseBtn">
                                                                    <a onClick={this.handleCloseQues}>
                                                                        <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                                                    </a>
                                                                </Grid>
                                                                <Grid><label>Add Questionnaire</label></Grid>
                                                            </Grid>

                                                            <Grid className="cnfrmDiaMain questionborder">
                                                                <Grid className="fillDia">

                                                                    <Grid>
                                                                        <SelectField
                                                                            isSearchable={true}
                                                                            label="Question Type"
                                                                            option={options}
                                                                            // onChange={(e) => this.updateEntryState2(e, "type")}
                                                                            onChange={(e) => this.onFieldChange1(e, "type")}
                                                                            questionArr={this.state.updateTrack.type}
                                                                        // value="Input"

                                                                        />
                                                                    </Grid>
                                                                    {this.state.openOpti && (
                                                                        <>
                                                                            <Grid>
                                                                                <VHfield
                                                                                    label="Question"
                                                                                    name="question"
                                                                                    placeholder="Enter question"
                                                                                    // onChange={(e) => this.updateEntryState1(e)}
                                                                                    onChange={(e) => this.onFieldChange2(e, 0)}
                                                                                    // value={this.state.updateTrack.question}
                                                                                    questionArr={this.state.updateTrack.question}
                                                                                />
                                                                            </Grid>

                                                                            <Grid>
                                                                                <AddHouses
                                                                                    label="Options"
                                                                                    name="options"
                                                                                    placeholder="Enter option"
                                                                                    // onChange={(e) => this.updateEntryState(e)}
                                                                                    onChange={(e) => this.onFieldChange3(e, 0)}
                                                                                    // value={this.state.updateTrack.options}
                                                                                    questionArr={this.state.updateTrack.options}
                                                                                />
                                                                            </Grid>
                                                                        </>

                                                                    )}
                                                                    {this.state.openInp && (
                                                                        <>
                                                                            <Grid>
                                                                                <VHfield
                                                                                    label="Question"
                                                                                    name="question"
                                                                                    placeholder="Enter question"
                                                                                    // onChange={(e) => this.updateEntryState1(e)}
                                                                                    onChange={(e) => this.onFieldChange2(e, 0)}
                                                                                    // value={this.state.updateTrack.question}
                                                                                    questionArr={this.state.updateTrack.question}
                                                                                />
                                                                            </Grid>
                                                                        </>
                                                                    )}
                                                                    <Grid className="infoSub1">
                                                                        <a onClick={this.handleCloseQues}><Button onClick={() => this.handleSubmit()}>Submit</Button></a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="add_a_question"><a onClick={this.onAddFiled}>+ add a question</a></Grid>
                                                        </Grid>
                                                    </Modal>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* Start of Bread Crumb */}
                                        {/* <Grid className="breadCrumbUpr">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} md={9}>
                                                    <Grid className="roomBreadCrumb medcalCntr">
                                                        <ul>
                                                            <li><a><label>General Questions</label></a></li>
                                                            <li><a><label>Speciality Questions</label></a></li>
                                                        </ul>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="settingInfo">
                                                        <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid> */}
                                        {/* End of Bread Crumb */}
                                        {/* <Grid className="cardioGrup">
                                            <Grid className="cardioGrupBtn">
                                                <Button variant="contained" className="cardioActv">Neurology</Button>
                                                <Button variant="contained">Radiology</Button>
                                                <Button variant="contained">Cardiology</Button>
                                                <Button variant="contained">Oncology</Button>
                                            </Grid>
                                        </Grid> */}

                                        {/* service price content */}
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

                                                    {this.state.questions?.length > 0 && this.state.questions.map((data) => (

                                                        <>
                                                            {//  console.log("data", data)}
                                                            <Tr>
                                                                <Td>
                                                                    <label>{data.type}</label>
                                                                </Td>
                                                                <Td>
                                                                    <label>{data.question}</label>
                                                                </Td>
                                                                <Td>{data.options}</Td>
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
                                                                                <a
                                                                                    onClick={() => {
                                                                                        this.editQuestion(data);
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
                                                                {/* <Button onclick = {(index) => {this.message(index)}}><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button> */}
                                                                {/* </Td> */}
                                                            </Tr>

                                                            /* <Tr>
                                                                <Td>
                                                                    <label>MRI</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>260,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr> */}
                                                            {/* <Tr>
                                                                <Td>
                                                                    <label>Carotid Ultrasound</label>
                                                                </Td>
                                                                <Td>90,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Angiography</label>
                                                                </Td>
                                                                <Td>120,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Electroencephalogram</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>170,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Single Photon Emission Computed Tomography (SPECT) Scan</label>
                                                                </Td>
                                                                <Td>170,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>X-ray</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>200,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>X-ray</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>200,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>CT Scan</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>240,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>MRI</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>260,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Carotid Ultrasound</label>
                                                                </Td>
                                                                <Td>90,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Angiography</label>
                                                                </Td>
                                                                <Td>120,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Electroencephalogram</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>170,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Single Photon Emission Computed Tomography (SPECT) Scan</label>
                                                                </Td>
                                                                <Td>170,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>X-ray</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>200,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr> */}

                                                        </>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                            {/* <Grid className="dataPagination">
                                                <Grid container direction="row">
                                                    <Grid item xs={6} md={6}>
                                                        <Grid className="dataPaginationLft"><p>25 of 36</p></Grid>
                                                    </Grid>
                                                    <Grid item xs={6} md={6}>
                                                        <Grid className="dataPaginationRght">
                                                            <p><a>Previous</a><span>1</span><span>2</span><span>3</span><a>Next</a></p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid> */}
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
                    </Grid>
                </Grid>
            </Grid >
        );
    }
}
export default Index