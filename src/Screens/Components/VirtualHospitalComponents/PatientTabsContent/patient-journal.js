import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import Select from 'react-select';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
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
            selectedOption: null
        };
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    render() {
        const { selectedOption } = this.state;
        return (
            <Grid>
                <Grid className="journalAdd">
                    <Grid container direction="row">
                        <Grid item xs={12} md={11}>
                            <Grid container direction="row">
                                <Grid item xs={12} md={6} sm={6}>
                                    <h1>Journal</h1>
                                </Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    <Grid className="AddEntrynw">
                                        <a>+ Add new entry</a>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Search for Website */}
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
                                        <Grid className="clear_filterRght"><a><img src={require('assets/virtual_images/clearSrch.jpg')} alt="" title="" /></a></Grid>
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
                {/* End of Search for Website */}
                {/* Condition Pain Section */}
                <Grid className="descpCntntMain">
                    <Grid container direction="row">
                        <Grid item xs={12} md={1} className="descpCntntLft">
                            <a>21 <span>May</span></a>
                        </Grid>
                        <Grid item xs={12} md={10} className="descpCntntRght">
                            <Grid className="descpInerRght">
                                <Grid container direction="row" className="addSpc">
                                    <Grid item xs={6} md={6}>
                                        <Grid className="diagnosImg">
                                            <a className="diagnosNote"><img src={require('assets/virtual_images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>Diagnosis</span> </a>
                                            <a className="diagnosAwrd"><img src={require('assets/virtual_images/confirmed-diagnosis.svg')} alt="" title="" /></a>
                                            <a className="diagnosBus"><img src={require('assets/virtual_images/emergency-diagnosis.svg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="vsblSec">
                                            <a className="vsblEye"><img src={require('assets/virtual_images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                            <a className="vsblTime" data-tip data-for="timeIconTip">
                                                <img src={require('assets/virtual_images/clock.svg')} alt="" title="" />
                                            </a>
                                            <ReactTooltip className="timeIconClas" id="timeIconTip" place="top" effect="solid" backgroundColor="#ffffff">
                                                <label>Visible until</label>
                                                <p>12/08/2020</p>
                                            </ReactTooltip>
                                            <a className="vsblDots"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a>
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
                                            <a><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" />
                                                <span>Mark Anderson M.D. (Doctor)</span>
                                            </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Grid className="markMDCntntImg">
                                            <a><img src={require('assets/virtual_images/hLogo.jpg')} alt="" title="" />
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
                                                                <img src={require('assets/virtual_images/yesinfo.jpg')} alt="" title="" />
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
                                            <a><img src={require('assets/virtual_images/agedman.png')} alt="" title="" />
                                                <label>IMG_23_6_2020_09_18.jpg</label></a>
                                            <a><img src={require('assets/virtual_images/pdfimg.png')} alt="" title="" />
                                                <label>No_name_file.pdf</label></a>
                                        </Grid>
                                    </Collapsible>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* End of Condition Pain Section */}
                {/* Start of Condition Pain Section */}
                <Grid className="descpCntntMain">
                    <Grid container direction="row" className="descpCntnt">
                        <Grid item xs={12} md={1} className="descpCntntLft">
                            <a>21 <span>May</span></a>
                        </Grid>
                        <Grid item xs={12} md={10} className="descpCntntRght">
                            <Grid className="descpInerRght">
                                <Grid container direction="row" className="addSpc">
                                    <Grid item xs={6} md={6}>
                                        <Grid className="conPainImg">
                                            <a className="conPainNote"><img src={require('assets/virtual_images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>Condition and Pain</span> </a>
                                            <a className="conPainAwrd"><img src={require('assets/virtual_images/confirmed-diagnosis.svg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="conPainSec">
                                            <a className="conPainEye"><img src={require('assets/virtual_images/eye2.png')} alt="" title="" /> <span>Hidden</span> </a>
                                            <a className="conPainDots"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a>
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
                                            <a><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" />
                                                <span>Mark Anderson M.D. (Doctor)</span>
                                            </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Grid className="conPain_MDCImg">
                                            <a><img src={require('assets/virtual_images/hLogo.jpg')} alt="" title="" />
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
                                            <a><img src={require('assets/virtual_images/pat22.png')} alt="" title="" /></a>
                                            <a><img src={require('assets/virtual_images/patient-back.svg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Grid className="conPainRght">
                                            <Grid className="painIntencty">
                                                <Grid><label>Pain intensity</label></Grid>
                                                <Grid><a><img src={require('assets/virtual_images/pain.png')} alt="" title="" />Moderate (42)</a></Grid>
                                                <Grid> <input type="range" /></Grid>
                                            </Grid>
                                            <Grid className="condIntencty">
                                                <Grid><label>Condition (How are you?)</label></Grid>
                                                <Grid><a><img src={require('assets/virtual_images/condition.png')} alt="" title="" />83</a></Grid>
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
                        <Grid item xs={12} md={10} className="descpCntntRght">
                            <Grid className="descpInerRght descpInerBlue">
                                <Grid container direction="row" className="addSpc">
                                    <Grid item xs={6} md={6}>
                                        <Grid className="blodPrsurImg">
                                            <a className="blodPrsurNote"><img src={require('assets/virtual_images/blood-pressure-sugar.svg')} alt="" title="" />
                                                <span>Blood Pressure</span>
                                            </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="bp_vsblSec">
                                            <a className="bp_vsblEye"><img src={require('assets/virtual_images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                            <a className="bp_vsblDots"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a>
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
                                            <a><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" />
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
                                                <Grid><img src={require('assets/virtual_images/gp.png')} alt="" title="" /></Grid>
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
                        <Grid item xs={12} md={10} className="descpCntntRght">
                            <Grid className="descpInerRght">
                                <Grid container direction="row" className="addSpc">
                                    <Grid item xs={6} md={6}>
                                        <Grid className="diryImg">
                                            <a className="diryNote"><img src={require('assets/virtual_images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" />
                                                <span>Diary</span> </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="hideSec">
                                            <a className="hideEye"><img src={require('assets/virtual_images/eye2.png')} alt="" title="" /> <span>Hidden</span> </a>
                                            <a className="hideDots"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a>
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
                                            <a><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" />
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
        );
    }
}
export default Index