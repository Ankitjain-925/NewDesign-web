import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Temprature from 'Screens/Components/Temprature/index';
import axios from "axios";
import sitedata from "sitedata";
import {
    commonHeader,
} from "component/CommonHeader/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";

const options = [
    { value: 'Mr', label: 'Mr.' },
    { value: 'Mrs', label: 'Mrs.' },
];
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCountry: null,
            date: new Date(),
            updateTrack: {}
        };
    }

    componentDidMount() {
        this.getProfessionalInfo();
     }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };




    //get professional info
    getProfessionalInfo = () => {
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/UserProfile/Users/60113e84b488aa271effa411",
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                this.setState({ updateTrack: response.data.data })
             
                // if (response.data.hassuccessed) {
                //     var Done = response.data.data?.length > 0 && response.data.data.filter((item) => item.status === "done")
                //     var Open = response.data.data?.length > 0 && response.data.data.filter((item) => item.status === "open")
                //     this.setState({ AllTasks: response.data.data, DoneTask: Done, OpenTask: Open })
                // }
                this.setState({ loaderImage: false });
            console.log("dara",this.state.updateTrack)

            });
    };

    render() {
        var required = true;
        var disabled = true;
        const { selectedOption } = this.state;
        return (
            <Grid>
                <Grid className="journalAdd">
                    <Grid container direction="row">
                        <Grid item xs={12} md={11}>
                            <Grid container direction="row">
                                <Grid item xs={12} md={12} sm={12}>
                                    <h1>Journal</h1>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Patient Personal Info */}
                <Grid container direction="row">
                    <Grid item xs={12} md={11}>
                        <Grid className="profilePkgIner2">
                            <Grid className="profileId">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={12} md={9}>
                                        <Grid className="profileIdLft">
                                            <Grid container direction="row" alignItems="center" spacing={1}>
                                                <Grid item xs={12} md={7}>
                                                    <label>Profile ID</label><span>P_mDnkbR30d</span>
                                                    <a><img src={require('assets/virtual_images/copycopy.svg')} alt="" title="" /></a>
                                                    <a><img src={require('assets/virtual_images/qr-code.svg')} alt="" title="" /></a>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <label>PIN</label><span>3212</span>
                                                    <a><img src={require('assets/virtual_images/copycopy.svg')} alt="" title="" /></a>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* <Grid className="profileIdRght">
                                            <a>Change ID / PIN</a>
                                        </Grid> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={12} md={10}>
                                    <Grid className="profileInfo">
                                        <Grid className="profileInfoIner">
                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <label>Email address</label>
                                                    <Grid><input type="text"  disabled={disabled} required={required} value={this.state.updateTrack.email} /></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="profileInfoIner titleDegre">
                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={3} >
                                                    <label>Title / Degree </label>
                                                    <Grid>
                                                        <Select isDisabled={true}
                                                            value={selectedOption} 
                                                            onChange={this.handleChange}
                                                            options={options}
                                                            placeholder="Mr." 
                                                            isSearchable={false}
                                                            className="mr_sel"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <label>First name</label>
                                                    <Grid><input type="text" disabled={true} required={required} value={this.state.updateTrack.first_name}/></Grid>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <label>Last name</label>
                                                    <Grid><input type="text" disabled={true} required={required} value={this.state.updateTrack.last_name} /></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="profileInfoDate">
                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={5} lg={4}>
                                                    <label>Date of birth</label>
                                                    <Grid>
                                                        <DatePicker 
                                                            onChange={this.onChange}
                                                            value={this.state.updateTrack.birthday}
                                                            disabled={true}
                                                           
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item  xs={12} md={7} lg={8}>
                                                    <label>Gender</label>
                                                    <Grid>
                                                        <a >Male</a>
                                                        <a >Female</a>
                                                        <a >Other </a>
                                                        
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="profileInfoIner">
                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={8}>
                                                    <label>Street address</label>
                                                    <Grid><input type="text" disabled={true} required={required} value={this.state.updateTrack.address} /></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="profileInfoIner">
                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={8}>
                                                    <label>City</label>
                                                    <Grid><input type="text" disabled={true} required={required} value={this.state.updateTrack.city}/></Grid>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <label>Postal code</label>
                                                    <Grid><input type="text" disabled={true} required={required} value={this.state.updateTrack.country_code} /></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="profileInfoIner">
                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={8}>
                                                    <label>Country</label>
                                                    <Grid>
                                                        <Select isDisabled={true}
                                                            value={this.state.updateTrack.country}
                                                            onChange={this.handleChange}
                                                            options={options}
                                                            placeholder=""
                                                            isSearchable={false}
                                                            className="cntryDrop"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="profileInfoIner">
                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={8}>
                                                    <label>Home telephone number</label>
                                                    <Grid>
                                                        {/* <PhoneInput
                                                            country={'us'}
                                                            value={this.state.phone}
                                                            onChange={phone => this.setState({ phone })}
                                                        /> */}
                                                    </Grid>
                                                </Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="profileInfoIner">
                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={8}>
                                                    <label>Mobile phone number</label>
                                                    <Grid>
                                                        {/* <PhoneInput
                                                            country={'us'}
                                                            value={this.state.phone}
                                                            onChange={phone => this.setState({ phone })}
                                                        /> */}
                                                    </Grid>
                                                </Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="profileInfoIner">
                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={8}>
                                                    <label>Languages spoken</label>
                                                    <Grid>
                                                        <Select isDisabled={true}
                                                            value={selectedOption} onChange={this.handleChange} options={options}
                                                            placeholder="" isSearchable={false}  className="languageSpk" isMulti={true}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="clear"></Grid>
                            </Grid>
                            <Grid className="insrnceTbl">
                                <Grid><h3>Insurance</h3></Grid>
                                <Table>
                                    <Thead>
                                        <Tr><Th>Country of insurance</Th><Th>Insurance Company</Th>
                                        <Th>Insurance Number</Th><Th></Th></Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Germany</Td><Td>Insure Me GmbH</Td><Td>89212318416514</Td>
                                            <Td><img src={require('assets/virtual_images/moreicon.jpg')} alt="" title="" /></Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Germany</Td><Td>Insure Me GmbH</Td><Td>89212318416514</Td>
                                            <Td><img src={require('assets/virtual_images/moreicon.jpg')} alt="" title="" /></Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Grid>
                            <Grid className="infoSub">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={10}>
                                        <Grid container direction="row">
                                            <Grid item xs={12} md={8}>
                                                <Grid><input type="submit" value="Save changes" /></Grid>
                                            </Grid>
                                            <Grid item xs={12} md={4}></Grid>
                                            <Grid className="clear"></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* End of Patient Personal Info */}
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
      state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { House } = state.houseSelect
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    return {
      stateLanguageType,
      stateLoginValueAim,
      loadingaIndicatoranswerdetail,
      House,
      settings,
      verifyCode,
    };
  };
  export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings,authy, houseSelect })(
      Index
    )
  );