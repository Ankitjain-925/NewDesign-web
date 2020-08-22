import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Toggle from 'react-toggle';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import { LanguageFetchReducer } from './../../actions';
import Loader from './../../Components/Loader/index';
import sitedata from '../../../sitedata';
import "react-toggle/style.css";

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaderImage: false,
            paid_services :[],
            firstServiceData :{},
            secondServiceData :{},
            firstActive : false,
            secondActive : false,
            activated : false,
            deactivated : false,
        };
        // new Timer(this.logOutClick.bind(this))
      }
    
    componentDidMount(){
        // new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        this.getUserData();
    }

    fromDollarToCent = (amount) => {return parseInt(amount * 100);}
    fromEuroToCent = (amount) => { return parseInt(amount * 100);}
    successPayment = (data) => {
        this.setState({activated: true})
        setTimeout(()=>{this.setState({activated: false})}, 5000)
        this.getUserData()
    };

    errorPayment = (data) => {
        this.getUserData();
    };

    // onToken = (amount, description  )=> token =>{
    //     const user_token = this.props.stateLoginValueAim.token;
    //     axios.post(sitedata.data.path+'/stripeCheckout',{
    //         description,
    //         source: token.id,
    //         currency: CURRENCY,
    //         amount: this.fromEuroToCent(amount)
    //     },{headers:{
    //         'token': user_token,
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }})
    //     .then(this.successPayment)
    //     .catch(this.errorPayment);
    // };
    onToken = ( description) =>{
        const user_token = this.props.stateLoginValueAim.token;
        axios.put(sitedata.data.path+'/UserProfile/Bookservice',{
            description
        },{headers:{
            'token': user_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(this.successPayment)
        .catch(this.errorPayment);
    };

    Deactivate =(desc)=>{
        this.setState({loaderImage: true})
        axios.delete(sitedata.data.path+'/UserProfile/Bookservice/'+desc,
        {headers:{
            'token': this.props.stateLoginValueAim.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}).then((responce)=>{
            if(responce.data.hassuccessed)
            {
                if(desc === "Doc Around The Clock"){
                    this.setState({firstActive : false,deactivated: true})
                }
                if(desc === "Data services"){
                    this.setState({secondActive :  false,deactivated: true})
                }
                setTimeout(()=>{this.setState({deactivated : false})}, 5000)
            }
            this.setState({loaderImage: false})
            this.getUserData();
        })
    }

    getUserData(){
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/'+user_id, {headers:{
            'token': user_token,
			'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}).then((response) =>{
            if(response.data.data.paid_services){
                this.setState({paid_services:response.data.data.paid_services,firstServiceData : {}, secondServiceData : {} })
                for(let i= 0 ; i<this.state.paid_services.length;i++){
                    if(this.state.paid_services[i].description == "Doc Around The Clock"){
                        this.setState({ firstServiceData : this.state.paid_services[i], firstActive :true })
                    }
                    if(this.state.paid_services[i].description == "Data services"){
                        this.setState({ secondServiceData : this.state.paid_services[i], secondActive : true })
                    }
                }
            }
            this.setState({ loaderImage: false });
            }).catch((error) => {
                this.setState({ loaderImage: false });
        });
    }
    render() {
        return (
            <Grid className="homeBg">
                {this.state.loaderImage && <Loader />}
                <Grid container direction="row" justify="center">
                    <Grid item xs={11} md={12}>
                        <Grid container direction="row">

                            {/* Website Menu */}
                            <LeftMenu currentPage ="more"/>
                            {/* End of Website Menu */}

                            {/* Website Mid Content */}
                            <Grid item xs={12} md={11}>
                                <Grid className="extraSrvcUpr">
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={10}>
                                            <Grid className="extraSrvc">
                                                <h1>Extra Services</h1>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid className="actvMain">
                                        <h2>Activated</h2>
                                        <Grid container direction="row" spacing="3">
                                            {this.state.firstServiceData && this.state.firstServiceData.created && 
                                            <Grid item xs={12} md={3}>
                                                <Grid className="docArundUpr">
                                                    <Grid className="docArund">
                                                        <Grid><img src={require('../../../assets/images/24.svg')} alt="" title="" /></Grid>
                                                        <Grid><label>Doc Around the Clock</label></Grid>
                                                        <Grid><p>Contact the Aimedis medical team 24 / 7 for questions</p></Grid>
                                                    </Grid>
                                                    <Grid className="srvcActiv">
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <Grid item xs={12} md={9}>
                                                                <p>Service activated on <span>{this.state.firstServiceData.created}</span></p>
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <Grid className="acvtTogle">
                                                                    <label><Toggle icons={false} checked={this.state.firstActive} onClick={()=> this.Deactivate('Doc Around The Clock')}/></label>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>}

                                            {this.state.secondServiceData && this.state.secondServiceData.created && 
                                            <Grid item xs={12} md={3}>
                                                <Grid className="docArundUpr">
                                                    <Grid className="docArund">
                                                    <Grid className="dataSrvcImg"><img src={require('../../../assets/images/dataSrvc.png')} alt="" title="" /></Grid>
                                                        <Grid><label>Data Services</label></Grid>
                                                        <Grid><p>Stay up to date and let Aimedis organize your medical data</p></Grid>
                                                    </Grid>
                                                    <Grid className="srvcActiv">
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <Grid item xs={12} md={9}>
                                                                <p>Service activated on <span>{this.state.firstServiceData.created}</span></p>
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <Grid className="acvtTogle">
                                                                    <label><Toggle icons={false} checked={this.state.secondActive}  onClick={()=> this.Deactivate('Data services')}/></label>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>}
                                        </Grid>
                                    </Grid>

                                    <Grid className="actvMain">
                                        <h2>Available</h2>
                                        <Grid container direction="row" spacing="3">

                                           {!this.state.firstServiceData || !this.state.firstServiceData.created && 
                                            <Grid item xs={12} md={3}>
                                                <Grid className="docArundUpr">
                                                    <Grid className="docArund">
                                                        <Grid><img src={require('../../../assets/images/24.svg')} alt="" title="" /></Grid>
                                                        <Grid><label>Doc Around the Clock</label></Grid>
                                                        <Grid><p>Contact the Aimedis medical team 24 / 7 for questions</p></Grid>
                                                    </Grid>
                                                    <Grid className="srvcActiv">
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <Grid item xs={12} md={9}>
                                                                <p>Activate Service </p>
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <Grid className="acvtTogle">
                                                                    <label><Toggle icons={false} onClick={()=>this.onToken( 'Doc Around The Clock')}/></label>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>}

                                            {!this.state.secondServiceData || !this.state.secondServiceData.created && 
                                            <Grid item xs={12} md={3}>
                                                <Grid className="docArundUpr">
                                                    <Grid className="docArund">
                                                    <Grid className="dataSrvcImg"><img src={require('../../../assets/images/dataSrvc.png')} alt="" title="" /></Grid>
                                                        <Grid><label>Data Services</label></Grid>
                                                        <Grid><p>Stay up to date and let Aimedis organize your medical data</p></Grid>
                                                    </Grid>
                                                    <Grid className="srvcActiv">
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <Grid item xs={12} md={9}>
                                                                <p>Activate service </p>
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <Grid className="acvtTogle">
                                                                    <label><Toggle icons={false} onClick={()=>this.onToken( 'Data services')}/></label>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>}
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                            {/* End of Website Right Content */}

                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
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