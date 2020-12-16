import React, { Component } from 'react';
import { TimePicker } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from '../../actions';
import * as translationEN from "../../../translations/en.json"
import * as translationDE from '../../../translations/de.json';
import * as translationPT from '../../../translations/pt.json';
import * as translationSP from '../../../translations/sp.json';
import * as translationRS from '../../../translations/rs.json';
import * as translationSW from '../../../translations/sw.json';
import * as translationCH from '../../../translations/ch.json';
import * as translationNL from '../../../translations/nl.json';

const dateFormatList = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/DD/MM'];
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeArr: this.props.timeArray || [],
      dateArr: this.props.dateArray || [],
      is24: this.props.time_format,
      is241: this.props.date_format,
      label: this.props.label,
      name: this.props.name,
    };
  }
  // On change the time of any index
  onTimeChange = (time, i) => {
    let tArray = this.state.timeArr;
    tArray[i] = { label: time, value: time, title: time };
    this.setState({ timeArr: tArray });
    this.props.onChange(tArray, 'reminder_time_taken');
  };

  onDateChange = (time, i) => {
    let dArray = this.state.dateArr;
    dArray[i] = { label: time, value: time, title: time };
    this.setState({ dateArr: dArray });
    this.props.onChange(dArray, 'reminder_date_taken');
  };

  //On delete the time 
  deleteTimes = (index) => {
    let tArray = this.state.timeArr;
    tArray.splice(index, 1);
    let dArray = this.state.dateArr;
    dArray.splice(index, 1);
    this.setState({ timeArr: tArray, dateArr: dArray });
  };

  //On add the new Time 
  onAddFiled = () => {
    let tArray = this.state.timeArr;
    if(tArray && tArray.length>0){
      tArray.push({ label: "", value: "", title: "" });
    }
    else{
      tArray.push({ label: "", value: "", title: "" },{ label: "", value: "", title: "" });
    }
    let dArray = this.state.dateArr;
    if(dArray && dArray.length>0){
      dArray.push({ label: "", value: "", title: "" });
    }
    else{
      dArray.push({ label: "", value: "", title: "" },{ label: "", value: "", title: "" });
    }
    this.setState({ dateArr: dArray });
  };

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
      default:
        translate = translationEN.text
    }
    let { addentry, profilesettings, select_time, select_date, rmv_entry } = translate;
    return (
      <div>
        <Grid className="rrSysto consumeAt">
          <Grid><label>{this.state.label}</label></Grid>
          <div>
            {this.state.timeArr && this.state.timeArr.length == 0 && <div className="vaccinationAdd">
              {!this.state.is241 && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, 0)} format={dateFormatList[0]} />}
              {this.state.is241 === 'DD/MM/YYYY' && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, 0)} format={dateFormatList[0]} />}
              {this.state.is241 === 'YYYY/DD/MM' && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, 0)} format={dateFormatList[2]} />}
              {this.state.is241 === 'MM/DD/YYYY' && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, 0)} format={dateFormatList[1]} />}
              <Grid>
                {this.state.is24 === '24' ? <TimePicker placeholder={select_time} className="Medicationtime" onChange={(e) => { this.onTimeChange(e, 0) }} format="HH:mm" />
                  : <TimePicker placeholder={select_time} className="Medicationtime" use12Hours onChange={(e) => { this.onTimeChange(e, 0) }} format="h:mm a" />}
              </Grid>
            </div>}
            {/* {this.state.dateArr && this.state.dateArr.length == 0 && <div> <Grid>
           
        </Grid>
         </div>} */}
          </div>

          {this.state.timeArr && this.state.timeArr.length > 0 &&
            this.state.timeArr.map((itm, index) => (
              <div>
                {index == 0 ? <div className="vaccinationAdd">
                  {!this.state.is241 && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, 0)} value={this.state.dateArr && this.state.dateArr[index] && this.state.dateArr[index].value ? moment(this.state.dateArr[index].value, dateFormatList[0]) : ''} format={dateFormatList[0]} />}
                  {this.state.is241 === 'DD/MM/YYYY' && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, 0)} value={this.state.dateArr && this.state.dateArr[index] && this.state.dateArr[index].value ? moment(new Date(this.state.dateArr[index].value), dateFormatList[0]) : ''} format={dateFormatList[0]} />}
                  {this.state.is241 === 'YYYY/DD/MM' && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, 0)} value={this.state.dateArr && this.state.dateArr[index] && this.state.dateArr[index].value ? moment(new Date(this.state.dateArr[index].value), dateFormatList[2]) : ''} format={dateFormatList[2]} />}
                  {this.state.is241 === 'MM/DD/YYYY' && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, 0)} value={this.state.dateArr && this.state.dateArr[index] && this.state.dateArr[index].value ? moment(new Date(this.state.dateArr[index].value), dateFormatList[1]) : ''} format={dateFormatList[1]} />}
                  {this.state.is24 === '24' ? <TimePicker placeholder={select_time} className="Medicationtime" onChange={(e) => { this.onTimeChange(e, 0) }} value={itm.value ? moment(itm.value, 'HH:mm') : ''} format="HH:mm" /> :
                    <TimePicker placeholder={select_time} className="Medicationtime" use12Hours onChange={(e) => { this.onTimeChange(e, 0) }} format="h:mm a" value={itm.value ? moment(itm.value, 'h:mm a') : ''} />}
                </div>
                  : <div className="vaccinationAdd">
                    {!this.state.is241 && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, 0)} value={this.state.dateArr && this.state.dateArr[index] && this.state.dateArr[index].value ? moment(new Date(this.state.dateArr[index].value), dateFormatList[0]) : ''} format={dateFormatList[0]} />}
                    {this.state.is241 === 'DD/MM/YYYY' && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, index)} value={this.state.dateArr && this.state.dateArr[index] && this.state.dateArr[index].value ? moment(new Date(this.state.dateArr[index].value), dateFormatList[0]) : ''} format={dateFormatList[0]} />}
                    {this.state.is241 === 'YYYY/DD/MM' && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, index)} value={this.state.dateArr && this.state.dateArr[index] && this.state.dateArr[index].value ? moment(new Date(this.state.dateArr[index].value), dateFormatList[2]) : ''} format={dateFormatList[2]} />}
                    {this.state.is241 === 'MM/DD/YYYY' && <DatePicker placeholder={select_date} name={this.props.name} onChange={(e) => this.onDateChange(e, index)} value={this.state.dateArr && this.state.dateArr[index] && this.state.dateArr[index].value ? moment(new Date(this.state.dateArr[index].value), dateFormatList[1]) : ''} format={dateFormatList[1]} />}
                    {this.state.is24 === '24' ? <TimePicker placeholder={select_time} className="Medicationtime" onChange={(e) => { this.onTimeChange(e, index) }} value={itm.value ? moment(itm.value, 'HH:mm') : ''} format="HH:mm" /> :
                      <TimePicker placeholder={select_time} className="Medicationtime" use12Hours onChange={(e) => { this.onTimeChange(e, index) }} format="h:mm a" value={itm.value ? moment(itm.value, 'h:mm a') : ''} />}
                  </div>}

                {index !== 0 && <p onClick={() => { this.deleteTimes(index); }} className="minus_span_medication">- {rmv_entry}</p>}
              </div>
            ))}
          {/* {this.state.dateArr && this.state.dateArr.length > 0 &&
          this.state.dateArr.map((itm, index) => (
            <div>
            {index == 0 ? <div>
            
                </div>
              : <div>
             
              </div>}
              
            </div>
          ))} */}
        </Grid>
        <p className="addmores" onClick={this.onAddFiled}>+ {addentry}</p>

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
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index));