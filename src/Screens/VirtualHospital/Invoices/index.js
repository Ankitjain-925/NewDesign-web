import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import {
    commonHeader,
    commonCometDelHeader,
} from "component/CommonHeader/index";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "../Institutes/selecthouseaction";
import { Redirect, Route } from 'react-router-dom';
import InvoicesDownloadPdf from "Screens/Components/VirtualHospitalComponents/InvoicesDownloadPdf/index";
import InvoicesPatientStatus from "Screens/Components/VirtualHospitalComponents/InvoicesPatientStatus/index";
import InvoicesShowServices from "Screens/Components/VirtualHospitalComponents/InvoicesShowServices/index";

const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];
const customStyles = {
    control: base => ({
        ...base,
        height: 48,
        minHeight: 48
    })
};



class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Serivce_data: {},
            serviceList: []
        };
    }

    componentDidMount() {
        this.getAllServices();
    }

    getAllServices = () => {
        var serviceList = [], serviceList1 = [],
            serviceArray = [];
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/GetService/" + this.props?.House?.value,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                console.log("response", response)
                this.setState({ allServData: response.data.data })
                for (let i = 0; i < this.state.allServData.length; i++) {
                    var service = '';
                    if (this.state.allServData[i]?.title && this.state.allServData[i]?.price) {
                        service = this.state.allServData[i]?.title + ' ' + this.state.allServData[i]?.price
                    }
                    else if (this.state.allServData[i]?.title) {
                        service = this.state.allServData[i]?.title
                    }
                    serviceArray.push({
                        service: service,
                    })
                    serviceList.push({ value: this.state.allServData[i]._id, label: service })
                    serviceList1.push({ profile_id: this.state.allServData[i].profile_id, value: this.state.allServData[i]._id, label: service })
                }
                this.setState({ users: serviceArray, service_id_list: serviceList, service_id_list1: serviceList1 })
                console.log("serviceList", serviceList);
            });
    }


    handleChange = selectedOption => {              
        this.setState({ selectedOption });
    };
    render() {
        const { selectedOption } = this.state;
        return (
            <Grid className={
                this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "homeBg darkTheme"
                    : "homeBg"
            }>
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>

                            <LeftMenuMobile isNotShow={true} currentPage="chat" />
                            <Grid container direction="row">
                                {/* <VHfield service="ANkit" Onclick2={(service, value)=>{this.myclick(service , value)}}/> */}


                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="chat" />
                                </Grid>
                                {/* End of Menu */}

                                {/* Start of Right Section */}
                                <Grid item xs={12} md={11}>
                                    <Grid className="topLeftSpc">

                                        {/* Back common button */}
                                        <Grid className="extSetting">
                                            <a><img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" />
                                                Back to Billing</a>
                                        </Grid>
                                        {/* End of Back common button */}

                                        {/* Billing New Invoice */}
                                        {/* <Grid className="drftDwnload">

                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} md={6}>
                                                    <Grid className="draftDateLft">
                                                        <label>2021-00246</label>
                                                        <span>Draft</span>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Grid className="draftDateRght">
                                                        <Button className="downloadPDF">
                                                            <img src={require('assets/virtual_images/downloadIcon.png')} alt="" title="" />
                                                            Download PDF
                                                        </Button>
                                                        <Button className="downloadDots">
                                                            <img src={require('assets/virtual_images/threeDots.png')} alt="" title="" />
                                                            <Grid className="actionList">
                                                                <ul className="actionPdf">
                                                                    <li><img src={require('assets/virtual_images/DuplicateInvoice.png')} alt="" title="" /><span>Duplicate Invoice</span></li>
                                                                    <li><img src={require('assets/virtual_images/PrintInvoice.png')} alt="" title="" /><span>Print Invoice</span></li>
                                                                    <li><img src={require('assets/virtual_images/DownloadPDF.png')} alt="" title="" /><span>Download PDF</span></li>
                                                                </ul>
                                                                <ul className="setStatus">
                                                                    <li><span>Set status</span></li>
                                                                    <li><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /><span>Delete Invoice</span></li>
                                                                </ul>
                                                            </Grid>
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid> */}

                                        <InvoicesDownloadPdf
                                            label="2021-00246"
                                            status="Draft"
                                        />

                                        <Grid className="srvcContent">
                                            {/* <Grid className="invoiceForm">
                                                <Grid container direction="row" alignItems="center" spacing={3}>
                                                    <Grid item xs={12} md={3} className="invoiceID">
                                                        <label>Invoice ID</label>
                                                        <TextField placeholder="Invoice ID" value="548756" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <label>Patient</label>
                                                        <Grid className="patntDropUpr">
                                                            <Grid className="patntDropDwn">
                                                                <Grid className="patntImg"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Grid>
                                                                <Grid>
                                                                    <label>James Morrison</label>
                                                                    <p>P_mDnkbR30d</p>
                                                                </Grid>
                                                                <Grid className="patntRmv"><img src={require('assets/virtual_images/remove-3.svg')} alt="" title="" /></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <label>Status</label>
                                                        <Select
                                                            value={selectedOption}
                                                            onChange={this.handleChange}
                                                            options={options}
                                                            placeholder="Draft"
                                                            className="cstmSelect"
                                                            isSearchable={false}
                                                            styles={customStyles}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid> */}

                                            <InvoicesPatientStatus
                                                label="James Morrison"
                                                case_id="P_mDnkbR30d"
                                                options={options}
                                            />


                                            <Grid className="srvcTable">
                                                {/* <h3>Services</h3>
                                                <Table>
                                                    <Thead>
                                                        <Tr>
                                                            <Th>Service</Th><Th>Qty</Th><Th>Price</Th><Th></Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        <Tr>
                                                            <Td>
                                                                <label>X-ray</label>
                                                                <p>This can be a short description of this service.</p>
                                                            </Td>
                                                            <Td>1</Td>
                                                            <Td>200,00 €</Td>
                                                            <Td className="xRay-edit">
                                                                <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                                                <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                                            </Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>
                                                                <label>CT Scan</label>
                                                                <p>This can be a short description of this service.</p>
                                                            </Td>
                                                            <Td>15</Td>
                                                            <Td>200,00 €</Td>
                                                            <Td className="xRay-edit">
                                                                <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                                                <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                                            </Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>
                                                                <label>X-ray</label>
                                                                <p>This can be a short description of this service.</p>
                                                            </Td>
                                                            <Td>20</Td>
                                                            <Td>200,00 €</Td>
                                                            <Td className="xRay-edit">
                                                                <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                                                <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                                            </Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>
                                                                <label>CT Scan</label>
                                                                <p>This can be a short description of this service.</p>
                                                            </Td>
                                                            <Td>15</Td>
                                                            <Td>200,00 €</Td>
                                                            <Td className="xRay-edit">
                                                                <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                                                <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                                            </Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>
                                                                <label>X-ray</label>
                                                                <p>This can be a short description of this service.</p>
                                                            </Td>
                                                            <Td>20</Td>
                                                            <Td>200,00 €</Td>
                                                            <Td className="xRay-edit">
                                                                <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                                                <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                                            </Td>
                                                        </Tr>
                                                    </Tbody>
                                                </Table> */}

                                                <InvoicesShowServices />

                                            </Grid>

                                            <Grid className="addCstmField">
                                                <Grid container direction="row" alignItems="center" spacing={3}>
                                                    <Grid item xs={12} md={4}>
                                                        <label>Add service</label>
                                                        {console.log("servicefdfdss", this.state.service_id_list)}
                                                        <Select
                                                            // value={this.state.serviceList}
                                                            onChange={this.handleChange}
                                                            options={this.state.service_id_list}
                                                            placeholder="Search service or add custom input"
                                                            className="cstmSelect"
                                                            isSearchable={false}
                                                            styles={customStyles}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <label>Quantity</label>
                                                        <TextField placeholder="Enter quantity" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <label>Price per quantity</label>
                                                        <TextField placeholder="Enter price €" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} className="addSrvcBtn">
                                                        <Button>Add</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid className="addCstmField">
                                                <Grid container direction="row" alignItems="center" spacing={3}>
                                                    <Grid item xs={12} md={4}>
                                                        <label>Custom service title</label>
                                                        <TextField placeholder="Custom service title" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <label>Custom service description</label>
                                                        <TextField placeholder="Custom service description" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid className="invoiceAmnt">
                                                <p>Invoice amount</p>
                                                <label>480,00 €</label>
                                                <Grid>
                                                    <Button>Finish Invoice</Button>
                                                    <Button>Save Draft</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* End of Billing New Invoice */}

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
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect })(
        Index
    )
);