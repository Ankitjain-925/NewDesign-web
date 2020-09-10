import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class Condition extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value : this.props.value || 0,
            Forview : this.props.Forview,
        };
    }

    //On Pain Change Change 
    onPainChange = (e) => {
        this.setState({ value: e.target.value });
        this.props.onChange(e);
    };

    componentDidMount = () => {
      
    }
    render() {
        return (
            <div>s
                <Grid className="condIntencty">
                    <Grid><label>Condition (How are you?)</label></Grid>
                    {this.state.Forview && <Grid>
                        {(this.state.value > 90 && this.state.value<= 100) && <a><img src={require('../../../assets/images/nopain.svg')} alt="" title="" />{this.state.value}</a>}
                        {(this.state.value > 70 && this.state.value<= 90) && <a><img src={require('../../../assets/images/mild.svg')} alt="" title="" /> {this.state.value}</a>}
                        {(this.state.value > 50 && this.state.value<= 70) && <a><img src={require('../../../assets/images/moderate.svg')} alt="" title="" />{this.state.value}</a>}
                        {(this.state.value > 30 && this.state.value<= 50) && <a><img src={require('../../../assets/images/severe.svg')} alt="" title="" />{this.state.value}</a>}
                        {(this.state.value > 10 && this.state.value<= 30) && <a><img src={require('../../../assets/images/veryServere.svg')} alt="" title="" />{this.state.value}</a>}
                        {(this.state.value >= 0 && this.state.value<=10) && <a><img src={require('../../../assets/images/worst.svg')} alt="" title="" />{this.state.value}</a>}
                    </Grid>}
                    {this.state.Forview && <Grid> <input disabled name={this.props.name} value={this.state.value} type="range" onChange={this.onPainChange}/></Grid>}
                    {!this.state.Forview && <Grid> <input name={this.props.name} value={this.state.value} type="range" onChange={this.onPainChange}/></Grid>}
                </Grid>
            </div>
        )
    }
}

export default Condition;