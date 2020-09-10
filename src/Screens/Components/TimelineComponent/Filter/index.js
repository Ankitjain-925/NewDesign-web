import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';

const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];

class FilterSec extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
            openDash: this.props.openDash,

        };
    }

    //For close the pop up
    handleCloseEntry = () => {
        this.props.handleCloseEntry();
    }
    // For set the value for the new entry
    handleChangeEntry = (value) => {
        this.props.onChange(value);
        this.props.handleCloseEntry();
    }
    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.openDash !== this.props.openDash) {
            this.setState({ openDash: this.props.openDash })
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
                            <Grid item xs={12} md={2}>
                                <Select
                                    value={this.state.selectedOption}
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
                                    value={this.state.selectedOption}
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
                                    value={this.state.selectedOption}
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
                                    value={this.state.selectedOption}
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
                                    <Grid className="clear_filterRght"><a><img src={require('../../../../assets/images/clearSrch.jpg')} alt="" title="" /></a></Grid>
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
        )
    }
}

export default FilterSec;