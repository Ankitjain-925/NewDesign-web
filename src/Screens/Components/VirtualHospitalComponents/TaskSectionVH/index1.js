import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from 'Screens/VirtualHospital/Institutes/selecthouseaction';
import { OptionList } from 'Screens/Login/metadataaction';
import { Speciality } from 'Screens/Login/speciality.js';
import { LanguageFetchReducer } from 'Screens/actions';
import { getLanguage } from 'translations/index';
import _ from 'lodash';
import axios from 'axios';
import sitedata from 'sitedata';
import Loader from "Screens/Components/Loader/index";
import { commonHeader } from 'component/CommonHeader/index';
import NotesEditor from 'Screens/Components/Editor/index';
import FileUploader from 'Screens/Components/JournalFileUploader/index';





class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            stamp: {},
            fileattach: {},
            loaderImage: false,
        };
    }


    componentDidMount() {
    }
    FileAttachMulti = (Fileadd) => {
        this.setState({
            isfileuploadmulti: true,
            fileattach: Fileadd,
            fileupods: true,
        });
    };


   
    updateAllEntrySec2 = (e) => {
        var state = this.state.stamp;
        state[e.target.name] = e.target.checked;
        this.setState({ stamp: state });
    };

    updateEntryState2 = (event) => {
        var state = this.state.stamp;
        state[event.target.name] = event.target.value;
        this.setState({ stamp: state });
    };


    CertificateSubmit = () => {
        console.log('this.props.certificateId', this.props.certificateId)
        if(this.props.certificateId){
            let data = {}
            data = this.state.stamp
            if (this.state.fileattach && this.state.fileattach.length > 0) {
                data.fileattach = this.state.fileattach;
            }
            this.setState({loaderImage: true})
            axios
            .put(
              sitedata.data.path + '/vh/AddTask/' + this.props.certificateId,
              {
                certificate: data
              },
              commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((responce) => {
                if(responce.data.hassuccessed){
                    data.usefor = "mail"; 
                    data.patient_id = this.props.certificateId;
                    axios
                    .post(
                      sitedata.data.path + '/vactive/downloadSickleaveCertificate',
                      data,
                      commonHeader(this.props.stateLoginValueAim.token)
                    )
                    .then((responce) => {});
                    this.props.handleCloseTask();
                }
                this.setState({loaderImage: false})
             
            });
        } 
    };
    
    render() {
        let { info } = this.state
        let translate = getLanguage(this.props.stateLanguageType);
        let {
            Insurance_company,
            Name,
            DOB,
            Insurance_Company,
            Insurance_Person,
            Status,
            Hospital_Number,
            Doctor_Number,
            Date,
            First_Certification,
            Workincident,
            Occupational_disease,
            Continuation_of_certification,
            Sent_Special_Doctor,
            Assigned_doctor,
            Imposible_since,
            most_until,
            work_until,
            detected_at,
            Stamp_Doctor,
            disability,
            certification,
            disability_certification
        } = translate;

        return (
            <Grid>
                 {this.state.loaderImage && <Loader />}
                <Grid className="certificateBg">
                    <Grid className="headerHeight"></Grid>
                    <Grid container direction="row" justifyContent="center">
                        <Grid item xs={11} sm={11} md={10}>
                            <Grid container direction="row" spacing={5}>

                                <Grid item xs={12} sm={8} md={8}>
                                    <Grid className="certifyForm">
                                        <Grid className="insrnceCmp cmnSpc">
                                            {/* <Grid className="insrnceLbl1"><label>Krainkenkasse bzw: Kostentrager</label></Grid> */}
                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{Insurance_company}</label></Grid>
                                            <Grid><input type="text" name="insurance_company" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.insurance_company || ''} /></Grid>
                                        </Grid>
                                        <Grid className="cmnSpc">
                                            {/* <Grid className="insrnceLbl1"><label>Name, Vorname des Versicberten</label></Grid> */}
                                            <Grid container direction="row" alignItems="center" spacing={1}>
                                                <Grid item xs={12} sm={7} md={7}>
                                                    <Grid className="insrnceCmp">
                                                        <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{Name}</label></Grid>
                                                        <Grid><input type="text" name="name" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.name || ''} /></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={5} md={5}>
                                                    <Grid className="insrnceCmp">
                                                        <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{DOB}</label></Grid>
                                                        <Grid><input type="date" name="birthday" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.birthday || ''} /></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="cmnSpc">
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Grid container direction="row" alignItems="center" spacing={1}>
                                                    <Grid item xs={12} sm={12} md={4}>
                                                        <Grid className="insrnceCmp">
                                                            {/* <Grid className="insrnceLbl1">
                                                            <label>Kassen-Nr.</label></Grid> */}
                                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')} >
                                                                <label>{Insurance_Company}</label></Grid>
                                                            <Grid><input type="text" name="number_insurance_company" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.number_insurance_company || ''} /></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={4}>
                                                        <Grid className="insrnceCmp">
                                                            {/* <Grid className="insrnceLbl1">
                                                            <label>Versicherten-Nr.</label></Grid> */}
                                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')} ><label>{Insurance_Person}</label></Grid>
                                                            <Grid><input type="text" name="insurance_number_person" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.insurance_number_person || ''} /></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={4}>
                                                        <Grid className="insrnceCmp">
                                                            {/* <Grid className="insrnceLbl1">
                                                            <label>{Status}</label></Grid> */}
                                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{Status}</label></Grid>
                                                            <Grid><input type="text" name="status" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.status || ''} /></Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Grid container direction="row" alignItems="center" spacing={1}>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <Grid className="insrnceCmp">
                                                        {/* <Grid className="insrnceLbl1">
                                                        <label>Betriebsstatten-Nr.</label></Grid> */}
                                                        <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}>
                                                            <label>{Hospital_Number}</label></Grid>
                                                        <Grid><input type="text" name="hospital_number" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.hospital_number || ''} /></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <Grid className="insrnceCmp">
                                                        {/* <Grid className="insrnceLbl1">
                                                        <label>Arzt-Nr.</label></Grid> */}
                                                        <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')} ><label>{Doctor_Number}</label></Grid>
                                                        <Grid><input type="text" name="doctor_number" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.doctor_number || ''} /></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <Grid className="insrnceCmp">
                                                        {/* <Grid className="insrnceLbl1">
                                                        <label>Date</label></Grid> */}
                                                        <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{Date}</label></Grid>
                                                        <Grid><input type="date" name="date" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.date || ''} /></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="certifyCheck">
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Grid container direction="row" spacing={2}>
                                                <Grid item xs={12} sm={12} md={6}>
                                                    <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed2') ? this.props.stateLanguageType === 'de' && ('setColorRed2') : this.props.stateLanguageType === 'en' && ('setColorBlack2')}>
                                                        <label>{First_Certification}</label>
                                                        <Grid className="formGroupChk">
                                                            <input type="checkbox" id="Workincident" name={"workincident"} onChange={(e) => this.updateAllEntrySec2(e)} value={this.state.stamp &&
                                                                this.state.stamp?.workincident &&
                                                                this.state.stamp?.workincident ==
                                                                true
                                                                ? false
                                                                : true || ''}
                                                                checked={
                                                                    this.state.stamp?.workincident
                                                                }
                                                            />

                                                            <label for="Workincident">
                                                                <span>{Workincident}</span>
                                                                {/* <p>Workincident / Result of Workincident</p> */}
                                                            </label>
                                                        </Grid>
                                                        <Grid className="formGroupChk">
                                                            <input type="checkbox" id="disease" name={"occupational_disease"} onChange={(e) => this.updateAllEntrySec2(e)} value={this.state.stamp &&
                                                                this.state.stamp?.occupational_disease &&
                                                                this.state.stamp?.occupational_disease ==
                                                                true
                                                                ? false
                                                                : true || ''}
                                                                checked={
                                                                    this.state.stamp?.occupational_disease
                                                                } />

                                                            <label for="disease">
                                                                <span>{Occupational_disease}</span>
                                                                {/* <p>Occupational disease</p> */}
                                                            </label>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6}>
                                                    <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed2') ? this.props.stateLanguageType === 'de' && ('setColorRed2') : this.props.stateLanguageType === 'en' && ('setColorBlack2')}>
                                                        <label>{Continuation_of_certification}</label>
                                                        <Grid className="formGroupChk">
                                                            <input type="checkbox" id="Special" name={"sent_special_doctor"} value={
                                                                this.state.stamp &&
                                                                    this.state.stamp?.sent_special_doctor &&
                                                                    this.state.stamp?.sent_special_doctor ==
                                                                    true
                                                                    ? false
                                                                    : true || ''

                                                            } checked={
                                                                this.state.stamp?.sent_special_doctor
                                                            } onChange={(e) => this.updateAllEntrySec2(e)} />
                                                            <label for="Special">
                                                                <span>{Sent_Special_Doctor}</span>
                                                                {/* <p>Sent to a Special Doctor</p> */}
                                                            </label>
                                                        </Grid>
                                                        <Grid className="formGroupChk">
                                                            <input type="checkbox" id="Dem" name={"assigned_doctor"} value={this.state.stamp &&
                                                                this.state.stamp?.assigned_doctor &&
                                                                this.state.stamp?.assigned_doctor ==
                                                                true
                                                                ? false
                                                                : true || ''}
                                                                checked={
                                                                    this.state.stamp?.assigned_doctor
                                                                }
                                                                onChange={(e) => this.updateAllEntrySec2(e)} />
                                                            <label for="Dem">
                                                                <span>{Assigned_doctor}</span>
                                                            </label>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="wrkSinceUpr">
                                        <Grid container direction="row" alignItems="center" className="btmSpc">
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed2') ? this.props.stateLanguageType === 'de' && ('setColorRed2') : this.props.stateLanguageType === 'en' && ('setColorBlack2')} >
                                                    <label>{Imposible_since}</label>
                                                    {/* <p>Imposible to work since</p> */}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="wrkInput">
                                                    <input type="date" name="imposible" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.imposible || ''} />
                                                    {/* <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} /> */}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" alignItems="center" className="btmSpc">
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed3') ? this.props.stateLanguageType === 'de' && ('setColorRed2') : this.props.stateLanguageType === 'en' && ('setColorBlack2')}>
                                                    <label>{most_until}<p className='hhh'>{work_until}</p></label>
                                                    {/* <p>einschließlich</p> */}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="wrkInput">
                                                    <input type="date" name="most_likely" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.most_likely || ''} />

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed2') ? this.props.stateLanguageType === 'de' && ('setColorRed2') : this.props.stateLanguageType === 'en' && ('setColorBlack2')}>
                                                    <label>{detected_at}</label>
                                                    {/* <p>detected at</p> */}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="wrkInput">
                                                    <input type="date" name="detected_at" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.detected_at || ''} />
                                                    {/* <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} /> */}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <Grid className="setArbtUpr">
                                        <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')} >
                                            <label>{disability}<p className='hhh'>{certification}</p>
                                                <Grid className='noteCertificate'>

                                                    <textarea
                                                        className='noteCertificate2'
                                                        placeholder={"text"}
                                                        name="description"
                                                        onChange={(e) =>
                                                            this.updateEntryState2(
                                                                e
                                                            )
                                                        }
                                                        value={this.state.stamp.description || ''}
                                                    ></textarea>
                                                </Grid>
                                            </label>

                                        </Grid>
                                        {/* className="setArbtSign" */}
                                        <Grid className="setArbtSign" >
                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')} >
                                                <label >{Stamp_Doctor} </label>
                                                <Grid >
                                                    <FileUploader
                                                       attachfile={
                                                            this.state.stamp &&
                                                                this.state.stamp?.fileattach
                                                                ? this.state.stamp?.fileattach 
                                                                : [] 
                                                        }
                                                        name="UploadTrackImageMulti"
                                                        comesFrom="journal"
                                                        comesFrom1="certificate"
                                                        isMulti={true}
                                                        fileUpload={(e) => this.FileAttachMulti(e)}
                                                    />
                                                    {this.state.error_section == 18 && (
                                                        <div className="err_message2">
                                                            {this.state.errorChrMsg}
                                                        </div>
                                                    )}
                                                </Grid></Grid>
                                            {/* <p>Vertragsarzlistempel / Unterschritt des Arztes</p> */}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid className="infoShwSave3">
                    <input
                        type="submit"
                        value="Submit"
                        onClick={() => this.CertificateSubmit()}
                    >
                    </input>
                </Grid>
            </Grid>
        );

    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
        state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { House } = state.houseSelect;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    const { speciality } = state.Speciality;
    const { metadata } = state.OptionList;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        House,
        settings,
        verifyCode,
        speciality,
        metadata,
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        LanguageFetchReducer,
        Settings,
        authy,
        houseSelect,
        OptionList,
        Speciality,
    })(Index)
);