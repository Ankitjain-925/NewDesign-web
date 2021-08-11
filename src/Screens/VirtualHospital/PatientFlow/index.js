import React, { Component } from "react";
import reorder, { reorderQuoteMap } from "./reorder";
import Grid from "@material-ui/core/Grid";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { slide as Menu } from "react-burger-menu";
import Input from "@material-ui/core/Input";
import Select from "react-select";
import { authorQuoteMap } from "./data";
import Drags from "./drags.js";
import { withRouter } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { commonHeader } from "component/CommonHeader/index";
import { houseSelect } from "../Institutes/selecthouseaction";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";

const options = [
  { value: "data1", label: "Data1" },
  { value: "data2", label: "Data2" },
  { value: "data3", label: "Data3" },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.initial,
      ordered: ["step2", "step1", "step3"],
      selectedOption: null,
      view: "vertical",
    };
  }
  static defaultProps = {
    isCombineEnabled: false,
  };
  boardRef;

  onDragEnd = (result) => {
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
        [result.source.droppableId]: withQuoteRemoved,
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
        ordered,
      });

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: this.state.columns,
      source,
      destination,
    });

    this.setState({
      columns: data.quoteMap,
    });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption } = this.state;
    return (
      <Grid  className={
        this.props.settings &&
        this.props.settings.setting &&
        this.props.settings.setting.mode &&
        this.props.settings.setting.mode === "dark"
          ? "homeBg darkTheme"
          : "homeBg"
      }
      >
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
            <LeftMenuMobile isNotShow={true} currentPage="flow" />
              <Grid container direction="row">
                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="flow" />
                </Grid>
                {/* End of Menu */}
                <Grid item xs={11} md={11}>
                  <Grid className="cmnLftSpc ptntFlowSpc">
                    <Grid className="addFlow">
                      <Grid container direction="row" justify="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <h1>Patient Flow</h1>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          className="addFlowRght"
                        >
                          <a>+ Add patient</a>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="srchPatient">
                      <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={5} className="srchLft">
                          <Input placeholder="Search by Patient ID, Patient name, Doctor..." />
                          <a>
                            <img
                              src={require("assets/virtual_images/InputField.svg")}
                              alt=""
                              title=""
                            />
                          </a>
                        </Grid>
                        <Grid item xs={12} md={7}>
                          <Grid className="srchRght">
                            <a className="srchSort">
                              <img
                                src={require("assets/virtual_images/sort.png")}
                                alt=""
                                title=""
                              />
                            </a>
                            <Select
                              value={selectedOption}
                              onChange={this.handleChange}
                              options={options}
                              placeholder="All Specialities"
                              className="allSpec"
                              isSearchable={false}
                            />
                            <a
                              className="lineSort"
                              onClick={() => {
                                this.setState({ view: "vertical" });
                              }}
                            >
                              <img
                                src={require("assets/virtual_images/lines.png")}
                                alt=""
                                title=""
                              />
                            </a>
                            <a
                              className="horzSort"
                              onClick={() => {
                                this.setState({ view: "horizontal" });
                              }}
                            >
                              <img
                                src={require("assets/virtual_images/timeline-view-active.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                          </Grid>
                        </Grid>
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
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
  })(Index)
);
