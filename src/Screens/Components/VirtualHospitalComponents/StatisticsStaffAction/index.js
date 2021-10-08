import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {
    getLanguage
  } from "translations/index"

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // label: this.props.label,
            // name: this.props.name,   }
        }
    }
    
    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let {Lastmonth } = translate;
        return (
            <>
                <Grid className="modeChngUpr">
                    <Grid className="staffAction">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={12} md={5}><h3>Staff actions</h3></Grid>
                            <Grid item xs={12} md={7}>
                                <Grid className="staffLastMnth">
                                    <label>{Lastmonth}</label>
                                    <a>3m</a>
                                    <a>6m</a>
                                    <a>1y</a>
                                    <a>All</a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="row">
                        <Grid className="modeChng">
                            <Grid><a><img src={require('assets/virtual_images/user-clipboard.svg')} alt="" title="" /></a></Grid>
                            <Grid>
                                <label>34</label>
                                <p>Diagnoses made</p>
                            </Grid>
                        </Grid>
                        <Grid className="modeChng">
                            <Grid><a><img src={require('assets/virtual_images/user-clipboard.svg')} alt="" title="" /></a></Grid>
                            <Grid>
                                <label>72</label>
                                <p>Medication administered</p>
                            </Grid>
                        </Grid>
                        <Grid className="modeChng">
                            <Grid><a><img src={require('assets/virtual_images/user-clipboard.svg')} alt="" title="" /></a></Grid>
                            <Grid>
                                <label>42</label>
                                <p>Prescriptions issued</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Index;