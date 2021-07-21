import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Assigned from "Screens/Components/VirtualHospitalComponents/Assigned/index";
import FlowPatientView from "Screens/Components/VirtualHospitalComponents/FlowPatientView/index";
import CommentsView from "Screens/Components/VirtualHospitalComponents/CommentsView/index";
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';

var new_data = [
    'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
    'https://images.unsplash.com/photo-1626634913593-e5b88fd85627?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1626649216179-938ba30eca07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1626619633396-1769230c1342?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
]


var allcomments = [{
    comments_data: [{
        url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
        text: "thirdone try comment",
        comment_by: "D_1Q1J4SSCm",
        comment_id: "60ae03a79d9ebe17f0a92858_D_1Q1J4SSCm_1622636888816"
    }]
}]
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
            openRvw: false,
            tabvalue: 0,
            tabvalue2: 0
        };
    }
    handleOpenRvw = () => {
        this.setState({ openRvw: true });
    }
    handleCloseRvw = () => {
        this.setState({ openRvw: false });
    }
    handleChangeTab = (event, tabvalue) => {
        this.setState({ tabvalue });
    };
    handleChangeTab2 = (event, tabvalue2) => {
        this.setState({ tabvalue2 });
    };
    render() {
        const { tabvalue, tabvalue2 } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            <LeftMenuMobile isNotShow={true} currentPage="chat" />
                            <Grid container direction="row">
                                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}


                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="chat" />
                                </Grid>
                                {/* End of Menu */}
                                {/* Start of Right Section */}
                                <Grid item xs={12} md={11}>
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={2} className="tskOverWeb">
                                            <Grid className="tskOverView">
                                                <h1>Tasks overview</h1>
                                                <Grid className="taskNum taskYelow">
                                                    <label><span></span>Open</label>
                                                    <p>13</p>
                                                </Grid>
                                                <Grid className="taskNum taskGren">
                                                    <label><span></span>Done today</label>
                                                    <p>63</p>
                                                </Grid>
                                                <Grid className="taskNum taskYelow">
                                                    <label><span></span>Open</label>
                                                    <p>13</p>
                                                </Grid>
                                                <Grid className="taskNum taskGren">
                                                    <label><span></span>Done today</label>
                                                    <p>63</p>
                                                </Grid>
                                                <Grid className="showArchiv"><p><a>Show archived tasks</a></p></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={10}>
                                            <Grid className="topLeftSpc taskViewMob">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6}>
                                                        <AppBar position="static" className="taskTabs">
                                                            <Tabs value={tabvalue} onChange={this.handleChangeTab}>
                                                                <Tab label="My Tasks" className="taskTabsIner" />
                                                                <Tab label="All Tasks" className="taskTabsIner" />
                                                                <Tab label="Tasks overview" className="taskTabsIner taskTabsMob" />
                                                            </Tabs>
                                                        </AppBar>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Grid className="addTaskBtn">
                                                            <Button onClick={this.handleOpenRvw}>+ Add Task</Button>
                                                        </Grid>
                                                    </Grid>
                                                    {/* Model setup */}
                                                    <Modal open={this.state.openRvw} onClose={this.handleCloseRvw}>
                                                        <Grid className="rvewFiles">
                                                            <Grid className="rvewFilesinner">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid className="rvwCadio">
                                                                            <Button>Cardiology</Button><h3>Review patient files</h3><p>07/02/2021, 9:03 AM</p>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid container direction="row">
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid className="asignUpr">
                                                                            <Grid className="asignLft">


                                                                                <Assigned
                                                                                    totalurl={new_data}
                                                                                />






                                                                                {/* <Grid><label>Assigned to</label></Grid>
                                                                                <Grid>
                                                                                    <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                                                    <a><img src={require('assets/virtual_images/dr2.jpg')} alt="" title="" /></a>
                                                                                    <a>+1</a>
                                                                                </Grid> */}
                                                                            </Grid>
                                                                            {/* <Grid className="asignRghtUpr">
                                                                                <Grid><label>Patient</label></Grid>
                                                                                <Grid className="asignRght">
                                                                                    <Grid><a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a></Grid>
                                                                                    <Grid><span>Benito Noboa</span><p>P_ukd832kd2</p></Grid>
                                                                                </Grid>
                                                                            </Grid> */}

                                                                            < FlowPatientView
                                                                                label="Patient"
                                                                                url='https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
                                                                                first_name="Benito"
                                                                                last_name="Noboa"
                                                                                profile_id="P_ukd832kd2"
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="makeCmpt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={6} md={6}>
                                                                            <Grid className="markDone">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <label>Mark as done</label>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={6}>
                                                                            <Grid className="addDue">
                                                                                <Grid><label>Due on</label></Grid>
                                                                                <Grid><Button className="addDueDate">09/02/2021</Button><Button>Add time</Button></Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="multiDescp">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={12} md={12}>
                                                                            <Grid><label>Description</label>
                                                                                <p>Multiple lesions again suggest chronic demyelination. Mild atrophy greatest in the frontal region
                                                                                    may be associated with multiple sclerosis. Findings appear stable when compared with the prior study.
                                                                                    There is no abnormal enhancement.</p>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="assignSecUpr">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={12} md={12}>
                                                                            <Grid className="assignSec">
                                                                                <Grid>
                                                                                    <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                    <label>+ Assign to</label>
                                                                                </Grid>
                                                                                <Grid>
                                                                                    <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                    <label>Duplicate</label>
                                                                                </Grid>
                                                                                <Grid>
                                                                                    <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                    <label>Archive</label>
                                                                                </Grid>
                                                                                <Grid>
                                                                                    <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                    <label>Delete</label>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="assignSecUpr">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={12} md={12}>
                                                                            <Grid className="attchFile">
                                                                                <Grid><label>Attachments</label></Grid>
                                                                                <Grid className="browseHere">
                                                                                    <a><img src={require('assets/virtual_images/upload-file.svg')} alt="" title="" />
                                                                                        <span>Browse</span> or drag here
                                                                                    </a>
                                                                                </Grid>
                                                                                <p>Supported file types: .jpg, .png, .pdf</p>
                                                                            </Grid>
                                                                            <Grid className="updateDoc">
                                                                                <Grid><label>Uploaded</label></Grid>
                                                                                <Grid className="updateInfo">
                                                                                    <Grid className="updateImg"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Grid>
                                                                                    <p>IMG_23_6_2020_09_18.jpg</p>
                                                                                    <a className="updateRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></a>
                                                                                </Grid>
                                                                                <Grid className="updateInfo">
                                                                                    <Grid className="updateImg"><img src={require('assets/virtual_images/pdfimg.png')} alt="" title="" /></Grid>
                                                                                    <p>IMG_23_6_2020_09_18.jpg</p>
                                                                                    <a className="updateRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></a>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>



                                                                <Grid className="cmntUpr">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={12} md={12}>
                                                                            <Grid className="cmntIner">
                                                                                <Grid><label>Comments</label></Grid>

                                                                                {allcomments?.length > 0 && allcomments.map((data) => (
                                                                                    <>
                                                                                        {data?.comments_data?.length > 0 && data?.comments_data?.map((data1) => (
                                                                                            < CommentsView
                                                                                                label={data1.comment_by}
                                                                                                text={data1.text}
                                                                                                url={data1.url}
                                                                                            />
                                                                                        ))}
                                                                                    </>
                                                                                ))}

                                                                                {/* <Grid className="cmntMsgs">
                                                                                    <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                                                    <Grid>
                                                                                        <Grid><label>Mark Anderson M.D.</label><span>7 Feb at 12:38</span></Grid>
                                                                                        <Grid className="cmntMsgsCntnt"><p>I’m leaving a short comment right here</p></Grid>
                                                                                        <Grid><Button>Edit</Button><Button>Delete</Button></Grid>
                                                                                    </Grid>
                                                                                </Grid> */}
                                                                            </Grid>
                                                                            <Grid className="cmntIner cmntInerBrdr">
                                                                                <Grid className="cmntMsgs">
                                                                                    <Grid><img src={require('assets/virtual_images/dr2.jpg')} alt="" title="" /></Grid>
                                                                                    <Grid>
                                                                                        <Grid><label>Gregory House M.D.</label><span>7 Feb at 12:38</span></Grid>
                                                                                        <Grid className="cmntMsgsCntnt"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                                                                                            galley of type and scrambled it to make a type specimen book.</p></Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="addComit">
                                                                                <textarea>When I started typing the “Add Comment” button showed up.</textarea>
                                                                                <Button>Add Comment</Button>
                                                                            </Grid>
                                                                            <Grid className="saveTask">
                                                                                <Button>Save Task & Close</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Modal>
                                                    {/* End of Model setup */}
                                                </Grid>
                                                <Grid className="taskDetailMob">
                                                    {tabvalue === 0 && <TabContainer>
                                                        <Grid className="taskCntntMng">
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} sm={8} md={8}>
                                                                    <AppBar position="static" className="billTabs">
                                                                        <Tabs value={tabvalue2} onChange={this.handleChangeTab2}>
                                                                            <Tab label="ALL" className="billtabIner" />
                                                                            <Tab label="Done" className="billtabIner" />
                                                                            <Tab label="Open" className="billtabIner" />
                                                                        </Tabs>
                                                                    </AppBar>
                                                                </Grid>
                                                                <Grid item xs={4} sm={4} md={4}>
                                                                    <Grid className="taskSort">
                                                                        <a><img src={require('assets/virtual_images/sort.png')} alt="" title="" /></a>
                                                                        <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        {tabvalue2 === 0 && <TabContainer>
                                                            <Grid className="allInerTabs">
                                                                <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/greyImg.jpg')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght cardioColor">
                                                                                    <Grid><Button>Cardiology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="allInfo">
                                                                                <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid>
                                                                                <Grid className="allInfoRght">
                                                                                    <Grid><label>Benito Noboa</label></Grid>
                                                                                    <p>P_ukd832kd2</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght NeuroColor">
                                                                                    <Grid><Button>Neurology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght radiologyColor">
                                                                                    <Grid><Button>Radiology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="allInfo">
                                                                                <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid>
                                                                                <Grid className="allInfoRght">
                                                                                    <Grid><label>Benito Noboa</label></Grid>
                                                                                    <p>P_ukd832kd2</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght OncologyColor">
                                                                                    <Grid><Button>Oncology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="allInfo">
                                                                                <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid>
                                                                                <Grid className="allInfoRght">
                                                                                    <Grid><label>Benito Noboa</label></Grid>
                                                                                    <p>P_ukd832kd2</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght cardioColor">
                                                                                    <Grid><Button>Cardiology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="allInfo">
                                                                                <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid>
                                                                                <Grid className="allInfoRght">
                                                                                    <Grid><label>Benito Noboa</label></Grid>
                                                                                    <p>P_ukd832kd2</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght cardioColor">
                                                                                    <Grid><Button>Cardiology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="allInfo">
                                                                                <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid>
                                                                                <Grid className="allInfoRght">
                                                                                    <Grid><label>Benito Noboa</label></Grid>
                                                                                    <p>P_ukd832kd2</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </TabContainer>}
                                                        {tabvalue2 === 1 && <TabContainer>
                                                            Done tab content
                                                        </TabContainer>}
                                                        {tabvalue2 === 2 && <TabContainer>
                                                            Open tab content
                                                        </TabContainer>}
                                                    </TabContainer>}
                                                    {tabvalue === 1 && <TabContainer>
                                                        All Tasks
                                                    </TabContainer>}
                                                    {tabvalue === 2 && <TabContainer>
                                                        <Grid className="tskOverView tskOverMob">
                                                            <Grid className="taskNum taskYelow">
                                                                <label><span></span>Open</label>
                                                                <p>13</p>
                                                            </Grid>
                                                            <Grid className="taskNum taskGren">
                                                                <label><span></span>Done today</label>
                                                                <p>63</p>
                                                            </Grid>
                                                            <Grid className="taskNum taskYelow">
                                                                <label><span></span>Open</label>
                                                                <p>13</p>
                                                            </Grid>
                                                            <Grid className="taskNum taskGren">
                                                                <label><span></span>Done today</label>
                                                                <p>63</p>
                                                            </Grid>
                                                            <Grid className="showArchiv"><p><a>Show archived tasks</a></p></Grid>
                                                        </Grid>
                                                    </TabContainer>}
                                                </Grid>
                                            </Grid>
                                        </Grid>
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