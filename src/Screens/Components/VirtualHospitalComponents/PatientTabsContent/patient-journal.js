import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import Select from 'react-select';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { getLanguage } from 'translations/index';

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
        let translate = getLanguage(this.props.stateLanguageType)
        let { date_time, journal, addNewEntry, clear_filters, twenty1, sortBy, May, diagnosis, feeling, relaxed, eighty, RR_diastolic, twenty1May2020803AM, heart_rate,
            visible, visible_until, MarkAndersonMDDoctor, IllinoisMasonicMedicalCenter, TraveledToAfrica, Yes, sixfebTo26feb, IMG_23_6_2020_09_18, No_name_filePDf,
            twelve082020, depression, ICD_F32, mild_depresive_episode, DiagnosedBy, MarkAndersonMD, allergy, No, DiagnosedOn, twenty052020, TravelDiagnosis, pain_quality, BurningStabbing,
            ParagraphOfChronicDemyelination, mmHg, JamesMorrisonPatient, rr_systolic, Normal, one2180, one21, blood_pressure, condition_pain, one23,
            diary, diary_note, Hidden, KneePain, Acute, pain_areas, pain_intensity, Moderate42, condition_h_r_u, eighty3, pain_type, view_fullscren,
            Only_field_in_diary_entry_type, Wysiwyg_editor_allow_us_simple_formatting, ParagraphExample, simple_title, Bullet1, Bullet2, Bullet3 } = translate;
        return (
            <Grid>
                <Grid className="journalAdd">
                    <Grid container direction="row">
                        <Grid item xs={12} md={11}>
                            <Grid container direction="row">
                                <Grid item xs={12} md={6} sm={6}>
                                    <h1>{journal}</h1>
                                </Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    <Grid className="AddEntrynw">
                                        <a>{addNewEntry}</a>
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
                                        <Grid className="clear_filterLft"><a>{clear_filters}</a></Grid>
                                        <Grid className="clear_filterRght"><a><img src={require('assets/virtual_images/clearSrch.jpg')} alt="" title="" /></a></Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="clear"></Grid>
                            </Grid>
                            <Grid className="sortBySec">
                                <label>{sortBy}</label>
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
                            <a>{twenty1} <span>{May}</span></a>
                        </Grid>
                        <Grid item xs={12} md={10} className="descpCntntRght">
                            <Grid className="descpInerRght">
                                <Grid container direction="row" className="addSpc">
                                    <Grid item xs={6} md={6}>
                                        <Grid className="diagnosImg">
                                            <a className="diagnosNote"><img src={require('assets/virtual_images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>{diagnosis}</span> </a>
                                            <a className="diagnosAwrd"><img src={require('assets/virtual_images/confirmed-diagnosis.svg')} alt="" title="" /></a>
                                            <a className="diagnosBus"><img src={require('assets/virtual_images/emergency-diagnosis.svg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="vsblSec">
                                            <a className="vsblEye"><img src={require('assets/virtual_images/eye2.png')} alt="" title="" /> <span>{visible}</span> </a>
                                            <a className="vsblTime" data-tip data-for="timeIconTip">
                                                <img src={require('assets/virtual_images/clock.svg')} alt="" title="" />
                                            </a>
                                            <ReactTooltip className="timeIconClas" id="timeIconTip" place="top" effect="solid" backgroundColor="#ffffff">
                                                <label>{visible_until}</label>
                                                <p>{twelve082020}</p>
                                            </ReactTooltip>
                                            <a className="vsblDots"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                                <Grid className="icd_num addSpc">
                                    <label>{depression}</label>
                                    <a data-tip data-for="icdtxtTip">{ICD_F32}</a>
                                    <ReactTooltip className="icdtxtClas" id="icdtxtTip" place="top" effect="solid" backgroundColor="#ffffff">
                                        <h4>{mild_depresive_episode}</h4>
                                    </ReactTooltip>
                                </Grid>
                                <Grid container direction="row" className="addSpc markCntntMain">
                                    <Grid item xs={12} md={5}>
                                        <Grid className="markCntntImg">
                                            <a><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" />
                                                <span>{MarkAndersonMDDoctor}</span>
                                            </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Grid className="markMDCntntImg">
                                            <a><img src={require('assets/virtual_images/hLogo.jpg')} alt="" title="" />
                                                <span>{IllinoisMasonicMedicalCenter}</span>
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
                                                        <Grid item xs={5} md={5}><label>{DiagnosedBy}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{MarkAndersonMD}.</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="diagnoBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>{allergy}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{No}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="diagnoBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>{DiagnosedOn}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{twenty052020}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="diagnoBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>{TravelDiagnosis}</label></Grid>
                                                        <Grid item xs={7} md={7}>
                                                            <span>{Yes}</span>
                                                            <a className="yesInfo" data-tip data-for="yesInfoTip">
                                                                <img src={require('assets/virtual_images/yesinfo.jpg')} alt="" title="" />
                                                            </a>
                                                            <ReactTooltip className="yesInfoClas" id="yesInfoTip" place="top" effect="solid" backgroundColor="#ffffff">
                                                                <h4>{TraveledToAfrica}</h4>
                                                                <p>{sixfebTo26feb}</p>
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
                                                {ParagraphOfChronicDemyelination}
                                            </p>
                                        </Grid>
                                    </Collapsible>
                                </Grid>
                                <Grid className="addSpc detailMark">
                                    <Collapsible trigger="Images & Files" open="true">
                                        <Grid className="imgsFile">
                                            <a><img src={require('assets/virtual_images/agedman.png')} alt="" title="" />
                                                <label>{IMG_23_6_2020_09_18}</label></a>
                                            <a><img src={require('assets/virtual_images/pdfimg.png')} alt="" title="" />
                                                <label>{No_name_filePDf}</label></a>
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
                            <a>{twenty1} <span>{May}</span></a>
                        </Grid>
                        <Grid item xs={12} md={10} className="descpCntntRght">
                            <Grid className="descpInerRght">
                                <Grid container direction="row" className="addSpc">
                                    <Grid item xs={6} md={6}>
                                        <Grid className="conPainImg">
                                            <a className="conPainNote"><img src={require('assets/virtual_images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>{condition_pain}</span> </a>
                                            <a className="conPainAwrd"><img src={require('assets/virtual_images/confirmed-diagnosis.svg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="conPainSec">
                                            <a className="conPainEye"><img src={require('assets/virtual_images/eye2.png')} alt="" title="" /> <span>{Hidden}</span> </a>
                                            <a className="conPainDots"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                                <Grid className="conPain_num addSpc">
                                    <label>{KneePain}</label>
                                    <p>{Acute}</p>
                                </Grid>
                                <Grid container direction="row" className="addSpc conPain_Cntnt">
                                    <Grid item xs={12} md={5}>
                                        <Grid className="conPain_Img">
                                            <a><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" />
                                                <span>{MarkAndersonMDDoctor}</span>
                                            </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Grid className="conPain_MDCImg">
                                            <a><img src={require('assets/virtual_images/hLogo.jpg')} alt="" title="" />
                                                <span>{IllinoisMasonicMedicalCenter}</span>
                                            </a>
                                        </Grid>
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                                <Grid container direction="row" className="addSpc conPainGraph">
                                    <Grid item xs={12} md={5}>
                                        <Grid className="conPainLft">
                                            <Grid className="conPainArea"><label>{pain_areas}</label></Grid>
                                            <a><img src={require('assets/virtual_images/pat22.png')} alt="" title="" /></a>
                                            <a><img src={require('assets/virtual_images/patient-back.svg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Grid className="conPainRght">
                                            <Grid className="painIntencty">
                                                <Grid><label>{pain_intensity}</label></Grid>
                                                <Grid><a><img src={require('assets/virtual_images/pain.png')} alt="" title="" />{Moderate42}</a></Grid>
                                                <Grid> <input type="range" /></Grid>
                                            </Grid>
                                            <Grid className="condIntencty">
                                                <Grid><label>{condition_h_r_u}</label></Grid>
                                                <Grid><a><img src={require('assets/virtual_images/condition.png')} alt="" title="" />{eighty3}</a></Grid>
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
                                                        <Grid item xs={5} md={5}><label>{pain_type}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{Acute}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="painTypeBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>{pain_quality}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{BurningStabbing}</span></Grid>
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
                                                {ParagraphOfChronicDemyelination}
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
                            <a>{twenty1} <span>{May}</span></a>
                        </Grid>
                        <Grid item xs={12} md={10} className="descpCntntRght">
                            <Grid className="descpInerRght descpInerBlue">
                                <Grid container direction="row" className="addSpc">
                                    <Grid item xs={6} md={6}>
                                        <Grid className="blodPrsurImg">
                                            <a className="blodPrsurNote"><img src={require('assets/virtual_images/blood-pressure-sugar.svg')} alt="" title="" />
                                                <span>{blood_pressure}</span>
                                            </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="bp_vsblSec">
                                            <a className="bp_vsblEye"><img src={require('assets/virtual_images/eye2.png')} alt="" title="" /> <span>{visible}</span> </a>
                                            <a className="bp_vsblDots"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                                <Grid className="bp_hg addSpc">
                                    <label>{one2180} <span>{mmHg}</span></label>
                                    <p>{Normal}</p>
                                </Grid>
                                <Grid container direction="row" className="addSpc bpJohnMain">
                                    <Grid item xs={12} md={12}>
                                        <Grid className="bpJohnImg">
                                            <a><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" />
                                                <span>{JamesMorrisonPatient}</span>
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
                                                        <Grid item xs={5} md={5}><label>{rr_systolic}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{one21}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="bloodPreBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>{feeling}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{relaxed}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="bloodPreBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>{RR_diastolic}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{eighty}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="bloodPreBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>{date_time}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{twenty1May2020803AM}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="bloodPreBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>{heart_rate}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{one23}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                            <Grid className="bp_graph">
                                                <Grid><img src={require('assets/virtual_images/gp.png')} alt="" title="" /></Grid>
                                                <Grid><a>{view_fullscren}</a></Grid>
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
                            <a>{twenty1} <span>{May}</span></a>
                        </Grid>
                        <Grid item xs={12} md={10} className="descpCntntRght">
                            <Grid className="descpInerRght">
                                <Grid container direction="row" className="addSpc">
                                    <Grid item xs={6} md={6}>
                                        <Grid className="diryImg">
                                            <a className="diryNote"><img src={require('assets/virtual_images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" />
                                                <span>{diary}</span> </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="hideSec">
                                            <a className="hideEye"><img src={require('assets/virtual_images/eye2.png')} alt="" title="" /> <span>{Hidden}</span> </a>
                                            <a className="hideDots"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                                <Grid className="diryNotes_hedng addSpc">
                                    <label>{diary_note}</label>
                                </Grid>
                                <Grid container direction="row" className="addSpc diryCntntMain">
                                    <Grid item xs={12} md={12}>
                                        <Grid className="diryCntntImg">
                                            <a><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" />
                                                <span>{JamesMorrisonPatient}</span>
                                            </a>
                                        </Grid>
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                                <Grid className="addSpc detailMark">
                                    <Collapsible trigger="Notes" open="true">
                                        <Grid className="diryCntntSec">
                                            <p>{Only_field_in_diary_entry_type}</p>
                                            <p><i>{Wysiwyg_editor_allow_us_simple_formatting}</i></p>
                                            <p>{ParagraphExample}</p>
                                            <h3>{{ simple_title }}</h3>
                                            <ul>
                                                <li><a>{Bullet1}</a></li>
                                                <li><a>{Bullet2}</a></li>
                                                <li><a>{Bullet3}</a></li>
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