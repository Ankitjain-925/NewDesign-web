import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Toggle from 'react-toggle';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import { LanguageFetchReducer } from './../../actions';
import Loader from './../../Components/Loader/index';
import { Redirect, Route } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import sitedata from '../../../sitedata';
import "react-toggle/style.css";

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
        // new Timer(this.logOutClick.bind(this))
    }

    componentDidMount() {

    }

    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient') {
            return (<Redirect to={'/'} />);
        }
        return (
            <Grid className="homeBg">
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <LeftMenu currentPage="more" />
                                {/* End of Website Menu */}

                                {/* Website Mid Content */}
                                <Grid item xs={12} md={8}>
                                    <Grid className="blockChainLog">
                                        <h1>Blockchain Access Log</h1>
                                        <Grid className="blockChainDtail">

                                            <Grid className="blockChainUpr">

                                                <Grid className="blochChainHead">
                                                    <Grid><label>Log type</label></Grid>
                                                    <Grid><label>Created by</label></Grid>
                                                    <Grid><label>Time created</label></Grid>
                                                </Grid>

                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>

                                                <Collapsible trigger="">
                                                    <Grid container direction="row" className="subsDetails">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Diagnosed by</span></Grid>
                                                                <Grid item xs={12} md={7}><label>Mark Anderson M.D.</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Diagnosed by</span></Grid>
                                                                <Grid item xs={12} md={7}><label>Mark Anderson M.D.</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>

                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>
                                                <Collapsible trigger="">
                                                    <Grid container direction="row" className="subsDetails">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Diagnosed by</span></Grid>
                                                                <Grid item xs={12} md={7}><label>Mark Anderson M.D.</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Diagnosed by</span></Grid>
                                                                <Grid item xs={12} md={7}><label>Mark Anderson M.D.</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>

                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>
                                                <Collapsible trigger="">
                                                    Dummy
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>

                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>
                                                <Collapsible trigger="">
                                                    Dummy
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>

                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>
                                                <Collapsible trigger="">
                                                    Dummy
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>

                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>
                                                <Collapsible trigger="">
                                                    Dummy
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Website Right Content */}

                            </Grid>
                        </Grid>
                    </Grid >
                </Grid >
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail} = state.LoginReducerAim;
    const { stateLanguageType} = state.LanguageReducer;
    const { settings} = state.Settings;
    // const {Doctorsetget} = state.Doctorset;
    // const {catfil} = state.filterate;
    return {
                    stateLanguageType,
                    stateLoginValueAim,
                    loadingaIndicatoranswerdetail,
                    settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings})(Index));