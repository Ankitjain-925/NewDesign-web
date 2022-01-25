import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import {
    getLanguage
} from "translations/index"
import OptionList from "reducers/optionList";


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options,
            label: this.props.label,
            case_id: this.props.case_id,
            selectedOption: null,
            updateTrack: {}
        }
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    updateEntryState1 = (e, name) => {
        const state = this.state.updateTrack;
        state[name] = e.target.value;
        this.setState({ updateTrack: state });
    };

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let { InvoiceID, Patient, Status } = translate;
        return (
            <>
                <Grid className="invoiceForm">
                    <Grid container direction="row" alignItems="center" spacing={3}>
                        <Grid item xs={12} md={3} className="invoiceID">
                            <label>{InvoiceID}</label>
                            <TextField placeholder={"Invoice ID"} value="548756" />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <label>{Patient}</label>
                            <Select
                                name="patient"
                                // onChange={(e) =>
                                //     this.updateEntryState3(e)}
                                // value={this.state.assignedTo}
                                options={this.state.options}
                                placeholder={"Search & Select"}
                                className="addStafSelect"
                                isMulti={true}
                                isSearchable={true} />
                            {/* <Grid className="patntDropUpr">
                                <Grid className="patntDropDwn">
                                    <Grid className="patntImg"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Grid>
                                    <Grid>
                                        <label>{this.state.label}</label>
                                        <p>{this.state.case_id}</p>
                                    </Grid>
                                    <Grid className="patntRmv"><img src={require('assets/virtual_images/remove-3.svg')} alt="" title="" /></Grid>
                                </Grid>
                            </Grid> */}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <label>{Status}</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                // options={option}
                                placeholder={"Draft"}
                                className="cstmSelect"
                                isSearchable={false}
                            // styles={customStyles}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Index;