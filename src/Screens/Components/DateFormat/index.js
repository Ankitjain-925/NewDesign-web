import React, { Component } from 'react';

const dateFormatList = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/DD/MM'];

class Date extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is24: this.props.date_format
        };
    }

    //On Time Change 
    onDateChange = (date, i) => {
        this.props.onChange(date);
    };

    componentDidMount = () => {

    }
    render() {
        return (
            <div>
                {this.state.is24 === 'DD/MM/YYYY' && <DatePicker onChange={this.onDateChange} defaultValue={moment('25/12/2020', dateFormatList[0])} format={'25/12/2015'} />}
                {this.state.is24 === 'YYYY/DD/MM' && <DatePicker onChange={this.onDateChange} defaultValue={moment('2020/25/12', dateFormatList[2])} format={'2020/25/12'} />}
                {this.state.is24 === 'YYYY/DD/MM' && <DatePicker onChange={this.onDateChange} defaultValue={moment('12/25/2020', dateFormatList[1])} format={'12/25/2020'} />}
            </div>
        )
    }
}

export default Date;