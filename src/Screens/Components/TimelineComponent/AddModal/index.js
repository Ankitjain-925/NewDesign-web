import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import DiagnosisFields from '../DiagnosisFields/index';
import PFields from "../PFields/index.js";
import AnamnesisFields from "../AnamnesisFields/index.js";
import SCFields from "../SCFields/index.js";
import SOFields from "../SOFields/index.js";
import CovidFields from '../CovidFields/index';
import BPFields from '../BPFields/index';
import BSFields from '../BSFields/index';
import BMIFields from '../BMIFields/index';
import MPFields from '../MPFields/index';
import SSFields from '../SSFields/index';
import VaccinationFields from '../VaccinationFields/index';
import MedicationFields from '../MedicationFields/index';
import HVFields from '../HVFields/index';
import DVFields from '../DVFields/index';
import CPFields from '../CPFields/index';
import DiaryFields from '../DiaryFields/index';
import AllL_Ps from '../../Parameters/parameter.js';
import LRFields from '../LRFields/index';
import FUFields from '../FUFields/index';
import FAFields from '../FAFields/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTrack: this.props.updateTrack,
            addInqryNw : this.props.addInqryNw,
        };
    }

    componentDidMount = () => {

    }

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.updateTrack !== this.props.updateTrack) {
            this.setState({ updateTrack: this.props.updateTrack })
        }
        if (prevProps.addInqryNw !== this.props.addInqryNw) {
      
            this.setState({addInqryNw : this.props.addInqryNw})
         }
    }

    render() {
        return (
         <div> Hiiii {this.state.addInqryNw}</div>
        )
    }
}

export default Index;

