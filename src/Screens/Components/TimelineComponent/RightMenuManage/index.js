import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import sitedata from '../../../../sitedata';
import axios from 'axios';
import { ConsoleCustom } from './../../BasicMethod/index';

class RightManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            personalinfo: this.props.personalinfo,
            added_data: this.props.added_data,
        };
    }

    componentDidMount = () => {

    }



    //On change the User Data
    componentDidUpdate = (prevProps) => {
        if (prevProps.added_data !== this.props.added_data) {
            this.setState({ added_data: this.props.added_data })
        }
        if (prevProps.personalinfo !== this.props.personalinfo) {
            this.setState({ personalinfo: this.props.personalinfo })
        }
    }

    render() {
        return (
            <div>
                {this.state.added_data && this.state.added_data.length > 0 && this.state.added_data.map((item) => (
                    <div>
                        {item ===' ' && 
                        <Grid className="persBlodMesur">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="lstView">
                                    <label>Blood Pressure</label>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Grid className="persBlodImg">
                                        <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                <div>
                                    <Grid className="presureData">
                                        <h3>121/80 <span>mmHg</span></h3>
                                        <p>17/07/2020, 12:03 AM</p>
                                    </Grid>
                                    <Grid className="presureDataGrph">
                                        <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    <h3>+ add new entry</h3>
                                </Grid>}
                        </Grid>
                         }

                        <Grid className="persBlodMesur">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="lstView">
                                    <label>Weight BMI</label>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Grid className="persBlodImg">
                                        <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                <div>
                                    <Grid className="presureData">
                                        <h3>121/80 <span>mmHg</span></h3>
                                        <p>17/07/2020, 12:03 AM</p>
                                    </Grid>
                                    <Grid className="presureDataGrph">
                                        <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    <h3>+ add new entry</h3>
                                </Grid>}
                        </Grid>

                        <Grid className="persBlodMesur">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="lstView">
                                    <label>Heart Rate</label>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Grid className="persBlodImg">
                                        <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                <div>
                                    <Grid className="presureData">
                                        <h3>121/80 <span>mmHg</span></h3>
                                        <p>17/07/2020, 12:03 AM</p>
                                    </Grid>
                                    <Grid className="presureDataGrph">
                                        <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    <h3>+ add new entry</h3>
                                </Grid>}
                        </Grid>

                        <Grid className="persBlodMesur">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="lstView">
                                    <label>Creatinine</label>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Grid className="persBlodImg">
                                        <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                <div>
                                    <Grid className="presureData">
                                        <h3>121/80 <span>mmHg</span></h3>
                                        <p>17/07/2020, 12:03 AM</p>
                                    </Grid>
                                    <Grid className="presureDataGrph">
                                        <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    <h3>+ add new entry</h3>
                                </Grid>}
                        </Grid>

                        <Grid className="persBlodMesur">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="lstView">
                                    <label>Blood Sugar</label>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Grid className="persBlodImg">
                                        <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                <div>
                                    <Grid className="presureData">
                                        <h3>121/80 <span>mmHg</span></h3>
                                        <p>17/07/2020, 12:03 AM</p>
                                    </Grid>
                                    <Grid className="presureDataGrph">
                                        <img src={require('../../../../assets/images/lineGraph.png')} alt="" title="" />
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    <h3>+ add new entry</h3>
                                </Grid>}
                        </Grid>



                        <Grid className="drVisit">
                            <h3>Last doctor visits</h3>
                            {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                <div>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={2} md={2}>
                                            <Grid className="drVisitImg">
                                                <img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={10} md={10}>
                                            <Grid className="drVisitData">
                                                <label>Mark Anderson M.D.</label>
                                                <p>17/07/2020, 12:03 AM</p>
                                            </Grid>
                                        </Grid>
                                        <Grid className="clear"></Grid>
                                    </Grid>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={2} md={2}>
                                            <Grid className="drVisitImg">
                                                <img src={require('../../../../assets/images/dr2.jpg')} alt="" title="" />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={10} md={10}>
                                            <Grid className="drVisitData">
                                                <label>Mark Anderson M.D.</label>
                                                <p>17/07/2020, 12:03 AM</p>
                                            </Grid>
                                        </Grid>
                                        <Grid className="clear"></Grid>
                                    </Grid>
                                </div>
                                : <Grid className="noBpData">
                                    <p>No data available</p>
                                    <h3>+ add new entry</h3>
                                </Grid>}
                        </Grid>

                        <Grid className="comeAppoint">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={10} md={10}>
                                    <Grid className="upcomView"><label>Upcoming appointment</label> <a>View all</a></Grid>
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <Grid className="allViewDots">
                                        <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                    </Grid>
                                </Grid>
                                <Grid className="clear"></Grid>
                            </Grid>
                            {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                <div>
                                    <Grid className="oficVisit">
                                        <label>06/08/2020, 9:00 AM</label> <a><img src={require('../../../../assets/images/h2Logo.jpg')} alt="" title="" /> Office visit</a>
                                    </Grid>
                                    <Grid className="neuroSection">
                                        <h3>Neurology</h3>
                                        <Grid><a><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D. (Doctor)</a></Grid>
                                        <Grid><a><img src={require('../../../../assets/images/h2Logo.jpg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                    </Grid>
                                </div> :
                                <Grid className="noBpData">
                                    <p>No data available</p>
                                    <h3>+ add new entry</h3>
                                </Grid>}
                        </Grid>

                        <Grid className="lstDocs">
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={10} md={10}>
                                    <Grid className="lstView">
                                        <label>Last Documents</label> <a>View all</a>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <Grid className="lstViewDots">
                                        <img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                    </Grid>
                                </Grid>
                                <Grid className="clear"></Grid>
                            </Grid>

                            <Grid className="presSec">
                                <a className="presSecAncr">
                                    <h4>Prescription</h4>
                                    {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                        <div>
                                            <Grid container direction="row" alignItems="center" className="metroPro">
                                                <Grid item xs={6} md={6}><h5>Metoprolol</h5></Grid>
                                                <Grid item xs={6} md={6} className="metroPrOpen"><a>Open</a></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                            <Grid className="metroDoctor">
                                                <a><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />
                                    Mark Anderson M.D. (Doctor)</a>
                                            </Grid>
                                        </div> :
                                        <Grid className="noBpData">
                                            <p>No data available</p>
                                            <h3>+ add new entry</h3>
                                        </Grid>}
                                </a>

                                <a className="presSecAncr">
                                    <h4>Sick Certificate</h4>
                                    {this.state.personalinfo && this.state.personalinfo.weight_bmi ?
                                        <div>
                                            <Grid container direction="row" alignItems="center" className="metroPro">
                                                <Grid item xs={12} md={12}><h5>Temperature and headaches</h5></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                            <Grid className="metroDoctor">
                                                <a><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />
                                    Mark Anderson M.D. (Doctor)</a>
                                            </Grid>
                                        </div> :
                                        <Grid className="noBpData">
                                            <p>No data available</p>
                                            <h3>+ add new entry</h3>
                                        </Grid>}
                                </a>
                            </Grid>
                        </Grid>
                    </div>
                ))}
            </div>
        )
    }
}

export default RightManage;