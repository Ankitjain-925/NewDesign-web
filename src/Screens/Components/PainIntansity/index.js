import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class Pain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || 0,
            Forview : this.props.Forview
        };
    }

    //On Pain Change Change 
    onPainChange = (e) => {
        this.setState({ value: e.target.value });
        this.props.onChange(e);
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.value !== this.props.value) {
           this.setState({value : this.props.value})
        }
    }
    render() {
        return (
            <div>
                <Grid className="painIntencty">
                    <Grid><label>Pain intensity</label></Grid>
                    {this.state.Forview && <Grid>
                        {(this.state.value >= 0 && this.state.value <= 10) && <a><img src={require('../../../assets/images/nopain.svg')} alt="" title="" />No Pain ({this.state.value})</a>}
                        {(this.state.value > 10 && this.state.value <= 30) && <a><img src={require('../../../assets/images/mild.svg')} alt="" title="" />Mild Pain ({this.state.value})</a>}
                        {(this.state.value > 30 && this.state.value <= 50) && <a><img src={require('../../../assets/images/moderate.svg')} alt="" title="" />Moderate Pain ({this.state.value})</a>}
                        {(this.state.value > 50 && this.state.value <= 70) && <a><img src={require('../../../assets/images/severe.svg')} alt="" title="" />Servere Pain ({this.state.value})</a>}
                        {(this.state.value > 70 && this.state.value <= 90) && <a><img src={require('../../../assets/images/veryServere.svg')} alt="" title="" />Very Servere Pain ({this.state.value})</a>}
                        {(this.state.value > 90 && this.state.value <= 100) && <a><img src={require('../../../assets/images/worst.svg')} alt="" title="" />Worst Pain Possible ({this.state.value})</a>}
                    </Grid>}
                    {this.state.Forview && <Grid> <input disabled name={this.props.name} value={this.state.value} type="range" onChange={this.onPainChange} /></Grid>}
                    {!this.state.Forview && <Grid><a>{this.state.value}</a></Grid>}
                    {!this.state.Forview && <Grid> <input name={this.props.name} value={this.state.value} type="range" onChange={this.onPainChange} /></Grid>}
                    {!this.state.Forview && <Grid className="painPointer"><a>No Pain</a> <a>Mild</a> <a>Moderate</a> <a>Severe</a>
                        <a>Very Severe</a> <a>Worst Pain Possible</a></Grid>}
                </Grid>
            </div>
        )
    }
}

export default Pain;