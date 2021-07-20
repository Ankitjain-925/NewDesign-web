
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Button from '@material-ui/core/Button';
import ColorSelection from "Screens/Components/VirtualHospitalComponents/ColorSelection/index";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import AddRoom from "Screens/Components/VirtualHospitalComponents/AddRoom/index";
import RoomView from "Screens/Components/VirtualHospitalComponents/RoomView/index";
import 'assets/css/virtual_hospital.css';


class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openSpecl: false,
            openSpecl2: false,
            openSpecl3: false,
            openWard: false,
            openRoom: false,
            specialityColor: false,
            openSpecl4: false,
            speciality: {},
            ward: {},

        }
    }
    handleOpenSpecl = () => {
        this.setState({ openSpecl: true });
    }
    handleCloseSpecl = () => {
        this.setState({ openSpecl: false });
    }
    handleOpenSpecl2 = () => {
        this.setState({ openSpecl2: true });
    }
    handleCloseSpecl2 = () => {
        this.setState({ openSpecl2: false });
    }
    handleOpenSpecl3 = () => {
        this.setState({ openSpecl3: true })
    }
    handleCloseSpecl3 = () => {
        this.setState({ openSpecl3: false })
    }
    handleOpenSpecl4 = () => {
        this.setState({ openSpecl4: true });
    }
    handleCloseSpecl4 = () => {
        this.setState({ openSpecl4: false })
    }
    handleSpecialityColor = () => {
        this.setState({ specialityColor: !this.state.specialityColor });
    }
    handleOpenWard = () => {
        this.setState({ openWard: true });
    }
    handleCloseWard = () => {
        this.setState({ openWard: false });
    }
    handleOpenRoom = () => {
        var state = this.state.speciality;
        var ward = state['wards'] || [];
        ward.push(this.state.ward);
        state['wards'] = ward;
        this.setState({ speciality: state }, () => {
            console.log('final speciality', this.state.speciality)
        })
        this.setState({ openRoom: true });
    }

    updateEntryState = (e) => {
        var state = this.state.speciality;
        state[e.target.name] = e.target.value;
        this.setState({ speciality: state },
            () => { console.log('trt', this.state.speciality) })
    }

    updateEntryState1 = (name, value) => {
        var state = this.state.speciality;
        state[name] = value;
        this.setState({ speciality: state },
            () => { console.log('trt34', this.state.speciality) })

    }

    updateEntryState2 = (e) => {
        var state = this.state.ward;
        state[e.target.name] = e.target.value;
        this.setState({ ward: state })
    }

    updateEntryState3 = (ward) => {
        var state = this.state.ward;
        state['rooms'] = ward;
        this.setState({ ward: state },
            () => {
                console.log('final first ward', this.state.ward)
            })

    }


    render() {
        return (

            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>

                            <LeftMenuMobile isNotShow={true} currentPage="chat" />
                            <Grid container direction="row">
                                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}


                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="chat" />
                                </Grid>
                                {/* End of Menu */}
                                {/* Start of Right Section */}
                                <Grid item xs={12} md={11}>
                                    <Grid className="topLeftSpc">
                                        <Grid className="extSetting">
                                            <a><img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" />
                                                Exit Settings</a>
                                        </Grid>
                                        {/* Start of Bread Crumb */}
                                        <Grid className="breadCrumbUpr">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} md={12}>
                                                    <Grid className="roomBreadCrumb3">
                                                        <ul>
                                                            <li><a><span>Institution</span><label>German Medical Center FZ-LLC</label></a></li>
                                                            <li><a><label>Specialities</label></a></li>
                                                        </ul>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* End of Bread Crumb */}
                                        <Grid className="wardsGrupUpr">
                                            <Grid container direction="row" spacing={2}>
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="nwSpclSec">
                                                        <p onClick={this.handleOpenSpecl}>+ Add a new Speciality 2</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="nwSpclSec">
                                                        <p onClick={this.handleOpenSpecl2}>+ Add a new Speciality 2.2</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="nwSpclSec">
                                                        <p onClick={this.handleOpenSpecl3}>+ Add a new Speciality 3</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="nwSpclSec">
                                                        <p onClick={this.handleOpenSpecl4}>Management Settings 2.3</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Right Section */}
                                {/* Model setup */}
                                <Modal
                                    open={this.state.openSpecl}
                                    onClose={this.handleCloseSpecl}
                                    className="addSpeclModel">
                                    <Grid className="addSpeclContnt">
                                        <Grid className="addSpeclLbl">
                                            <Grid className="addSpeclClose">
                                                <a onClick={this.handleCloseSpecl}>
                                                    <img src={require('assets/virtual_images/closefancy.png')} alt="" title="" />
                                                </a>
                                            </Grid>
                                            <Grid><label>Add Speciality</label></Grid>
                                        </Grid>
                                        <Grid className="enterSpclUpr">
                                            <Grid className="enterSpclMain">
                                                <Grid className="enterSpcl">
                                                    <Grid container direction="row">
                                                        <Grid item xs={10} md={11}>
                                                            {/* <Grid><label>Speciality</label></Grid> */}
                                                            {/* <TextField placeholder="Enter Speciality name" /> */}
                                                            <VHfield
                                                                label="Speciality"
                                                                name="speciality_name"
                                                                placeholder="Enter Speciality name"
                                                                onChange={(e) => this.updateEntryState(e)}
                                                            />

                                                        </Grid>
                                                        <Grid item xs={2} md={1}>
                                                            <Grid className="colorBtnUpr">
                                                                <Grid >
                                                                    <ColorSelection
                                                                        label="Color"
                                                                        updateEntryState1={(name, value) => this.updateEntryState1(name, value)}

                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {!this.state.openWard ? <Grid className="plusWards">
                                                        <p onClick={this.handleOpenWard}>+ Add a Ward</p>

                                                    </Grid> :
                                                            <Grid className="addWardsRoom">
                                                                <Grid className="addWardsUpr">
                                                                    <Grid className="addWardsIner">
                                                                        <Grid item xs={12} md={12}>
                                                                            <VHfield
                                                                                label="Ward"
                                                                                name="ward_name"
                                                                                placeholder="Adults Ward"
                                                                                onChange={(e) => this.updateEntryState2(e)}
                                                                            />

                                                                            <AddRoom
                                                                                label="room"
                                                                                name="roomname"
                                                                                onChange={(e) => this.updateEntryState3(e)}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        <Grid className="wrdsBtn" className="addWardsRoom" className="addWardsUpr"
                                                            className="addWardsIner" item xs={12} md={12}>
                                                           

                                                            <Grid className="wrdsBtn">
                                                            {this.state.openWard &&  <>
                                                            <Button onClick={this.handleCloseWard}>Cancel</Button>
                                                                <Grid>
                                                                    <Button onClick={this.handleOpenRoom} className="wrdsBtnActv">Save Ward</Button>
                                                                </Grid> 
                                                            </>
                                                            //     : <Grid>
                                                            //     <RoomView
                                                            //         label="Adults Ward"
                                                            //         name="Adults Ward"
                                                            //         onChange={(e) => this.props.updateEntryState4(e)}
                                                            //         value={this.state.updateTrack.room_name}
                                                            //     />
                                                            //     <Grid>
                                                            //         <RoomView
                                                            //             onChange={(e) => this.props.updateEntryState4(e)}
                                                            //             value={this.state.updateTrack.bed_number}
                                                            //         /></Grid>
                                                            // </Grid>

                                                                }
                                                            </Grid>
                                                        </Grid>}
                                                    <Grid className="spclSaveBtn"><Button onClick={this.handleCloseSpecl}>Save & Close</Button></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Modal>


                                {/* End of Model setup */}
                                {/* Start space Management Settings 2.2 Model */}
                                <Modal
                                    open={this.state.openSpecl2}
                                    onClose={this.handleCloseSpecl2}
                                    className="addSpeclModel">
                                    <Grid className="addSpeclContnt">
                                        <Grid className="addSpecIner">
                                            <Grid className="addSpeclLbl">
                                                <Grid className="addSpeclClose">
                                                    <a onClick={this.handleCloseSpecl2}>
                                                        <img src={require('assets/virtual_images/closefancy.png')} alt="" title="" />
                                                    </a>
                                                </Grid>
                                                <Grid><label>Add Speciality</label></Grid>
                                            </Grid>

                                            <Grid className="enterSpclUpr">
                                                <Grid className="enterSpclMain">
                                                    <Grid className="enterSpcl">
                                                        <Grid container direction="row">
                                                            <Grid item xs={10} md={11}>
                                                                <Grid><label>Speciality</label></Grid>
                                                                <TextField placeholder="Enter Speciality name" />
                                                            </Grid>
                                                            <Grid item xs={2} md={1}>
                                                                <Grid className="colorBtnUpr">
                                                                    <Grid className="actvColorBtn">
                                                                        <Grid><label>Color</label></Grid>
                                                                        <a className="actBtn" onClick={this.handleSpecialityColor}><FiberManualRecordIcon />
                                                                            {this.state.specialityColor &&
                                                                                <ul className="subSpclList">
                                                                                    <label>Speciality color</label>
                                                                                    <li><a className="recodRed"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodLghtRed"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodYelow"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodGren"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodDrkGren"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodBlue1"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodBlue2"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodBlue3"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodBlue4"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodViolet"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodLghtViolet"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodBlck"><FiberManualRecordIcon /></a></li>
                                                                                </ul>
                                                                            }
                                                                        </a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="addWardsRoom">
                                                        <Grid className="addWardsUpr">
                                                            <Grid className="addWardsIner">
                                                                <Grid item xs={12} md={12}>
                                                                    <Grid><label>Ward</label></Grid>
                                                                    <TextField placeholder="Adults Ward" />
                                                                </Grid>
                                                                <Grid className="roomName">
                                                                    <Grid container direction="row" alignItems="center" spacing={2}>
                                                                        <Grid item xs={7} md={7}>
                                                                            <Grid><label>Room name</label></Grid>
                                                                        </Grid>
                                                                        <Grid item xs={3} md={3}>
                                                                            <Grid><label>Beds in room</label></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container direction="row" alignItems="center" spacing={2}>
                                                                        <Grid item xs={7} md={7}>
                                                                            <TextField placeholder="Adults Ward" />
                                                                        </Grid>
                                                                        <Grid item xs={3} md={3}>
                                                                            <TextField placeholder="0" />
                                                                        </Grid>
                                                                        <Grid item xs={2} md={2} className="roomRmv">
                                                                            <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container direction="row" alignItems="center" spacing={2}>
                                                                        <Grid item xs={7} md={7}>
                                                                            <TextField placeholder="Adults Ward" />
                                                                        </Grid>
                                                                        <Grid item xs={3} md={3}>
                                                                            <TextField placeholder="0" />
                                                                        </Grid>
                                                                        <Grid item xs={2} md={2} className="roomRmv">
                                                                            <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container direction="row" alignItems="center" spacing={2}>
                                                                        <Grid item xs={7} md={7}>
                                                                            <TextField placeholder="Adults Ward" />
                                                                        </Grid>
                                                                        <Grid item xs={3} md={3}>
                                                                            <TextField placeholder="0" />
                                                                        </Grid>
                                                                        <Grid item xs={2} md={2} className="roomRmv">
                                                                            <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container direction="row" alignItems="center" spacing={2}>
                                                                        <Grid item xs={7} md={7}>
                                                                            <TextField placeholder="Adults Ward" />
                                                                        </Grid>
                                                                        <Grid item xs={3} md={3}>
                                                                            <TextField placeholder="0" />
                                                                        </Grid>
                                                                        <Grid item xs={2} md={2} className="roomRmv">
                                                                            <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container direction="row" alignItems="center" spacing={2}>
                                                                        <Grid item xs={7} md={7}>
                                                                            <TextField placeholder="Adults Ward" />
                                                                        </Grid>
                                                                        <Grid item xs={3} md={3}>
                                                                            <TextField placeholder="0" />
                                                                        </Grid>
                                                                        <Grid item xs={2} md={2} className="roomRmv">
                                                                            <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="add_a_room"><a>+ add a Room</a></Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="wrdsBtn">
                                                                <Button>Cancel</Button>
                                                                <Button className="wrdsBtnActv">Save Ward</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="spclSaveBtn saveNclose"><Button>Save & Close</Button></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Modal>
                                {/* End space Management Settings 2.2 Model */}

                                {/* Start Space Management Settings 2.3 */}
                                <Modal
                                    open={this.state.openSpecl4}
                                    onClose={this.handleCloseSpecl4}
                                    className="addSpeclModel">
                                    <Grid className="addSpeclContnt">
                                        <Grid className="addSpecIner">
                                            <Grid className="addSpeclLbl">
                                                <Grid className="addSpeclClose">
                                                    <a onClick={this.handleCloseSpecl4}>
                                                        <img src={require('assets/virtual_images/closefancy.png')} alt="" title="" />
                                                    </a>
                                                </Grid>
                                                <Grid><label>Add Speciality</label></Grid>
                                            </Grid>
                                            <Grid className="enterSpclUpr">
                                                <Grid className="enterSpclMain">
                                                    <Grid className="enterSpcl">
                                                        <Grid container direction="row">
                                                            <Grid item xs={10} md={11}>
                                                                <Grid><label>Speciality</label></Grid>
                                                                <TextField placeholder="Enter Speciality name" />
                                                            </Grid>
                                                            <Grid item xs={2} md={1}>
                                                                <Grid className="colorBtnUpr">
                                                                    <Grid className="actvColorBtn">
                                                                        <Grid><label>Color</label></Grid>
                                                                        <a className="actBtn" onClick={this.handleSpecialityColor}><FiberManualRecordIcon />
                                                                            {this.state.specialityColor &&
                                                                                <ul className="subSpclList">
                                                                                    <label>Speciality color</label>
                                                                                    <li><a className="recodRed"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodLghtRed"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodYelow"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodGren"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodDrkGren"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodBlue1"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodBlue2"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodBlue3"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodBlue4"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodViolet"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodLghtViolet"><FiberManualRecordIcon /></a></li>
                                                                                    <li><a className="recodBlck"><FiberManualRecordIcon /></a></li>
                                                                                </ul>
                                                                            }
                                                                        </a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="addWardsRoom">
                                                        <Grid className="wardListSec">
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} md={6}>
                                                                    <Grid className="wrdCollect">
                                                                        <Grid><label>Adults Ward</label></Grid>
                                                                        <Grid className="wrdEdtDel">
                                                                            <Grid>
                                                                                <img src={require('assets/virtual_images/room.svg')} alt="" title="" />
                                                                                <span>8 rooms</span>
                                                                            </Grid>
                                                                            <Grid>
                                                                                <img src={require('assets/virtual_images/room.svg')} alt="" title="" />
                                                                                <span>8 rooms</span>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={4} md={6}>
                                                                    <Grid className="wrdEdtDelBtn">
                                                                        <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                                                        <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="wardListSec">
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} md={6}>
                                                                    <Grid className="wrdCollect">
                                                                        <Grid><label>Adults Ward</label></Grid>
                                                                        <Grid className="wrdEdtDel">
                                                                            <Grid>
                                                                                <img src={require('assets/virtual_images/room.svg')} alt="" title="" />
                                                                                <span>8 rooms</span>
                                                                            </Grid>
                                                                            <Grid>
                                                                                <img src={require('assets/virtual_images/room.svg')} alt="" title="" />
                                                                                <span>8 rooms</span>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={4} md={6}>
                                                                    <Grid className="wrdEdtDelBtn">
                                                                        <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                                                        <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="addNwWard"><label>+ Add a Ward</label></Grid>
                                                    </Grid>
                                                    <Grid className="spclSaveBtn saveNclose">
                                                        <Button>Save & Close</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Modal>
                                {/* End Space Management Settings 2.3 */}

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        );
    }
}
export default Index