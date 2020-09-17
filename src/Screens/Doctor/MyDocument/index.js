import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import LeftMenu from './../../Components/Menus/DoctorLeftMenu/index';

function TabContainer(props) {
    return (
        <Typography component="div" className="tabsCntnts">
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
            openPrescp: false,
            openReject: false,
            specialistOption: null,
            value: 0,
        };
    }

    handleSpecialist = specialistOption => {
        this.setState({ specialistOption });
        //console.log(`Option selected:`, specialistOption);
    };

    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    handleOpenPrescp = () => {
        this.setState({ openPrescp: true });
    };
    handleClosePrescp = () => {
        this.setState({ openPrescp: false });
    };

    handleOpenReject = () => {
        this.setState({ openReject: true });
    };
    handleCloseReject = () => {
        this.setState({ openReject: false });
    };

    render() {
        const { specialistOption } = this.state;
        const { value } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <LeftMenu currentPage="documents" />
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={9}>

                                    <Grid className="docsOpinion">

                                        <Grid container direction="row" className="docsOpinLbl">
                                            <Grid item xs={12} md={12}><label>Inquiries</label></Grid>
                                        </Grid>

                                        <Grid className="presPkgIner1">
                                            {/* Tabs  */}
                                            <AppBar position="static" className="presTabsUpr">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={8}>
                                                        <Tabs value={value} onChange={this.handleChangeTabs} className="presTabs">
                                                            <Tab label="Prescriptions" className="presTabsIner" />
                                                            <Tab label="Sick Certificates" className="presTabsIner" />
                                                            <Tab label="Second Opinions" className="presTabsIner" />
                                                        </Tabs>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} className="presSrch">
                                                        <a><img src={require('../../../assets/images/search-entries.svg')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </AppBar>
                                        </Grid>

                                        <Grid className="presPkgIner2">

                                            {value === 0 && <TabContainer>

                                                <Grid className="presOpinionIner">
                                                    <Table>
                                                        <Thead>
                                                            <Tr>
                                                                <Th>Medicine</Th>
                                                                <Th>Received on</Th>
                                                                <Th>Patient</Th>
                                                                <Th>Status</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            <Tr>
                                                                <Td>Metoprolol</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwYelow"></span>Pending</Td>
                                                                <Td className="presEditDot">
                                                                    <img src={require('../../../assets/images/threedots.jpg')} onClick={this.handleOpenPrescp} alt="" title="" />
                                                                </Td>
                                                            </Tr>

                                                            {/* Model setup */}
                                                            <Modal
                                                                open={this.state.openPrescp}
                                                                onClose={this.handleClosePrescp}
                                                                className="prespBoxModel">
                                                                <Grid className="prespBoxCntnt">
                                                                    <Grid className="prespCourse">
                                                                        <Grid className="prespCloseBtn">
                                                                            <a onClick={this.handleClosePrescp}>
                                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                                            </a>
                                                                        </Grid>
                                                                        <p>Prescription Inquiry</p>
                                                                        <Grid><label>James Morrison</label></Grid>
                                                                    </Grid>
                                                                    <Grid className="detailPrescp">

                                                                        <Grid className="stndQues">
                                                                            <Grid><span>Standard questions</span></Grid>
                                                                            <Grid>
                                                                                <Grid><label>Is this a follow-up prescription?</label></Grid>
                                                                                <p>Yes</p>
                                                                                <Grid><label>How would you like to receive the prescription?</label></Grid>
                                                                                <p>Online</p>
                                                                                <Grid><label>Are you currently abroad?</label></Grid>
                                                                                <p>No</p>
                                                                            </Grid>
                                                                        </Grid>

                                                                        <Grid className="stndQues">
                                                                            <Grid><span>Medicine inquiry</span></Grid>
                                                                            <Grid>
                                                                                <Grid><label>Medicine / Substance</label></Grid>
                                                                                <p>Metropolol</p>
                                                                                <Grid><label>Dose</label></Grid>
                                                                                <p>32 mg</p>
                                                                                <Grid><label>Trade name</label></Grid>
                                                                                <p>Unknown</p>
                                                                                <Grid><label>ATC code if applicable</label></Grid>
                                                                                <p>/</p>
                                                                                <Grid><label>Manufacturer</label></Grid>
                                                                                <p>Medicine Company GmbH</p>
                                                                                <Grid><label>Pack size</label></Grid>
                                                                                <p>30</p>
                                                                                <Grid><label>Annotations / details / questions</label></Grid>
                                                                                <p>I need this because I can’t sleep at night..</p>
                                                                            </Grid>
                                                                        </Grid>

                                                                        <Grid className="stndQues">
                                                                            <Grid><span>Patients Health Status</span></Grid>
                                                                            <Grid>
                                                                                <Grid><label>Medications</label></Grid>
                                                                                <p>No medications</p>
                                                                                <Grid><label>Allergies</label></Grid>
                                                                                <p>Strawberries <br /> Peanuts</p>
                                                                                <Grid><label>Diagnoses</label></Grid>
                                                                                <p>Depression</p>
                                                                            </Grid>
                                                                        </Grid>

                                                                        <Grid className="scamUPForms scamUPImg">
                                                                            <Grid><label>Upload scanned prescription</label></Grid>
                                                                            <Grid className="scamUPInput">
                                                                                <a><img src={require('../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                                                                <a>Browse <input type="file" /></a> or drag here
                                                                            </Grid>
                                                                            <p>Supported file types: .jpg, .png, .pdf</p>
                                                                        </Grid>

                                                                        <Grid container direction="row">
                                                                            <Grid item xs={6} md={6}>
                                                                                <input type="button" value="Approve" className="approvBtn" />
                                                                            </Grid>
                                                                            <Grid item xs={6} md={6}>
                                                                                <input type="button" value="Reject" onClick={this.handleOpenReject} className="rejectBtn" />
                                                                            </Grid>
                                                                        </Grid>

                                                                    </Grid>
                                                                </Grid>
                                                            </Modal>
                                                            {/* End of Model setup */}

                                                            {/* Reject Model setup */}
                                                            <Modal
                                                                open={this.state.openReject}
                                                                onClose={this.handleCloseReject}>
                                                                <Grid className="rejectBoxCntnt">
                                                                    <Grid className="rejectCourse">
                                                                        <Grid className="rejectCloseBtn">
                                                                            <a onClick={this.handleCloseReject}>
                                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                                            </a>
                                                                        </Grid>
                                                                        <p onClick={this.handleCloseReject}>Back</p>
                                                                        <Grid><label>James Morrison</label></Grid>
                                                                    </Grid>
                                                                    <Grid className="shrtRejctMsg">
                                                                        <Grid><label>Short message</label></Grid>
                                                                        <Grid><textarea></textarea></Grid>
                                                                        <Grid><input type="submit" value="Reject" /></Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Modal>
                                                            {/* End of Reject Model setup */}

                                                            <Tr>
                                                                <Td>Lekadol</Td>
                                                                <Td>09/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwYelow"></span>Pending</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Lekadol</Td>
                                                                <Td>09/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwGry"></span>Sent request</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Temperature and headaches</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwGry"></span>Pending</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Temperature and headaches</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwGren"></span>Answered</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Temperature and headaches</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwGren"></span>Answered</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Lekadol</Td>
                                                                <Td>09/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwGry"></span>Sent request</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Temperature and headaches</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwGren"></span>Answered</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Temperature and headaches</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwGren"></span>Answered</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Temperature and headaches</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwGren"></span>Answered</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                        </Tbody>
                                                    </Table>

                                                    <Grid className="tablePagNum">
                                                        <Grid container direction="row">
                                                            <Grid item xs={6} md={6}>
                                                                <Grid className="totalOutOff">
                                                                    <a>25 of 36</a>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={6} md={6}>
                                                                <Grid className="prevNxtpag">
                                                                    <a className="prevpag">Previous</a>
                                                                    <a className="frstpag">1</a>
                                                                    <a>2</a>
                                                                    <a>3</a>
                                                                    <a className="nxtpag">Next</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            </TabContainer>}

                                            {value === 1 && <TabContainer>

                                                <Grid className="presOpinionIner">
                                                    <Table>
                                                        <Thead>
                                                            <Tr>
                                                                <Th>Case</Th>
                                                                <Th>Sent on</Th>
                                                                <Th>Doctor</Th>
                                                                <Th>Status</Th>
                                                            </Tr>
                                                        </Thead>

                                                        <Tbody>
                                                            <Tr>
                                                                <Td>Temperature and headaches</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span class="revwGry"></span>Sent request</Td>
                                                                <Td className="presEditDot" onClick={this.handleaddSick}><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Twisted ankle</Td>
                                                                <Td>09/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span className="revwYelow"></span>Pending</Td>
                                                                <Td className="presEditDot" onClick={this.handleaddSick}><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Temperature and headaches</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span class="revwGren"></span>Approved</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Twisted ankle</Td>
                                                                <Td>09/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span class="revwGren"></span>Approved</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Temperature and headaches</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span class="revwRed"></span>Rejected</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Twisted ankle</Td>
                                                                <Td>09/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span class="revwGren"></span>Approved</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Temperature and headaches</Td>
                                                                <Td>16/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span class="revwGren"></span>Approved</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Twisted ankle</Td>
                                                                <Td>09/03/2020</Td>
                                                                <Td className="presImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                                <Td><span class="revwGren"></span>Approved</Td>
                                                                <Td className="presEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                            </Tr>
                                                        </Tbody>
                                                    </Table>
                                                    <Grid className="tablePagNum">
                                                        <Grid container direction="row">
                                                            <Grid item xs={12} md={12}>
                                                                <Grid className="totalOutOff">
                                                                    <a>8 of 8</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </TabContainer>}

                                            {value === 2 && <TabContainer>

                                            </TabContainer>}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default Index