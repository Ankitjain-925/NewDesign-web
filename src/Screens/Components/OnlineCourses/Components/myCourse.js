import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { connect } from "react-redux";
import { LoginReducerAim } from '../../../Login/actions';
import { Settings } from '../../../Login/setting';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from '../../../actions';
import sitedata from '../../../../sitedata';
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
            MyCourse : [],
            MyCourse1 : [],
            ratings : {},
            selectedCourse : '',
            EditRating : false,
            loaderImage : false,
            successfull : false,
            iserr : false,
            MyRating : [],
            MyCourse2 : [],
            SelectOne : {},
        };
    }

    componentDidMount() {
      this.getMyRating();
    }

    //For the Star Rating
    ratingChange=(value)=>{
        const state = this.state.ratings;
        state['rating'] = value;
        this.setState({ratings: state})
    }

    //Manage the state Rating 
    ManageRating = (e) =>{
        const state = this.state.ratings;
        state[e.target.name] = e.target.value;
        this.setState({ratings: state})
    }

    //Go to the view Courses
    viewCourses=(item)=>{
        this.props.history.push({
            pathname: `/${this.props.stateLoginValueAim.user.type}/view-course`,
            state : item
        });
    }

    //Get My ratings
    getMyRating = ()=>{
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({loaderImage: true})
        axios.get(sitedata.data.path + '/lms/myRating', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data && res.data.hassuccessed) {
                this.setState({ MyRating: res.data.data },
                  ()=> this.getOrderhistory())
            }
        }).catch(err => { })
    }

    //Get My courses
    getOrderhistory = () => {
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({loaderImage: true})
        axios.post(sitedata.data.path + '/lms/getOrderHistory',{
            user_id: this.props.stateLoginValueAim.user._id
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data && res.data.hassuccessed) {
                var Course = [];
                res.data.data && res.data.data.length>0 && res.data.data.map((item)=>{
                    item.orderlist && item.orderlist.length>0 && item.orderlist.map((item2)=>{
                        Course.push(item2) 
                    })
                })
                this.setState({ MyCourse2: Course, loaderImage: false },
                   ()=> this.IncludeRating())
            }
        }).catch(err => { })
    }

    //Including the rating on the My courses
    IncludeRating=()=>{
        var data =[];
        this.state.MyCourse2 && this.state.MyCourse2.length>0 && this.state.MyCourse2.map((item)=>{
            var myFilterData = this.state.MyRating.filter((value) => value.courseID === item.course_id);
            if(myFilterData && myFilterData.length>0 && myFilterData[0] && myFilterData[0].rating)
            {
                 item['rating'] = myFilterData[0].rating;
            }
            data.push(item)
        })
        this.setState({MyCourse1: data, MyCourse : data})
    }
    
    //Send the rating on the course
    SendRating =()=>{
        if(!this.state.ratings.rating)
        {
            this.setState({iserr : true})
        }
        else
        {
            this.setState({iserr : false, loaderImage: true})
            var user_token = this.props.stateLoginValueAim.token;
            axios.post(sitedata.data.path + '/lms/addRating/', {
                courseID: this.state.selectedCourse,
                user_id: this.props.stateLoginValueAim.user._id,
                user_profile_id : this.props.stateLoginValueAim.user.profile_id,
                rating : this.state.ratings.rating,
                short_message : this.state.ratings.short_message,
                addedDate : new Date()
            },{
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data && res.data.hassuccessed) {
                    this.setState({  loaderImage: false, successfull : true })
                    setTimeout(()=>{this.setState({ successfull : false })}, 5000 )
                }
            }).catch(err => { })
        }
    }

    //For getting user rating if user did
    your_rating=(cId)=>{
        var myFilterData = this.state.MyRating.filter((value) => value.courseID === cId);
        if(myFilterData && myFilterData.length>0 && myFilterData[0] && myFilterData[0].rating)
        {
            return myFilterData[0].rating;
        }
        return null;
    }

    //Open your Rating Popup
    YourRatingCheck=()=>{
        var myFilterData = this.state.MyRating.filter((value) => value.courseID === this.state.selectedCourse);
        if(myFilterData && myFilterData.length>0 && myFilterData[0] && myFilterData[0])
        {
            this.setState({ratings : myFilterData[0]});
        }
    }

    //For open to give ratincourseIDg
    handleOpenFancy = (Cid) => {
        var myFilterData = this.state.MyRating.filter((value) => value.courseID === Cid);
        if(myFilterData && myFilterData.length>0 && myFilterData[0] && myFilterData[0])
        {
            this.setState({ratings : myFilterData[0], EditRating : true});
        }
        else
        {
            this.setState({ratings : {}, EditRating : false});
        }
        this.setState({ openFancy: true, selectedCourse : Cid });
    };
       
    //
    handleCloseFancy = () => {
        this.setState({ openFancy: false });
    };

    //on getting filter and filter Accordingly
    componentDidUpdate = (prevProps) => {
        if (prevProps.SelectedLanguage !== this.props.SelectedLanguage || prevProps.SelectedTopic !== this.props.SelectedTopic) {
            if(this.props.SelectedLanguage.value === 'All' && this.props.SelectedTopic.value === 'All')
            {
                this.setState({MyCourse : this.state.MyCourse1})
            }
            else if(this.props.SelectedLanguage.value === 'All' && this.props.SelectedTopic.value !== 'All')
            {
                var myFilterData = this.state.MyCourse1.filter((value) => value.topic.includes(this.props.SelectedTopic.value));
                this.setState({MyCourse : myFilterData})    
            }
            else if(this.props.SelectedLanguage.value !== 'All' && this.props.SelectedTopic.value === 'All')
            { 
                var myFilterData = this.state.MyCourse1.filter((value) => value.language === this.props.SelectedLanguage.value);
                this.setState({MyCourse : myFilterData})
            }
            else
            {  
                var myFilterData = this.state.MyCourse1.filter((value) => value.topic.includes(this.props.SelectedTopic.value) && value.language === this.props.SelectedLanguage.value)
                this.setState({MyCourse : myFilterData })   
            }
        }
        if(prevProps.AllCart !== this.props.AllCart)
        {
            this.getOrderhistory();
        }
    }


    render() {
        const { value } = this.state;
        const { selectedOption } = this.state;
        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid className="nwCoursName">
                    <h3>My Courses</h3>
                </Grid>
                <Grid container direction="row" spacing={3} className="newCourseCntnt">
                {this.state.MyCourse && this.state.MyCourse.length>0 && this.state.MyCourse.map((item, index)=>(
                    <Grid item xs={12} md={4}>
                        <Grid className="courseList">
                            <Grid className="courseListLbl"><label>{item.courseTitle}</label></Grid>
                            <Grid className="courseListInr">
                                <Grid className="courseListPara">
                                    <p>{item.courseDesc}</p>
                                </Grid>
                                <Grid className="courseListTime">
                                    <Grid><a><img src={require('../../../../assets/images/lectures.svg')} alt="" title="" />{item.attachment && item.attachment.length} lectures</a></Grid>
                                    {/* <Grid><a><img src={require('../../../../assets/images/time.svg')} alt="" title="" />1.5 h</a></Grid> */}
                                </Grid>
                                <Grid className="courseStar">
                                    <Rating size="20" rating={item.rating} />
                                        {/* <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a> */}
                                    <span onClick={()=> this.handleOpenFancy(item.course_id)}>{item && this.your_rating(item.course_id) ? 'Your rating' : 'Leave a rating'}</span> 
                                </Grid>
                                <Grid className="strtLrn"><label onClick={()=>this.viewCourses(item)}>{item && this.your_rating(item.course_id) ? 'Continue watching' : 'Start learning'}</label></Grid>
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
                                    diabetes and why a good treatment is so crucial.
                                                </p>
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
                                    <span onClick={this.handleOpenFancy}>Your rating</span>
                                </Grid>
                                <Grid className="strtLrn"><label>Continue watching</label></Grid>
                            </Grid>
                        </Grid>
                    </Grid> */}

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
                                            <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                        </a>
                                    </div>
                                    <div><label>Rate this course</label></div>
                                    <p>If you have specific comments about the course, please let us know by filling out the form.</p>
                                </div>
                                {this.state.successfull && <div className="success_message">Rating is sent successfully</div>}
                                {this.state.iserr && <div className="err_message">Please give the rate</div>}
                                <div className="rateStars">
                                    {this.state.ratings.rating >0 && this.state.ratings.rating <2 &&  <p>Poor</p>}
                                    {this.state.ratings.rating >=2 && this.state.ratings.rating <3 &&  <p>Fair</p>}
                                    {this.state.ratings.rating >=3 && this.state.ratings.rating <4 &&  <p>Good</p>}
                                    {this.state.ratings.rating >=4 && this.state.ratings.rating <5 &&  <p>Very Good</p>}
                                    {this.state.ratings.rating ==5 && <p>Excellent</p>}
                                    <div><Rating size="50" rating={this.state.ratings && this.state.ratings.rating && this.state.ratings.rating} ratingChange={this.ratingChange} /></div>

                                    
                                        {/* <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-filled.svg')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/vote-star-empty.svg')} alt="" title="" /></a> */}
                                   
                                </div>
                                <div className="shrtMsg">
                                    <div><label>Short message</label></div>
                                    <div><textarea name="short_message" value={this.state.ratings.short_message} onChange={this.ManageRating}></textarea></div>
                                    {this.state.EditRating ? <div><input type="submit" onClick={this.handleCloseFancy} value="Ok and Close" /></div> : <div><input type="submit" onClick={this.SendRating} value="Save and continue" /></div>}
                                </div>
                            </div>
                        </Modal>
                    </div>
                    {/* End of Model setup */}
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