import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import Modal from '@material-ui/core/Modal';


var services_data = [
    // { title: "X-ray", description: "This can be a short description of this service.", price: "200,00 €" },
    // { title: "CT-Scan", description: "This can be a short description of this service.", price: "240,00 €" },
    // { title: "MRI", description: "This can be a short description of this service.", price: "260,00 €" },
]


class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openServ: false,
            title: '',
            description: '',
            price: '',
            services_data: []
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
        console.log("title", this.state.title)
        console.log("des", this.state.description)
        console.log("price", this.state.price)

        e.preventDefault();
        let services_data = [...this.state.services_data];
        services_data.push({
            title: this.state.title,
            description: this.state.description,
            price: this.state.price
        });
        this.setState({
            services_data,
            title: '',
            description: '',
            price: ''
        });
    };

    render() {
        const { services_data } = this.state;
        console.log("services_data", this.state.services_data)
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>

                            {/* Mobile menu */}
                            <LeftMenuMobile isNotShow={true} currentPage="chat" />
                            <Grid container direction="row">
                                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}


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
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>

                                                            {/* <Tr>
                                                                <Td>
                                                                    <label>MRI</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>260,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr> */}
                                                            {/* <Tr>
                                                                <Td>
                                                                    <label>Carotid Ultrasound</label>
                                                                </Td>
                                                                <Td>90,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Angiography</label>
                                                                </Td>
                                                                <Td>120,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Electroencephalogram</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>170,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Single Photon Emission Computed Tomography (SPECT) Scan</label>
                                                                </Td>
                                                                <Td>170,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>X-ray</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>200,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>X-ray</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>200,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>CT Scan</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>240,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>MRI</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>260,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Carotid Ultrasound</label>
                                                                </Td>
                                                                <Td>90,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Angiography</label>
                                                                </Td>
                                                                <Td>120,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Electroencephalogram</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>170,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>Single Photon Emission Computed Tomography (SPECT) Scan</label>
                                                                </Td>
                                                                <Td>170,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    <label>X-ray</label>
                                                                    <p>This can be a short description of this service.</p>
                                                                </Td>
                                                                <Td>200,00 €</Td>
                                                                <Td className="srvcDots">
                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                </Td>
                                                            </Tr> */}

                                                        </>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                            <Grid className="dataPagination">
                                                <Grid container direction="row">
                                                    <Grid item xs={6} md={6}>
                                                        <Grid className="dataPaginationLft"><p>25 of 36</p></Grid>
                                                    </Grid>
                                                    <Grid item xs={6} md={6}>
                                                        <Grid className="dataPaginationRght">
                                                            <p><a>Previous</a><span>1</span><span>2</span><span>3</span><a>Next</a></p>
                                                        </Grid>
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
export default Index