import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Grid";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            room_number: this.props.room_number,
            bed_number: this.props.bed_number
        }
    }

    render() {
        return (
            <>
                <Grid className="wardListSec">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={8} md={6}>
                            <Grid className="wrdCollect">
                                <Grid><label>{this.state.label}</label></Grid>
                                <Grid className="wrdEdtDel">
                                    <Grid>
                                        <img src={require('assets/virtual_images/room.svg')} alt="" title="" />
                                        <span>{this.state.room_number}</span>
                                    </Grid>
                                    <Grid>
                                        <img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                        <span>{this.state.bed_number}</span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} md={6}>
                            <Grid className="wrdEdtDelBtn">
                                <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                <Button onClick={()=>this.props.removeWard(this.props.index)}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
           </>
        );
    }
}
export default Index;