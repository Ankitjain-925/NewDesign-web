import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from '../../actions';
import { LoginReducerAim } from '../../Login/actions';
import { Settings } from '../../Login/setting';
import { Redirect, Route } from 'react-router-dom';
import Loader from '../../Components/Loader/index';
import LeftMenuMobile from './../../Components/Menus/PharmaLeftMenu/mobile';
import LeftMenu from './../../Components/Menus/PharmaLeftMenu/index';
import CourseSection from './../../Components/OnlineCourses/index.js';

class Index extends Component {
    constructor(props) {
       super(props);
        this.state = {
            addSec: false,
            specialistOption: null,
            successfullsent: false,
            Pdoctors: [],
            error: false,
            docProfile: false,
            loaderImage: false,
            selectedPdoc : {},
            share_to_doctor : false,
            AddSecond: {},
            err_pdf : false,
            personalinfo : {},
            found: false,
            newItemp : {},
        };
    }

    componentDidMount(){

    }

    render() {
        const { specialistOption } = this.state;
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'pharmacy' ) {
            return (<Redirect to={'/'} />);
        } 
        return (
            <Grid className="homeBg">
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                <LeftMenu  isNotShow ={true} currentPage ="course"/>
                                <LeftMenuMobile isNotShow ={true}  currentPage ="course"/>
                                {/* End of Website Menu */}
                                <Grid item xs={12} md={11}>
                                    <CourseSection />
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