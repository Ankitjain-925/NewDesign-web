import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import { LanguageFetchReducer } from "Screens/actions";
import SelectField from "Screens/Components/Select/index";
import Button from "@material-ui/core/Button";
import { Settings } from 'Screens/Login/setting';
import {
  getLanguage
} from "translations/index"
import { S3Image } from "Screens/Components/GetS3Images/index";
import Assigned from "Screens/Components/VirtualHospitalComponents/Assigned/index"

class PointPain extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: this.props.data,
    };
  }

  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data, });
    }
  };

  componentDidMount = () => {};
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      
    } = translate;
    var data = this.state.data;
    return (
        <Grid className="allTabCntnt">
        <Grid container direction="row" alignItems="center">
            <Grid item xs={12} sm={8} md={6}>
                <Grid className="revwFiles">
                    <Grid><img src={require('assets/virtual_images/greyImg.jpg')} alt="" title="" /></Grid>
                    <Grid className="revwFilesRght cardioColor">
                        <Grid><Button>{data?.specialty?.specialty_name}</Button></Grid>
                        <Grid><label>{data.task_name}</label></Grid>
                    </Grid>
                </Grid>
                <Grid className="allInfo tasklistName">
                    <Grid><S3Image imgUrl={data?.patient?.image} /></Grid>
                    {/* <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid> */}
                    <Grid className="allInfoRght">
                        <Grid><label>{data?.patient?.first_name} {data?.patient?.last_name}</label></Grid>
                        <p>{data?.patient?.profile_id}</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <Grid className="attchNoteMain">
                    <Grid className="attchNoteUpr">
                        <Grid className="attchNote">
                            <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                            <label>{data?.comments?.length}</label>
                        </Grid>
                        <Grid className="attchNote attchImg">
                            <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                            <label>{data?.attachments?.length}</label>
                        </Grid>
                    </Grid>
                    <Grid className="attchOpen">
                        <Button><label></label>{data.status}</Button>
                    </Grid>
                    <Assigned assigned_to ={data.assigned_to}/>
                    {/* <Grid className="userPics">
                        <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                        <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                        <Link><span>+1</span></Link>
                    </Grid> */}
                    {/* <Grid className="userDots"> */}
                    {/* <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button> */}
                    <Grid item xs={6} md={6} className="spcMgntRght7 presEditDot scndOptionIner">
                        <a className="openScndhrf">
                            <img
                                src={require("assets/images/three_dots_t.png")}
                                alt=""
                                title=""
                                className="openScnd specialuty-more"
                            />
                            <ul>
                                <li>
                                    <a
                                        onClick={() => {
                                            this.editTask(data);
                                        }}
                                    >
                                        <img
                                            src={require("assets/images/details.svg")}
                                            alt=""
                                            title=""
                                        />
                                        Edit Task
                                    </a>
                                </li>
        
                                <li
                                    onClick={() => {
                                        this.removeTask(data._id);
                                    }}
                                >
                                    <a>
                                        <img
                                            src={require("assets/images/cancel-request.svg")}
                                            alt=""
                                            title=""
                                        />
                                        Delete Task
                                    </a>
                                </li>
                            </ul>
                        </a>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    settings,
  };
};
export default pure(
  withRouter(connect(mapStateToProps, { LanguageFetchReducer, Settings })(PointPain))
);
