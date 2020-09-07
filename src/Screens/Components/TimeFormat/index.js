import React, { Component } from 'react';

class Time extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is24: this.props.time_format
        };
    }

    //On Time Change 
    onTimeChange = (time, i) => {
        this.props.onChange(time);
    };

    componentDidMount = () => {

    }
    render() {
        return (
            <div>
                {this.state.is24 === '24' ? <TimePicker className="Medicationtime" onChange={(e) => { this.onTimeChange(e) }} format="HH:mm" />
                    : <TimePicker className="Medicationtime" use12Hours onChange={(e) => { this.onTimeChange(e) }} format="h:mm a" />}
            </div>
        )
    }
}

export default Time;