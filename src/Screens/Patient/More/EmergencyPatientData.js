import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import Modal from '@material-ui/core/Modal';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ paddingTop: 24 }}>
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};
const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            selectedOption: null,
            openFancy: false,
            openWish: false,
            openCart: false,
        };
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeSelect = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    // fancybox open
    handleOpenFancy = () => {
        this.setState({ openFancy: true });
    };
    handleCloseFancy = () => {
        this.setState({ openFancy: false });
    };

    handleOpenWish = () => {
        this.setState({ openWish: true });
    };
    handleCloseWish = () => {
        this.setState({ openWish: false });
    };

    handleOpenCart = () => {
        this.setState({ openCart: true });
    };
    handleCloseCart = () => {
        this.setState({ openCart: false });
    };

    render() {
        const { value } = this.state;
        const { selectedOption } = this.state;
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

                                    <Grid container direction="row">
                                        <Grid item xs={12} md={8}>
                                            <Grid className="healthStatus">
                                                <h2>Health Status</h2>
                                                <Grid container direction="row" spacing={2}>

                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="medicalNotify">
                                                            <Grid className="medicalLabl">
                                                                <label>Medications</label>
                                                            </Grid>
                                                            <Grid className="medicalDesp">
                                                                <p>No medications</p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="medicalNotify">
                                                            <Grid className="medicalLabl">
                                                                <label>Allergies</label>
                                                            </Grid>
                                                            <Grid className="medicalDesp">
                                                                <p><a>Strawberries</a></p>
                                                                <p><a>Peanuts</a></p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="medicalNotify">
                                                            <Grid className="medicalLabl">
                                                                <label>Diagnoses</label>
                                                            </Grid>
                                                            <Grid className="medicalDesp">
                                                                <p><a>Depression</a></p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
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
export default Index