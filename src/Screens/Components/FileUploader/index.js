import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Grid from "@material-ui/core/Grid";
import { Input } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import { LanguageFetchReducer } from "../../actions";
import * as translationEN from "../../../translations/en.json";
import * as translationDE from "../../../translations/de.json";
import * as translationPT from "../../../translations/pt.json";
import * as translationSP from "../../../translations/sp.json";
import * as translationRS from "../../../translations/rs.json";
import * as translationSW from "../../../translations/sw.json";
import * as translationCH from "../../../translations/ch.json";
import * as translationNL from "../../../translations/nl.json";
import * as translationFR from "../../../translations/fr.json";
import * as translationAR from "../../../translations/ar.json";
class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileattach: [],
    };
  }

  //For upload and image previews
  UploadFiles = (files) => {
    var Preview = [];
    for (var i = 0; i < files.length; i++) {
      if (files[i].name.split(".").pop() === "mp4") {
        Preview.push(require("../../../assets/images/videoIcon.png"));
      }
      if (files[i].name.split(".").pop() === "pdf") {
        Preview.push(require("../../../assets/images/pdfimg.png"));
      } else if (
        files[i].name.split(".").pop() === "doc" ||
        files[i].name.split(".").pop() === "docx" ||
        files[i].name.split(".").pop() === "xml" ||
        files[i].name.split(".").pop() === "txt"
      ) {
        Preview.push(require("../../../assets/images/txt1.png"));
      } else if (
        files[i].name.split(".").pop() === "xls" ||
        files[i].name.split(".").pop() === "xlsx" ||
        files[i].name.split(".").pop() === "xml"
      ) {
        Preview.push(require("../../../assets/images/xls1.svg"));
      } else if (files[i].name.split(".").pop() === "csv") {
        Preview.push(require("../../../assets/images/csv1.png"));
      } else if (
        files[i].name.split(".").pop() === "dcm" ||
        files[i].name.split(".").pop() === "DCM" ||
        files[i].name.split(".").pop() === "DICOM" ||
        files[i].name.split(".").pop() === "dicom"
      ) {
        Preview.push(require("../../../assets/images/dcm1.png"));
      } else {
        Preview.push(URL.createObjectURL(files[i]));
      }
    }
    this.setState({ fileattach: Preview });
    this.props.fileUpload(files, this.props.name);
  };

  render() {
    let translate = {};
    switch (this.props.stateLanguageType) {
      case "en":
        translate = translationEN.text;
        break;
      case "de":
        translate = translationDE.text;
        break;
      case "pt":
        translate = translationPT.text;
        break;
      case "sp":
        translate = translationSP.text;
        break;
      case "rs":
        translate = translationRS.text;
        break;
      case "nl":
        translate = translationNL.text;
        break;
      case "ch":
        translate = translationCH.text;
        break;
      case "sw":
        translate = translationSW.text;
        break;
      case "fr":
        translate = translationFR.text;
        break;
      case "ar":
        translate = translationAR.text;
        break;
      default:
        translate = translationEN.text;
    }
    let {
      browse,
      suported_file_type_jpg_png,
      BodySchemeNotes,
      or_drag_here,
    } = translate;
    return (
      <div>
        <Dropzone onDrop={(e) => this.UploadFiles(e)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <Input {...getInputProps()} />
              <Grid className="browsInput">
                <a>
                  <img
                    src={require("../../../assets/images/upload-file.svg")}
                    alt=""
                    title=""
                  />
                </a>
                <a>
                  {browse}{" "}
                  <input
                    type="file"
                    onChange={(e) => this.UploadFiles(e.target.files)}
                    multiple={this.props.isMulti}
                  />
                </a>{" "}
                {or_drag_here}
              </Grid>
              <p>{suported_file_type_jpg_png}</p>
            </div>
          )}
        </Dropzone>
        {this.props.comesFrom &&
          this.props.comesFrom === "journal" &&
          this.state.fileattach &&
          this.state.fileattach.length > 0 &&
          this.state.fileattach.map((data) => (
            <span className="ViewImage">
              <img src={data} />
            </span>
          ))}
          {this.props.comesFrom && this.props.comesFrom === "admin" && this.state.fileattach && this.state.fileattach.length > 0 && this.state.fileattach.map((data) => (
            <span className="preview_img">
                <img src={data} />
            </span>
          ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default pure(
  withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Loader))
);

// import React, { useState } from "react";
// import Dropzone from "react-dropzone";

// export default function App( fileUpload ) {
//   const [fileNames, setFileNames] = useState([]);
// //   const handleDrop = acceptedFiles =>{
// //     // console.log('acceptedfiles', acceptedFiles)
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
