 import React, { Component } from "react";
import Select from "react-select";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Grid from "@material-ui/core/Grid";
import NotesEditor from "./../Editor/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { GetShowLabel1 } from "../GetMetaData/index.js";
import {
  getLanguage
} from "translations/index"
import { pure } from "recompose";
class AnamnesisFinding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findingArr: this.props.findingArr || [],
      label: this.props.label,
      gender: this.props.gender,
      name: this.props.name,
      options: this.props.options,
    };
  }

  // On change the Fields of any index
  onFieldChange = (title, i) => {
    let tArray = this.state.findingArr;
    if (tArray && tArray.length == 0) {
      tArray.push({ title: title, notes: "" });
    } else {
      tArray[i]["title"] = title;
    }

    this.setState({ findingArr: tArray });
    this.props.onChange(tArray);
  };
  
  onFieldChangeNote = (notes, i) => {
    let tArray = this.state.findingArr;
    if (tArray && tArray.length == 0) {
      tArray.push({ title: "", notes: notes });
    } else {
      tArray[i]["notes"] = notes;
    }
    this.setState({ findingArr: tArray });
    this.props.onChange(tArray);
  };

  //On delete the time
  deleteField = (index) => {
    let tArray = this.state.findingArr;
    tArray.splice(index, 1);
    this.setState({ findingArr: tArray });
    this.props.onChange(tArray);
  };

  //On add the new Time
  onAddFiled = () => {
    let tArray = this.state.findingArr;
    tArray.push({ title: "", notes: "" });
    this.setState({ findingArr: tArray });
  };

  componentDidMount = () => {};
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { addtextentry, BodySchemeNotes, rmv_entry } = translate;
    return (
      <div>
        <Grid className="rrSysto">
          <Grid>
            <label>{this.state.label}</label>
          </Grid>
          {this.state.findingArr && this.state.findingArr.length == 0 && (
            <Grid>
              <Select
                onChange={(e) => this.onFieldChange(e, 0)}
                options={this.state.options}
                name="title"
                isSearchable={true}
                className="mr_sel"
              />
              <NotesEditor
                name="notes"
                label=""
                onChange={(e) => this.onFieldChangeNote(e, 0)}
              />
              <Grid className="consumeAt">
                <p onClick={this.onAddFiled}>+ {addtextentry}</p>
              </Grid>
            </Grid>
          )}

          {this.state.findingArr &&
            this.state.findingArr.length > 0 &&
            this.state.findingArr.map((itm, index) =>
              index == 0 ? (
                <Grid>
                  <Select
                    onChange={(e) => this.onFieldChange(e, 0)}
                    options={this.state.options}
                    value={GetShowLabel1(
                      this.state.options,
                      itm && itm.title && itm.title.value,
                      this.props.stateLanguageType,
                      false,
                      "anamnesis"
                    )}
                    name="title"
                    isSearchable={true}
                    className="mr_sel"
                  />
                  <NotesEditor
                    name="notes"
                    value={itm.notes || ""}
                    label={BodySchemeNotes}
                    onChange={(e) => this.onFieldChangeNote(e, 0)}
                  />
                  <Grid className="consumeAt">
                    <p onClick={this.onAddFiled}>+ {addtextentry}</p>
                  </Grid>
                </Grid>
              ) : (
                <Grid>
                  <Select
                    value={GetShowLabel1(
                      this.state.options,
                      itm && itm.title && itm.title.value,
                      this.props.stateLanguageType,
                      false,
                      "anamnesis"
                    )}
                    onChange={(e) => this.onFieldChange(e, index)}
                    options={this.state.options}
                    name="title"
                    isSearchable={true}
                    className="mr_sel"
                  />
                  <NotesEditor
                    name="notes"
                    label={BodySchemeNotes}
                    onChange={(e) => this.onFieldChangeNote(e, index)}
                    value={itm.notes}
                  />
                  <Grid className="consumeAt">
                    <p
                      onClick={() => {
                        this.deleteField(index);
                      }}
                      className="minus_span_medication"
                    >
                      - {rmv_entry}
                    </p>
                  </Grid>
                </Grid>
              )
            )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default pure(withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(AnamnesisFinding)
));
