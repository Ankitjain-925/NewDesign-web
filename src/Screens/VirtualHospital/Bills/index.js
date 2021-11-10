import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import { Invoices } from 'Screens/Login/invoices.js';
import { commonHeader } from "component/CommonHeader/index";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "../Institutes/selecthouseaction";
import { Redirect, Route } from 'react-router-dom';
import {
    getLanguage
} from "translations/index"

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
            AllBills: {},
            PaidBills: {},
            OverDueBills: {},
            DraftBills: {},
            IssuedBills: {},
            billsdata: {}
        }
    };


    componentDidMount() {
        this.fetchbillsdata('all', 0);
    }

    fetchbillsdata(status, value) {
        axios
        .get(sitedata.data.path + `/vh/AddInvoice/${this.props?.House?.value}/${status}`,
        commonHeader(this.props.stateLoginValueAim.token))
        .then((response) => {
          if (response.data.hassuccessed) {
            this.setState({ AllBills : response.data.data, value: value });
          }
        });
    }

    Invoice = (data) => {
        this.props.history.push({
            pathname: '/virtualHospital/invoices',
            state: { data: data }
        })
    }

    handleChangeTab = (event, value) => {
        var ApiStatus = value==1 ? 'issued' : value==2 ? 'overdue' : value==3 ? 'paid' : 'all';
        this.fetchbillsdata(ApiStatus, value);
    };

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { Billing } = translate;
        const { value, DraftBills, IssuedBills, OverDueBills, PaidBills } = this.state;
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
                            {/* Mobile menu */}
                            <LeftMenuMobile currentPage="chat" />
                            {/* End of mobile menu */}
                            <Grid container direction="row">
                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr"><LeftMenu currentPage="chat" /></Grid>
                                {/* End of Menu */}
                                {/* Start of Right Section */}
                                <Grid item xs={12} md={10}>
                                    <Grid className="topLeftSpc">
                                        <Grid container direction="row">
                                            <Grid item xs={6} md={6}>
                                                <Grid className="extSetting">
                                                    <h1>{Billing}</h1>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                                <Grid className="newServc">
                                                    <Button onClick={() => { this.Invoice('new') }}>+ New Invoice</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="bilingTabUpr">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} sm={9} md={9}>
                                                    <AppBar position="static" className="billTabs">
                                                        <Tabs value={value} onChange={this.handleChangeTab}>
                                                            <Tab label="All" className="billtabIner" />
                                                            <Tab label="Issued" className="billtabIner" />
                                                            <Tab label="Overdue" className="billtabIner" />
                                                            <Tab label="Paid" className="billtabIner" />
                                                        </Tabs>
                                                   </AppBar>
                                                </Grid>
                                                <Grid item xs={12} sm={3} md={3}>
                                                    <Grid className="billSeting">
                                                        <a><img src={require('assets/virtual_images/sort.png')} alt="" title="" /></a>
                                                        <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                                                        <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="billInfoData">
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>ID</Th>
                                                        <Th>Patient</Th>
                                                        <Th>Date</Th>
                                                        <Th>Status</Th>
                                                        <Th>Total</Th>
                                                        <Th></Th>
                                                    </Tr>
                                                </Thead>
                                                {this.state.AllBills.length > 0 && this.state.AllBills.map((data) => (
                                                    <Tbody>
                                                        <Tr>
                                                            <Td>{data?.invoice_id}</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />{data?.patient?.first_name} {data?.patient?.last_name}</Td>
                                                            <Td>{data.created_at}</Td>
                                                            <Td className="greyDot"><span></span>{data?.status?.label}</Td>
                                                            <Td>{data?.total_amount} €</Td>
                                                            <Td className="billDots"><Button className="downloadDots">
                                                                <img src={require('assets/virtual_images/threeDots.png')} alt="" title="" />
                                                                <Grid className="actionList">
                                                                    <ul className="actionPdf">
                                                                        <a onClick={() => { this.Invoice(data) }}><li><img src={require('assets/virtual_images/DuplicateInvoice.png')} alt="" title="" /><span>Duplicate Invoice</span></li></a>
                                                                        <a onClick={this.printInvoice}> <li><img src={require('assets/virtual_images/PrintInvoice.png')} alt="" title="" /><span>Print Invoice</span></li></a>
                                                                        <li><img src={require('assets/virtual_images/DownloadPDF.png')} alt="" title="" /><span>Download PDF</span></li>
                                                                    </ul>
                                                                    <ul className="setStatus">
                                                                        <li><span>Set status</span></li>
                                                                        <li><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /><span>Delete Invoice</span></li>
                                                                    </ul>
                                                                </Grid>
                                                            </Button></Td>
                                                        </Tr>
                                                    </Tbody>
                                                ))}
                                            </Table>
                                            <Grid className="billPagination">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6}>
                                                        <Grid className="billPaginationLft"><p>25 of 36</p></Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Grid className="billPaginationRght">
                                                            <p><a>Previous</a><span>1</span><span>2</span><span>3</span><a>Next</a></p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
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
    const { invoices } = state.Invoices;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        House,
        settings,
        verifyCode,
        invoices
    };
};
export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect, Invoices })(
        Index
    )
);