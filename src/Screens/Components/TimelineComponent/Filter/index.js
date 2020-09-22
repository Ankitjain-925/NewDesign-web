import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en_json_proofread_13072020.json"
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
        let translate;
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            // case "de":
            //     translate = translationDE.text
            //     break;
            // case "pt":
            //     translate = translationPT.text
            //     break;
            // case "sp":
            //     translate = translationSP.text
            //     break;
            // case "rs":
            //     translate = translationRS.text
            //     break;
            // case "nl":
            //     translate = translationNL.text
            //     break;
            // case "ch":
            //     translate = translationCH.text
            //     break;
            // case "sw":
            //     translate = translationSW.text
            //     break;
            case "default":
                translate = translationEN.text
        }
        let { all_time, doc_all, sort_by, type_2, facility_all, clear_filter, dig_time, entry_time, feeling, date, time,
         } = translate
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
                                    placeholder={all_time}
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
                                    placeholder={type_2}
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
                                    placeholder={doc_all}
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
                                    placeholder={facility_all}
                                    className="allTimeSel comonSel"
                                //isMulti= {true}
                                //isSearchable = {false}
                                />
                            </Grid>
                            <Grid item xs={12} md={2} className="clear_filter">
                                <Grid className="clear_filterUpr">
                                    <Grid className="clear_filterLft"><a>{clear_filter}</a></Grid>
                                    <Grid className="clear_filterRght"><a><img src={require('../../../../assets/images/clearSrch.jpg')} alt="" title="" /></a></Grid>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="sortBySec">
                            <label>{sort_by}:</label>
                            <input type="text" placeholder={entry_time} className="entrTimeBY" />
                            <input type="text" placeholder={dig_time} className="diagTimeBY" />
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
