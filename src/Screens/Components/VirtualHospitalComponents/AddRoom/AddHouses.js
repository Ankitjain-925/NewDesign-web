import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomArray: this.props.roomArray || [],
            label: this.props.label,
            name: this.props.name,
            placeholder: this.props.placeholder
        }
    }

    onDataChange = (e, index) => {
        var RoomAy = this.state.roomArray;
        if (this.props.comesFrom === "admin") {
            RoomAy[index][e.target.name] = e.target.value;
        }
        else {
            RoomAy[index] = e.target.value;
        }
        this.setState({ roomArray: RoomAy },
            this.props.onChange(this.state.roomArray))
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.roomArray !== this.props.roomArray || prevProps.label !== this.props.label || prevProps.name !== this.props.name) {
            this.setState({
                roomArray: this.props.roomArray, label: this.props.label,
                name: this.props.name,
            });
        }
    };

    onAddFiled = () => {
        let RoomAy = this.state.roomArray;
        var date = new Date();
        if (this.props.comesFrom === "admin") {
            RoomAy.push({ house_name: "", house_id: `${this.props.institute_id}-${date.getTime()}` });
        }
        else {
            RoomAy.push('');
        }
        this.setState({ roomArray: RoomAy });
    };

    deleteRooms = (index) => {
        var RoomAy = this.state.roomArray?.length > 0 && this.state.roomArray.filter((data, index1) => index1 !== index);
        this.setState({ roomArray: RoomAy }, () => {
            this.props.onChange(this.state.roomArray)
        });

    };


    render() {
        return (
            <Grid className="roomName-h">
                {this.state.timeArr && this.state.timeArr.length == 0 && (
                    <Grid container direction="row" alignItems="center" spacing={2}>

                        <Grid item xs={10} md={10}>
                            <Grid><label>{this.state.label}</label></Grid>
                            {this.props.comesFrom === "admin" ?
                                <input
                                    type="text" placeholder={this.state.placeholder}
                                    onChange={(e) => { this.onDataChange(e, 0) }}
                                    name={this.state.name}
                                    value={this.state.roomArray[0]?.house_name}
                                />
                                : <input
                                    type="text" placeholder={this.state.placeholder}
                                    onChange={(e) => { this.onDataChange(e, 0) }}
                                    name={this.state.name}
                                    value={this.state.roomArray[0]}
                                />
                            }
                        </Grid>
                        <Grid item xs={2} md={2} className="roomRmv">
                            <a onClick={() => this.deleteRooms(0)}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                        </Grid>
                    </Grid>
                )}
                {this.state.roomArray && this.state.roomArray.length > 0 && this.state.roomArray.map((data, index) => (
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item xs={10} md={10}>
                            {this.props.comesFrom === 'questionaire' && <Grid className = "labelChoice"><label>Choice {index + 1}</label></Grid>}
                            {this.props.comesFrom === "admin" ?
                                <input
                                    type="text"
                                    placeholder={this.props.comesFrom === 'questionaire' ? `Enter choice ${index + 1}` : this.state.placeholder}
                                    name={this.state.name}
                                    onChange={(e) => this.onDataChange(e, index)}
                                    value={data.house_name}
                                />
                                : <input
                                    type="text"
                                    placeholder={this.props.comesFrom === 'questionaire' ? `Enter choice ${index + 1}` : this.state.placeholder}
                                    onChange={(e) => { this.onDataChange(e, index) }}
                                    name={this.state.name}
                                    value={this.state.roomArray[index]}
                                />
                            }
                        </Grid>

                        <Grid item xs={2} md={2} className="roomRmv">
                            <a onClick={() => this.deleteRooms(index)}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                        </Grid>
                    </Grid>))}
                <Grid className="add_a_room"><a onClick={this.onAddFiled}>+ {this.state.label}</a></Grid>
            </Grid>
        );
    }
}
export default Index;


