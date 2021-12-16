import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from 'swiper/core';
import SpecialityList from "Screens/Components/VirtualHospitalComponents/SpecialityList/index";
import SpecialityButton from "Screens/Components/VirtualHospitalComponents/SpecialityButton/index";
import { getLanguage } from "translations/index";
SwiperCore.use([Pagination]);
var new_data = [{
    speciality_name: 'Cardiology', color: "#EE5253", backgroundColor: "#FBD4D4",
    total_wards: [
        { ward_name: "Adults Ward", room: 8, no_of_bed: 53, available: 32 }
    ]
}]
var new_data1 = [{
    speciality_name: 'Radiology', color: "#EE5253", backgroundColor: "#FBD4D4",
    total_wards: [
        { room: 8, no_of_bed: 53, available: 32, ward_name: "Adults Ward" }
    ]
}]
class Index extends Component {
    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { GermanMedicalCenterFZLLC, Neurology, AdultsWard, SpaceManagement, Institution, speciality, Ward } = translate;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            <LeftMenuMobile isNotShow={true} currentPage="chat" />
                            <Grid container direction="row">
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
                                                            <li><a><span>{Institution}</span><label>{GermanMedicalCenterFZLLC}</label></a></li>
                                                            t                     <li><a><span>{speciality}</span><label>{Neurology}</label></a></li>
                                                            <li><a><span>{Ward}</span><label>{AdultsWard}</label></a></li>
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
                                            <h1>{SpaceManagement}</h1>
                                        </Grid>
                                        <Grid className="breadCrumbUpr breadCrumbUprWeb">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={9} md={9}>
                                                    <Grid className="roomBreadCrumb">
                                                        <ul>
                                                            <li><a><span>{Institution}</span><label>{GermanMedicalCenterFZLLC}</label></a></li>
                                                            <li><a><span>{speciality}</span><label>{Neurology}</label></a></li>
                                                            <li><a><span>Ward</span><label>{AdultsWard}</label></a></li>
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

                                                        {new_data?.length > 0 && new_data.map((data) => (
                                                            <>
                                                                < SpecialityButton
                                                                    label={data.speciality_name}
                                                                    color={data.color}
                                                                    backgroundColor={data.backgroundColor}
                                                                />
                                                                {data?.total_wards?.length > 0 && data?.total_wards?.map((data3) => (
                                                                    < SpecialityList
                                                                        label={data3.ward_name}
                                                                        rooms={data3.room}
                                                                        beds={data3.no_of_bed}
                                                                        available={data3.available}
                                                                    />
                                                                ))}

                                                            </>
                                                        ))}


                                                        {/* <Grid className="wardsGrup">
                                                            <Grid className="spcMgntUpr">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={6}>
                                                                        <Button variant="contained">Cardiology</Button>
                                                                    </Grid> */}
                                                        {/* 
                                                        < SpecialityButton
                                                            label="Cardiology"
                                                            color="#EE5253"
                                                            backgroundColor="#FBD4D4"

                                                        /> */}


                                                        {/* <Grid item xs={6} md={6} className="spcMgntRght">
                                                                    <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                </Grid> */}
                                                        {/* </Grid>
                                                            </Grid> */}
                                                        {/* 
                                                        < SpecialityList
                                                            label="Adults Ward"
                                                            rooms="8"
                                                            beds="53"
                                                            available="32"
                                                        /> */}


                                                        {/* 

                                                        <Grid className="roomsNum2">
                                                            <ul>
                                                                <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Childrens Ward</li>
                                                                <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                                                <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                                                    53 beds<span>32 available</span>
                                                                </li>
                                                            </ul>
                                                        </Grid> */}


                                                    </SwiperSlide>
                                                    {/* <SwiperSlide>
                                                        <Grid className="wardsGrup">
                                                            <Grid className="spcMgntUpr">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={6}>
                                                                        <Button variant="contained">Cardiology</Button>
                                                                    </Grid> */}
                                                    {/* <Grid item xs={6} md={6} className="spcMgntRght">
                                                                         <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                    </Grid> */}
                                                    {/* </Grid>
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
                                                            <sefg ward_name={"adult ward"} total_bed={53} total_room={8} available={29} />
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
                                                                    </Grid> */}
                                                    {/* <Grid item xs={6} md={6} className="spcMgntRght">
                                                                    <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                                                </Grid> */}
                                                    {/* </Grid>
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
                                                    </SwiperSlide> */}
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
            </Grid >
        );
    }
}
export default Index