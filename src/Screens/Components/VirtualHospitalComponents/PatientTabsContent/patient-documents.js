import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { authy } from "Screens/Login/authy.js";
import { OptionList } from "Screens/Login/metadataaction";
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getLanguage } from 'translations/index';
import Pagination from "Screens/Components/Pagination/index";
import { get_gender, get_cur_one, get_personalized, get_track, update_entry_state, delete_click_track, download_track } from "Screens/Components/CommonApi/index";
import { DocView } from 'Screens/Components/DocView/index';
const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            attachedFile: [],
            AllServices: [],
            
        };
    }

    componentDidMount = async () => {
        let user_id = this.props.match.params.id;
        let user_token = this.props.stateLoginValueAim.token
        let response = await get_track(user_token, user_id)
        let docData = response?.data?.data
        let attachedFile = []
        await docData && docData.length > 0 && docData.map((result, i) => {
            if (result.attachfile && result.attachfile.length > 0) {
                result.attachfile.map(data => {
                    let data1 = {
                        "filename": data.filename,
                        "filetype": data.filetype,
                        "created_by": result.created_by_temp,
                        "created_on": result.created_on
                    }
                    attachedFile.push(data1)
                })
            }
        })
        this.setState({ attachedFile: attachedFile })
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    onChangePage = (pageNumber) => {
        this.setState({
          services_data:this.state.AllServices(
            (pageNumber - 1) * 10,
            pageNumber * 10
          ),
          currentPage: pageNumber,
        });
        console.log('gvhhn',pageNumber)
      };
      

    render() {
        const { selectedOption, attachedFile } = this.state;
        let translate = getLanguage(this.props.stateLanguageType)
        let { MarkAndersonMD, journal, addNewEntry, clear_filters, dateAdded, documentName, sortBy, added_by, FirstdiagnosisDocx, sixteen022021, twelve022021, very_long_name_of_pdf } = translate;
        return (
            <Grid>
                <Grid className="journalAdd">
                    <Grid container direction="row">
                        <Grid item xs={12} md={11}>
                            <Grid container direction="row">
                                <Grid item xs={12} md={6} sm={6}><h1>{journal}</h1></Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    <Grid className="AddEntrynw"><a>{addNewEntry}</a></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Search for Website */}
                <Grid container direction="row">
                    <Grid item xs={12} md={11}>
                        <Grid className="srchFilter">
                            <Grid container direction="row">
                                <Grid item xs={12} md={2}>
                                    <Select value={selectedOption} onChange={this.handleChange} options={options} placeholder="All time"
                                        className=" comonSel"
                                        //isMulti= {true}
                                        isSearchable={false}
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Select value={selectedOption} onChange={this.handleChange} options={options} placeholder="Type: (2)"
                                        className="typeSel comonSel" />
                                </Grid>
                                <Grid item xs={12} md={3} className="faclity_all">
                                    <Select value={selectedOption} onChange={this.handleChange} options={options}
                                        placeholder="Doctor: All" className=" comonSel" />
                                </Grid>
                                <Grid item xs={12} md={3} className="faclity_all">
                                    <Select value={selectedOption} onChange={this.handleChange} options={options} placeholder="Facility: All"
                                        className=" comonSel" />
                                </Grid>
                                <Grid item xs={12} md={2} className="clear_filter">
                                    <Grid className="clear_filterUpr">
                                        <Grid className="clear_filterLft"><a>{clear_filters}</a></Grid>
                                        <Grid className="clear_filterRght">
                                            <a><img src={require('assets/virtual_images/clearSrch.jpg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="clear"></Grid>
                            </Grid>
                            <Grid className="sortBySec">
                                <label>{sortBy}</label>
                                <input type="text" placeholder="Entry time" className="entrTimeBY" />
                                <input type="text" placeholder="Diagnosis time" className="diagTimeBY" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* End of Search for Website */}

                {/* Document Table */}
                <Grid container direction="row">
                    <Grid item xs={12} md={11}>
                        <Grid className="presOpinionIner">
                            <DocView attachedFile={attachedFile} documentName={documentName} dateAdded={dateAdded} added_by={added_by} />
                            <Grid className="tablePagNum">
                        <Grid container direction="row">
                          <Grid item xs={12} md={6}>
                            <Grid className="totalOutOff">
                              <a>
                                {this.state.currentPage} of{" "}
                                {this.state.totalPage}
                               </a>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            {this.state.totalPage > 1 && (
                              <Grid className="prevNxtpag">
                                <Pagination
                                  totalPage={this.state.totalPage}
                                  currentPage={this.state.currentPage}
                                  pages={this.state.pages}
                                  onChangePage={(page) => {
                                    this.onChangePage(page, this);
                                  }}
                                />
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                            </Grid>
                        </Grid>
                </Grid>
                {/* End of Document Table */}
               </Grid>
            
        );
    }
}
const mapStateToProps = (state) => {
    const {
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
    } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    const { metadata } = state.OptionList;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
        metadata,
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        OptionList,
        LanguageFetchReducer,
        Settings,
        authy,
    })(Index)
);