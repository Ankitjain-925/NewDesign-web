import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"
import _ from 'lodash';

export const getSteps = async (house_id, user_token)=> {
  let response = await axios.get(sitedata.data.path + "/step/GetStep/" + house_id,
        commonHeader(user_token))
    if (response.data.hassuccessed === true) {
        return response.data.data
    } else {
        return false
    }
}

export const getAuthor = (allsteps)=> {
  const myUpdate = allsteps.reduce(
    (previous, author) => ([
      ...previous,
      {step_name : author.step_name}
    ]),
    []
  );
  return myUpdate;
}

export const updateInActualData= async (actualData, result)=>{
  if(result.type==='COLUMN'){
    const elm = actualData.splice(result.source.index, 1)[0];
    actualData.splice( result.destination.index, 0, elm);
    return actualData;
  }
  else{
    var deep = _.cloneDeep(actualData);
    var from = deep.map(function(e) { return e.step_name; }).indexOf(result.source.droppableId);
    var to = deep.map(function(e) { return e.step_name; }).indexOf(result.destination.droppableId);
    const elm = deep[from].case_numbers.splice(result.source.index, 1)[0];
    deep[to].case_numbers.splice( result.destination.index, 0, elm);
    return deep;
  }
}

export const MoveAllCases = async (actualData, from, to, data)=>{
  var deep = _.cloneDeep(actualData);
  const elm = deep[from].case_numbers;
  deep[from].case_numbers = [];
  if(deep[to].case_numbers?.length>0){
    deep[to].case_numbers= [...deep[to].case_numbers, ...elm];
  }
  else{
    deep[to].case_numbers= elm;
  }
  return deep;
}

export const checkTheIndex = (array, attr, value) => {
  var mydata = array.map((data, i)=>{
    if (data['patient_id'] === value) {
        return i;
    }
  }).filter(function( element ) {
    return element !== undefined;
  });
  if(mydata && mydata.length>0){
    return mydata[0];
  }
  else{
    return -1;
  }
}

export const AllWards = (Specilaity_id, AllSpecaility) => {
  var mydata = AllSpecaility.filter((element)=>element._id === Specilaity_id)
 if(mydata && mydata.length>0){
    return mydata[0]?.wards?.length>0 && mydata[0]?.wards.map((data, i)=>{
      return {value: data._id, label: data.ward_name}
  });
  }
  else{
    return[];
  }
}

export const setWard = async (value, Specilaity_id, AllSpecaility, case_id, user_token) => {
  var mydata = AllSpecaility.filter((element)=>element._id === Specilaity_id)
  if(mydata && mydata.length>0){
     var setData = mydata[0]?.wards?.length>0 && mydata[0]?.wards.filter((data, i)=>data._id === value.value)?.[0];
     let response = await axios.put(
      sitedata.data.path + "/cases/AddCase/"+ case_id,
      {wards: {
          _id: setData?._id,
          ward_name: setData?.ward_name,
      },
      rooms: {}, bed: ""},
      commonHeader(user_token))
      if (response) {
          return response
      } else {
          return false
      }
   }
}

export const CurrentWard = (wards) => {
  if(wards){
    return {value : wards._id, label: wards.ward_name}
  }
  return {}
}

export const AllRoomList = (Specilaity_id, AllSpecaility, ward_id) => {
  if(ward_id){
    console.log('here')
    var mydata1 = AllSpecaility.filter((element)=>element._id === Specilaity_id)
    var mydata = mydata1[0]?.wards.length>0 && mydata1[0]?.wards.filter((element)=>element._id === ward_id)
    if(mydata && mydata.length>0){
      console.log('here2')
      return mydata[0]?.rooms?.length>0 && mydata[0]?.rooms.map((data, i)=>{
        return {value: data._id, label: data.room_name}
    });
    }
    else{
      return[];
    }
  }
  else  return [];
}

export const setRoom = async (value, Specilaity_id, AllSpecaility, case_id, user_token, ward_id) => {
  if(ward_id){
    var mydata1 = AllSpecaility.filter((element)=>element._id === Specilaity_id)
    var mydata = mydata1[0]?.wards.length>0 && mydata1[0]?.wards.filter((element)=>element._id === ward_id)
    if(mydata && mydata.length>0){
     var setData = mydata[0]?.rooms?.length>0 && mydata[0]?.rooms.filter((data, i)=>data._id === value.value)?.[0];
     let response = await axios.put(
      sitedata.data.path + "/cases/AddCase/"+ case_id,
      {rooms: {
          _id: setData?._id,
          room_name: setData?.room_name,
      }, bed: ""},
      commonHeader(user_token))
      if (response) {
          return response
      } else {
          return false
      }
   }
  }
}

export const CurrentRoom = (rooms) => {
  if(rooms){
    return {value : rooms._id, label: rooms.room_name}
  }
  return {}
  
}

export const AllBed = async (Specilaity_id, ward_id, room_id, house_id, user_token, ) => {
    let response = await axios.post(
      sitedata.data.path + "/cases/checkbedAvailability/",
      {"house_id": house_id, "room_id": room_id, "specialty_id": Specilaity_id, "ward_id": ward_id},
      commonHeader(user_token))
      if (response) {
          return response
      } else {
          return false
      }   
}

export const setBed = async (value, case_id, user_token) => {
  if(value){
      let response = await axios.put(
      sitedata.data.path + "/cases/AddCase/"+ case_id,
      { bed: value.label},
      commonHeader(user_token))
      if (response) {
          return response
      } else {
          return false
      }
    }
}

export const setAssignedTo = async (value, case_id, user_token) => {
  if(value){
      let response = await axios.put(
      sitedata.data.path + "/cases/AddCase/"+ case_id,
      { assinged_to: value},
      commonHeader(user_token))
      if (response) {
          return response
      } else {
          return false
      }
    }
}

export const CurrentBed = (bed) => {
  if(bed){
    return {value : bed, label: bed}
  }
  return {}
  
}

  // Get the Professional data
  export const getProfessionalData  = async (house_id, user_token) => {
    var professionalList = [], professionalList1 = [],
    professionalArray = [];
    var response = await axios
        .get(
            sitedata.data.path + "/hospitaladmin/GetProfessional/" + house_id,
            commonHeader(user_token)
        );
        
        // data.then((response) => {
        if (response.data.hassuccessed) {
            for (let i = 0; i < response.data?.data.length; i++) {
                var name = '';
                if (response.data?.data[i]?.first_name && response.data?.data[i]?.last_name) {
                    name = response.data?.data[i]?.first_name + ' ' + response.data?.data[i]?.last_name
                }
                else if (response.data?.data[i]?.first_name) {
                    name = response.data?.data[i]?.first_name
                }
                professionalArray.push({
                    first_name: response.data?.data[i].first_name,
                    last_name: response.data?.data[i].last_name,
                    user_id: response.data?.data[i]._id,
                    profile_id: response.data?.data[i].profile_id,
                    alies_id: response.data?.data[i].alies_id,
                    image: response.data?.data[i].image
                })
                professionalList.push({ value: response.data?.data[i]._id, label: name })
                // professionalList1.push({ profile_id: response.data?.data[i].profile_id, value: response.data?.data[i]._id, label: name })
            }
              return {professionalArray: professionalArray, professionalList: professionalList}
        }
        else{
          return false
        }

};

export const PatientMoveFromHouse  = async (case_id, user_token, status, inhospital) => {
  let response = await axios.put(
    sitedata.data.path + "/cases/AddCase/"+ case_id,
    { status: status, inhospital: inhospital},
    commonHeader(user_token))
    if (response) {
        return response
    } else {
        return false
    }
}