import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { getDate, getTime, GetUrlImage, getFirstLastName } from '../../BasicMethod';
import GraphSec from './../GraphSec/index'
import HC_more from "highcharts/highcharts-more"; //module3
// Import Highcharts
import Highcharts from "highcharts/highstock";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {GetShowLabel1} from "../../GetMetaData/index.js";
import AllL_Ps from '../../Parameters/parameter.js';
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en.json";
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/nl.json';
import * as translationFR from '../../../../translations/fr.json';
import * as translationAR from '../../../../translations/ar.json';
HC_more(Highcharts); //init module

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            personalinfo: this.props.personalinfo,
            added_data: this.props.added_data,
            time_format : this.props.time_format,
            date_format : this.props.date_format,
            current_Graph : this.props.current_Graph,
            options : false,
        };
    }

    componentDidMount(){
        this.setOptions(this.props.current_Graph)
    }
    //On change the User Data

    componentDidUpdate = (prevProps) => {
        if (prevProps.personalinfo !== this.props.personalinfo) {
            this.setState({ personalinfo: this.props.personalinfo  })
        }
        if(prevProps.current_Graph !== this.props.current_Graph)
        {
            this.OnGraphChange(this.props.current_Graph)   
        }
    }
    //On Graph Change
    OnGraphChange=(current_Graph)=>{
        this.setState({ current_Graph: current_Graph })
       
        this.setOptions(current_Graph);
    }

    //Set options for the graph
    setOptions=(current_Graph)=>{
        let translate={};
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "fr":
                translate = translationFR.text
                break;
            case "ar":
                translate = translationAR.text
                break;
            default:
                translate = translationEN.text
        }
        let {blood_pressure, heart_frequency, blood_sugar, RR_diastolic, rr_systolic, weight_bmi, weight, height, Creatinine, date, rr_diastolic, upr_limit, lwr_limit, value, frequency}= translate
        
        var Creatinine1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
        value.lab_parameter.value ==='Creatinine'); 
        var Potassium = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
        value.lab_parameter.value ==='Potassium');
        var Hemoglobine = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
        value.lab_parameter.value ==='Hemoglobine');
        var Leucocytes = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
        value.lab_parameter.value ==='Leucocytes');
        var Pancreaticlipase = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
        value.lab_parameter.value ==='Pancreaticlipase');
        var Thrombocytes = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
        value.lab_parameter.value ==='Thrombocytes');
        var Sodium = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
        value.lab_parameter.value ==='Sodium');
        var GGT = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
        value.lab_parameter.value ==='GGT');
        var AST = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
        value.lab_parameter.value ==='AST/GOT');
        var ALT = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
        value.lab_parameter.value ==='ALT/GPT');
        this.setState({
            Creatinine:Creatinine1,Potassium:Potassium,Hemoglobine:Hemoglobine,Leucocytes:Leucocytes,Pancreaticlipase:Pancreaticlipase, 
            Thrombocytes:Thrombocytes,Sodium:Sodium,GGT:GGT, AST:AST,ALT:ALT
        })
        
        if(current_Graph ==='blood_pressure' || current_Graph === 'heart_rate'){
            var categoriesbp=[],databp_d=[],databp_s=[], dataf=[],oldone;
            this.state.personalinfo && this.state.personalinfo.blood_pressure &&  this.state.personalinfo.blood_pressure.length>0  && this.state.personalinfo.blood_pressure.map((data, index) => {
                databp_d.push({
                    "y": parseFloat(data.rr_diastolic)
                })
                databp_s.push({
                    "y": parseFloat(data.rr_systolic)
                })
                dataf.push({
                    "y": parseFloat(data.heart_frequncy)
                })
                if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.created_at) {
                    categoriesbp.push(getTime(data.datetime_on, this.state.time_format))
                }
                else {
                    categoriesbp.push(getDate(data.datetime_on, this.state.date_format))
                }
                oldone = data;
            })
            if(current_Graph ==='blood_pressure'){
                var options = {
                    title: {
                        text: blood_pressure
                    },
    
                    yAxis: {
                        title: {
                            text: blood_pressure
                        }
    
                    },
                    xAxis: {
                        title: {
                            text: date
                        },
                        categories: categoriesbp
                    },
    
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'line'
    
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: RR_diastolic,
                        data: databp_d,
                        type: 'line',
                        color: '#008080'
    
                    },
                    {
                        name: rr_systolic,
                        data: databp_s,
                        type: 'line',
                        color: '#0000A0'
    
                    }]
                }
            }
            else{
                var options = {
                    title: {
                        text: heart_frequency
                    },
    
                    yAxis: {
                        title: {
                            text: heart_frequency
                        }
    
                    },
                    xAxis: {
                        title: {
                            text: date
                        },
                        categories: categoriesbp
                    },
    
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'line'
    
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: frequency,
                        data: dataf,
                        type: 'line',
                        color: '#008080'
    
                    }]
                }
            }
            this.setState({options: options})
        }
        if(current_Graph === 'laboratory_result'){
             var myFilterData1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
            value.lab_parameter.value ==='Creatinine');
            var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
            {myFilterData1 &&  myFilterData1.length>0 && myFilterData1.map((data, index) => {
            datalr1_u.push({
                "y": parseFloat(data.upper_limit)
            })
            datalr1_l.push({
                "y": parseFloat(data.lower_limit)
            })
            datalr1_v.push({
                "y": parseFloat(data.value)
            })
            myFilterlr1.push(data);
            if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
                categorieslr.push(getTime(data.datetime_on, this.state.time_format))
            }
            else {
                categorieslr.push(getDate(data.datetime_on, this.state.date_format))
            }
            oldone = data;
        })}
            var options = {
                    title: {
                        text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Creatinine', this.props.stateLanguageType, true, 'lpr')
                    },

                    yAxis: {
                        title: {
                            text:  GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Creatinine', this.props.stateLanguageType, true, 'lpr')
                        }
                    },
                    xAxis: {
                        title: {
                            text: date
                        },
                        categories: categorieslr
                    },

                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'line'

                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: value,
                        data: datalr1_v,
                        type: 'line',
                        color: '#800000'

                    }, {
                        name: upr_limit,
                        data: datalr1_u,
                        type: 'line',
                        dashStyle: 'dot',
                        color: '#008080'

                    },
                    {
                        name: lwr_limit,
                        data: datalr1_l,
                        type: 'line',
                        dashStyle: 'dot',
                        color: '#0000A0'

                    }]
                }
            this.setState({options : options})
        }
        if(current_Graph === 'potassium'){
            var myFilterData1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
           value.lab_parameter.value ==='Potassium');
           var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
           {myFilterData1 &&  myFilterData1.length>0 && myFilterData1.map((data, index) => {
           datalr1_u.push({
               "y": parseFloat(data.upper_limit)
           })
           datalr1_l.push({
               "y": parseFloat(data.lower_limit)
           })
           datalr1_v.push({
               "y": parseFloat(data.value)
           })
           myFilterlr1.push(data);
           if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
               categorieslr.push(getTime(data.datetime_on, this.state.time_format))
           }
           else {
               categorieslr.push(getDate(data.datetime_on, this.state.date_format))
           }
           oldone = data;
       })}
           var options = {
                   title: {
                       text:  GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Potassium', this.props.stateLanguageType, true, 'lpr')
                   },

                   yAxis: {
                       title: {
                           text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Potassium', this.props.stateLanguageType, true, 'lpr')
                       }
                   },
                   xAxis: {
                       title: {
                           text: date
                       },
                       categories: categorieslr
                   },

                   plotOptions: {
                       series: {
                           marker: {
                               enabled: true,
                               radius: 3
                           }
                       }
                   },
                   chart: {
                       type: 'line'

                   },
                   credits: {
                       enabled: false
                   },
                   series: [{
                       name: value,
                       data: datalr1_v,
                       type: 'line',
                       color: '#800000'

                   }, {
                       name: upr_limit,
                       data: datalr1_u,
                       type: 'line',
                       dashStyle: 'dot',
                       color: '#008080'

                   },
                   {
                       name: lwr_limit,
                       data: datalr1_l,
                       type: 'line',
                       dashStyle: 'dot',
                       color: '#0000A0'

                   }]
               }
           this.setState({options : options})
       }

       if(current_Graph === 'hemoglobine'){
        var myFilterData1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
       value.lab_parameter.value ==='Hemoglobine');
       var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
       {myFilterData1 &&  myFilterData1.length>0 && myFilterData1.map((data, index) => {
       datalr1_u.push({
           "y": parseFloat(data.upper_limit)
       })
       datalr1_l.push({
           "y": parseFloat(data.lower_limit)
       })
       datalr1_v.push({
           "y": parseFloat(data.value)
       })
       myFilterlr1.push(data);
       if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
           categorieslr.push(getTime(data.datetime_on, this.state.time_format))
       }
       else {
           categorieslr.push(getDate(data.datetime_on, this.state.date_format))
       }
       oldone = data;
   })}
       var options = {
               title: {
                   text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Hemoglobine', this.props.stateLanguageType, true, 'lpr')
               },

               yAxis: {
                   title: {
                       text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Hemoglobine', this.props.stateLanguageType, true, 'lpr')
                   }
               },
               xAxis: {
                   title: {
                       text: date
                   },
                   categories: categorieslr
               },

               plotOptions: {
                   series: {
                       marker: {
                           enabled: true,
                           radius: 3
                       }
                   }
               },
               chart: {
                   type: 'line'

               },
               credits: {
                   enabled: false
               },
               series: [{
                   name: value,
                   data: datalr1_v,
                   type: 'line',
                   color: '#800000'

               }, {
                   name: upr_limit,
                   data: datalr1_u,
                   type: 'line',
                   dashStyle: 'dot',
                   color: '#008080'

               },
               {
                   name: lwr_limit,
                   data: datalr1_l,
                   type: 'line',
                   dashStyle: 'dot',
                   color: '#0000A0'

               }]
           }
       this.setState({options : options,})
   }

   if(current_Graph === 'leucocytes'){
    var myFilterData1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
   value.lab_parameter.value ==='Leucocytes');
   var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
   {myFilterData1 &&  myFilterData1.length>0 && myFilterData1.map((data, index) => {
   datalr1_u.push({
       "y": parseFloat(data.upper_limit)
   })
   datalr1_l.push({
       "y": parseFloat(data.lower_limit)
   })
   datalr1_v.push({
       "y": parseFloat(data.value)
   })
   myFilterlr1.push(data);
   if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
       categorieslr.push(getTime(data.datetime_on, this.state.time_format))
   }
   else {
       categorieslr.push(getDate(data.datetime_on, this.state.date_format))
   }
   oldone = data;
})}
   var options = {
           title: {
               text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Leucocytes', this.props.stateLanguageType, true, 'lpr')
           },

           yAxis: {
               title: {
                   text:  GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Leucocytes', this.props.stateLanguageType, true, 'lpr')
               }
           },
           xAxis: {
               title: {
                   text: date
               },
               categories: categorieslr
           },

           plotOptions: {
               series: {
                   marker: {
                       enabled: true,
                       radius: 3
                   }
               }
           },
           chart: {
               type: 'line'

           },
           credits: {
               enabled: false
           },
           series: [{
               name: value,
               data: datalr1_v,
               type: 'line',
               color: '#800000'

           }, {
               name: upr_limit,
               data: datalr1_u,
               type: 'line',
               dashStyle: 'dot',
               color: '#008080'

           },
           {
               name: lwr_limit,
               data: datalr1_l,
               type: 'line',
               dashStyle: 'dot',
               color: '#0000A0'

           }]
       }
   this.setState({options : options,})
}


if(current_Graph === 'pancreaticlipase'){
    var myFilterData1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
   value.lab_parameter.value ==='Pancreaticlipase');
   var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
   {myFilterData1 &&  myFilterData1.length>0 && myFilterData1.map((data, index) => {
   datalr1_u.push({
       "y": parseFloat(data.upper_limit)
   })
   datalr1_l.push({
       "y": parseFloat(data.lower_limit)
   })
   datalr1_v.push({
       "y": parseFloat(data.value)
   })
   myFilterlr1.push(data);
   if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
       categorieslr.push(getTime(data.datetime_on, this.state.time_format))
   }
   else {
       categorieslr.push(getDate(data.datetime_on, this.state.date_format))
   }
   oldone = data;
})}
   var options = {
           title: {
               text:  GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Pancreaticlipase', this.props.stateLanguageType, true, 'lpr')
           },
           yAxis: {
               title: {
                   text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Pancreaticlipase', this.props.stateLanguageType, true, 'lpr')
               }
           },
           xAxis: {
               title: {
                   text: date
               },
               categories: categorieslr
           },

           plotOptions: {
               series: {
                   marker: {
                       enabled: true,
                       radius: 3
                   }
               }
           },
           chart: {
               type: 'line'

           },
           credits: {
               enabled: false
           },
           series: [{
               name: value,
               data: datalr1_v,
               type: 'line',
               color: '#800000'

           }, {
               name: upr_limit,
               data: datalr1_u,
               type: 'line',
               dashStyle: 'dot',
               color: '#008080'

           },
           {
               name: lwr_limit,
               data: datalr1_l,
               type: 'line',
               dashStyle: 'dot',
               color: '#0000A0'

           }]
       }
   this.setState({options : options})
}

if(current_Graph === 'thrombocytes'){
    var myFilterData1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
   value.lab_parameter.value ==='Thrombocytes');
   var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
   {myFilterData1 &&  myFilterData1.length>0 && myFilterData1.map((data, index) => {
   datalr1_u.push({
       "y": parseFloat(data.upper_limit)
   })
   datalr1_l.push({
       "y": parseFloat(data.lower_limit)
   })
   datalr1_v.push({
       "y": parseFloat(data.value)
   })
   myFilterlr1.push(data);
   if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
       categorieslr.push(getTime(data.datetime_on, this.state.time_format))
   }
   else {
       categorieslr.push(getDate(data.datetime_on, this.state.date_format))
   }
   oldone = data;
})}
   var options = {
           title: {
               text:GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Thrombocytes', this.props.stateLanguageType, true, 'lpr')
           },

           yAxis: {
               title: {
                   text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Thrombocytes', this.props.stateLanguageType, true, 'lpr')
               }
           },
           xAxis: {
               title: {
                   text: date
               },
               categories: categorieslr
           },

           plotOptions: {
               series: {
                   marker: {
                       enabled: true,
                       radius: 3
                   }
               }
           },
           chart: {
               type: 'line'

           },
           credits: {
               enabled: false
           },
           series: [{
               name: value,
               data: datalr1_v,
               type: 'line',
               color: '#800000'

           }, {
               name: upr_limit,
               data: datalr1_u,
               type: 'line',
               dashStyle: 'dot',
               color: '#008080'

           },
           {
               name: lwr_limit,
               data: datalr1_l,
               type: 'line',
               dashStyle: 'dot',
               color: '#0000A0'

           }]
       }
   this.setState({options : options})
}

if(current_Graph === 'sodium'){
    var myFilterData1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
   value.lab_parameter.value ==='Sodium');
   var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
   {myFilterData1 &&  myFilterData1.length>0 && myFilterData1.map((data, index) => {
   datalr1_u.push({
       "y": parseFloat(data.upper_limit)
   })
   datalr1_l.push({
       "y": parseFloat(data.lower_limit)
   })
   datalr1_v.push({
       "y": parseFloat(data.value)
   })
   myFilterlr1.push(data);
   if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
       categorieslr.push(getTime(data.datetime_on, this.state.time_format))
   }
   else {
       categorieslr.push(getDate(data.datetime_on, this.state.date_format))
   }
   oldone = data;
})}
   var options = {
           title: {
               text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Sodium', this.props.stateLanguageType, true, 'lpr')
           },

           yAxis: {
               title: {
                   text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Sodium', this.props.stateLanguageType, true, 'lpr')
               }
           },
           xAxis: {
               title: {
                   text: date
               },
               categories: categorieslr
           },

           plotOptions: {
               series: {
                   marker: {
                       enabled: true,
                       radius: 3
                   }
               }
           },
           chart: {
               type: 'line'

           },
           credits: {
               enabled: false
           },
           series: [{
               name: value,
               data: datalr1_v,
               type: 'line',
               color: '#800000'

           }, {
               name: upr_limit,
               data: datalr1_u,
               type: 'line',
               dashStyle: 'dot',
               color: '#008080'

           },
           {
               name: lwr_limit,
               data: datalr1_l,
               type: 'line',
               dashStyle: 'dot',
               color: '#0000A0'

           }]
       }
   this.setState({options : options})
}

if(current_Graph === 'ggt'){
    var myFilterData1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
   value.lab_parameter.value ==='GGT');
   var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
   {myFilterData1 &&  myFilterData1.length>0 && myFilterData1.map((data, index) => {
   datalr1_u.push({
       "y": parseFloat(data.upper_limit)
   })
   datalr1_l.push({
       "y": parseFloat(data.lower_limit)
   })
   datalr1_v.push({
       "y": parseFloat(data.value)
   })
   myFilterlr1.push(data);
   if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
       categorieslr.push(getTime(data.datetime_on, this.state.time_format))
   }
   else {
       categorieslr.push(getDate(data.datetime_on, this.state.date_format))
   }
   oldone = data;
})}
   var options = {
           title: {
               text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'GGT', this.props.stateLanguageType, true, 'lpr')
           },

           yAxis: {
               title: {
                   text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'GGT', this.props.stateLanguageType, true, 'lpr')
               }
           },
           xAxis: {
               title: {
                   text: date
               },
               categories: categorieslr
           },

           plotOptions: {
               series: {
                   marker: {
                       enabled: true,
                       radius: 3
                   }
               }
           },
           chart: {
               type: 'line'

           },
           credits: {
               enabled: false
           },
           series: [{
               name: value,
               data: datalr1_v,
               type: 'line',
               color: '#800000'

           }, {
               name: upr_limit,
               data: datalr1_u,
               type: 'line',
               dashStyle: 'dot',
               color: '#008080'

           },
           {
               name: lwr_limit,
               data: datalr1_l,
               type: 'line',
               dashStyle: 'dot',
               color: '#0000A0'

           }]
       }
   this.setState({options : options,})
}


if(current_Graph === 'ast/got'){
    var myFilterData1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
   value.lab_parameter.value ==='AST/GOT');
   var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
   {myFilterData1 &&  myFilterData1.length>0 && myFilterData1.map((data, index) => {
   datalr1_u.push({
       "y": parseFloat(data.upper_limit)
   })
   datalr1_l.push({
       "y": parseFloat(data.lower_limit)
   })
   datalr1_v.push({
       "y": parseFloat(data.value)
   })
   myFilterlr1.push(data);
   if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
       categorieslr.push(getTime(data.datetime_on, this.state.time_format))
   }
   else {
       categorieslr.push(getDate(data.datetime_on, this.state.date_format))
   }
   oldone = data;
})}
   var options = {
           title: {
               text:  GetShowLabel1(AllL_Ps.AllL_Ps.english, 'AST/GOT', this.props.stateLanguageType, true, 'lpr')
           },

           yAxis: {
               title: {
                   text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'AST/GOT', this.props.stateLanguageType, true, 'lpr')
               }
           },
           xAxis: {
               title: {
                   text: date
               },
               categories: categorieslr
           },

           plotOptions: {
               series: {
                   marker: {
                       enabled: true,
                       radius: 3
                   }
               }
           },
           chart: {
               type: 'line'

           },
           credits: {
               enabled: false
           },
           series: [{
               name: value,
               data: datalr1_v,
               type: 'line',
               color: '#800000'

           }, {
               name: upr_limit,
               data: datalr1_u,
               type: 'line',
               dashStyle: 'dot',
               color: '#008080'

           },
           {
               name: lwr_limit,
               data: datalr1_l,
               type: 'line',
               dashStyle: 'dot',
               color: '#0000A0'

           }]
       }
   this.setState({options : options})
}

if(current_Graph === 'alt/gpt'){
    var myFilterData1 = this.state.personalinfo && this.state.personalinfo.laboratory_result && this.state.personalinfo.laboratory_result.length > 0 && this.state.personalinfo.laboratory_result.filter((value, key) =>
   value.lab_parameter.value ==='ALT/GPT');
   var categorieslr=[],datalr1_u=[],datalr1_l=[],datalr1_v=[], oldone, myFilterlr1=[];
   {myFilterData1 &&  myFilterData1.length>0 && myFilterData1.map((data, index) => {
   datalr1_u.push({
       "y": parseFloat(data.upper_limit)
   })
   datalr1_l.push({
       "y": parseFloat(data.lower_limit)
   })
   datalr1_v.push({
       "y": parseFloat(data.value)
   })
   myFilterlr1.push(data);
   if (oldone && oldone.datetime_on && oldone.datetime_on === data.datetime_on && oldone.datetime_on) {
       categorieslr.push(getTime(data.datetime_on, this.state.time_format))
   }
   else {
       categorieslr.push(getDate(data.datetime_on, this.state.date_format))
   }
   oldone = data;
})}
   var options = {
           title: {
               text: GetShowLabel1(AllL_Ps.AllL_Ps.english, 'ALT/GPT', this.props.stateLanguageType, true, 'lpr')
           },

           yAxis: {
               title: {
                   text:  GetShowLabel1(AllL_Ps.AllL_Ps.english, 'ALT/GPT', this.props.stateLanguageType, true, 'lpr')
               }
           },
           xAxis: {
               title: {
                   text: date
               },
               categories: categorieslr
           },

           plotOptions: {
               series: {
                   marker: {
                       enabled: true,
                       radius: 3
                   }
               }
           },
           chart: {
               type: 'line'

           },
           credits: {
               enabled: false
           },
           series: [{
               name: value,
               data: datalr1_v,
               type: 'line',
               color: '#800000'

           }, {
               name: upr_limit,
               data: datalr1_u,
               type: 'line',
               dashStyle: 'dot',
               color: '#008080'

           },
           {
               name: lwr_limit,
               data: datalr1_l,
               type: 'line',
               dashStyle: 'dot',
               color: '#0000A0'

           }]
       }
   this.setState({options : options})
}

        if(current_Graph === 'weight_bmi'){
            var oldthree, weightbmi=[],Ibmi=[],heightbmi=[],categoriesbmi=[];
            {this.state.personalinfo && this.state.personalinfo.weight_bmi &&  this.state.personalinfo.weight_bmi.length>0 && this.state.personalinfo.weight_bmi.map((data, index) => {
            weightbmi.push({
                "y": parseFloat(data.weight)
            })
            var BMI = (data.weight / (data.height * data.height) * 10000).toFixed(2)
            Ibmi.push({
                "y": parseFloat(BMI)
            })
            heightbmi.push({
                "y": parseFloat(data.height)
            })
            if (oldthree && oldthree.datetime_on && oldthree.datetime_on === oldthree.datetime_on && oldthree.created_at) {
                categoriesbmi.push(getTime(data.datetime_on, this.state.time_format))
            }
            else {
                categoriesbmi.push(getDate(data.datetime_on,this.state.date_format))
            }
            oldthree = data;
            })}
            options ={
                title: {
                    text: weight_bmi
                },

                yAxis: {
                    title: {
                        text: weight
                    }
                },
                yAxis: [{
                    title: {
                        text: 'BMI',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: weight
                    }
                }],
                xAxis: {
                    title: {
                        text: date
                    },
                    categories: categoriesbmi
                },
                plotOptions: {
                    series: {
                        marker: {
                            enabled: true,
                            radius: 3
                        }
                    }
                },
                chart: {
                    type: 'line'
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: weight,
                    data: weightbmi,
                    type: 'line'
                },
                {
                    name: height,
                    data: heightbmi,
                    type: 'line',
                    color: 'red'
                },
                {
                    name: 'BMI',
                    data: Ibmi,
                    type: 'line'
                }]
            }
            this.setState({options : options})
        }
        if(current_Graph === 'blood_sugar'){
            var categoriesbs=[], oldtwo, hbac=[],blood_s=[];
            {this.state.personalinfo && this.state.personalinfo.blood_sugar &&  this.state.personalinfo.blood_sugar.length>0 && this.state.personalinfo.blood_sugar.map((data, index) => {
                hbac.push({
                    "y": parseFloat(data.Hba1c)
                })
                blood_s.push({
                    "y": parseFloat(data.blood_sugar)
                })
                if (oldtwo && oldtwo.datetime_on && oldtwo.datetime_on === data.datetime_on && oldtwo.created_at) {
                    categoriesbs.push(getTime(data.datetime_on, this.state.time_format))
                }
                else {
                    categoriesbs.push(getDate(data.datetime_on, this.state.date_format))
                }
                oldtwo = data;
            })}
            options ={
                title: {
                    text: blood_sugar
                },

                yAxis: {
                    title: {
                        text: blood_sugar
                    }
                },
                xAxis: {
                    title: {
                        text: date
                    },
                    categories: categoriesbs
                },

                plotOptions: {
                    series: {
                        marker: {
                            enabled: true,
                            radius: 3
                        }
                    }
                },
                chart: {
                    type: 'line'
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: blood_sugar,
                    data: blood_s,
                    type: 'line'
                },
                {
                    name: 'HBA1c',
                    data: hbac,
                    type: 'line'
                }]
            }
            this.setState({options : options})
        }
    }
    
    render() {
        var item = this.state.item;
        let translate={};
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "fr":
                translate = translationFR.text
                break;
            case "ar":
                translate = translationAR.text
                break;
            default:
                translate = translationEN.text
        }

        let {blood_pressure, heart_frequency, blood_sugar, weight_bmi, Creatinine}= translate
        return (
            <div>
                <Grid container direction="row" justify="center">
                <Grid item xs={12} md={12}>
                    <Grid className="presurMeter">
                        <Grid className="presurCloseFncy">
                            <img onClick={this.props.CloseGraph} src={require('../../../../assets/images/close-search.svg')} alt="" title="" />
                        </Grid>

                        <Grid className="presurInner">
                            {this.state.personalinfo && this.state.personalinfo.blood_pressure &&  this.state.personalinfo.blood_pressure.length>0 && 
                            <a className={this.state.current_Graph === 'blood_pressure' && "presurInnerActv"} onClick={()=> this.OnGraphChange('blood_pressure')}>
                                <label>{blood_pressure}</label>
                                <Grid><span>{this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure[0] && (this.state.personalinfo.blood_pressure[0].rr_systolic +'/'+  this.state.personalinfo.blood_pressure[0].rr_diastolic)} mmHg</span></Grid>
                                <p>{getDate(this.state.personalinfo.blood_pressure[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_pressure[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.personalinfo && this.state.personalinfo.blood_pressure &&  this.state.personalinfo.blood_pressure.length>0 &&
                            <a className={this.state.current_Graph === 'heart_rate' && "presurInnerActv"} onClick={()=> this.OnGraphChange('heart_rate')}>
                                <label>{heart_frequency}</label>
                                <Grid><span>{this.state.personalinfo && this.state.personalinfo.blood_pressure && this.state.personalinfo.blood_pressure[0] && (this.state.personalinfo.blood_pressure[0].heart_frequncy )} bpm</span></Grid>
                                <p>{getDate(this.state.personalinfo.blood_pressure[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_pressure[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.personalinfo && this.state.personalinfo.blood_sugar &&  this.state.personalinfo.blood_sugar.length>0 &&
                            <a className={this.state.current_Graph === 'blood_sugar' && "presurInnerActv"} onClick={()=> this.OnGraphChange('blood_sugar')}>
                                <label>{blood_sugar}</label>
                                <Grid><span>{this.state.personalinfo && this.state.personalinfo.blood_sugar && this.state.personalinfo.blood_sugar[0] && (this.state.personalinfo.blood_sugar[0].blood_sugar )} mg/dl</span></Grid>
                                <p>{getDate(this.state.personalinfo.blood_sugar[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.blood_sugar[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.personalinfo && this.state.personalinfo.weight_bmi &&  this.state.personalinfo.weight_bmi.length>0 &&
                            <a className={this.state.current_Graph === 'weight_bmi' && "presurInnerActv"} onClick={()=> this.OnGraphChange('weight_bmi')}>
                                <label>{weight_bmi}</label>
                                <Grid><span>{this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi[0] && this.state.personalinfo.weight_bmi[0].weight} kg, {this.state.personalinfo && this.state.personalinfo.weight_bmi && this.state.personalinfo.weight_bmi[0] && (this.state.personalinfo.weight_bmi[0].height + '/'+this.state.personalinfo.weight_bmi[0].weight )} BMI</span></Grid>
                                <p>{getDate(this.state.personalinfo.weight_bmi[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.personalinfo.weight_bmi[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.Creatinine && this.state.Creatinine.length>0 &&
                            <a className={this.state.current_Graph === 'laboratory_result' && "presurInnerActv"} onClick={()=> this.OnGraphChange('laboratory_result')}>
                                <label>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Creatinine', this.props.stateLanguageType, true, 'lpr')}</label>
                                <Grid><span>{this.state.Creatinine && this.state.Creatinine.length>0 && this.state.Creatinine[0] && (this.state.Creatinine[0].value )} {this.state.Creatinine[0].unit && this.state.Creatinine[0].unit.label}</span></Grid>
                                <p>{getDate(this.state.Creatinine[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.Creatinine[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            
                            {this.state.AST && this.state.AST.length>0 &&
                            <a className={this.state.current_Graph === 'ast/got' && "presurInnerActv"} onClick={()=> this.OnGraphChange('ast/got')}>
                                <label>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'AST/GOT', this.props.stateLanguageType, true, 'lpr')}</label>
                                <Grid><span>{this.state.AST && this.state.AST.length>0 && this.state.AST[0] && (this.state.AST[0].value )} {this.state.AST[0].unit && this.state.AST[0].unit.label}</span></Grid>
                                <p>{getDate(this.state.AST[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.AST[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.GGT && this.state.GGT.length>0 &&
                            <a className={this.state.current_Graph === 'ggt' && "presurInnerActv"} onClick={()=> this.OnGraphChange('ggt')}>
                                <label>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'GGT', this.props.stateLanguageType, true, 'lpr')}</label>
                                <Grid><span>{this.state.GGT && this.state.GGT.length>0 && this.state.GGT[0] && (this.state.GGT[0].value )} {this.state.GGT[0].unit && this.state.GGT[0].unit.label}</span></Grid>
                                <p>{getDate(this.state.GGT[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.GGT[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.Sodium && this.state.Sodium.length>0 &&
                            <a className={this.state.current_Graph === 'sodium' && "presurInnerActv"} onClick={()=> this.OnGraphChange('sodium')}>
                                <label>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Sodium', this.props.stateLanguageType, true, 'lpr')}</label>
                                <Grid><span>{this.state.Sodium && this.state.Sodium.length>0 && this.state.Sodium[0] && (this.state.Sodium[0].value )} {this.state.Sodium[0].unit && this.state.Sodium[0].unit.label}</span></Grid>
                                <p>{getDate(this.state.Sodium[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.Sodium[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.Thrombocytes && this.state.Thrombocytes.length>0 &&
                            <a className={this.state.current_Graph === 'thrombocytes' && "presurInnerActv"} onClick={()=> this.OnGraphChange('thrombocytes')}>
                                <label>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Thrombocytes', this.props.stateLanguageType, true, 'lpr')}</label>
                                <Grid><span>{this.state.Thrombocytes && this.state.Thrombocytes.length>0 && this.state.Thrombocytes[0] && (this.state.Thrombocytes[0].value )} {this.state.Thrombocytes[0].unit && this.state.Thrombocytes[0].unit.label}</span></Grid>
                                <p>{getDate(this.state.Thrombocytes[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.Thrombocytes[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.Pancreaticlipase && this.state.Pancreaticlipase.length>0 &&
                            <a className={this.state.current_Graph === 'pancreaticlipase' && "presurInnerActv"} onClick={()=> this.OnGraphChange('pancreaticlipase')}>
                                <label>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Pancreaticlipase', this.props.stateLanguageType, true, 'lpr')}</label>
                                <Grid><span>{this.state.Pancreaticlipase && this.state.Pancreaticlipase.length>0 && this.state.Pancreaticlipase[0] && (this.state.Pancreaticlipase[0].value )} {this.state.Pancreaticlipase[0].unit && this.state.Pancreaticlipase[0].unit.label}</span></Grid>
                                <p>{getDate(this.state.Pancreaticlipase[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.Pancreaticlipase[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.Leucocytes && this.state.Leucocytes.length>0 &&
                            <a className={this.state.current_Graph === 'leucocytes' && "presurInnerActv"} onClick={()=> this.OnGraphChange('leucocytes')}>
                                <label>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Leucocytes', this.props.stateLanguageType, true, 'lpr')}</label>
                                <Grid><span>{this.state.Leucocytes && this.state.Leucocytes.length>0 &&  this.state.Leucocytes[0] && (this.state.Leucocytes[0].value )} {this.state.Leucocytes[0].unit && this.state.Leucocytes[0].unit.label}</span></Grid>
                                <p>{getDate(this.state.Leucocytes[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.Leucocytes[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.Hemoglobine && this.state.Hemoglobine.length>0 &&
                            <a className={this.state.current_Graph === 'hemoglobine' && "presurInnerActv"} onClick={()=> this.OnGraphChange('hemoglobine')}>
                                <label>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Hemoglobine', this.props.stateLanguageType, true, 'lpr')}</label>
                                <Grid><span>{this.state.Potassium && this.state.Hemoglobine.length>0 && this.state.Hemoglobine[0] && (this.state.Hemoglobine[0].value )} {this.state.Hemoglobine[0].unit && this.state.Hemoglobine[0].unit.label}</span></Grid>
                                <p>{getDate(this.state.Hemoglobine[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.Hemoglobine[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}

                            {this.state.Potassium && this.state.Potassium.length>0 &&
                            <a className={this.state.current_Graph === 'potassium' && "presurInnerActv"} onClick={()=> this.OnGraphChange('potassium')}>
                                <label>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Potassium', this.props.stateLanguageType, true, 'lpr')}</label>
                                <Grid><span>{this.state.Potassium && this.state.Potassium.length>0 && this.state.Potassium[0] && (this.state.Potassium[0].value )} {this.state.Potassium[0].unit && this.state.Potassium[0].unit.label}</span></Grid>
                                <p>{getDate(this.state.Potassium && this.state.Potassium[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.Potassium && this.state.Potassium[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                            {this.state.ALT && this.state.ALT.length>0 &&
                            <a className={this.state.current_Graph === 'alt/gpt' && "presurInnerActv"} onClick={()=> this.OnGraphChange('alt/gpt')}>
                                <label>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'ALT/GPT', this.props.stateLanguageType, true, 'lpr')}</label>
                                <Grid><span>{this.state.ALT && this.state.ALT.length>0 && this.state.ALT[0] && (this.state.ALT[0].value )} {this.state.ALT[0].unit && this.state.ALT[0].unit.label}</span></Grid>
                                <p>{getDate(this.state.ALT[0].datetime_on, this.state.date_format)}, {getTime(new Date(this.state.ALT[0].datetime_on), this.state.time_foramt)}</p>
                            </a>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid className="presurGraph">
                <Grid container direction="row" justify="center">
                    <Grid item xs={12} md={9}>
                        <Grid className="presurLabl">
                            {this.state.current_Graph === 'potassium'&& <h1>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Potassium', this.props.stateLanguageType, true, 'lpr')}</h1>}
                            {this.state.current_Graph === 'hemoglobine'&& <h1>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Hemoglobine', this.props.stateLanguageType, true, 'lpr')}</h1>}
                            {this.state.current_Graph === 'laboratory_result' && <h1>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Creatinine', this.props.stateLanguageType, true, 'lpr')}</h1>}
                            {this.state.current_Graph === 'leucocytes'&& <h1>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Leucocytes', this.props.stateLanguageType, true, 'lpr')}</h1>}
                            {this.state.current_Graph === 'pancreaticlipase'&& <h1>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Pancreaticlipase', this.props.stateLanguageType, true, 'lpr')}</h1>}
                            {this.state.current_Graph === 'thrombocytes' && <h1>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Thrombocytes', this.props.stateLanguageType, true, 'lpr')}</h1>}
                            {this.state.current_Graph === 'sodium'&& <h1>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'Sodium', this.props.stateLanguageType, true, 'lpr')}</h1>}
                            {this.state.current_Graph === 'ggt'&& <h1>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'GGT', this.props.stateLanguageType, true, 'lpr')}</h1>}
                            {this.state.current_Graph === 'ast/got' && <h1>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'AST/GOT', this.props.stateLanguageType, true, 'lpr')}</h1>}
                            {this.state.current_Graph === 'alt/gpt'&& <h1>{GetShowLabel1(AllL_Ps.AllL_Ps.english, 'ALT/GPT', this.props.stateLanguageType, true, 'lpr')}</h1>}
                            
                            {this.state.current_Graph === 'weight_bmi' && <h1>{weight_bmi}</h1>}
                            {this.state.current_Graph === 'blood_sugar' && <h1>{blood_sugar}</h1>}
                            {this.state.current_Graph === 'heart_rate' && <h1>{heart_frequency}</h1>}
                            {this.state.current_Graph === 'blood_pressure' && <h1>{blood_pressure}</h1>}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {/* <Grid className="presurAction">
                            <a><img src={require('../../../../assets/images/download.svg')} alt="" title="" /></a>
                            <a><img src={require('../../../../assets/images/print.svg')} alt="" title="" /></a>
                            <a><img src={require('../../../../assets/images/expand.svg')} alt="" title="" /></a>
                            <a className="pluspresur">+ Add new entry</a>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center">
                    <Grid item xs={12} md={9}>
                        <Grid className="latestGrph">
                            {this.state.options && <GraphSec options={this.state.options}/> }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={3}>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index));