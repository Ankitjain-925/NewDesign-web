import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ColorSelection from "Screens/Components/VirtualHospitalComponents/ColorSelection/index";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import AddRoom from "Screens/Components/VirtualHospitalComponents/AddRoom/index";
import RoomView from "Screens/Components/VirtualHospitalComponents/RoomView/index";
import Loader from "Screens/Components/Loader/index";
import { confirmAlert } from "react-confirm-alert";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { houseSelect } from "../Institutes/selecthouseaction";
import { Speciality } from "Screens/Login/speciality.js";
import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import Collapsible from 'react-collapsible';
import SpecialityButton from "Screens/Components/VirtualHospitalComponents/SpecialityButton";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AvailablebedListing from "Screens/Components/VirtualHospitalComponents/AvailablebedListing"
import { getLanguage } from "translations/index"
import Select from "react-select";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderImage: false,
            openSpecl: false,
            openSpecl2: false,
            openSpecl3: false,
            openWard: false,
            openRoom: false,
            specialityColor: false,
            openSpecl4: false,
            speciality: {},
            ward: {},
            specialityData: [],
            specialityData2: [],
            isEditWrd: false,
            deleteId: false,
            SearchValue: '',
            errorMsg2: '',
            errorMsg: '',
            errorStatus: false,
            openHouse1: this.props.openHouse1,
            weoffer: {},
            weoffer1: {},
            buttonCall: true,
            option: [{ value: "ten", label: "Ten" }, { value: "twenty", label: "Twenty" }, { value: "thirty", label: "Thirty" }]
        };
    }


    componentDidUpdate = (prevProps) => {
        if (prevProps.openHouse1 !== this.props.openHouse1) {
            this.setState({
                openHouse1: this.props.openHouse1,


            });
        }
    };
    handleOpenSpecl = () => {
        this.setState({ openSpecl: true });
    };
    handleweoffer = (value) => {
        const state = this.state.weoffer;
        state[value] = !state[value];
        this.setState({ weoffer: state });
    };
    handleweoffer1 = (value) => {
        const state = this.state.weoffer1;
        state[value] = !state[value];
        this.setState({ weoffer1: state });
    };
    handleweoffer4 = (value) => {
        if (value === "check") {
            this.setState({ weoffer: { EditProject: true, SelectProduct: true, ManagerMember: true }, buttonCall: false });
        } else {
            this.setState({ weoffer: { EditProject: false, SelectProduct: false, ManagerMember: false }, buttonCall: true });

        }
    };
    handleweoffer3 = (value) => {

        if (value === "check") {
            this.setState({ weoffer1: { View: true, Add: true, Edit: true }, buttonCall: false });
        } else {
            this.setState({ weoffer1: { View: false, Add: false, Edit: false }, buttonCall: true });

        }
    };
    handleChange = (input, value) => {
        this.setState({ [input]: value });

    };

    render() {
        var { openHouse1, weoffer, weoffer1 } = this.state
        console.log("1234567", openHouse1)
        return (
            <Grid>
                <Modal
                    open={this.state.openHouse1}
                    onClose={this.props.closeHouse1}

                    className={
                        this.props.settings &&
                            this.props.settings.setting &&
                            this.props.settings.setting.mode &&
                            this.props.settings.setting.mode === "dark"
                            ? "darkTheme addSpeclModel"
                            : "addSpeclModel"
                    }
                >

                    <Grid className="addSpeclContnt">
                        <Grid className="addSpeclContntIner">
                            <Grid className="addSpeclLbl">
                                <Grid className="addSpeclClose">
                                    <a onClick={this.props.closeHouse1}>
                                        <img
                                            src={require("assets/images/close-search.svg")}
                                            alt=""
                                            title=""
                                        />
                                    </a>
                                </Grid>
                                <Grid className="heading"><p >New Role</p></Grid>
                                <Grid className="line">
                                    <Grid item xs={12} md={8}>
                                        <Grid className="newrole">
                                            <label>Name</label>
                                            <input
                                                name="Name"
                                                type="text"
                                                onChange={(e) => { this.handleChange("Name", e.target.value) }}
                                                value={this.state.Name}

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid className="newrole" >
                                            <label>Global Role</label>
                                            {/* <input
                                            name="GlobalRole"
                                            type="Checkbox"
                                            onChange={(e) => { this.handleChange1("GlobalRole", e.target.value) }}
                                            value={this.state.GlobalRole}
                                        /> */}
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="GlobalRole"
                                                        value={this.state.GlobalRole == true ? false : true}
                                                        checked={this.state.GlobalRole}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                GlobalRole: e.target.checked,
                                                            });
                                                        }}
                                                    />
                                                }

                                            />

                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid className="newrole">
                                            <label>Work Package can be<br/> assigned to user and groups<br /> in possion role in<br/> reprensentative</label>
                                            {/* <label>Work Package can be</label><label> assigned to user and groups</label><label> in possion role in</label><label> reprensentative</label> */}

                                            {/* <input
                                            name="footer"
                                            type="Checkbox"
                                            onChange={(e) => { this.handleChange1("footer", e.target.value) }}
                                            value={this.state.footer}
                                        /> */}
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="Work"
                                                        value={this.state.Work == true ? false : true}
                                                        checked={this.state.Work}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                Work: e.target.checked,
                                                            });
                                                        }}
                                                    />
                                                }

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid className="newrole" >
                                            <label>Copy Work </label>

                                            <Grid className="selectEntry">
                                                <Select
                                                    options={this.state.option}
                                                    placeholder="Select"
                                                    name="title"
                                                    isSearchable="true"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Grid className="newrole">
                                        <Grid className="headsize">
                                            <Collapsible
                                                trigger="Project"
                                                open="true"
                                            >
                                                {/* <Grid >
                                                <input
                                                    type="Checkbox"
                                                    checked={
                                                        weoffer && weoffer.EditProject
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={() => { this.handleweoffer("EditProject") }}
                                                />
                                                <label>Edit Project</label>

                                            </Grid> */}
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name="EditProject"
                                                                value={this.state.weoffer && this.state.weoffer.EditProject && this.state.weoffer.EditProject == true ? false : true}
                                                                checked={this.state.weoffer.EditProject}
                                                                onChange={() =>
                                                                    this.handleweoffer("EditProject")
                                                                }
                                                            />
                                                        }
                                                        label="Edit Project"
                                                    />
                                                </Grid>
                                                {/* <Grid >
                                                <input
                                                    type="Checkbox"
                                                    checked={
                                                        weoffer && weoffer.SelectProduct
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={() => { this.handleweoffer("SelectProduct") }}
                                                />
                                                <label>Select Product Modules</label>

                                            </Grid> */}
                                                <Grid>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name="SelectProduct"
                                                                value={this.state.weoffer && this.state.weoffer.SelectProduct && this.state.weoffer.SelectProduct == true ? false : true}
                                                                checked={this.state.weoffer.SelectProduct}
                                                                onChange={(e) =>
                                                                    this.handleweoffer("SelectProduct")
                                                                }
                                                            />
                                                        }
                                                        label="Select Product Modules"
                                                    />
                                                </Grid>
                                                <Grid >
                                                    {/* <input
                                                    type="Checkbox"
                                                    checked={
                                                        weoffer && weoffer.ManagerMember
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={() => { this.handleweoffer("ManagerMember") }}
                                                />
                                                <label>Manager Member</label> */}
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name="ManagerMember"
                                                                value={this.state.weoffer && this.state.weoffer.ManagerMember && this.state.weoffer.ManagerMember == true ? false : true}
                                                                checked={this.state.weoffer.ManagerMember}
                                                                onChange={() =>
                                                                    this.handleweoffer("ManagerMember")
                                                                }
                                                            />
                                                        }
                                                        label="Manager Member"
                                                    />

                                                </Grid>
                                            </Collapsible>
                                        </Grid>
                                        <Grid>
                                            {this.state.buttonCall == true ? <p onClick={() => { this.handleweoffer4("check") }}>Check All / UnCheck All</p> :
                                                <p onClick={() => { this.handleweoffer4("uncheck") }}> Check All / UnCheck All</p>}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <Grid className="newrole">
                                        <Grid className="headsize">
                                            <Collapsible
                                                trigger="Work Package Tracking"
                                                open="true"
                                            >
                                                <Grid>
                                                    <Grid >
                                                        {/* <input
                                                    type="Checkbox"
                                                    checked={
                                                        weoffer1 && weoffer1.View
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={() => { this.handleweoffer1("View") }}
                                                />
                                                <label>View Work Package</label> */}
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    name="View"
                                                                    value={this.state.weoffer1 && this.state.weoffer1.View && this.state.weoffer1.View == true ? false : true}
                                                                    checked={this.state.weoffer1.View}
                                                                    onChange={(e) =>
                                                                        this.handleweoffer1(e)
                                                                    }
                                                                />
                                                            }
                                                            label="View Work Package"
                                                        />

                                                    </Grid>
                                                    <Grid >
                                                        {/* <input
                                                    type="Checkbox"
                                                    checked={
                                                        weoffer1 && weoffer1.Add
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={(e) => { this.handleweoffer1("Add") }}
                                                />
                                                <label>Add work Package</label> */}
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    name="Add"
                                                                    value={this.state.weoffer1 && this.state.weoffer1.Add && this.state.weoffer1.Add == true ? false : true}
                                                                    checked={this.state.weoffer1.Add}
                                                                    onChange={(e) =>
                                                                        this.handleweoffer1(e)
                                                                    }
                                                                />
                                                            }
                                                            label="View Work Package"
                                                        />

                                                    </Grid>
                                                    <Grid >
                                                        {/* <input
                                                    type="Checkbox"
                                                    checked={
                                                        weoffer1 && weoffer1.Edit
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={(e) => { this.handleweoffer1("Edit") }}
                                                />
                                                <label>Edit Work Package</label> */}
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    name="Edit"
                                                                    value={this.state.weoffer1 && this.state.weoffer1.Edit && this.state.weoffer1.Edit == true ? false : true}
                                                                    checked={this.state.weoffer1.Edit}
                                                                    onChange={(e) =>
                                                                        this.handleweoffer1(e)
                                                                    }
                                                                />
                                                            }
                                                            label="Edit Work Package"
                                                        />

                                                    </Grid>
                                                </Grid>
                                            </Collapsible>
                                        </Grid>
                                        <Grid>
                                            {this.state.buttonCall == true ? <p onClick={() => { this.handleweoffer3("check") }}>Check All/UnCheck All</p> :
                                                <p onClick={() => { this.handleweoffer3("uncheck") }}>Check All / UnCheck All</p>}
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>
                </Modal>
            </Grid>
        )
    }

}


const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
        state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { House } = state.houseSelect;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    const { speciality } = state.Speciality;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
        House,
        speciality
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        LanguageFetchReducer,
        Settings,
        authy,
        houseSelect,
        Speciality
    })(Index)
);