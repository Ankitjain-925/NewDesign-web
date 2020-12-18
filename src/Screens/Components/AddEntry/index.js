import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {pure} from 'recompose';
import { LanguageFetchReducer } from '../../actions';
import * as translationEN from "../../../translations/en.json"
import * as translationDE from '../../../translations/de.json';
import * as translationPT from '../../../translations/pt.json';
import * as translationSP from '../../../translations/sp.json';
import * as translationRS from '../../../translations/rs.json';
import * as translationSW from '../../../translations/sw.json';
import * as translationCH from '../../../translations/ch.json';
import * as translationNL from '../../../translations/nl.json';
import * as translationFR from '../../../translations/fr.json';
import * as translationAR from '../../../translations/ar.json';
class PointPain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openEntry: this.props.openEntry,
            value: this.props.value,
            openBy : this.props.openBy,
        };
    }

    //For close the pop up
    handleCloseEntry=()=>{
        this.props.handleCloseEntry();
    }
    // For set the value for the new entry
    handleChangeEntry=(value)=>{
        this.props.onChange(value);
        this.props.handleCloseEntry();
    }
    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.openEntry !== this.props.openEntry) {
           this.setState({openEntry : this.props.openEntry})
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.openEntry !== this.props.openEntry || nextState.openEntry !== this.state.openEntry || nextProps.openBy !== this.props.openBy
    }
    componentDidMount = () => {

    }
    render() {
        let translate={};
        switch (this.props.stateLanguageType) {
              case "en":
                  translate = translationEN.text
                  break;
              case "de":
                  translate = translationDE.text
                  break;
              case "pt":
                  translate = translationPT.text
                  break;
              case "sp":
                  translate = translationSP.text
                  break;
              case "rs":
                  translate = translationRS.text
                  break;
              case "nl":
                  translate = translationNL.text
                  break;
              case "ch":
                  translate = translationCH.text
                  break;
              case "sw":
                  translate = translationSW.text
                  break;
            case "fr":
                translate = translationFR.text
                break;
            case "ar":
                translate = translationAR.text
                break;
              default:
                  translate = translationEN.text
          }
          let { anamnesis, Selectentrytype, blood_pressure,blood_sugar,condition_pain, covid_diary, diagnosis, diary, doc_visit,family_anmnies, file_uplod, hosp_visit,
            lab_result, marcumar_pass, medication, prescription, secnd_openion, sick_cert, smoking_status, vaccination, weight_bmi } = translate;
        return (
            
            <Modal
                open={this.state.openEntry}
                onClose={this.handleCloseEntry}
                className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ?"darkTheme":"addScrollBar"}
                >
                <Grid className="entryBoxCntnt">
                    <Grid className="entryCourse">
                        <Grid className="entryCloseBtn">
                            <a onClick={this.handleCloseEntry}>
                                <img src={require('../../../assets/images/close-search.svg')} alt="" title="" />
                            </a>
                        </Grid>
                        <Grid><label>{Selectentrytype}</label></Grid>
                        {/* <p>Click or input number on your keyboard</p> */}
                    </Grid>
                    <Grid className="checkHelth 1111">
                        <Grid container direction="row">
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid className="checkHelthLbl 111">
                                    {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('anamnesis')}><span>1</span><p>{anamnesis}</p></a></Grid>}
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('blood_pressure')}>{this.state.openBy !=='patient' ? <span>2</span>: <span>1</span> }<p>{blood_pressure}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('blood_sugar')}>{this.state.openBy !=='patient' ? <span>3</span>: <span>2</span> }<p>{blood_sugar}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('condition_pain')}>{this.state.openBy !=='patient' ? <span>4</span>: <span>3</span> }<p>{condition_pain}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('covid_19')}>{this.state.openBy !=='patient' ? <span>5</span>: <span>4</span> }<p>{covid_diary}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('diagnosis')}>{this.state.openBy !=='patient' ? <span>6</span>: <span>5</span> }<p>{diagnosis}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('diary')}>{this.state.openBy !=='patient' ? <span>7</span>: <span>6</span> }<p>{diary}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('doctor_visit')}>{this.state.openBy !=='patient' ? <span>8</span>: <span>7</span> }<p>{doc_visit}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('family_anamnesis')}>{this.state.openBy !=='patient' ? <span>9</span>: <span>8</span> }<p>{family_anmnies}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('file_upload')}>{this.state.openBy !=='patient' ? <span>10</span>: <span>9</span> }<p>{file_uplod}</p></a></Grid>}
                                    {this.state.openBy !=='patient' && <Grid className="clear"></Grid>}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid className="checkHelthLbl">
                                    {this.state.openBy ==='patient' && <Grid><a onClick={()=>this.handleChangeEntry('file_upload')}>{this.state.openBy !=='patient' ? <span>10</span>: <span>9</span> }<p>{file_uplod}</p></a></Grid>}
                                    {this.state.openBy ==='patient' && <Grid className="clear"></Grid>}
                                    <Grid><a onClick={()=>this.handleChangeEntry('hospitalization')}>{this.state.openBy !=='patient' ? <span>11</span>: <span>10</span> }<p>{hosp_visit}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('laboratory_result')}>{this.state.openBy !=='patient' ? <span>12</span>: <span>11</span> }<p>{lab_result}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('marcumar_pass')}>{this.state.openBy !=='patient' ? <span>13</span>: <span>12</span> }<p>{marcumar_pass}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('medication')}>{this.state.openBy !=='patient' ? <span>14</span>: <span>13</span> }<p>{medication}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('prescription')}>{this.state.openBy !=='patient' && <span>15</span>}<p>{prescription}</p></a></Grid>}
                                    {this.state.openBy !=='patient' && <Grid className="clear"></Grid>}
                                    {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('second_opinion')}>{this.state.openBy !=='patient' && <span>16</span>}<p>{secnd_openion}</p></a></Grid>}
                                    {this.state.openBy !=='patient' && <Grid className="clear"></Grid>}
                                    {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('sick_certificate')}>{this.state.openBy !=='patient' && <span>17</span>}<p>{sick_cert}</p></a></Grid>}
                                    {this.state.openBy !=='patient' && <Grid className="clear"></Grid>}
                                    <Grid><a onClick={()=>this.handleChangeEntry('smoking_status')}>{this.state.openBy !=='patient' ? <span>18</span>: <span>14</span> }<p>{smoking_status}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('vaccination')}>{this.state.openBy !=='patient' ? <span>19</span>: <span>15</span> }<p>{vaccination}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('weight_bmi')}>{this.state.openBy !=='patient' ? <span>20</span>: <span>16</span> }<p>{weight_bmi}</p></a></Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default pure(withRouter(connect(mapStateToProps, { LanguageFetchReducer })(PointPain)));


