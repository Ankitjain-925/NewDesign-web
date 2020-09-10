import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';

function TabContainer(props) {
    return (
        <Typography component="div" className="tabsCntnts">
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            openSrvc: false,
            vData: false
        };
    }

    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    // fancybox open
    handleOpenSrvc = () => {
        this.setState({ openSrvc: true });
    };
    handleCloseSrvc = () => {
        this.setState({ openSrvc: false });
    };

    handleOpenvData = () => {
        this.setState({ vData: true });
    };
    handleClosevData = () => {
        this.setState({ vData: false });
    };

    render() {
        const { value } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                <LeftMenu currentPage ="tracker"/>
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={9}>
                                    <Grid className="docsOpinion">
                                        <Grid container direction="row" className="docsOpinLbl">
                                            <Grid item xs={12} md={6}><label>Trackers & Self Data</label></Grid>
                                            <Grid item xs={12} md={6} className="docsOpinRght">
                                                <a onClick={this.handleOpenSrvc}>+ Connect</a>
                                            </Grid>
                                        </Grid>

                                        {/* Model setup */}
                                        <Modal
                                            open={this.state.openSrvc}
                                            onClose={this.handleCloseSrvc}
                                            className="srvcBoxModel">
                                            <Grid className="srvcBoxCntnt">
                                                <Grid className="srvcCourse">
                                                    <Grid className="srvcCloseBtn">
                                                        <a onClick={this.handleCloseSrvc}>
                                                            <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                        </a>
                                                    </Grid>
                                                    <Grid><label>Connect Devices & Services</label></Grid>

                                                    <Grid className="srchSrvc">
                                                        <input type="text" placeholder="Search for device or service name..." />
                                                        <img src={require('../../../assets/images/InputField.svg')} alt="" title="" />
                                                    </Grid>

                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="fitBitSection">
                                                                <Grid className="mainLogo1"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                <Grid className="mainLogoAdd">
                                                                    <a><img src={require('../../../assets/images/add.svg')} alt="" title="" className="addBlue" />
                                                                        <img src={require('../../../assets/images/addgrey.svg')} alt="" title="" className="addGray" />Connect</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="fitBitSection">
                                                                <Grid className="mainLogo2"><img src={require('../../../assets/images/within.png')} alt="" title="" /></Grid>
                                                                <Grid className="mainLogoAdd">
                                                                    <a><img src={require('../../../assets/images/add.svg')} alt="" title="" className="addBlue" />
                                                                        <img src={require('../../../assets/images/addgrey.svg')} alt="" title="" className="addGray" />Connect</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="fitBitSection">
                                                                <Grid className="mainLogo3"><img src={require('../../../assets/images/x23.png')} alt="" title="" /></Grid>
                                                                <Grid className="mainLogoAdd">
                                                                    <a><img src={require('../../../assets/images/add.svg')} alt="" title="" className="addBlue" />
                                                                        <img src={require('../../../assets/images/addgrey.svg')} alt="" title="" className="addGray" />Connect</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="fitBitSection">
                                                                <Grid className="mainLogo1"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                <Grid className="mainLogoAdd">
                                                                    <a><img src={require('../../../assets/images/add.svg')} alt="" title="" className="addBlue" />
                                                                        <img src={require('../../../assets/images/addgrey.svg')} alt="" title="" className="addGray" />Connect</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="fitBitSection">
                                                                <Grid className="mainLogo1"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                <Grid className="mainLogoAdd">
                                                                    <a> <img src={require('../../../assets/images/add.svg')} alt="" title="" className="addBlue" />
                                                                        <img src={require('../../../assets/images/addgrey.svg')} alt="" title="" className="addGray" />Connect</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of Model setup */}

                                        <Grid className="presPkgIner1">
                                            {/* Tabs  */}
                                            <AppBar position="static" className="presTabsUpr">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={8}>
                                                        <Tabs value={value} onChange={this.handleChangeTabs} className="presTabs">
                                                            <Tab label="Trackers & Devices" className="presTabsIner" />
                                                            <Tab label="Self Data Services" className="presTabsIner" />
                                                        </Tabs>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} className="presSrch">
                                                        <a><img src={require('../../../assets/images/search-entries.svg')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </AppBar>
                                        </Grid>
                                        <Grid className="presPkgIner2">
                                            {value === 0 && <TabContainer>

                                                {/* <Grid className="noDevices">
                                                    <h1>No devices connected</h1>
                                                    <p>Your connected devices will appear here</p>
                                                    <h3><a>Connect a device</a></h3>
                                                </Grid> */}

                                                {/* Trackers & Devices Design */}
                                                <Grid className="selfData">
                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a onClick={this.handleOpenvData}>View data</a></Grid>
                                                            </Grid>

                                                            {/* Model setup */}
                                                            <Modal
                                                                open={this.state.vData}
                                                                onClose={this.handleClosevData}
                                                                className="datBoxModel">
                                                                <Grid className="datBoxCntnt">

                                                                    <Grid className="datCourse">
                                                                        <Grid className="datCloseBtn">
                                                                            <a onClick={this.handleClosevData}>
                                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                                            </a>
                                                                        </Grid>
                                                                        <Grid className="expndLogo">
                                                                            <a><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></a>
                                                                            <a><img src={require('../../../assets/images/within.png')} alt="" title="" /></a>
                                                                            <a><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></a>
                                                                        </Grid>
                                                                        <Grid className="fitBitVersaUpr">
                                                                            <Grid className="fitBitVersa fitBitVersaActv">
                                                                                <label>Klemen’s Fitbit 1</label>
                                                                                <p>Fitbit Versa 2</p>
                                                                            </Grid>
                                                                            <Grid className="fitBitVersa">
                                                                                <label>Klemen’s Fitbit 1</label>
                                                                                <p>Fitbit Versa 2</p>
                                                                            </Grid>
                                                                            <Grid className="fitBitVersa">
                                                                                <label>Klemen’s Fitbit 1</label>
                                                                                <p>Fitbit Versa 2</p>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid className="editDevice">

                                                                        <Grid>
                                                                            <Grid className="disCnct">
                                                                                <Grid className="disCnctLft">
                                                                                    <Grid>
                                                                                        <label>Klemen’s Fitbit 1
                                                                                          <a><img src={require('../../../assets/images/editBlue.png')} alt="" title="" /></a>
                                                                                        </label>
                                                                                    </Grid>
                                                                                    <p>Fitbit Versa 2</p>
                                                                                </Grid>
                                                                                <Grid className="disCnctRght">
                                                                                    <a>Disconnect device</a>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                        <Grid className="disCnctContent">
                                                                            <Grid container direction="row" justify="center" alignItems="center">
                                                                                <Grid item xs={12} md={8}>
                                                                                    <p>This view will depend on what the API serves from a specific tracking device. 
                                                                                    It is good to have a  similar/same view as the dashboard fitbit owners see in the 
                                                                                    original app.</p>    
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </Grid>

                                                                </Grid>
                                                            </Modal>
                                                            {/* End of Model setup */}
                                                        </Grid>

                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                                {/* End of Trackers & Devices Design */}
                                            </TabContainer>}

                                            {value === 1 && <TabContainer>
                                                <Grid className="noDevices">
                                                    <h1>No devices connected</h1>
                                                    <p>Your connected devices will appear here</p>
                                                    <h3><a>Connect a device</a></h3>
                                                </Grid>
                                            </TabContainer>}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default Index