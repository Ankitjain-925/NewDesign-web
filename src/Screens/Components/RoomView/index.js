import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Grid";
import VHfield from "Screens/Components/VHfield/index";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            RoomAy: this.props.roomArray || {},
            adultsward: this.props.name,
            label: this.props.label,
            name: this.props.name,
            openWard: false,
        }
    }


    // deleteWard = (index) => {
    //     console.log('index', index)
    //     var RoomAy = this.state.roomArray;
    //     RoomAy.splice(index, 1);
    //     this.setState({ roomArray: RoomAy });
    // };



    componentDidUpdate = (prevProps) => {
        if (
            prevProps.roomArray !== this.props.roomArray) {
            this.setState({
                RoomAy: this.props.roomArray,
            });
        }
    }

    handleOpenWard = () => {
        this.setState({ openWard: true });
      
    }


    // onDataChange = (e, index) => {
    //     console.log('index', index);
    //     var RoomAy = this.state.roomArray;
    //     RoomAy[index][e.target.name] = e.target.value;
    //     this.setState({ roomArray: RoomAy },
    //         this.props.onChange(this.state.roomArray))


    // }


    render() {
        var RoomAy = this.state.roomArray;
        var index = this.state.index;
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
                                            {/* <span>{ RoomAy.room_name}</span> */}
                                            {/* <span>{ RoomAy.room_name.label}</span> */}

                                        </Grid>
                                        <Grid>
                                            <img src={require('assets/virtual_images/room.svg')} alt="" title="" />
                                            {/* <span>{ RoomAy.bed_number}</span> */}
                                            {/* <span>{ RoomAy.bed_number.label}</span> */}

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
                {!this.state.openWard ?
                <Grid className="addNwWard"><label  onClick={this.handleOpenWard}>+ Add a Ward</label></Grid>

                :<Grid className="wrdsBtn" className="addWardsRoom" className="addWardsUpr"
                    className="addWardsIner" item xs={12} md={12}>
                    <VHfield
                        label="Ward"
                        name="ward_name"
                        placeholder="Adults Ward"
                        onChange={(e) => this.updateEntryState2(e)}
                    />
                </Grid>}
            </Grid>



        );
    }
}
export default Index;