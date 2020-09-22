import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";

class EmptyData extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }
    componentDidMount = () => {

    }
    render() {
        return (
            <div>
                <Grid container direction="row">
                    <Grid item xs={11} md={11} className="descpCntntRght">
                        <Grid className="welAimedis">
                            <Grid>
                                <h1>Welcome to Aimedis</h1>
                                <p>Your healthcare platform on the Blockchain</p>
                                <h2>We’ve prepared a short introductory video which sums all the benefits <br />
                                you get from using the Aimedis platform.</h2>
                            </Grid>
                            <Grid className="welVideo">
                                <img src={require('../../../../assets/images/vdo.jpg')} alt="" title="" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container direction="row" className="descpCntnt2">
                    <Grid item xs={1} md={1} className="descpCntntLft2">
                        <a>21 <span>May</span></a>
                    </Grid>
                    <Grid item xs={11} md={10} className="descpCntntRght2">
                        <Grid className="descpInerRght2">

                            <Grid container direction="row" className="addSpc2">
                                <Grid item xs={12} md={6}>
                                    <Grid className="diagnosImg2">
                                        <a className="diagnosNote2"><img src={require('../../../../assets/images/entry.png')} alt="" title="" />
                                            <span>Entry example</span> </a>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid className="vsblSec2">
                                        <a className="vsblDots2"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                    </Grid>
                                </Grid>
                                <Grid className="clear"></Grid>
                            </Grid>

                            <Grid className="icd_num2 addSpc2">
                                <label>Journal entry</label>
                                <a data-tip data-for="icdtxtTip">Example</a>
                                <ReactTooltip className="icdtxtClas" id="icdtxtTip" place="top" effect="solid" backgroundColor="#ffffff">
                                    <h4>Mild depressive episode</h4>
                                </ReactTooltip>
                            </Grid>

                            <Grid container direction="row" className="addSpc2 markCntntMain2">
                                <Grid item xs={12} md={12}>
                                    <Grid className="markCntntImg2">
                                        <a><img src={require('../../../../assets/images/logo_new2.png')} alt="" title="" />
                                            <span>Aimedis Team</span>
                                        </a>
                                    </Grid>
                                </Grid>
                                <Grid className="clear"></Grid>
                            </Grid>

                            <Grid className="addSpc2 detailMark2">
                                <Collapsible trigger="Notes" open="true">
                                    <Grid className="detailCntnt2">
                                        <p>This is an example entry on your journal timeline. All entries,
                                        such as “Diagnosis”, “Doctor visits”, “Laboratory results” and more,
                                        will appear here.
                                        </p>
                                    </Grid>
                                </Collapsible>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default EmptyData;




