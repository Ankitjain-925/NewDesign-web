import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

class PointPain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openEntry: this.props.openEntry,
            value: this.props.value,
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
                className="entryBoxModel">
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
                                    <Grid><a onClick={()=>this.handleChangeEntry('blood_pressure')}><span>1</span>Blood Pressure</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('blood_sugar')}><span>2</span>Blood Sugar</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('condition_pain')}><span>3</span>Condition and Pain</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('covid_19')}><span>4</span>Covid-19 Diary</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('dianosis')}><span>5</span>Diagnosis</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('diary')}><span>6</span>Diary</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('doctor_visit')}><span>7</span>Doctor visit</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('family_anamnesis')}><span>8</span>Family anamnesis</a></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid className="checkHelthLbl">
                                    <Grid><a onClick={()=>this.handleChangeEntry('file_upload')}><span>9</span>Files upload</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('hospitalization')}><span>10</span>Hospital visit</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('laboratory_result')}><span>11</span>Laboratory result</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('marcumar_pass')}><span>12</span>Marcumar pass</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('medication')}><span>13</span>Medication</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('smoking_status')}><span>14</span>Smoking status</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('vaccination')}><span>15</span>Vaccination</a></Grid>
                                    <Grid><a onClick={()=>this.handleChangeEntry('weight_bmi')}><span>16</span>Weight & BMI</a></Grid>
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


