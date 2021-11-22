import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { confirmAlert } from "react-confirm-alert";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { OptionList } from "Screens/Login/metadataaction";
import axios from "axios";
import Loader from "Screens/Components/Loader/index";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import Modal from "@material-ui/core/Modal";
import { commonHeader, } from "component/CommonHeader/index";
import { GetLanguageDropdown, } from "Screens/Components/GetMetaData/index.js";
import { authy } from 'Screens/Login/authy.js';
import { Invoices } from 'Screens/Login/invoices.js';
import { houseSelect } from "../Institutes/selecthouseaction";
import InvoicesDownloadPdf from "Screens/Components/VirtualHospitalComponents/InvoicetopData/index";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import { getPatientData } from "Screens/Components/CommonApi/index";


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
            serviceList: [],
            addinvoice: {},
            items: [],
            totalPrice: 0,
            editServ: false,
            users1: {},
            AllStatus: [],
            service: {},
            viewCutom: false,
            serviceList1: [],
            selectedPat: {},
            newServiceIndex: false,
            error: ''
        };
    }

    componentDidMount() {
        this.getMetadata()
        this.getAllServices();
        this.getPatientData();

        if (this.props.history.location?.state?.data && this.props.history.location?.state?.data === 'new') {
            this.setState({ addinvoice: {} })
            // console.log("hello", this.props.history.location?.state?.data)
        }
        else if (this.props.history.location?.state?.data && this.props.history.location?.state?.value === "duplicate") {
            var duplicateData = this.props.history.location?.state?.data
            this.setState({ addinvoice: duplicateData })
            // var patientName = this.props.history.location?.state?.data.filter((item) => item.patient)
            // console.log("patientName",patientName)
        }
        else if (this.props.history.location?.state?.data?.addinvoice && this.props.history.location?.state?.data) {
            var newdata = this.props.history.location?.state?.data
            // how to delete the field of onject in js
            this.setState({ addinvoice: newdata })
        }
    }

    //get list of list
    getMetadata = () => {
        this.setState({ allMetadata: this.props.metadata },
            () => {
                this.GetLanguageMetadata();
            })
    }

    //Get All status
    GetLanguageMetadata = () => {
        var AllStatus = GetLanguageDropdown(
            this.state.allMetadata &&
            this.state.allMetadata.billing_status &&
            this.state.allMetadata.billing_status.length > 0 &&
            this.state.allMetadata.billing_status,
            this.props.stateLanguageType
        );
        this.setState({
            AllStatus: AllStatus,
        });
    };

    //Get patient list
    getPatientData = async () => {
        this.setState({ loaderImage: true });
        let response = await getPatientData(this.props.stateLoginValueAim.token, this.props?.House?.value, 'invoice')
        if (response.isdata) {
            this.setState({ users1: response.PatientList1, users: response.patientArray, loaderImage: false })
        }
        else {
            this.setState({ loaderImage: false });
        }
    }

    //get services list
    getAllServices = () => {
        var serviceList = [], serviceList1 = [];
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/GetService/" + this.props?.House?.value,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                this.setState({ allServData: response.data.data })
                for (let i = 0; i < this.state.allServData.length; i++) {
                    serviceList1.push(this.state.allServData[i]);
                    serviceList.push({ price: this.state.allServData[i].price, description: this.state.allServData[i].description, value: this.state.allServData[i]._id, label: this.state.allServData[i]?.title })
                }
                serviceList = [{ value: 'custom', label: 'custom' }, ...serviceList]
                this.setState({ service_id_list: serviceList, serviceList1: serviceList1 })
            });
    }

    // Set the select data
    onFieldChange = (e, name) => {
        const state = this.state.service;
        if (name === 'service') {
            if (e.value === 'custom') {
                this.setState({ viewCutom: true })
            }
            else {
                this.setState({ viewCutom: false })
            }
            state['price_per_quantity'] = e.price;
            state['quantity'] = 1;
            state[name] = e;
        }
        else {

            state[name] = e;
        }

        this.setState({ service: state });
    }

    // Set patient and status data
    onFieldChange1 = (e, name) => {
        const state = this.state.addinvoice;
        if (name === 'patient') {
            var checkCase = this.state.users.filter((item) => item.profile_id === e.profile_id)
            if (checkCase && checkCase.length > 0) {
                state[name] = checkCase[0];

                state['case_id'] = checkCase[0].case_id;
                this.setState({ selectedPat: e })
            }
        }
        else {
            state[name] = e;
        }

        this.setState({ addinvoice: state });
    }

    // Set the state of quantity and price_per_quantity
    updateEntryState1 = (e, name) => {
        const state = this.state.service;
        state[name] = e.target.value;
        this.setState({ service: state });
    };

    updateEntryState2 = (e, name) => {
        const state = this.state.addinvoice;
        state[name] = e.target.value;
        this.setState({ addinvoice: state });
    };

    //Add the services  
    handleAddSubmit = () => {
        this.setState({ error: "" })
        var newService = this.state.service
        if (newService?.service?.label == "custom") {
            if (newService?.price_per_quantity < 1 || !newService?.price_per_quantity) {
                this.setState({ error: "Please enter valid price" })
            }
            else {
                if (newService && !newService?.custom_title) {
                    this.setState({ error: "Custom service title can't be empty" })
                }
                else {
                    newService.price = newService?.price_per_quantity * newService?.quantity;
                    newService.service = this.state.service?.service?.label
                    let items = [...this.state.items];
                    items.push(newService);
                    let data = {}
                    data["house_id"] = this.props?.House?.value;
                    data["description"] = newService?.custom_description;
                    data["price"] = newService?.price_per_quantity;
                    data["title"] = newService?.custom_title;
                    axios
                        .post(sitedata.data.path + "/vh/AddService", data, commonHeader(this.props.stateLoginValueAim.token))
                        .then((responce) => {
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    this.setState({ items, service: {} },
                        () => { this.updateTotalPrize() })
                }
            }
        }
        else {
            newService.price = newService?.price_per_quantity * newService?.quantity;
            newService.service = this.state.service?.service?.label
            let items = [...this.state.items];
            items.push(newService);

            this.setState({ items, service: {} },
                () => { this.updateTotalPrize() })
        }

    };

    //Update the services  
    handleAddUpdate = () => {
        var newService = this.state.service;
        newService.price = newService?.price_per_quantity * newService?.quantity;
        this.setState({ service: {}, newServiceIndex: false, editServ: false });
    };

    updateTotalPrize = () => {
        var newService = this.state.addinvoice;
        var total = 0;
        this.state.items?.length > 0 && this.state.items.map((data) => {
            total = total + data?.price
        })
        newService.total_amount = total;
        this.setState({ addinvoice: newService })
    }

    // For edit service
    editService = (data, index) => {
        this.setState({ service: data, newServiceIndex: index, editServ: true });
    };


    handleCloseServ = () => {
        this.setState({ editServ: false })
    }

    Billing = () => {
        this.props.history.push("/virtualHospital/bills")
    };

    // For calculate value of finish invoice
    finishInvoice = (draft) => {
        var data = this.state.addinvoice;
        if (draft) {
            data.status = this.state.AllStatus && this.state.AllStatus.filter((item) => item.value === 'draft')?.[0]
        }
        // if(data._id){
        //     this.setState({ loaderImage: true });
        //     axios
        // .post(
        //   sitedata.data.path + `/vh/addInvoice/${data._id}`,
        //   data,
        //   commonHeader(this.props.stateLoginValueAim.token)
        // )
        // .then((responce) => {
        //   this.setState({ loaderImage: false });
        //   if (responce.data.hassuccessed) {
        //     this.setState({
        //         addinvoice : {}, selectedPat: {}, 
        //     });
        //     this.props.getAddTaskData();
        //   }
        // })
        // .catch(function (error) {
        //     this.setState({ loaderImage: false })``;
        // });
        // }
        else {
            data.house_id = this.props?.House?.value;
            data.services = this.state.items
            data.created_at = new Date();
            this.setState({ loaderImage: true });
            axios
                .post(
                    sitedata.data.path + "/vh/addInvoice",
                    data,
                    commonHeader(this.props.stateLoginValueAim.token)
                )
                .then((responce) => {
                    this.setState({ loaderImage: false });
                    if (responce.data.hassuccessed) {
                        this.setState({
                            items: [],
                            addinvoice: {}, selectedPat: {},
                        });
                        this.Billing();
                    }
                })
                .catch((error) => {
                    this.setState({ loaderImage: false });
                });
        }
    }

    //Delete the perticular service confirmation box
    removeServices = (id) => {
        this.setState({ message: null });
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
                        <h1>Remove the Service ?</h1>

                        <p>Are you sure to remove this Service from Invoice?</p>
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    this.deleteClickService(id);
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

    deleteClickService(id) {
        delete this.state.items[id]
        this.setState({ items: this.state.items });
        this.finishInvoice();
    }

    render() {
        const { selectedOption } = this.state;
        const { addinvoice } = this.state;
        return (
            <Grid className={
                this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "homeBg darkTheme"
                    : "homeBg"
            }>
                {this.state.loaderImage && <Loader />}
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
                                            <a onClick={this.Billing}>
                                                <img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" />
                                                Back to Billing</a>
                                        </Grid>
                                        {/* End of Back common button */}
                                        {this.state.addinvoice?._id &&
                                            <InvoicesDownloadPdf
                                                label={this.state.addinvoice?.invoice_id}
                                                status={this.state.addinvoice?.status?.label}
                                                InvoicesData={this.state.addinvoice}
                                            />
                                        }

                                        <Grid className="srvcContent">
                                            <Grid className="invoiceForm">
                                                <Grid container direction="row" alignItems="center" spacing={3}>

                                                    <label>Invoice ID</label>
                                                    <Grid item xs={12} md={3} className="invoiceID">
                                                        {/* <TextField placeholder="Invoice ID" value="548756" /> */}
                                                        <VHfield
                                                            name="invoice_id"
                                                            placeholder="Invoice ID"
                                                            onChange={(e) =>
                                                                this.onFieldChange1(e.target.value, "invoice_id")
                                                            }
                                                            value={this.state.addinvoice?.invoice_id || ''}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <label>Patient</label>
                                                        <Grid>
                                                            <Select
                                                                name="patient"
                                                                options={this.state.users1}
                                                                placeholder="Search & Select"
                                                                onChange={(e) => this.onFieldChange1(e, "patient")}
                                                                value={this.state.selectedPat || ''}
                                                                className="addStafSelect"
                                                                isMulti={false}
                                                                isSearchable={true} />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={3}>
                                                        <label>Status</label>
                                                        <Select
                                                            name="status"
                                                            placeholder="Draft"
                                                            onChange={(e) => this.onFieldChange1(e, "status")}
                                                            value={this.state.addinvoice?.status || ''}
                                                            options={this.state.AllStatus}
                                                            className="cstmSelect"
                                                            isSearchable={false}
                                                            styles={customStyles}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>


                                            <Grid className="srvcTable">
                                                <h3>Services</h3>
                                                <Table>
                                                    <Thead>
                                                        <Tr>
                                                            <Th>Service</Th><Th>Qty</Th><Th>Price</Th><Th></Th>
                                                        </Tr>
                                                    </Thead>

                                                    {this.state.items?.length > 0 && this.state.items.map((data, id) => (
                                                        <Tbody>
                                                            <Tr>
                                                                <Td>
                                                                    <label>{data && data?.service == 'custom' && data?.custom_title && data?.custom_title.length > 0 ? data.custom_title : data?.service}</label>
                                                                    <p>{data?.service?.description}</p>
                                                                </Td>
                                                                <Td>{data?.quantity}</Td>
                                                                <Td>{data?.price} €</Td>
                                                                <Td className="xRay-edit">
                                                                    <Button onClick={() => { this.editService(data, id) }}><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                                                    <Button onClick={() => { this.removeServices(id) }}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                        </Tbody>
                                                    ))}
                                                </Table>
                                            </Grid>

                                            <Grid className="srvcTable">
                                                <Grid className="addCstmField">
                                                    <p className='errorMsg'>{this.state.error}</p>
                                                    <Grid container direction="row" alignItems="center" spacing={3}>
                                                        <Grid item xs={12} md={4}>
                                                            <label>Add service</label>
                                                            <Select
                                                                value={this.state.service?.service || ''}
                                                                name="service"
                                                                onChange={(e) => this.onFieldChange(e, "service")}
                                                                options={this.state.service_id_list}
                                                                placeholder="Search service or add custom input"
                                                                className="cstmSelect"
                                                                isSearchable={true}
                                                                styles={customStyles}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <VHfield
                                                                label="Quantity"
                                                                name="quantity"
                                                                placeholder="Enter quantity"
                                                                onChange={(e) =>
                                                                    this.onFieldChange(e.target.value, "quantity")
                                                                }
                                                                value={this.state.service?.quantity || 0}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <VHfield
                                                                label="Price per quantity"
                                                                name="per_quantity"
                                                                placeholder="Enter price €"
                                                                onChange={(e) =>
                                                                    this.onFieldChange(e.target.value, "price_per_quantity")
                                                                }
                                                                value={this.state?.service?.price_per_quantity || 0}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={2} className="addSrvcBtn">
                                                            <Button onClick={this.handleAddSubmit}>Add</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                {this.state.viewCutom && <Grid className="addCstmField">
                                                    <Grid container direction="row" alignItems="center" spacing={3}>
                                                        <Grid item xs={12} md={4}>
                                                            <label>Custom service title</label>
                                                            <TextField placeholder="Custom service title"
                                                                name="custom_title"
                                                                onChange={(e) =>
                                                                    this.onFieldChange(e.target.value, "custom_title")
                                                                }
                                                                value={this.state.service?.custom_title || ''} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <label>Custom service description</label>
                                                            <TextField placeholder="Custom service description"
                                                                name="custom_description"
                                                                onChange={(e) =>
                                                                    this.onFieldChange(e.target.value, "custom_description")
                                                                }
                                                                value={this.state.service?.custom_description || ''} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>}
                                            </Grid>
                                            <Grid className="invoiceAmnt">
                                                <p>Invoice amount</p>
                                                <label>{this.state.addinvoice.total_amount} €</label>
                                                <Grid>
                                                    <Button onClick={() => { this.finishInvoice() }}>Finish Invoice</Button>
                                                    <Button onClick={() => { this.finishInvoice('draft') }}>Save Draft</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* End of Billing New Invoice */}

                                        <Modal
                                            open={this.state.editServ}
                                            onClose={this.handleCloseServ}
                                            className={
                                                this.props.settings &&
                                                    this.props.settings.setting &&
                                                    this.props.settings.setting.mode &&
                                                    this.props.settings.setting.mode === "dark"
                                                    ? "darkTheme addSpeclModel"
                                                    : "addSpeclModel"
                                            }
                                        >
                                            <Grid className="addServContnt">
                                                <Grid className="addSpeclLbl">
                                                    <Grid className="addSpeclClose">
                                                        <a onClick={this.handleCloseServ}>
                                                            <img
                                                                src={require("assets/virtual_images/closefancy.png")}
                                                                alt=""
                                                                title=""
                                                            />
                                                        </a>
                                                    </Grid>
                                                    <Grid>
                                                        <label>Edit service</label>
                                                    </Grid>
                                                </Grid>

                                                <Grid className="enterServMain">
                                                    <Grid className="enterSpcl">
                                                        <Grid>
                                                            <VHfield
                                                                label="Service name"
                                                                name="label"
                                                                placeholder="Enter Title name"
                                                                disabled={true}
                                                                value={this.state.service?.service?.label}
                                                            />
                                                        </Grid>

                                                        <Grid>
                                                            <VHfield
                                                                label="Quantity"
                                                                name="quantity"
                                                                placeholder="Enter quantity"
                                                                onChange={(e) =>
                                                                    this.updateEntryState1(e, 'quantity')
                                                                }
                                                                value={this.state.service?.quantity}
                                                            />
                                                        </Grid>

                                                        <Grid>
                                                            <VHfield
                                                                label="Price"
                                                                name="price"
                                                                placeholder="Enter service price"
                                                                onChange={(e) =>
                                                                    this.updateEntryState1(e, 'price_per_quantity')
                                                                }
                                                                value={this.state.service?.price_per_quantity}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="servSaveBtn">
                                                    <a onClick={this.handleCloseServ}>
                                                        <Button
                                                            onClick={() => this.handleAddUpdate()}>Save & Close</Button>
                                                    </a>
                                                </Grid>
                                            </Grid>
                                        </Modal>

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
        metadata,
    };
};
export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect, Invoices, OptionList })(
        Index
    )
);