import axios from 'axios';
import sitedata from '../../../sitedata';
import React, { Component } from 'react';

//Custom Console So comment only One console works on whole website
export function ConsoleCustom (msg, value){
    console.log(msg , value)
}
//Get Date in dd/mm/yyyy format
export function getDate (date, dateFormat){
    if(date === ""){
        return; 
    }
    var d = new Date(date);
    var monthNames = ["01", "02", "03", "04", "05", "06",
        "07", "08", "09", "10", "11", "12"],
        month = monthNames[d.getMonth()],
        day = d.getDate(),
        year = d.getFullYear()
    if (day.length < 2) day = '0' + day;
    if(dateFormat === 'YYYY/DD/MM') { return year + ' / ' + day + ' / ' + month; }
    else if(dateFormat === 'DD/MM/YYYY') {  return day + ' / ' + month + ' / ' + year; }
    else { return month + ' / ' + day + ' / ' + year;}
}

//New Date for Timeline 
export function newdate (date){
    if(date === ""){
        return; 
    }
    var d = new Date(date);
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        month = monthNames[d.getMonth()],
        day = d.getDate();
    if (day.length < 2) day = '0' + day;
    return  <a>{day} <span>{month}</span></a>;  
}

//For getting the time 
export function getTime (date, timeFormat){
        if(timeFormat ==='12')
        {   
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
        else {
            var h = (date.getHours() < 10 ? '0' : '') + date.getHours();
            var m = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            return h + ':' + m;
        } 
    
    
}

//get image url of S3 from the multiple images
export function getImage (image, images) {
    const myFilterData = images && images.length > 0 && images.filter((value, key) =>
        value.image === image);
    if (myFilterData && myFilterData.length > 0) {
        return myFilterData[0].new_image;
    }
}
//Sort the time taken
export function mySorter(a, b) {
    var x = a.value.toLowerCase();
    var y = b.value.toLowerCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

//Sort by entry time
export function SortByEntry(a, b) {
    var x = a.created_on.toLowerCase();
    var y = b.created_on.toLowerCase();
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
}
//Sort by diagnose time
export function SortByDiagnose(a, b) {
    var x = a.datetime_on.toLowerCase();
    var y = b.datetime_on.toLowerCase();
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
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

//For getting doctor speciality
export function getSpec (speciality){
if(speciality){ 
    return speciality.map((obj) => {
        if (typeof obj == 'string') return obj;
        else return obj.label;
}).join(', ')
}
}

export function getReminder(reminder, timeFormat){
    if(reminder && reminder.length>0){
        var data=[];
        reminder.map((itm)=>{
            var date = new Date(itm.value);
            if(timeFormat ==='12')
            {   
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                data.push(strTime);
            }
            else {
                var h = (date.getHours() < 10 ? '0' : '') + date.getHours();
                var m = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
                data.push(h + ':' + m);
            }   
        })
        return data.join(', ');
    }
}

//get desc date
export function getDesc(a, b) {
    var x = a.date;
    var y = b.date;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}