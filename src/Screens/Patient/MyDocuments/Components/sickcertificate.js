import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import axios from 'axios';
import { LanguageFetchReducer } from './../../../actions';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Loader from './../../../Components/Loader/index';
import sitedata from '../../../../sitedata';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
           currentList : [],
           currentPage : this.props.page,
           totalPage : this.props.totalPage,
           AllSick : [],
           pages : [1],

        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    
    // Delete the Sick certificate confirmation
    updateCertificate(status, id) {
        confirmAlert({
            title: 'Delete the Document',
            message: 'Are you sure  to delete this Document?',
            buttons: [
                {
                    label: 'YES',
                    onClick: () => this.updateCertificateDetails(status, id)
                },
                {
                    label: 'NO',
                }
            ]
        })
    }

    // Delete the Sick certificate 
    updateCertificateDetails(status, id) {
        let user_token = this.props.stateLoginValueAim.token
        axios.put(sitedata.data.path + '/UserProfile/GetSickCertificate/' + id, {
            status: status
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.getSick();
        }).catch((error) => {
        })
    }

    componentDidMount = () => {
        this.getSick();
    }

    //Get all the sick certificates
    getSick = () => {
        this.setState({ loaderImage: true })
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/RequestedSickCertificate', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            var totalPage = Math.ceil(response.data.data.length/10);
            this.setState({ AllSick: response.data.data, loaderImage: false , currentPage : 1, totalPage : totalPage },
                ()=>{ if(totalPage>1) { var pages=[];
                    for(var i=1; i<=this.state.totalPage; i++)
                    {
                        pages.push(i)
                    } 
                        this.setState({ currentList : this.state.AllSick.slice(0,10)}) }
                        else { this.setState({ currentList : this.state.AllSick }) }   
                })
        })
    }

    //For chnage the Page
    onChangePage=(pageNumber)=> {
        this.setState({ currentList : this.state.AllSick.slice((pageNumber-1)*10,pageNumber*10), currentPage : pageNumber}) 
    }

    render() {

        return (
            <Grid className="presOpinionIner">
                 {this.state.loaderImage && <Loader />}
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Case</Th>
                            <Th>Sent on</Th>
                            <Th>Doctor</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {this.state.currentList && this.state.currentList.length > 0 && this.state.currentList.map((data, index) => (
                            <Tr>
                                <Td>{data.which_symptomps ? data.which_symptomps : 'Not mentioned'}</Td>
                                <Td>{data.send_on ? data.send_on : 'Not mentioned'}</Td>
                                <Td className="presImg"><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />{data.docProfile && data.docProfile.first_name && data.docProfile.first_name} {data.docProfile && data.docProfile.last_name && data.docProfile.last_name}</Td>
                                {data.status === 'pending' && <Td><span className="revwYelow"></span>Pending </Td>}
                                {data.status === 'accept' && <Td><span className="revwGren"></span>Answered </Td>}
                                {data.status === 'decline' && <Td><span className="revwRed"></span> Rejected</Td>}
                                {data.status === 'free' && <Td><span className="revwGry"></span> Sent request</Td>}
                                <Td className="presEditDot"><img src={require('../../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Grid className="tablePagNum">
                <Grid container direction="row">
                    <Grid item xs={12} md={6}>
                        <Grid className="totalOutOff">
                            <a>{this.state.currentPage} of {this.state.totalPage}</a>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    {this.state.totalPage > 1 && <Grid className="prevNxtpag">
                            {this.state.currentPage != 1 && <a className="prevpag" onClick={()=>{this.onChangePage(this.state.currentPage-1)}}>Previous</a>}
                            {this.state.pages && this.state.pages.length>0 && this.state.pages.map((item, index)=>(
                                 <a className={this.state.currentPage == item && "activePageDocutmet"} onClick={()=>{this.onChangePage(item)}}>{item}</a>
                            ))}
                            {this.state.currentPage != this.state.totalPage && <a className="nxtpag" onClick={()=>{this.onChangePage(this.state.currentPage+1)}}>Next</a>}
                        </Grid>}
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
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Index));