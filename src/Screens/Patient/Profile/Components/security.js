/*global google*/

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from '../../../../sitedata';
import axios from 'axios';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
           Current_state : this.props.LoggedInUser,
           Password: {},
           is2fa : this.props.LoggedInUser.is2fa,
           is2faDone : false,
           PassDone : false,
           notmatch : false,
        };
    }

    //For Change Password State
    ChangePass=(e)=>{
        const state = this.state.Password;
        state[e.target.name] = e.target.value;
        this.setState({ Password: state }, ()=>{ 
            console.log('fgdfgd', this.state.Current_state.password)
            if(this.state.Current_state.password !== this.state.Password.current_pass ) { this.setState({notmatch : true}) }
            else { this.setState({notmatch : false}
            )} 
        });
    }

    //For Change Password
    ChangePassword=()=>{
        if(!this.state.notmatch)
        {
            if(this.state.Password.new_pass !=='' && this.state.Password.new_pass === this.state.Password.new_pass_comfirm)
            {
                this.setState({notmatchCon : false})
                axios.put(sitedata.data.path + '/UserProfile/Users/update', {
                    password: this.state.Password.new_pass,
                }, {
                    headers: {
                        'token': this.props.user_token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((responce) => {
                    this.setState({PassDone : true})
                    setTimeout(()=>{ this.setState({PassDone: false}) }, 3000)
                })
            }
            else
            {
                this.setState({notmatchCon : true})
            }
        }   
    }
    // saveUserData = () => {
    //     if (this.state.insuranceDetails.insurance !== "" && this.state.insuranceDetails.insurance_number !== ""
    //         && this.state.insuranceDetails.insurance_country !== "") {
    //         if (datas.some(data => data.insurance === this.state.insuranceDetails.insurance)) { }
    //         else {
    //             datas.push(this.state.insuranceDetails)
    //             this.setState({ insurancefull: datas })
    //         }
    //     }
    //     if (this.state.flag_emergency_number && this.state.flag_emergency_number === '' && this.state.flag_emergency_number === 'undefined') {
    //         this.setState({ flag_emergency_number: 'DE' })
    //     }
    //     if (this.state.flag_mobile && this.state.flag_mobile === '' && this.state.flag_mobile === 'undefined') {
    //         this.setState({ flag_mobile: 'DE' })
    //     }
    //     if (this.state.flag_phone && this.state.flag_phone === '' && this.state.flag_phone === 'undefined') {
    //         this.setState({ flag_phone: 'DE' })
    //     }
    //     if (this.state.flag_fax && this.state.flag_fax === '' && this.state.flag_fax === 'undefined') {
    //         this.setState({ flag_fax: 'DE' })
    //     }
    //     this.setState({ loaderImage: true });
    //     this.setState({ regisError1: "" })
    //     this.setState({ regisError2: "" })
    //     const user_token = this.props.stateLoginValueAim.token;
    //     this.setState({ insuranceDetails: { insurance: '', insurance_number: '', insurance_country: '' } })
    //     if (this.state.passwordDetails.password == this.state.passwordDetails.confirm_password) {
    //         this.setState({ error3: false })
    //         var parent_id = this.state.UpDataDetails.parent_id ? this.state.UpDataDetails.parent_id : '0';
    //         axios.put(sitedata.data.path + '/UserProfile/Users/update', {
    //             type: 'patient',
    //             pin: this.state.UpDataDetails.pin,
    //             first_name: this.state.UpDataDetails.first_name,
    //             last_name: this.state.UpDataDetails.last_name,
    //             nick_name: this.state.UpDataDetails.nick_name,
    //             title: this.state.UpDataDetails.title,
    //             birthday: this.state.UpDataDetails.birthday,
    //             language: this.state.UpDataDetails.language,
    //             speciality: this.state.speciality_multi,
    //             phone: this.state.UpDataDetails.phone,
    //             mobile: this.state.UpDataDetails.mobile,
    //             fax: this.state.UpDataDetails.fax,
    //             website: this.state.UpDataDetails.website,
    //             email: this.state.UpDataDetails.email,
    //             password: this.state.UpDataDetails.password,
    //             sex: this.state.UpDataDetails.sex,
    //             street: this.state.UpDataDetails.street,
    //             city: this.state.city,
    //             area: this.state.area,
    //             address: this.state.UpDataDetails.address,
    //             emergency_contact_name: this.state.UpDataDetails.emergency_contact_name,
    //             emergency_email: this.state.UpDataDetails.emergency_email,
    //             emergency_number: this.state.UpDataDetails.emergency_number,
    //             family_doc: this.state.UpDataDetails.family_doc,
    //             insurance: datas,
    //             is2fa: this.state.UpDataDetails.is2fa,
    //             country: this.state.UpDataDetails.country,
    //             pastal_code: this.state.UpDataDetails.pastal_code,

    //         }, {
    //             headers: {
    //                 'token': user_token,
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //             .then((responce) => {
    //                 this.setState({ regisError2: responce.data.message, insuranceDetails: { insurance: '', insurance_number: '', insurance_country: '' } })
    //                 this.setState({ loaderImage: false });
    //                 this.getUserData();
    //                 axios.put('https://api-us.cometchat.io/v2.0/users/' + this.state.profile_id.toLowerCase(), {
    //                     name: this.state.UpDataDetails.first_name + ' ' + this.state.UpDataDetails.last_name
    //                 },
    //                     {
    //                         headers: {
    //                             'appId': '15733dce3a73034',
    //                             'apiKey': '2f6b4a6b99868d7af0a2964d5f292abbb68e05a7',
    //                             'Accept': 'application/json',
    //                             'Content-Type': 'application/json'
    //                         }
    //                     })
    //                     .then((res) => {
    //                         console.log('is2fa Updated')
    //                     })

    //             })
    //     } else {
    //         this.setState({ error3: true })
    //         this.setState({ loaderImage: false });
    //     }
    // }

    // for Enable/Disable 2fa
    Change2fa=()=>{
        this.setState({is2fa : !this.state.is2fa},
        ()=>{
            axios.put(sitedata.data.path + '/UserProfile/Users/update', {
                is2fa: this.state.is2fa,
            }, {
                headers: {
                    'token': this.props.user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                this.setState({is2faDone : true})
                setTimeout(()=>{ this.setState({is2faDone: false}) }, 3000)
            })
        })
    }
    render() {
        return (
            <div>
                {this.state.PassDone && <div className="success_message">Password is changed</div>}
                {this.state.notmatchCon && <div className="err_message">New password and confirmed password is not same</div>}
                {this.state.notmatch && <div className="err_message">Current password is not matching</div>}
                {this.state.is2faDone && <div className="success_message">2- Factor authentication {this.state.is2fa ? 'enabled' : 'disabled'}</div>}
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Grid className="chngPasswrd">
                            <h2>Change password</h2>
                            <p>Supportive text like this can be added if needed.</p>
                        </Grid>
                        <Grid className="genPass">
                            <Grid className="genPassInr">
                                <label>Current password</label>
                                <Grid><input type="password" name="current_pass" onChange={this.ChangePass}/></Grid>
                            </Grid>
                            <Grid className="genPassInr">
                                <label>New password</label>
                                <Grid><input type="password" name="new_pass" onChange={this.ChangePass}/></Grid>
                            </Grid>
                            <Grid className="genPassInr">
                                <label>Confirm new password</label>
                                <Grid><input type="password" name="new_pass_comfirm" onChange={this.ChangePass}/></Grid>
                            </Grid>
                            <Grid className="genPassInr">
                                <Grid><input type="submit" value="Change password" onClick={this.ChangePassword}/></Grid>
                            </Grid>
                        </Grid>
                        <Grid className="twofactorAuth">
                            <Grid className="factorAuth">
                                <h3>2-factor authentication</h3>
                                <p>We use <span>Authy</span> for you to be able to secure your account even more.</p>
                            </Grid>
                            <Grid className="factorAuthEnbl">
                                <h4>{this.state.is2fa && <img src={require('../../../../assets/images/watched.svg')} alt="" title="" />} 2-factor authentication is {this.state.is2fa ? 'enabled' : 'disabled'}</h4>
                                <Grid><input type="submit" onClick={this.Change2fa} value={this.state.is2fa? 'Disable 2-factor authentication' : 'Enable 2-factor authentication'} /></Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} md={7}></Grid>
                </Grid>
            </div>
        );
    }
}

export default Index;