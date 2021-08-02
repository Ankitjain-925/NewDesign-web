import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            value: this.props.value,
        }
    }

    render() {
        return (
            <>
                <Grid className="patntFlow">
                    <p>{this.state.label}</p>
                    <Grid className="patntFlowIner">
                        {this.state.value?.length > 0 && this.state.value?.map((data1) => (
                            <>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={8} md={8}><label>{data1.label}</label></Grid>
                                    <Grid item xs={4} md={4}><span>{data1.value}</span></Grid>
                                </Grid>
                            </>
                        ))}
                        {/* <Grid container direction="row" alignItems="center">
                            <Grid item xs={8} md={8}><label>Waiting Rooms</label></Grid>
                            <Grid item xs={4} md={4}><span>16</span></Grid>
                        </Grid>
                  <Grid container direction="row" alignItems="center">
                            <Grid item xs={8} md={8}><label>Waiting Rooms</label></Grid>
                            <Grid item xs={4} md={4}><span>16</span></Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" className="patntFlowLast">
                            <Grid item xs={8} md={8}><label>Billing</label></Grid>
                            <Grid item xs={4} md={4}><span>0</span></Grid>
                        </Grid> */}
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default Index;

