import React, { Component } from 'react';
import {  DatePicker  } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const dateFormatList = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/DD/MM'];

class Date extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is24: this.props.date_format,
            value : this.props.value || new Date(),
        };
    }

    //On Time Change s
    onDateChange = (date, i) => {
        this.setState({ value: date });
        this.props.onChange(date);
    };

    componentDidMount = () => {

    }
    render() {
        return (
            <div>
                {!this.state.is24 && <DatePicker name={this.props.name} onChange={this.onDateChange} value={this.state.value ? moment(this.state.value, dateFormatList[0]) : ''}  format={dateFormatList[0]} />}
                {this.state.is24 === 'DD/MM/YYYY' && <DatePicker name={this.props.name} onChange={this.onDateChange} value={this.state.value ? moment(this.state.value, dateFormatList[0]) : ''}  format={dateFormatList[0]} />}
                {this.state.is24 === 'YYYY/DD/MM' && <DatePicker name={this.props.name} onChange={this.onDateChange} value={this.state.value ? moment(this.state.value, dateFormatList[2]) : ''}  format={dateFormatList[2]} />}
                {this.state.is24 === 'MM/DD/YYYY' && <DatePicker name={this.props.name} onChange={this.onDateChange} value={this.state.value ? moment(this.state.value, dateFormatList[1]) : ''} format={dateFormatList[1]} />}
                
            </div>
        )
    }
}

export default Date;