import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';


class PointPain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            label: this.props.label,
            value: this.props.value,
            date_format: this.props.date_format
        };
    }

    //On open edit
    Edit = () => {
        this.setState({ edit: true })
    }
    // On change the time of any index
    onEditDone = () => {
        var Data = this.state.value;
        this.setState({edit: false})
        this.props.onChange(Data);
    };

    //On Change according component
    updateEntryState1 = (value, name) => {
        const state = this.state.value;
        state[name] = value;
        this.setState({ value: state });
    }

    //On Change according component
    updateEntryState = (e) => {
        const state = this.state.value;
        if (e.target.name === 'public') {
            if (e.target.checked) {
                state['public'] = 'always';
                state['publicdatetime'] = null;
            }
            else {
                state['public'] = '';
            }
        }
        else
        {
            state[e.target.name] = e.target.value;
        }
        this.setState({ value: state });
    }

    componentDidMount = () => {

    }
    render() {
        return (
            <div>
                <Grid className="rrSysto">
                    <Grid><label>{this.state.label}</label></Grid>
                    <Grid className="painAreas">
                        <a className="painAreasimg"><img src={require('../../assets/images/pat22.png')} alt="" title="" /></a>
                        <a className="painAreasimg"><img src={require('../../assets/images/patient-back.svg')} alt="" title="" /></a>
                        <a className="painAreasTxt"><img src={require('../../assets/images/eraser.svg')} alt="" title="" />Clear points</a>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default PointPain;
