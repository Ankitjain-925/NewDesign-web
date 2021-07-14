import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            rooms: this.props.rooms,
            beds: this.props.beds,
            available: this.props.available,
        };
    }




    render() {
        return (
            <Grid>
                <Grid className="roomsNum2">
                    <ul>
                        <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />{this.state.label}</li>
                        <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />{this.state.rooms} rooms</li>
                        <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                            {this.state.beds} beds<span>{this.state.available} available</span>
                        </li>
                    </ul>
                </Grid>

            </Grid>
        )
    }
}
export default Index;