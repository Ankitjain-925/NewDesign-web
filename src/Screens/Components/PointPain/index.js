import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import $ from "jquery";


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
        var canvas = $('#'+this.state.id)[0];
        // get reference to canvas context
        var context = canvas.getContext('2d');
        context.canvas.width = 100;
        context.canvas.height = 150;
        // create an empty image
        var img = new Image();
        // after loading...
        img.onload = function() {
            // draw the image onto the canvas
            context.drawImage(img, 0, 0, 100, 150);
        }
        if(this.props.gender === 'female')
        {
           img.src= require('../../../assets/images/persionPainEqual.svg');
        }
        else
        {
            img.src= require('../../../assets/images/persionPainEqual.svg');  
        }
    }

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if(prevProps.id !== this.props.id)
        {
            console.log('I am here ', this.state.id)
            var canvas = $('#'+this.state.id)[0];
            // get reference to canvas context
            var context = canvas.getContext('2d');
            context.canvas.width = 100;
            context.canvas.height = 150;
            // create an empty image
            var img = new Image();
            // after loading...
            img.onload = function() {
                // draw the image onto the canvas
                context.drawImage(img, 0, 0, 100, 150);
            }
            if(this.props.gender === 'female')
            {
               img.src= require('../../../assets/images/persionPainEqual.svg');
            }
            else
            {
                img.src= require('../../../assets/images/persionPainEqual.svg');  
            }
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
        return (
            <Grid className="rrSysto">
                <Grid><label>{this.state.label}</label></Grid>
                <Grid className="painAreas">
                    <a id={"V"+this.state.id} className="painAreasimg" style={{position:'relative'}}>
                        <canvas id={this.state.id}  className="canvases" onClick={(e)=>{this.updatedemo(e)}}></canvas>
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
                    {!this.state.isView && <a className="painAreasTxt" onClick={this.removedata}><img src={require('../../../assets/images/eraser.svg')} alt="" title="" />Clear points</a>}
                </Grid>
            </Grid>
        )
    }
}

export default PointPain;
