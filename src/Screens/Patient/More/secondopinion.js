import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';

const specialistOptions = [
    { value: 'Specialist1', label: 'Specialist1' },
    { value: 'Specialist2', label: 'Specialist2' },
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addSecond: false,
            specialistOption: null,
        };
    }

    // fancybox open
    handleaddSecond = () => {
        this.setState({ addSecond: true });
    };
    handleCloseDash = () => {
        this.setState({ addSecond: false });
    };

    handleSpecialist = specialistOption => {
        this.setState({ specialistOption });
        //console.log(`Option selected:`, specialistOption);
    };

    render() {
        const { specialistOption } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <LeftMenu currentPage ="more"/>
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={8}>
                                    <Grid className="scndOpinion">
                                        <Grid container direction="row" className="ScndOpinLbl">
                                            <Grid item xs={12} md={6}><label>Second Opinions</label></Grid>
                                            <Grid item xs={12} md={6} className="ScndOpinRght">
                                                <a onClick={this.handleaddSecond}>+ New Second Opinion</a>
                                            </Grid>
                                        </Grid>

                                        {/* Model setup */}
                                        <Modal
                                            open={this.state.addSecond}
                                            onClose={this.handleCloseDash}
                                            className="opinBoxModel">
                                            <Grid className="opinBoxCntnt">
                                                <Grid className="opinBoxCntntIner">
                                                    <Grid className="opinCourse">
                                                        <Grid className="opinCloseBtn">
                                                            <a onClick={this.handleCloseDash}>
                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <p>New inquiry</p>
                                                        <Grid><label>Second Opinion</label></Grid>
                                                    </Grid>
                                                    <Grid className="shrHlthMain">
                                                        <Grid className="shrHlth">
                                                            <h2>Share health status</h2>
                                                            <Grid className="shrHlthChk">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            value="checkedB"
                                                                            color="#00ABAF"
                                                                        />
                                                                    }
                                                                    label="Share journal health status with Doctor"
                                                                />
                                                            </Grid>
                                                            <p>This will share your health status info from your journal,
                                                               as this is needed for the doctor to be able to approve your prescription request.</p>
                                                            <p>See list of shared information <a><img src={require('../../../assets/images/Info.svg')} alt="" title="" /></a></p>
                                                        </Grid>
                                                        <Grid className="stndrdQues">
                                                            <h3>Specialist and standard questions</h3>
                                                            <Grid className="splestQues">
                                                                <Grid><label>Specialist</label></Grid>
                                                                <Grid>
                                                                    <Select
                                                                        value={specialistOption}
                                                                        onChange={this.handleSpecialist}
                                                                        options={specialistOptions}
                                                                        placeholder="Select"
                                                                        isSearchable={false}
                                                                        isMulti={false}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="recevPrescp">
                                                                <Grid className="recevPrescpLbl"><label>How would you like to receive the prescription?</label></Grid>
                                                                <Grid className="recevPrescpChk">
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox value="checkedB" color="#00ABAF" />
                                                                        }
                                                                        label="Online"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox value="checkedB" color="#00ABAF"
                                                                            />
                                                                        }
                                                                        label="Home address mailbox"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="yrProfes">
                                                                <Grid><label>Your profession</label></Grid>
                                                                <Grid><input type="text" /></Grid>
                                                            </Grid>
                                                            <Grid className="yrProfes">
                                                                <Grid><label>Annotations / details / questions</label></Grid>
                                                                <Grid><textarea></textarea></Grid>
                                                            </Grid>
                                                            <Grid className="attchForms attchImg">
                                                                <Grid><label>Attachments</label></Grid>
                                                                <Grid className="attchbrowsInput">
                                                                    <a><img src={require('../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                                                    <a>Browse <input type="file" /></a> or drag here
                                                                </Grid>
                                                                <p>Supported file types: .jpg, .png, .pdf</p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="infoShwHidBrdr"></Grid>
                                                    <Grid className="infoShwHidIner">
                                                        <Grid className="infoShwHidMain">
                                                            <Grid container direction="row" justify="center" alignItems="center">
                                                                <Grid item xs={6} md={6}>
                                                                    <Grid className="infoShwHid">
                                                                        <a>Show or Hide <img src={require('../../../assets/images/Info.svg')} alt="" title="" /></a>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={6} md={6} className="editShwHid">
                                                                    <a>Edit</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="infoShwSave">
                                                            <input type="submit" value="Save entry" />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of Model setup */}


                                        <Grid className="scndOpinionIner">
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>About</Th>
                                                        <Th>Sent on</Th>
                                                        <Th>Doctor</Th>
                                                        <Th>Status</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr>
                                                        <Td>Damaged spine</Td>
                                                        <Td>16/03/2020</Td>
                                                        <Td className="drImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                        <Td><span className="revwYelow"></span>Reviewing</Td>
                                                        <Td className="drEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>Daily headaches</Td>
                                                        <Td>09/03/2020</Td>
                                                        <Td className="drImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                        <Td><span className="revwGry"></span>Sent request</Td>
                                                        <Td className="drEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>Temperature and headaches</Td>
                                                        <Td>16/03/2020</Td>
                                                        <Td className="drImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                        <Td><span className="revwGren"></span>Answered</Td>
                                                        <Td className="drEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>Temperature and headaches</Td>
                                                        <Td>16/03/2020</Td>
                                                        <Td className="drImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                        <Td><span className="revwGren"></span>Answered</Td>
                                                        <Td className="drEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>Temperature and headaches</Td>
                                                        <Td>16/03/2020</Td>
                                                        <Td className="drImg"><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                                        <Td><span className="revwGren"></span>Answered</Td>
                                                        <Td className="drEditDot"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                                                    </Tr>

                                                </Tbody>
                                            </Table>
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