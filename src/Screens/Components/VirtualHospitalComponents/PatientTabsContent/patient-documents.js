import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getLanguage } from 'translations/index';
const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        };
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    render() {
        const { selectedOption } = this.state;
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
                            <Table>
                                <Thead><Tr><Th>{documentName}</Th><Th className="dateAdd">{dateAdded}</Th>
                                    <Th>{added_by}</Th><Th></Th></Tr></Thead>
                                <Tbody>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/Word_40x40.svg')} alt="" title="" />{FirstdiagnosisDocx}</Td>
                                        <Td>{sixteen022021}</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />{MarkAndersonMD}</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/pdf.svg')} alt="" title="" />{very_long_name_of_pdf}</Td>
                                        <Td>{twelve022021}</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />{MarkAndersonMD}</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/jpg.svg')} alt="" title="" />{very_long_name_of_pdf}</Td>
                                        <Td>{twelve022021}</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />{MarkAndersonMD}</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/Excel_40x40.svg')} alt="" title="" />{very_long_name_of_pdf}</Td>
                                        <Td>{twelve022021}</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />{MarkAndersonMD}</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/Word_40x40.svg')} alt="" title="" />{FirstdiagnosisDocx}</Td>
                                        <Td>{sixteen022021}</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />{MarkAndersonMD}</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/pdf.svg')} alt="" title="" />{very_long_name_of_pdf}</Td>
                                        <Td>{twelve022021}</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />{MarkAndersonMD}</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/jpg.svg')} alt="" title="" />{very_long_name_of_pdf}</Td>
                                        <Td>{twelve022021}</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />{MarkAndersonMD}</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/Excel_40x40.svg')} alt="" title="" />{very_long_name_of_pdf}</Td>
                                        <Td>{twelve022021}</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />{MarkAndersonMD}</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Grid>
                    </Grid>
                </Grid>
                {/* End of Document Table */}

            </Grid>
        );
    }
}
export default Index