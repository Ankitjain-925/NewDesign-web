import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }
    handleChangeTab = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { value } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            {/* Mobile menu */}
                            <LeftMenuMobile currentPage="chat" />
                            {/* End of mobile menu */}
                            <Grid container direction="row">
                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr"><LeftMenu currentPage="chat" /></Grid>
                                {/* End of Menu */}
                                {/* Start of Right Section */}
                                <Grid item xs={12} md={10}>
                                    <Grid className="topLeftSpc">
                                        <Grid container direction="row">
                                            <Grid item xs={6} md={6}>
                                                <Grid className="extSetting">
                                                    <h1>Billing</h1>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                                <Grid className="newServc">
                                                    <Button>+ New Invoice</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="bilingTabUpr">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} sm={9} md={9}>
                                                    <AppBar position="static" className="billTabs">
                                                        <Tabs value={value} onChange={this.handleChangeTab}>
                                                            <Tab label="All" className="billtabIner" />
                                                            <Tab label="Issued" className="billtabIner" />
                                                            <Tab label="Overdue" className="billtabIner" />
                                                            <Tab label="Paid" className="billtabIner" />
                                                        </Tabs>
                                                    </AppBar>
                                                </Grid>
                                                <Grid item xs={12} sm={3} md={3}>
                                                    <Grid className="billSeting">
                                                        <a><img src={require('assets/virtual_images/sort.png')} alt="" title="" /></a>
                                                        <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                                                        <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {value === 0 && <TabContainer>
                                            <Grid className="billInfoData">
                                                <Table>
                                                    <Thead>
                                                        <Tr>
                                                            <Th>ID</Th>
                                                            <Th>Patient</Th>
                                                            <Th>Date</Th>
                                                            <Th>Status</Th>
                                                            <Th>Total</Th>
                                                            <Th></Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greyDot"><span></span>Draft</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greyDot"><span></span>Draft</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                    </Tbody>
                                                </Table>
                                                <Grid className="billPagination">
                                                    <Grid container direction="row">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="billPaginationLft"><p>25 of 36</p></Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="billPaginationRght">
                                                                <p><a>Previous</a><span>1</span><span>2</span><span>3</span><a>Next</a></p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabContainer>}
                                        {value === 1 && <TabContainer>
                                            <Grid className="billInfoData">
                                                <Table>
                                                    <Thead>
                                                        <Tr>
                                                            <Th>ID</Th>
                                                            <Th>Patient</Th>
                                                            <Th>Date</Th>
                                                            <Th>Status</Th>
                                                            <Th>Total</Th>
                                                            <Th></Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                    </Tbody>
                                                </Table>
                                                <Grid className="billPagination">
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="billPaginationLft"><p>25 of 36</p></Grid>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="billPaginationRght">
                                                                <p><a>Previous</a><span>1</span><span>2</span><span>3</span><a>Next</a></p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabContainer>}
                                        {value === 2 && <TabContainer>
                                            <Grid className="billInfoData">
                                                <Table>
                                                    <Thead>
                                                        <Tr>
                                                            <Th>ID</Th>
                                                            <Th>Patient</Th>
                                                            <Th>Date</Th>
                                                            <Th>Status</Th>
                                                            <Th>Total</Th>
                                                            <Th></Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="yelowDot"><span></span>Issued</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                    </Tbody>
                                                </Table>
                                                <Grid className="billPagination">
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="billPaginationLft"><p>25 of 36</p></Grid>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="billPaginationRght">
                                                                <p><a>Previous</a><span>1</span><span>2</span><span>3</span><a>Next</a></p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabContainer>}
                                        {value === 3 && <TabContainer>
                                            <Grid className="billInfoData">
                                                <Table>
                                                    <Thead>
                                                        <Tr>
                                                            <Th>ID</Th>
                                                            <Th>Patient</Th>
                                                            <Th>Date</Th>
                                                            <Th>Status</Th>
                                                            <Th>Total</Th>
                                                            <Th></Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>2021-000246</Td>
                                                            <Td className="patentPic"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" />James Morrison</Td>
                                                            <Td>16/03/2020</Td>
                                                            <Td className="greenDot"><span></span>Paid</Td>
                                                            <Td>390,00 €</Td>
                                                            <Td className="billDots"><Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button></Td>
                                                        </Tr>
                                                    </Tbody>
                                                </Table>
                                                <Grid className="billPagination">
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="billPaginationLft"><p>25 of 36</p></Grid>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="billPaginationRght">
                                                                <p><a>Previous</a><span>1</span><span>2</span><span>3</span><a>Next</a></p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabContainer>}
                                    </Grid>
                                </Grid>
                                {/* End of Right Section */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default Index