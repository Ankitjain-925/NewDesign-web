import React, { Component } from 'react';
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
import * as translationNL from '../../../translations/en.json';

class Temprature extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || '',
            label : this.props.label,
            valueType : this.props.valueType ||'',
            name : this.props.name, 
            Options : this.props.Options || [],
        };
    }

    //On Field state Change 
    onDataChange = (e) => {
        this.setState({ value : e.target.value});
        this.props.onChange(e);
    };

    onUnitChange = (value , name) => {
        this.setState({ valueType : value});
        this.props.onChangeType(value, name);
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
          let { Temperature,} = translate;
        return (
            <Grid className="rrSysto getTempUpr">
            <Grid><label>{Temperature}</label></Grid>
            <Grid className="getTempInput">
                <input type="text" onChange={this.onDataChange} name={this.state.name} value={this.state.value}/>
                <Grid className="getTemp">
                    {this.state.Options && this.state.Options.length>0 && this.state.Options.map((item)=>(
                        <a className={this.state.valueType && (this.state.valueType.value === item.value || this.state.value === item.value) ? 'temp_c' : 'temp_f'} onClick={()=>{this.onUnitChange(item, 'temprature_type')}}>{item.label}</a>  
                    ))}
                </Grid>
            </Grid>
        </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
  };
  export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Temprature));


