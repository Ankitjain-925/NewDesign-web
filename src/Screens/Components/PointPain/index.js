import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import $ from "jquery";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from '../../actions';
import * as translationEN from "../../../translations/en.json"
import * as translationDE from '../../../translations/de.json';
import * as translationPT from '../../../translations/pt.json';
import * as translationSP from '../../../translations/sp.json';
import * as translationRS from '../../../translations/rs.json';
import * as translationSW from '../../../translations/sw.json';
import * as translationCH from '../../../translations/ch.json';
import * as translationNL from '../../../translations/en.json';

class PointPain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            painPoint : this.props.painPoint,
            isView : this.props.isView,
            label : this.props.label,
            id: this.props.id
        };
    }

    //For remove the points 
    removedata= ()=>{ 
        this.props.onChange([])
    }

    //Get the points in %
    getPoints = (val, type) =>{
        let _value = parseInt(val);
        if (type == 'x') {
          let x = `${(_value / 100) * 100}%`;
          return x;
        } else {
          let y = `${(_value / 150) * 100}%`;
          return y;
        }
    }

    //For set the canvas and image 
    componentDidMount = () => {
        // var canvas = $('#'+this.state.id)[0];
        // // get reference to canvas context
        // var context = canvas.getContext('2d');
        // context.canvas.width = 100;
        // context.canvas.height = 150;
        // // create an empty image
        // var img = new Image();
        // // after loading...
        // img.onload = function() {
        //     // draw the image onto the canvas
        //     context.drawImage(img, 0, 0, 100, 150);
        // }
        // if(this.props.gender === 'female')
        // {
        //    img.src= require('../../../assets/images/FEMALE_BODY.svg');
        // }
        // else
        // {
        //     img.src= require('../../../assets/images/MALE_BODY.svg');  
        // }
    }

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if(prevProps.id !== this.props.id)
        {
            this.setState({ painPoint: this.props.painPoint })
            // var canvas = $('#'+this.state.id)[0];
            // // get reference to canvas context
            // var context = canvas.getContext('2d');
            // context.canvas.width = 100;
            // context.canvas.height = 150;
            // // create an empty image
            // var img = new Image();
            // // after loading...
            // img.onload = function() {
            //     // draw the image onto the canvas
            //     context.drawImage(img, 0, 0, 100, 150);
            // }
            // if(this.props.gender === 'female')
            // {
            //    img.src= require('../../../assets/images/FEMALE_BODY.svg');
            // }
            // else
            // {
            //     img.src= require('../../../assets/images/MALE_BODY.svg');  
            // }
        }
        if (prevProps.painPoint !== this.props.painPoint) {
            this.setState({ painPoint: this.props.painPoint })
        }
    }

    //On add and Update points
    updatedemo=(e)=>{
        if(!this.state.isView)
        {
            var newclick= this.state.painPoint;
            var container = document.querySelector("#V"+this.state.id);
            var xPosition = e.clientX - container.getBoundingClientRect().left;
            var yPosition = e.clientY - container.getBoundingClientRect().top-4;
            newclick.push({x: this.getPoints(xPosition, 'x'), y: this.getPoints(yPosition, 'y') })
            this.props.onChange(newclick)      
        }
    }

    render() {
        let translate;
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
            case "default":
                translate = translationEN.text
        }
        let { clear_point } = translate;
        return (
            <Grid className="rrSysto">
                <Grid><label>{this.state.label}</label></Grid>
                <Grid className="painAreas">
                    <a id={"V"+this.state.id} className="painAreasimg" style={{position:'relative'}}>
                        <div id={this.state.id} className="canvases" onClick={(e)=>{this.updatedemo(e)}}>
                        {this.props.gender === 'female'? 
                            <img width="100" height="150" src= {require('../../../assets/images/FEMALE_BODY.svg')} />
                        :
                        <img width="100" height="150" src= {require('../../../assets/images/MALE_BODY.svg')} />}
                        </div>
                        <div className="mycode">
                            {this.state.painPoint && this.state.painPoint.length>0 && this.state.painPoint.map((item, index) => (
                                <div className="marker" style={{ position: 'absolute',  width: '6px', height: '6px', background: 'red', borderRadius: '50%', top: item.y,
                                left: item.x}} data-testy={item.y} data-testx={item.x}>   
                                </div> 
                            ))}
                        </div>   
                        {/* <img src={require('../../../assets/images/persionPainEqual.svg')} alt="" title="" /> */}
                    </a>
                    {/* <a className="painAreasimg"><img src={require('../../../assets/images/patient-back.svg')} alt="" title="" /></a> */}
                    {!this.state.isView && <a className="painAreasTxt" onClick={this.removedata}><img src={require('../../../assets/images/eraser.svg')} alt="" title="" />{clear_point}</a>}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(PointPain));