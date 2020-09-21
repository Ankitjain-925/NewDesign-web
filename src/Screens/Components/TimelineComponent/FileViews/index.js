import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { getImage , GetUrlImage} from './../../BasicMethod/index';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attachfile : this.props.attachfile
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.attachfile !== this.props.attachfile) {
            this.setState({attachfile: this.props.attachfile})
        }
        if(prevProps.images !== this.props.images)
        {
            this.setState({ images: this.props.images})
        }
    }

    OpenDCM = (filename) =>{
        var Files = GetUrlImage(filename)
        let url = "/dcmView?input=" + encodeURIComponent(Files)
        // window.open(url, '_blank');
    }


    render() {
        var item = this.state.attachfile;
        return (
            <Grid className="imgsFile">
                {item && item.length>0 && item.map((file)=>(
                   <a>
                        {file.filetype ==='mp4' && 
                            <video width="100%" className="VideoPlay" controls>
                                <source src={getImage(file.filename, this.state.images)} type="video/mp4" />
                            </video>
                        }
                        {(file.filetype ==='png' || file.filetype ==='jpeg' || file.filetype ==='jpg' || file.filetype ==='svg') && 
                            <img onClick={()=>GetUrlImage(file.filename)} src={getImage(file.filename, this.state.images)} alt="" title="" />
                        }
                        {(file.filetype ==='pdf') && <img onClick={()=>GetUrlImage(file.filename)}  src={require('../../../../assets/images/pdfimg.png')} alt="" title="" />}  
                        {(file.filetype ==='doc'|| file.filetype ==='docx' || file.filetype ==='xml' || file.filetype ==='txt') && <img onClick={()=>GetUrlImage(file.filename)} src={require('../../../../assets/images/txt1.png')} alt="" title="" />}
                        {(file.filetype ==='xls'|| file.filetype ==='xlsx' || file.filetype ==='xml' ) && <img onClick={()=>GetUrlImage(file.filename)} src={require('../../../../assets/images/xls1.svg')} alt="" title="" />} 
                        {(file.filetype ==='csv') && <img onClick={()=>GetUrlImage(file.filename)} src={require('../../../../assets/images/csv1.png')} alt="" title="" />} 
                        {(file.filetype ==='dcm') && <img onClick={()=>this.OpenDCM(file.filename)} src={require('../../../../assets/images/dcm1.png')} alt="" title="" />} 
                        <label>{(file && file.filename && file.filename.split('Trackrecord/')[1]).split("&bucket=")[0]}</label></a>   
                ))}
            </Grid>
        )
    }
}

export default Index;

