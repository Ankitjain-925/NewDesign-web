import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import {
    getLanguage
} from "translations/index"

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomArray: this.props.roomArray || [],
        }
    }

    onDataChange = (e, index) => {
        var RoomAy = this.state.roomArray;
        RoomAy[index][e.target.name] = e.target.value;
        this.setState({ roomArray: RoomAy },
            () => this.props.onChange(this.state.roomArray))
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.roomArray !== this.props.roomArray) {
            this.setState({ roomArray: this.props.roomArray });
        }
    };

    onAddFiled = () => {
        let RoomAy = this.state.roomArray;
        RoomAy.push({ room_name: "", no_of_bed: false });
        this.setState({ roomArray: RoomAy });
    };

    deleteRooms = (index) => {
        var RoomAy = this.state.roomArray?.length > 0 && this.state.roomArray.filter((data, index1) => index1 !== index);
        this.setState({ roomArray: RoomAy },
            () => {
                this.props.onChange(this.state.roomArray)
            });
    };

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { Roomname, Bedsinroom, AddRoom,Enter_room_name } = translate;
        return (
            <Grid className="roomName">
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item xs={7} md={7}>
                        <Grid><label>{Roomname}</label></Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid><label>{Bedsinroom}</label></Grid>
                    </Grid>
                </Grid>
                {/* {this.state.roomArray && this.state.roomArray.length == 0 && (
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item xs={7} md={7}>
                            <input
                                placeholder="Enter room name"
                                type="text" placeholder={this.state.placeholder}
                                onChange={(e) => { this.onDataChange(e, 0) }}
                                name="room_name"
                                value={this.state.roomArray[0]?.room_name}
                            />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <input
                                placeholder="0"
                                type="number" placeholder={this.state.placeholder}
                                onChange={(e) => { this.onDataChange(e, 0) }}
                                name="no_of_bed"
                                value={this.state.roomArray[0]?.no_of_bed}
                            />
                        </Grid>
                        <Grid item xs={2} md={2} className="roomRmv">
                            <a onClick={() => this.deleteRooms(0)}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                        </Grid>
                    </Grid>
                )} */}
                {this.state.roomArray && this.state.roomArray.length > 0 && this.state.roomArray.map((data, index) => (
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item xs={7} md={7}>
                            <input
                                type="text" placeholder={Enter_room_name}
                                name="room_name"
                                onChange={(e) => this.onDataChange(e, index)}
                                value={data.room_name}
                            />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <input
                                type="number" placeholder={0}
                                name="no_of_bed"
                                value={data.no_of_bed}
                                onChange={(e) => this.onDataChange(e, index)}
                            />
                        </Grid>
                        <Grid item xs={2} md={2} className="roomRmv">
                            <a onClick={() => this.deleteRooms(index)}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                        </Grid>
                    </Grid>))}
                <Grid className="add_a_room"><a onClick={this.onAddFiled}>{AddRoom}</a></Grid>
            </Grid>
        );
    }
}
export default Index;


