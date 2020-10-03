import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from './../../actions';
import Modal from '@material-ui/core/Modal';
import sitedata from './../../../sitedata';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const createOption = (label) => ({
    label,
    value: label,
});

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addtopatientlist: false,
            searchName: [],
            loaderImage: false,
            UpDataDetails: [],
            inputValue: '',
            value: [],
        };

    }

    //For loggedout if logged in user is deleted 
    componentDidMount() {
        this.props.Settings(this.props.stateLoginValueAim.token);
        this.getUserData();
    }


    getUserData() {
        this.setState({ loaderImage: true, UpDataDetails: [] });
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

            this.setState({ UpDataDetails: response.data.data, city: response.data.data.city, area: response.data.data.area, profile_id: response.data.data.profile_id });


        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    sentmail = () => {
        const { invitation } = this.state

        this.setState({ loaderImage: true, nv: false });
        let user_token = this.props.stateLoginValueAim.token
        axios.post(sitedata.data.path + '/UserProfile/AskPatient1/' + this.state.invitation.emails, {
            email: this.state.invitation.emails,
            message: this.state.invitation.messages,
            first_name: this.state.UpDataDetails.first_name ? this.state.UpDataDetails.first_name : '',
            last_name: this.state.UpDataDetails.last_name ? this.state.UpDataDetails.last_name : '',
            lan: this.props.stateLanguageType
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ loaderImage: false });
            this.setState({ sentmessages: true });
            setTimeout(
                function () {
                    this.setState({ sentmessages: false });
                }
                    .bind(this),
                3000
            );
        })

    }

    validateEmail = (elementValue) => {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }

    invitationState = (e) => {
        var state = this.state.invitation;
        state[e.target.name] = e.target.value;
        this.setState({ invitation: state });
    }

    handleChange = (value, actionMeta) => {
        var state = this.state.invitation;
        if (value) {
            value.map(data => {
                if (state['emails']) state['emails'].push(data.value)
                else state['emails'] = [data.value]
            })
        }
        else {
            state['emails'] = []
        }
        console.log("value", value)
        // if(state['emails']){state['emails'] = value}

        this.setState({ value, invitation: state });
    };

    handleInputChange = (inputValue) => {
        this.setState({ inputValue });
    };

    handleKeyDown = (event) => {
        const { inputValue, value, invitation } = this.state;
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                if (this.validateEmail(inputValue)) {
                    var state = this.state.invitation;
                    if (state['emails']) { state['emails'] = [...state['emails'], ...[inputValue]] }
                    else { state['emails'] = [inputValue] };

                    this.setState({
                        invitation: state,
                        nv: false,
                        inputValue: '',
                        value: [...value, createOption(inputValue)],
                    });
                }
                else {
                    this.setState({ nv: true })
                }
                event.preventDefault();
        }
    };

    handleOpenInvt = () => {
        this.props.handleOpenInvt()
        // this.setState({ openInvt: true });
    };
    handleCloseInvt = () => {
        this.props.handleCloseInvt()
        // this.setState({ openInvt: false });
    };



    render() {
        const { openInvt } = this.props
        const { inputValue, value } = this.state
        return (
            <Grid item xs={12} md={1} className="MenuLeftUpr ">
                <Modal
                    open={openInvt}
                    onClose={this.handleCloseInvt}>
                    <Grid className="invtBoxCntnt">
                        <Grid className="invtCourse">
                            <Grid className="invtCloseBtn">
                                <a onClick={this.handleCloseInvt}>
                                    <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                </a>
                            </Grid>
                            <Grid><label>Invite Doctors to Aimedis</label></Grid>
                            <p>You can enter multiple email addresses and add a personal message</p>
                        </Grid>
                        <Grid className="invitLinkUpr">
                            <Grid className="invitLinkInfo">
                                <Grid><label>Who would you like to invite?</label></Grid>
                                <Grid>
                                    <CreatableSelect
                                        inputValue={inputValue}
                                        isClearable
                                        isMulti
                                        menuIsOpen={false}
                                        onChange={this.handleChange}
                                        onInputChange={this.handleInputChange}
                                        onKeyDown={this.handleKeyDown}
                                        placeholder="Enter Emails..."
                                        value={value}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="invitLinkArea">
                                <Grid><label>Who would you like to invite?</label></Grid>
                                <Grid><textarea
                                    name="messages"
                                    onChange={this.invitationState}
                                ></textarea></Grid>
                            </Grid>
                            <Grid className="invitLinkSub">
                                <input type="submit" value="Send invites" onClick={this.sentmail} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>

            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;

    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));