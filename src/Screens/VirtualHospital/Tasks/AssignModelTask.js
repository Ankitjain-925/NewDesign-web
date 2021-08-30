import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
// import MobileMenu from '../Menu/mobile-menu';
// import WebMenu from '../Menu/web-menu';
import Modal from '@material-ui/core/Modal';
import Select from 'react-select';
import { Button } from '@material-ui/core';

const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noWards: false,
            specialOption: null,
        };
    }
    handleNoWard = () => {
        this.setState({ noWards: true });
    }
    handleCloseRvw = () => {
        this.setState({ noWards: false });
    }
    handleSpecial = specialOption => {
        this.setState({ specialOption });
    };
    render() {
        const { selectedOption } = this.state;
        return (
            <Grid className="homeBg darkTheme">
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            {/* <MobileMenu /> */}
                            <Grid container direction="row">
                                {/* <Grid item xs={12} md={1} className="MenuLeftUpr"><WebMenu /></Grid> */}
                                <Grid item xs={12} md={11}>
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={12}>
                                            <Grid className="topLeftSpc">
                                                <Grid className="NoWardLink">
                                                    <a onClick={this.handleNoWard}>Add staff</a>
                                                </Grid>
                                                <Modal open={this.state.noWards} onClose={this.handleCloseRvw}>
                                                    <Grid className="addStaff">
                                                        <Grid className="addStaffIner">
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={12}>
                                                                    <Grid className="movPtntCntnt">
                                                                        <Grid className="addStaffLbl">
                                                                            <Grid className="addStaffClose closeMove">
                                                                                <a onClick={this.handleCloseRvw}>
                                                                                    <img src={require('assets/virtual_images/closebtn.png')} alt="" title="" />
                                                                                </a>
                                                                            </Grid>
                                                                            <label>Move patient</label>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="addStafClient">
                                                                        <Grid className="addStafClientLft">
                                                                            <img src={require('assets/virtual_images/james.jpg')} alt="" title="" />
                                                                        </Grid>
                                                                        <Grid><label>James Morrison</label><p>P_mDnkbR30d</p></Grid>
                                                                    </Grid>
                                                                    <Grid className="addStafMgnt">
                                                                        <Grid className="addStafdrop">
                                                                            <Grid><label>Add staff</label></Grid>
                                                                            <Select value={selectedOption} onChange={this.handleSpecial2} options={options}
                                                                                placeholder="Search & Select" className="addStafSelect" isSearchable={false} />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="stafLstCntnt">
                                                                        <Grid className="stafLst">
                                                                            <Grid className="stafLft">
                                                                                <a><img src={require('assets/virtual_images/dr2.jpg')} alt="" title="" /></a>
                                                                                <span>Gregory House M.D.</span>
                                                                            </Grid>
                                                                            <Grid className="stafRght">
                                                                                <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid className="stafLst">
                                                                            <Grid className="stafLft">
                                                                                <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                                                <span>Mark Anderson M.D.</span>
                                                                            </Grid>
                                                                            <Grid className="stafRght">
                                                                                <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid className="stafLst">
                                                                            <Grid className="stafLft">
                                                                                <a><img src={require('assets/virtual_images/BernhardBreil.png')} alt="" title="" /></a>
                                                                                <span>Ahmad Nazeri</span>
                                                                            </Grid>
                                                                            <Grid className="stafRght">
                                                                                <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid className="stafLst">
                                                                            <Grid className="stafLft">
                                                                                <a><img src={require('assets/virtual_images/YehoushuaWestover.png')} alt="" title="" /></a>
                                                                                <span>Angela Longoria</span>
                                                                            </Grid>
                                                                            <Grid className="stafRght">
                                                                                <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid className="stafLst">
                                                                            <Grid className="stafLft">
                                                                                <a><img src={require('assets/virtual_images/102.png')} alt="" title="" /></a>
                                                                                <span>Conan Matusov</span>
                                                                            </Grid>
                                                                            <Grid className="stafRght">
                                                                                <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid className="stafLst">
                                                                            <Grid className="stafLft">
                                                                                <a><img src={require('assets/virtual_images/101.png')} alt="" title="" /></a>
                                                                                <span>Ezequiel Dengra</span>
                                                                            </Grid>
                                                                            <Grid className="stafRght">
                                                                                <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid className="stafLst">
                                                                            <Grid className="stafLft">
                                                                                <a><img src={require('assets/virtual_images/YehoushuaWestover.png')} alt="" title="" /></a>
                                                                                <span>Angela Longoria</span>
                                                                            </Grid>
                                                                            <Grid className="stafRght">
                                                                                <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid className="stafLst">
                                                                            <Grid className="stafLft">
                                                                                <a><img src={require('assets/virtual_images/102.png')} alt="" title="" /></a>
                                                                                <span>Conan Matusov</span>
                                                                            </Grid>
                                                                            <Grid className="stafRght">
                                                                                <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="addStafClos"><Button>Save & Close</Button></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Modal>
                                                {/* End of Model setup */}
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
export default Index;