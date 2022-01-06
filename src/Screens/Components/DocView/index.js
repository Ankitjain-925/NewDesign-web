import React, { useState } from "react"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { getDate } from "../BasicMethod/index";
import Grid from "@material-ui/core/Grid";
import { S3Image } from "Screens/Components/GetS3Images/index";
import Iframeview from "Screens/Components/FrameUse/index";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import sitedata from "sitedata";
import Loader from "Screens/Components/Loader/index";
export const DocView = ({ attachedFile, documentName, dateAdded, added_by, settings }) => {
    const [filetype, setFiletype] = useState(false);
    const [filename, setFilename] = useState(false);
    const [zoomer, setZoomer] = useState({});
    const [show, setshow] = useState(false);
    const [loaderImage, setloaderImage] = useState(false);

    const returnFilename = (file_name) => {
        let name = file_name.split("&bucket=")[0].split("/Trackrecord/")[1]
        return name
    }
    const returnFiletype = (type) => {
        if (type == "csv") return 'Excel_40x40.svg'
        else if (type == "doc") return 'Word_40x40.svg'
        else if (type == "pdf") return 'pdf.svg'
        else return 'jpg.svg'
    }

    const ViewFiles = (image, type) => {
        if (image) {
            var find1 = image.split(".com/")[1];
            setloaderImage(true);
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
                    window.open(
                      "/Dicom-file-view?input=" + encodeURIComponent(image),
                      "_blank"
                    );
                  } else {
                    image = response.data.data;
                    setFilename(image)
                    setFiletype(type)
                    setZoomer({
                        forZoom: {
                          width: 400,
                          height: 250,
                          zoomPosition: "original",
                          img: image,
                        }
                      })
                    setTimeout(() => {
                      setloaderImage(false);
                    setshow(true);
                    }, 1000);
                  }
                } else {
                 setloaderImage(false);
                }
              });
          }
    }

    return (
        <Table>
            {loaderImage && <Loader />}
            <Thead><Tr><Th>{documentName}</Th><Th className="dateAdd">{dateAdded}</Th>
                <Th>{added_by}</Th><Th></Th></Tr></Thead>
            <Tbody>
                {attachedFile?.length > 0 && attachedFile.map(attach => (
                    <Tr>
                        <Td className="docsTitle"><img src={require(`assets/virtual_images/${returnFiletype(attach.filetype)}`)} alt="" title="" />{returnFilename(attach.filename)}</Td>
                        <Td>{getDate(attach.created_on, "DD/MM/YYYY")}</Td>
                        {/* <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />{attach.created_by}</Td> */}
                        {/* <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td> */}
                        <Td className="presImg"><S3Image imgUrl={attach.created_image} />{attach.created_by}</Td>
                        <Td>
                            <Grid
                                item
                                xs={6}
                                md={6}
                                className="spcMgntRght7 presEditDot scndOptionIner"
                            >
                                <a className="openScndhrf">
                                    <img
                                        src={require("assets/images/three_dots_t.png")}
                                        alt=""
                                        title=""
                                        className="openScnd specialuty-more"
                                    />
                                    <ul>
                                        <li>
                                            <a onClick={() => { ViewFiles(attach.filename, attach.filetype); }}>
                                                <img
                                                    src={require("assets/virtual_images/eye2.png")}
                                                    alt=""
                                                    title=""
                                                />
                                                View File
                                            </a>
                                        </li>
                                    </ul>
                                </a>
                            </Grid>
                        </Td>
                    </Tr>
                ))}
            </Tbody>

            <Modal
                open={show}
                onClose={() => setshow(false)}
                className={settings && settings.setting && settings.setting.mode === 'dark' ?"darkTheme":""}
            >
                <Grid
                    className={
                    filetype === "png" ||
                    filetype === "jpeg" ||
                    filetype === "jpg" ||
                    filetype === "svg"
                        ? "entryBoxCntnt SetWidthPopup1"
                        : "entryBoxCntnt SetWidthPopup"
                    }
                >
                <Grid className="nwDiaCourse">
                    <Grid className="nwDiaCloseBtn">
                        <a onClick={() => setshow(false)}>
                            <img
                                src={require("assets/images/close-search.svg")}
                                alt=""
                                title=""
                            />
                        </a>
                    </Grid>
                </Grid>
                    {filetype === "png" ||
                    filetype === "jpeg" ||
                    filetype === "jpg" ||
                    filetype === "svg" ? (
                    <InnerImageZoom src={filename} />
                    ) : (
                    <Iframeview
                        new_image={filename}
                        type={filetype}
                        comesFrom="LMS"
                    />
                    )}
                </Grid>
                        
            </Modal>
        </Table>



    )
}