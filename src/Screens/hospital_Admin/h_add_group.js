import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import axios from 'axios';
import { LanguageFetchReducer } from 'Screens/actions';
import sitedata from 'sitedata';
import Button from "@material-ui/core/Button";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { getDate, getImage, blockClick } from 'Screens/Components/BasicMethod/index'
import * as translationEN from './translations/en_json_proofread_13072020.json';
import * as translationDE from "./translations/de.json"
import H_LeftMenu from "Screens/Components/Menus/H_leftMenu/index"
import H_LeftMenuMobile from "Screens/Components/Menus/H_leftMenu/mobile"
import { SearchUser } from 'Screens/Components/Search';
import CreateAdminUser from "Screens/Components/CreateHospitalUser/index";
import ViewDetail from "Screens/Components/ViewInformation/index";
import "./style.css";
import Modal from "@material-ui/core/Modal";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import { commonHeader, commonCometDelHeader } from 'component/CommonHeader/index';
import Pagination from "Screens/Components/Pagination/index";
import Loader from "Screens/Components/Loader/index";

const specialistOptions = [
    { value: 'Specialist1', label: 'Specialist1' },
    { value: 'Specialist2', label: 'Specialist2' },
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openGroup : false,

        };
    }
    //open the institute group
    openInstitute = ()=>{
        this.setState({openGroup: true})
    }
    //close the institute group
    closeInstitute = ()=>{
        this.setState({openGroup: false})
    }


    render() {
        if(this.props.stateLoginValueAim.user.type != "hospitaladmin"){
            this.props.history.push("/")
        }
        let translate={};
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            default :
                translate = translationEN.text
        }
        let {  } = translate

        return (
            <Grid className="homeBg">
                 {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>

                            <Grid container direction="row">
                                {/* Mobile menu */}
                                <H_LeftMenuMobile isNotShow={true} currentPage="staff_List" />
                                {/* End of mobile menu */}

                                {/* Website Menu */}
                                <H_LeftMenu isNotShow={true} currentPage="staff_List" />
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={10} className="adminMenuRghtUpr">
                                    <Grid container direction="row" justifyContent="center" className="archvOpinLbl">
                                        <Grid item xs={12} md={6}><label>Institute Groups</label></Grid>
                                        <Grid item xs={12} md={6} className="archvOpinRght">
                                            <a onClick={()=>{this.openInstitute()}}>+ Add Institute Group</a>
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                    <Modal
                                        open={this.state.openGroup}
                                        onClose={this.closeInstitute}
                                        className="addSpeclModel"
                                        >
                                        <Grid className="addSpeclContnt">
                                            <Grid className="addSpeclLbl">
                                            <Grid className="addSpeclClose">
                                                <a onClick={this.closeInstitute}>
                                                <img
                                                    src={require("assets/virtual_images/closefancy.png")}
                                                    alt=""
                                                    title=""
                                                />
                                                </a>
                                            </Grid>
                                            <Grid>
                                                <label>Add Institute Group</label>
                                            </Grid>
                                            </Grid>
                                            <Grid className="enterSpclUpr">
                                            <Grid className="enterSpclMain">
                                                <Grid className="enterSpcl">
                                                <Grid container direction="row">
                                                    <Grid item xs={10} md={12}>
                                                    <VHfield
                                                        label="Speciality"
                                                        name="group_name"
                                                        placeholder="Enter institute group name"
                                                        onChange={(e) => this.updateEntryState(e)}
                                                    />
                                                    </Grid>
                                                </Grid>
                                                <Grid className="spclSaveBtn saveNclose">
                                                    <Button onClick={this.SaveSpeciality}>
                                                    Save
                                                    </Button>
                                                </Grid>
                                                </Grid>
                                            </Grid>
                                            </Grid>
                                        </Grid>
                                        </Modal>
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
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    // const { settings } = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        // settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));