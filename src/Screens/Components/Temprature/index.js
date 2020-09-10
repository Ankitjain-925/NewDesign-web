import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class Temprature extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || '',
            label : this.props.label,
            valueType : this.props.valueType ||'',
            name : this.props.name, 
            Options : this.props.Options || [],
        };
    }

    //On Field state Change 
    onDataChange = (e) => {
        this.setState({ value : e.target.value});
        this.props.onChange(e);
    };

    onUnitChange = (value , name) => {
        this.setState({ valueType : value});
        this.props.onChangeType(value, name);
    };

    componentDidMount = () => {

    }
    render() {
        return (
            <Grid className="rrSysto getTempUpr">
            <Grid><label>Temperature</label></Grid>
            <Grid className="getTempInput">
                <input type="text" onChange={this.onDataChange} name={this.state.name} value={this.state.value}/>
                <Grid className="getTemp">
                    {this.state.Options && this.state.Options.length>0 && this.state.Options.map((item)=>(
                        <a className={this.state.valueType && (this.state.valueType.value === item.value || this.state.value === item.value) ? 'temp_c' : 'temp_f'} onClick={()=>{this.onUnitChange(item, 'temprature_type')}}>{item.label}</a>  
                    ))}
                </Grid>
            </Grid>
        </Grid>
        )
    }
}

export default Temprature;

