import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { DatePicker } from 'antd';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en.json";
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/nl.json';
const { RangePicker } = DatePicker;

const Useroptions = [
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Patient', label: 'Patient' },
    { value: 'Nurse', label: 'Nurse' },
];
const Typeoptions = [
    { value: 'anamnesis', label: 'Anamnesis' },
    { value: 'blood_pressure', label: 'Blood Pressure' },
    { value: 'blood_sugar', label: 'Blood Sugar' },
    { value: 'condition_pain', label: 'Condition and Pain' },
    { value: 'covid_19', label: 'Covid-19 Diary' },
    { value: 'diagnosis', label: 'Diagnosis' },
    { value: 'diary', label: 'Diary' },
    { value: 'doctor_visit', label: 'Doctor Visit' },
    { value: 'family_anamnesis', label: 'Family Anamnesis' },
    { value: 'file_upload', label: 'Files Upload' },
    { value: 'hospitalization', label: 'Hospital Visit' },
    { value: 'laboratory_result', label: 'Laboratory Result' },
    { value: 'marcumar_pass', label: 'Marcumar pass' },
    { value: 'medication', label: 'Medication' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'second_opinion', label: 'Second Opinion' },
    { value: 'sick_certificate', label: 'Sick Certificate' },
    { value: 'smoking_status', label: 'Smoking Status' },
    { value: 'vaccination', label: 'Vaccination' },
    { value: 'weight_bmi', label: 'Weight & BMI' },
]
const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
]

class FilterSec extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
            sortBy: this.props.sortBy,
            selectUser: [],
            selectType: [],
            selectFacility: [],
            time_range: [],
            isTest: false,
        };
    }

    //Call filter props
    OnChangeFilter = () => {
        this.props.FilterData(this.state.time_range, this.state.selectUser, this.state.selectType, this.state.selectFacility)
    }

    handleChange = (search) => {
        this.setState({ searchText: search },
            () => {
                if (this.state.searchText === '') {
                    this.props.ClearData();
                }
                else {
                    this.props.FilterText(this.state.searchText)
                }
            })
    }
    //Change the state in change the data
    FilterAccordigly = (name, value) => {
        if (name === 'time_range') { this.setState({ time_range: value }, () => { this.OnChangeFilter(); }) }
        if (name === 'selectUser') { this.setState({ selectUser: value }, () => { this.OnChangeFilter(); }) }
        if (name === 'selectType') { this.setState({ selectType: value }, () => { this.OnChangeFilter(); }) }
        if (name === 'selectFacility') { this.setState({ selectFacility: value }, () => { this.OnChangeFilter(); }) }
    }
    //For clear Filter 
    ClearData = () => {
        this.setState({ selectUser: [], selectType: [], selectFacility: [], time_range: [], });
        this.props.ClearData();
    }
    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.sortBy !== this.props.sortBy) {
            this.setState({ sortBy: this.props.sortBy })
        }
    }
    componentDidMount = () => {

    }


    render() {
        let translate;
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "default":
                translate = translationEN.text
        }
        let { type, user_type_all, clear_filter, StartDate, EndDate, search_timeline, sort_by, dig_time, entry_time } = translate

        return (
            <Grid container direction="row">
                <Grid item xs={12} md={11}>
                    <Grid className="srchFilter 11">
                        {!this.state.isTest && <Grid container direction="row">
                            <Grid item xs={12} md={4}>
                                <RangePicker
                                placeholder= {[StartDate, EndDate]}
                                    className={this.state.time_range && this.state.time_range.length > 0 ? "typeSel1 comonSel" : "allTimeSel1 comonSel"}
                                    onChange={(value) => this.FilterAccordigly("time_range", value)}
                                    value={this.state.time_range}
                                />
                                {/* <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={options}
                                    placeholder="All time"
                                    className="allTimeSel comonSel"
                                    isMulti= {true}
                                    isSearchable={false}
                                    closeMenuOnSelect={false}
                                /> */}
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Select
                                    value={this.state.selectType}
                                    onChange={(value) => this.FilterAccordigly("selectType", value)}
                                    options={Typeoptions}
                                    placeholder={type}
                                    name=""
                                    className={this.state.selectType && this.state.selectType.length > 0 ? "typeSel comonSel" : "allTimeSel comonSel"}
                                    isMulti={true}
                                    closeMenuOnSelect={false}
                                //isSearchable = {false}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}
                            // className="faclity_all"
                            >
                                <Select
                                    value={this.state.selectUser}
                                    onChange={(value) => this.FilterAccordigly("selectUser", value)}
                                    options={Useroptions}
                                    placeholder={user_type_all}
                                    className={this.state.selectUser && this.state.selectUser.length > 0 ? "typeSel comonSel" : "allTimeSel comonSel"}
                                    isMulti={true}
                                    closeMenuOnSelect={false}
                                //isSearchable = {false}
                                />
                            </Grid>
                            {/* <Grid item xs={12} md={1}
                            // className="faclity_all"
                            >
                                <Select
                                    value={this.state.selectFacility}
                                     onChange={(value)=>this.FilterAccordigly("selectFacility", value)}
                                    options={options}
                                    placeholder="Facility: All"
                                    className="allTimeSel comonSel"
                                    isMulti= {true}
                                    closeMenuOnSelect={false}
                                   // isSearchable = {false}
                                />
                            </Grid> */}
                            <Grid item xs={12} md={4} lg={2}
                            // className="clear_filter"
                            >
                                <Grid className="clear_filterUpr">
                                    <Grid className="clear_filterLft"><a onClick={this.ClearData}>{clear_filter}</a></Grid>
                                    <Grid className="clear_filterRght" onClick={() => { this.setState({ isTest: true }) }}><a><img src={require('../../../../assets/images/clearSrch.jpg')} alt="" title="" /></a></Grid>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>

                        </Grid>}
                        {this.state.isTest &&
                            <Grid container direction="row">
                                <Grid item xs={12} md={11}>
                                    <input type="text" className="searchbyText" placeholder={search_timeline}
                                        value={this.state.searchText} onChange={e => this.handleChange(e.target.value)} />
                                </Grid>
                                <Grid item xs={12} md={1}>
                                    <Grid className="clear_filterUpr">
                                        <Grid className="trstCloseBtn" onClick={() => { this.setState({ isTest: false }); this.props.ClearData(); }}><a><img src={require('../../../../assets/images/close-search.svg')} alt="" title="" /></a></Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="clear"></Grid>

                            </Grid>
                        }

                        <Grid className="sortBySec">
                            <label>{sort_by}:</label>
                            <input type="button" value={entry_time} onClick={() => { this.props.SortData('entry_time') }} className={this.state.sortBy === 'entry_time' ? "entrTimeBY" : "diagTimeBY"} />
                            <input type="button" value={dig_time} onClick={() => { this.props.SortData('diagnosed_time') }} className={this.state.sortBy === 'diagnosed_time' ? "entrTimeBY" : "diagTimeBY"} />
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(FilterSec));
// export default FilterSec;