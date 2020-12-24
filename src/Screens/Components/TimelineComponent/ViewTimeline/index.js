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
import VaccinationTrialView from "../VaccinationTrialView/index"
import SOView from '../SOView/index';
import SCView from '../SCView/index';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Track: this.props.Track,
            loggedinUser: this.props.loggedinUser,
            patient_gender: this.props.patient_gender,
            Archive: this.props.Archive,
            images: this.props.images,
            comesfrom: this.props.comesfrom,
            TrackRecord : this.props.TrackRecord 
        };
    }

    componentDidMount = () => {

    }
    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.Track !== this.props.Track) {
            this.setState({ Track: this.props.Track,  Archive : this.props.Archive})
        }
        if(prevProps.images !== this.props.images)
        {
            this.setState({images : this.props.images})
        }
        if(prevProps.TrackRecord !== this.props.TrackRecord)
        {
            this.setState({TrackRecord : this.props.TrackRecord})
        }
        if(prevProps.loggedinUser !== this.props.loggedinUser)
        {
            this.setState({loggedinUser : this.props.loggedinUser})
        }
        if(prevProps.comesfrom !== this.props.comesfrom)
        {
            this.setState({comesfrom : this.props.comesfrom})
        }
    }

    render() {
        var item = this.state.Track;
        return ( 
            <div className="timelineGap">
                {item.type === 'blood_pressure' && <BPView list={this.props.Pressuresituation} TrackRecord={this.state.TrackRecord}  OpenGraph={(current_graph)=>this.props.OpenGraph(current_graph)} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'blood_sugar' && <BSView list={this.props.Allsituation} TrackRecord={this.state.TrackRecord} OpenGraph={(current_graph)=>this.props.OpenGraph(current_graph)} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser}  date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'weight_bmi' && <WBMIView TrackRecord={this.state.TrackRecord} OpenGraph={(current_graph)=>this.props.OpenGraph(current_graph)} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'marcumar_pass' && <MPView TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'smoking_status' && <SSView Allsmoking_status={this.props.Allsmoking_status} TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'vaccination' && <VaccinationView TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'hospitalization' && <HVView AllSpecialty={this.props.AllSpecialty} TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'doctor_visit' && <DVView AllSpecialty={this.props.AllSpecialty} TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'condition_pain' && <CPView paintype={this.props.Allpain_type} painquality={this.props.Allpain_quality} TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} gender={this.state.patient_gender} />}
                {item.type === 'diary' && <DiaryView TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} data={item} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'medication' && <MedicationView Allreminder={this.props.Allreminder} TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'laboratory_result' && <LRView lrp={this.props.lrp} TrackRecord={this.state.TrackRecord} OpenGraph={(current_graph)=>this.props.OpenGraph(current_graph)} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'file_upload' && <FUView TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'family_anamnesis' && <FAView Allgender={this.props.Allgender} Allrelation={this.props.Allrelation} TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} />}
                {item.type === 'covid_19' && <CovidView TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} gender={this.state.patient_gender} />}
                {item.type === 'diagnosis' && <DianosisView TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} gender={this.state.patient_gender} />}
                {item.type === 'second_opinion' && <SOView TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} gender={this.state.patient_gender}  />}
                {item.type === 'prescription' && <PrescriptionView TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} gender={this.state.patient_gender}  />}
                {item.type === 'sick_certificate' && <SCView TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} gender={this.state.patient_gender}  />}
                {item.type === 'anamnesis' && <AnamnesisView list={this.props.Anamnesis} TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} gender={this.state.patient_gender}   />}
                {item.type === 'vaccination_trial' && <VaccinationTrialView paintype={this.props.Allpain_type} painquality={this.props.Allpain_quality} TrackRecord={this.state.TrackRecord} comesfrom={this.state.comesfrom} downloadTrack={(data)=>this.props.downloadTrack(data)} images={this.state.images} Archive={this.state.Archive} DeleteTrack={(deleteKey)=>this.props.DeleteTrack(deleteKey)} ArchiveTrack={(data) => this.props.ArchiveTrack(data)} EidtOption={(value, updateTrack, visibility)=>this.props.EidtOption(value, updateTrack, visibility)} data={item} loggedinUser={this.state.loggedinUser} date_format={this.props.date_format} time_format={this.props.time_format} gender={this.state.patient_gender} />}
                {/* {item.type === 'blood_sugar' && <BSView data={item} />}
                                {item.type === 'condition_pain' && <CPView data={item} />}
                                {item.type === 'covid_19' && <CovidView data={item} />}
                               
                                {item.type === 'diary' && <DiaryView data={item} />}
                                {item.type === 'doctor_visit' && <DVView data={item} />}
                                {item.type === 'family_anamnesis' && <FAView data={item} />}
                                {item.type === 'file_upload' && <FUView data={item} />}
                                {item.type === 'hospitalization' && <HVView data={item} />}
                                {item.type === 'laboratory_result' && <LRView data={item} />}
                                {item.type === 'marcumar_pass' && <MPView data={item} />}
                                {item.type === 'medication' && <MedicationView data={item} />}
                                {item.type === 'smoking_status' && <SSView data={item} />}
                               
                                {item.type === 'weight_bmi' && <WBMIView data={item} />} */}

                {/* */}
                {/* {item.type === 'prescription' && <PrescriptionView data={item} />}
                             
                                {item.type === 'sick_certificate' && <SCView data={item} />} */}

            </div>

        )
    }
}

export default Index;