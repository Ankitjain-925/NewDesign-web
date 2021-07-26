import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Grid";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            color: this.props.color,
            backgroundColor: this.props.backgroundColor
        };
    }


    render() {

        return (
            <Grid className="wardsGrup">
                <Grid className="spcMgntUpr">
                    <Grid container direction="row">
                        <Grid item xs={6} md={6} className="specialitybutton-parent">
                            <Button className="specialitybutton"
                             style={{
                                        color: this.state.color,
                                        backgroundColor: this.state.backgroundColor
                                 }} variant="contained">{this.state.label}</Button>
                        </Grid>
                        {this.props.viewImage &&
                            <Grid item xs={6} md={6} className="spcMgntRght3">
                                <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
export default Index;