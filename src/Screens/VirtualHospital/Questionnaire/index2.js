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
            AllQuestions: [],
            questions: [],
            option: this.props.option,
            openOpti: false,
            opeInp: false,
            updateTrack: {},
            myQuestions: []
        }
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
    updateEntryState = (e, type) => {
        var state = this.state.updateTrack;
        state[type] = e.value;
        this.setState({ updateTrack: state });
        if (e.value == "input") {
            this.setState({ openInp: true, openOpti: false });
        }
        else if (e.value == "options") {
            this.setState({ openOpti: true, openInp: false });
        }
    }

    //for adding/updating the questions
    updateEntryState1 = (e) => {
        const state = this.state.updateTrack;
        state["questions"] = e.target.value;
        this.setState({ updateTrack: state });
    };

    // questions
    // const myQAUETION = this.state.questions
    // myQAUETION.push(this.state.updateTrack)
    // this.setState({questions : myQAUETION, updateTrack: {}})

    //for adding/updating the option
    updateEntryState2 = (array) => {
        const state = this.state.updateTrack;
        state["options"] = array;
        this.setState({ updateTrack: state });
    };

    handleSubmit = () => {
        const myQuestions = [...this.state.myQuestions];
        myQuestions.push(
            this.state.updateTrack
        );
        this.setState({
            myQuestions,
            type: '',
            question: '',
            options: ''
        });
        // console.log("myQuestion", myQuestions)
    };





    render() {
        const { questions } = this.state;
        // console.log("questions", this.state.updateTrack)
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

                                                            {console.log('this.state.myQ', this.state.myQuestions)}


                                                            {this.state.myQuestions && this.state.myQuestions.length == 0 && (
                                                                <Grid className="cnfrmDiaMain questionborder">
                                                                    <Grid className="fillDia">

                                                                        <Grid>
                                                                            <SelectField
                                                                                isSearchable={true}
                                                                                label="Question Type"
                                                                                option={options}
                                                                                onChange={(e) => this.updateEntryState(e, "type")}

                                                                            />
                                                                        </Grid>
                                                                        {this.state.openOpti && (
                                                                            <>
                                                                                <Grid>
                                                                                    <VHfield
                                                                                        label="Question"
                                                                                        name="question"
                                                                                        placeholder="Enter question"
                                                                                        onChange={(e) => this.updateEntryState1(e)}
                                                                                        value={this.state.updateTrack.question}
                                                                                    />
                                                                                </Grid>

                                                                                <Grid>
                                                                                    <AddHouses
                                                                                        label="Options"
                                                                                        name="options"
                                                                                        placeholder="Enter option"
                                                                                        onChange={(e) => this.updateEntryState2(e, "options")}
                                                                                        value={this.state.updateTrack.options}
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
                                                                                        onChange={(e) => this.updateEntryState1(e, "question")}
                                                                                        value={this.state.updateTrack.question}

                                                                                    />
                                                                                </Grid>
                                                                            </>
                                                                        )}
                                                                        <Grid className="infoSub1">
                                                                            <a onClick={this.handleCloseQues}><Button onClick={() => this.handleSubmit()}>Submit</Button></a>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            )}



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

                                                    {this.state.myQuestions?.length > 0 && this.state.myQuestions.map((data) => (

                                                        <>
                                                            {console.log("data", data)}
                                                            <Tr>
                                                                <Td>
                                                                    <label>{data.type}</label>
                                                                </Td>
                                                                <Td>
                                                                    <label>{data.questions}</label>
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
                                            {/* <Grid className="tablePagNum">
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
                                            </Grid> */}
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