
import {GET_DoctorArray_REQUEST , GET_DoctorArray_SUCCESS, GET_DoctorArray_ERROR} from '../../actiontypes';
import sitedata from '../../sitedata.js';
import axios from "axios";

export const Doctorarrays = (type, user, token) => {
    return (dispatch) => {
        var doctorArray = ['admin'];
        let user_token = token
        dispatch({ type: GET_DoctorArray_REQUEST });
        
        if(type === 'patient' )
            {
                axios.get(sitedata.data.path + '/UserProfile/DoctorUsersChat',{
                    headers: {
                        'token': user_token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{  
                    if(data.email === 'doctor4@aimedis.com' || data.email === 'doctor5@aimedis.com' || data.email === 'doctor3@aimedis.com' || data.email === 'doctor6@aimedis.com' || data.email === 'doctor7@aimedis.com')
                    {
                        if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
                            doctorArray.push(data.profile_id.toLowerCase()) 
                        }
                    } 
                    else if(data.paid_services && data.paid_services>0)
                        {
                            if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
                                doctorArray.push(data.profile_id.toLowerCase())
                            }
                        }   
                    })
                })
                let user_id    = user._id
                axios.get(sitedata.data.path + '/UserProfile/Users/'+user_id, {headers:{
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }}).then((response) =>{
                    response.data.data && response.data.data.fav_doctor && response.data.data.fav_doctor.map((value, i)=>{
                        if(doctorArray.indexOf(value.profile_id.toLowerCase()) === -1){
                            doctorArray.push(value.profile_id.toLowerCase())
                        }
                    })
                })
        
                let tmp = {doctorarray : doctorArray}
                dispatch({ type: GET_DoctorArray_SUCCESS, payload :tmp});
        }
        else if(type==='doctor')
        {           
            axios.get(sitedata.data.path + '/UserProfile/Users/'+user._id, {headers:{
            'token': user_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }}).then((response) =>{
              
              axios.get(sitedata.data.path + '/UserProfile/Mypatients', {
                  headers: {
                      'token': user_token,
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
              }).then((response) => {
                  response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{  
                      if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
                          doctorArray.push(data.profile_id.toLowerCase())
                      }
                   
                })
              })
              response.data.data && (response.data.data.email=== 'doctor4@aimedis.com' ||  response.data.data.email=== 'doctor5@aimedis.com' ||  response.data.data.email=== 'doctor3@aimedis.com' ||  response.data.data.email=== 'doctor6@aimedis.com' ||  response.data.data.email=== 'doctor7@aimedis.com') &&
              axios.get(sitedata.data.path + '/UserProfile/NursePharmaChat',{
                  headers: {
                      'token': user_token,
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
              }).then((response) => {
                  response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{ 
                      if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){  
                          doctorArray.push(data.profile_id.toLowerCase())
                      }
                  })
              })
              response.data.data && (response.data.data.paid_services && response.data.data.paid_services.length>0) || (response.data.data.email=== 'doctor4@aimedis.com' ||  response.data.data.email=== 'doctor5@aimedis.com' ||  response.data.data.email=== 'doctor3@aimedis.com' ||  response.data.data.email=== 'doctor6@aimedis.com' ||  response.data.data.email=== 'doctor7@aimedis.com') &&
              axios.get(sitedata.data.path + '/UserProfile/PatientUsersChat',{
                  headers: {
                      'token': user_token,
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
              }).then((response) => {
                  response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{
                      if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){   
                          doctorArray.push(data.profile_id.toLowerCase())
                      }
                  })
          })
          axios.get(sitedata.data.path + '/UserProfile/DoctorUsersChat',{
              headers: {
                  'token': user_token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          }).then((response) => {
              response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{  
               if(data.email === 'doctor4@aimedis.com' || data.email === 'doctor5@aimedis.com' || data.email === 'doctor3@aimedis.com' || data.email === 'doctor6@aimedis.com' || data.email === 'doctor7@aimedis.com')
               {
                  if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
                      doctorArray.push(data.profile_id.toLowerCase())
                  }
               } 
              })
          })
      })        
            let tmp = {doctorarray : doctorArray}
            dispatch({ type: GET_DoctorArray_SUCCESS, payload :tmp});
           
        }
        else if(type==='nurse' || type==='therapist' || type==='pharmacy')
        {
            axios.get(sitedata.data.path + '/UserProfile/Users/'+user._id, {headers:{
                'token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }}).then((response) =>{
                      axios.get(sitedata.data.path + '/UserProfile/DoctorUsersChat',{
                          headers: {
                              'token': token,
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                          }
                      }).then((response) => {
                          response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{  
                              if(data.email === 'doctor4@aimedis.com' || data.email === 'doctor5@aimedis.com' || data.email === 'doctor3@aimedis.com' || data.email === 'doctor6@aimedis.com' || data.email === 'doctor7@aimedis.com')
                              {
                                  if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
                                      doctorArray.push(data.profile_id.toLowerCase())
                                  }    
                              } 
                              if(data.paid_services && data.paid_services>0)
                              {
                                  if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
                                      doctorArray.push(data.profile_id.toLowerCase())
                                  }
                              }
                          })
                      })
                  })
            let tmp = {doctorarray : doctorArray}
            dispatch({ type: GET_DoctorArray_SUCCESS, payload :tmp});
        }
       else if(type==='paramedic' || type==='insurance')
        { 
            axios.get(sitedata.data.path + '/UserProfile/DoctorUsersChat',{
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                response.data.data && response.data.data.length>0 && response.data.data.map((data,index)=>{  
                 if(data.email === 'doctor4@aimedis.com' || data.email === 'doctor5@aimedis.com' || data.email === 'doctor3@aimedis.com' || data.email === 'doctor6@aimedis.com' || data.email === 'doctor7@aimedis.com')
                 {
                    if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
                    doctorArray.push(data.profile_id.toLowerCase()) 
                    }
                 } 
                  if(data.paid_services && data.paid_services>0)
                    {
                        if(doctorArray.indexOf(data.profile_id.toLowerCase()) === -1){
                            doctorArray.push(data.profile_id.toLowerCase())
                        }
                    }   
                })
            })
            let tmp = {doctorarray : doctorArray}
            dispatch({ type: GET_DoctorArray_SUCCESS, payload :tmp});
        }    
        else if(type==='logout'){
            dispatch({ type: GET_DoctorArray_ERROR});
        }  
        else{
            dispatch({ type: GET_DoctorArray_ERROR});
        } 
    }
};