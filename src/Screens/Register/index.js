import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { LanguageFetchReducer } from '../actions';
import {Redirect, Route} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from '../Login/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import sitedata from '../../sitedata';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import 'react-flags-select/scss/react-flags-select.scss';
import Loader from './../Components/Loader/index';
import '../../assets/css/style_log.css'
import {
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'reactstrap';

import * as translationEN from '../../translations/en';
import * as translationDE from '../../translations/de';
import * as translationES from '../../translations/es';
import * as translationCH from '../../translations/ch';
import * as translationPT from '../../translations/pt';
import contry from './../Components/countryBucket/countries.json';
//Values for the validate Password
var letter = /([a-zA-Z])+([ -~])*/, number = /\d+/, specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; 

class Index extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          hidden: true,
          password: "",
          dropDownValue: 'Select',
          inputEmail: "",
          inputPass: "",
          selectedOption:"",
          userDetails: {},
          successfull: false,
          loaderImage: false,
          current_select :'',
          regisError1: '',
          regisError2:'',
          regisError3:'',
          regisError:'',
          regisError0:'',
          registerMessage :'',
          error_msg:'',
          uploadLicence: {},
          hidden: true,
          hidden_confirm: true,
          fileupods: false,
          FilesUp : []
         
        };
    
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.changeValue = this.changeValue.bind(this);
      }
    
    handlePasswordChange(e) {
    this.setState({ password: e.target.value });
    }
    
    //For validate the email is correct or not
    validateEmail=(elementValue)=>{      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
    } 

    //For login link
    login = ()=>{
    this.props.history.push('/');
    }

    //For save data of user
    saveUserData(){
        this.setState({ regisError  : '',  regisError1 : '', regisError2 : '', regisError3 : '', regisError0 : '', error_msg   : '' })
        if(this.state.userDetails.first_name && this.state.userDetails.last_name && this.state.userDetails.first_name !== '' && this.state.userDetails.last_name !== '' )
        {
            if(this.validateEmail(this.state.userDetails.email)){
                if(this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.match(letter) && this.state.userDetails.password.match(number) && this.state.userDetails.password.match(specialchar))  
                {
                    if(this.state.userDetails.mobile && this.state.userDetails.mobile !== '')
                    {
                        if(this.state.selectedOption !== '')
                        {
                            if(this.state.userDetails.terms_and_conditions){
                                if(this.state.selectedOption =='patient')
                                {
                                    this.setState({loaderImage: true})
                                    if(this.state.userDetails.country_code)
                                    {
                                        var country_code = this.state.userDetails.country_code
                                    }
                                    else
                                    {
                                        var country_code = 'de'
                                    }
                                    var getBucket = contry && contry.length>0 && contry.filter((value, key) =>
                                    value.code === country_code.toUpperCase());
                                    axios.post(sitedata.data.path+'/UserProfile/AddUser/',{
                                        type : this.state.selectedOption,
                                        email : this.state.userDetails.email,
                                        password : this.state.userDetails.password,
                                        country_code: country_code,
                                        mobile: this.state.userDetails.mobile,
                                        is2fa: this.state.userDetails.is2fa,
                                        lan : this.props.stateLanguageType,
                                        first_name : this.state.userDetails.first_name,
                                        last_name : this.state.userDetails.last_name,
                                        bucket : getBucket[0].bucket
                                    })
                                    .then((responce)=>{
                                    this.setState({loaderImage : false})
                                    if (responce.data.hassuccessed === true){
                                        axios.post('https://api-us.cometchat.io/v2.0/users',{
                                            uid        :   responce.data.data.profile_id,
                                            name       :   responce.data.data.profile_id
                                        },
                                        {
                                            headers: {
                                                'appId': '15733dce3a73034',
                                                'apiKey':'2f6b4a6b99868d7af0a2964d5f292abbb68e05a7',
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then((res)=>{ })
                                        
                                            this.setState({ successfull : true })
                                            this.setState({ registerMessage : "You are registered successfully, Please check your email for verification."})
                                        }else{
                                            this.setState({ successfull : false })
                                            this.setState({ error_msg : responce.data.message})
                                        }
                                    })
                                    .catch(err => { })
                                }
                                if(this.state.selectedOption =='pharmacy' || this.state.selectedOption =='nurse' || this.state.selectedOption =='doctor')
                                {
                                    this.setState({loaderImage: true})
                                    if(this.state.userDetails.country_code)
                                    {
                                        var country_code = this.state.userDetails.country_code
                                    }
                                    else
                                    {
                                        var country_code = 'de'
                                    }
                                    var getBucket = contry && contry.length>0 && contry.filter((value, key) =>
                                    value.code === country_code.toUpperCase());
                                    if(this.state.selectedOption =='doctor' ) 
                                    {
                                       this.saveDoctor(country_code);
                                    }
                                    else {
                                        axios.post(sitedata.data.path+'/UserProfile/AddUser/',{
                                            type  : this.state.selectedOption,
                                            email  :  this.state.userDetails.email,
                                            password  : this.state.userDetails.password,
                                            country_code: country_code,
                                            mobile: this.state.userDetails.mobile,
                                            is2fa: this.state.userDetails.is2fa,
                                            lan : this.props.stateLanguageType,
                                            first_name : this.state.userDetails.first_name,
                                            last_name : this.state.userDetails.last_name,
                                            bucket : getBucket[0].bucket
                                        })
                                        .then((responce)=>{
                                        this.setState({loaderImage : false})
                                        if (responce.data.hassuccessed === true){
                                            
                                            if(this.state.selectedOption =='nurse')
                                            {
                                                axios.post('https://api-us.cometchat.io/v2.0/users',{
                                                    uid        :   responce.data.data.profile_id,
                                                    name       :   responce.data.data.profile_id
                                                },
                                                {
                                                    headers: {
                                                        'appId': '15733dce3a73034',
                                                        'apiKey':'2f6b4a6b99868d7af0a2964d5f292abbb68e05a7',
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json'
                                                    }
                                                })
                                                .then((res)=>{ })
                                            }
                                            
                                                this.setState({ successfull : true })
                                                this.setState({ registerMessage : "You are registered successfully, Please check your email for verification."})
                                            }else{
                                                this.setState({ successfull : false })
                                                this.setState({ error_msg : responce.data.message})
                                            }
                                        }) 
                                    }
                                }
                            }
                            else { this.setState({regisError0 : "Please agree to our terms and conditions"}) }
                        }
                        else { this.setState({regisError0 : "Please select user type"}) }
                    }
                    else{ this.setState({regisError0 : "Please fill mobile number"}) }
                }
                else{ this.setState({regisError0 : "Password is not valid"}) }
            }
            else{ this.setState({regisError0 : "E-mail is not valid"}) }
        }
        else{ this.setState({regisError0 : 'Please fill the full name of user'}) }
    } 

    //For the set state of the Registration
    handleChange = (e) => {
        const state = this.state.userDetails
        if (e.target.name === 'terms_and_conditions' || e.target.name === 'license_of_practice', e.target.name === 'is2fa' ){
            state[e.target.name] = e.target.checked; 
        }
        else 
        {
            state[e.target.name] = e.target.value;
        }
        this.setState({ userDetails: state }); 
    }

    //For upload the Doctor Liscence
    UploadFile(event) {
        this.setState({FilesUp : event.target.files})
    }

    //For save the doctor
    saveDoctor = (country_code)=>{
        this.setState({ isfileuploadmulti: true })
        var getBucket = contry && contry.length>0 && contry.filter((value, key) =>
        value.code === country_code.toUpperCase());
       
        for(var i =0 ; i<this.state.FilesUp.length; i++)
        {
            var file = this.state.FilesUp[i];
            let fileParts = this.state.FilesUp[i].name.split('.');
            let fileName = fileParts[0];
            let fileType = fileParts[1];
            axios.post(sitedata.data.path  + '/aws/sign_s3',{
                fileName : fileName,
                fileType : fileType,
                folders: 'registration/',
                bucket : getBucket[0].bucket
            }).then(response => {
                this.setState({  uploadLicence : response.data.data.returnData, fileupods: true });
                setTimeout(()=> {  this.setState({fileupods: false}); }, 3000 )
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var url = returnData.url;
                // Put the fileType in the headers for the upload
                var options = { headers: { 'Content-Type': fileType } };
                axios.put('https://cors-anywhere.herokuapp.com/'+ signedRequest,file,options)
                .then(result => { this.setState({success: true,  loaderImage   : false}); })
                .catch(error => { })
            }).catch(error => { })
        }
        axios.post(sitedata.data.path+'/UserProfile/AddUser/',{
            type        :   this.state.selectedOption,
            email       :   this.state.userDetails.email,
            password    :   this.state.userDetails.password,
            licence     :   this.state.uploadLicence,
            licence_detail : this.state.userDetails.upload_licence,
            country_code:   country_code,
            mobile: this.state.userDetails.mobile,
            is2fa: this.state.userDetails.is2fa,
            lan : this.props.stateLanguageType,
            first_name : this.state.userDetails.first_name,
            last_name : this.state.userDetails.last_name,
            bucket : getBucket[0].bucket
        })
        .then((responce)=>{
        this.setState({loaderImage : false, FilesUp : []})
        if (responce.data.hassuccessed === true){
            axios.post('https://api-us.cometchat.io/v2.0/users',{
                uid        :   responce.data.data.profile_id,
                name       :   responce.data.data.profile_id
            },
            {
                headers: {
                    'appId': '15733dce3a73034',
                    'apiKey':'2f6b4a6b99868d7af0a2964d5f292abbb68e05a7',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=>{})
                this.setState({ successfull : true })
                this.setState({ registerMessage : "You are registered successfully, Please check your email for verification."})
            }else{
                this.setState({ successfull : false })
                this.setState({ error_msg : responce.data.message})
            }
        }) 
    }
    
    //For select the country code Flag
    onSelectFlag=(countryCode)=>{
        const state = this.state.userDetails
        state['country_code'] = countryCode.toLowerCase();
        this.setState({ userDetails: state }); 
    }

    //For show or hide the Password
    toggleShow() {
    this.setState({ hidden: !this.state.hidden });
    }

    changeValue(languageType) {
    this.setState({dropDownValue: languageType});
    this.props.LanguageFetchReducer(languageType);
    }
    
    componentDidMount() {
    if(this.props.stateLanguageType !=='English') {
        this.setState({dropDownValue : this.props.stateLanguageType})
        }
    }

    render() {

        let Register_for_Aimedis, Register_Name, Register_email, Register_Password, 
        Register_Mobilenumber, Register_activate_auth, Register_Accounttype, 
        Register_want_register, Register_Clicking_box, Register_clickingbox, 
        Register_CREATE, Register_havAC, Register_lohinher, Register_Passwordshould, 
        Register_characters, Register_letter, Register_number, Register_special
        ;

        // de => German
        if (this.props.stateLanguageType === 'German') {
            Register_for_Aimedis = translationDE.text.Register_for_Aimedis;
            Register_Name = translationDE.text.Register_Name;
            Register_email = translationDE.text.Register_email;
            Register_Password = translationDE.text.Register_Password;
            Register_Mobilenumber = translationDE.text.Register_Mobilenumber;
            Register_activate_auth = translationDE.text.Register_activate_auth;
            Register_Accounttype = translationDE.text.Register_Accounttype;
            Register_want_register = translationDE.text.Register_want_register;
            Register_Clicking_box = translationDE.text.Register_Clicking_box;
            Register_clickingbox = translationDE.text.Register_clickingbox;
            Register_CREATE = translationDE.text.Register_CREATE;
            Register_havAC = translationDE.text.Register_havAC;
            Register_lohinher = translationDE.text.Register_lohinher;
            Register_Passwordshould = translationDE.text.Register_Passwordshould;
            Register_characters = translationDE.text.Register_characters;
            Register_letter = translationDE.text.Register_letter;
            Register_number = translationDE.text.Register_number;
            Register_special = translationDE.text.Register_special;
        }

       // es => Spanish
        else if (this.props.stateLanguageType === 'Spanish') {
            Register_for_Aimedis = translationES.text.Register_for_Aimedis;
            Register_Name = translationES.text.Register_Name;
            Register_email = translationES.text.Register_email;
            Register_Password = translationES.text.Register_Password;
            Register_Mobilenumber = translationES.text.Register_Mobilenumber;
            Register_activate_auth = translationES.text.Register_activate_auth;
            Register_Accounttype = translationES.text.Register_Accounttype;
            Register_want_register = translationES.text.Register_want_register;
            Register_Clicking_box = translationES.text.Register_Clicking_box;
            Register_clickingbox = translationES.text.Register_clickingbox;
            Register_CREATE = translationES.text.Register_CREATE;
            Register_havAC = translationES.text.Register_havAC;
            Register_lohinher = translationES.text.Register_lohinher;
            Register_Passwordshould = translationES.text.Register_Passwordshould;
            Register_characters = translationES.text.Register_characters;
            Register_letter = translationES.text.Register_letter;
            Register_number = translationES.text.Register_number;
            Register_special = translationES.text.Register_special;
        }

        // ch => Chinese
        else if (this.props.stateLanguageType === 'Chinese') {
            Register_for_Aimedis = translationCH.text.Register_for_Aimedis;
            Register_Name = translationCH.text.Register_Name;
            Register_email = translationCH.text.Register_email;
            Register_Password = translationCH.text.Register_Password;
            Register_Mobilenumber = translationCH.text.Register_Mobilenumber;
            Register_activate_auth = translationCH.text.Register_activate_auth;
            Register_Accounttype = translationCH.text.Register_Accounttype;
            Register_want_register = translationCH.text.Register_want_register;
            Register_Clicking_box = translationCH.text.Register_Clicking_box;
            Register_clickingbox = translationCH.text.Register_clickingbox;
            Register_CREATE = translationCH.text.Register_CREATE;
            Register_havAC = translationCH.text.Register_havAC;
            Register_lohinher = translationCH.text.Register_lohinher;
            Register_Passwordshould = translationCH.text.Register_Passwordshould;
            Register_characters = translationCH.text.Register_characters;
            Register_letter = translationCH.text.Register_letter;
            Register_number = translationCH.text.Register_number;
            Register_special = translationCH.text.Register_special;
        }

         // pt => Portuguese
        else if(this.props.stateLanguageType === 'Portuguese') {
            Register_for_Aimedis = translationPT.text.Register_for_Aimedis;
            Register_Name = translationPT.text.Register_Name;
            Register_email = translationPT.text.Register_email;
            Register_Password = translationPT.text.Register_Password;
            Register_Mobilenumber = translationPT.text.Register_Mobilenumber;
            Register_activate_auth = translationPT.text.Register_activate_auth;
            Register_Accounttype = translationPT.text.Register_Accounttype;
            Register_want_register = translationPT.text.Register_want_register;
            Register_Clicking_box = translationPT.text.Register_Clicking_box;
            Register_clickingbox = translationPT.text.Register_clickingbox;
            Register_CREATE = translationPT.text.Register_CREATE;
            Register_havAC = translationPT.text.Register_havAC;
            Register_lohinher = translationPT.text.Register_lohinher;
            Register_Passwordshould = translationPT.text.Register_Passwordshould;
            Register_characters = translationPT.text.Register_characters;
            Register_letter = translationPT.text.Register_letter;
            Register_number = translationPT.text.Register_number;
            Register_special = translationPT.text.Register_special;
        }
        
        // en => English
        else {
            Register_for_Aimedis = translationEN.text.Register_for_Aimedis;
            Register_Name = translationEN.text.Register_Name;
            Register_email = translationEN.text.Register_email;
            Register_Password = translationEN.text.Register_Password;
            Register_Mobilenumber = translationEN.text.Register_Mobilenumber;
            Register_activate_auth = translationEN.text.Register_activate_auth;
            Register_Accounttype = translationEN.text.Register_Accounttype;
            Register_want_register = translationEN.text.Register_want_register;
            Register_Clicking_box = translationEN.text.Register_Clicking_box;
             Register_clickingbox = translationEN.text.Register_clickingbox;
            Register_CREATE = translationEN.text.Register_CREATE;
            Register_havAC = translationEN.text.Register_havAC;
            Register_lohinher = translationEN.text.Register_lohinher;
            Register_Passwordshould = translationEN.text.Register_Passwordshould;
            Register_characters = translationEN.text.Register_characters;
            Register_letter = translationEN.text.Register_letter;
            Register_number = translationEN.text.Register_number;
            Register_special = translationEN.text.Register_special;

        }

        return (
            <Grid>
                {this.state.loaderImage && <Loader />}
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={11} md={10}>
                        <Grid className="regHead">
                            <Grid container direction="row" justify="center">
                                <Grid item xs={6} sm={6} className="LogoForms">
                                    <a href={sitedata.data.live_site}><img src={require('../../assets/images/logo_new.png')} alt="" title="" /></a>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Grid className="regSelectTop">
                                          <Grid className="changeLang">
                                            <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle nav caret>
                                                {this.state.dropDownValue}
                                                </DropdownToggle>
                                                {/* 
                                                    en => English
                                                    de => German  

                                                */}
                                                <DropdownMenu className="langInerFooter">
                                                    <DropdownItem  onClick={() => { this.changeValue('English') }}><NavLink>English</NavLink></DropdownItem>
                                                    <DropdownItem  onClick={() => { this.changeValue('German') }}><NavLink>German</NavLink></DropdownItem>
                                                    <DropdownItem  onClick={() => { this.changeValue('Chinese') }}><NavLink>Chinese</NavLink></DropdownItem>
                                                    <DropdownItem  onClick={() => { this.changeValue('Portuguese') }}><NavLink>Portuguese</NavLink></DropdownItem>
                                                    <DropdownItem  onClick={() => { this.changeValue('Spanish') }}><NavLink>Spanish</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink>Russian</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink>Swahili</NavLink></DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                         </Grid>   
                                      
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={11} sm={10} md={7}>
                        <Grid className="regData"><h1>{Register_for_Aimedis}</h1></Grid>

                        <Grid className="registerFormMain">
                        <Grid className="registerForm">
                            <div className="err_message">
                                {this.state.regisError  }
                                {this.state.regisError1 }
                                {this.state.regisError2 }
                                {this.state.regisError3 }
                                {this.state.regisError0 }
                                {this.state.error_msg   }
                                {this.state.namevald}
                            </div>
                            <div className="success_message">
                                {this.state.registerMessage }
                            </div>
                            {this.state.fileupods && <div className="success_message">File is uploaded</div>}
                            <Grid className="registerRow">
                                <Grid><label>First Name</label></Grid> 
                                <Grid><input type="text" name = "first_name" onChange = {this.handleChange} /></Grid>
                            </Grid> 

                            <Grid className="registerRow">
                                <Grid><label>Last Name</label></Grid> 
                                <Grid><input type="text" name = "last_name" onChange = {this.handleChange} /></Grid>
                            </Grid> 

                            <Grid className="registerRow">
                                <Grid><label>{Register_email}</label></Grid> 
                                <Grid><input type="text" name = "email" onChange = {this.handleChange} /></Grid>
                            </Grid> 

                            <Grid className="registerRow passInstMain">
                                <Grid><label>{Register_Password}</label></Grid> 
                                <Grid className="registerPass">
                                    <input
                                        type={this.state.hidden ? "password" : "text"}
                                        name="password"
                                        onChange = {this.handleChange}
                                    />    
                                    { this.state.hidden &&
                                      <a onClick={this.toggleShow}>
                                         <img src={require('../../assets/images/showeye.svg')} alt="" title="" />
                                      </a>
                                    }     
                                    { !(this.state.hidden) &&
                                      <a onClick={this.toggleShow}>
                                         <img src={require('../../assets/images/hide.svg')} alt="" title="" />
                                      </a>
                                    } 
                                </Grid>
                                {this.state.userDetails && this.state.userDetails.password ?
                                <div className="passInst">
                                 <div className="passInstIner">
                                    <p>{Register_Passwordshould}</p>
                                    <img src={require('../../assets/images/passArrow.png')} alt="" title="" className="passArow" />
                                    <ul>
                                        <li>{this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.length>8 && <a><img src={require('../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_characters}</a>}
                                        {this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.length<=8 && <a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_characters}</a>}
                                        </li>
                                        <li>{this.state.userDetails && this.state.userDetails.password &&  !this.state.userDetails.password.match(letter) && <a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_letter}</a>}
                                        {this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.match(letter) && <a><img src={require('../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_letter}</a>}
                                        </li>
                                        <li>{this.state.userDetails && this.state.userDetails.password && !this.state.userDetails.password.match(number) && <a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_number}</a>}
                                        {this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.match(number) && <a><img src={require('../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_number}</a>}
                                        </li>
                                        <li>
                                        {this.state.userDetails && this.state.userDetails.password && !this.state.userDetails.password.match(specialchar) && <a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_special}</a>}
                                        {this.state.userDetails && this.state.userDetails.password && this.state.userDetails.password.match(specialchar) && <a><img src={require('../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_special}</a>}
                                        </li>
                                    </ul>
                                   </div> 
                                </div>
                                : <div className="passInst">
                                <div className="passInstIner">
                                   <p>Password should contain at least:</p>
                                   <img src={require('../../assets/images/passArrow.png')} alt="" title="" className="passArow" />
                                   <ul>
                                       <li><a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />8 characters</a></li>
                                       <li><a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />1 letter</a></li>
                                       <li><a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />1 number</a></li>
                                       <li><a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />1 special character</a></li>
                                   </ul>
                                  </div> 
                               </div>}

                            </Grid> 

                            <Grid className="registerRow regMobNum">
                                <Grid><label>{Register_Mobilenumber}</label></Grid>
                                <Grid>
                                    {/* <PhoneInput
                                        enableAreaCodes={true}
                                        country={'us'}
                                        value={this.state.phone}
                                        onChange={phone => this.setState({ phone })}
                                    //enableSearch={true}
                                    /> */}
                                     <ReactFlagsSelect  placeholder = "Country Code"  name = "country_code" onSelect={this.onSelectFlag} showSelectedLabel={false} defaultCountry="DE" />
                                     <input type="text" className ="mobileReg" type="number" name = "mobile" onChange = {this.handleChange} />
                                </Grid>
                                <FormControlLabel className="regMob"
                                    control={ <Checkbox value="checkedA" onChange={this.handleChange}
                                    name= "is2fa"/> }
                                    label={Register_activate_auth}
                                />
                            </Grid>
                            {this.state.selectedOption == 'doctor' &&
                                <Grid item xs={12} sm={12} className="common_name_v2_reg">
                                    <label for="UploadDocument"> Click here to upload your license  <img src={require('../../assets/images/links.png')}  alt=""  title="" className="link_docs" /></label>
                                    <input type="file" style={{ display: 'none' }} id="UploadDocument" name="UploadDocument" onChange={this.UploadFile} onChange={(e) => this.UploadFile(e)} multiple />
                                </Grid>
                            }
                            <Grid className="registerRow accountTyp">
                                 <Grid><label>{Register_Accounttype}</label></Grid>
                                 <Grid className="acPatient">
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Grid item xs={11} sm={6} md={6}>  
                                            <Grid className={this.state.selectedOption==='patient' ? 'acPatientIner' : 'acPatientIner onProfessional'}><a onClick={()=>{this.setState({selectedOption: 'patient'})}}>Patient</a></Grid>
                                        </Grid>
                                        <Grid item xs={11} sm={6} md={6}>
                                          
                                            <Grid className={this.state.selectedOption==='patient' ? "acType" : "acType ProfSelect"}>
                                            <UncontrolledDropdown nav inNavbar >
                                                <DropdownToggle nav caret>
                                                <a>{this.state.selectedOption === '' || this.state.selectedOption ==='patient'  ? 'Professional' : this.state.selectedOption.charAt(0).toUpperCase() + this.state.selectedOption.slice(1) }</a>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={()=>{this.setState({selectedOption: ''})}}><NavLink>Professional</NavLink></DropdownItem>
                                                    <DropdownItem onClick={()=>{this.setState({selectedOption: 'doctor'})}}><NavLink>Doctor</NavLink></DropdownItem>
                                                    <DropdownItem onClick={()=>{this.setState({selectedOption: 'nurse'})}}><NavLink>Nurse</NavLink></DropdownItem>
                                                    <DropdownItem onClick={()=>{this.setState({selectedOption: 'pharmacy'})}}><NavLink>Pharmacist</NavLink></DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                         </Grid>  
                                        </Grid>
                                    </Grid>
                                 </Grid>
                            </Grid>

                            <Grid className="registerRow">
                                <FormControlLabel className="regMob"
                                    control={ <Checkbox value="checkedA" name= "Aimedis_health_newletter" onChange={this.handleChange} /> }
                                    label={Register_want_register}
                                />
                            </Grid> 

                            <Grid className="registerRow">
                                <FormControlLabel className="regMob"
                                    control={ <Checkbox value="checkedA" onChange={this.handleChange}
                                    name= "terms_and_conditions" /> }
                                    label={Register_Clicking_box}
                                />
                            </Grid>
                            { this.state.selectedOption !== 'patient' &&
                            <Grid className="registerRow">
                                <FormControlLabel className="regMob"
                                    control={ <Checkbox value="checkedA" onChange={this.handleChange} 
                                    name = "license_of_practice"/> }
                                    label={Register_clickingbox}
                                />
                            </Grid> 
                            }
                            <Grid className="registerRow">
                               <Grid className="regCrtAc">
                                   <input type="submit" value={Register_CREATE} onClick={this.saveUserData.bind(this)}/>
                               </Grid>    
                            </Grid>

                            <Grid className="havAC">
                                <p>{Register_havAC} <a onClick={this.login}>{Register_lohinher}</a></p>
                            </Grid>   

                        </Grid>    

                        </Grid>

                    </Grid>
                </Grid>
                {/* <Grid className="regFooter"><Footer /></Grid>   */}
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {

    const { stateLoginValueAim , loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    
     return {
       stateLanguageType,
       stateLoginValueAim,
       loadingaIndicatoranswerdetail,
       
      }
  };
  
  
export default connect(mapStateToProps,{ LoginReducerAim ,LanguageFetchReducer})(Index)
// export default Index;