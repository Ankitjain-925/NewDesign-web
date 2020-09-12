import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import { getDate, newdate, getTime } from './../../BasicMethod/index';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.data || {},
            date_format: this.props.date_format,
            time_foramt: this.props.time_format
        };
    }

    componentDidMount = () => {

    }

    render() {
        var item = this.state.item;
        return (
            <Grid container direction="row" className="descpCntnt">
                <Grid item xs={1} md={1} className="descpCntntLft">
                    {newdate(item.created_on)}
                </Grid>
                <Grid item xs={11} md={10} className="descpCntntRght">
                    <Grid className="descpInerRght descpInerBlue">

                        <Grid container direction="row" className="addSpc">
                            <Grid item xs={12} md={6}>
                                <Grid className="blodPrsurImg">
                                    <a className="blodPrsurNote"><img src={require('../../../../assets/images/blood-pressure-sugar.svg')} alt="" title="" />
                                        <span>Blood Sugar</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="bp_vsblSec">
                                    <a className="bp_vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                    <a className="vsblTime" data-tip data-for={item.track_id + 'visibility'}>
                                        <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                    </a>
                                    <ReactTooltip className="timeIconClas" id={item.track_id + 'visibility'} place="top" effect="solid" backgroundColor="#ffffff">
                                        {item.visible==='show' ? <label>Show until</label> :  <label>Hide until</label> }
                                        {item.public === 'always' ? <p> Always </p> : <p>{getDate(item.public, this.state.date_format)}</p> }
                                    </ReactTooltip>
                                    <a className="bp_vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="bp_hg addSpc">
                            <label>{item.blood_sugar && item.blood_sugar} <span>mg/dl</span></label>
                            {/* <p>Normal</p> */}
                        </Grid>

                        <Grid container direction="row" className="addSpc bpJohnMain">
                            <Grid item xs={12} md={12}>
                                <Grid className="bpJohnImg">
                                    <a><img src={require('../../../../assets/images/person1.jpg')} alt="" title="" />
                                        <span>{item.created_by_temp}</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="addSpc detailMark">
                            <Collapsible trigger="Details" open="true">
                                <Grid className="detailCntnt">
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Blood Sugar</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.blood_sugar && item.blood_sugar}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Situation</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.situation && item.situation.label}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Hba1c</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.Hba1c && item.Hba1c}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Date & Time</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.date_measured && getDate(item.date_measured , this.state.date_format)} {item.time_measured && ', ' + getTime(new Date(item.time_measured) , this.state.time_foramt)}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="clear"></Grid>
                                    </Grid>
                                    <Grid className="bp_graph">
                                        <Grid><img src={require('../../../../assets/images/gp.png')} alt="" title="" /></Grid>
                                        <Grid><a>View in fullscreen</a></Grid>
                                    </Grid>
                                </Grid>
                            </Collapsible>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Index;

