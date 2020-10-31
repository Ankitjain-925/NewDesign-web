import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SelectByTwo from './../SelectbyTwo/index';
import DateFormat from './../DateFormat/index';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getDate } from '../BasicMethod';
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


class ShowHide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            value: this.props.value,
            date_format: this.props.date_format
        };
    }

    //On open edit
    Edit = () => {
        this.setState({ edit: true })
    }
    // On change the time of any index
    onEditDone = () => {
        var Data = this.state.value;
        this.setState({edit: false, value : {}})
        this.props.onChange(Data);
    };

    //On Change according component
    updateEntryState1 = (value, name) => {
        const state = this.state.value;
        if(name==='publicdatetime')
        {
            state['public'] = value;
        }
        state[name] = value;
        this.setState({ value: state });
    }

    //On Change according component
    updateEntryState = (e) => {
        const state = this.state.value;
        if (e.target.name === 'public') {
            if (e.target.checked) {
                state['public'] = 'always';
                state['publicdatetime'] = null;
            }
            else {
                state['public'] = '';
            }
        }
        else
        {
            state[e.target.name] = e.target.value;
        }
        this.setState({ value: state });
    }

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
          let { Allentries, hide_or_show,profilesettings, edit, done} = translate;
        return (
            <div>
                {!this.state.edit && <Grid className="rrShwHidMain">
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={6} md={6}>
                            <Grid className="infoShwHid3">
                                <a className="visibleAllShw">{hide_or_show} <img src={require('../../../assets/images/Info.svg')} alt="" title="" />
                                <Grid className="visibleAll">
                                   {Allentries}<a>{profilesettings}</a>
                                </Grid></a>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} md={6} className="rreditShwHid">
                            <a onClick={this.Edit}>{edit}</a>
                        </Grid>
                    </Grid>
                </Grid>}
                {this.state.edit && <Grid className="shwAfterUpr">
                    <Grid className="shwAfter">
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={8} className="shwAfterLft">
                                <p>{this.state.value.visible === 'show' ? 'Show' : 'Hide'} : <span>{this.state.value.publicdatetime && getDate(this.state.value.publicdatetime, this.state.date_format)}</span></p>
                            </Grid>
                            <Grid item xs={12} md={4} className="shwAfterRght">
                                <a onClick={this.onEditDone}>{done}</a>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="showThis">

                        <Grid className="showThisBtns">
                            <SelectByTwo name="visible" label="Visible" options={[{ label: 'Show this entry', value: 'show' }, { label: 'Hide this entry', value: 'hide' }]} onChange={(e) => this.updateEntryState1(e, 'visible')} value={this.state.value.visible} />
                        </Grid>
                        {this.state.value.visible && this.state.value.visible !== "" &&
                        <Grid>
                            <Grid className="alwaysDate">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="always"
                                            color="#00ABAF"
                                            name="public"
                                            checked={this.state.value.public === 'always'}
                                            onChange={this.updateEntryState}
                                        />
                                    }
                                    label="Always"
                                />
                            </Grid>

                            {this.state.value.public !== 'always' && <Grid className="afterDate">
                                <DateFormat name="date" value={this.state.value.publicdatetime ? new Date(this.state.value.publicdatetime) : new Date()} date_format={this.state.date_format} onChange={(value) => this.updateEntryState1(value, 'publicdatetime')} />
                            </Grid>}
                        </Grid>}
                    </Grid>
                </Grid>}
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
  export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(ShowHide));