import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from '@material-ui/core';
import { getLanguage } from "translations/index";


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
        let translate = getLanguage(this.props.stateLanguageType)
        let { sevenFebat1238, edit, Delete } = translate;
        return (

            <Grid className="cmntMsgs">
                <Grid><img src={this.state.url} alt="" title="" /></Grid>
                <Grid>
                    <Grid><label>{this.state.label}</label><span>{sevenFebat1238}</span></Grid>
                    <Grid className="cmntMsgsCntnt"><p>{this.state.text}</p></Grid>
                    <Grid>
                        <Button>{edit}</Button>
                        <Button>{Delete}</Button>
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}
export default Index;