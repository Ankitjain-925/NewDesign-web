import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en_json_proofread_13072020.json"
class RightManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            personalinfo: this.props.personalinfo,
            added_data: this.props.added_data,
        };
    }

    componentDidMount = () => {

    }

    //On change the User Data
    componentDidUpdate = (prevProps) => {
        if (prevProps.added_data !== this.props.added_data) {
            this.setState({ added_data: this.props.added_data })
        }
        if (prevProps.personalinfo !== this.props.personalinfo) {
            this.setState({ personalinfo: this.props.personalinfo })
        }
    }

    render() {
        let translate;
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            // case "de":
            //     translate = translationDE.text
            //     break;
            // case "pt":
            //     translate = translationPT.text
            //     break;
            // case "sp":
            //     translate = translationSP.text
            //     break;
            // case "rs":
            //     translate = translationRS.text
            //     break;
            // case "nl":
            //     translate = translationNL.text
            //     break;
            // case "ch":
            //     translate = translationCH.text
            //     break;
            // case "sw":
            //     translate = translationSW.text
            //     break;
            case "default":
                translate = translationEN.text
        }
        let { weight_bmi, heart_rate, blood_sugar, prescription, neurology, no_data_avlbl, blood_pressure, add_new_entry, open, last_document, temp_headech, offc_visit, sick_cert, view_all, upcming_appointment, last_doc_visit, specific_date, interval, reminder, reminder_time_taken, notes, atc_code, lab_result, upr_limit, unit, lwr_limit, on, prescribed, save_entry, to_be_consume, pain_areas, Change, show, hide, until, archive, rr_systolic, attachments, time_measure, date_measure,
            enter_dosage, edit, Delete, enter_a_sbstnce, first_visit_day, pain_type, de_archive, ur_trade_name, always, feeling, date, time } = translate

        return (
            <div>
                {this.state.added_data && this.state.added_data.length > 0 && this.state.added_data.map((item) => (
                    <div>
                        {item === 'graph_blood_pressure' &&
                            <Grid className="persBlodMesur">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6} className="lstView">
                                        <label>{blood_pressure}</label>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="persBlodImg">
                                            <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                    <div>
                                        <Grid className="presureData">
                                            <h3>121/80 <span>mmHg</span></h3>
                                            <p>17/07/2020, 12:03 AM</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{}</p>
                                        <h3 onClick={() => this.props.SelectOption('blood_pressure')}>+ {add_new_entry}</h3>
                                    </Grid>}
                            </Grid>
                        }

                        {item === 'graph_weight_bmi' &&
                            <Grid className="persBlodMesur">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6} className="lstView">
                                        <label>{weight_bmi}</label>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="persBlodImg">
                                            <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                    <div>
                                        <Grid className="presureData">
                                            <h3>121/80 <span>mmHg</span></h3>
                                            <p>17/07/2020, 12:03 AM</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        <h3 onClick={() => this.props.SelectOption('weight_bmi')}>+ {add_new_entry}</h3>
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'graph_heart_rate' &&
                            <Grid className="persBlodMesur">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6} className="lstView">
                                        <label>{heart_rate}</label>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="persBlodImg">
                                            <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                    <div>
                                        <Grid className="presureData">
                                            <h3>121/80 <span>mmHg</span></h3>
                                            <p>17/07/2020, 12:03 AM</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{}</p>
                                        <h3 onClick={() => this.props.SelectOption('blood_pressure')}>+ {add_new_entry}</h3>
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'creatnine' &&
                            <Grid className="persBlodMesur">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6} className="lstView">
                                        <label>Creatinine</label>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="persBlodImg">
                                            <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                    <div>
                                        <Grid className="presureData">
                                            <h3>121/80 <span>mmHg</span></h3>
                                            <p>17/07/2020, 12:03 AM</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        <h3 onClick={() => this.props.SelectOption('laboratory_result')}>+ {add_new_entry}</h3>
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'graph_blood_sugar' &&
                            <Grid className="persBlodMesur">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6} className="lstView">
                                        <label>{blood_sugar}</label>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Grid className="persBlodImg">
                                            <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                    <div>
                                        <Grid className="presureData">
                                            <h3>121/80 <span>mmHg</span></h3>
                                            <p>17/07/2020, 12:03 AM</p>
                                        </Grid>
                                        <Grid className="presureDataGrph">
                                            <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        <h3 onClick={() => this.props.SelectOption('blood_sugar')}>+ {add_new_entry}</h3>
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'last_doctor_visit' &&
                            <Grid className="drVisit">
                                <h3>{last_doc_visit}</h3>
                                {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                    <div>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={2} md={2}>
                                                <Grid className="drVisitImg">
                                                    <img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={10} md={10}>
                                                <Grid className="drVisitData">
                                                    <label>Mark Anderson M.D.</label>
                                                    <p>17/07/2020, 12:03 AM</p>
                                                </Grid>
                                            </Grid>
                                            <Grid className="clear"></Grid>
                                        </Grid>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={2} md={2}>
                                                <Grid className="drVisitImg">
                                                    <img src={require('../../../../assets/images/dr2.jpg')} alt="" title="" />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={10} md={10}>
                                                <Grid className="drVisitData">
                                                    <label>Mark Anderson M.D.</label>
                                                    <p>17/07/2020, 12:03 AM</p>
                                                </Grid>
                                            </Grid>
                                            <Grid className="clear"></Grid>
                                        </Grid>
                                    </div>
                                    : <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        <h3 onClick={() => this.props.SelectOption('doctor_visit')}>+ {add_new_entry}</h3>
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'upcomming_appointments' &&
                            <Grid className="comeAppoint">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={10} md={10}>
                                        <Grid className="upcomView"><label>{upcming_appointment}</label> <a>{view_all}</a></Grid>
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <Grid className="allViewDots">
                                            <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                                {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                    <div>
                                        <Grid className="oficVisit">
                                            <label>06/08/2020, 9:00 AM</label> <a><img src={require('../../../../assets/images/h2Logo.jpg')} alt="" title="" /> {offc_visit}</a>
                                        </Grid>
                                        <Grid className="neuroSection">
                                            <h3>{neurology}</h3>
                                            <Grid><a><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D. (Doctor)</a></Grid>
                                            <Grid><a><img src={require('../../../../assets/images/h2Logo.jpg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                        </Grid>
                                    </div> :
                                    <Grid className="noBpData">
                                        <p>{no_data_avlbl}</p>
                                        <h3 onClick={() => this.props.MoveAppoint()}>+ {add_new_entry}</h3>
                                    </Grid>}
                            </Grid>
                        }
                        {item === 'last_documents' &&
                            <Grid className="lstDocs">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={10} md={10}>
                                        <Grid className="lstView">
                                            <label>{last_document}</label> <a>{view_all}</a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <Grid className="lstViewDots">
                                            <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>

                                <Grid className="presSec">
                                    <a className="presSecAncr">
                                        <h4>{prescription}</h4>
                                        {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                            <div>
                                                <Grid container direction="row" alignItems="center" className="metroPro">
                                                    <Grid item xs={6} md={6}><h5>Metoprolol</h5></Grid>
                                                    <Grid item xs={6} md={6} className="metroPrOpen"><a>{open}</a></Grid>
                                                    <Grid className="clear"></Grid>
                                                </Grid>
                                                <Grid className="metroDoctor">
                                                    <a><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />
                                                Mark Anderson M.D. (Doctor)</a>
                                                </Grid>
                                            </div> :
                                            <Grid className="noBpData">
                                                <p>{no_data_avlbl}</p>
                                                <h3 onClick={() => this.props.MoveDocument()}>+ {add_new_entry}</h3>
                                            </Grid>}
                                    </a>

                                    <a className="presSecAncr">
                                        <h4>{sick_cert}</h4>
                                        {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                            <div>
                                                <Grid container direction="row" alignItems="center" className="metroPro">
                                                    <Grid item xs={12} md={12}><h5>{temp_headech}</h5></Grid>
                                                    <Grid className="clear"></Grid>
                                                </Grid>
                                                <Grid className="metroDoctor">
                                                    <a><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />
                                                Mark Anderson M.D. (Doctor)</a>
                                                </Grid>
                                            </div> :
                                            <Grid className="noBpData">
                                                <p>{no_data_avlbl}</p>
                                                <h3 onClick={() => this.props.MoveDocument()}>+ {add_new_entry}</h3>
                                            </Grid>}
                                    </a>
                                </Grid>
                            </Grid>
                        }
                    </div>
                ))}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(RightManage));
