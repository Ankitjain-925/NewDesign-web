import React, { Component } from "react";
import reorder, { reorderQuoteMap } from "./reorder";
import Grid from '@material-ui/core/Grid';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { slide as Menu } from "react-burger-menu";
import Input from '@material-ui/core/Input';
import Select from 'react-select';
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
      value: 0
    };
  }
  static defaultProps = {
    isCombineEnabled: false
  };
  boardRef;

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

              {/* Mobile menu */}
              <Grid className="MenuMob">
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={6} md={6} sm={6} className="MenuMobLeft">
                    <a><img src={require('assets/virtual_images/navigation-drawer.svg')} alt="" title="" className="MenuImg" /></a>
                    <Menu className="addCstmMenu">
                      <Grid className="menuItems">
                        <ul>
                          <li><a className="menuActv"><img src={require('assets/virtual_images/barMenu.png')} alt="" title="" /></a></li>
                          <li><a><img src={require('assets/virtual_images/calender.png')} alt="" title="" /></a></li>
                          <li><a><img src={require('assets/virtual_images/rightpng.png')} alt="" title="" /></a></li>
                          <li><a><img src={require('assets/virtual_images/bed.png')} alt="" title="" /></a></li>
                          <li><a className="moreMenu"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a></li>
                          <li><a className="profilMenu" href=""><img src={require('assets/virtual_images/nav-my-profile.svg')} alt="" title="" /></a></li>
                        </ul>
                      </Grid>
                    </Menu>
                  </Grid>
                  <Grid item xs={6} md={6} sm={6} className="MenuMobRght">
                    <a href=""><img src={require('assets/virtual_images/logo_new.png')} alt="" title="" /></a>
                  </Grid>
                </Grid>
              </Grid>
              {/* End of mobile menu */}

              <Grid container direction="row" justify="center">
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <Grid className="MenuWeb">
                    <Grid className="webLogo">
                      <a href=""><img src={require('assets/virtual_images/logo_new.png')} alt="" title="" /></a>
                    </Grid>
                    <Grid className="menuItems">
                      <ul>
                        <li><a className="menuActv"><img src={require('assets/virtual_images/barMenu.png')} alt="" title="" /></a></li>
                        <li><a><img src={require('assets/virtual_images/calender.png')} alt="" title="" /></a></li>
                        <li><a><img src={require('assets/virtual_images/rightpng.png')} alt="" title="" /></a></li>
                        <li><a><img src={require('assets/virtual_images/bed.png')} alt="" title="" /></a></li>
                        <li><a className="moreMenu"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a></li>
                        <li>
                          <a className="profilMenu" href="">
                            <img src={require('assets/virtual_images/nav-my-profile.svg')} alt="" title="" />
                          </a>
                        </li>
                      </ul>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Website Menu */}
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
                              <li><a><span>Institution</span><label>German Medical Center FZ-LLC</label></a></li>
                              <li><a><span>Speciality</span><label>Neurology</label></a></li>
                              <li><a><span>Ward</span><label>Adults Ward</label></a></li>
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
                          <Button variant="contained">Cardiology</Button>
                          <Button variant="contained">Radiology</Button>
                          <Button variant="contained" className="cardioActv">Neurology</Button>
                          <Button variant="contained">Oncology</Button>
                        </Grid>
                        <Grid className="cardioTabUpr">
                          <AppBar position="static" className="cardioTabs">
                            <Tabs value={value} onChange={this.handleChangeTab}>
                              <Tab label="Adults Ward" className="cardiotabIner" />
                              <Tab label="Childrens Ward" className="cardiotabIner" />
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

export default Index;