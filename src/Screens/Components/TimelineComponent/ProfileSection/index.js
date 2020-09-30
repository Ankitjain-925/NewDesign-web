import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import sitedata from '../../../../sitedata';
import axios from 'axios';
import {ConsoleCustom, getDate} from './../../BasicMethod/index';

class PointPain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadedimage: '',
            loaderImage: false,
            image: '',
            user : this.props.user,
            user_token : this.props.user_token,
            personalinfo:{},
            old_image : this.props.image
        };
    }

    componentDidMount = () => {
      
    }

    //Set the Profile 
    SetImage=(image)=> {
        if(image && image !=='' && image !=='undefined')
        {
            var find1 = image.split('.com/')[1]
            axios.get(sitedata.data.path + '/aws/sign_s3?find='+find1,)
            .then((response) => {
                if(response.data.hassuccessed) { 
                    this.setState({image: response.data.data})
                }
            })
        }
    }

    //On change the User Data
    componentDidUpdate = (prevProps) => {
        if (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user},
               this.SetImage(this.props.user.image))
        }
        if(prevProps.personalinfo !== this.props.personalinfo)
        {
            this.setState({personalinfo: this.props.personalinfo})
        }
    }

    //For Saving the Image
    saveUserData() 
    {
        const user_token = this.state.user_token;
        axios.put(sitedata.data.path + '/UserProfile/Users/updateImage', {
            image: this.state.uploadedimage,
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((responce) => {
            this.props.getData();
            this.setState({ loaderImage: false });
            axios.put('https://api-us.cometchats.io/v2.0/users/' + this.state.personalinfo.info.profile_id.toLowerCase(), {
                avatar: sitedata.data.image_path + this.state.uploadedimage
            },{
                headers: {
                    'appId': '15733dce3a73034',
                    'apiKey': '2f6b4a6b99868d7af0a2964d5f292abbb68e05a7',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }) .then((res) => { })
        })
    }

    //For Upload the User Image 
    UploadFile = (event)=> {
        if (event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/png") {
            this.setState({ loaderImage: true });
            event.preventDefault();
            let file = event.target.files[0];
            let fileParts = event.target.files[0].name.split('.');
            let fileName = fileParts[0];
            let fileType = fileParts[1];
            axios.post(sitedata.data.path + '/aws/sign_s3', {
                fileName: fileName,
                fileType: fileType,
                folders: this.state.user.profile_id + '/',
                bucket: this.state.user.bucket
            }).then(response => {
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var url = returnData.url;
                // Put the fileType in the headers for the upload
                var options = {
                    headers: {
                        'Content-Type': fileType
                    }
                };
                axios.put('https://cors-anywhere.herokuapp.com/' + signedRequest, file, options)
                    .then(result => {
                        this.setState({ uploadedimage: response.data.data.returnData.url + '&bucket=' + this.state.user.bucket, loaderImage: false },
                            () => { this.saveUserData() })
                    }).catch(error => { })
            }).catch(error => { })
        }
        else {
            confirmAlert({
                message: 'Please Upload PNG and JPEG file',
                buttons: [{ label: 'OK',}]
            })
        }
    }

    render() {
        return (
            <Grid className="profileDescp">
                <input type="file" id="getFile" className="FileInptJournal" onChange={this.UploadFile}/>
                {this.state.image && this.state.image!== '' ? 
                <Grid className="myProfile">
                    <a className="profilePic">
                    <label for="getFile"><img src={this.state.image} alt="" titles="" /></label>
                        
                    </a>
                </Grid>:
                <Grid className="myProfile2">
                    <a className="profilePic2">
                        <label for="getFile">
                            <span>Add profile <br /> picture</span>
                            <img src={require('../../../../assets/images/user2.jpg')} alt="" title="" />
                        </label>
                    </a>
                </Grid>
                }
                <Grid className="profileName">
                    <label>{this.state.user.first_name && this.state.user.first_name} {this.state.user.last_name && this.state.user.last_name}</label>
                    {this.state.user.birthday && this.state.user.birthday!== ''? <p>{getDate(this.state.user.birthday, this.state.user_token)} </p> : <p onClick={this.props.MoveProfile}>Complete your profile</p>}
                    <Grid className="profileBtn"><a onClick={this.props.MoveProfile}>My Profile</a></Grid>
                    <Grid>
                        <Grid className="prfilHght">
                            <Grid className="prfilHghtLft">
                                <label>Weight</label>
                                <p>{this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi.weight ? this.state.personalinfo.weight_bmi.weight : '--'}<span>kg</span></p>
                            </Grid>
                            <Grid className="prfilHghtRght">
                                <label>Height</label>
                                <p>{this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi.height ? this.state.personalinfo.weight_bmi.height : '--'}<span>cm</span></p>
                            </Grid>
                        </Grid>
                        <Grid className="prfilHght">
                            <Grid className="prfilHghtLft">
                                <label>BMI</label>
                                {this.state.personalinfo && this.state.personalinfo.weight_bmi ? <p>{(this.state.personalinfo.weight_bmi.weight/(this.state.personalinfo.weight_bmi.height * this.state.personalinfo.weight_bmi.height)*10000).toFixed(2) ==='NaN' ? '--' : (this.state.personalinfo.weight_bmi.weight/(this.state.personalinfo.weight_bmi.height * this.state.personalinfo.weight_bmi.height)*10000).toFixed(2)}</p>:  <p>--</p>}
                            </Grid> 
                            <Grid className="prfilHghtRght">
                                <label>Blood</label>
                                <p>{this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi.blood_group ? this.state.personalinfo.weight_bmi.blood_group : '--'}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default PointPain;



