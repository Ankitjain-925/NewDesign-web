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
import Modal from '@material-ui/core/Modal';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import sitedata from '../../../../sitedata';
import { getDate, getImage } from './../../../Components/BasicMethod/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
           currentList : [],
           currentPage : this.props.page,
           totalPage : this.props.totalPage,
           AllSick : [],
           pages : [1],
           images : [],
           addSick : false,
           AddSickCertificate : {},
           successfullsent1 : false,
           showSick : false,
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    
    // Delete the Sick certificate confirmation
    updateCertificate(status, id) {
        confirmAlert({
            title: 'Update the Inqury',
            message: 'Are you sure  to update this Inquiry?',
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

    //On addition new data
    componentDidUpdate= (prevProps)=>{
        if(prevProps.newItem !== this.props.newItem){
            this.getSick();
        }
    }
     // Add the Sick Certificate State
     AddSickState = (e) => {
        const state = this.state.AddSickCertificate;
         state[e.target.name] = e.target.value; 
        this.setState({ AddSickCertificate: state })
    }

     //For set the Name by Event like since_when for Sick certificate
    eventnameSet = (name, value) =>{
        const state = this.state.AddSickCertificate;
        state[name] = value;
        this.setState({ AddSickCertificate: state })
    }

    //open and close Sick certificate Details
     handleaddSick = (data) => {
        this.setState({ showSick: false, addSick: true, AddSickCertificate: data });
    };
    handleCloseSick = () => {
        this.setState({ addSick: false });
    };

    //open and close Sick certificate Details
    handleshowSick = (data) => {
        this.setState({ showSick: true, addSick: false, AddSickCertificate: data });
   };
   handleCloseShowSick = () => {
       this.setState({ showSick: false });
   };

    //For update the certificate
    Submitcertificate=()=>{
        var user_token = this.props.stateLoginValueAim.token;
        var data = this.state.AddSickCertificate;
        axios.put(sitedata.data.path + '/UserProfile/UpdateSickcertificate/' + this.state.AddSickCertificate._id, data , {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({successfullsent1 : true})
            setTimeout(()=>{this.setState({successfullsent1 : false, addSick : false})},2000)
            this.getSick();
        }).catch((error) => {
        })
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
            var images = []
            response.data.data && response.data.data.length > 0 && response.data.data.map((datas) => {
                var find = datas && datas.docProfile && datas.docProfile.profile_image
                if (find) {
                    var find1 = find.split('.com/')[1]
                    axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find1,)
                    .then((response2) => {
                        if (response2.data.hassuccessed) {
                            images.push({ image: find, new_image: response2.data.data })
                            this.setState({ images: images })
                        }
                    })
                }
            })
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
                                <Td>{data.send_on ? getDate(data.send_on) : 'Not mentioned'}</Td>
                                {/* <Td className="presImg"><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />{data.docProfile && data.docProfile.first_name && data.docProfile.first_name} {data.docProfile && data.docProfile.last_name && data.docProfile.last_name}</Td> */}
                                <Td className="presImg"><img src={data.docProfile && data.docProfile.profile_image ? getImage(data.docProfile.profile_image, this.state.images) : require('../../../../assets/images/dr1.jpg')} alt="" title="" />{data.docProfile && data.docProfile.first_name && data.docProfile.first_name} {data.docProfile && data.docProfile.last_name && data.docProfile.last_name}</Td>
                                {data.status === 'pending' && <Td><span className="revwYelow"></span>Pending </Td>}
                                {data.status === 'accept' && <Td><span className="revwGren"></span>Answered </Td>}
                                {data.status === 'decline' && <Td><span className="revwRed"></span> Rejected</Td>}
                                {data.status === 'cancel' && <Td><span className="revwRed"></span> Cancelled</Td>}
                                {data.status === 'free' && <Td><span className="revwGry"></span> Sent request</Td>}
                                <Td className="presEditDot scndOptionIner">
                                    <a className="openScndhrf">
                                        <img src={require('../../../../assets/images/threedots.jpg')} alt="" title="" className="openScnd"/>
                                        <ul>
                                            <li><a onClick={() => {  this.handleshowSick(data) }}><img src={require('../../../../assets/images/details.svg')} alt="" title="" />See details</a></li>
                                            {data.status !== 'accept' && <li><a onClick={() => {  this.handleaddSick(data) }}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />Modify</a></li>}
                                            {data.status === 'decline' && <li><a onClick={() => {  this.updateCertificate('free', data._id) }}><img src={require('../../../../assets/images/plus.png')} alt="" title="" />Inquiry again</a></li>}
                                            {data.status !== 'cancel' && <li><a onClick={() => {  this.updateCertificate('cancel', data._id) }}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Cancel request</a></li>}
                                        </ul>    
                                    </a>   
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                  {/* Model setup for sick sertificate*/}
                  <Modal
                     open={this.state.addSick}
                     onClose={this.handleCloseSick}
                    className="nwPresModel">
                    <Grid className="nwPresCntnt">
                        <Grid className="nwPresCntntIner">
                            <Grid className="nwPresCourse">
                                <Grid className="nwPresCloseBtn">
                                    <a onClick={this.handleCloseSick}>
                                        <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                    </a>
                                </Grid>
                                <p>Edit inquiry</p>
                                <Grid><label>Sick Certificate</label></Grid>
                            </Grid>
                            {this.state.successfullsent1 && <div className="success_message">Request Updated Sucessfully</div>}
                           
                            <Grid className="docHlthMain">
                                <Grid className="drstndrdQues">
                                    <h3>Doctor and standard questions</h3>
                                    <Grid className="drsplestQues">
                                        <Grid><label>Doctor (Aimedis & Private)</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.docProfile && this.state.AddSickCertificate.docProfile.first_name && this.state.AddSickCertificate.docProfile.first_name} {this.state.AddSickCertificate && this.state.AddSickCertificate.docProfile && this.state.AddSickCertificate.docProfile.last_name && this.state.AddSickCertificate.docProfile.last_name}</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>How are you feeling?</label></Grid>
                                        <Grid>
                                            <input type="text" name="how_are_you" value={this.state.AddSickCertificate.how_are_you} onChange={this.AddSickState}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="ishelpUpr">
                                    <Grid className="ishelpLbl"><label>Is your temperature higher than 38 °C?</label></Grid>
                                    <Grid className="ishelpChk">
                                        <FormControlLabel  control={<Radio />} name="fever" value="yes" color="#00ABAF" checked={this.state.AddSickCertificate.fever === 'yes'} onChange={this.AddSickState} label="Yes"  />
                                        <FormControlLabel control={ <Radio />} name="fever" color="#00ABAF" value="no" checked={this.state.AddSickCertificate.fever === 'no'} onChange={this.AddSickState} label="No"/>
                                    </Grid>
                                </Grid>
                                <Grid className="medicnSub">
                                    <Grid><label>Which symptoms do you have?</label></Grid>
                                    <Grid><input type="text" name="which_symptomps" value={this.state.AddSickCertificate.which_symptomps} onChange={this.AddSickState}/></Grid>
                                </Grid>
                                <Grid className="medicnSub sncWhen">
                                    <Grid><label>Since when?</label></Grid>
                                    <Grid>
                                        <a className={this.state.AddSickCertificate.since_when === 'Today' && "current_since_when"} onClick={()=>{this.eventnameSet('since_when', 'Today')}}>Today</a> 
                                        <a className={this.state.AddSickCertificate.since_when === 'Yesterday' && "current_since_when"} onClick={()=>{this.eventnameSet('since_when', 'Yesterday')}}>Yesterday</a> 
                                        <a className={this.state.AddSickCertificate.since_when === '2 days ago' && "current_since_when"} onClick={()=>{this.eventnameSet('since_when', '2 days ago')}}>2 days ago</a>
                                        <a className={this.state.AddSickCertificate.since_when === '3-6 days ago' && "current_since_when"} onClick={()=>{this.eventnameSet('since_when', '3-6 days ago')}}>3-6 days ago</a> 
                                        <a className={this.state.AddSickCertificate.since_when === 'Week or more' && "current_since_when"} onClick={()=>{this.eventnameSet('since_when', 'Week or more')}}>Week or more</a></Grid>
                                </Grid>
                                <Grid className="medicnSub">
                                    <Grid><label>Have you already been sick at home for the same problem?</label></Grid>
                                    <Grid><input type="text" name="same_problem_before" value={this.state.AddSickCertificate.same_problem_before} onChange={this.AddSickState}/></Grid>
                                </Grid>
                                <Grid className="medicnSub">
                                    <Grid><label>How long do you think you will be unable to work?</label></Grid>
                                    <Grid className="doseMg"><input type="text" name="time_unable_work" value={this.state.AddSickCertificate.time_unable_work} onChange={this.AddSickState} />
                                        <span>days</span>
                                    </Grid>
                                </Grid>
                                <Grid className="medicnSub">
                                    <Grid><label>Is it a known disease?</label></Grid>
                                    <Grid><input type="text" name="known_diseases" value={this.state.AddSickCertificate.known_diseases} onChange={this.AddSickState}/></Grid>
                                </Grid>
                                <Grid className="medicnSub">
                                    <Grid><label>Are you taking any medication?</label></Grid>
                                    <Grid><input type="text" name="medication" value={this.state.AddSickCertificate.medication} onChange={this.AddSickState} /></Grid>
                                </Grid>
                                <Grid className="medicnSub">
                                    <Grid><label>Do you have any allergies?</label></Grid>
                                    <Grid><input type="text" name="allergies" value={this.state.AddSickCertificate.allergies} onChange={this.AddSickState}/></Grid>
                                </Grid>
                                <Grid className="medicnSub">
                                    <Grid><label>What is your profession?</label></Grid>
                                    <Grid><input type="text" name="professions" value={this.state.AddSickCertificate.professions} onChange={this.AddSickState}/></Grid>
                                </Grid>
                                <Grid className="medicnSub">
                                    <Grid><label>Annotations / details / questions</label></Grid>
                                    <Grid><textarea name="annotations" value={this.state.AddSickCertificate.annotations} onChange={this.AddSickState}> </textarea></Grid>
                                </Grid>
                            </Grid>
                            <Grid className="infoShwHidBrdr2"></Grid>
                            <Grid className="infoShwHidIner2">
                                {/* <Grid className="infoShwHidMain2">
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Grid item xs={6} md={6}>
                                            <Grid className="infoShwHid2">
                                                <a>Show or Hide <img src={require('../../../assets/images/Info.svg')} alt="" title="" /></a>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={6} className="editShwHid2">
                                            <a>Edit</a>
                                        </Grid>
                                    </Grid>
                                </Grid> */}
                                <Grid className="infoShwSave2">
                                    <input type="submit"  onClick={this.Submitcertificate} value="Update entry" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>


                 {/* Model setup for sick sertificate*/}
                 <Modal
                     open={this.state.showSick}
                     onClose={this.handleCloseShowSick}
                    className="nwPresModel">
                    <Grid className="nwPresCntnt">
                        <Grid className="nwPresCntntIner">
                            <Grid className="nwPresCourse">
                                <Grid className="nwPresCloseBtn">
                                    <a onClick={this.handleCloseShowSick}>
                                        <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                    </a>
                                </Grid>
                                <p>Show inquiry</p>
                                <Grid><label>Sick Certificate</label></Grid>
                            </Grid>
                            <Grid className="docHlthMain">
                                <Grid className="drstndrdQues">
                                    <h3>Doctor and standard questions</h3>
                                    <Grid className="drsplestQues">
                                        <Grid><label>Doctor (Aimedis & Private)</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.docProfile && this.state.AddSickCertificate.docProfile.first_name && this.state.AddSickCertificate.docProfile.first_name} {this.state.AddSickCertificate && this.state.AddSickCertificate.docProfile && this.state.AddSickCertificate.docProfile.last_name && this.state.AddSickCertificate.docProfile.last_name}</h3></Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="drsplestQues">
                                    <Grid><label>How are you feeling?</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.how_are_you && this.state.AddSickCertificate.how_are_you}</h3></Grid>
                                </Grid>
                                <Grid className="drsplestQues">
                                    <Grid className="ishelpLbl"><label>Is your temperature higher than 38 °C?</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.fever && this.state.AddSickCertificate.fever}</h3></Grid>   
                                </Grid>
                                <Grid className="drsplestQues">
                                    <Grid><label>Which symptoms do you have?</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.which_symptomps && this.state.AddSickCertificate.which_symptomps}</h3></Grid>   
                                </Grid>
                                <Grid className="drsplestQues">
                                    <Grid><label>Since when?</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.since_when && this.state.AddSickCertificate.since_when}</h3></Grid>   
                                </Grid>
                                <Grid className="drsplestQues">
                                    <Grid><label>Have you already been sick at home for the same problem?</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.same_problem_before && this.state.AddSickCertificate.same_problem_before}</h3></Grid> 
                                </Grid>
                                <Grid className="drsplestQues">
                                    <Grid><label>How long do you think you will be unable to work?</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.time_unable_work && this.state.AddSickCertificate.time_unable_work} days</h3></Grid>
                                </Grid>
                                <Grid className="drsplestQues">
                                    <Grid><label>Is it a known disease?</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.known_diseases && this.state.AddSickCertificate.known_diseases}</h3></Grid>
                                </Grid>
                                <Grid className="drsplestQues">
                                    <Grid><label>Are you taking any medication?</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.medication && this.state.AddSickCertificate.medication}</h3></Grid>
                                </Grid>
                                <Grid className="drsplestQues">
                                    <Grid><label>Do you have any allergies?</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.allergies && this.state.AddSickCertificate.allergies}</h3></Grid>
                                </Grid>
                                <Grid className="drsplestQues">
                                    <Grid><label>What is your profession?</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.professions && this.state.AddSickCertificate.professions}</h3></Grid>
                                 </Grid>
                                <Grid className="drsplestQues">
                                    <Grid><label>Annotations / details / questions</label></Grid>
                                    <Grid><h3>{this.state.AddSickCertificate &&  this.state.AddSickCertificate.annotations && this.state.AddSickCertificate.annotations}</h3></Grid>
                                </Grid>
                            </Grid>
                            <Grid className="infoShwHidBrdr2"></Grid>
                            <Grid className="infoShwHidIner2">
                                <Grid className="infoShwSave2">
                                    <input type="submit"  onClick={this.handleCloseShowSick} value="Close Details" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                {/* End of Model setup */}
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