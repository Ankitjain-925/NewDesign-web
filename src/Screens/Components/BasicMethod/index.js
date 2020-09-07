import axios from 'axios';
import sitedata from '../../../sitedata';

//Custom Console So comment only One console works on whole website
export function ConsoleCustom (msg, value){
    console.log(msg , value)
}
//Get Date in dd/mm/yyyy format
export function getDate (date, dateFormat){
    var d = new Date(date);
    var monthNames = ["01", "02", "03", "04", "05", "06",
        "07", "08", "09", "10", "11", "12"],
        month = monthNames[d.getMonth()],
        day = d.getDate(),
        year = d.getFullYear()
    if (day.length < 2) day = '0' + day;
    if(dateFormat === 'YYYY/DD/MM') { return year + ' / ' + day + ' / ' + month; }
    else if(dateFormat === '/DD/MM/YYYY') {  return day + ' / ' + month + ' / ' + year; }
    else { return month + ' / ' + day + ' / ' + year;}
}

//get image url of S3 from the multiple images
export function getImage (image, images) {
    const myFilterData = images && images.length > 0 && images.filter((value, key) =>
        value.image === image);
    if (myFilterData && myFilterData.length > 0) {
        return myFilterData[0].new_image;
    }
}


 //If Req to add doctor as favorite doctor
export function AddFavDoc (doctor_id, profile_id,user_token, user_profile_id){
    axios.put(sitedata.data.path + '/UserProfile/AddFavDoc', {
        doctor: doctor_id,
        profile_id: profile_id,
    }, {
        headers: {
            'token': user_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((responce) => {
        if (responce.data.hassuccessed == true) {
            axios.post(sitedata.data.path + '/UserProfile/AddtoPatientList/'+doctor_id, {
                profile_id: user_profile_id
            }, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {})
        }
    })
}

//Get the link of the Image
export function GetUrlImage (find){
    if(find)
    {
        var find1 = find.split('.com/')[1]
        axios.get(sitedata.data.path + '/aws/sign_s3?find='+find1,)
        .then((response) => {
            if(response.data.hassuccessed) { 
                window.open(response.data.data, '_blank');
            }
        })
    }
}

