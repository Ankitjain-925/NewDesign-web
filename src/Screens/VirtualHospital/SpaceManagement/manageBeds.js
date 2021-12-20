import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { getLanguage } from "translations/index";

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
            value: 0
        };
    }
    handleChangeTab = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { value } = this.state;
        let translate = getLanguage(this.props.stateLanguageType);
        let { SpaceManagement, Institution, speciality, Ward, GermanMedicalCenterFZLLC, Neurology, AdultsWard, Cardiology, Radiology, Oncology,
            BenitoNoboa, P_ukd832kd2, Room1, Room2, Move_patient_here, AddPatient, ChildrensWardContent } = translate;
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
                                <Grid item xs={12} md={11}>
                                    <Grid className="topLeftSpc">
                                        <Grid className="spcMgnt"><h1>{SpaceManagement}</h1></Grid>
                                        {/* Start of Bread Crumb */}
                                        <Grid className="breadCrumbUpr">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} md={9}>
                                                    <Grid className="roomBreadCrumb">
                                                        <ul>
                                                            <li><a><span>{Institution}</span><label>{GermanMedicalCenterFZLLC}</label></a></li>
                                                            <li><a><span>{speciality}</span><label>{Neurology}</label></a></li>
                                                            <li><a><span>{Ward}</span><label>{AdultsWard}</label></a></li>
                                                        </ul>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="settingInfo">
                                                        <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                                                        <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* End of Bread Crumb */}
                                        <Grid className="wardsGrupUpr">
                                            <Grid className="cardioGrup">
                                                <Grid className="cardioGrupBtn">
                                                    <Button variant="contained">{Cardiology}</Button>
                                                    <Button variant="contained">{Radiology}</Button>
                                                    <Button variant="contained" className="cardioActv">{Neurology}</Button>
                                                    <Button variant="contained">{Oncology}</Button>
                                                </Grid>
                                                <Grid className="cardioTabUpr">
                                                    <AppBar position="static" className="cardioTabs">
                                                        <Tabs value={value} onChange={this.handleChangeTab}>
                                                            <Tab label="Adults Ward" className="cardiotabIner" />
                                                            <Tab label="Childrens Ward" className="cardiotabIner" />
                                                        </Tabs>
                                                    </AppBar>
                                                </Grid>
                                            </Grid>
                                            {value === 0 &&
                                                <Grid>
                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <Grid className="drList2">
                                                                <Grid className="roomNum2">
                                                                    <Grid container direction="row">
                                                                        <Grid item xs={6} md={6}>
                                                                            <Button variant="contained">{Room1}</Button>
                                                                        </Grid>
                                                                        <Grid item xs={6} md={6} className="bedArnge">
                                                                            <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                        </Grid>
                                                                    </Grid>                                                               </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>1</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Grid className="drRghtIner2">
                                                                            <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                                            <Grid>
                                                                                <Grid><label>{BenitoNoboa}</label></Grid>
                                                                                <Grid><p>{P_ukd832kd2}</p></Grid>
                                                                            </Grid>
                                                                            <Grid className="drRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>2</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Grid className="drRghtIner2">
                                                                            <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                                            <Grid>
                                                                                <Grid><label>{BenitoNoboa}</label></Grid>
                                                                                <Grid><p>{P_ukd832kd2}</p></Grid>
                                                                            </Grid>
                                                                            <Grid className="drRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>3</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Grid className="drRghtIner2">
                                                                            <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                                            <Grid>
                                                                                <Grid><label>{BenitoNoboa}</label></Grid>
                                                                                <Grid><p>{P_ukd832kd2}</p></Grid>
                                                                            </Grid>
                                                                            <Grid className="drRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>4</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Grid className="drRghtIner2">
                                                                            <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                                            <Grid>
                                                                                <Grid><label>{BenitoNoboa}</label></Grid>
                                                                                <Grid><p>{P_ukd832kd2}</p></Grid>
                                                                            </Grid>
                                                                            <Grid className="drRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <Grid className="drList2">
                                                                <Grid className="roomNum2">
                                                                    <Grid container direction="row">
                                                                        <Grid item xs={6} md={6}>
                                                                            <Button variant="contained">Room 2</Button>
                                                                        </Grid>
                                                                        <Grid item xs={6} md={6} className="bedArnge">
                                                                            <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>5</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Grid className="drRghtIner2">
                                                                            <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                                            <Grid>
                                                                                <Grid><label>{BenitoNoboa}</label></Grid>
                                                                                <Grid><p>{P_ukd832kd2}</p></Grid>
                                                                            </Grid>
                                                                            <Grid className="drRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>6</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Grid className="drRghtIner2">
                                                                            <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                                            <Grid>
                                                                                <Grid><label>{BenitoNoboa}</label></Grid>
                                                                                <Grid><p>{P_ukd832kd2}</p></Grid>
                                                                            </Grid>
                                                                            <Grid className="drRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>7</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Grid className="drRghtIner2">
                                                                            <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                                            <Grid>
                                                                                <Grid><label>{BenitoNoboa}</label></Grid>
                                                                                <Grid><p>{P_ukd832kd2}</p></Grid>
                                                                            </Grid>
                                                                            <Grid className="drRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>8</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Grid className="drRghtIner2">
                                                                            <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                                            <Grid>
                                                                                <Grid><label>{BenitoNoboa}</label></Grid>
                                                                                <Grid><p>{P_ukd832kd2}</p></Grid>
                                                                            </Grid>
                                                                            <Grid className="drRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <Grid className="drList2">
                                                                <Grid className="roomNum2">
                                                                    <Grid container direction="row">
                                                                        <Grid item xs={6} md={6}>
                                                                            <Button variant="contained">{Room2}</Button>
                                                                        </Grid>
                                                                        <Grid item xs={6} md={6} className="bedArnge">
                                                                            <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>9</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{Move_patient_here}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>10</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{Move_patient_here}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>11</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{Move_patient_here}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>11</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{Move_patient_here}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <Grid className="drList2">
                                                                <Grid className="roomNum2">
                                                                    <Grid container direction="row">
                                                                        <Grid item xs={6} md={6}>
                                                                            <Button variant="contained">{Room2}</Button>
                                                                        </Grid>
                                                                        <Grid item xs={6} md={6} className="bedArnge">
                                                                            <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>9</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{Move_patient_here}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>10</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{Move_patient_here}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>11</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{Move_patient_here}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>11</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{Move_patient_here}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={4} lg={3}>
                                                            <Grid className="drList2 patientRow2">
                                                                <Grid className="roomNum2">
                                                                    <Grid container direction="row">
                                                                        <Grid item xs={6} md={6}>
                                                                            <Button variant="contained">{Room2}</Button>
                                                                        </Grid>
                                                                        <Grid item xs={6} md={6} className="bedArnge">
                                                                            <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>9</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{AddPatient}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>10</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{AddPatient}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>11</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{AddPatient}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="drListMain2">
                                                                    <Grid className="drListLft2">
                                                                        <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                        <span>11</span>
                                                                    </Grid>
                                                                    <Grid className="drListRght2">
                                                                        <Button variant="contained">{AddPatient}</Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid item xs={12} md={8} lg={9}>
                                                            <Grid className="drCollection">
                                                                <Grid container direction="row">

                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid className="roomNum2">
                                                                            <Grid container direction="row">
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Button variant="contained">{Room2}</Button>
                                                                                </Grid>
                                                                                {/* <Grid item xs={6} md={6} className="bedArnge">
                                                                                     <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                                </Grid> */}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>12</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>13</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>14</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>15</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>16</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>17</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>18</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>19</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>20</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>21</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>22</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <Grid className="drListMain2">
                                                                            <Grid className="drListLft2">
                                                                                <img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                                                <span>23</span>
                                                                            </Grid>
                                                                            <Grid className="drListRght2">
                                                                                <Button variant="contained">{AddPatient}</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            }
                                            {value === 1 && <Grid>
                                                {ChildrensWardContent}
                                            </Grid>}

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
export default Index