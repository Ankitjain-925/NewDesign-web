import React, { Component } from "react";
import reorder, { reorderQuoteMap } from "./reorder";
import Grid from "@material-ui/core/Grid";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { slide as Menu } from "react-burger-menu";
import Input from "@material-ui/core/Input";
import Select from "react-select";
import { authorQuoteMap } from "./data";
import Drags from "./drags.js";

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
      <Grid className="homeBg">
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              {/* Mobile menu */}
              <Grid className="MenuMob">
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={6} md={6} sm={6} className="MenuMobLeft">
                    <a>
                      <img
                        src={require("assets/virtual_images/navigation-drawer.svg")}
                        alt=""
                        title=""
                        className="MenuImg"
                      />
                    </a>
                    <Menu className="addCstmMenu">
                      <Grid className="menuItems">
                        <ul>
                          <li>
                            <a className="menuActv">
                              <img
                                src={require("assets/virtual_images/barMenu.png")}
                                alt=""
                                title=""
                              />
                            </a>
                          </li>
                          <li>
                            <a>
                              <img
                                src={require("assets/virtual_images/calender.png")}
                                alt=""
                                title=""
                              />
                            </a>
                          </li>
                          <li>
                            <a>
                              <img
                                src={require("assets/virtual_images/rightpng.png")}
                                alt=""
                                title=""
                              />
                            </a>
                          </li>
                          <li>
                            <a>
                              <img
                                src={require("assets/virtual_images/bed.png")}
                                alt=""
                                title=""
                              />
                            </a>
                          </li>
                          <li>
                            <a className="moreMenu">
                              <img
                                src={require("assets/virtual_images/nav-more.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                          </li>
                          <li>
                            <a className="profilMenu" href="">
                              <img
                                src={require("assets/virtual_images/nav-my-profile.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                          </li>
                        </ul>
                      </Grid>
                    </Menu>
                  </Grid>
                  <Grid item xs={6} md={6} sm={6} className="MenuMobRght">
                    <a href="">
                      <img
                        src={require("assets/virtual_images/logo_new.png")}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              {/* End of mobile menu */}

              <Grid container direction="row" justify="center">
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <Grid className="MenuWeb">
                    <Grid className="webLogo">
                      <a href="">
                        <img
                          src={require("assets/virtual_images/logo_new.png")}
                          alt=""
                          title=""
                        />
                      </a>
                    </Grid>
                    <Grid className="menuItems">
                      <ul>
                        <li>
                          <a className="menuActv">
                            <img
                              src={require("assets/virtual_images/barMenu.png")}
                              alt=""
                              title=""
                            />
                          </a>
                        </li>
                        <li>
                          <a>
                            <img
                              src={require("assets/virtual_images/calender.png")}
                              alt=""
                              title=""
                            />
                          </a>
                        </li>
                        <li>
                          <a>
                            <img
                              src={require("assets/virtual_images/rightpng.png")}
                              alt=""
                              title=""
                            />
                          </a>
                        </li>
                        <li>
                          <a>
                            <img
                              src={require("assets/virtual_images/bed.png")}
                              alt=""
                              title=""
                            />
                          </a>
                        </li>
                        <li>
                          <a className="moreMenu">
                            <img
                              src={require("assets/virtual_images/nav-more.svg")}
                              alt=""
                              title=""
                            />
                          </a>
                        </li>
                        <li>
                          <a className="profilMenu" href="">
                            <img
                              src={require("assets/virtual_images/nav-my-profile.svg")}
                              alt=""
                              title=""
                            />
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

export default Index;
