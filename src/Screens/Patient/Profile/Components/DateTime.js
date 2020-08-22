import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from '../../../../sitedata';
import axios from 'axios';
import Loader from './../../../Components/Loader/index';
import Select from 'react-select';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Current_state : this.props.LoggedInUser,
            Format : {},
            dates : [{label: "DD/MM/YYYY", value : "DD/MM/YYYY" }, {label : "MM/DD/YYYY", value : "MM/DD/YYYY"},{label : "YYYY/DD/MM", value : "YYYY/DD/MM"}],
            times : [{label : "11:10 PM" , value : "11:10 PM"}, {label : "13:10", value : "13:10"}],
            loaderImage : false,
            PassDone : false,
            dateF : {label : this.props.LoggedInUser.date_format, value : this.props.LoggedInUser.date_format},
            timeF : {label : this.props.LoggedInUser.time_format, value : this.props.LoggedInUser.time_format},
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount = ()=>{

    }

    //For Change Format State
    ChangeFormat=(event, name)=>{
        if(name=='date_format') { this.setState({dateF : event}) }
        else { this.setState({timeF : event}) }
        const state = this.state.Format;
        state[name] = event && event.value;
        this.setState({Format : state})
    }

    //For Set Format
    SetFormat=()=>{
        this.setState({ loaderImage: true})
        axios.put(sitedata.data.path + '/UserProfile/Users/update', {
            date_format: this.state.Format.date_format,
            time_format: this.state.Format.time_format,
        }, {
            headers: {
                'token': this.props.user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((responce) => {
            this.setState({PassDone : true, loaderImage : false})
            setTimeout(()=>{ this.setState({PassDone: false}) }, 5000)
        })   
    }

    render() {

        return (
            <div>
                 {this.state.loaderImage && <Loader />}
                 {this.state.PassDone && <div className="success_message">The Format is updated</div>}
                <Grid>
                    <Grid className="datTimFrmt">
                        <h5>Date & Time format</h5>
                        <p>Set the default date & time format</p>
                    </Grid>

                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Grid className="dateFormat">
                                <Grid><label>Date format</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.dateF}
                                        onChange={(e) => this.ChangeFormat(e, 'date_format')}
                                        options={this.state.dates}
                                        placeholder="Date format"
                                        name="date_format"
                                        isSearchable={false}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="timeFormat">
                                <Grid><label>Time format</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.timeF}
                                        onChange={(e) => this.ChangeFormat(e, 'time_format')}
                                        options={this.state.times}
                                        placeholder="Time format"
                                        name="time_format"
                                        isSearchable={false}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>

                            <Grid className="timDatSubmit">
                                <input type="submit" onClick={this.SetFormat} value="Save changes" />
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

export default Index;