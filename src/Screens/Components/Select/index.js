import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import * as translationEN from "../../../translations/en.json"
import * as translationDE from '../../../translations/de.json';
import * as translationPT from '../../../translations/pt.json';
import * as translationSP from '../../../translations/sp.json';
import * as translationRS from '../../../translations/rs.json';
import * as translationSW from '../../../translations/sw.json';
import * as translationCH from '../../../translations/ch.json';
import * as translationNL from '../../../translations/en.json';
class SelectField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || '',
            label : this.props.label,
            name : this.props.name,
            option : this.props.option,  
            isMulti : this.props.isMulti,
            isSearchable: this.props.isSearchable,
            closeMenuOnSelect : this.props.closeMenuOnSelect,
        };
    }

    //On Select Change 
    onSelectChange = (e, name) => {
        this.setState({ value : e});
        this.props.onChange(e, name);
    };

    componentDidMount = () => {

    }
    render() {
        let translate;
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
            case "default":
                translate = translationEN.text
        }
        let { select } = translate;
        return (
            <Grid className="rrSysto">
                <Grid><label>{this.state.label}</label></Grid>
                <Select
                    value={this.state.value}
                    name={this.state.name}
                    options={this.state.option}
                    placeholder={select}
                    onChange={(e) => this.onSelectChange(e, this.state.name)}
                    isSearchable={this.state.isSearchable ? true : false}
                    isMulti={this.state.isMulti}
                    closeMenuOnSelect={this.state.closeMenuOnSelect}
                />
            </Grid>
        )
    }
}

export default SelectField;