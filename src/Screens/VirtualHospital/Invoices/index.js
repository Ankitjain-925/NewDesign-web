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
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import Modal from "@material-ui/core/Modal";

const options = [
    { value: 'paid', label: 'Paid' },
    { value: 'draft', label: 'Draft' },
    { value: 'issued', label: 'Issued' },
    { value: 'overdue', label: 'Overdue' },
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
            serviceList: [],
            updateTrack: {},
            items: [],
            totalPrice: [],
            editServ: false,
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
                this.setState({ allServData: response.data.data })
                for (let i = 0; i < this.state.allServData.length; i++) {
                    var service = '';
                    if (this.state.allServData[i]?.title) {
                        service = this.state.allServData[i]?.title
                    }
                    else if (this.state.allServData[i]?.title) {
                        service = this.state.allServData[i]?.title
                    }
                    serviceArray.push({
                        service: service,
                    })
                    serviceList.push({ price: this.state.allServData[i].price, description: this.state.allServData[i].description, value: this.state.allServData[i]._id, label: service })
                    serviceList1.push({ profile_id: this.state.allServData[i].profile_id, value: this.state.allServData[i]._id, label: service })
                }
                this.setState({ users: serviceArray, service_id_list: serviceList, service_id_list1: serviceList1 })
            });
    }

    // Set the select data
    onFieldChange = (e, name) => {
        const state = this.state.updateTrack;
        state[name] = e;
        this.setState({ updateTrack: state });
        this.setState({ price_per_quantity: this.state.updateTrack.service.price });
    }

    // Set the state of quantity and price_per_quantity
    updateEntryState1 = (e, name) => {
        e.preventDefault();
        const state = this.state.updateTrack;
        state[name] = e.target.value;
        this.setState({ updateTrack: state });
    };

    updateEntryState2 = (e, name) => {
        e.preventDefault();
        const state = this.state.updateTrack;
        state[name] = e.target.value;
        this.setState({ updateTrack: state });
    };

    //Add the services  
    handleAddSubmit = () => {
        console.log("updateTrack", this.state.updateTrack)
        var newService = this.state.updateTrack;
        newService.price = newService?.service?.price * newService?.quantity
        console.log('new Sevice', newService)
        let items = [...this.state.items];
        items.push({
            updateTrack: newService
        });
        this.setState({ items, updateTrack: {} })
        this.finishInvoice();
        // var calculatePrice = 0;
        // {
        //     this.state.items?.length >= 0 && this.state.items.map((data, id) => {
        //         console.log("index", id)
        //         calculatePrice = data?.updateTrack?.quantity * data?.updateTrack?.service?.price
        //         console.log("calculate", calculatePrice)
        //     })
        // }
    };

    // For edit service
    handleEditService = (data) => {
        console.log("data", data)
        this.setState({ updateTrack: data, editServ: true });
        console.log("updateTrack", this.state.updateTrack)
    };

    handleCloseServ = () => {
        this.setState({ editServ: false })
    }

    // For calculate value of finish invoice
    finishInvoice = () => {
        {
            var total = 0;
            this.state.items?.length > 0 && this.state.items.map((data, index) => {
                total = total + data?.updateTrack?.price
                console.log("total", total)
                this.setState({ totalPrice: total })
            })
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

                        <p>Are you sure to remove this Service?</p>
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
        const { updateTrack } = this.state;
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
                                                                    <label>{data?.updateTrack?.service?.label}</label>
                                                                    <p>{data?.updateTrack?.service?.description}</p>
                                                                </Td>
                                                                <Td>{data?.updateTrack?.quantity}</Td>

                                                                <Td>{data?.updateTrack?.price} €</Td>
                                                                <Td className="xRay-edit">
                                                                    <Button onClick={() => { this.handleEditService(data) }}><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                                                    <Button onClick={() => { this.removeServices(id) }}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            {/* <Tr>
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
                                                        </Tr> */}
                                                        </Tbody>
                                                    ))}
                                                </Table>

                                                {/* <InvoicesShowServices 
                                                /> */}

                                            </Grid>


                                            <Grid className="addCstmField">
                                                <Grid container direction="row" alignItems="center" spacing={3}>
                                                    <Grid item xs={12} md={4}>
                                                        <label>Add service</label>

                                                        <Select
                                                            // value={this.state.serviceList}
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
                                                        {/* <label>Quantity</label> */}
                                                        {/* <TextField
                                                        name="quantity" 
                                                        placeholder="Enter quantity" 
                                                        onChange={(e) => this.updateEntryState1(e,"quantity")}
                                                         // value={this.state.serviceList}
                                                        /> */}

                                                        <VHfield
                                                            label="Quantity"
                                                            name="quantity"
                                                            placeholder="Enter quantity"
                                                            onChange={(e) =>
                                                                this.updateEntryState2(e, "quantity")
                                                            }
                                                            value={this.state.updateTrack.quantity}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        {/* <label>Price per quantity</label>
                                                        <TextField placeholder="Enter price €" 
                                                        onChange={(e) => this.updateEntryState1(e)}
                                                        //  value={this.state.serviceList}
                                                          /> */}

                                                        <VHfield
                                                            label="Price per quantity"
                                                            name="per_quantity"
                                                            placeholder="Enter price €"
                                                            onChange={(e) =>
                                                                this.updateEntryState1(e, "price_per_quantity")
                                                            }
                                                            value={this.state.price_per_quantity}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} className="addSrvcBtn">
                                                        <Button onClick={this.handleAddSubmit}>Add</Button>
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
                                                <label>{this.state.totalPrice} €</label>
                                                <Grid>
                                                    <Button onClick={() => { this.finishInvoice() }}>Finish Invoice</Button>
                                                    <Button>Save Draft</Button>
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
                                                                // onChange={(e) =>
                                                                //     this.updateEntryState1(e)
                                                                // }
                                                                value={this.state.updateTrack.service?.label}
                                                            />
                                                        </Grid>

                                                        <Grid>
                                                            <VHfield
                                                                label="Quantity"
                                                                name="quantity"
                                                                placeholder="Enter quantity"
                                                                onChange={(e) =>
                                                                    this.updateEntryState1(e)
                                                                }
                                                                value={this.state.updateTrack.service?.quantity}
                                                            />
                                                        </Grid>

                                                        <Grid>
                                                            <VHfield
                                                                label="Price"
                                                                name="price"
                                                                placeholder="Enter service price"
                                                                onChange={(e) =>
                                                                    this.updateEntryState1(e)
                                                                }
                                                                value={this.state.updateTrack?.price}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="servSaveBtn">
                                                    <a onClick={this.handleCloseServ}>
                                                        <Button
                                                            onClick={() => this.handleSubmit()}>Save & Close</Button>
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