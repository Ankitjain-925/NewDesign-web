import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

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
            value: 0,
        };
    }
    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { value } = this.state;
        return (
            <Grid>
                <Grid className="journalAdd">
                    <Grid container direction="row">
                        <Grid item xs={12} md={11}>
                            <Grid container direction="row">
                                <Grid item xs={12} md={6} sm={6}><h1>Tasks</h1></Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    <Grid className="AddEntrynw"><a href="">+ Add Task</a></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="presPkgIner1">
                    <Grid container direction="row">
                        <Grid item xs={12} md={11}>
                            <AppBar position="static" className="presTabsUpr">
                                <Grid container direction="row">
                                    <Grid item xs={8} md={8}>
                                        <Tabs value={value} onChange={this.handleChangeTabs} className="presTabs">
                                            <Tab label="ALL" className="presTabsIner" />
                                            <Tab label="Done" className="presTabsIner" />
                                            <Tab label="Open" className="presTabsIner" />
                                        </Tabs>
                                    </Grid>
                                    <Grid item xs={4} md={4} className="presSrch">
                                        <a><img src={require('assets/virtual_images/sort.png')} alt="" title="" /></a>
                                        <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                                    </Grid>
                                </Grid>
                            </AppBar>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={12} md={11}>
                        {value === 0 && <TabContainer>
                            <Grid className="taskAllTab">
                                {/* Start Neurology Collection  */}
                                <Grid className="neuroList">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={6}>
                                            <Grid className="nuroTask">
                                                <Grid><img src={require('assets/virtual_images/circleRght.jpg')} alt="" title="" /></Grid>
                                                <Grid className="nuroTaskRght">
                                                    <label>Neurology</label>
                                                    <p>Task for a nurse not relate…</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="noteLink">
                                                <a><img src={require('assets/virtual_images/note.png')} alt="" title="" /><span>1</span></a>
                                                <a><img src={require('assets/virtual_images/link1.png')} alt="" title="" /><span>2</span></a>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="nuropenBtn">
                                                <Button><span className="nuroCrcle"></span>Open</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Grid className="nuroDr">
                                                <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Neurology Collection  */}

                                {/* Start Neurology Collection  */}
                                <Grid className="neuroList nuroTaskDisable">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={6}>
                                            <Grid className="nuroTask">
                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                <Grid className="nuroTaskRght">
                                                    <label>Neurology</label>
                                                    <p>Review patient files</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="noteLink">
                                                <a><img src={require('assets/virtual_images/note.png')} alt="" title="" /><span>1</span></a>
                                                <a><img src={require('assets/virtual_images/link1.png')} alt="" title="" /><span>2</span></a>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="nuropenBtn">
                                                <Button><span className="nuroCrcle"></span>Open</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Grid className="nuroDr">
                                                <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Neurology Collection  */}

                                {/* Start Neurology Collection  */}
                                <Grid className="neuroList">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={6}>
                                            <Grid className="nuroTask">
                                                <Grid><img src={require('assets/virtual_images/circleRght.jpg')} alt="" title="" /></Grid>
                                                <Grid className="nuroTaskRght">
                                                    <label>Neurology</label>
                                                    <p>Task for a nurse not relate…</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="noteLink">
                                                <a><img src={require('assets/virtual_images/note.png')} alt="" title="" /><span>1</span></a>
                                                <a><img src={require('assets/virtual_images/link1.png')} alt="" title="" /><span>2</span></a>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="nuropenBtn">
                                                <Button><span className="nuroCrcle"></span>Open</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Grid className="nuroDr">
                                                <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Neurology Collection  */}

                                {/* Start Neurology Collection  */}
                                <Grid className="neuroList nuroTaskDisable">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={6}>
                                            <Grid className="nuroTask">
                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                <Grid className="nuroTaskRght">
                                                    <label>Neurology</label>
                                                    <p>Review patient files</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="noteLink">
                                                <a><img src={require('assets/virtual_images/note.png')} alt="" title="" /><span>1</span></a>
                                                <a><img src={require('assets/virtual_images/link1.png')} alt="" title="" /><span>2</span></a>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="nuropenBtn">
                                                <Button><span className="nuroCrcle"></span>Open</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Grid className="nuroDr">
                                                <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Neurology Collection  */}

                                {/* Start Neurology Collection  */}
                                <Grid className="neuroList">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={6}>
                                            <Grid className="nuroTask">
                                                <Grid><img src={require('assets/virtual_images/circleRght.jpg')} alt="" title="" /></Grid>
                                                <Grid className="nuroTaskRght">
                                                    <label>Neurology</label>
                                                    <p>Task for a nurse not relate…</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="noteLink">
                                                <a><img src={require('assets/virtual_images/note.png')} alt="" title="" /><span>1</span></a>
                                                <a><img src={require('assets/virtual_images/link1.png')} alt="" title="" /><span>2</span></a>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="nuropenBtn">
                                                <Button><span className="nuroCrcle"></span>Open</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Grid className="nuroDr">
                                                <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Neurology Collection  */}

                                {/* Start Neurology Collection  */}
                                <Grid className="neuroList nuroTaskDisable">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={6}>
                                            <Grid className="nuroTask">
                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                <Grid className="nuroTaskRght">
                                                    <label>Neurology</label>
                                                    <p>Review patient files</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="noteLink">
                                                <a><img src={require('assets/virtual_images/note.png')} alt="" title="" /><span>1</span></a>
                                                <a><img src={require('assets/virtual_images/link1.png')} alt="" title="" /><span>2</span></a>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Grid className="nuropenBtn">
                                                <Button><span className="nuroCrcle"></span>Open</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Grid className="nuroDr">
                                                <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Neurology Collection  */}

                            </Grid>
                        </TabContainer>}

                    </Grid>
                </Grid>

            </Grid>
        );
    }
}
export default Index