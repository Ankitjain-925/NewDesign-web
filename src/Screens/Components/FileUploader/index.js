import React, { Component } from 'react';
import Dropzone from "react-dropzone";
import Grid from '@material-ui/core/Grid';
import { Input } from '@material-ui/core';
class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Dropzone onDrop={(e)=>this.props.fileUpload(e, this.props.name)}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                    <Input {...getInputProps()} />
                        <Grid className="browsInput">
                            <a><img src={require('../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                            <a>Browse <input type="file" /></a> or drag here
                        </Grid>
                        <p>Supported file types: .jpg, .png, .pdf</p>
                    </div>
                )}
            </Dropzone>
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