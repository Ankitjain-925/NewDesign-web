import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from '../../../../sitedata';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import axios from 'axios';
import { LanguageFetchReducer } from './../../../actions';
import Select from 'react-select';
import Loader from './../../../Components/Loader/index';
import Radio from '@material-ui/core/Radio';
import ReactFlagsSelect from 'react-flags-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tissue: this.props.tissue,
            loaderImage: false,
            selectedOption: "",
            UpDataDetails: [],
            DonorFamily: [],
            OptionData: {},
            flag_phone: 'DE',
            phone : '',
            include_some : [],
            exclude_some : [],
            PassDone : false,
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount() {
        // new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        this.getUserData();
    }

    // For Select one option 
    handleOptionChange=(changeEvent) =>{
        this.setState({
            selectedOption: changeEvent.target.value
        }, () => {
            // this.saveUserData();
        })
    }

    //For update the mobile number
    updateMOBILE = (str) => {
        if (!str || str === 'undefined' || str === null || str === '') {
            return str;
        }
        else {
            var mob = str && str.split("-")
            return mob.pop()

        }
    }

    //Uodate tghe State od Option Data (Name phone etc)
    updateEntryState = (e) => {
        const state = this.state.OptionData;
        state[e.target.name] = e.target.value;
        this.setState({ OptionData: state });
    }

    //For update the flags 
    updateFlags = (e, name) => {
        const state = this.state.OptionData;
        if (name === 'flag_phone') {
            state['phone'] = e + '-' + this.state.phone;
            this.setState({ flag_phone: e });
        }
        this.setState({ OptionData: state });
    }

    //Update the states
    updateEntryState1 = (e) => {
        const state = this.state.OptionData;
        if (e.target.name === 'phone') {
            state[e.target.name] = this.state.flag_phone + '-' + e.target.value;
            this.setState({ phone: e.target.value });
        }
        this.setState({ OptionData: state });
    }

    //Save the User Data of Orgen Donor
    saveUserData = () =>{
        this.setState({ loaderImage: true });
        var OptionData
        if (this.state.selectedOption == 'exclude_some') {
            OptionData = this.state.OptionData.exclude_some
        }
        if (this.state.selectedOption == 'include_some') {
            OptionData = this.state.OptionData.include_some
        }
        if (this.state.selectedOption == 'decided_by_following') {
            OptionData = {
                first_name: this.state.OptionData.first_name,
                last_name: this.state.OptionData.last_name,
                phone: this.state.OptionData.phone,
                city: this.state.OptionData.city,
                address: this.state.OptionData.address,
                postal_code : this.state.OptionData.postal_code,
            }
        }
        const user_token = this.props.stateLoginValueAim.token;
        axios.put(sitedata.data.path + '/UserProfile/organDonor', {
            selectedOption: this.state.selectedOption,
            OptionData: OptionData,
            free_remarks: this.state.OptionData.free_remarks,
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((responce) => {
                if(this.props.comesFrom)
                {
                    this.props.EditOrganDonar();
                }
                this.setState({PassDone : true, loaderImage : false})
                setTimeout(()=>{ this.setState({PassDone: false}) }, 5000)
                
            })
    }

    //For change the Organ / Tissue
    handleChange_multi = (event, name) => {
        const state = this.state.OptionData;
        if(name==='include_some')
        {  this.setState({ include_some: event })}
        else {this.setState({ exclude_some: event })}
        state[name] = event && (Array.prototype.map.call(event, s => s.label).toString()).split(/[,]+/).join(',  ');
        this.setState({ OptionData: state })
    };

    //Get all the information of the current User
    getUserData =()=> {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ loaderImage: false });
            if (response) {
                if (response.data.data.organ_donor[0].selectedOption) {
                    this.setState({ selectedOption: response.data.data.organ_donor[0].selectedOption })
                }
                if (response.data.data.organ_donor[0].free_remarks) {
                    this.setState({ OptionData: { free_remarks: response.data.data.organ_donor[0].free_remarks } })
                }
                if (response.data.data.organ_donor[0].selectedOption == "yes_to_all" && response.data.data.organ_donor[0].OptionData ) {
                    this.setState({ OptionData: { yes_to_all: response.data.data.organ_donor[0].OptionData } },
                        ()=>{
                            if (response.data.data.organ_donor[0].free_remarks) {
                                var state = this.state.OptionData;
                                state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                this.setState({ OptionData: state } )
                            }
                        })
                }
                if (response.data.data.organ_donor[0].selectedOption == "exclude_some" && response.data.data.organ_donor[0].OptionData ) {
                    let title, titlefromD = response.data.data.organ_donor[0].OptionData, titles =[];
                    if (titlefromD && titlefromD !== "") {
                        title = response.data.data.organ_donor[0].OptionData.split(", ");
                    }
                    else {
                        title = [];
                    }
                    title.map((item) => {
                        titles.push({ value: item, label: item });
                    })
                    this.setState({ exclude_some : titles, OptionData: { exclude_some: response.data.data.organ_donor[0].OptionData } },
                        ()=>{
                            if (response.data.data.organ_donor[0].free_remarks) {
                                var state = this.state.OptionData;
                                state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                this.setState({ OptionData: state } )
                            }
                        })
                }
                if (response.data.data.organ_donor[0].selectedOption == "include_some" && response.data.data.organ_donor[0].OptionData ) { 
                    let title1, titlefromD1 = response.data.data.organ_donor[0].OptionData, titles1 =[];
                    if (titlefromD1 && titlefromD1 !== "") {
                        title1 = response.data.data.organ_donor[0].OptionData.split(", ");
                    }
                    else {
                        title1 = [];
                    }
                    title1.map((item) => {
                        titles1.push({ value: item, label: item });
                    })
                    this.setState({include_some: titles1 , OptionData: { include_some: response.data.data.organ_donor[0].OptionData } },
                        ()=>{
                            if (response.data.data.organ_donor[0].free_remarks) {
                                var state = this.state.OptionData;
                                state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                this.setState({ OptionData: state } )
                            }
                        })
                }
                if (response.data.data.organ_donor[0].selectedOption == "decided_by_following" && response.data.data.organ_donor[0].OptionData ) {
                    let pho = response.data.data.organ_donor[0].OptionData.phone.split("-");
                    if (pho && pho.length > 0) {
                        this.setState({ flag_phone: pho[0] })
                    }
                    this.setState({ OptionData: response.data.data.organ_donor[0].OptionData },
                        ()=>{
                            if (response.data.data.organ_donor[0].free_remarks) {
                                var state = this.state.OptionData;
                                state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                this.setState({ OptionData: state } )
                            }
                        })
                }
            }
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    // fOR update the flag of mobile
    updateFLAG = (str) => {
        var mob = str && str.split("-")
        if (mob && mob.length > 0) {
            if (mob[0] && mob[0].length == 2) {
                return mob[0]
            }
            else { return 'DE' }
        }
    }

    render() {
        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid>
                    {this.state.PassDone && <div className="success_message">The Format is updated</div>}
                    <Grid className="secureChain">
                        <h4>Blockchain secured organ donor pass</h4>
                        <p>Here you can easily select to be an organ donor or not at anytime.</p>
                    </Grid>
                   
                    <Grid className="organDeclare">
                        <h5>In case an organ / tissue of mine is considered to be transplanted after my death, I herewith declare: </h5>
                        <Grid><FormControlLabel value="yes_to_all" name="my_choice" checked={this.state.selectedOption === 'yes_to_all'} onChange={this.handleOptionChange.bind(this)} control={<Radio />} label="Yes, I herewith agree with a transplantation of one or more organ / tissues of mine after doctors have pronounced me dead" /></Grid>
                        <Grid><FormControlLabel value="exclude_some" name="my_choice" checked={this.state.selectedOption === 'exclude_some'} onChange={this.handleOptionChange.bind(this)} control={<Radio />} label="Yes, I allow this except for following organ / tissues:" /></Grid>
                        <Grid item xs={12} md={5} className="donarLang">
                        <label>Organ / Tissues</label>
                        <Grid>
                            <Select
                                name="exclude_some"
                                value={this.state.exclude_some}
                                onChange={(e) => this.handleChange_multi(e, 'exclude_some')}
                                options={this.state.tissue}
                                placeholder=""
                                isSearchable={false}
                                className=""
                                isMulti={true}
                                closeMenuOnSelect={false}
                            />
                        </Grid>
                    </Grid>                     
                        <Grid><FormControlLabel value="yes" value="include_some" name="my_choice" checked={this.state.selectedOption === 'include_some'} onChange={this.handleOptionChange.bind(this)} control={<Radio />} label="Yes, I allow this only for following organ / tissues:" /></Grid>
                        <Grid item xs={12} md={5} className="donarLang">
                        <label>Organ / Tissues</label>
                        <Grid>
                            <Select
                                name="include_some"
                                value={this.state.include_some}
                                onChange={(e) => this.handleChange_multi(e, 'include_some')}
                                options={this.state.tissue}
                                placeholder=""
                                isSearchable={false}
                                className=""
                                isMulti={true}
                                closeMenuOnSelect={false}
                            />
                        </Grid>
                    </Grid>
                    </Grid>
                    
                    <Grid className="organDecide">
                        <Grid><FormControlLabel value="yes" value="not_allowed" name="my_choice" checked={this.state.selectedOption === 'not_allowed'} onChange={this.handleOptionChange.bind(this)} control={<Radio />} label="No, I DO NOT allow a transplantation of any of my organs or tissues" /></Grid>
                        <Grid><FormControlLabel value="yes" value="decided_by_following" color="primary" name="my_choice" checked={this.state.selectedOption === 'decided_by_following'} onChange={this.handleOptionChange.bind(this)} control={<Radio />} label="Yes or No shall be decided by the following person:" /></Grid>
                    </Grid>

                    <Grid>
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item xs={12} md={this.props.comesFrom ? 12 : 6}>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={this.props.comesFrom ? 12 : 6}>
                                        <Grid>
                                            <Grid><label>First name</label></Grid>
                                            <Grid><input type="text" name="first_name" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.first_name}/></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={this.props.comesFrom ? 12 : 6}>
                                        <Grid>
                                            <Grid><label>Last name</label></Grid>
                                            <Grid><input type="text"  name="last_name" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.last_name}/></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={12}>
                                        <Grid>
                                            <Grid><label>Street address</label></Grid>
                                            <Grid><input type="text" name="address" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.address}/></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={7}>
                                        <Grid>
                                            <Grid><label>City</label></Grid>
                                            <Grid><input type="text" name="city" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.city}/></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Grid>
                                            <Grid><label>Postal code</label></Grid>
                                            <Grid><input type="text" name="postal_code" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.postal_code}/></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={12}>
                                        <Grid className="OrganMobile">
                                            <Grid><label>Mobile phone number</label></Grid>
                                            <Grid>
                                            {this.updateFLAG(this.state.OptionData.phone) && this.updateFLAG(this.state.OptionData.phone) !== '' &&
                                                <ReactFlagsSelect placeholder="Country Code" onSelect={(e) => { this.updateFlags(e, 'flag_phone') }} name="flag_phone" showSelectedLabel={false} defaultCountry={this.updateFLAG(this.state.OptionData.phone)} />}
                                            <input type="text"
                                                className="Mobile_extra"
                                                placeholder="phone"
                                                name="phone"
                                                onChange={this.updateEntryState1}
                                                value={this.state.OptionData.phone && this.updateMOBILE(this.state.OptionData.phone)}
                                            />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={12}>
                                        <Grid>
                                            <Grid><label>Free Text</label></Grid>
                                            <input type="text" name="free_remarks" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.free_remarks} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarFormSubmit">
                                    <Grid item xs={12} md={12}>
                                        <Grid><input type="submit" onClick={this.saveUserData} value="Save changes" /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </div>
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