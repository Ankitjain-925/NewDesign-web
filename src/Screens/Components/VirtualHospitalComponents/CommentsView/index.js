import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from '@material-ui/core';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            text: this.props.text,
            url: this.props.url,
        }
    }

    render() {
        return (

            <Grid className="cmntMsgs">
                <Grid><img src={this.state.url} alt="" title="" /></Grid>
                <Grid>
                    <Grid><label>{this.state.label}</label><span>7 Feb at 12:38</span></Grid>
                    <Grid className="cmntMsgsCntnt"><p>{this.state.text}</p></Grid>
                    <Grid>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}
export default Index;