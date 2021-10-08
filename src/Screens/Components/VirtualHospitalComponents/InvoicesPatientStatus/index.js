import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";

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
        console.log("updateTrack",this.state.updateTrack)
        const state = this.state.updateTrack;
        state[name] = e.target.value;
        this.setState({ updateTrack: state });
    };

    render() {
        return (
            <>
                <Grid className="invoiceForm">
                    <Grid container direction="row" alignItems="center" spacing={3}>
                        <Grid item xs={12} md={3} className="invoiceID">
                            {/* <label>Invoice ID</label> */}
                            {/* <TextField placeholder="Invoice ID" value="548756" /> */}
                            <Grid>
                                <VHfield
                                    label="Invoice ID"
                                    name="invoice_id"
                                    placeholder="Invoice ID"
                                    onChange={(e) =>
                                        this.updateEntryState1(e, "invoice_id")
                                    }
                                    // value={this.state.updateTrack.title}
                                />
                            </Grid>

                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <label>Patient</label>
                            <Grid className="patntDropUpr">
                                <Grid className="patntDropDwn">
                                    <Grid className="patntImg"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Grid>
                                    <Grid>
                                        <label>{this.state.label}</label>
                                        <p>{this.state.case_id}</p>
                                    </Grid>
                                    <Grid className="patntRmv"><img src={require('assets/virtual_images/remove-3.svg')} alt="" title="" /></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <label>Status</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.options}
                                placeholder="Draft"
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