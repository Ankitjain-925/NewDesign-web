import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomArray: this.props.roomArray || [
                { room_name: "", bed_number: "" }
            ],
            label: this.props.label,
            name: this.props.name,
        }
    }



    onDataChange = (e, index) => {
        console.log('index', index);
        var RoomAy = this.state.roomArray;
        RoomAy[index][e.target.name] = e.target.value;
        this.setState({ roomArray: RoomAy },
            this.props.onChange(this.state.roomArray))
       
    }



    onAddFiled = () => {
        let RoomAy = this.state.roomArray;
        if (RoomAy && RoomAy.length > 0) {
            RoomAy.push({ room_name: "", bed_number: "" });
        } else {
            RoomAy.push(
                { room_name: "", bed_number: "" },
                { room_name: "", bed_number: "" }
            );
        }
        this.setState({ roomArray: RoomAy });
    };

    // deleteRooms = (data,index) => {
    //     var roomArray = [...this.state.data]; // make a separate copy of the array
    //     var RoomAy = roomArray.indexOf(data)
    //     if (index !== -1) {
    //         roomArray.splice(index, 1);
    //       this.setState({ roomArray: RoomAy });
    //     }}



    deleteRooms = (index) => {
        console.log('index', index)
        var RoomAy = this.state.roomArray;
        // newData.splice(index, 1);
        RoomAy.splice(index, 1);
        this.setState({ roomArray: RoomAy });
    };




    render() {
        return (

            <Grid className="roomName">
                {this.state.roomArray && this.state.roomArray.length > 0 && this.state.roomArray.map((data, index) => (
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item xs={7} md={7}>
                            <input
                                type="text" placeholder={this.state.placeholder}
                                onChange={(e) => { this.onDataChange(e, index) }}
                                name="room_name"
                                value={this.state.value}
                            />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <input
                                type="number" placeholder={this.state.placeholder}
                                onChange={(e) => { this.onDataChange(e, index) }}
                                name="bed_number"
                                value={this.state.value}
                            />
                        </Grid>
                        <Grid item xs={2} md={2} className="roomRmv">
                            <a onClick={() => this.deleteRooms(index)}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                        </Grid>
                    </Grid>))}
                <Grid className="add_a_room"><a onClick={this.onAddFiled}>+ add a Room</a></Grid>
            </Grid>




        );
    }
}
export default Index;


