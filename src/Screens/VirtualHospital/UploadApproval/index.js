import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "../Institutes/selecthouseaction";
import Loader from "Screens/Components/Loader/index";
import TaskSectiuonVH from "Screens/Components/VirtualHospitalComponents/TaskSectionVH";
import { Speciality } from "Screens/Login/speciality.js";
import { Redirect, Route } from "react-router-dom";
import { getLanguage } from "translations/index";
import FileUploader from "Screens/Components/FileUploader/index";
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
            needUpload : false
        };
    }

  
    componentDidMount() {
        if (this.props.history.location?.state?.data) {
            this.setState({ needUpload: this.props.history.location?.state?.needUpload })
        }
    }

    handleTaskSubmit = () => {
       
        
        this.setState({ errorMsg: "" })
    
        var data = this.state.newTask;
          if (this.state.fileupods) {
            data.attachments = this.state.fileattach;
          }
          this.setState({ loaderImage: true });
      };

    render() {
        const { stateLoginValueAim, House } = this.props;
        // if (
        //   stateLoginValueAim.user === "undefined" ||
        //   stateLoginValueAim.token === 450 ||
        //   stateLoginValueAim.token === "undefined" ||
        //   stateLoginValueAim.user.type !== "adminstaff"
        // ) {
        //   return <Redirect to={"/"} />;
        // }
        // if (House && House?.value === null) {
        //     return <Redirect to={"/VirtualHospital/space"} />;
        //   }
        let translate = getLanguage(this.props.stateLanguageType);
        let { Tasks_overview, ShowArchivedTasks ,Open ,Donetoday } = translate;
        return (
            <Grid className={
                this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "homeBg darkTheme"
                    : "homeBg"
            }>
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            <LeftMenuMobile isNotShow={true} currentPage="task" />
                            <Grid container direction="row">
                                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}

                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="task" />
                                </Grid>
                                {/* End of Menu */}
                                {/* Start of Right Section */}
                                <Grid item xs={12} md={11}>
                                <Grid container direction="row" justifyContent="center" >
                                <Grid item xs={11} md={10}>
                                    <Grid className='headercont headercontSec'>
                                    {this.state.needUpload &&  
                                    <Grid className="profileInfoSection">  
                                       
                                        <h1>Upload Approval document of patient to the hospital</h1>
                                        <Grid item xs={12} md={8}>
                                            <Grid className="headerCountTxt">

                                                <label>Attachments</label>
                                                <FileUploader
                                                    // cur_one={this.props.cur_one}
                                                    attachfile={
                                                        this.state.newTask &&
                                                            this.state.newTask.attachments
                                                            ? this.state.newTask.attachments
                                                            : []
                                                    }
                                                    name="UploadTrackImageMulti"
                                                    isMulti="true"
                                                    fileUpload={(event) => {
                                                        this.FileAttachMulti(event);
                                                    }}
                                                />


                                            </Grid>
                                        </Grid>
                                    </Grid>}

                                    <Grid className="profileInfoSection">  
                                       
                                       <h1>Select Step of Patient flow and Add case number of Patient</h1>
                                       <Grid item xs={12} md={8}>
                                           <Grid className="headerCountTxt">

                                               <label>Working</label>
                                               


                                           </Grid>
                                       </Grid>
                                   </Grid>

                                        <Grid container direction="row" justifyContent="center" >
                                            <Grid item xs={12} md={8} lg={8}>
                                                <Grid className="aaa">


                                                    <Grid className="headerCountTxt infoSubInpSection">
                                                        <input
                                                            type="submit"
                                                            onClick={()=>this.handleTaskSubmit()}
                                                            value={"Submit"}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>




                                </Grid>
                            </Grid>

                                </Grid>
                                                                {/* End of Right Section */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
        state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { House } = state.houseSelect
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    const { speciality } = state.Speciality;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        House,
        settings,
        verifyCode,
        speciality
    };
};
export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect, Speciality })(
        Index
    )
);