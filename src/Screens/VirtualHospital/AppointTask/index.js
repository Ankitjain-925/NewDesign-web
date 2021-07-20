import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];
function TabContainer(props) {
    return (
        <Typography component="div">
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
            tabvalue: 0,
            selectedOption: null
        };
    }
    handleChangeTab = (event, tabvalue) => {
        this.setState({ tabvalue });
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    render() {
        const { tabvalue, selectedOption } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>

                           {/* Mobile menu */}
                           <LeftMenuMobile isNotShow={true} currentPage="chat" />
                            <Grid container direction="row">
                                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}


                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="chat" />
                                </Grid>
                                {/* End of Menu */}

                                {/* Start of Right Section */}
                                <Grid item xs={12} md={11}>
                                    <Grid className="topLeftSpc">
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={12} sm={7} md={6}>
                                                <AppBar position="static" className="appTabs">
                                                    <Tabs value={tabvalue} onChange={this.handleChangeTab}>
                                                        <Tab label="All" className="appTabIner" />
                                                        <Tab label="Appointments" className="appTabIner" />
                                                        <Tab label="Tasks" className="appTabIner" />
                                                    </Tabs>
                                                </AppBar>
                                            </Grid>
                                            <Grid item xs={12} sm={5} md={6}>
                                                <Grid className="appontTask">
                                                    <Button>+ Appointment or Task</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {tabvalue === 0 && <TabContainer>
                                            <Grid className="timeSchdul">
                                                <Grid className="srchPatient2">
                                                    <Grid container direction="row" justify="center">
                                                        <Grid item xs={12} md={5}>
                                                            <Grid className="setDate">
                                                                <Button>Today</Button>
                                                                <a>
                                                                    <span className="SelLeft"><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></span>
                                                                    <span className="SelRght"><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></span>
                                                                </a>
                                                                <p>Februar 2021</p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <Grid className="srchRght2">
                                                                <div className="showOnly">
                                                                    <p>Show only:</p>
                                                                    <FormControlLabel
                                                                        control={<Checkbox name="checkedB" color="primary" />}
                                                                        label="My Calendar"
                                                                    />
                                                                </div>
                                                                <a className="srchSort2"><img src={require('assets/virtual_images/sort.png')} alt="" title="" /></a>
                                                                <Select
                                                                    value={selectedOption}
                                                                    onChange={this.handleChange}
                                                                    options={options}
                                                                    placeholder="Month"
                                                                    className="allSpec2"
                                                                    isSearchable={false}
                                                                />
                                                                <a className="lineSort2"><img src={require('assets/virtual_images/lines.png')} alt="" title="" /></a>
                                                                <a className="horzSort2"><img src={require('assets/virtual_images/timeline-view-active.svg')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="calenderDetails">
                                                    <img src={require('assets/virtual_images/calendar2.jpg')} alt="" title="" />
                                                </Grid>
                                            </Grid>
                                        </TabContainer>}
                                        {tabvalue === 1 && <TabContainer>
                                            Appointments Tab content
                                        </TabContainer>}
                                        {tabvalue === 2 && <TabContainer>
                                            Tasks Tab content
                                        </TabContainer>}
                                    </Grid>
                                </Grid>
                                {/* End of Right Section */}

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default Index