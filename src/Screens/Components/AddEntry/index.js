import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

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
    componentDidMount = () => {

    }
    render() {
        return (
            <Modal
                open={this.state.openEntry}
                onClose={this.handleCloseEntry}
                className={this.props.settings.setting.mode === 'dark' ?"darkTheme":""}
                >
                <Grid className="entryBoxCntnt">
                    <Grid className="entryCourse">
                        <Grid className="entryCloseBtn">
                            <a onClick={this.handleCloseEntry}>
                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                            </a>
                        </Grid>
                        <Grid><label>Select entry type</label></Grid>
                        {/* <p>Click or input number on your keyboard</p> */}
                    </Grid>

                    <Grid className="checkHelth">
                        <Grid container direction="row">
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid className="checkHelthLbl">
                                    {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('anamnesis')}><span>1</span>Anamnesis</a></Grid>}
                                    <Grid><a onClick={()=>this.handleChangeEntry('blood_pressure')}>{this.state.openBy !=='patient' ? <span>2</span>: <span>1</span> }Blood Pressure</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('blood_sugar')}>{this.state.openBy !=='patient' ? <span>3</span>: <span>2</span> }Blood Sugar</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('condition_pain')}>{this.state.openBy !=='patient' ? <span>4</span>: <span>3</span> }Condition and Pain</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('covid_19')}>{this.state.openBy !=='patient' ? <span>5</span>: <span>4</span> }Covid-19 Diary</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('diagnosis')}>{this.state.openBy !=='patient' ? <span>6</span>: <span>5</span> }Diagnosis</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('diary')}>{this.state.openBy !=='patient' ? <span>7</span>: <span>6</span> } Diary</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('doctor_visit')}>{this.state.openBy !=='patient' ? <span>8</span>: <span>7</span> }Doctor visit</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('family_anamnesis')}>{this.state.openBy !=='patient' ? <span>9</span>: <span>8</span> }Family anamnesis</a></Grid>
                                    {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('file_upload')}>{this.state.openBy !=='patient' ? <span>10</span>: <span>9</span> }Files upload</a></Grid>}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid className="checkHelthLbl">
                                    {this.state.openBy ==='patient' && <Grid><a onClick={()=>this.handleChangeEntry('file_upload')}>{this.state.openBy !=='patient' ? <span>10</span>: <span>9</span> }Files upload</a></Grid>}
                                    <Grid><a onClick={()=>this.handleChangeEntry('hospitalization')}>{this.state.openBy !=='patient' ? <span>11</span>: <span>10</span> }Hospital visit</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('laboratory_result')}>{this.state.openBy !=='patient' ? <span>12</span>: <span>11</span> }Laboratory result</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('marcumar_pass')}>{this.state.openBy !=='patient' ? <span>13</span>: <span>12</span> }Marcumar pass</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('medication')}>{this.state.openBy !=='patient' ? <span>14</span>: <span>13</span> }Medication</a></Grid>
                                    {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('prescription')}>{this.state.openBy !=='patient' && <span>15</span>} Prescription</a></Grid>}
                                    {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('second_opinion')}>{this.state.openBy !=='patient' && <span>16</span>}Second Opinion</a></Grid>}
                                    {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('sick_certificate')}>{this.state.openBy !=='patient' && <span>17</span>}Sick Certificate</a></Grid>}
                                    <Grid><a onClick={()=>this.handleChangeEntry('smoking_status')}>{this.state.openBy !=='patient' ? <span>18</span>: <span>14</span> }Smoking status</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('vaccination')}>{this.state.openBy !=='patient' ? <span>19</span>: <span>15</span> }Vaccination</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('weight_bmi')}>{this.state.openBy !=='patient' ? <span>20</span>: <span>16</span> }Weight & BMI</a></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        )
    }
}

export default PointPain;


