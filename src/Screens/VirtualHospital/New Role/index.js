import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/VirtualHospitalMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/VirtualHospitalMenu/mobile';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ColorSelection from 'Screens/Components/VirtualHospitalComponents/ColorSelection/index';
import VHfield from 'Screens/Components/VirtualHospitalComponents/VHfield/index';
import AddRoom from 'Screens/Components/VirtualHospitalComponents/AddRoom/index';
import RoomView from 'Screens/Components/VirtualHospitalComponents/RoomView/index';
import Loader from 'Screens/Components/Loader/index';
import { confirmAlert } from 'react-confirm-alert';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { authy } from 'Screens/Login/authy.js';
import { connect } from 'react-redux';
import { LanguageFetchReducer } from 'Screens/actions';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { houseSelect } from '../Institutes/selecthouseaction';
import { Speciality } from 'Screens/Login/speciality.js';
import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import Collapsible from 'react-collapsible';
import SpecialityButton from 'Screens/Components/VirtualHospitalComponents/SpecialityButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AvailablebedListing from "Screens/Components/VirtualHospitalComponents/AvailablebedListing"
import { getLanguage } from "translations/index"
import Select from "react-select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderImage: false,
            openSpecl: false,
            openSpecl2: false,
            openSpecl3: false,
            openWard: false,
            openRoom: false,
            specialityColor: false,
            openSpecl4: false,
            speciality: {},
            ward: {},
            specialityData: [],
            specialityData2: [],
            isEditWrd: false,
            deleteId: false,
            SearchValue: '',
            errorMsg2: '',
            errorMsg: '',
            errorStatus: false,
            openHouse1: this.props.openHouse1,
            weoffer: this.props.data,
            weoffer1: {},
            buttonCall: true,
            heading: this.props.label,
            value1: this.props.value,
            demo: [],
            newTsk: []
        };
    }


    componentDidUpdate = (prevProps) => {
        if (prevProps.openHouse1 !== this.props.openHouse1 || prevProps.weoffer !== this.props.data || prevProps.heading !== this.props.label
            || prevProps.value1 !== this.props.value) {
            this.setState({
                openHouse1: this.props.openHouse1,
                weoffer: this.props.data,
                heading: this.props.label,
                value1: this.props.value
            });
        }
    };
    
    handleOpenSpecl = () => {
        this.setState({ openSpecl: true });
    };
    handleweoffer = (e, index) => {
        var {weoffer}=this.state
        var state = this.state.newTsk
        var data = state ? state : []

        if (e.target.checked) {
            data.push(e.target.value);
            if(data.length==weoffer.length){
            this.handleChange(data)
            }

        }
        else {
            var index = data.indexOf(e.target.value)
            data.splice(index, 1);
        }
    };


    handleChange = (e, values) => {

        var state = this.state.demo
        // var data = state ? state : []
        state[e.target.name]=e.target.value ==true;
        // if (e.target.checked) {
        //     data.push(e.target.value);
        //     console.log("data", data)
        // }
    };

    render() {
        var { openHouse1, weoffer, weoffer1 } = this.state
        return (
            <Grid>
                
                <Grid className="line">
                   
                    <Grid item xs={12} md={12}>
                        <Grid className="newrole">
                            <Grid className="headsize">
                            {weoffer && weoffer.map((item)=>(  
                                <Collapsible
                                    trigger={<><span><Checkbox name={item.label}
                                        value={item.value} checked={this.state.demo.options ==true} onChange={(e) => this.handleChange(e)

                                        } /></span>{item.label} <span className="hosFstSec"><ExpandMoreIcon /></span></>}

                                    triggerWhenOpen={<><span> <Checkbox name={item.label}
                                        value={item.value} checked={this.state.demo.options ==true} onChange={(e) => this.handleChange(e)} />
                                    </span>{item.label} <span className="hosFstSec"><ExpandLessIcon /></span></>}
                                    open="true"
                                >
                                    {
                                          item.data.map((item2, index) => (
                                            <Grid >
                                              
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            key={index}
                                                            name={item2.label}
                                                            value={item2.value}
                                                            // checked={this.state.demo?.includes(item.value)}
                                                            checked={this.state.newTsk.options ? this.state.newTsk.options : null}
                                                            onChange={(e) =>
                                                                this.handleweoffer(e, index)
                                                            }
                                                        />
                                                    }

                                                    label={item2.label}
                                                />
                                            </Grid>
                                        ))
                                    }
                              </Collapsible>
                            ))}
                                  
                </Grid>
             
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
  const { House } = state.houseSelect;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  const { speciality } = state.Speciality;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
    speciality,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
    Speciality,
  })(Index)
);
