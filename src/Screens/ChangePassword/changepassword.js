import React, { Component } from 'react';
import { LanguageFetchReducer } from '../actions';
import {Redirect, Route} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from '../Login/actions';
import Grid from '@material-ui/core/Grid';
import {authy} from '../Login/authy.js';
import queryString from 'query-string';
import {
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import sitedata from '../../sitedata';

import * as translationEN from '../../translations/en';
import * as translationDE from '../../translations/de';
import * as translationES from '../../translations/es';
import * as translationCH from '../../translations/ch';
import * as translationPT from '../../translations/pt';

const path = sitedata.data.path + '/UserProfile';
var letter = /([a-zA-Z])+([ -~])*/, number = /\d+/, specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; 


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            password: "",
            dropDownValue: 'Select',
            inputEmail : "",
            inputPass  : "",
            show       : false,
            myLogin    : false,
            weoffer    : [],
            loginError : false,
            logintoken :'',
            anotherlogin : false,
            loggedIn: false,
            loginError2 : false,
            loginError9 : false,
            regisError0 : ''
        };
      
    }
    handleChange=(input, value) =>{
        this.setState({
          [input]: value,
          errorMsg : '',
          });
      }
      componentDidMount = () =>{
        
      }
      redirectPage(){
        this.props.history.push('/');
      }
    
      BtnSubmit=() =>{
        let password_valid, auth_error, pass_change;
        let password = this.state.inputPass;
        if(this.state.userDetails.password.match(letter) && this.state.userDetails.password.match(number) && this.state.userDetails.password.match(specialchar))
        {
      this.setState({
          passError: false,
          errorMsg : '',
           regisError0 : '' 
         });
         const values = queryString.parse(this.props.location.search);
         const user_token = values.token;
         if(user_token){    
          axios.put(path+'/setpassword?password='+password,{},
              {headers:{
                  'token': user_token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }}
              ).then((response) =>{
                  if(response.data.msg === 'Password is updated'){
                        this.setState({
                          successMsg: true,
                          successMsgText : "Password has been changed.",
                          inputPass:''
                        });
                      setTimeout(
                          function() {
                          this.redirectPage();
                          }
                          .bind(this),
                          3000
                      );
                  }
                  else{
                  
                      this.setState({
                          passError: true,
                          errorMsg : 'Authentication required.',
                      });
                  }
              }).catch((error) => {
             
              this.setState({
                  passError: true,
                  errorMsg : 'Authentication required.',
              });
              setTimeout(
              function() {
                  this.redirectPage();
                  }
                  .bind(this),
                  3000
              );
              });
         }
      }
      else {
        this.setState({regisError0 : "Password is not valid"})
      }    
    }
    toggleShow= ()=> {
        this.setState({ hidden: !this.state.hidden });
      }
   
    render() {
        const { stateLoginValueAim } = this.props;
        const { myLogin } = this.state;
        if(stateLoginValueAim.token !== 450 && this.props.verifyCode.code){
            return (<Redirect to={'/'} />);
        }

        let  Register_Passwordshould, 
        Register_characters, Register_letter, Register_number, Register_special
        ;

        // de => German
        if (this.props.stateLanguageType === 'German') {
            
            Register_Passwordshould = translationDE.text.Register_Passwordshould;
            Register_characters = translationDE.text.Register_characters;
            Register_letter = translationDE.text.Register_letter;
            Register_number = translationDE.text.Register_number;
            Register_special = translationDE.text.Register_special;
        }

       // es => Spanish
        else if (this.props.stateLanguageType === 'Spanish') {
            Register_Passwordshould = translationES.text.Register_Passwordshould;
            Register_characters = translationES.text.Register_characters;
            Register_letter = translationES.text.Register_letter;
            Register_number = translationES.text.Register_number;
            Register_special = translationES.text.Register_special;
        }

        // ch => Chinese
        else if (this.props.stateLanguageType === 'Chinese') {
            Register_Passwordshould = translationCH.text.Register_Passwordshould;
            Register_characters = translationCH.text.Register_characters;
            Register_letter = translationCH.text.Register_letter;
            Register_number = translationCH.text.Register_number;
            Register_special = translationCH.text.Register_special;
        }

         // pt => Portuguese
        else if(this.props.stateLanguageType === 'Portuguese') {
            Register_Passwordshould = translationPT.text.Register_Passwordshould;
            Register_characters = translationPT.text.Register_characters;
            Register_letter = translationPT.text.Register_letter;
            Register_number = translationPT.text.Register_number;
            Register_special = translationPT.text.Register_special;
        }
        
        // en => English
        else {
            Register_Passwordshould = translationEN.text.Register_Passwordshould;
            Register_characters = translationEN.text.Register_characters;
            Register_letter = translationEN.text.Register_letter;
            Register_number = translationEN.text.Register_number;
            Register_special = translationEN.text.Register_special;

        }

        return (
            <Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={11} md={10}>
                        <Grid className="regHead">
                            <Grid container direction="row" justify="center">
                                <Grid item xs={6} sm={6} className="LogoForms">
                                    <a><img src={require('../../assets/images/logo_new.png')} alt="" title="" /></a>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Grid className="regSelectTop">
                                        <Grid className="changeLang">
                                            <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle nav caret>
                                                    {this.state.dropDownValue}
                                                </DropdownToggle>
                                                <DropdownMenu className="changeLangIner">
                                                    <DropdownItem><NavLink>Nederlands - NL</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink>German (Deutsch)</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink>Chinese</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink>Portuguese (Portugues)</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink>Spanish (Espanol)</NavLink></DropdownItem>
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
                
                    <Grid item xs={11} sm={7} md={7}>
                       
                        <Grid className="logData">
                            <h1>Password Reset</h1>
                        </Grid>
                        <Grid className="logFormMain">
                            <Grid className="logForm">
                            <div className="err_message">
                                { this.state.errorMsg }
                                {this.state.regisError0 }
                                {this.state.passwordValid === false ? "Password must be have Capital letter and numeric value and more than 6 character" : ''}
                            </div>
                            {this.state.successMsg && this.state.successMsgText &&
                              <div className="success_message">{this.state.successMsgText }</div>}
                                 <Grid className="registerRow passInstMain">
                                <Grid><label>Password</label></Grid> 
                                <Grid className="registerPass">
                                    <input
                                        type={this.state.hidden ? "password" : "text"}
                                        value={this.state.inputPass} onChange={e => this.handleChange('inputPass', e.target.value)}
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
                                {this.state.inputPass ?
                                <div className="passInst">
                                 <div className="passInstIner">
                                    <p>{Register_Passwordshould}</p>
                                    <img src={require('../../assets/images/passArrow.png')} alt="" title="" className="passArow" />
                                    <ul>
                                        <li>{this.state.inputPass && this.state.inputPass.length>8 && <a><img src={require('../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_characters}</a>}
                                        {this.state.inputPass && this.state.inputPass.length<=8 && <a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_characters}</a>}
                                        </li>
                                        <li>{ this.state.inputPass &&  !this.state.inputPass.match(letter) && <a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_letter}</a>}
                                        { this.state.inputPass && this.state.inputPass.match(letter) && <a><img src={require('../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_letter}</a>}
                                        </li>
                                        <li>{ this.state.inputPass && !this.state.inputPass.match(number) && <a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_number}</a>}
                                        { this.state.inputPass && this.state.inputPass.match(number) && <a><img src={require('../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_number}</a>}
                                        </li>
                                        <li>
                                        { this.state.inputPass && !this.state.inputPass.match(specialchar) && <a><img src={require('../../assets/images/CloseCircle.svg')} alt="" title="" />{Register_special}</a>}
                                        { this.state.inputPass && this.state.inputPass.match(specialchar) && <a><img src={require('../../assets/images/CheckCircle.svg')} alt="" title="" />{Register_special}</a>}
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
                                 
                                {/* <Grid className="logRow">
                                    <Grid><label>Password</label></Grid>
                                    <Grid><input type="password" 
                                     value={this.state.inputPass} onChange={e => this.handleChange('inputPass', e.target.value)}/></Grid>
                                </Grid> */}
                                
                                <Grid className="logRow">
                                    <Grid className="regCrtAc">
                                       <input type="submit" value="Forgot Password" onClick={this.BtnSubmit.bind(this)}/>
                                    </Grid >
                                </Grid>
                            </Grid>
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
    const {verifyCode } = state.authy;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        verifyCode
    }
};

export default connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, authy })(Index)
// export default Index;