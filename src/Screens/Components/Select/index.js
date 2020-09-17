import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';

class SelectField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || '',
            label : this.props.label,
            name : this.props.name,
            option : this.props.option,  
            isMulti : this.props.isMulti,
            closeMenuOnSelect : this.props.closeMenuOnSelect,
        };
    }

    //On Select Change 
    onSelectChange = (e, name) => {
        this.setState({ value : e});
        this.props.onChange(e, name);
    };

    componentDidMount = () => {

    }
    render() {
        return (
            <Grid className="rrSysto">
                <Grid><label>{this.state.label}</label></Grid>
                <Select
                    value={this.state.value}
                    name={this.state.name}
                    options={this.state.option}
                    placeholder="Select"
                    onChange={(e) => this.onSelectChange(e, this.state.name)}
                    isSearchable={false}
                    isMulti={this.state.isMulti}
                    closeMenuOnSelect={this.state.closeMenuOnSelect}
                />
            </Grid>
        )
    }
}

export default SelectField;