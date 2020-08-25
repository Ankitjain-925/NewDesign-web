import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import axios from 'axios';
import { LanguageFetchReducer } from './../../../actions';
import sitedata from '../../../../sitedata';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Loader from './../../../Components/Loader/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentList : [],
            currentPage : 1,
            totalPage : 1,
            AllPres : [],
            pages : [1],
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount = () => {
        this.getPrescription();
    }

    //Delete for the Prescriptions
    deleteClickPatient(status, id) {
        let user_token = this.props.stateLoginValueAim.token
        axios.put(sitedata.data.path + '/UserProfile/GetPrescription/' + id, {
            status: status

        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.getPrescription();
        }).catch((error) => {
        });
    }

    //Delete for the Prescriptions confirmation
    updatePrescription(status, id) {
        confirmAlert({
            title: 'Delete the Document',
            message: 'Are you sure  to delete this Document?',
            buttons: [
                {
                    label: 'YES',
                    onClick: () => this.deleteClickPatient(status, id)
                },
                {
                    label: 'NO',
                }
            ]
        })
    }

    //For chnage the page
    onChangePage=(pageNumber)=> {
        this.setState({ currentList : this.state.AllPres.slice((pageNumber-1)*10,pageNumber*10), currentPage : pageNumber}) 
    }

    //Get all the sick Prescriptions
    getPrescription = () => {
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/UserProfile/RequestedPrescription', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => 
            { 
                var totalPage = Math.ceil(response.data.data.length/10);
                this.setState({ AllPres: response.data.data, loaderImage: false , totalPage: totalPage, currentPage : 1 },
                    ()=>{ if(totalPage>1) {  var pages=[];
                        for(var i=1; i<=this.state.totalPage; i++)
                        {
                            pages.push(i)
                        } 
                        this.setState({ currentList : this.state.AllPres.slice(0,10), pages : pages}) }
                    else {
                        this.setState({ currentList : this.state.AllPres }) }   
              })
            })
    }

    render() {
        return (
            <Grid className="presOpinionIner">
                 {this.state.loaderImage && <Loader />}
            <Table>
                <Thead>
                    <Tr>
                        <Th>Medicine</Th>
                        <Th>Sent on</Th>
                        <Th>Doctor</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {this.state.currentList && this.state.currentList.length > 0 && this.state.currentList.map((data, index) => (
                    <Tr>
                        <Td>{data.medication ? data.medication : 'Not mentioned'}</Td>
                        <Td>{data.send_on ? data.send_on : 'Not mentioned'}</Td>
                        <Td className="presImg"><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />{data.docProfile && data.docProfile.first_name && data.docProfile.first_name} {data.docProfile && data.docProfile.last_name && data.docProfile.last_name}</Td>
                        {data.status === 'pending' && <Td><span className="revwYelow"></span>Pending </Td>}
                        {data.status === 'accept' && <Td><span className="revwGren"></span>Answered </Td>}
                        {data.status === 'remove' && <Td><span className="revwRed"></span> Rejected</Td>}
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