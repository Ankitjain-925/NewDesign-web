

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DatePicker from 'react-date-picker';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import AddEntry from './../../Components/AddEntry/index';
import PersonalizedData from './../../Components/TimelineComponent/PersonalizedData/index';
import FilterSec from './../../Components/TimelineComponent/Filter/index';


class Index extends Component {
    constructor(props) {
       super(props);
        this.state = {
            selectedOption: null,
            openDash: false,
            openEntry: false,
            addInqryNw: false,
            addInqrySw: false,
            current_select: 'diagnosis',
            updateOne : 0,
            updateTrack : {},
        };
    }

    //Select type for the new Entry
    SelectOption = (value) => {
        this.setState({ current_select: value }, () => {
            this.handleaddInqryNw();
        })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    // Open Personalized Data
    handleOpenDash = () => {
        this.setState({ openDash: true });
    };
    // Close Personalized Data
    handleCloseDash = () => {
        this.setState({ openDash: false });
    };

    //Open for the Add entry
    handleOpenEntry = () => {
        this.setState({ openEntry: true });
    };
    //Close for the Add entry
    handleCloseEntry = () => {
        this.setState({ openEntry: false });
    };

    //Open ADD/EDIT popup 
    handleaddInqryNw = () => {
        this.setState({ addInqryNw: true });
    };
    //Close ADD/EDIT popup 
    handleCloseInqryNw = () => {
        this.setState({ addInqryNw: false });
    };

    // handleaddInqrySw = () => {
    //     this.setState({ addInqrySw: true });
    // };
    // handleCloseInqrySw = () => {
    //     this.setState({ addInqrySw: false });
    // };

    render() {
        const { selectedOption } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <LeftMenu  isNotShow ={true} currentPage="journal" />
                                {/* End of Website Menu */}

                                {/* Website Mid Content */}
                                <Grid item xs={12} md={8}>

                                    {/* Start of Depression Section */}
                                    <Grid className="descpCntntMain">

                                        <Grid className="journalAdd">
                                            <Grid container direction="row">
                                                <Grid item xs={11} md={11}>
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6}>
                                                            <h1>Journal</h1>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="AddEntrynw">
                                                                <a onClick={this.handleOpenEntry}>+ Add new entry</a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        {/* Model setup */}
                                            <PersonalizedData  openDash={this.state.openDash} onChange={this.UpdatePersonalized} handleCloseDash={this.handleCloseDash} />
                                        {/* End of Model setup */}

                                        
                                        <FilterSec />

                                        {/* <Grid container direction="row" className="descpCntnt">
                                            <Grid item xs={1} md={1} className="descpCntntLft">
                                                <a>21 <span>May</span></a>
                                            </Grid>
                                            <Grid item xs={11} md={10} className="descpCntntRght">
                                                <Grid className="descpInerRght">

                                                    <Grid container direction="row" className="addSpc">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="diagnosImg">
                                                                <a className="diagnosNote"><img src={require('../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>Diagnosis</span> </a>
                                                                <a className="diagnosAwrd"><img src={require('../../../assets/images/confirmed-diagnosis.svg')} alt="" title="" /></a>
                                                                <a className="diagnosBus"><img src={require('../../../assets/images/emergency-diagnosis.svg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="vsblSec">
                                                                <a className="vsblEye"><img src={require('../../../assets/images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                                                <a className="vsblTime" data-tip data-for="timeIconTip">
                                                                    <img src={require('../../../assets/images/clock.svg')} alt="" title="" />
                                                                </a>
                                                                <ReactTooltip className="timeIconClas" id="timeIconTip" place="top" effect="solid" backgroundColor="#ffffff">
                                                                    <label>Visible until</label>
                                                                    <p>12/08/2020</p>
                                                                </ReactTooltip>
                                                                <a className="vsblDots"><img src={require('../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>

                                                    <Grid className="icd_num addSpc">
                                                        <label>Depression</label>
                                                        <a data-tip data-for="icdtxtTip">ICD: F32.0</a>
                                                        <ReactTooltip className="icdtxtClas" id="icdtxtTip" place="top" effect="solid" backgroundColor="#ffffff">
                                                            <h4>Mild depressive episode</h4>
                                                        </ReactTooltip>
                                                    </Grid>

                                                    <Grid container direction="row" className="addSpc markCntntMain">
                                                        <Grid item xs={12} md={5}>
                                                            <Grid className="markCntntImg">
                                                                <a><img src={require('../../../assets/images/person1.jpg')} alt="" title="" />
                                                                    <span>Mark Anderson M.D. (Doctor)</span>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <Grid className="markMDCntntImg">
                                                                <a><img src={require('../../../assets/images/hLogo.jpg')} alt="" title="" />
                                                                    <span>Illinois Masonic Medical Center</span>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>

                                                    <Grid className="addSpc detailMark">
                                                        <Collapsible trigger="Details" open="true">
                                                            <Grid className="detailCntnt">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={12} md={6} className="diagnoBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>Diagnosed by</label></Grid>
                                                                            <Grid item xs={7} md={7}><span>Mark Anderson M.D.</span></Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6} className="diagnoBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>Allergy</label></Grid>
                                                                            <Grid item xs={7} md={7}><span>No</span></Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6} className="diagnoBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>Diagnosed on</label></Grid>
                                                                            <Grid item xs={7} md={7}><span>20/05/2020</span></Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6} className="diagnoBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>Travel Diagnosis</label></Grid>
                                                                            <Grid item xs={7} md={7}>
                                                                                <span>Yes</span>
                                                                                <a className="yesInfo" data-tip data-for="yesInfoTip">
                                                                                    <img src={require('../../../assets/images/yesinfo.jpg')} alt="" title="" />
                                                                                </a>
                                                                                <ReactTooltip className="yesInfoClas" id="yesInfoTip" place="top" effect="solid" backgroundColor="#ffffff">
                                                                                    <h4>Traveled to Africa</h4>
                                                                                    <p>06/02/2020 - 26/02/2020</p>
                                                                                </ReactTooltip>
                                                                            </Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="clear"></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Collapsible>
                                                    </Grid>

                                                    <Grid className="addSpc detailMark">
                                                        <Collapsible trigger="Notes" open="true">
                                                            <Grid className="detailCntnt">
                                                                <p>
                                                                    Multiple lesions again suggest chronic demyelination. Mild atrophy greatest in the
                                                                    frontal region may be associated with multiple sclerosis. Findings appear stable when
                                                                    compared with the prior study. There is no abnormal enhancement.
                                                                </p>
                                                            </Grid>
                                                        </Collapsible>
                                                    </Grid>

                                                    <Grid className="addSpc detailMark">
                                                        <Collapsible trigger="Images & Files" open="true">
                                                            <Grid className="imgsFile">
                                                                <a><img src={require('../../../assets/images/agedman.png')} alt="" title="" />
                                                                    <label>IMG_23_6_2020_09_18.jpg</label></a>
                                                                <a><img src={require('../../../assets/images/pdfimg.png')} alt="" title="" />
                                                                    <label>No_name_file.pdf</label></a>
                                                            </Grid>
                                                        </Collapsible>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid> */}
                                    </Grid>
                                    {/* End of Depression Section */}


                                    {/* Start of Condition Pain Section */}
                                    {/* <Grid className="descpCntntMain">

                                        <Grid container direction="row" className="descpCntnt">
                                            <Grid item xs={1} md={1} className="descpCntntLft">
                                                <a>21 <span>May</span></a>
                                            </Grid>
                                            <Grid item xs={11} md={10} className="descpCntntRght">
                                                <Grid className="descpInerRght">

                                                    <Grid container direction="row" className="addSpc">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="conPainImg">
                                                                <a className="conPainNote"><img src={require('../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>Condition and Pain</span> </a>
                                                                <a className="conPainAwrd"><img src={require('../../../assets/images/confirmed-diagnosis.svg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="conPainSec">
                                                                <a className="conPainEye"><img src={require('../../../assets/images/eye2.png')} alt="" title="" /> <span>Hidden</span> </a>
                                                                <a className="conPainDots"><img src={require('../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>

                                                    <Grid className="conPain_num addSpc">
                                                        <label>Knee Pain</label>
                                                        <p>Acute</p>
                                                    </Grid>

                                                    <Grid container direction="row" className="addSpc conPain_Cntnt">
                                                        <Grid item xs={12} md={5}>
                                                            <Grid className="conPain_Img">
                                                                <a><img src={require('../../../assets/images/person1.jpg')} alt="" title="" />
                                                                    <span>Mark Anderson M.D. (Doctor)</span>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <Grid className="conPain_MDCImg">
                                                                <a><img src={require('../../../assets/images/hLogo.jpg')} alt="" title="" />
                                                                    <span>Illinois Masonic Medical Center</span>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>

                                                    <Grid container direction="row" className="addSpc conPainGraph">
                                                        <Grid item xs={12} md={5}>
                                                            <Grid className="conPainLft">
                                                                <Grid className="conPainArea"><label>Pain areas</label></Grid>
                                                                <a><img src={require('../../../assets/images/pat22.png')} alt="" title="" /></a>
                                                                <a><img src={require('../../../assets/images/patient-back.svg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <Grid className="conPainRght">
                                                                <Grid className="painIntencty">
                                                                    <Grid><label>Pain intensity</label></Grid>
                                                                    <Grid><a><img src={require('../../../assets/images/pain.png')} alt="" title="" />Moderate (42)</a></Grid>
                                                                    <Grid> <input type="range" /></Grid>
                                                                </Grid>

                                                                <Grid className="condIntencty">
                                                                    <Grid><label>Condition (How are you?)</label></Grid>
                                                                    <Grid><a><img src={require('../../../assets/images/condition.png')} alt="" title="" />83</a></Grid>
                                                                    <Grid> <input type="range" /></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>

                                                    <Grid className="addSpc detailMark">
                                                        <Collapsible trigger="Details" open="true">
                                                            <Grid>
                                                                <Grid container direction="row">
                                                                    <Grid item xs={12} md={6} className="painTypeBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>Pain type</label></Grid>
                                                                            <Grid item xs={7} md={7}><span>Acute</span></Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6} className="painTypeBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>Pain quality</label></Grid>
                                                                            <Grid item xs={7} md={7}><span>Burning, Stabbing</span></Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="clear"></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Collapsible>
                                                    </Grid>

                                                    <Grid className="addSpc detailMark">
                                                        <Collapsible trigger="Notes" open="true">
                                                            <Grid className="painTypeCntnt">
                                                                <p>
                                                                    Multiple lesions again suggest chronic demyelination. Mild atrophy greatest in the
                                                                    frontal region may be associated with multiple sclerosis. Findings appear stable when
                                                                    compared with the prior study. There is no abnormal enhancement.
                                                                </p>
                                                            </Grid>
                                                        </Collapsible>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid> */}
                                    {/* End of Condition Pain Section */}


                                    {/* Start of Blood Pressure Section */}
                                    {/* <Grid className="descpCntntMain">
                                        <Grid container direction="row" className="descpCntnt">
                                            <Grid item xs={1} md={1} className="descpCntntLft">
                                                <a>21 <span>May</span></a>
                                            </Grid>
                                            <Grid item xs={11} md={10} className="descpCntntRght">
                                                <Grid className="descpInerRght descpInerBlue">

                                                    <Grid container direction="row" className="addSpc">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="blodPrsurImg">
                                                                <a className="blodPrsurNote"><img src={require('../../../assets/images/blood-pressure-sugar.svg')} alt="" title="" />
                                                                    <span>Blood Pressure</span>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="bp_vsblSec">
                                                                <a className="bp_vsblEye"><img src={require('../../../assets/images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                                                <a className="bp_vsblDots"><img src={require('../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>

                                                    <Grid className="bp_hg addSpc">
                                                        <label>121/80 <span>mmHg</span></label>
                                                        <p>Normal</p>
                                                    </Grid>

                                                    <Grid container direction="row" className="addSpc bpJohnMain">
                                                        <Grid item xs={12} md={12}>
                                                            <Grid className="bpJohnImg">
                                                                <a><img src={require('../../../assets/images/person1.jpg')} alt="" title="" />
                                                                    <span>James Morrison (Patient)</span>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>

                                                    <Grid className="addSpc detailMark">
                                                        <Collapsible trigger="Details" open="true">
                                                            <Grid className="detailCntnt">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={12} md={6} className="bloodPreBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>RR Systolic</label></Grid>
                                                                            <Grid item xs={7} md={7}><span>121</span></Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6} className="bloodPreBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>Feeling</label></Grid>
                                                                            <Grid item xs={7} md={7}><span>Relaxed</span></Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6} className="bloodPreBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>RR Diastolic</label></Grid>
                                                                            <Grid item xs={7} md={7}><span>80</span></Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6} className="bloodPreBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>Date & Time</label></Grid>
                                                                            <Grid item xs={7} md={7}><span>21/05/2020, 8:03 AM</span></Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6} className="bloodPreBy">
                                                                        <Grid container direction="row">
                                                                            <Grid item xs={5} md={5}><label>Heart Rate</label></Grid>
                                                                            <Grid item xs={7} md={7}><span>123</span></Grid>
                                                                            <Grid className="clear"></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="clear"></Grid>
                                                                </Grid>
                                                                <Grid className="bp_graph">
                                                                    <Grid><img src={require('../../../assets/images/gp.png')} alt="" title="" /></Grid>
                                                                    <Grid><a>View in fullscreen</a></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Collapsible>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid> */}
                                    {/* End of Blood Pressure Section */}

                                    {/* Start of Diary Notes Section */}
                                    {/* <Grid className="descpCntntMain">
                                        <Grid container direction="row" className="descpCntnt">
                                            <Grid item xs={1} md={1} className="descpCntntLft">
                                                <a>21 <span>May</span></a>
                                            </Grid>
                                            <Grid item xs={11} md={10} className="descpCntntRght">
                                                <Grid className="descpInerRght">

                                                    <Grid container direction="row" className="addSpc">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="diryImg">
                                                                <a className="diryNote"><img src={require('../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" />
                                                                    <span>Diary</span> </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="hideSec">
                                                                <a className="hideEye"><img src={require('../../../assets/images/eye2.png')} alt="" title="" /> <span>Hidden</span> </a>
                                                                <a className="hideDots"><img src={require('../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>

                                                    <Grid className="diryNotes_hedng addSpc">
                                                        <label>Diary Notes</label>
                                                    </Grid>

                                                    <Grid container direction="row" className="addSpc diryCntntMain">
                                                        <Grid item xs={12} md={12}>
                                                            <Grid className="diryCntntImg">
                                                                <a><img src={require('../../../assets/images/person1.jpg')} alt="" title="" />
                                                                    <span>James Morrison (Patient)</span>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>

                                                    <Grid className="addSpc detailMark">
                                                        <Collapsible trigger="Notes" open="true">
                                                            <Grid className="diryCntntSec">
                                                                <p>This is the only field in Diary entry type. So we can leave it open.</p>
                                                                <p><i>Wysiwyg editor allows us simple formatting, like italic and so…</i></p>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis</p>
                                                                <h3>This is a simple title</h3>
                                                                <ul>
                                                                    <li><a>Bullet 1</a></li>
                                                                    <li><a>Bullet 2</a></li>
                                                                    <li><a>Bullet 3</a></li>
                                                                </ul>
                                                            </Grid>
                                                        </Collapsible>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid> */}
                                    {/* End of Diary Notes Section */}

                                </Grid>
                                {/* End of Website Mid Content */}
                                
                             

                                {/* Website Right Content */}
                                <Grid item xs={12} md={3}>

                                    <Grid className="profileDescp">
                                        <Grid className="myProfile">
                                            <a className="profilePic">
                                                <img src={require('../../../assets/images/agedman.jpg')} alt="" title="" />
                                            </a>
                                        </Grid>
                                        <Grid className="profileName">
                                            <label>James Morrison</label>
                                            <p>13 / 12 / 1988 (32 years)</p>
                                            <Grid className="profileBtn"><a onClick={this.handleaddInqryNw}>My Profile</a></Grid>

                                            {/* Model setup */}
                                            <Modal
                                                open={this.state.addInqryNw}
                                                onClose={this.handleCloseInqryNw}
                                                className="nwDiaModel">
                                                <Grid className="nwDiaCntnt">
                                                    <Grid className="nwDiaCntntIner">
                                                        <Grid className="nwDiaCourse">
                                                            <Grid className="nwDiaCloseBtn">
                                                                <a onClick={this.handleCloseInqryNw}>
                                                                    <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                                </a>
                                                            </Grid>
                                                            {this.state.updateTrack._id && this.state.updateOne !== this.state.updateTrack._id ? 
                                                            <div> 
                                                                <p>New entry</p>
                                                                <Grid className="nwDiaSel">
                                                                    <select onChange={(e)=>this.SelectOption(e.target.value)} value={this.state.current_select}>
                                                                        <option value="blood_pressure">Blood Pressure</option>
                                                                        <option value="blood_sugar">Blood Sugar</option>
                                                                        <option value="condition_pain">Condition and Pain</option>
                                                                        <option value="covid_19">Covid-19 Diary</option>
                                                                        <option value="diagnosis" selected={true}>Diagnosis</option>
                                                                        <option value="diary">Diary</option>
                                                                        <option value="doctor_visit">Doctor Visit</option>
                                                                        <option value="family_anamnesis">Family Anamnesis</option>
                                                                        <option value="file_upload">Files Upload</option>
                                                                        <option value="hospitalization">Hospital Visit</option>
                                                                        <option value="laboratory_result">Laboratory Result</option>
                                                                        <option value="marcumar_pass">Marcumar pass</option>
                                                                        <option value="medication" >Medication</option>
                                                                        <option value="smoking_status">Smoking Status</option>
                                                                        <option value="vaccination">Vaccination</option>
                                                                        <option value="weight_bmi">Weight & BMI</option>
                                                                    </select>
                                                                </Grid>
                                                            </div> :
                                                            <div>
                                                                <p>Edit entry</p>
                                                                <Grid className="nwDiaSel">
                                                                    <select disabled onChange={(e)=>this.SelectOption(e.target.value)} value={this.state.current_select}>
                                                                        <option value="blood_pressure">Blood Pressure</option>
                                                                        <option value="blood_sugar">Blood Sugar</option>
                                                                        <option value="condition_pain">Condition and Pain</option>
                                                                        <option value="covid_19">Covid-19 Diary</option>
                                                                        <option value="diagnosis" selected={true}>Diagnosis</option>
                                                                        <option value="diary">Diary</option>
                                                                        <option value="doctor_visit">Doctor Visit</option>
                                                                        <option value="family_anamnesis">Family Anamnesis</option>
                                                                        <option value="file_upload">Files Upload</option>
                                                                        <option value="hospitalization">Hospital Visit</option>
                                                                        <option value="laboratory_result">Laboratory Result</option>
                                                                        <option value="marcumar_pass">Marcumar pass</option>
                                                                        <option value="medication" >Medication</option>
                                                                        <option value="smoking_status">Smoking Status</option>
                                                                        <option value="vaccination">Vaccination</option>
                                                                        <option value="weight_bmi">Weight & BMI</option>
                                                                    </select>
                                                                </Grid>
                                                            </div>}
                                                        </Grid>
                                                        <Grid>
                                                            {this.state.current_select ==='blood_pressure' && 'Blood Pressure'}
                                                            {this.state.current_select ==='blood_sugar' && 'Blood Sugar'}
                                                            {this.state.current_select ==='condition_pain' && 'Condition & Pain'}
                                                            {this.state.current_select ==='covid_19' && 'Covid 19 Diary'}
                                                            {this.state.current_select ==='diagnosis' && 'Dianosis'}
                                                            {this.state.current_select ==='diary' && 'Diary'}
                                                            {this.state.current_select ==='doctor_visit' && 'Doctor Visit'}
                                                            {this.state.current_select ==='family_anamnesis' && 'Family Anamnesis'}
                                                            {this.state.current_select ==='file_upload' && 'Files Upload'}
                                                            {this.state.current_select ==='hospitalization' && 'Hospital Visit'}
                                                            {this.state.current_select ==='laboratory_result' && 'Laboratory Result'}
                                                            {this.state.current_select ==='marcumar_pass' && 'Marcumar Pass'}
                                                            {this.state.current_select ==='medication' && 'Medication'}
                                                            {this.state.current_select ==='smoking_status' && 'Smoking Status'}
                                                            {this.state.current_select ==='vaccination' && 'Vaccination'}
                                                            {this.state.current_select ==='weight_bmi' && 'Weight and BMI'}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Modal>
                                            {/* End of Model setup */}

                                        </Grid>

                                        {/* Model setup */}
                                        <AddEntry openEntry={this.state.openEntry} value="diagnosis" onChange={this.SelectOption} handleCloseEntry={this.handleCloseEntry} />
                                        {/* <Modal
                                            open={this.state.openEntry}
                                            onClose={this.handleCloseEntry}
                                            className="entryBoxModel">
                                            <Grid className="entryBoxCntnt">
                                                <Grid className="entryCourse">
                                                    <Grid className="entryCloseBtn">
                                                        <a onClick={this.handleCloseEntry}>
                                                            <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                        </a>
                                                    </Grid>
                                                    <Grid><label>Select entry type</label></Grid>
                                                    <p>Click or input number on your keyboard</p>
                                                </Grid>

                                                <Grid className="checkHelth">
                                                    <Grid container direction="row">
                                                        <Grid item xs={12} sm={6} md={6}>
                                                            <Grid className="checkHelthLbl">
                                                                <Grid><a><span>1</span>Blood Pressure</a></Grid>
                                                                <Grid><a><span>2</span>Blood Sugar</a></Grid>
                                                                <Grid><a><span>3</span>Condition and Pain</a></Grid>
                                                                <Grid><a><span>4</span>Covid-19 Diary</a></Grid>
                                                                <Grid><a><span>5</span>Diagnosis</a></Grid>
                                                                <Grid><a><span>6</span>Diary</a></Grid>
                                                                <Grid><a><span>7</span>Doctor visit</a></Grid>
                                                                <Grid><a><span>8</span>Family anamnesis</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={6}>
                                                            <Grid className="checkHelthLbl">
                                                                <Grid><a><span>9</span>Files upload</a></Grid>
                                                                <Grid><a><span>10</span>Hospital visit</a></Grid>
                                                                <Grid><a><span>11</span>Laboratory result</a></Grid>
                                                                <Grid><a><span>12</span>Marcumar pass</a></Grid>
                                                                <Grid><a><span>13</span>Medication</a></Grid>
                                                                <Grid><a><span>14</span>Smoking status</a></Grid>
                                                                <Grid><a><span>15</span>Vaccination</a></Grid>
                                                                <Grid><a><span>16</span>Weight & BMI</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Modal> */}
                                        {/* End of Model setup */}

                                        <Grid>
                                            <Grid className="prfilHght">
                                                <Grid className="prfilHghtLft">
                                                    <label>Weight</label>
                                                    <p>60<span>kg</span></p>
                                                </Grid>
                                                <Grid className="prfilHghtRght">
                                                    <label>Height</label>
                                                    <p>177<span>cm</span></p>
                                                </Grid>
                                            </Grid>
                                            <Grid className="prfilHght">
                                                <Grid className="prfilHghtLft">
                                                    <label>BMI</label>
                                                    <p>26.57</p>
                                                </Grid>
                                                <Grid className="prfilHghtRght">
                                                    <label>Blood</label>
                                                    <p>-AB</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid className="Personal_dash">
                                        <a onClick={this.handleOpenDash}>
                                            <img src={require('../../../assets/images/bpupr.png')} alt="" title="" />
                                            Personalize dashboard
                                        </a>
                                    </Grid>

                                    {/* Model setup */}
                                    <Modal
                                        open={this.state.addInqrySw}
                                        onClose={this.handleCloseInqrySw}
                                        className="nwDiaModel">
                                        <Grid className="nwDiaCntnt">
                                            <Grid className="nwDiaCntntIner">
                                                <Grid className="nwDiaCourse">
                                                    <Grid className="nwDiaCloseBtn">
                                                        <a onClick={this.handleCloseInqrySw}>
                                                            <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                        </a>
                                                    </Grid>
                                                    <p>New entry</p>
                                                    <Grid className="nwDiaSel">
                                                        <select>
                                                            <option>Diagnosis</option>
                                                            <option>Diagnosis</option>
                                                            <option>Diagnosis</option>
                                                        </select>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="cnfrmDiaMain">
                                                    <Grid className="cnfrmDiaUpr">
                                                        <Grid container direction="row">
                                                            <Grid item xs={12} md={8} className="cnfrmDiaLft">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            value="checkedB"
                                                                            color="#00ABAF"
                                                                        />
                                                                    }
                                                                    label="Confirm diagnosis"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={4} className="cnfrmDiaRght">
                                                                <img src={require('../../../assets/images/plusgreen.jpg')} alt="" title="" />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container direction="row">
                                                            <Grid item xs={12} md={8} className="cnfrmDiaLft">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            value="checkedB"
                                                                            color="#00ABAF"
                                                                        />
                                                                    }
                                                                    label="Emergency diagnosis"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={4} className="cnfrmDiaRght">
                                                                <img src={require('../../../assets/images/plusvan.jpg')} alt="" title="" />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="fillDia">
                                                        <Grid><label>Enter diagnosis</label></Grid>
                                                        <Grid><input type="text" /></Grid>
                                                    </Grid>
                                                    <Grid className="diaCD">
                                                        <Grid><label>Select an ICD catalogue and search for code</label></Grid>
                                                        <Grid><a className="diaCDActv">ICD-10</a> <a>ICD-11</a></Grid>
                                                        <Grid><a className="diaCDActv">ICD-10 WHO</a> <a>ICD-10 CM</a> <a>ICD-10 GM</a></Grid>
                                                    </Grid>

                                                    <Grid className="plasB50">
                                                        <Grid className="plasB50Lft"><span>B50.0</span></Grid>
                                                        <Grid className="plasB50Rght">
                                                            <p>Plasmodium falciparum malaria with cerebral complications</p>
                                                        </Grid>
                                                    </Grid>

                                                    {/* <Grid className="srchDia">
                                                        <Grid className="srchdoseMg">
                                                            <input type="text" placeholder="Enter code or search by keywords" />
                                                            <span><img src={require('../../../assets/images/search-entries.svg')} alt="" title="" /></span>
                                                        </Grid>
                                                    </Grid> */}

                                                    <Grid className="travelDia">
                                                        <Grid>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value="checkedB"
                                                                        color="#00ABAF"
                                                                    />
                                                                }
                                                                label="Alergy"
                                                            />
                                                        </Grid>
                                                        <Grid>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value="checkedB"
                                                                        color="#00ABAF"
                                                                    />
                                                                }
                                                                label="Travel diagnosis"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="fillDia">
                                                        <Grid><label>Date of diagnose</label></Grid>
                                                        <Grid><input type="text" /></Grid>
                                                    </Grid>
                                                    <Grid className="fillDia">
                                                        <Grid><label>Diagnosed by</label></Grid>
                                                        <Grid><input type="text" /></Grid>
                                                    </Grid>

                                                    <Grid className="notEditor"><label>Notes</label></Grid>
                                                    <Grid className="fill_editor">
                                                        <Editor
                                                            //editorState={this.state.editorState}
                                                            toolbarClassName="toolbarClassName"
                                                            wrapperClassName="wrapperClassName"
                                                            editorClassName="editorClassName"
                                                        //onEditorStateChange={this.onEditorStateChange}
                                                        />
                                                    </Grid>
                                                    <Grid className="attchForms attchImg">
                                                        <Grid><label>Attachments</label></Grid>
                                                        <Grid className="attchInput">
                                                            <a><img src={require('../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                                            <a>Browse <input type="file" /></a> or drag here
                                                                </Grid>
                                                        <p>Supported file types: .jpg, .png, .pdf</p>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid className="uploadImgs">
                                                            <Grid className="uploadImgsLft"><img src={require('../../../assets/images/agedman.png')} alt="" title="" /></Grid>
                                                            <Grid className="uploadImgsMid"><p>IMG_23_6_2020_09_18.jpg</p></Grid>
                                                            <Grid className="uploadImgsRght"><img src={require('../../../assets/images/remove-1.svg')} alt="" title="" /></Grid>
                                                        </Grid>
                                                        <Grid className="uploadImgs">
                                                            <Grid className="uploadImgsLft"><img src={require('../../../assets/images/agedman.png')} alt="" title="" /></Grid>
                                                            <Grid className="uploadImgsMid"><p>IMG_23_6_2020_09_18.jpg</p></Grid>
                                                            <Grid className="uploadImgsRght"><img src={require('../../../assets/images/remove-1.svg')} alt="" title="" /></Grid>
                                                        </Grid>
                                                    </Grid>


                                                </Grid>

                                                <Grid className="infoShwHidMain3upr">

                                                    <Grid className="shwAfterUpr">
                                                        <Grid className="shwAfter">
                                                            <Grid container direction="row" justifyContent="center" alignItems="center">
                                                                <Grid item xs={12} md={8} className="shwAfterLft">
                                                                    <p>Show after: <span>16/07/2020</span></p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4} className="shwAfterRght">
                                                                    <a>Done</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="showThis">

                                                            <Grid className="showThisBtns">
                                                                <a className="showThisBtnsActv">Show this entry</a> <a>Hide this entry</a>
                                                            </Grid>
                                                            <Grid className="alwaysDate">
                                                                <Grid><FormControlLabel value="yes" control={<Radio />} label="Always" /></Grid>
                                                                <Grid><FormControlLabel value="yes" control={<Radio />} label="After specific date" /></Grid>
                                                            </Grid>

                                                            <Grid className="afterDate">
                                                                <DatePicker />
                                                            </Grid>

                                                            <Grid className="alwaysDate">
                                                                <Grid><FormControlLabel value="yes" control={<Radio />} label="Always" /></Grid>
                                                            </Grid>

                                                        </Grid>

                                                    </Grid>

                                                    <Grid className="infoShwSave3">
                                                        <input type="submit" value="Save entry" />
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Modal>
                                    {/* End of Model setup */}


                                    <Grid className="persBlodMesur">
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={6} md={6} className="persBlod">
                                                <label>Blood Pressure</label>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                                <Grid className="persBlodImg">
                                                    <img src={require('../../../assets/images/nav-more.svg')} alt="" title="" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="presureData">
                                            <h3>121/80 <span>mmHg</span></h3>
                                            <p>17/07/2020, 12:03 AM</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <img src={require('../../../assets/images/lineGraph.png')} alt="" title="" />
                                        </Grid>
                                    </Grid>

                                    <Grid className="drVisit">
                                        <h3>Last doctor visits</h3>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={2} md={2}>
                                                <Grid className="drVisitImg">
                                                    <img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={10} md={10}>
                                                <Grid className="drVisitData">
                                                    <label>Mark Anderson M.D.</label>
                                                    <p>17/07/2020, 12:03 AM</p>
                                                </Grid>
                                            </Grid>
                                            <Grid className="clear"></Grid>
                                        </Grid>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={2} md={2}>
                                                <Grid className="drVisitImg">
                                                    <img src={require('../../../assets/images/dr2.jpg')} alt="" title="" />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={10} md={10}>
                                                <Grid className="drVisitData">
                                                    <label>Mark Anderson M.D.</label>
                                                    <p>17/07/2020, 12:03 AM</p>
                                                </Grid>
                                            </Grid>
                                            <Grid className="clear"></Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid className="comeAppoint">
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={10} md={10}>
                                                <Grid className="upcomView"><label>Upcoming appointment</label> <a>View all</a></Grid>
                                            </Grid>
                                            <Grid item xs={2} md={2}>
                                                <Grid className="allViewDots">
                                                    <img src={require('../../../assets/images/nav-more.svg')} alt="" title="" />
                                                </Grid>
                                            </Grid>
                                            <Grid className="clear"></Grid>
                                        </Grid>
                                        <Grid className="oficVisit">
                                            <label>06/08/2020, 9:00 AM</label> <a><img src={require('../../../assets/images/h2Logo.jpg')} alt="" title="" /> Office visit</a>
                                        </Grid>
                                        <Grid className="neuroSection">
                                            <h3>Neurology</h3>
                                            <Grid><a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D. (Doctor)</a></Grid>
                                            <Grid><a><img src={require('../../../assets/images/h2Logo.jpg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid className="lstDocs">
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={10} md={10}>
                                                <Grid className="lstView">
                                                    <label>Last Documents</label> <a>View all</a>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={2} md={2}>
                                                <Grid className="lstViewDots">
                                                    <img src={require('../../../assets/images/nav-more.svg')} alt="" title="" />
                                                </Grid>
                                            </Grid>
                                            <Grid className="clear"></Grid>
                                        </Grid>

                                        <Grid className="presSec">
                                            <a className="presSecAncr">
                                                <h4>Prescription</h4>
                                                <Grid container direction="row" alignItems="center" className="metroPro">
                                                    <Grid item xs={6} md={6}><h5>Metoprolol</h5></Grid>
                                                    <Grid item xs={6} md={6} className="metroPrOpen"><a>Open</a></Grid>
                                                    <Grid className="clear"></Grid>
                                                </Grid>
                                                <Grid className="metroDoctor">
                                                    <a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />
                                                        Mark Anderson M.D. (Doctor)
                                                 </a>
                                                </Grid>
                                            </a>

                                            <a className="presSecAncr">
                                                <h4>Sick Certificate</h4>
                                                <Grid container direction="row" alignItems="center" className="metroPro">
                                                    <Grid item xs={12} md={12}><h5>Temperature and headaches</h5></Grid>
                                                    <Grid className="clear"></Grid>
                                                </Grid>
                                                <Grid className="metroDoctor">
                                                    <a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />
                                                        Mark Anderson M.D. (Doctor)
                                                   </a>
                                                </Grid>
                                            </a>
                                        </Grid>

                                    </Grid>

                                </Grid>
                                {/* End of Website Right Content */}

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default Index