import React, { Component } from 'react';
import Dropzone from "react-dropzone";
import Grid from '@material-ui/core/Grid';
import { Input } from '@material-ui/core';
class Loader extends Component {
    constructor(props) {
       super(props);
        this.state = {
            fileattach : [],
        };
    }
    //For upload and image previews
    UploadFiles=(e)=>
    {
        var Preview = [];
        for (var i = 0; i < e.target.files.length; i++) {
            if(e.target.files[i].name.split('.').pop()==='mp4'){
                Preview.push(require('../../../assets/images/videoIcon.png'));
            }
            if(e.target.files[i].name.split('.').pop()==='pdf'){
                Preview.push(require('../../../assets/images/pdfimg.png'));
            }
            else if(e.target.files[i].name.split('.').pop() ==='doc'|| e.target.files[i].name.split('.').pop() ==='docx' || e.target.files[i].name.split('.').pop() ==='xml' || e.target.files[i].name.split('.').pop() ==='txt'){
                Preview.push(require('../../../assets/images/txt1.png'));
            }
            else if(e.target.files[i].name.split('.').pop() ==='xls'|| e.target.files[i].name.split('.').pop() ==='xlsx' || e.target.files[i].name.split('.').pop() ==='xml'){
                Preview.push(require('../../../assets/images/xls1.svg'));
            }
            else if(e.target.files[i].name.split('.').pop() ==='csv'){
                Preview.push(require('../../../assets/images/csv1.png'));
            }
            else if(e.target.files[i].name.split('.').pop() ==='dcm'){
                Preview.push(require('../../../assets/images/dcm1.png'));
            }
            else{
                Preview.push(URL.createObjectURL(e.target.files[i]));
            }
             
        }
        this.setState({fileattach : Preview})
        this.props.fileUpload(e.target.files, this.props.name)
    }
    
    render() {
        return (
            <div>
            <Dropzone onDrop={(e)=>this.UploadFiles(e)}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                    <Input {...getInputProps()} />
                        <Grid className="browsInput">
                            <a><img src={require('../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                            <a>Browse <input type="file" onChange={(e)=>this.UploadFiles(e)} multiple={this.props.isMulti} /></a> or drag here
                        </Grid>
                        <p>Supported file types: .jpg, .png, .pdf</p>
                    </div>
                )}
            </Dropzone>
            {this.props.comesFrom && this.props.comesFrom==="journal" && this.state.fileattach && this.state.fileattach.length>0 && this.state.fileattach.map((data)=>(
                <span className="ViewImage">
                    <img src={data}/>
                </span>
            ))}
            </div>
        );
    }
}
export default Loader;




// import React, { useState } from "react";
// import Dropzone from "react-dropzone";

// export default function App( fileUpload ) {
//   const [fileNames, setFileNames] = useState([]);
// //   const handleDrop = acceptedFiles =>{
// //     console.log('acceptedfiles', acceptedFiles)
// //     setFileNames(acceptedFiles.map(file => file.name))
// //   };

//   return (
//       <Dropzone onDrop={fileUpload}>
//         {({ getRootProps, getInputProps }) => (
//           <div {...getRootProps({ className: "dropzone" })}>
//             <input {...getInputProps()} />
//             <p>Drag'n'drop files, or click to select files</p>
//           </div>
//         )}s
//       </Dropzone>
//   );
// }