import React, { Component } from 'react';
import {  TimePicker  } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

class Time extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is24: this.props.time_format,
            value : this.props.value || new Date(),
        };
    }

    //On Time Change 
    onTimeChange = (time) => {
        console.log("doc1@gmail.com", time)
        this.setState({ value: time });
        this.props.onChange(time);
    };

    componentDidMount = () => {
        this.props.onChange(this.props.value);
    }
     //on adding new data
     componentDidUpdate = (prevProps) => {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value })
        }
    }
    render() {
        return (
            <div>
                {this.state.is24 === '24' ? <TimePicker name={this.props.name} value={this.state.value ? moment(this.state.value) : ''} onSelect={(e) => { this.onTimeChange(e) }} onChange={(e) => { this.onTimeChange(e) }} format="HH:mm" />
                    : <TimePicker name={this.props.name} value={this.state.value ? moment(this.state.value) : '' } use12Hours onSelect={(e) => { this.onTimeChange(e) }} onChange={(e) => { this.onTimeChange(e) }} format="h:mm a" />}
            </div>
        )
    }
}

export default Time;