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
import Pagination from "Screens/Components/Pagination/index";
import { GetLanguageDropdown, } from "Screens/Components/GetMetaData/index.js";
import { OptionList } from "Screens/Login/metadataaction";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import { Invoices } from 'Screens/Login/invoices.js';
import { commonHeader } from "component/CommonHeader/index";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "../Institutes/selecthouseaction";
import Loader from "Screens/Components/Loader/index";
import { getLanguage } from "translations/index"
import { Redirect, Route } from 'react-router-dom';
import filterate from 'reducers/Filterthis';
import { PatientMoveFromHouse } from '../PatientFlow/data'
import Modal from "@material-ui/core/Modal";
import Select from "react-select";
import { getPatientData } from 'Screens/Components/CommonApi/index';
import { MultiFilter2 } from '../../Components/MultiFilter'

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
            bills_data: {},
            setStatus: false,
            AllStatus: {},
            finalStatus: {},
            showPopup: false,
            userFilter: '',
            userFilter2: '',
            userFilter3: '',
            users1: [],
            newTask: {},
            PatientList: [],
            PatientStatus: [],
            SpecialityData: [],
            AllPatients: this.props.AllPatients,
            AllSpecialities: this.props.AllSpecialities,
            AllStatus: this.props.AllStatus,
            AllPatientCss: '',
            AllSpcialityCss: '',
            AllStatusCss: ''

        }
    };

    componentDidMount() {
        this.getMetadata();
        this.fetchbillsdata('all', 0);
        this.getPatientData();
        this.getSpeciality();
        let statusList = [{ label: "Paid", value: "Paid" }, { label: "Issued", value: "Issued" },
        { label: "Draft", value: "Draft" }, { label: "Overdue", value: "Overdue" }]
        this.setState({ PatientStatus: statusList })
    }

    // For print invoice
    printInvoice() {
        window.print();
    }

    //patient list
    getPatientData = async () => {
        this.setState({ loaderImage: true });
        let response = await getPatientData(this.props.stateLoginValueAim.token, this.props?.House?.value, 'invoice')
        let patientList = response && response.patientArray && response.patientArray.length > 0 && response.patientArray.map((item) => {
            return { label: item.first_name + " " + item.last_name, value: item.profile_id }
        })
        this.setState({ PatientList: patientList })

    }

    // for Speciality
    getSpeciality = () => {
        let spec = JSON.parse(localStorage.getItem("redux_localstorage_simple"))
        let data = spec && spec.Speciality && spec.Speciality.speciality && spec.Speciality.speciality.SPECIALITY
        let speciality_list = data && data.length > 0 && data.map((item) => {
            return { label: item.specialty_name, value: item._id }
        })
        this.setState({ SpecialityData: speciality_list })
    }

    updateEntryState4 = (e) => {
        this.setState({ userFilter3: e })
    }

    // For page change 
    onChangePage = (pageNumber) => {
        this.setState({
            bills_data: this.state.AllBills.slice(
                (pageNumber - 1) * 10,
                pageNumber * 10
            ),
            currentPage: pageNumber,
        });
    };

    setStatusButton = () => {
        this.setState({ setStatus: true })
    }

    //for PopUp Opening and Closing
    handleOpenPopUp = () => {
        this.setState({ showPopup: true })
    }

    handleClosePopUp = () => {
        this.setState({ showPopup: false })
    }

    //get list of list
    getMetadata = () => {
        this.setState({ allMetadata: this.props.metadata },
            () => {
                var AllStatus = GetLanguageDropdown(
                    this.state.allMetadata &&
                    this.state.allMetadata.billing_status &&
                    this.state.allMetadata.billing_status.length > 0 &&
                    this.state.allMetadata.billing_status,
                    this.props.stateLanguageType,
                );
                this.setState({
                    AllStatus: AllStatus,
                });
            })
    }

    //Patient name
    updateUserFilter = (e) => {
        this.setState({ userFilter: e })
    }

    //Status list
    onStatusChange = (e) => {
        this.setState({ userFilter2: e })
    }

    // Clear Filter
    clearFilter = () => {
        this.setState({
            userFilter: '', userFilter3: '', userFilter2: '',
            AllPatients: this.props.AllPatients, AllSpecialities: this.props.AllSpecialities,
            AllStatus: this.props.AllStatus, showPopup: false
        })
    }

    // Apply Filter
    applyFilter = () => {
        let fullData = this.state.AllBills
        let { userFilter, userFilter3, userFilter2 } = this.state
        let data = MultiFilter2(userFilter, userFilter3, userFilter2, fullData)
        console.log("ALL DATAAAA", userFilter, userFilter3, userFilter2, fullData)
        this.setState({ AllPatients: data, AllPatientCss: 'filterApply' })
        this.setState({ AllSpecialities: data, AllSpcialityCss: 'filterApply' })
        this.setState({ AllStatus: data, AllStatusCss: 'filterApply' })
        // this.handleClosePopUp();
    }

    // Update status acc. to their particular id
    updateStatus = (data, status) => {
        var finalStatus = this.state.AllStatus && this.state.AllStatus.filter((item) => item.value === status)?.[0]
        axios.put(
            sitedata.data.path + "/vh/AddInvoice/" + data._id,
            {
                "status": finalStatus
            },
            commonHeader(this.props.stateLoginValueAim.token)
        )
            .then((responce) => {
                if (status == 'paid') {
                    PatientMoveFromHouse(data.case_id, this.props.stateLoginValueAim.token, 2, false, true)
                }
                else if (status == 'overdue') {
                    PatientMoveFromHouse(data.case_id, this.props.stateLoginValueAim.token, 3)
                }
                this.setState({ setStatus: false });
                this.fetchbillsdata("all", 0);
            });
    }

    // For getting the Bills and implement Pagination
    fetchbillsdata(status, value) {
        this.setState({ loaderImage: true });
        axios
            .get(sitedata.data.path + `/vh/AddInvoice/${this.props?.House?.value}/${status}`,
                commonHeader(this.props.stateLoginValueAim.token))
            .then((response) => {
                if (response.data.hassuccessed) {
                    var totalPage = Math.ceil(response.data.data.length / 10);
                    this.setState(
                        {
                            AllBills: response.data.data,
                            value: value,
                            totalPage: totalPage,
                            currentPage: 1,
                        },
                        () => {
                            this.setState({ loaderImage: false });
                            if (totalPage > 1) {
                                var pages = [];
                                for (var i = 1; i <= this.state.totalPage; i++) {
                                    pages.push(i);
                                }
                                this.setState({
                                    bills_data: this.state.AllBills.slice(0, 10),
                                    pages: pages,
                                });
                            } else {
                                this.setState({ bills_data: this.state.AllBills });
                            }
                        }
                    );
                }
            })
    };

    //Delete the perticular Bill with confirmation box
    removeBills = (data) => {
        // this.setState({ message: null, openTask: false });
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div
                        className={
                            this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode &&
                                this.props.settings.setting.mode === "dark"
                                ? "dark-confirm react-confirm-alert-body"
                                : "react-confirm-alert-body"
                        }
                    >
                        <h1>Remove the Bill?</h1>
                        <p>Are you sure to remove this Bill?</p>
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    this.removeBills2(data);
                                    // onClose();
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                );
            },
        });
    };
    removeBills2 = (data) => {
        // this.setState({ message: null, openTask: false });
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div
                        className={
                            this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode &&
                                this.props.settings.setting.mode === "dark"
                                ? "dark-confirm react-confirm-alert-body"
                                : "react-confirm-alert-body"
                        }
                    >
                        <h1 class="alert-btn">Remove Bill?</h1>
                        <p>Are you really want to remove this Bill?</p>
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    this.deleteClickBill(data);
                                    onClose();
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                );
            },
        });
    };

    deleteClickBill(data) {
        var status = data?.status?.value
        axios
            .delete(sitedata.data.path + "/vh/AddInvoice/" + data,
                commonHeader(this.props.stateLoginValueAim.token))
            .then((response) => {
                var value = this.state.value;
                var ApiStatus = value == 1 ? 'issued' : value == 2 ? 'overdue' : value == 3 ? 'paid' : 'all';
                this.fetchbillsdata(ApiStatus, value);
            })
            .catch((error) => { });
    }

    Invoice = (data) => {
        this.props.history.push({
            pathname: '/virtualHospital/invoices',
            state: { data: data, value: 'duplicate' }
        })
    }

    handleChangeTab = (event, value) => {
        var ApiStatus = value == 1 ? 'issued' : value == 2 ? 'overdue' : value == 3 ? 'paid' : 'all';
        this.fetchbillsdata(ApiStatus, value);
    };


    downloadInvoicePdf = (datas) => {
        var invoice = datas;
        axios
            .post(sitedata.data.path + "/vh/downloadInvoicePdf", invoice,
                { responseType: "blob" }
            )
            .then((res) => {
                this.setState({ loaderImage: false });
                var data = new Blob([res.data]);
                if (typeof window.navigator.msSaveBlob === "function") {
                    // If it is IE that support download blob directly.
                    window.navigator.msSaveBlob(data, "report.pdf");
                } else {
                    var blob = data;
                    var link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "report.pdf";
                    document.body.appendChild(link);
                    link.click(); // create an <a> element and simulate the click operation.
                }

            })
            .catch((err) => {
                this.setState({ loaderImage: false });
            })
            .catch((err) => {
                this.setState({ loaderImage: false });
            });
    };

    render() {
        const { stateLoginValueAim, House } = this.props;
        if (
          stateLoginValueAim.user === "undefined" ||
          stateLoginValueAim.token === 450 ||
          stateLoginValueAim.token === "undefined" ||
          stateLoginValueAim.user.type !== "adminstaff"
        ) {
          return <Redirect to={"/"} />;
        }
        if (House && House?.value === null) {
            return <Redirect to={"/VirtualHospital/institutes"} />;
          }
        let translate = getLanguage(this.props.stateLanguageType);
        let { Billing, filters, Patient, speciality, Status, ID, date, total } = translate;
        const { value, DraftBills, IssuedBills, OverDueBills, PaidBills, bills_data, PatientList, PatientStatus, SpecialityData } = this.state;
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
                    {this.state.loaderImage && <Loader />}
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
                                                        <a onClick={this.handleOpenPopUp}>
                                                            <img src={require('assets/virtual_images/sort.png')} alt="" title="" />
                                                        </a>
                                                        <Modal
                                                            open={this.state.showPopup}
                                                            onClose={this.handleClosePopUp}
                                                            className={
                                                                this.props.settings &&
                                                                    this.props.settings.setting &&
                                                                    this.props.settings.setting.mode === "dark"
                                                                    ? "darkTheme paraBoxModel"
                                                                    : "paraBoxModel"
                                                            }
                                                        >
                                                            <Grid className="fltrClear">
                                                                <Grid className="fltrClearIner">
                                                                    <Grid className="fltrLbl">
                                                                        <Grid className="fltrLblClose">
                                                                            <a onClick={this.handleClosePopUp}>
                                                                                <img
                                                                                    src={require("assets/images/close-search.svg")}
                                                                                    alt=""
                                                                                    title=""
                                                                                />
                                                                            </a>
                                                                        </Grid>
                                                                        <label>{filters}</label>
                                                                    </Grid>
                                                                    <TabContainer>
                                                                        <Grid className="fltrForm">
                                                                            <Grid className="fltrInput">
                                                                                <label>{Patient}</label>
                                                                                <Grid className="addInput">
                                                                                    <Select
                                                                                        name="professional"
                                                                                        onChange={this.updateUserFilter}
                                                                                        value={this.state.userFilter}
                                                                                        options={PatientList}
                                                                                        placeholder="Filter by Patient"
                                                                                        className="addStafSelect"
                                                                                        isMulti={true}
                                                                                        isSearchable={true}
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="fltrInput">
                                                                                <label>{speciality}</label>
                                                                                <Grid className="addInput">
                                                                                    <Select
                                                                                        name="professional"
                                                                                        onChange={this.updateEntryState4}
                                                                                        value={this.state.userFilter3}
                                                                                        options={SpecialityData}
                                                                                        placeholder="Filter by Speciality"
                                                                                        className="addStafSelect"
                                                                                        isMulti={true}
                                                                                        isSearchable={true}
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="fltrInput">
                                                                                <label>{Status}</label>
                                                                                <Grid className="addInput">
                                                                                    <Select
                                                                                        onChange={this.onStatusChange}
                                                                                        options={PatientStatus}
                                                                                        name="specialty_name"
                                                                                        value={this.state.userFilter2}
                                                                                        placeholder="Filter by Status"
                                                                                        className="addStafSelect"
                                                                                        isMulti={true}
                                                                                        isSearchable={true} />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid className="aplyFltr">
                                                                            <Grid className="aplyLft"><label className="filterCursor" onClick={this.clearFilter}>Clear all filters</label></Grid>
                                                                            <Grid className="aplyRght"><Button onClick={this.applyFilter}>Apply filters</Button></Grid>
                                                                        </Grid>
                                                                    </TabContainer>
                                                                </Grid>
                                                            </Grid>
                                                        </Modal>
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
                                                        <Th>{ID}</Th>
                                                        <Th>{Patient}</Th>
                                                        <Th>{date}</Th>
                                                        <Th>{Status}</Th>
                                                        <Th>{total}</Th>
                                                        <Th></Th>
                                                    </Tr>
                                                </Thead>
                                                {this.state.bills_data.length > 0 && this.state.bills_data.map((data) => (
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
                                                                        <a onClick={() => { this.downloadInvoicePdf(data) }}> <li><img src={require('assets/virtual_images/DownloadPDF.png')} alt="" title="" /><span>Download PDF</span></li></a>
                                                                    </ul>
                                                                    {data?.status?.value != 'paid' &&
                                                                        <ul className="setStatus">
                                                                            <a onClick={() => { this.setStatusButton() }}><li><span>Set status</span></li></a>
                                                                            {this.state.setStatus &&
                                                                                <Grid >
                                                                                    <ul>
                                                                                        <a onClick={() => { this.updateStatus(data, "paid") }}><li className="blueDot"><span>Paid</span></li></a>
                                                                                        <a onClick={() => { this.updateStatus(data, "draft") }}><li className="blueDot"><span>Draft</span></li></a>
                                                                                        <a onClick={() => { this.updateStatus(data, "issued") }}><li className="blueDot"><span>Issued</span></li></a>
                                                                                        <a onClick={() => { this.updateStatus(data, "overdue") }}><li className="blueDot"><span>Overdue</span></li></a>
                                                                                    </ul>
                                                                                </Grid>
                                                                            }
                                                                        </ul>
                                                                    }
                                                                    <a onClick={() => { this.removeBills(data._id) }} ><li><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /><span>Delete Invoice</span></li></a>
                                                                </Grid>
                                                            </Button></Td>
                                                        </Tr>
                                                    </Tbody>
                                                ))}

                                            </Table>
                                            <Grid className="tablePagNum">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6}>
                                                        <Grid className="totalOutOff">
                                                            <a>
                                                                {this.state.currentPage} of{" "}
                                                                {this.state.totalPage}
                                                            </a>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {this.state.totalPage > 1 && (
                                                            <Grid className="prevNxtpag">
                                                                <Pagination
                                                                    totalPage={this.state.totalPage}
                                                                    currentPage={this.state.currentPage}
                                                                    pages={this.state.pages}
                                                                    onChangePage={(page) => {
                                                                        this.onChangePage(page);
                                                                    }}
                                                                />
                                                            </Grid>
                                                        )}
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
    const { metadata } = state.OptionList;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        House,
        settings,
        verifyCode,
        invoices,
        metadata,
    };
};
export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect, Invoices, OptionList })(
        Index
    )
);