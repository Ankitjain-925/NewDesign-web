import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { connect } from "react-redux";
import { LoginReducerAim } from '../../../Login/actions';
import { Settings } from '../../../Login/setting';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from '../../../actions';
import sitedata, { data } from '../../../../sitedata';
import { ConsoleCustom } from '../../BasicMethod';
import Rating from '../../Rating'
import Loader from './../../../Components/Loader/index.js'

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

class Index extends Component {
    constructor(props) {
       super(props);
        this.state = {
            allCourse : [],
            allCourse1 : [],
            newCourse : [],
            newCourse1 : [],
            loaderImage : false,
            addedWish : false,
            Allwishlist : [],
            cartAlready: this.props.cartAlready
        };
    }

    componentDidMount() {
        this.getAllList();
    }

    //get All the Course
    getAllList = () => {
        this.setState({loaderImage: true})
        axios.post(sitedata.data.path + '/lms/getVideoList', { user_type: this.props.stateLoginValueAim.user.type },
        {
            headers: {
                'token': this.props.stateLoginValueAim.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            var NewVideo  = response.data.data.slice(0, 3)
            // var AllVideo = response.data.data.slice(3)
            this.setState({loaderImage: false, newCourse : NewVideo, newCourse1: NewVideo, allCourse: response.data.data, allCourse1: response.data.data });
        })
    }

    //For add to wishlist
    AddtoWishtlist=(element)=>{
        var data = element
        if(!data._id){
            data._id = data.courseId;
        }
        let user_token = this.props.stateLoginValueAim.token
        data.courseId = data._id;
        data.user_id = this.props.stateLoginValueAim.user._id;
        data.user_profile_id = this.props.stateLoginValueAim.user.profile_id;
        data.userName = this.props.stateLoginValueAim.user.first_name + this.props.stateLoginValueAim.user.last_name;
        data.userType = this.props.stateLoginValueAim.user.type;
        data.email = this.props.stateLoginValueAim.user.email;
        data.createdBy = this.props.stateLoginValueAim.user._id;
        data.createdAt = new Date();
        data.wishlistAddedDate = new Date();
        delete data.permission;
        delete data._id;

        this.setState({loaderImage: true})
        axios.post(sitedata.data.path + '/lms/addtowishlist', data,
        {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
             this.setState({addedWish : true, loaderImage: false})
                setTimeout(()=>{ this.setState({addedWish : false}) }, 3000)
                this.props.getAllwishlist();
                this.getAllList();
        }).catch(err => { })
    } 
 
    //For open to give rating
    handleOpenFancy = () => {
        this.setState({ openFancy: true });
    };
    handleCloseFancy = () => {
        this.setState({ openFancy: false });
    };

    //For Remove the Wishlist 
    removeWishlist = (item)=>{
        var Reuslt = this.state.Allwishlist.filter(Wish => Wish.courseId === item._id)
        if(Reuslt && Reuslt.length>0)
        {
            this.props.removeWishlist(Reuslt[0])
        }
    }
    //on getting filter and filter Accordingly
    componentDidUpdate = (prevProps) => {
        if (prevProps.cartAlready !== this.props.cartAlready)
        {
            this.setState({cartAlready :this.props.cartAlready})
        }
        if (prevProps.SelectedLanguage !== this.props.SelectedLanguage || prevProps.SelectedTopic !== this.props.SelectedTopic) {
           if(this.props.SelectedLanguage.value === 'All' && this.props.SelectedTopic.value === 'All')
           {
                this.setState({allCourse : this.state.allCourse1, newCourse : this.state.newCourse1})
           }
           else if(this.props.SelectedLanguage.value === 'All' && this.props.SelectedTopic.value !== 'All')
           {
                var myFilterData1 = this.state.newCourse1.filter((value) => value.topic.includes(this.props.SelectedTopic.value));
                var myFilterData = this.state.allCourse1.filter((value) => value.topic.includes(this.props.SelectedTopic.value))
                this.setState({allCourse : myFilterData, newCourse : myFilterData1})    
           }
           else if(this.props.SelectedLanguage.value !== 'All' && this.props.SelectedTopic.value === 'All')
           {
                var myFilterData1 = this.state.newCourse1.filter((value) => value.language === this.props.SelectedLanguage.value);
                var myFilterData = this.state.allCourse1.filter((value) => value.language === this.props.SelectedLanguage.value);
                this.setState({allCourse : myFilterData, newCourse : myFilterData1})
           }
           else
           {
                var myFilterData1 = this.state.newCourse1.filter((value) => value.topic.includes(this.props.SelectedTopic.value) && value.language === this.props.SelectedLanguage.value);
                var myFilterData = this.state.allCourse1.filter((value) => value.topic.includes(this.props.SelectedTopic.value) && value.language === this.props.SelectedLanguage.value)
                this.setState({allCourse : myFilterData, newCourse : myFilterData1})   
           }
        }
        if (prevProps.Allwishlist !== this.props.Allwishlist)
        {
            this.setState({Allwishlist :this.props.Allwishlist})
        }
    }

    render() {
        const { value } = this.state;
        const { selectedOption } = this.state;
        return (
            <div>
                  {this.state.loaderImage && <Loader />}

                  {this.state.addedWish && <div className="success_message">Wishlist added successfully</div>}
                  {this.state.cartAlready &&<div className="err_message">Cart Already exist</div>}
                 <Grid className="nwCoursName">
                    <h3>New Courses</h3>
                </Grid>
                
                <Grid container direction="row" spacing={4} className="newCourseCntnt">
                {this.state.newCourse && this.state.newCourse.length>0 && this.state.newCourse.map((item, index)=>(
                    <Grid item xs={12} md={4}>
                                               <Grid className={this.state.Allwishlist.some(Wish => Wish.courseId === item._id) ? "courseList cardAddedWish" : "courseList"}>
                            <Grid className="courseListLbl"><label>{item.courseTitle}</label></Grid>
                            <Grid className="courseListInr">
                                <Grid className="courseListPara">
                                    <p>{item.courseDesc}</p>
                                </Grid>
                                <Grid className="courseListTime">
                                    <Grid><a><img src={require('../../../../assets/images/lectures.svg')} alt="" title="" />{item.attachment.length} lectures</a></Grid>
                                    {/* <Grid><a><img src={require('../../../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid> */}
                                </Grid>
                                <Grid className="courseStar">
                                <Rating size="20" rating={item.courseContent && item.courseContent.average} />
                                    {/* <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-half.svg')} alt="" title="" /></a> */}
                                    <span>{item.courseContent && item.courseContent.average}{item.courseContent && <a>( {item.courseContent.count})</a>}</span>
                                </Grid>
                                <Grid className="coursePrice"><label>{item.price} €</label></Grid>
                            </Grid>
                            <Grid className="add_wishList">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={12} md={9}>
                                        <Grid className="nwCoursCrt"><a onClick={()=>this.props.AddtoCard(item, 'all')}>Add to cart</a></Grid>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={3}>
                                        <Grid className="nwCoursCrtRght">
                                            {this.state.Allwishlist.some(Wish => Wish.courseId === item._id) ? <a onClick={()=>{this.removeWishlist(item)}}><img src={require('../../../../assets/images/fillWish.png')} alt="" title="" /></a>
                                            : <a onClick={()=>this.AddtoWishtlist(item)}><img src={require('../../../../assets/images/wishlist.png')} alt="" title="" /></a>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    ))}
{/*                     
                    <Grid item xs={12} md={4}>
                        <Grid className="courseList">
                            <Grid className="courseListLbl"><label>What is Diabetes?</label></Grid>
                            <Grid className="courseListInr">
                                <Grid className="courseListPara">
                                    <p>Here you see what diabetes is, how it comes to
                                    diabetes and why a good treatment is so crucial.</p>
                                </Grid>
                                <Grid className="courseListTime">
                                    <Grid><a><img src={require('../../../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                    <Grid><a><img src={require('../../../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                </Grid>
                                <Grid className="courseStar">
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                    <span>4.5<a>(38)</a></span>
                                </Grid>
                                <Grid className="coursePrice"><label>19 €</label></Grid>
                            </Grid>

                            <Grid className="add_wishList">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={12} md={9}>
                                        <Grid className="nwCoursCrt"><a onClick={()=>this.props.AddtoCard()}>Add to cart</a></Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Grid className="nwCoursCrtRght"><a><img onClick={()=>this.AddtoWishtlist()} src={require('../../../../assets/images/wishlist.png')} alt="" title="" /></a></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid> */}
                    <Grid className="clear"></Grid>
                </Grid>

                {/* Second option */}
                <Grid className="nwCoursName">
                    <h3>All Courses</h3>
                </Grid>
                <Grid container direction="row" spacing={4} className="newCourseCntnt">
                {this.state.allCourse && this.state.allCourse.length>0 && this.state.allCourse.map((item, index)=>(
                    <Grid item xs={12} md={4}>
                        <Grid className={this.state.Allwishlist.some(Wish => Wish.courseId === item._id) ? "courseList cardAddedWish" : "courseList"}>
                            <Grid className="courseListLbl"><label>{item.courseTitle}</label></Grid>
                            <Grid className="courseListInr">
                                <Grid className="courseListPara">
                                    <p>{item.courseDesc}</p>
                                </Grid>
                                <Grid className="courseListTime">
                                    <Grid><a><img src={require('../../../../assets/images/lectures.svg')} alt="" title="" />{item.attachment.length} lectures</a></Grid>
                                    {/* <Grid><a><img src={require('../../../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid> */}
                                </Grid>
                                <Grid className="courseStar">
                                <Rating size="20" rating={item.courseContent && item.courseContent.average} />
                                    {/* <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-half.svg')} alt="" title="" /></a> */}
                                    <span>{item.courseContent && item.courseContent.average}<a>{item.courseContent && <a>( {item.courseContent.count})</a>}</a></span>
                                </Grid>
                                <Grid className="coursePrice"><label>{item.price} €</label></Grid>
                            </Grid>
                            <Grid className="add_wishList">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={12} md={9}>
                                        <Grid className="nwCoursCrt"><a onClick={()=>this.props.AddtoCard(item, 'all')}>Add to cart</a></Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Grid className="nwCoursCrtRght">
                                            {this.state.Allwishlist.some(Wish => Wish.courseId === item._id)  ? <a onClick={()=>{this.removeWishlist(item)}}><img src={require('../../../../assets/images/fillWish.png')} alt="" title="" /></a> 
                                            : <a><img onClick={()=>this.AddtoWishtlist(item)} src={require('../../../../assets/images/wishlist.png')} alt="" title="" /></a>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    ))}
                    {/* <Grid item xs={12} md={4}>
                        <Grid className="courseList">
                            <Grid className="courseListLbl"><label>What is Diabetes?</label></Grid>
                            <Grid className="courseListInr">
                                <Grid className="courseListPara">
                                    <p>Here you see what diabetes is, how it comes to
                                    diabetes and why a good treatment is so crucial.</p>
                                </Grid>
                                <Grid className="courseListTime">
                                    <Grid><a><img src={require('../../../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                    <Grid><a><img src={require('../../../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                </Grid>
                                <Grid className="courseStar">
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                    <span>4.5<a>(38)</a></span>
                                </Grid>

                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6}>
                                        <Grid className="coursePrice"><label>19 €</label></Grid>
                                    </Grid>
                                    <Grid item xs={6} md={6} className="fillWish">
                                        <a><img src={require('../../../../assets/images/fillWish.png')} alt="" title="" /></a>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Grid className="courseList">
                            <Grid className="courseListLbl"><label>What is Diabetes?</label></Grid>
                            <Grid className="courseListInr">
                                <Grid className="courseListPara">
                                    <p>Here you see what diabetes is, how it comes to
                                    diabetes and why a good treatment is so crucial.</p>
                                </Grid>
                                <Grid className="courseListTime">
                                    <Grid><a><img src={require('../../../../assets/images/lectures.svg')} alt="" title="" />3 lectures</a></Grid>
                                    <Grid><a><img src={require('../../../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid>
                                </Grid>
                                <Grid className="courseStar">
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                    <a><img src={require('../../../../assets/images/vote-star-half.svg')} alt="" title="" /></a>
                                    <span>4.5<a>(38)</a></span>
                                </Grid>
                                <Grid className="coursePrice"><label>19 €</label></Grid>
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const {settings} = state.Settings;
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