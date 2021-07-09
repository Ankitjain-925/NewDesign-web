import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Grid";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.data || {},
            adultsward: this.props.name,
            label: this.props.label,
            name: this.props.name,
        }
    }




    render() {
        var item = this.state.item;
        return (

            <Grid>
                <Grid className="addWardsRoom">
                    <Grid className="wardListSec">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={8} md={6}>
                                <Grid className="wrdCollect">
                                    <Grid><label>{this.state.label}</label></Grid>
                                    <Grid className="wrdEdtDel">
                                        <Grid>
                                            <img src={require('assets/virtual_images/room.svg')} alt="" title="" />
                                            <span>{item.room_name}</span>
                                        </Grid>
                                        <Grid>
                                            <img src={require('assets/virtual_images/room.svg')} alt="" title="" />
                                            <span>{item.bed_number}</span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} md={6}>
                                <Grid className="wrdEdtDelBtn">
                                    <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                    <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="addNwWard"><label>+ Add a Ward</label></Grid>
            </Grid>



        );
    }
}
export default Index;