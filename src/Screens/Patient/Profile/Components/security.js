import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from '../../../../sitedata';
import axios from 'axios';
import Loader from './../../../Components/Loader/index';

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
           loaderImage : false,
        };
    }

    //For Change Password State
    ChangePass=(e)=>{
        const state = this.state.Password;
        state[e.target.name] = e.target.value;
        this.setState({ Password: state }, ()=>{ 
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
                this.setState({notmatchCon : false, loaderImage: true})
                axios.put(sitedata.data.path + '/UserProfile/Users/update', {
                    password: this.state.Password.new_pass,
                }, {
                    headers: {
                        'token': this.props.user_token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((responce) => {
                    this.setState({PassDone : true, loaderImage : false})
                    setTimeout(()=>{ this.setState({PassDone: false}) }, 5000)
                })
            }
            else
            {
                this.setState({notmatchCon : true})
            }
        }   
    }

    // for Enable/Disable 2fa
    Change2fa=()=>{
        this.setState({is2fa : !this.state.is2fa},
        ()=>{
            this.setState({loaderImage: true})
            axios.put(sitedata.data.path + '/UserProfile/Users/update', {
                is2fa: this.state.is2fa,
            }, {
                headers: {
                    'token': this.props.user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                this.setState({is2faDone : true, loaderImage: false})
                setTimeout(()=>{ this.setState({is2faDone: false}) }, 5000)
            })
        })
    }
    render() {
        return (
            <div>
                {this.state.loaderImage && <Loader />}
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