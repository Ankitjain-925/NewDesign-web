import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomArray: this.props.roomArray || [],
            label: this.props.label,
            name: this.props.name,
        }
    }

    onDataChange = (e, index) => {
        var RoomAy = this.state.roomArray;
        RoomAy[index][e.target.name] = e.target.value;
        this.setState({ roomArray: RoomAy },
            this.props.onChange(this.state.roomArray))
    }
    
    componentDidUpdate = (prevProps) => {
        if (prevProps.roomArray !== this.props.roomArray) {
            this.setState({ roomArray: this.props.roomArray });
        }
    };
 
    onAddFiled = () => {
        let RoomAy = this.state.roomArray;
        var date = new Date();
        RoomAy.push({ house_name: "", house_id: `600c15c2c983431790f904c3-${date.getTime()}` });
        this.setState({ roomArray: RoomAy });
    };

    deleteRooms = (index) => {
        var RoomAy = this.state.roomArray?.length>0 && this.state.roomArray.filter((data , index1)=>index1 !== index);
        this.setState({ roomArray: RoomAy });
    };

    render() {
        return (
            <Grid className="roomName">
                {this.state.timeArr && this.state.timeArr.length == 0 && (
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item xs={10} md={10}>
                            <input
                                type="text" placeholder={this.state.placeholder}
                                onChange={(e) => { this.onDataChange(e, 0) }}
                                name="house_name"
                                value={this.state.roomArray[0]?.house_name}
                            />
                        </Grid>
                        <Grid item xs={2} md={2} className="roomRmv">
                            <a onClick={() => this.deleteRooms(0)}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                        </Grid>
                    </Grid>
                )}
                {this.state.roomArray && this.state.roomArray.length > 0 && this.state.roomArray.map((data, index) => (
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item xs={10} md={10}>
                            <input
                                type="text" placeholder={this.state.placeholder}
                                name="house_name"
                                onChange={(e) => this.onDataChange(e, index)}
                                value={data.house_name}
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


