import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import Select from 'react-select';
import ReactTooltip from "react-tooltip";
import Modal from '@material-ui/core/Modal';

const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];

class Index extends Component {
    constructor(props) {
       super(props);
        this.state = {
            selectedOption: null,
            openDash: false
        };
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
    };
    // fancybox open
    handleOpenDash = () => {
        this.setState({ openDash: true });
    };
    handleCloseDash = () => {
        this.setState({ openDash: false });
    };

    render() {
        const { selectedOption } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <Grid className="webLogo">
                                        <a href="/"><img src={require('../../assets/images/logo_new.png')} alt="" title="" /></a>
                                    </Grid>
                                    <Grid className="menuItems">
                                        <ul>
                                            <li>
                                                <a className="menuActv">
                                                    <img src={require('../../assets/images/menu1.png')} alt="" title="" />
                                                    <span>Journal</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/inbox">
                                                    <img src={require('../../assets/images/chatVideo.jpg')} alt="" title="" />
                                                    <span>Chat & <br /> Videocalls</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/appointment">
                                                    <img src={require('../../assets/images/calenderIcon.jpg')} alt="" title="" />
                                                    <span>Appointments</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img src={require('../../assets/images/apoint.jpg')} alt="" title="" />
                                                    <span>My Documents</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img src={require('../../assets/images/tracker.jpg')} alt="" title="" />
                                                    <span>Trackers & <br /> Self Data</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="moreMenu">
                                                    <img src={require('../../assets/images/moreicon.jpg')} alt="" title="" />
                                                    <span>More</span>

                                                    <div className="moreMenuList">
                                                        <ul>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Second Opinion</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Emergency Patient Data</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Aimedis Online Courses</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Extra Services</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Journal Archive</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Blockchain Access Log</a></li>
                                                        </ul>
                                                    </div>
                                                </a>

                                            </li>
                                            <li>
                                                <a className="profilMenu">
                                                    <img src={require('../../assets/images/useru.jpg')} alt="" title="" />
                                                    <span>My Profile</span>

                                                    <div className="profilMenuList">
                                                        <ul>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Dark Mode</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Log out</a></li>
                                                        </ul>
                                                    </div>

                                                </a>
                                            </li>
                                        </ul>
                                    </Grid>
                                </Grid>
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
                                                                <a onClick={this.handleOpenDash}>+ Add new entry</a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        {/* Model setup */}
                                        <Modal
                                            open={this.state.openDash}
                                            onClose={this.handleCloseDash}
                                            className="dashBoxModel">
                                            <Grid className="dashBoxCntnt">
                                                <Grid className="dashCourse">
                                                    <Grid className="dashCloseBtn">
                                                        <a onClick={this.handleCloseDash}>
                                                            <img src={require('../../assets/images/closefancy.png')} alt="" title="" />
                                                        </a>
                                                    </Grid>
                                                    <Grid><label>Personalize dashboard</label></Grid>
                                                    <p>Personalize your dashboard by adding or removing cards. Drag to reorder.</p>
                                                </Grid>
                                                <Grid className="dragDash">
                                                    <Grid container direction="row" alignItems="center" justify="center" className="dragDashMain">
                                                        <Grid item xs={8} md={8} className="dragDashLft">
                                                            <Grid><a><img src={require('../../assets/images/remove-2.svg')} alt="" title="" /> Graph - Blood Pressure</a></Grid>
                                                        </Grid>
                                                        <Grid item xs={4} md={4} className="dragDashRght">
                                                            <a><img src={require('../../assets/images/drag.svg')} alt="" title="" /></a>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container direction="row" alignItems="center" justify="center" className="dragDashMain">
                                                        <Grid item xs={8} md={8} className="dragDashLft">
                                                            <Grid><a><img src={require('../../assets/images/remove-2.svg')} alt="" title="" /> Graph - Blood Pressure</a></Grid>
                                                        </Grid>
                                                        <Grid item xs={4} md={4} className="dragDashRght">
                                                            <a><img src={require('../../assets/images/drag.svg')} alt="" title="" /></a>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="moreCards">
                                                    <h3>Add more cards</h3>
                                                    <Grid><a><img src={require('../../assets/images/add.svg')} alt="" title="" /> Graph - Blood Sugar</a></Grid>
                                                    <Grid><a><img src={require('../../assets/images/add.svg')} alt="" title="" /> Graph - Heart Rate</a></Grid>
                                                    <Grid><a><img src={require('../../assets/images/add.svg')} alt="" title="" /> Graph - Weight & BMI</a></Grid>
                                                    <Grid><a><img src={require('../../assets/images/add.svg')} alt="" title="" /> Creatinine</a></Grid>
                                                    <Grid><a><img src={require('../../assets/images/add.svg')} alt="" title="" /> Upcoming appointment</a></Grid>
                                                    <Grid><a><img src={require('../../assets/images/add.svg')} alt="" title="" /> Last documents</a></Grid>
                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of Model setup */}

                                        <Grid container direction="row">
                                            <Grid item xs={12} md={11}>
                                                <Grid className="srchFilter">
                                                    <Grid container direction="row">
                                                        <Grid item xs={12} md={2}>
                                                            <Select
                                                                value={selectedOption}
                                                                onChange={this.handleChange}
                                                                options={options}
                                                                placeholder="All time"
                                                                className="allTimeSel comonSel"
                                                                //isMulti= {true}
                                                                isSearchable={false}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <Select
                                                                value={selectedOption}
                                                                onChange={this.handleChange}
                                                                options={options}
                                                                placeholder="Type: (2)"
                                                                className="typeSel comonSel"
                                                            //isMulti= {true}
                                                            //isSearchable = {false}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={3} className="faclity_all">
                                                            <Select
                                                                value={selectedOption}
                                                                onChange={this.handleChange}
                                                                options={options}
                                                                placeholder="Doctor: All"
                                                                className="allTimeSel comonSel"
                                                            //isMulti= {true}
                                                            //isSearchable = {false}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={3} className="faclity_all">
                                                            <Select
                                                                value={selectedOption}
                                                                onChange={this.handleChange}
                                                                options={options}
                                                                placeholder="Facility: All"
                                                                className="allTimeSel comonSel"
                                                            //isMulti= {true}
                                                            //isSearchable = {false}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={2} className="clear_filter">
                                                            <Grid className="clear_filterUpr">
                                                                <Grid className="clear_filterLft"><a>Clear filters</a></Grid>
                                                                <Grid className="clear_filterRght"><a><img src={require('../../assets/images/clearSrch.jpg')} alt="" title="" /></a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>

                                                    <Grid className="sortBySec">
                                                        <label>Sort by:</label>
                                                        <input type="text" placeholder="Entry time" className="entrTimeBY" />
                                                        <input type="text" placeholder="Diagnosis time" className="diagTimeBY" />
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" className="descpCntnt">
                                            <Grid item xs={12} md={1} className="descpCntntLft">
                                                <a>21 <span>May</span></a>
                                            </Grid>
                                            <Grid item xs={11} md={10} className="descpCntntRght">
                                                <Grid className="descpInerRght">

                                                    <Grid container direction="row" className="addSpc">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="diagnosImg">
                                                                <a className="diagnosNote"><img src={require('../../assets/images/plusicon.jpg')} alt="" title="" /><span>Diagnosis</span> </a>
                                                                <a className="diagnosAwrd"><img src={require('../../assets/images/plusgreen.jpg')} alt="" title="" /></a>
                                                                <a className="diagnosBus"><img src={require('../../assets/images/plusvan.jpg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="vsblSec">
                                                                <a className="vsblEye"><img src={require('../../assets/images/eyeicon.jpg')} alt="" title="" /> <span>Visible</span> </a>
                                                                <a className="vsblTime" data-tip data-for="timeIconTip">
                                                                    <img src={require('../../assets/images/timeIcon.jpg')} alt="" title="" />
                                                                </a>
                                                                <ReactTooltip className="timeIconClas" id="timeIconTip" place="top" effect="solid" backgroundColor="#ffffff">
                                                                    <label>Visible until</label>
                                                                    <p>12/08/2020</p>
                                                                </ReactTooltip>
                                                                <a className="vsblDots"><img src={require('../../assets/images/threedots.jpg')} alt="" title="" /></a>
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
                                                                <a><img src={require('../../assets/images/person1.jpg')} alt="" title="" />
                                                                    <span>Mark Anderson M.D. (Doctor)</span>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <Grid className="markMDCntntImg">
                                                                <a><img src={require('../../assets/images/hLogo.jpg')} alt="" title="" />
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
                                                                                    <img src={require('../../assets/images/yesinfo.jpg')} alt="" title="" />
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
                                                                <a><img src={require('../../assets/images/agedman.jpg')} alt="" title="" />
                                                                    <label>IMG_23_6_2020_09_18.jpg</label></a>
                                                                <a><img src={require('../../assets/images/pdfimg.png')} alt="" title="" />
                                                                    <label>No_name_file.pdf</label></a>
                                                            </Grid>
                                                        </Collapsible>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/* End of Depression Section */}


                                    {/* Start of Condition Pain Section */}
                                    <Grid className="descpCntntMain">

                                        <Grid container direction="row" className="descpCntnt">
                                            <Grid item xs={12} md={1} className="descpCntntLft">
                                                <a>21 <span>May</span></a>
                                            </Grid>
                                            <Grid item xs={11} md={10} className="descpCntntRght">
                                                <Grid className="descpInerRght">

                                                    <Grid container direction="row" className="addSpc">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="conPainImg">
                                                                <a className="conPainNote"><img src={require('../../assets/images/plusicon.jpg')} alt="" title="" /><span>Condition and Pain</span> </a>
                                                                <a className="conPainAwrd"><img src={require('../../assets/images/plusgreen.jpg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="conPainSec">
                                                                <a className="conPainEye"><img src={require('../../assets/images/closeEye.jpg')} alt="" title="" /> <span>Hidden</span> </a>
                                                                <a className="conPainDots"><img src={require('../../assets/images/threedots.jpg')} alt="" title="" /></a>
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
                                                                <a><img src={require('../../assets/images/person1.jpg')} alt="" title="" />
                                                                    <span>Mark Anderson M.D. (Doctor)</span>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <Grid className="conPain_MDCImg">
                                                                <a><img src={require('../../assets/images/hLogo.jpg')} alt="" title="" />
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
                                                                <a><img src={require('../../assets/images/p1.jpg')} alt="" title="" /></a>
                                                                <a><img src={require('../../assets/images/p2.jpg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <Grid className="conPainRght">
                                                                <Grid className="painIntencty">
                                                                    <Grid><label>Pain intensity</label></Grid>
                                                                    <Grid><a><img src={require('../../assets/images/pain.png')} alt="" title="" />Moderate (42)</a></Grid>
                                                                    <Grid> <input type="range" /></Grid>
                                                                </Grid>

                                                                <Grid className="condIntencty">
                                                                    <Grid><label>Condition (How are you?)</label></Grid>
                                                                    <Grid><a><img src={require('../../assets/images/condition.png')} alt="" title="" />83</a></Grid>
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
                                    </Grid>
                                    {/* End of Condition Pain Section */}


                                    {/* Start of Blood Pressure Section */}
                                    <Grid className="descpCntntMain">
                                        <Grid container direction="row" className="descpCntnt">
                                            <Grid item xs={12} md={1} className="descpCntntLft">
                                                <a>21 <span>May</span></a>
                                            </Grid>
                                            <Grid item xs={11} md={10} className="descpCntntRght">
                                                <Grid className="descpInerRght descpInerBlue">

                                                    <Grid container direction="row" className="addSpc">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="blodPrsurImg">
                                                                <a className="blodPrsurNote"><img src={require('../../assets/images/blood-pressure-sugar.svg')} alt="" title="" />
                                                                    <span>Blood Pressure</span>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="bp_vsblSec">
                                                                <a className="bp_vsblEye"><img src={require('../../assets/images/eyeicon.jpg')} alt="" title="" /> <span>Visible</span> </a>
                                                                <a className="bp_vsblDots"><img src={require('../../assets/images/threedots.jpg')} alt="" title="" /></a>
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
                                                                <a><img src={require('../../assets/images/person1.jpg')} alt="" title="" />
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
                                                                    <Grid><img src={require('../../assets/images/bpGraph.jpg')} alt="" title="" /></Grid>
                                                                    <Grid><a>View in fullscreen</a></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Collapsible>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/* End of Blood Pressure Section */}

                                    {/* Start of Diary Notes Section */}
                                    <Grid className="descpCntntMain">
                                        <Grid container direction="row" className="descpCntnt">
                                            <Grid item xs={12} md={1} className="descpCntntLft">
                                                <a>21 <span>May</span></a>
                                            </Grid>
                                            <Grid item xs={11} md={10} className="descpCntntRght">
                                                <Grid className="descpInerRght">

                                                    <Grid container direction="row" className="addSpc">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="diryImg">
                                                                <a className="diryNote"><img src={require('../../assets/images/plusicon.jpg')} alt="" title="" />
                                                                    <span>Diary</span> </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="hideSec">
                                                                <a className="hideEye"><img src={require('../../assets/images/eyeicon.jpg')} alt="" title="" /> <span>Hidden</span> </a>
                                                                <a className="hideDots"><img src={require('../../assets/images/threedots.jpg')} alt="" title="" /></a>
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
                                                                <a><img src={require('../../assets/images/person1.jpg')} alt="" title="" />
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
                                    </Grid>
                                    {/* End of Diary Notes Section */}

                                </Grid>
                                {/* End of Website Mid Content */}

                                {/* Website Right Content */}
                                <Grid item xs={12} md={3}>

                                    <Grid className="profileDescp">
                                        <Grid className="myProfile">
                                            <a className="profilePic">
                                                <img src={require('../../assets/images/agedman.jpg')} alt="" title="" />
                                            </a>
                                        </Grid>
                                        <Grid className="profileName">
                                            <label>James Morrison</label>
                                            <p>13 / 12 / 1988 (32 years)</p>
                                            <Grid className="profileBtn"><a>My Profile</a></Grid>
                                        </Grid>

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

                                    <Grid className="Personal_dash"><a><img src={require('../../assets/images/bpupr.png')} alt="" title="" />Personalize dashboard</a></Grid>
                                    <Grid className="persBlodMesur">
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={6} md={6} className="persBlod">
                                                <label>Blood Pressure</label>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                                <Grid className="persBlodImg">
                                                    <img src={require('../../assets/images/threedots.jpg')} alt="" title="" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="presureData">
                                            <h3>121/80 <span>mmHg</span></h3>
                                            <p>17/07/2020, 12:03 AM</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <img src={require('../../assets/images/lineGrph.jpg')} alt="" title="" />
                                        </Grid>
                                    </Grid>

                                    <Grid className="drVisit">
                                        <h3>Last doctor visits</h3>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={2} md={2}>
                                                <Grid className="drVisitImg">
                                                    <img src={require('../../assets/images/dr1.jpg')} alt="" title="" />
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
                                                    <img src={require('../../assets/images/dr2.jpg')} alt="" title="" />
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
                                                    <img src={require('../../assets/images/threedots.jpg')} alt="" title="" />
                                                </Grid>
                                            </Grid>
                                            <Grid className="clear"></Grid>
                                        </Grid>
                                        <Grid className="oficVisit">
                                            <label>06/08/2020, 9:00 AM</label> <a><img src={require('../../assets/images/h2Logo.jpg')} alt="" title="" /> Office visit</a>
                                        </Grid>
                                        <Grid className="neuroSection">
                                            <h3>Neurology</h3>
                                            <Grid><a><img src={require('../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D. (Doctor)</a></Grid>
                                            <Grid><a><img src={require('../../assets/images/h2Logo.jpg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
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
                                                    <img src={require('../../assets/images/threedots.jpg')} alt="" title="" />
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
                                                    <a><img src={require('../../assets/images/dr1.jpg')} alt="" title="" />
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
                                                    <a><img src={require('../../assets/images/dr1.jpg')} alt="" title="" />
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