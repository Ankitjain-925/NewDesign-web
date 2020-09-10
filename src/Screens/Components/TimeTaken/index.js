import React, { Component } from 'react';
import {  TimePicker  } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Grid from '@material-ui/core/Grid';

class TimeTaken extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeArr: this.props.timeArray || [],
      is24: this.props.time_format,
      label: this.props.label,
      name: this.props.name,
    };
  }
  // On change the time of any index
  onTimeChange = (time, i) => {
    let tArray = this.state.timeArr;
    tArray[i] = { label: time, value: time, title: time };
    this.setState({ timeArr: tArray });
    this.props.onChange(tArray);
  };

  //On delete the time 
  deleteTimes = (index) => {
    let tArray = this.state.timeArr;
    tArray.splice(index, 1);
    this.setState({ timeArr: tArray });
  };

  //On add the new Time 
  onAddFiled = () => {
    let tArray = this.state.timeArr;
    tArray.push({ label: "", value: "", title: "" });

    this.setState({ timeArr: tArray });
  };

  componentDidMount = () => {

  }
  render() {
    return (
      <div>
        <Grid className="rrSysto consumeAt">
        <Grid><label>{this.state.label}</label></Grid>
        {this.state.timeArr && this.state.timeArr.length == 0 && <div> <Grid>
        {this.state.is24 === '24' ? <TimePicker className="Medicationtime" onChange={(e) => { this.onTimeChange(e, 0) }} format="HH:mm" />
            : <TimePicker className="Medicationtime" use12Hours onChange={(e) => { this.onTimeChange(e, 0) }} format="h:mm a" />}
        </Grid>
        <p onClick={this.onAddFiled}>+ add entry</p>
         </div>}
         
         {this.state.timeArr && this.state.timeArr.length > 0 &&
          this.state.timeArr.map((itm, index) => (
            index == 0 ? <div>
              {this.state.is24 === '24' ? <TimePicker className="Medicationtime" onChange={(e) => { this.onTimeChange(e, 0) }} value={itm.value ? moment(itm.value, 'HH:mm') : ''} format="HH:mm" /> :
                <TimePicker className="Medicationtime" use12Hours onChange={(e) => { this.onTimeChange(e, 0) }} format="h:mm a" value={itm.value ? moment(itm.value, 'h:mm a') : ''} />}
                <p onClick={this.onAddFiled}>+ add entry</p>
                </div>
              : <div>
                {this.state.is24 === '24' ? <TimePicker className="Medicationtime" onChange={(e) => { this.onTimeChange(e, index) }} value={itm.value ? moment(itm.value, 'HH:mm') : ''} format="HH:mm" /> :
                  <TimePicker className="Medicationtime" use12Hours onChange={(e) => { this.onTimeChange(e, index) }} format="h:mm a" value={itm.value ? moment(itm.value, 'h:mm a') : ''} />}<p onClick={() => { this.deleteTimes(index);}} className="minus_span_medication">- remove entry</p>
              </div>
          ))}
         </Grid>
        
      </div>
    )
  }
}

export default TimeTaken;