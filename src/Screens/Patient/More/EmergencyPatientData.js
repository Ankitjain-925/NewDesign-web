import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import sitedata from '../../../sitedata';
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../actions';
import EmergencyCall from './../../Components/EmergencyPage/index'

const path = sitedata.data.path + '/emergency_record';


class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }
  
    componentDidMount() {
    }
  
    render() {
        return (
            <Grid className="homeBg">
                <Grid container direction="row" justify="center">
                    <Grid item xs={11} md={12}>
                        <Grid container direction="row">

                            {/* Website Menu */}
                            <LeftMenu currentPage ="more"/>
                            {/* End of Website Menu */}

                            {/* Website Mid Content */}
                            <Grid item xs={12} md={11}>
                                <Grid className="emrgncyDataUpr">

                                    <Grid container direction="row">
                                        <Grid item xs={12} md={10}>
                                            <Grid className="emrgncyData">
                                                <h1>Your Emergency Data</h1>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/* call Emergency Section */}
                                    <EmergencyCall byUser="patient"/>

                                </Grid>
                            </Grid>
                            {/* End of Website Right Content */}

                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const {settings} = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));