import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const Useroptions = [
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Patient', label: 'Patient' },
    { value: 'Nurse', label: 'Nurse' },
];
const Typeoptions= [
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
    { value: 'smoking_status', label: 'Somking Status' },
    { value: 'vaccination', label: 'Vaccination' },
    { value: 'weight_bmi', label: 'Weight & BMI' },
]
const options= [
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
            selectUser : [],
            selectType : [],
            selectFacility : [],
            time_range:[],
        };
    }

    //Call filter props
    OnChangeFilter=()=>{
        this.props.FilterData(this.state.time_range, this.state.selectUser, this.state.selectType, this.state.selectFacility)
    }
    //Change the state in change the data
    FilterAccordigly=(name, value)=>{
        if(name==='time_range'){ this.setState({time_range : value},()=>{ this.OnChangeFilter(); })}
        if(name==='selectUser'){ this.setState({selectUser : value},()=>{ this.OnChangeFilter(); })}
        if(name==='selectType'){ this.setState({selectType : value},()=>{ this.OnChangeFilter(); })}
        if(name==='selectFacility'){ this.setState({selectFacility : value},()=>{ this.OnChangeFilter();})}
    }
    //For clear Filter 
    ClearData= ()=>{
        this.setState({ selectUser : [], selectType : [], selectFacility : [], time_range:[],});
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
        return (
            <Grid container direction="row">
                <Grid item xs={12} md={11}>
                    <Grid className="srchFilter">
                        <Grid container direction="row">
                            <Grid item xs={12} md={4}>
                                <RangePicker 
                                    className={this.state.time_range && this.state.time_range.length>0 ? "typeSel1 comonSel" : "allTimeSel1 comonSel"}
                                    onChange={(value)=>this.FilterAccordigly("time_range", value)}
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
                            <Grid item xs={12} md={2}>
                                <Select
                                    value={this.state.selectType}
                                    onChange={(value)=>this.FilterAccordigly("selectType", value)}
                                    options={Typeoptions}
                                    placeholder="Type"
                                    name=""
                                    className={this.state.selectType && this.state.selectType.length>0 ? "typeSel comonSel" : "allTimeSel comonSel"}
                                    isMulti= {true}
                                    closeMenuOnSelect={false}
                                //isSearchable = {false}
                                />
                            </Grid>
                            <Grid item xs={12} md={3} 
                                // className="faclity_all"
                            >
                                <Select
                                    value={this.state.selectUser}
                                    onChange={(value)=>this.FilterAccordigly("selectUser", value)}
                                    options={Useroptions}
                                    placeholder="User Type :All"
                                    className={this.state.selectUser && this.state.selectUser.length>0 ? "typeSel comonSel" : "allTimeSel comonSel"}
                                    isMulti= {true}
                                    closeMenuOnSelect={false}
                                //isSearchable = {false}s
                                />
                            </Grid>
                            <Grid item xs={12} md={1} 
                            // className="faclity_all"
                            >
                                {/* <Select
                                    value={this.state.selectFacility}
                                     onChange={(value)=>this.FilterAccordigly("selectFacility", value)}
                                    options={options}
                                    placeholder="Facility: All"
                                    className="allTimeSel comonSel"
                                    isMulti= {true}
                                    closeMenuOnSelect={false}
                                   // isSearchable = {false}
                                /> */}
                            </Grid>
                            <Grid item xs={12} md={2} 
                            // className="clear_filter"
                            >
                                <Grid className="clear_filterUpr">
                                    <Grid className="clear_filterLft"><a onClick={this.ClearData}>Clear filters</a></Grid>
                                    <Grid className="clear_filterRght"><a><img src={require('../../../../assets/images/clearSrch.jpg')} alt="" title="" /></a></Grid>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="sortBySec">
                            <label>Sort by:</label>
                            <input type="button" value="Entry time" onClick={()=>{this.props.SortData('entry_time')}} className={this.state.sortBy === 'entry_time' ?"entrTimeBY" : "diagTimeBY" } />
                            <input type="button" value="Diagnosis time" onClick={()=>{this.props.SortData('diagnosed_time')}} className={this.state.sortBy === 'diagnosed_time' ?"entrTimeBY" : "diagTimeBY" }/>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default FilterSec;