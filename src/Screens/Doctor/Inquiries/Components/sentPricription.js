import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Loader from "Screens/Components/Loader/index.js";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import sitedata from "sitedata";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import Modal from "@material-ui/core/Modal";
import { LanguageFetchReducer } from "Screens/actions";
import { getDate, getImage } from "Screens/Components/BasicMethod/index";
import {
    getLanguage
} from "translations/index"
import Pagination from "Screens/Components/Pagination/index";
import { commonHeader } from "component/CommonHeader/index";
function TabContainer(props) {
    return (
        <Typography component="div" className="tabsCntnts">
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPrescp: false,
            openReject: false,
            specialistOption: null,
            value: 0,
            MypatientsData: [],
            sickData: {},
            openDetail: {},
            inqstatus: null,
            message: "",
            saveAttach: false,
            send_to_timeline: false,
        };
    }

    componentDidMount() {
        this.getSentPriscriptions();
    }

    getSentPriscriptions() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token;
        axios
            .get(sitedata.data.path + "/emergency_record/getSentPrescription/" + this.props.stateLoginValueAim.user._id,
                commonHeader(user_token))
            .then((response) => {
                if (response.data.hassuccessed) {
                    var images = [];
                    let image1 = []
                    let sentPres = []
                    response.data.data &&
                        response.data.data.length > 0 &&
                        response.data.data.map(track => {
                            if (track.image) {
                                let pharmaImg = track.image && track.image.split(".com/")[1];
                                axios
                                    .get(sitedata.data.path + "/aws/sign_s3?find=" + pharmaImg)
                                    .then((resp) => {
                                        if (resp.data.hassuccessed) {
                                            track.new_image = resp.data.data;
                                            image1.push({
                                                image: track.image,
                                                new_image: resp.data.data,
                                            });
                                            this.setState({ image1: image1 });
                                        }
                                    });
                            }
                            track.track_record = track.track_record.filter((e) => e != null);
                            track.track_record &&
                                track.track_record.length > 0 &&
                                track.track_record.map((item) => {

                                    let find = item && item.patient_image && item.patient_image;
                                    if (find) {
                                        var find1 = find.split(".com/")[1];
                                        axios
                                            .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
                                            .then((response2) => {
                                                if (response2.data.hassuccessed) {
                                                    item.new_image = response2.data.data;
                                                    images.push({
                                                        image: find,
                                                        new_image: response2.data.data,
                                                    });
                                                    this.setState({ images: images });
                                                }
                                            });
                                    }
                                    item.attachfile &&
                                        item.attachfile.length > 0 &&
                                        item.attachfile.map((data, index) => {
                                            var find = data && data.filename && data.filename;
                                            if (find) {
                                                var find1 = find.split(".com/")[1];
                                                axios
                                                    .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
                                                    .then((response2) => {
                                                        if (response2.data.hassuccessed) {
                                                            images.push({
                                                                image: find,
                                                                new_image: response2.data.data,
                                                            });
                                                            this.setState({ images: images });
                                                        }
                                                    });
                                            }
                                        });
                                    item["image"] = track.image
                                    item["pharmacist"] = track.first_name + " " + track.last_name
                                    sentPres.push(item)
                                });
                        })

                    var totalPage = Math.ceil(sentPres.length / 10);
                    this.setState(
                        {
                            AllSentPres: sentPres,
                            loaderImage: false,
                            totalPage: totalPage,
                            currentPage: 1,
                        },
                        () => {
                            if (totalPage > 1) {
                                var pages = [];
                                for (var i = 1; i <= this.state.totalPage; i++) {
                                    pages.push(i);
                                }
                                this.setState({
                                    MypatientsData: this.state.AllSentPres.slice(0, 10),
                                    pages: pages,
                                });
                            } else {
                                this.setState({ MypatientsData: this.state.AllSentPres });
                            }
                        }
                    );
                }
                this.setState({ loaderImage: false });
            })
            .catch((error) => {
                this.setState({ loaderImage: false });
            });
    }

    getImage = (image) => {
        const myFilterData =
            this.state.images &&
            this.state.images.length > 0 &&
            this.state.images.filter((value, key) => value.image === image);
        if (myFilterData && myFilterData.length > 0) {
            return myFilterData[0].new_image;
        }
    };


    //For chnage the page
    onChangePage = (pageNumber) => {
        this.setState({
            MypatientsData: this.state.AllSentPres.slice(
                (pageNumber - 1) * 10,
                pageNumber * 10
            ),
            currentPage: pageNumber,
        });
    };

    // fancybox open
    handleOpenPres = (data) => {
        this.setState({ openPres: true, openDetail: data });
    };
    handleClosePres = () => {
        this.setState({ openPres: false, openDetail: {} });
    };

    render() {
        const { inqstatus, sickData, MypatientsData, imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (
                <img
                    style={{ borderRadius: "10%", maxWidth: 350, marginBottom: 10 }}
                    src={imagePreviewUrl}
                />
            );
        }
        let translate = getLanguage(this.props.stateLanguageType)
        let {
            previous,
            next,
            status,
            recved_on,
            Patient,
            fors,
            req_updated_successfully,
            Pharmacist,
            handled,
            Remarks,
            prescription,
            see_details,
            RBPharmacy
        } = translate;


        return (
            <div>
                {this.state.successfullsent && (
                    <div className="success_message">{req_updated_successfully}</div>
                )}
                <Grid className="presOpinionIner">
                    {this.state.loaderImage && <Loader />}
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>{Pharmacist}</Th>
                                <Th>{recved_on}</Th>
                                <Th>{Patient}</Th>
                                <Th>{Remarks}</Th>
                                <Th>{status}</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {MypatientsData &&
                                MypatientsData.length > 0 &&
                                MypatientsData.map((data, index) => (
                                    <Tr>
                                        <Td className="presImg">
                                            <img
                                                src={data.image ? getImage(data.image, this.state.image1) : require("assets/images/useru.jpg")}
                                                alt=""
                                                title=""
                                            />
                                            {data.pharmacist && data.pharmacist}
                                        </Td>
                                        <Td>
                                            {data.created_on
                                                ? getDate(
                                                    data.created_on,
                                                    this.props.settings.setting
                                                        ? this.props.settings.setting.date_format
                                                        : "DD/MM/YYYY"
                                                )
                                                : "Not mentioned"}
                                        </Td>
                                        <Td className="presImg">
                                            <img
                                                src={
                                                    data.patient_image
                                                        ? getImage(
                                                            data.patient_image,
                                                            this.state.images
                                                        )
                                                        : require("assets/images/dr1.jpg")
                                                }
                                                alt=""
                                                title=""
                                            />
                                            {data.patient_name && data.patient_name} {data.patient_alies_id && data.patient_alies_id}

                                        </Td>
                                        <Td>{data.remark && data.remark}</Td>
                                        {data.status === "handled" ? (
                                            <Td>
                                                <span className="revwGren"></span> {handled}
                                            </Td>
                                        ) : (
                                            <Td>
                                                <span className="revwGry"></span> {RBPharmacy}
                                            </Td>
                                        )}
                                        <Td className="presEditDot scndOptionIner">
                                            <a className="openScndhrf">
                                                <img
                                                    src={require("assets/images/three_dots_t.png")}
                                                    alt=""
                                                    title=""
                                                    className="openScnd"
                                                />
                                                <ul>
                                                    <li>
                                                        <a
                                                            onClick={() => {
                                                                this.handleOpenPres(data);
                                                            }}
                                                        >
                                                            <img
                                                                src={require("assets/images/details.svg")}
                                                                alt=""
                                                                title=""
                                                            />
                                                            {see_details}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </a>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>

                    {/* End of Reject Model setup */}
                    <Grid className="tablePagNum">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="totalOutOff">
                                    <a>
                                        {this.state.currentPage} of {this.state.totalPage}
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {this.state.totalPage > 1 && (
                                    <Grid className="prevNxtpag">
                                        {/* {this.state.currentPage != 1 && (
                                            <a
                                                className="prevpag"
                                                onClick={() => {
                                                    this.onChangePage(this.state.currentPage - 1);
                                                }}
                                            >
                                                {previous}
                                            </a>
                                        )}
                                        {this.state.pages &&
                                            this.state.pages.length > 0 &&
                                            this.state.pages.map((item, index) => (
                                                <a
                                                    className={
                                                        this.state.currentPage == item &&
                                                        "activePageDocutmet"
                                                    }
                                                    onClick={() => {
                                                        this.onChangePage(item);
                                                    }}
                                                >
                                                    {item}
                                                </a>
                                            ))}
                                        {this.state.currentPage != this.state.totalPage && (
                                            <a
                                                className="nxtpag"
                                                onClick={() => {
                                                    this.onChangePage(this.state.currentPage + 1);
                                                }}
                                            >
                                                {next}
                                            </a>
                                        )} */}
                                        <Pagination totalPage={this.state.totalPage} currentPage={this.state.currentPage} pages={this.state.pages} onChangePage={(page) => { this.onChangePage(page) }} />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Modal
                    open={this.state.openPres}
                    onClose={this.handleClosePres}
                    className={
                        this.props.settings &&
                            this.props.settings.setting &&
                            this.props.settings.setting.mode === "dark"
                            ? "darkTheme presBoxModel"
                            : "presBoxModel"
                    }
                >
                    <Grid className="presBoxCntnt">
                        <Grid className="presCourse">
                            <Grid className="presCloseBtn">
                                <a onClick={this.handleClosePres}>
                                    <img
                                        src={require("assets/images/close-search.svg")}
                                        alt=""
                                        title=""
                                    />
                                </a>
                            </Grid>
                            <p>
                                {prescription} {fors}
                            </p>
                            <Grid>
                                <label>
                                    {" "}
                                    {this.state.openDetail.patient_name &&
                                        this.state.openDetail.patient_name}
                                </label>
                            </Grid>
                        </Grid>

                        <Grid className="medicInqUpr">
                            <Grid className="prescripList">
                                <Grid>
                                    {this.state.openDetail &&
                                        this.state.openDetail.attachfile &&
                                        this.state.openDetail.attachfile.length >
                                        0 &&
                                        this.state.openDetail.attachfile.map(
                                            (file) => (
                                                <div>
                                                    {file.filetype === "pdf" && (
                                                        <iframe
                                                            className="FramesetHeightWidth"
                                                            width={700}
                                                            height="500"
                                                            src={getImage(
                                                                file.filename,
                                                                this.state.images
                                                            )}
                                                            frameborder="0"
                                                            allowtransparency="true"
                                                            allowfullscreen
                                                        ></iframe>
                                                    )}
                                                    {(file.filetype === "png" ||
                                                        file.filetype === "jpeg" ||
                                                        file.filetype === "jpg" ||
                                                        file.filetype === "svg") && (
                                                            <img
                                                                src={getImage(
                                                                    file.filename,
                                                                    this.state.images
                                                                )}
                                                                alt=""
                                                                title=""
                                                            />
                                                        )}
                                                </div>
                                            )
                                        )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const {
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
    } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    };
};
export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
        Index
    )
);
