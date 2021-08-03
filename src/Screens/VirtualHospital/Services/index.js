import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import Modal from '@material-ui/core/Modal';
import axios from "axios";
import { commonHeaderToken } from "component/CommonHeader/index"
import sitedata from "sitedata";
import { confirmAlert } from "react-confirm-alert";
import Pagination from "Screens/Components/Pagination/index";
import { withRouter } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { commonHeader } from "component/CommonHeader/index";
import { houseSelect } from "../Institutes/selecthouseaction";

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openServ: false,
            title: '',
            description: '',
            price: '',
            house_id: '',
            speciality_id: '',
            services_data: [],
            AllServices: []
        }
    }

    handleOpenServ = () => {
        this.setState({ openServ: true });
    }
    handleCloseServ = () => {
        this.setState({ openServ: false });
    }
    updateEntryState = (e) => {
        this.setState({
            title: e.target.value,
        })
    }
    updateEntryState1 = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    updateEntryState2 = (e) => {
        this.setState({
            price: e.target.value
        })
    }
    handleSubmit = (e) => {
        axios
            .post(
                sitedata.data.path + "/vh/AddService",
                {
                    title: this.state.title,
                    description: this.state.description,
                    price: this.state.price,
                    house_id: this.props?.House?.value,
                    // speciality_id: this.state.speciality_id
                },
                commonHeaderToken()
            )
            .then((responce) => {
                console.log('gh', responce)
                this.getAllServices();
            })
            .catch(function (error) {
                console.log(error);
            });;
    }

    componentDidMount() {
        this.getAllServices();
    }

    getAllServices = () => {
        this.setState({ loaderImage: true });
        axios
            .get(sitedata.data.path + "/vh/GetService/"+this.props?.House?.value,
                commonHeaderToken()
            )
            .then((response) => {
                var totalPage = Math.ceil(response.data.data.length / 10);
                this.setState(
                    {
                        AllServices: response.data.data,
                        loaderImage: false,
                        totalPage: totalPage,
                        currentPage: 1,
                    },
                    () => {
                        if (totalPage > 1) {
                            var pages = [];
                            for (var i = 1; i <= this.state.totalPage; i++) {
                                pages.push(i);
                            }
                            this.setState({
                                services_data: this.state.AllServices.slice(0, 10),
                                pages: pages,
                            });
                        } else {
                            this.setState({ services_data: this.state.AllServices });
                        }
                    }
                );
            });
    };

    onChangePage = (pageNumber) => {
        this.setState({
            services_data: this.state.AllServices.slice(
                (pageNumber - 1) * 10,
                pageNumber * 10
            ),
            currentPage: pageNumber,
        });
    };


    removeServices = (status, id) => {
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
                        {status && status === "remove" ? (
                            <h1>Remove the Service ?</h1>
                        ) : (
                            <h1>hello</h1>
                        )}
                        <p>Are you sure to remove this Service?</p>
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    this.deleteClickService(status, id);
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

    deleteClickService(status, id) {
        axios
            .delete(
                sitedata.data.path + "/vh/AddService/" + id,
                commonHeaderToken()
            )
            .then((response) => {
                this.getAllServices();
            })
            .catch((error) => { });
    }

    render() {
        const { services_data } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>

                            {/* Mobile menu */}
                            <LeftMenuMobile isNotShow={true} currentPage="chat" />
                            <Grid container direction="row">

                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="chat" />
                                </Grid>
                                {/* End of Menu */}

                                {/* Start of Right Section */}
                                <Grid item xs={12} md={10}>
                                    <Grid className="topLeftSpc">
                                        <Grid container direction="row">
                                            <Grid item xs={6} md={6}>
                                                {/* Back common button */}
                                                <Grid className="extSetting">
                                                    <a><img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" />
                                                        Back to Billing</a>
                                                </Grid>
                                                {/* End of Back common button */}
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                                <Grid className="newServc">
                                                    <Button onClick={this.handleOpenServ}>+ New Service</Button>
                                                    <Modal
                                                        open={this.state.openServ}
                                                        onClose={this.handleCloseServ}
                                                        className="addSpeclModel">
                                                        <Grid className="addSpeclContnt">
                                                            <Grid className="addSpeclLbl">
                                                                <Grid className="addSpeclClose">
                                                                    <a onClick={this.handleCloseServ}>
                                                                        <img src={require('assets/virtual_images/closefancy.png')} alt="" title="" />
                                                                    </a>
                                                                </Grid>
                                                                <Grid><label>Add Services</label></Grid>

                                                                <Grid>
                                                                    <VHfield
                                                                        label="Title"
                                                                        placeholder="Enter title name"
                                                                        onChange={(e) => this.updateEntryState(e)}
                                                                        value={this.state.title}
                                                                    />
                                                                </Grid>

                                                                <Grid>
                                                                    <VHfield
                                                                        label="Description"
                                                                        placeholder="Enter description"
                                                                        onChange={(e) => this.updateEntryState1(e)}
                                                                        value={this.state.description}
                                                                    />
                                                                </Grid>

                                                                <Grid>
                                                                    <VHfield
                                                                        label="Price"
                                                                        placeholder="Enter price"
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                        value={this.state.price}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6} md={6}>
                                                                    <Grid className="newServc">
                                                                        <a onClick={this.handleCloseServ}><Button onClick={(e) => this.handleSubmit(e)}>Submit</Button></a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Modal>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* Start of Bread Crumb */}
                                        <Grid className="breadCrumbUpr">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} md={9}>
                                                    <Grid className="roomBreadCrumb medcalCntr">
                                                        <ul>
                                                            <li><a><label>General Services</label></a></li>
                                                            <li><a><label>Speciality Services</label></a></li>
                                                        </ul>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="settingInfo">
                                                        <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* End of Bread Crumb */}
                                        <Grid className="cardioGrup">
                                            <Grid className="cardioGrupBtn">
                                                <Button variant="contained" className="cardioActv">Neurology</Button>
                                                <Button variant="contained">Radiology</Button>
                                                <Button variant="contained">Cardiology</Button>
                                                <Button variant="contained">Oncology</Button>
                                            </Grid>
                                        </Grid>

                                        {/* service price content */}
                                        <Grid className="srvcTable3">
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Service</Th>
                                                        <Th>Price</Th>
                                                        <Th></Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>

                                                    {services_data?.length > 0 && services_data.map((data) => (
                                                        <>
                                                            <Tr>
                                                                <Td>

                                                                    <label>{data.title}</label>
                                                                    <p>{data.description}</p>
                                                                </Td>
                                                                <Td>{data.price}</Td>
                                                                {/* <Td className="srvcDots"> */}
                                                                <Td className="presEditDot scndOptionIner">
                                                                    <a className="openScndhrf">
                                                                        <Button>
                                                                            <img
                                                                                src={require("assets/images/three_dots_t.png")}
                                                                                alt=""
                                                                                title=""
                                                                                className="openScnd"
                                                                            />
                                                                        </Button>
                                                                        <ul>
                                                                            <li>
                                                                                <a
                                                                                    onClick={() => {
                                                                                        this.handleOpenServ();
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src={require("assets/images/details.svg")}
                                                                                        alt=""
                                                                                        title=""
                                                                                    />
                                                                                    Edit Service
                                                                                </a>
                                                                            </li>
                                                                            {data.status !== "remove" && (
                                                                                <li
                                                                                    onClick={() => {
                                                                                        this.removeServices("remove", data._id);
                                                                                    }}
                                                                                >
                                                                                    <a>
                                                                                        <img
                                                                                            src={require("assets/images/cancel-request.svg")}
                                                                                            alt=""
                                                                                            title=""
                                                                                        />
                                                                                        Delete Service
                                                                                    </a>
                                                                                </li>
                                                                            )}
                                                                        </ul>
                                                                    </a>
                                                                </Td>
                                                                {/* <Button onclick = {(index) => {this.message(index)}}><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button> */}
                                                                {/* </Td> */}
                                                            </Tr>

                                                        </>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                         
                                            <Grid className="tablePagNum">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6}>
                                                        <Grid className="totalOutOff">
                                                            <a>
                                                                {this.state.currentPage} of {this.state.totalPage}
                                                            </a>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {this.state.totalPage > 1 && (
                                                            <Grid className="prevNxtpag">

                                                                <Pagination totalPage={this.state.totalPage} currentPage={this.state.currentPage} pages={this.state.pages} onChangePage={(page) => { this.onChangePage(page) }} />
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* end of service price content */}
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
    const { House } = state.houseSelect;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
      stateLanguageType,
      stateLoginValueAim,
      loadingaIndicatoranswerdetail,
      settings,
      verifyCode,
      House,
      //   Doctorsetget,
      //   catfil
    };
  };
  export default withRouter(
    connect(mapStateToProps, {
      LoginReducerAim,
      LanguageFetchReducer,
      Settings,
      authy,
      houseSelect,
    })(Index)
  );