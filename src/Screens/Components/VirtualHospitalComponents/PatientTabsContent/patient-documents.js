import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
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
        return (
            <Grid>
                <Grid className="journalAdd">
                    <Grid container direction="row">
                        <Grid item xs={12} md={11}>
                            <Grid container direction="row">
                                <Grid item xs={12} md={6} sm={6}><h1>Journal</h1></Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    <Grid className="AddEntrynw"><a>+ Add new entry</a></Grid>
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
                                        className="allTimeSel comonSel"
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
                                    placeholder="Doctor: All" className="allTimeSel comonSel" />
                                </Grid>
                                <Grid item xs={12} md={3} className="faclity_all">
                                    <Select value={selectedOption} onChange={this.handleChange} options={options} placeholder="Facility: All"
                                        className="allTimeSel comonSel" />
                                </Grid>
                                <Grid item xs={12} md={2} className="clear_filter">
                                    <Grid className="clear_filterUpr">
                                        <Grid className="clear_filterLft"><a>Clear filters</a></Grid>
                                        <Grid className="clear_filterRght">
                                            <a><img src={require('assets/virtual_images/clearSrch.jpg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="clear"></Grid>
                            </Grid>
                            <Grid className="sortBySec">
                                <label>Sort by:</label>
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
                                <Thead><Tr><Th>Document name</Th><Th className="dateAdd">Date added</Th>
                                <Th>Added by</Th><Th></Th></Tr></Thead>
                                <Tbody>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/Word_40x40.svg')} alt="" title="" />First diagnosis.docx (152KB)</Td>
                                        <Td>16/02/2021</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/pdf.svg')} alt="" title="" />A very long name of a do…pdf (621KB)</Td>
                                        <Td>12/02/2021</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/jpg.svg')} alt="" title="" />A very long name of a do…pdf (621KB)</Td>
                                        <Td>12/02/2021</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/Excel_40x40.svg')} alt="" title="" />A very long name of a do…pdf (621KB)</Td>
                                        <Td>12/02/2021</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/Word_40x40.svg')} alt="" title="" />First diagnosis.docx (152KB)</Td>
                                        <Td>16/02/2021</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/pdf.svg')} alt="" title="" />A very long name of a do…pdf (621KB)</Td>
                                        <Td>12/02/2021</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/jpg.svg')} alt="" title="" />A very long name of a do…pdf (621KB)</Td>
                                        <Td>12/02/2021</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                        <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="docsTitle"><img src={require('assets/virtual_images/Excel_40x40.svg')} alt="" title="" />A very long name of a do…pdf (621KB)</Td>
                                        <Td>12/02/2021</Td>
                                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
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