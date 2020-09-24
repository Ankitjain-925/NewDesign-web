import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import { getDate, newdate, getTime } from './../../BasicMethod/index';
import FileViews from './../FileViews/index';


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
                item: this.props.data, loggedinUser: this.props.loggedinUser
            })
        }
        if (prevProps.images !== this.props.images) {
            this.setState({ images: this.props.images })
        }
    }

    render() {
        var item = this.state.item;
        return (
            <Grid container direction="row" className="descpCntnt">
                <Grid item xs={1} md={1} className="descpCntntLft">
                    {newdate(item.created_on)}
                </Grid>
                <Grid item xs={11} md={10}>
                    <Grid className="descpInerRght descpInerPurple">

                        <Grid container direction="row" className="addSpc">
                            <Grid item xs={12} md={6}>
                                <Grid className="blodPrsurImg purpleSpan">
                                    <a className="diryNote"><img src={require('../../../../assets/images/sick-certificate-prescription.svg')} alt="" title="" />
                                        <span>Prescription</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="bp_vsblSec scndOptionIner1">
                                    <a className="bp_vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                    <a className="vsblTime" data-tip data-for={item.track_id + 'visibility'}>
                                        <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                    </a>
                                    <ReactTooltip className="timeIconClas" id={item.track_id + 'visibility'} place="top" effect="solid" backgroundColor="#ffffff">
                                        {item.visible === 'show' ? <label>Show until</label> : <label>Hide until</label>}
                                        {item.public === 'always' ? <p> Always </p> : <p>{getDate(item.public, this.state.date_format)}</p>}
                                    </ReactTooltip>
                                    <a className="openScndhrf1">
                                        <img src={require('../../../../assets/images/threedots.jpg')} alt="" title="" className="openScnd1" />
                                        {!this.props.Archive ? <ul>
                                            {console.log('this.state.loggedinUser._id', this.state.loggedinUser._id)}
                                            {console.log('item.created_by', item.created_by )}
                                            <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />Archive</a></li>
                                            {this.state.loggedinUser._id === item.created_by && <li><a onClick={() => this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />Edit</a></li>}
                                            {this.state.loggedinUser._id !== item.created_by && <li><a onClick={() => this.props.EidtOption(item.type, item, true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />Change Visibility</a></li>}
                                            <li><a onClick={() => this.props.downloadTrack(item)}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />Download</a></li>
                                            <li><a onClick={(deleteKey) => this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Delete</a></li>
                                        </ul> :
                                            <ul>
                                                <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />De-Archive</a></li>
                                                <li><a onClick={(deleteKey) => this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Delete</a></li>
                                            </ul>}
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="bp_hg addSpc">
                            <label>Prescription<span></span></label>
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
                            <Collapsible trigger="Images & Files" open="true">
                                <FileViews images={this.state.images} attachfile={item.attachfile} />
                            </Collapsible>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Index;