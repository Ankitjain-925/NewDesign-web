import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {
        return (
            <>
                <Grid item xs={12} md={3}>
                    <Grid className="staticsAmt">
                        <Grid><a><img src={require('assets/virtual_images/hotel-bed-2.svg')} alt="" title="" /></a></Grid>
                        <Grid><label>1,845</label><p>Total Patients</p></Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default Index;


