import React, { Component } from "react";
import reorder, { reorderQuoteMap } from "./reorder";
import Grid from '@material-ui/core/Grid';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { slide as Menu } from "react-burger-menu";
import { withRouter } from "react-router-dom";
import { Redirect, Route } from 'react-router-dom';
import { authy } from 'Screens/Login/authy.js';
import { connect } from "react-redux";
import { LanguageFetchReducer } from 'Screens/actions';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { commonHeader } from "component/CommonHeader/index";
import { houseSelect } from "../../Institutes/selecthouseaction";
import { authorQuoteMap } from "./data";
import Drags from "./drags.js";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';



const options = [
  { value: 'data1', label: 'Data1' },
  { value: 'data2', label: 'Data2' },
  { value: 'data3', label: 'Data3' },
];

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.initial,
      ordered: ['step2', 'step1', 'step3'],
      selectedOption: null,
      view: 'vertical',
      value: 0,
      selectedward: false,
      selectedSpeciality : {},
      allSpecialty: []
    };
  }
  static defaultProps = {
    isCombineEnabled: false
  };
  boardRef;

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  componentDidMount=()=>{
    if(this.props.history?.location?.state?.selectedward){
      this.setState({allSpecialty : this.props.history?.location?.state?.data, 
        selectedward: this.props.history?.location?.state?.selectedward, 
        selectedSpeciality: this.props.history?.location?.state?.selectedspec},
        ()=>{
          this.state.selectedSpeciality?.wards?.length>0 && this.state.selectedSpeciality.wards.map((item, index)=>{
            if(item.ward_name === this.props.history?.location?.state?.selectedward){
                this.setState({value: index})
            }
          })
        })
    }
    else{
      this.props.history.push('/virtualHospital/space')
    }
  }

  moveAnotherSpeciality = (data)=>{
    console.log('I am here', data)
    this.setState({selectedSpeciality: data, selectedward: data.wards?.length>0 ? data.wards[0]?.ward_name: false, value: 0})
  }
  
  onDragEnd = result => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }

      const column = this.state.columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const columns = {
        ...this.state.columns,
        [result.source.droppableId]: withQuoteRemoved
      };
      this.setState({ columns });
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const ordered = reorder(
        this.state.ordered,
        source.index,
        destination.index
      );

      this.setState({
        ordered
      });

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: this.state.columns,
      source,
      destination
    });

    this.setState({
      columns: data.quoteMap
    });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption } = this.state;
    const { value } = this.state;
    return (
      <Grid className="homeBg">
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}> 
              <LeftMenuMobile isNotShow={true} currentPage="chat" />
              <Grid container direction="row">
                
                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="chat" />
                </Grid>
                {/* End of Menu */}
                {/* Start of Right Section */}                
                <Grid item xs={11} md={11}>
                  <Grid className="cmnLftSpc ptntFlowSpc">
                    <Grid className="addFlow">
                      <Grid container direction="row" justify="center">
                        <Grid item xs={12} sm={6} md={6}><h1>Space Management</h1></Grid>
                        <Grid item xs={12} sm={6} md={6} className="addFlowRght"><a>+ Add patient</a></Grid>
                      </Grid>
                    </Grid>

                    {/* Start of Bread Crumb */}
                    <Grid className="breadCrumbUpr">
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={9}>
                          <Grid className="roomBreadCrumb">
                            <ul>
                              <li><a><span>Institution</span><label>{this.props?.House?.label}</label></a></li>
                              <li><a><span>Speciality</span><label>{this.state.selectedSpeciality?.specialty_name}</label></a></li>
                              <li><a><span>Ward</span><label>{this.state?.selectedward}</label></a></li>
                            </ul>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Grid className="settingInfo">
                            <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                            <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* End of Bread Crumb */}
                    <Grid className="wardsGrupUpr">
                      <Grid className="cardioGrup">
                        <Grid className="cardioGrupBtn">
                          {this.state.allSpecialty?.length>0 && this.state.allSpecialty.map((item)=>(
                            <Button onClick={()=> {this.moveAnotherSpeciality(item)}} variant="contained" className={this.state.selectedSpeciality?.specialty_name === item.specialty_name?
                               "cardioActv" : ""}>{item.specialty_name}</Button>
                          ))}
                    
                        </Grid>
                        <Grid className="cardioTabUpr">
                          <AppBar position="static" className="cardioTabs">
                            <Tabs value={value} onChange={this.handleChangeTab}>
                              {this.state.selectedSpeciality?.wards?.length>0 && this.state.selectedSpeciality?.wards.map((items)=>(
                                <Tab label={items.ward_name} className="cardiotabIner" />
                              ))}
                              
                              {/* <Tab label="Childrens Ward" className="cardiotabIner" /> */}
                            </Tabs>
                          </AppBar>
                        </Grid>
                      </Grid>



                      <Drags initial={authorQuoteMap} view={this.state.view} />
                    </Grid>
                  </Grid>
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
  const { House } = state.houseSelect
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
    //   Doctorsetget,
    //   catfil
  }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect })(Index));