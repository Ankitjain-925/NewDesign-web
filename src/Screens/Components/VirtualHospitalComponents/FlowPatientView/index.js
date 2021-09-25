import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            url: this.props.url,
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            profile_id: this.props.profile_id,
        }
    }



    render() {
        return (
            <>
                <Grid className="asignRghtUpr">
                    <Grid><label>{this.state.label}</label></Grid>
                    <Grid className="asignRght">
                        <Grid><img src={this.state.url}/></Grid>
                        <Grid><span>{this.state.first_name} {this.state.last_name}</span><p>{this.state.profile_id}</p></Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default Index;




