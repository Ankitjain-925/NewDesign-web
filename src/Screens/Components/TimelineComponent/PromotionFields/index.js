import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import NotesEditor from "Screens/Components/CommonApi/index";
import { getPatientData } from "Screens/Components/CommonApi/index";

const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
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
            noWards: false,
            value: 0,
            newdata: [],
            buttonField: false,
            users1: {}
        };
    }

    componentDidMount = () => {
        this.getPatientData();
    };

    handleOpenRvw = () => {
        this.setState({ noWards: true });
    }

    handleCloseRvw = () => {
        this.setState({ noWards: false });
    }

    handleChangeTab = (event, value) => {
        this.setState({ value });
    };

    onFieldChange1 = (e, name) => {
        //   console.log('e',e,name)
        var state = this.state.newdata;
        state[name] = e
        this.setState({ newdata: state });
        // console.log('nghch',this.state.newdata)
    }

    //Get patient list
    getPatientData = async () => {
        this.setState({ loaderImage: true });
        let response = await getPatientData(this.props.stateLoginValueAim.token, this.props?.House?.value)
        if (response.isdata) {
            this.setState({ users1: response.PatientList1, users: response.patientArray, loaderImage: false })
            // console.log('users1',this.state.users1)
        }
        else {
            this.setState({ loaderImage: false });
        }
    }

    handleChange1 = (e, name) => {
        var state = this.state.newdata;
        state[name] = e.target.value
        this.setState({ newdata: state });
    };

    handleChange2 = (e, name) => {
        // console.log('e',e,name)
        var state = this.state.newdata
        state[name] = e.value
        this.setState({ newdata: state });
        // console.log('e',e)
    };

    updateEntryState1 = (value, name) => {
        var state = this.state.newdata;
        state[name] = value;
        this.setState({ newdata: state });
    };

    updateEntryState2 = (e) => {
        if (e === true) {
            this.setState({ buttonField: true })
        } else {
            this.setState({ buttonField: false })
        }
        // console.log("e", e, name)
    }

    // handleSubmit = () => {
    //     console.log("data", this.state.newdata)
    //     this.setState({ newdata: {} })
    // };

    render() {
        return (
            <Grid>
                <div>
                    <Grid className="cnfrmDiaMain">
                        <Modal>
                            <Grid className="sendSpecific" >
                                <Grid className="sendSpecificIner" >
                                    <Grid className="sendSpecificBtm" >
                                        <Grid className="sendSpecifiClose" >
                                            <a onClick={this.handleCloseRvw}> <img src={require("assets/virtual_images/closefancy.png")} alt="" title="" /> </a>
                                        </Grid>
                                        < Grid ><label>New entry</label></Grid >
                                        <Grid>
                                            <select>
                                                <option>Journal Promotion 1 </option>
                                                <option > Journal Promotion 2 </option>
                                                <option > Journal Promotion 3 </option>
                                            </select>
                                        </Grid>
                                    </Grid>
                                    <Grid className="fillDia">
                                        <Grid className="rrSysto">
                                            <label>Who would you like to send this to ?</label>
                                        </Grid>
                                        <AppBar position="static" className="spcificTabs" >
                                            <Tabs value={value} onChange={this.handleChangeTab} >
                                                <Tab label="Specific Patients" />
                                                <Tab label="All Patients" />
                                            </Tabs>
                                        </AppBar>
                                        {value === 0 && <TabContainer>
                                            <Grid className="fillDia">
                                                <Grid><label>Send to </label></Grid>
                                                <Select
                                                    name="patient"
                                                    options={this.state.users1}
                                                    placeholder="Search & Select"
                                                    onChange={(e) => this.onFieldChange1(e, "patient")}
                                                    value={this.state.newdata.patient}
                                                    className="addStafSelect"
                                                    isMulti={true}
                                                    isSearchable={true}
                                                />
                                            </Grid>
                                            <Grid className="fillDia">
                                                <Grid><label>Promotion Type</label></Grid>
                                                <Select
                                                    onChange={(e) => { this.handleChange2(e, "Promotion type") }}
                                                    options={options}
                                                    placeholder="Hints"
                                                    isSearchable={true}
                                                    className="promotionSelect"
                                                />
                                            </Grid>
                                            <Grid className="fillDia" >
                                                <Grid><label>Title </label></Grid >
                                                <Grid>
                                                    <TextField
                                                        placeholder="Enter title name"
                                                        onChange={(e) => { this.handleChange1(e, "title") }} />
                                                </Grid >
                                            </Grid>
                                            <Grid className="fillDia">
                                                <Grid className="rrSysto">
                                                    <Grid><label>Text </label></Grid >
                                                    <NotesEditor
                                                        label={Text}
                                                        onChange={(e) => this.updateEntryState1(e, "Text")}
                                                        value={this.state.newdata.Text}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid className="fillDia" >
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        // name="Add button at the end of post"
                                                        name="end_post"
                                                        checked={this.state.newdata?.post}
                                                        onChange={(e) =>
                                                            this.updateEntryState2(
                                                                e.target.checked,
                                                                "post"
                                                            )}
                                                    />
                                                    }
                                                    label="Add button at the end of post"
                                                />
                                            </Grid>
                                            {this.state.buttonField === true && (
                                                <Grid className="fillDia">
                                                    <Grid className="rrSysto">
                                                        <label>Set Button Text</label>
                                                    </Grid>
                                                    <Grid className="rrSysto">
                                                        <TextField
                                                            placeholder="Set button text"
                                                            onChange={(e) => { this.handleChange1(e, "Set button text") }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            )}
                                            {/* <Grid className="fillDia" >
                                                <Button onClick={() => this.handleSubmit()}>Save</Button>
                                            </Grid > */}
                                        </TabContainer>}
                                        {value === 1 && <TabContainer>
                                            {/* <Grid className="fillDia">
                                                <Grid><label>Send to </label></Grid>
                                                <Select
                                                    name="patient"
                                                    options={this.state.users1}
                                                    placeholder="Search & Select"
                                                    onChange={(e) => this.onFieldChange1(e, "patient")}
                                                    value={this.state.newdata.patient}
                                                    className="addStafSelect"
                                                    isMulti={true}
                                                    isSearchable={true}
                                                />
                                            </Grid> */}
                                            <Grid className="fillDia">
                                                <Grid><label>Promotion Type</label></Grid>
                                                <Select
                                                    onChange={(e) => { this.handleChange2(e, "Promotion type") }}
                                                    options={options}
                                                    placeholder="Hints"
                                                    isSearchable={true}
                                                    className="promotionSelect"
                                                />
                                            </Grid>
                                            <Grid className="fillDia" >
                                                <Grid><label>Title </label></Grid >
                                                <Grid>
                                                    <TextField
                                                        placeholder="Enter title name"
                                                        onChange={(e) => { this.handleChange1(e, "title") }} />
                                                </Grid >
                                            </Grid>
                                            <Grid className="fillDia">
                                                <Grid className="rrSysto">
                                                    <Grid><label>Text </label></Grid >
                                                    <NotesEditor
                                                        label={Text}
                                                        onChange={(e) => this.updateEntryState1(e, "Text")}
                                                        value={this.state.newdata.Text}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid className="fillDia" >
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        // name="Add button at the end of post"
                                                        name="end_post"
                                                        checked={this.state.newdata?.post}
                                                        onChange={(e) =>
                                                            this.updateEntryState2(
                                                                e.target.checked,
                                                                "post"
                                                            )}
                                                    />
                                                    }
                                                    label="Add button at the end of post"
                                                />
                                            </Grid>
                                            {this.state.buttonField === true && (
                                                <Grid className="fillDia">
                                                    <Grid className="rrSysto">
                                                        <label>Set Button Text</label>
                                                    </Grid>
                                                    <Grid className="rrSysto">
                                                        <TextField
                                                            placeholder="Set button text"
                                                            onChange={(e) => { this.handleChange1(e, "Set button text") }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            )}
                                            {/* <Grid className="fillDia" >
                                                <Button onClick={() => this.handleSubmit()}>Save</Button>
                                            </Grid > */}
                                        </TabContainer>}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Modal>
                    </Grid>
                </div >
            </Grid >
        )
    }
}