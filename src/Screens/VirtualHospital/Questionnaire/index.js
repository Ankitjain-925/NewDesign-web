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
            openOpti: false,
            opeInp: false,
            house_name: '',
            house_id: '',
            question: '',
            options: '',
            type: '',
            myQuestions: [{}],
            option: this.props.option,
            questions_data: [],
            AllQuestions: []
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

    //for choosing select field value 
    updateEntryState = (e, index) => {
        console.log("e", e)
        var QuesAy = this.state.myQuestions;
        QuesAy[index]['type'] = e.value;
        this.setState({ myQuestions: QuesAy }, () => {
        });
        if (e.value == "input") {
            this.setState({ openInp: true, openOpti: false });
        }
        else if (e.value == "options") {
            this.setState({ openOpti: true, openInp: false });
        }
    }

    //for adding/updating the questions
    updateEntryState1 = (e, index) => {
        var QuesAy = this.state.myQuestions;
        QuesAy[index][e.target.name] = e.target.value;
        console.log("QuesAy", QuesAy)
        this.setState({ myQuestions: QuesAy }, () => {
        });
    }

    //for adding/updating the option
    updateEntryState2 = (array, index) => {
        var QuesAy = this.state.myQuestions;
        QuesAy[index]["options"] = array;
        this.setState({ myQuestions: QuesAy }, () => {
        });
    };

    // Add multiiple select fields
    onAddFiled = () => {
        let QuesAy = this.state.myQuestions;
        QuesAy.push({ type: "" });
        this.setState({ myQuestions: QuesAy });
    };

    deleteQuestions = (index) => {
        var QuesAy = this.state.myQuestions?.length > 0 && this.state.myQuestions.filter((data, index1) => index1 !== index);
        this.setState({ myQuestions: QuesAy });
    };

    handleSubmit = () => {
        console.log("myQuestions", this.state.myQuestions);
        axios
            .post(
                sitedata.data.path + "/questionaire/AddQuestionaire",
                {
                    house_id: "600c15c2c983431790f904c3-1627046889451",
                    house_name: "House-2",
                    questions: this.state.myQuestions
                },
                commonHeaderToken()
            )
            .then((responce) => {
                this.getAllQuestions();
            })
            .catch(function (error) {
                console.log(error);
            });
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

    // For changing pages
    onChangePage = (pageNumber) => {
        this.setState({
            questions_data: this.state.AllQuestions.slice(
                (pageNumber - 1) * 10,
                pageNumber * 10
            ),
            currentPage: pageNumber,
        });
    };

    render() {
        const { questions_data } = this.state;
        console.log("questions", questions_data);
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
                                                            {this.state.myQuestions && this.state.myQuestions.length == 1 && (
                                                                <Grid>
                                                                    <Grid className="cnfrmDiaMain questionborder">
                                                                        <Grid className="fillDia">

                                                                            <Grid>
                                                                                <SelectField
                                                                                    isSearchable={true}
                                                                                    name="type"
                                                                                    label="Question Type"
                                                                                    option={options}
                                                                                    onChange={(e) => this.updateEntryState(e, 0)}
                                                                                    value={this.state.myQuestions[1]?.type}
                                                                                />
                                                                            </Grid>
                                                                            {this.state.openOpti && (
                                                                                <>
                                                                                    <Grid>
                                                                                        <VHfield
                                                                                            label="Question"
                                                                                            name="question"
                                                                                            placeholder="Enter question"
                                                                                            onChange={(e) => this.updateEntryState1(e, 0)}
                                                                                            value={this.state.myQuestions[0]?.question}
                                                                                        />
                                                                                    </Grid>

                                                                                    <Grid>
                                                                                        <AddHouses
                                                                                            label="Options"
                                                                                            name="options"
                                                                                            placeholder="Enter option"
                                                                                            onChange={(e) => this.updateEntryState2(e, 0)}
                                                                                            value={this.state.myQuestions[0]?.options}
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
                                                                                            onChange={(e) => this.updateEntryState1(e, 0)}
                                                                                            value={this.state.myQuestions[0]?.question}
                                                                                        />
                                                                                    </Grid>
                                                                                </>
                                                                            )}
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="add_a_question"><a onClick={this.onAddFiled}>+ add a question</a></Grid>
                                                                </Grid>
                                                            )}

                                                            {this.state.myQuestions && this.state.myQuestions.length > 1 && this.state.myQuestions.map((data, index) => index == 0 ? (
                                                                <Grid>
                                                                    <Grid className="cnfrmDiaMain questionborder">
                                                                        <Grid className="fillDia">

                                                                            <Grid>
                                                                                <SelectField
                                                                                    isSearchable={true}
                                                                                    name="type"
                                                                                    label="Question Type"
                                                                                    option={options}
                                                                                    onChange={(e) => this.updateEntryState(e, index)}
                                                                                    value={data.type}
                                                                                />
                                                                            </Grid>
                                                                            {this.state.openOpti && (
                                                                                <>
                                                                                    <Grid>
                                                                                        <VHfield
                                                                                            label="Question"
                                                                                            name="question"
                                                                                            placeholder="Enter question"
                                                                                            onChange={(e) => this.updateEntryState1(e, index)}
                                                                                            value={data.question}
                                                                                        />
                                                                                    </Grid>

                                                                                    <Grid>
                                                                                        <AddHouses
                                                                                            label="Options"
                                                                                            name="options"
                                                                                            placeholder="Enter option"
                                                                                            onChange={(e) => this.updateEntryState2(e, index)}
                                                                                            value={data.options}
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
                                                                                            onChange={(e) => this.updateEntryState1(e, index)}
                                                                                            value={data.question}
                                                                                        />
                                                                                    </Grid>
                                                                                </>
                                                                            )}
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="add_a_question"><a onClick={this.onAddFiled}>+ add a question</a></Grid>
                                                                </Grid>
                                                            ) :
                                                                (
                                                                    <Grid>
                                                                        <Grid className="cnfrmDiaMain questionborder">
                                                                            <Grid className="fillDia">

                                                                                <Grid>
                                                                                    <SelectField
                                                                                        isSearchable={true}
                                                                                        name="type"
                                                                                        label="Question Type"
                                                                                        option={options}
                                                                                        onChange={(e) => this.updateEntryState(e, index)}
                                                                                        value={data.type}
                                                                                    />
                                                                                </Grid>
                                                                                {this.state.openOpti && (
                                                                                    <>
                                                                                        <Grid>
                                                                                            <VHfield
                                                                                                label="Question"
                                                                                                name="question"
                                                                                                placeholder="Enter question"
                                                                                                onChange={(e) => this.updateEntryState1(e, index)}
                                                                                                value={data.question}
                                                                                            />
                                                                                        </Grid>

                                                                                        <Grid>
                                                                                            <AddHouses
                                                                                                label="Options"
                                                                                                name="options"
                                                                                                placeholder="Enter option"
                                                                                                onChange={(e) => this.updateEntryState2(e, index)}
                                                                                                value={data.options}
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
                                                                                                onChange={(e) => this.updateEntryState1(e, index)}
                                                                                                value={data.question}
                                                                                            />
                                                                                        </Grid>
                                                                                    </>
                                                                                )}
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid className="remove_a_question"><a onClick={() => this.deleteQuestions(index)}>- remove question</a></Grid>
                                                                    </Grid>
                                                                ))}
                                                            <Grid className="infoSub1">
                                                                <a onClick={this.handleCloseQues}><Button onClick={() => this.handleSubmit()}>Submit</Button></a>
                                                            </Grid>
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

                                                    {questions_data?.length > 0 && questions_data.map((data, index) => (

                                                        <>
                                                            {console.log("data", data)}
                                                            {console.log("datatype", data.type)}
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
                    </Grid>
                </Grid>
            </Grid >
        );
    }
}
export default Index