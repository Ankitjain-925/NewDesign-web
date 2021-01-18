import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getImage } from "./../../BasicMethod/index";
import Iframeview from "../../FrameUse/index";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import sitedata from "../../../../sitedata";
import Loader from "./../../Loader/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachfile: this.props.attachfile,
      crnt_img: false,
      openPopup: false,
      cnrttype: false,
      images: this.props.images,
      loaderImage: false,
      forZoom: {},
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.attachfile !== this.props.attachfile) {
      this.setState({ attachfile: this.props.attachfile });
    }
    if (prevProps.images !== this.props.images) {
      this.setState({ images: this.props.images });
    }
  };

  getFileName = (file) => {
    if (file && file.filename) {
      if (file.filename.split("Trackrecord/")[1]) {
        if (file.filename.split("Trackrecord/")[1].split("&bucket=")[0]) {
          return file.filename.split("Trackrecord/")[1].split("&bucket=")[0];
        } else {
          return file.filename.split("Trackrecord/")[1];
        }
      } else {
        return file.filename;
      }
    } else return "";
  };
  OpenFile = (image, type = "") => {
    if (image) {
      var find1 = image.split(".com/")[1];
      this.setState({ loaderImage: true });
      axios
        .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
        .then((response) => {
          if (response.data.hassuccessed) {
            if (
              type === "DICOM" ||
              type === "dcm" ||
              type === "DCM" ||
              type === "dicom"
            ) {
              image = response.data.data;
              this.setState({ loaderImage: false });
              // console.log('image', image)
              window.open(
                "/Dicom-file-view?input=" + encodeURIComponent(image),
                "_blank"
              );
            } else {
              image = response.data.data;
              this.setState(
                {
                  forZoom: {
                    width: 400,
                    height: 250,
                    zoomPosition: "original",
                    img: image,
                  },
                  crnt_img: image,
                  cnrttype: type,
                },
                () => {
                  this.setState({ openPopup: true, loaderImage: false });
                }
              );
            }
          } else {
            this.setState({ loaderImage: false });
          }
        });
    }
  };

  CloseFile = () => {
    this.setState({ openPopup: false, crnt_img: false, cnrttype: false });
  };

  render() {
    var item = this.state.attachfile;
    return (
      <Grid className="imgsFile">
        {this.state.loaderImage && <Loader />}
        {item &&
          item.length > 0 &&
          item.map((file) => (
            <a>
              {file.filetype === "mp4" && (
                <video width="100%" className="VideoPlay" controls>
                  <source
                    src={getImage(file.filename, this.state.images)}
                    type="video/mp4"
                  />
                </video>
              )}
              {(file.filetype === "png" ||
                file.filetype === "jpeg" ||
                file.filetype === "jpg" ||
                file.filetype === "svg") && (
                <img
                  onClick={() => this.OpenFile(file.filename, file.filetype)}
                  src={getImage(file.filename, this.state.images)}
                  alt=""
                  title=""
                />
              )}
              {file.filetype === "pdf" && (
                <img
                  onClick={() => this.OpenFile(file.filename, file.filetype)}
                  src={require("../../../../assets/images/pdfimg.png")}
                  alt=""
                  title=""
                />
              )}
              {(file.filetype === "doc" ||
                file.filetype === "docx" ||
                file.filetype === "xml" ||
                file.filetype === "txt") && (
                <img
                  onClick={() => this.OpenFile(file.filename, file.filetype)}
                  src={require("../../../../assets/images/txt1.png")}
                  alt=""
                  title=""
                />
              )}
              {(file.filetype === "xls" ||
                file.filetype === "xlsx" ||
                file.filetype === "xml") && (
                <img
                  onClick={() => this.OpenFile(file.filename, file.filetype)}
                  src={require("../../../../assets/images/xls1.svg")}
                  alt=""
                  title=""
                />
              )}
              {file.filetype === "csv" && (
                <img
                  onClick={() => this.OpenFile(file.filename, file.filetype)}
                  src={require("../../../../assets/images/csv1.png")}
                  alt=""
                  title=""
                />
              )}
              {(file.filetype === "dcm" ||
                file.filetype === "DICOM" ||
                file.filetype === "dicom" ||
                file.filetype === "DCM") && (
                <img
                  onClick={() => this.OpenFile(file.filename, file.filetype)}
                  src={require("../../../../assets/images/dcm1.png")}
                  alt=""
                  title=""
                />
              )}
              <label>{this.getFileName(file)}</label>
            </a>
          ))}

        <Modal
          open={this.state.openPopup}
          onClose={this.CloseFile}
          // className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ?"darkTheme":""}
        >
          <Grid
            className={
              this.state.cnrttype === "png" ||
              this.state.cnrttype === "jpeg" ||
              this.state.cnrttype === "jpg" ||
              this.state.cnrttype === "svg"
                ? "entryBoxCntnt SetWidthPopup1"
                : "entryBoxCntnt SetWidthPopup"
            }
          >
            <Grid className="entryCourse">
              <Grid className="entryCloseBtn">
                <a onClick={this.CloseFile}>
                  <img
                    src={require("../../../../assets/images/close-search.svg")}
                    alt=""
                    title=""
                  />
                </a>
              </Grid>
            </Grid>
            {this.state.cnrttype === "png" ||
            this.state.cnrttype === "jpeg" ||
            this.state.cnrttype === "jpg" ||
            this.state.cnrttype === "svg" ? (
              <InnerImageZoom src={this.state.crnt_img} />
            ) : (
              <Iframeview
                new_image={this.state.crnt_img}
                type={this.state.cnrttype}
                comesFrom="LMS"
              />
            )}
          </Grid>
        </Modal>
      </Grid>
    );
  }
}

export default Index;
