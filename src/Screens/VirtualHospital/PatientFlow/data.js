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
  deep[to].case_numbers= elm;
  return deep;
}