import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { getImage } from './../../BasicMethod/index';
import Iframeview from '../../FrameUse/index';
import Modal from '@material-ui/core/Modal';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attachfile : this.props.attachfile,
            crnt_img : false,
            openPopup : false,
            cnrttype : false,
            images: this.props.images
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

    OpenFile = (image)=>{
        console.log('images',image, this.state.images)
        image = getImage(image, this.state.images)
        this.setState({openPopup: true, crnt_img: image, cnrttype : (image.split("&bucket=")[0]).split('.').pop() })
    }

    CloseFile = ()=>{
        this.setState({openPopup: false, crnt_img: false, cnrttype : false})
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
                            <img onClick={()=>this.OpenFile(file.filename)} src={getImage(file.filename, this.state.images)} alt="" title="" />
                        }
                        {(file.filetype ==='pdf') && <img onClick={()=>this.OpenFile(file.filename)}  src={require('../../../../assets/images/pdfimg.png')} alt="" title="" />}  
                        {(file.filetype ==='doc'|| file.filetype ==='docx' || file.filetype ==='xml' || file.filetype ==='txt') && <img onClick={()=>this.OpenFile(file.filename)} src={require('../../../../assets/images/txt1.png')} alt="" title="" />}
                        {(file.filetype ==='xls'|| file.filetype ==='xlsx' || file.filetype ==='xml' ) && <img onClick={()=>this.OpenFile(file.filename)} src={require('../../../../assets/images/xls1.svg')} alt="" title="" />} 
                        {(file.filetype ==='csv') && <img onClick={()=>this.OpenFile(file.filename)} src={require('../../../../assets/images/csv1.png')} alt="" title="" />} 
                        {(file.filetype ==='dcm') && <img onClick={()=>this.OpenFile(file.filename)} src={require('../../../../assets/images/dcm1.png')} alt="" title="" />} 
                        <label>{(file && file.filename && file.filename.split('Trackrecord/')[1]).split("&bucket=")[0]}</label></a>   
                ))}

            <Modal
                open={this.state.openPopup}
                onClose={this.CloseFile}
                // className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ?"darkTheme":""}
                >
                <Grid className="entryBoxCntnt SetWidthPopup">
                    <Grid className="entryCourse">
                        <Grid className="entryCloseBtn">
                            <a onClick={this.CloseFile}>
                                <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                            </a>
                        </Grid>
                    </Grid>

                    <Iframeview new_image={this.state.crnt_img} type={this.state.cnrttype} comesFrom= "LMS"/> 
                </Grid>
            </Modal>
                
            </Grid>
        )
    }
}

export default Index;

