import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import FileViews from './../FileViews/index';
import ReactTooltip from "react-tooltip"

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.data || {},
            date_format: this.props.date_format,
            time_foramt: this.props.time_format,
            archive: this.props.archive,
            loggedinUser: this.props.loggedinUser,
            images: this.props.images,
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data || prevProps.loggedinUser !== this.props.loggedinUser) {
            this.setState({
                item: this.props.data, loggedinUser: this.props.loggedinUser,
            })
        }
        if(prevProps.images !== this.props.images)
        {
            this.setState({ images: this.props.images})
        }
    }

    render() {
        return (
            <Grid container direction="row" className="descpCntnt">
                <Grid item xs={1} md={1} className="descpCntntLft">
                    <a>21 <span>May</span></a>
                </Grid>
                <Grid item xs={11} md={10} className="descpCntntRght">
                    <Grid className="descpInerRght">

                        <Grid container direction="row" className="addSpc">
                            <Grid item xs={12} md={6}>
                                <Grid className="diagnosImg">
                                    <a className="diagnosNote"><img src={require('../../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>Diagnosis</span> </a>
                                    <a className="diagnosAwrd"><img src={require('../../../../assets/images/confirmed-diagnosis.svg')} alt="" title="" /></a>
                                    <a className="diagnosBus"><img src={require('../../../../assets/images/emergency-diagnosis.svg')} alt="" title="" /></a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="vsblSec">
                                    <a className="vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                    <a className="vsblTime" data-tip data-for="timeIconTip">
                                        <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                    </a>
                                    <ReactTooltip className="timeIconClas" id="timeIconTip" place="top" effect="solid" backgroundColor="#ffffff">
                                        <label>Visible until</label>
                                        <p>12/08/2020</p>
                                    </ReactTooltip>
                                    <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="icd_num addSpc">
                            <label>Depression</label>
                            <a data-tip data-for="icdtxtTip">ICD: F32.0</a>
                            <ReactTooltip className="icdtxtClas" id="icdtxtTip" place="top" effect="solid" backgroundColor="#ffffff">
                                <h4>Mild depressive episode</h4>
                            </ReactTooltip>
                        </Grid>

                        <Grid container direction="row" className="addSpc markCntntMain">
                            <Grid item xs={12} md={5}>
                                <Grid className="markCntntImg">
                                    <a><img src={require('../../../../assets/images/person1.jpg')} alt="" title="" />
                                        <span>Mark Anderson M.D. (Doctor)</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Grid className="markMDCntntImg">
                                    <a><img src={require('../../../../assets/images/hLogo.jpg')} alt="" title="" />
                                        <span>Illinois Masonic Medical Center</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="addSpc detailMark">
                            <Collapsible trigger="Details" open="true">
                                <Grid className="detailCntnt">
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Diagnosed by</label></Grid>
                                                <Grid item xs={7} md={7}><span>Mark Anderson M.D.</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Allergy</label></Grid>
                                                <Grid item xs={7} md={7}><span>No</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Diagnosed on</label></Grid>
                                                <Grid item xs={7} md={7}><span>20/05/2020</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Travel Diagnosis</label></Grid>
                                                <Grid item xs={7} md={7}>
                                                    <span>Yes</span>
                                                    <a className="yesInfo" data-tip data-for="yesInfoTip">
                                                        <img src={require('../../../../assets/images/yesinfo.jpg')} alt="" title="" />
                                                    </a>
                                                    <ReactTooltip className="yesInfoClas" id="yesInfoTip" place="top" effect="solid" backgroundColor="#ffffff">
                                                        <h4>Traveled to Africa</h4>
                                                        <p>06/02/2020 - 26/02/2020</p>
                                                    </ReactTooltip>
                                                </Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="clear"></Grid>
                                    </Grid>
                                </Grid>
                            </Collapsible>
                        </Grid>

                        <Grid className="addSpc detailMark">
                            <Collapsible trigger="Notes" open="true">
                                <Grid className="detailCntnt">
                                    <p>
                                        Multiple lesions again suggest chronic demyelination. Mild atrophy greatest in the
                                        frontal region may be associated with multiple sclerosis. Findings appear stable when
                                        compared with the prior study. There is no abnormal enhancement.
                                </p>
                                </Grid>
                            </Collapsible>
                        </Grid>

                        {/* <Grid className="addSpc detailMark">
                            <Collapsible trigger="Images & Files" open="true">
                                <FileViews images={this.state.images} attachfile={item.attachfile} />
                            </Collapsible>
                        </Grid> */}

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Index;

