import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import Modal from '@material-ui/core/Modal';
import * as translationEN from '../../translations/en_json_proofread_13072020.json'
function TabContainer(props) {
    return (
        <Typography component="div" style={{ paddingTop: 24 }}>
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};
const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            selectedOption: null,
            openFancy: false,
            openWish: false,
            openCart: false,
        };
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeSelect = selectedOption => {
        this.setState({ selectedOption });
    };

    // fancybox open
    handleOpenFancy = () => {
        this.setState({ openFancy: true });
    };
    handleCloseFancy = () => {
        this.setState({ openFancy: false });
    };

    handleOpenWish = () => {
        this.setState({ openWish: true });
    };
    handleCloseWish = () => {
        this.setState({ openWish: false });
    };

    handleOpenCart = () => {
        this.setState({ openCart: true });
    };
    handleCloseCart = () => {
        this.setState({ openCart: false });
    };

    render() {
        const { value } = this.state;
        const { selectedOption } = this.state;
        let translate;
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            // case "de":
            //     translate = translationDE.text
            //     break;
            // case "pt":
            //     translate = translationPT.text
            //     break;
            // case "sp":
            //     translate = translationSP.text
            //     break;
            // case "rs":
            //     translate = translationRS.text
            //     break;
            // case "nl":
            //     translate = translationNL.text
            //     break;
            // case "ch":
            //     translate = translationCH.text
            //     break;
            // case "sw":
            //     translate = translationSW.text
            //     break;
            case "default":
                translate = translationEN.text
        }
        let { journal, appointments, vdo_calls, my_profile, my_doc, trackers, what_diabetes, online_course, jrnl_archive, extra_srvc, secnd_openion, emrgancy_patient_data, blockchain_access_log,
            profile_setting, dark_mode, Language, logout, all_course, my_course, language_eng, topic_all, here_u_see_diabetes, new_course, add_to_cart } = translate;
        return (
            <Grid className="homeBg">
                <Grid container direction="row" justify="center">
                    <Grid item xs={12} md={12}>
                        <Grid container direction="row">

                            {/* Website Menu */}
                            <Grid item xs={12} md={1} className="MenuLeftUpr">
                                <Grid className="webLogo">
                                    <a href="/"><img src={require('../../assets/images/logo_new.png')} alt="" title="" /></a>
                                </Grid>
                                <Grid className="menuItems">
                                    <ul>
                                        <li className="webItems">
                                            <a>
                                                <svg className="inactiveItem" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                                                    <title>2A1F6B6D-F34D-4BF5-9528-F9F4BD68EBB8</title>
                                                    <g id="aimedis" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g id="UI---Components" transform="translate(-875.000000, -4251.000000)">
                                                            <g id="Nav-Journal/Inactive" transform="translate(866.000000, 4243.000000)">
                                                                <g id="Group" transform="translate(1.000000, 0.000000)">
                                                                    <g id="journal" transform="translate(8.000000, 8.000000)">
                                                                        <rect id="Rectangle" x="0" y="0.003" width="24" height="24"></rect>
                                                                        <path d="M19,8.001 L5,8.001 C3.896,8.001 3,7.104 3,6.001 L3,4.001 C3,2.899 3.896,2.001 5,2.001 L19,2.001 C20.104,2.001 21,2.899 21,4.001 L21,6.001 C21,7.104 20.104,8.001 19,8.001 Z M5,4.001 L5,6.001 L19,6.001 L19,4.001 L5,4.001 Z" id="Shape" fill="#BFC1C1" fill-rule="nonzero"></path>
                                                                        <g id="Group" transform="translate(3.000000, 9.000000)" fill="#BFC1C1" fill-rule="nonzero">
                                                                            <path d="M16,6.001 L2,6.001 C0.896,6.001 0,5.104 0,4.001 L0,2.001 C0,0.899 0.896,0.001 2,0.001 L16,0.001 C17.104,0.001 18,0.899 18,2.001 L18,4.001 C18,5.104 17.104,6.001 16,6.001 Z M2,2.001 L2,4.001 L16,4.001 L16,2.001 L2,2.001 Z" id="Shape"></path>
                                                                            <path d="M16,13.001 L2,13.001 C0.896,13.001 0,12.104 0,11.001 L0,9.001 C0,7.898 0.896,7.001 2,7.001 L16,7.001 C17.104,7.001 18,7.898 18,9.001 L18,11.001 C18,12.104 17.104,13.001 16,13.001 Z M2,9.001 L2,11.001 L16,11.001 L16,9.001 L2,9.001 Z" id="Shape"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                                <span>{journal}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/inbox">
                                                <img src={require('../../assets/images/chatVideo.jpg')} alt="" title="" />
                                                <span>Chat & <br /> {vdo_calls}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/appointment">
                                                <img src={require('../../assets/images/calenderIcon.jpg')} alt="" title="" />
                                                <span>{appointments}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <img src={require('../../assets/images/apoint.jpg')} alt="" title="" />
                                                <span>{my_doc}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <img src={require('../../assets/images/tracker.jpg')} alt="" title="" />
                                                <span>{trackers} & <br /> {self_data}</span>
                                            </a>
                                        </li>
                                        <li className="menuActv">
                                            <a className="moreMenu">
                                                <img src={require('../../assets/images/moreActive.png')} alt="" title="" />
                                                <span>{more}</span>
                                                <div className="moreMenuList">
                                                    <ul>
                                                        <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />{secnd_openion}</a></li>
                                                        <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />{emrgancy_patient_data}</a></li>
                                                        <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Aimedis {online_course}</a></li>
                                                        <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />{extra_srvc}</a></li>
                                                        <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />{jrnl_archive}</a></li>
                                                        <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />{blockchain_access_log}</a></li>
                                                    </ul>
                                                </div>
                                            </a>

                                        </li>
                                        <li>
                                            <a className="profilMenu">
                                                <img src={require('../../assets/images/useru.jpg')} alt="" title="" />
                                                <span>{my_profile}</span>

                                                <div className="profilMenuList">
                                                    <ul>
                                                        <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />{profile_setting}</a></li>
                                                        <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />{Language}</a></li>
                                                        <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />{dark_mode}</a></li>
                                                        <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />{logout}</a></li>
                                                    </ul>
                                                </div>

                                            </a>
                                        </li>
                                    </ul>
                                </Grid>
                            </Grid>
                            {/* End of Website Menu */}

                            {/* Website Mid Content */}
                            <Grid item xs={12} md={11}>
                                <Grid className="onlineCoursesList">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={10}>

                                            <Grid className="onlinCours">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6} className="onlinLft">
                                                        <h4>Aimedis {online_course}</h4>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Grid className="onlinRght">
                                                            <a><img src={require('../../assets/images/wishFill.png')} alt="" title="" /></a>
                                                            <a><img src={require('../../assets/images/cart.png')} alt="" title="" /></a>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            {/* Tabs  */}
                                            <Grid className="coursesTab">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={4}>
                                                        <AppBar position="static">
                                                            <Tabs value={value} onChange={this.handleChange} className="onlineTabs">
                                                                <Tab label={all_course} className="onlineTabsIner" />
                                                                <Tab label={my_course} className="onlineTabsIner" />
                                                            </Tabs>
                                                        </AppBar>
                                                    </Grid>
                                                    <Grid item xs={12} md={8}>
                                                        <Grid container direction="row" justify="center" alignItems="center" spacing={2} className="topicLang">
                                                            <Grid item xs={12} md={4}></Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <Select
                                                                    value={selectedOption}
                                                                    onChange={this.handleChangeSelect}
                                                                    options={options}
                                                                    placeholder={topic_all}
                                                                    className="topicAll"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <Select
                                                                    value={selectedOption}
                                                                    onChange={this.handleChangeSelect}
                                                                    options={options}
                                                                    placeholder={language_eng}
                                                                    className="topicAll"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={1} className="topicSrch">
                                                                <img src={require('../../assets/images/topicSrch.jpg')} alt="" title="" />
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            {value === 0 && <TabContainer>

                                                <Grid className="nwCoursName">
                                                    <h3>{new_course}</h3>
                                                </Grid>
                                                <Grid container direction="row" spacing={4} className="newCourseCntnt">
                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="courseList">
                                                            <Grid className="courseListLbl"><label>{what_diabetes}?</label></Grid>
                                                            <Grid className="courseListInr">
                                                                <Grid className="courseListPara">
                                                                    <p>{here_u_see_diabetes}</p>
                                                                </Grid>
                                                                <Grid className="courseListTime">
                                                                    <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                    <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                </Grid>
                                                                <Grid className="courseStar">
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                    <span>4.5<a>(38)</a></span>
                                                                </Grid>
                                                                <Grid className="coursePrice"><label>19 €</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="courseList">
                                                            <Grid className="courseListLbl"><label>{what_diabetes}?</label></Grid>
                                                            <Grid className="courseListInr">
                                                                <Grid className="courseListPara">
                                                                    <p>{here_u_see_diabetes}
                                                                    </p>
                                                                </Grid>
                                                                <Grid className="courseListTime">
                                                                    <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                    <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                </Grid>
                                                                <Grid className="courseStar">
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                    <span>4.5<a>(38)</a></span>
                                                                </Grid>
                                                                <Grid className="coursePrice"><label>19 €</label></Grid>
                                                            </Grid>

                                                            <Grid className="add_wishList">
                                                                <Grid container direction="row" alignItems="center">
                                                                    <Grid item xs={12} md={9}>
                                                                        <Grid className="nwCoursCrt"><a>{add_to_cart}</a></Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={3}>
                                                                        <Grid className="nwCoursCrtRght"><a><img src={require('../../assets/images/wishlist.png')} alt="" title="" /></a></Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="clear"></Grid>
                                                </Grid>

                                                {/* Second option */}

                                                <Grid className="nwCoursName">
                                                    <h3>All Courses</h3>
                                                </Grid>
                                                <Grid container direction="row" spacing={4} className="newCourseCntnt">
                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="courseList">
                                                            <Grid className="courseListLbl"><label>{what_diabetes}?</label></Grid>
                                                            <Grid className="courseListInr">
                                                                <Grid className="courseListPara">
                                                                    <p>{here_u_see_diabetes}
                                                                    </p>
                                                                </Grid>
                                                                <Grid className="courseListTime">
                                                                    <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                    <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                </Grid>
                                                                <Grid className="courseStar">
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                    <span>4.5<a>(38)</a></span>
                                                                </Grid>
                                                                <Grid className="coursePrice"><label>19 €</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="courseList">
                                                            <Grid className="courseListLbl"><label>{what_diabetes}?</label></Grid>
                                                            <Grid className="courseListInr">
                                                                <Grid className="courseListPara">
                                                                    <p>{here_u_see_diabetes}</p>
                                                                </Grid>
                                                                <Grid className="courseListTime">
                                                                    <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                    <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                </Grid>
                                                                <Grid className="courseStar">
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                    <span>4.5<a>(38)</a></span>
                                                                </Grid>

                                                                <Grid container direction="row" alignItems="center">
                                                                    <Grid item xs={6} md={6}>
                                                                        <Grid className="coursePrice"><label>19 €</label></Grid>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={6} className="fillWish">
                                                                        <a><img src={require('../../assets/images/fillWish.png')} alt="" title="" /></a>
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="courseList">
                                                            <Grid className="courseListLbl"><label>{what_diabetes}?</label></Grid>
                                                            <Grid className="courseListInr">
                                                                <Grid className="courseListPara">
                                                                    <p>{here_u_see_diabetes}
                                                                    </p>
                                                                </Grid>
                                                                <Grid className="courseListTime">
                                                                    <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                    <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                </Grid>
                                                                <Grid className="courseStar">
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                    <span>4.5<a>(38)</a></span>
                                                                </Grid>
                                                                <Grid className="coursePrice"><label>19 €</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </TabContainer>}
                                            {value === 1 && <TabContainer>
                                                <Grid className="nwCoursName">
                                                    <h3>My Courses</h3>
                                                </Grid>
                                                <Grid container direction="row" spacing={3} className="newCourseCntnt">
                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="courseList">
                                                            <Grid className="courseListLbl"><label>{what_diabetes}?</label></Grid>
                                                            <Grid className="courseListInr">
                                                                <Grid className="courseListPara">
                                                                    <p>{here_u_see_diabetes}
                                                                    </p>
                                                                </Grid>
                                                                <Grid className="courseListTime">
                                                                    <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                    <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                </Grid>
                                                                <Grid className="courseStar">
                                                                    <a><img src={require('../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                                                    <span onClick={this.handleOpenFancy}>Leave a rating</span>
                                                                </Grid>
                                                                <Grid className="strtLrn"><label onClick={this.handleOpenCart}>Start learning</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="courseList">
                                                            <Grid className="courseListLbl"><label>{what_diabetes}?</label></Grid>
                                                            <Grid className="courseListInr">
                                                                <Grid className="courseListPara">
                                                                    <p>{here_u_see_diabetes}
                                                                    </p>
                                                                </Grid>
                                                                <Grid className="courseListTime">
                                                                    <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                    <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                </Grid>
                                                                <Grid className="courseStar">
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                    <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                    <span onClick={this.handleOpenFancy}>Your rating</span>
                                                                </Grid>
                                                                <Grid className="strtLrn"><label onClick={this.handleOpenWish}>Continue watching</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="clear"></Grid>

                                                    {/* Model setup */}
                                                    <div className="fancyBoxMain">
                                                        <Modal
                                                            open={this.state.openFancy}
                                                            onClose={this.handleCloseFancy}
                                                            className="fancyBoxModel">
                                                            <div className="fancyBoxCntnt">
                                                                <div className="rateCourse">
                                                                    <div className="handleCloseBtn">
                                                                        <a onClick={this.handleCloseFancy}>
                                                                            <img src={require('../../assets/images/closefancy.png')} alt="" title="" />
                                                                        </a>
                                                                    </div>
                                                                    <div><label>Rate this course</label></div>
                                                                    <p>If you have specific comments about the course, please let us
                                                                       know by filling out the form.</p>
                                                                </div>
                                                                <div className="rateStars">
                                                                    <p>Very good</p>
                                                                    <div>
                                                                        <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                        <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                        <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                        <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                        <a><img src={require('../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                                                    </div>
                                                                </div>
                                                                <div className="shrtMsg">
                                                                    <div><label>Short message</label></div>
                                                                    <div><textarea></textarea></div>
                                                                    <div><input type="submit" value="Save and continue" /></div>
                                                                </div>
                                                            </div>
                                                        </Modal>
                                                    </div>
                                                    {/* End of Model setup */}

                                                    {/* Open WishList Model setup */}
                                                    <div className="fancyBoxMain">
                                                        <Modal
                                                            open={this.state.openWish}
                                                            onClose={this.handleCloseWish}
                                                            className="wishListModel">
                                                            <div className="wishListCntnt">

                                                                <div className="wshLstHai">
                                                                    <div className="wshLstHaiLft"><label>Wishlist</label></div>
                                                                    <div className="wshLstHaiRght">
                                                                        <a onClick={this.handleCloseWish}>
                                                                            <img src={require('../../assets/images/closefancy.png')} alt="" title="" />
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                                {/* WishList Content */}
                                                                <Grid className="wshCorList">
                                                                    <Grid className="wshCorListLbl"><label>{what_diabetes}?</label></Grid>
                                                                    <Grid className="wshCorListInr">
                                                                        <Grid className="wshCorListPara">
                                                                            <p>{here_u_see_diabetes}
                                                                            </p>
                                                                        </Grid>
                                                                        <Grid className="wshCorListTime">
                                                                            <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                            <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                        </Grid>
                                                                        <Grid className="wshCorStar">
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                            <span>4.5<a>(38)</a></span>
                                                                        </Grid>
                                                                        <Grid className="wshCorPrice"><label>19 €</label></Grid>
                                                                        <Grid className="nwWshCrtUpr">
                                                                            <Grid container direction="row" alignItems="center">
                                                                                <Grid item xs={12} md={9}>
                                                                                    <Grid className="nwWshCrt"><a>{add_to_cart}</a></Grid>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <Grid className="nwWshCrtRght"><a><img src={require('../../assets/images/fillWish.png')} alt="" title="" /></a></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid className="wshCorList">
                                                                    <Grid className="wshCorListLbl"><label>{what_diabetes}?</label></Grid>
                                                                    <Grid className="wshCorListInr">
                                                                        <Grid className="wshCorListPara">
                                                                            <p>Here you see what diabetes is, how it comes to
                                                                            diabetes and why a good treatment is so crucial.
                                                                            </p>
                                                                        </Grid>
                                                                        <Grid className="wshCorListTime">
                                                                            <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                            <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                        </Grid>
                                                                        <Grid className="wshCorStar">
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                            <span>4.5<a>(38)</a></span>
                                                                        </Grid>
                                                                        <Grid className="wshCorPrice"><label>19 €</label></Grid>
                                                                        <Grid className="nwWshCrtUpr">
                                                                            <Grid container direction="row" alignItems="center">
                                                                                <Grid item xs={12} md={9}>
                                                                                    <Grid className="nwWshCrt"><a>{add_to_cart}</a></Grid>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <Grid className="nwWshCrtRght"><a><img src={require('../../assets/images/fillWish.png')} alt="" title="" /></a></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid className="wshCorList">
                                                                    <Grid className="wshCorListLbl"><label>{what_diabetes}?</label></Grid>
                                                                    <Grid className="wshCorListInr">
                                                                        <Grid className="wshCorListPara">
                                                                            <p>Here you see what diabetes is, how it comes to
                                                                            diabetes and why a good treatment is so crucial.
                                                                            </p>
                                                                        </Grid>
                                                                        <Grid className="wshCorListTime">
                                                                            <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                            <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                        </Grid>
                                                                        <Grid className="wshCorStar">
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                            <span>4.5<a>(38)</a></span>
                                                                        </Grid>
                                                                        <Grid className="wshCorPrice"><label>19 €</label></Grid>
                                                                        <Grid className="nwWshCrtUpr">
                                                                            <Grid container direction="row" alignItems="center">
                                                                                <Grid item xs={12} md={9}>
                                                                                    <Grid className="nwWshCrt"><a>{add_to_cart}</a></Grid>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <Grid className="nwWshCrtRght"><a><img src={require('../../assets/images/fillWish.png')} alt="" title="" /></a></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                {/* End of WishList Content */}

                                                            </div>
                                                        </Modal>
                                                    </div>
                                                    {/* End of WishList Model setup */}

                                                    {/* online cart design */}
                                                    <div className="fancyBoxMain">
                                                        <Modal
                                                            open={this.state.openCart}
                                                            onClose={this.handleCloseCart}
                                                            className="crtListModel">
                                                            <div className="crtListCntnt">
                                                                <div className="crtLstHai">
                                                                    <div className="crtLstHaiLft"><label>Cart</label></div>
                                                                    <div className="crtLstHaiRght">
                                                                        <a onClick={this.handleCloseCart}>
                                                                            <img src={require('../../assets/images/closefancy.png')} alt="" title="" />
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                                <Grid className="crtCorList">
                                                                    <Grid className="crtCorListLbl"><label>{what_diabetes}?</label></Grid>
                                                                    <Grid className="crtCorListInr">
                                                                        <Grid className="crtCorListPara">
                                                                            <p>Here you see what diabetes is, how it comes to diabetes
                                                                            and why a good treatment is so crucial.</p>
                                                                        </Grid>
                                                                        <Grid className="crtCorListTime">
                                                                            <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                            <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                        </Grid>
                                                                        <Grid className="crtCorStar">
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                            <span>4.5<a>(38)</a></span>
                                                                        </Grid>
                                                                        <Grid container direction="row" alignItems="center">
                                                                            <Grid item xs={6} md={6}>
                                                                                <Grid className="crtCorPrice"><label>19 €</label></Grid>
                                                                            </Grid>
                                                                            <Grid item xs={6} md={6}>
                                                                                <Grid className="crtCorRmv">
                                                                                    <a>Remove</a>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid className="crtCorList">
                                                                    <Grid className="crtCorListLbl"><label>{what_diabetes}?</label></Grid>
                                                                    <Grid className="crtCorListInr">
                                                                        <Grid className="crtCorListPara">
                                                                            <p>{here_u_see_diabetes}</p>
                                                                        </Grid>
                                                                        <Grid className="crtCorListTime">
                                                                            <Grid><a><img src={require('../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                                                            <Grid><a><img src={require('../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                                                        </Grid>
                                                                        <Grid className="crtCorStar">
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                                                            <a><img src={require('../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                                                            <span>4.5<a>(38)</a></span>
                                                                        </Grid>
                                                                        <Grid container direction="row" alignItems="center">
                                                                            <Grid item xs={6} md={6}>
                                                                                <Grid className="crtCorPrice"><label>19 €</label></Grid>
                                                                            </Grid>
                                                                            <Grid item xs={6} md={6}>
                                                                                <Grid className="crtCorRmv">
                                                                                    <a>Remove</a>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="crtChekOut">
                                                                    <input type="submit" value="Checkout" />
                                                                </Grid>
                                                            </div>
                                                        </Modal>
                                                    </div>
                                                    {/* End of online cart design */}

                                                </Grid>

                                            </TabContainer>}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* End of Website Right Content */}



                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));