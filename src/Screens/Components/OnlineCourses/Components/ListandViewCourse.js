import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { LoginReducerAim } from '../../../Login/actions';
import { Settings } from '../../../Login/setting';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from '../../../actions';
import Iframeview from '../../FrameUse/index';
import { ConsoleCustom } from '../../BasicMethod/index';
import axios from 'axios';
import sitedata from './../../../../sitedata';

class Index extends Component {
    constructor(props) {
       super(props);
        this.state = {
            addSecond: false,
            CurrentIndex: 0,
            Course : this.props.Course,
            NextButton : 0,
            CurrentAttach : {},
        };
    }

    //on Change Course
    componentDidUpdate = (prevProps) => {
        if(prevProps.Course !== this.props.Course)
        {
            var NextButton = this.props.Course && this.props.Course.attachment && this.props.Course.attachment.length>0 ? (this.props.Course.attachment.length-1) : 0;
            this.setState({Course : this.props.Course, NextButton: NextButton },
                ()=>this.ChangeIndex(0))
            
        }
    }
    //Back Button to go Online Courses
    BackButton =()=>{
        this.props.history.push(`/${this.props.stateLoginValueAim.user.type}/online-course`);
    }

    //For change the Index
    ChangeIndex = (index)=>{
        this.setState({CurrentIndex : index, CurrentAttach : this.state.Course.attachment[index]},
        ()=>{
            var find = this.state.CurrentAttach.filename;
            var find1 = find.split('.com/')[1]
            axios.get(sitedata.data.path + '/aws/sign_s3?find='+find1,)
            .then((response) => {
                if(response.data.hassuccessed) { 
                   var state = this.state.CurrentAttach
                   state['new_image'] = response.data.data;
                   state['type'] = (this.state.CurrentAttach.filename.split("&bucket=")[0]).split('.').pop();
                   this.setState({CurrentAttach : state})
                }
            })
        })
    }

    render() {
        return (
            <Grid className="courseCntent">
                <Grid container direction="row">
                    <Grid item xs={12} md={3} className="myCoursesOnline">
                        <Grid className="myCoursesBck"><p><a><img onClick={this.BackButton} src={require('../../../../assets/images/ar1.png')} alt="" title="" />My Courses</a></p></Grid>
                        <Grid className="whtDiabts"><h3>{this.state.Course.courseTitle}</h3></Grid>
                        <Grid className="videoTitle">
                            <ul>
                            {this.state.Course && this.state.Course.attachment && this.state.Course.attachment.length>0 && this.state.Course.attachment.map((items, index)=>(
                                <li onClick={()=>{this.ChangeIndex(index)}}>
                                    <a>
                                        <label>{items.title}</label>
                                        {/* <span>23 min</span> */}
                                    </a>
                                </li>
                            ))}
                                {/* <li>
                                    <a>
                                        <label>Second video lesson title</label>
                                        <span>37 min</span>
                                    </a>
                                </li> */}
                            </ul>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid className="lessonTitle">
                            <h4>{this.state.CurrentAttach && this.state.CurrentAttach.title}</h4>
                            <Grid className="lessonTitleVdo">
                                {/* <img src={require('../../../../assets/images/vdo.jpg')} alt="" title="" /> */}
                                <Iframeview new_image={this.state.CurrentAttach.new_image} type={this.state.CurrentAttach.type} comesFrom="LMS"/>
                            </Grid>
                            
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={6} md={6} className="prevLesson">
                                    {this.state.CurrentIndex > 0 &&<a onClick={()=>this.ChangeIndex(this.state.CurrentIndex-1)}>Previous lesson</a>}
                                </Grid>
                                <Grid item xs={6} md={6} className="nxtLesson">
                                    {this.state.CurrentIndex < this.state.NextButton && <a onClick={()=>this.ChangeIndex(this.state.CurrentIndex+1)}>Next lesson</a>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

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