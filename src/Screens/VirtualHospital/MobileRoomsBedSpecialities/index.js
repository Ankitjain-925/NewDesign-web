import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Button from '@material-ui/core/Button';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from 'swiper/core';
SwiperCore.use([Pagination]);

class Index extends Component {
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
                                        <Grid className="breadCrumbUpr breadCrumbUprMob">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={9} md={9}>
                                                    <Grid className="roomBreadCrumb roomBreadCrumbMob">
                                                        <ul>
                                                            <li><a><span>Institution</span><label>German Medical Center FZ-LLC</label></a></li>
                                                            <li><a><span>Speciality</span><label>Neurology</label></a></li>
                                                            <li><a><span>Ward</span><label>Adults Ward</label></a></li>
                                                        </ul>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={3} md={3}>
                                                    <Grid className="settingInfo settingInfoMob">
                                                        <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                                                        <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="spcMgnt">
                                            <h1>Space Management</h1>
                                        </Grid>
                                        <Grid className="breadCrumbUpr breadCrumbUprWeb">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={9} md={9}>
                                                    <Grid className="roomBreadCrumb">
                                                        <ul>
                                                            <li><a><span>Institution</span><label>German Medical Center FZ-LLC</label></a></li>
                                                            <li><a><span>Speciality</span><label>Neurology</label></a></li>
                                                            <li><a><span>Ward</span><label>Adults Ward</label></a></li>
                                                        </ul>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={3} md={3}>
                                                    <Grid className="settingInfo">
                                                        <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                                                        <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" justify="center">
                                            <Grid item xs={11} sm={12} md={12}>
                                                <Swiper spaceBetween={20} slidesPerView={1} 
                                                        pagination={{ "dynamicBullets": true }}
                                                        onSlideChange={() => console.log('slide change')} 
                                                        onSwiper={(swiper) => console.log(swiper)}>
                                                    <SwiperSlide>
                                                        <Grid className="wardsGrup">
                                                            <Grid className="spcMgntUpr">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={6}>
                                                                        <Button variant="contained">Cardiology</Button>
                                                                    </Grid>
                                                                    {/* <Grid item xs={6} md={6} className="spcMgntRght">
                                                                    <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                </Grid> */}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="roomsNum2">
                                                                <ul>
                                                                    <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Adults Ward</li>
                                                                    <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                    <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                        53 beds<span>32 available</span>
                                                                    </li>
                                                                </ul>
                                                            </Grid>
                                                            <Grid className="roomsNum2">
                                                                <ul>
                                                                    <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Childrens Ward</li>
                                                                    <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                    <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                        53 beds<span>32 available</span>
                                                                    </li>
                                                                </ul>
                                                            </Grid>
                                                        </Grid>
                                                    </SwiperSlide>
                                                    <SwiperSlide>
                                                        <Grid className="wardsGrup">
                                                            <Grid className="spcMgntUpr">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={6}>
                                                                        <Button variant="contained">Cardiology</Button>
                                                                    </Grid>
                                                                    {/* <Grid item xs={6} md={6} className="spcMgntRght">
                                                                         <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                    </Grid> */}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="roomsNum2">
                                                                <ul>
                                                                    <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Adults Ward</li>
                                                                    <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                    <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                        53 beds<span>32 available</span>
                                                                    </li>
                                                                </ul>
                                                            </Grid>
                                                            <Grid className="roomsNum2">
                                                                <ul>
                                                                    <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Childrens Ward</li>
                                                                    <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                    <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                        53 beds<span>32 available</span>
                                                                    </li>
                                                                </ul>
                                                            </Grid>
                                                        </Grid>
                                                    </SwiperSlide>
                                                    <SwiperSlide>
                                                        <Grid className="wardsGrup">
                                                            <Grid className="spcMgntUpr">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={6}>
                                                                        <Button variant="contained" className="radiologyBtn">Radiology</Button>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={6} className="spcMgntRght">
                                                                        <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="roomsNum2">
                                                                <ul>
                                                                    <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Adults Ward</li>
                                                                    <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                    <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                        53 beds<span>32 available</span>
                                                                    </li>
                                                                </ul>
                                                            </Grid>
                                                        </Grid>
                                                    </SwiperSlide>
                                                    <SwiperSlide>
                                                        <Grid className="wardsGrup">
                                                            <Grid className="spcMgntUpr">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={6}>
                                                                        <Button variant="contained" className="neurologyBtn">Neurology</Button>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={6} className="spcMgntRght">
                                                                        <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="roomsNum2">
                                                                <ul>
                                                                    <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Adults Ward</li>
                                                                    <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                    <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                        53 beds<span>32 available</span>
                                                                    </li>
                                                                </ul>
                                                            </Grid>
                                                            <Grid className="roomsNum2">
                                                                <ul>
                                                                    <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Childrens Ward</li>
                                                                    <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                    <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                        53 beds<span>32 available</span>
                                                                    </li>
                                                                </ul>
                                                            </Grid>
                                                        </Grid>
                                                    </SwiperSlide>
                                                    <SwiperSlide>
                                                        <Grid className="wardsGrup">
                                                            <Grid className="spcMgntUpr">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={6}>
                                                                        <Button variant="contained" className="onlogyBtn">Oncology</Button>
                                                                    </Grid>
                                                                    {/* <Grid item xs={6} md={6} className="spcMgntRght">
                                                                    <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                </Grid> */}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="roomsNum2">
                                                                <ul>
                                                                    <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />First Ward</li>
                                                                    <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                    <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                        53 beds<span>32 available</span>
                                                                    </li>
                                                                </ul>
                                                            </Grid>
                                                            <Grid className="roomsNum2">
                                                                <ul>
                                                                    <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Second Ward</li>
                                                                    <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                    <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                        53 beds<span>32 available</span>
                                                                    </li>
                                                                </ul>
                                                            </Grid>
                                                            <Grid className="roomsNum2">
                                                                <ul>
                                                                    <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Third Ward</li>
                                                                    <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                    <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                        53 beds<span>32 available</span>
                                                                    </li>
                                                                </ul>
                                                            </Grid>
                                                        </Grid>
                                                    </SwiperSlide>
                                                </Swiper>
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
export default Index