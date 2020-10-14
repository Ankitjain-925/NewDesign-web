import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from '../../actions';
import { LoginReducerAim } from '../../Login/actions';
import { Settings } from '../../Login/setting';
import { Redirect, Route } from 'react-router-dom';
import Loader from '../../Components/Loader/index';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/PatientLeftMenu/mobile';
import ViewCourse from './../../Components/OnlineCourses/Components/ListandViewCourse';

class Index extends Component {
    constructor(props) {
       super(props);
        this.state = {
           Course: {}
        };
    }

    componentDidMount()
    {
        if(this.props.location && this.props.location.state !== 'undefined' && this.props.location.state && this.props.location.state.course_id)
        {
            this.setState({Course : this.props.location.state})
        }   
        else
        {
            this.props.history.push(`/${this.props.stateLoginValueAim.user.type}/online-course`);
        }
    }

    render() {
        const { specialistOption } = this.state;
        const { stateLoginValueAim } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined') {
            return (<Redirect to={'/'} />);
            }            

        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                <LeftMenu  isNotShow ={true} currentPage ="more"/>
                                <LeftMenuMobile isNotShow ={true}  currentPage ="more"/>
                                
                                {/* End of Website Menu */}
                                <Grid item xs={12} md={11}>
                                    <ViewCourse Course={this.state.Course}/>
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