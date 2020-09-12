import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import BPView from '../BPView/index';
import BSView from '../BSView/index';
import CPView from '../CPView/index';
import CovidView from '../CovidView/index';
import DianosisView from '../DianosisView/index';
import DiaryView from '../DiaryView/index';
import DVView from '../DVView/index';
import FAView from '../FAView/index';
import FUView from '../FUView/index';
import HVView from '../HVView/index';
import LRView from '../LRView/index';
import MPView from '../MPView/index';
import MedicationView from '../MedicationView/index';
import SSView from '../SSView/index';
import VaccinationView from '../VaccinationView/index';
import WBMIView from '../WBMIView/index';
import AnamnesisView from '../AnamnesisView/index';
import PrescriptionView from '../PrescriptionView/index';
import SOView from '../SOView/index';
import SCView from '../SCView/index';
import EmptyData from '../EmptyData/index';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allTrack: this.props.allTrack,
            loggedinUser : this.props.loggedinUser,
        };
    }

    componentDidMount = () => {

    }
     //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.allTrack !== this.props.allTrack) {
            this.setState({ allTrack: this.props.allTrack })
        }
    }

    render() {
        return (
            <div>
                {this.state.allTrack && this.state.allTrack.length > 0 ?
                   this.state.allTrack.map((item, index) => (
                            <div className="timelineGap">
                                {item.type === 'blood_pressure' && <BPView data={item} date_format={this.props.date_format} time_format={this.props.time_format}/>}
                                {item.type === 'blood_sugar' && <BSView data={item} date_format={this.props.date_format} time_format={this.props.time_format}/>}
                                {item.type === 'weight_bmi' && <WBMIView data={item} date_format={this.props.date_format} time_format={this.props.time_format}/>}
                                {item.type === 'marcumar_pass' && <MPView data={item} date_format={this.props.date_format} time_format={this.props.time_format}/>}
                                {item.type === 'smoking_status' && <SSView data={item} date_format={this.props.date_format} time_format={this.props.time_format}/>}
                                {/* {item.type === 'blood_sugar' && <BSView data={item} />}
                                {item.type === 'condition_pain' && <CPView data={item} />}
                                {item.type === 'covid_19' && <CovidView data={item} />}
                                {item.type === 'diagnosis' && <DianosisView data={item} />}
                                {item.type === 'diary' && <DiaryView data={item} />}
                                {item.type === 'doctor_visit' && <DVView data={item} />}
                                {item.type === 'family_anamnesis' && <FAView data={item} />}
                                {item.type === 'file_upload' && <FUView data={item} />}
                                {item.type === 'hospitalization' && <HVView data={item} />}
                                {item.type === 'laboratory_result' && <LRView data={item} />}
                                {item.type === 'marcumar_pass' && <MPView data={item} />}
                                {item.type === 'medication' && <MedicationView data={item} />}
                                {item.type === 'smoking_status' && <SSView data={item} />}
                                {item.type === 'vaccination' && <VaccinationView data={item} />}
                                {item.type === 'weight_bmi' && <WBMIView data={item} />} */}

                                {/* {item.type === 'anamnesis' && <AnamnesisView data={item} />} */}
                                {/* {item.type === 'prescription' && <PrescriptionView data={item} />}
                                {item.type === 'second_opinion' && <SOView data={item} />}
                                {item.type === 'sick_certificate' && <SCView data={item} />} */}

                            </div>
                        ))
                    : <EmptyData />}
            </div>
        )
    }
}

export default Index;