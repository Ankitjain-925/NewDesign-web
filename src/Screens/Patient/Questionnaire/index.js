import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';
import { Redirect, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import { Settings } from "Screens/Login/setting";
import { authy } from "Screens/Login/authy.js";
import axios from "axios";
import sitedata from "sitedata";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import {
    commonHeader,
    commonCometDelHeader,
} from "component/CommonHeader/index";


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            AllQuestions: {}
        };
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };


    handleSubmit =(data) => {
        console.log("data666",data)
        let AllQuestions = [...this.state.AllQuestions];
         AllQuestions.push({
            options: this.state.AllQuestions.options,
        
        });
    this.setState({
        AllQuestions
        
    });
    
    };


    componentDidMount() {
        this.getQuestionnaire();
    }

    //Get Questionnaire

    getQuestionnaire = () => {
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/questionaire/GetQuestionaire/60fabfe5b3394533f7f9a6dc-1629196687215",
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                if (response.data.hassuccessed) {
                    this.setState({ AllQuestions: response.data.data });
                    console.log("Questionnaire", this.state.AllQuestions)
                }
                this.setState({ loaderImage: false });
            });
    }
    render() {
        const { selectedOption } = this.state;
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (
          stateLoginValueAim.user === "undefined" ||
          stateLoginValueAim.token === 450 ||
          stateLoginValueAim.token === "undefined" ||
          stateLoginValueAim.user.type !== "patient" ||
          !this.props.verifyCode ||
          !this.props.verifyCode.code
        ) {
          return <Redirect to={"/"} />;
        }
        return (
            <Grid
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark"
                ? "homeBg homeBgDrk"
                : "homeBg"
            }
          >
            {/* {this.state.loaderImage && <Loader />} */}
            <Grid className="homeBgIner">
              <Grid container direction="row" justify="center">
                <Grid item xs={12} md={12}>
                    <Grid container direction="row">
                      {/* Website Menu */}
                      <LeftMenu isNotShow={true} currentPage="journal" />
                      <LeftMenuMobile isNotShow={true} currentPage="journal" />
    
                      {/* End of Website Menu */}
    
                      {/* Website Mid Content */}
                      <Grid item xs={12} md={8}>
                    {this.state.AllQuestions?.length > 0 && this.state.AllQuestions.map((data1) => (
                        data1.questions.map((data) => (
                            console.log("data", data),

                            <>
                                {data.type === "classic" ?

                                    <Grid className="QuesMrktUpr">
                                        {console.log("data1", data.type)}
                                        <Grid container direction="row">
                                            <Grid item xs={12} md={12}>
                                                <Grid className="QuesMrkt">
                                                    <h1>{data?.question}</h1>
                                                </Grid>
                                            </Grid>


                                            <Grid item xs={12} md={12}>
                                                <Grid className="onlineBox">
                                                    {data?.options.map((data2) => (
                                                        <>    
                                                          <Grid><FormControlLabel control={<Checkbox name="checkedA" color="primary" />} />{data2}</Grid>   </>))}
                                                    {/* <Grid><FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="asdasdasd" /></Grid>
                                                            <Grid><FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="asdasdasdsad" /></Grid>
                                                            <Grid><FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="asdasd" /></Grid> */}
                                                    {data?.other === true &&
                                                        <Grid className="otherBrdrUpr">
                                                            <FormControlLabel control={<Checkbox name="checkedC" color="primary" />} label="Other" />
                                                            <Grid className="otherBorder"></Grid>
                                                        </Grid>
                                                    }
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Grid className="asnswerSbmt"><Button  onClick={(e) => this.handleSubmit(data)}>Submit Answer</Button></Grid>
                                           { console.log('data',data)}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid className="QuesMrktUpr">
                                        {console.log("data2", data.type)}
                                        <Grid container direction="row">
                                            <Grid item xs={12} md={12}>
                                                <Grid className="QuesMrkt">
                                                    {/* <Grid><a><img src={require('../../assets/images/germanMedical.png')} alt="" title="" /></a></Grid> */}
                                                    {/* <Grid><a><img src={require('../../assets/images/closefancy.png')} alt="" title="" /></a></Grid> */}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <h1>{data.question}</h1>
                                               <p>{data.description}</p>
                                               
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid className="rateExp">
                                                    <h3>How would you rate your experience with us?</h3>
                                                    <Grid>
                                                        <ul>
                                                            <li><a>1</a></li>
                                                            <li><a>2</a></li>
                                                            <li><a>3</a></li>
                                                            <li><a>4</a></li>
                                                            <li><a>5</a></li>
                                                            <li><a>6</a></li>
                                                            <li><a>7</a></li>
                                                            <li><a>8</a></li>
                                                            <li><a>9</a></li>
                                                            <li><a>10</a></li>
                                                        </ul>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid className="asnswerSbmt"><Button>Submit Feedback</Button></Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>}
                            </>
                        )

                        )
                    ))}</Grid>    </Grid>

                </Grid>
            </Grid>
            </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
        state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    // const { House } = state.houseSelect
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    // const { speciality } = state.Speciality;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        // House,
        settings,
        verifyCode,
        // speciality
    };
};

export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy })(
        Index
    )
);