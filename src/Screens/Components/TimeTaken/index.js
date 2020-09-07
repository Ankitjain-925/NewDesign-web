import React, { Component } from 'react';

class TimeTaken extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeArr: this.props.timeArray || [],
      is24: this.props.time_format
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
        {this.state.timeArr && this.state.timeArr.length == 0 && <div>
          {console.log('is24', this.state.is24)}
          {this.state.is24 === '24' ? <TimePicker className="Medicationtime" onChange={(e) => { this.onTimeChange(e, 0) }} format="HH:mm" />
            : <TimePicker className="Medicationtime" use12Hours onChange={(e) => { this.onTimeChange(e, 0) }} format="h:mm a" />}
          <span onClick={this.onAddFiled} className="plus_span_medication">+</span>
        </div>}
        {this.state.timeArr && this.state.timeArr.length > 0 &&
          this.state.timeArr.map((itm, index) => (
            index == 0 ? <div>
              {this.state.is24 === '24' ? <TimePicker className="Medicationtime" onChange={(e) => { this.onTimeChange(e, 0) }} value={itm.value ? moment(itm.value, 'HH:mm') : ''} format="HH:mm" /> :
                <TimePicker className="Medicationtime" use12Hours onChange={(e) => { this.onTimeChange(e, 0) }} format="h:mm a" value={itm.value ? moment(itm.value, 'h:mm a') : ''} />}<span onClick={this.onAddFiled} className="plus_span_medication">+</span></div>
              : <div>
                {this.state.is24 === '24' ? <TimePicker className="Medicationtime" onChange={(e) => { this.onTimeChange(e, index) }} value={itm.value ? moment(itm.value, 'HH:mm') : ''} format="HH:mm" /> :
                  <TimePicker className="Medicationtime" use12Hours onChange={(e) => { this.onTimeChange(e, index) }} format="h:mm a" value={itm.value ? moment(itm.value, 'h:mm a') : ''} />}<span onClick={() => {
                    this.deleteTimes(index);
                  }} className="minus_span_medication">-</span>
              </div>
          ))}
      </div>
    )
  }
}

export default TimeTaken;