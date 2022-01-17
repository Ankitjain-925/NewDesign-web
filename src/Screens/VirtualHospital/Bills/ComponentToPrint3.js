import * as React from "react";
import "./../../../assets/css/virtual_hospital.css";
import { Redirect, withRouter } from 'react-router-dom';
import { LoginReducerAim } from "Screens/Login/actions";
import { connect } from "react-redux";
import Index from "Screens/Components/FrameUse/index";
import { getLanguage } from "translations/index";
import Grid from '@material-ui/core/Grid';
import { houseSelect } from "../Institutes/selecthouseaction";

export class ComponentToPrint3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        }
    };

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
    };
    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { AimedisInvoiceReport, ServiceList, InvoiceData, Services, CaseID, Created_at, YourAimedisTeam, aimedisIo,
            ServiceName, TotalAmount, InvoiceID, srvc, Price, quantity, contactAimedisForQuery, SysAimedis } = translate;
        var { data, index } = this.state
        return (
            <div className="relativeCSS">
                <div className="flash" />
                <Grid className="printPreview">
                    <table width="100%" bordre="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" class="maintabPart">
                        <tr>
                            <td valign="top">
                                <table width="100%" class="makecenter" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="left">
                                            {/* <strong ></strong> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <img
                                                className="pattern-main-logo"
                                                src={require("assets/virtual_images/fullLogo.png")}
                                                alt=""
                                                title="" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="WlcmAimds">Welcome to aimedis</td>
                                        <td className="invoiceidtxt">InvoiceID: &nbsp;{data?.invoice_id}</td>
                                    </tr>
                                </table>

                                <table width="100%" className="TblPG2 secsttabhead">
                                    <tr>
                                        <td>
                                            <p>From</p>
                                            <p>{data?.email}</p>
                                            <p>{data?.address}</p>
                                            <p>{data?.phone}</p>
                                        </td>
                                        <td class="txtalign tabL6Col1">
                                            <p>For</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>{this.props?.House?.label && this.props?.House.label}</strong>  </td>
                                        <td> <strong>{data?.patient?.first_name} &nbsp; {data?.patient?.last_name}</strong></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td> <p>{data?.patient?.profile_id}</p></td>
                                    </tr>
                                </table>
                                <table width="100%">
                                    <table width="100%">
                                        <table className="firsttabhead tabL3a" width="100%" bgcolor="black">
                                            <tr>
                                                <th width="30%" align="left">Service</th>
                                                <th width="30%">Price Per Quantity</th>
                                                <th width="30%">Quantity</th>
                                                <th width="10%" align="right">Amount</th>
                                            </tr>
                                        </table>
                                        <table width="100%" className="secsttabhead tabLLa">
                                            {data?.services && data?.services?.length > 0 &&
                                                data?.services.map((item) => (
                                                    <tr>
                                                        <th width="42%" >{item?.service}</th>
                                                        <th width="25%"> {item?.price_per_quantity}</th>
                                                        <th width="25%"> {item?.quantity} </th>
                                                        <th width="8%" className="tabAligPro">{item?.price}</th>
                                                    </tr>))}
                                        </table>
                                        <table width="100%" className="tabL3">
                                            <tr>
                                                <td width="68%">
                                                    <p>Total</p>
                                                </td>
                                                <td width="32%" className="tabDatPart">
                                                    <p>{data?.total_amount}</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <table className="tabL4">
                                            <tr>
                                                <td>
                                                    <h1 className="termCond termCond2">Your Aimedis team</h1><br />
                                                    <p>https://aimedis.io</p><br />
                                                    <p>https://sys.aimedis.com</p><br />
                                                    <p>If you have any questions do not hesitate to
                                                        contact us via the support chat or via contact@aimedis.com</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </table>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <table width="100%" class="makecenter" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center">
                                    <img
                                        className="pattern-main-foot1"
                                        src={require("assets/virtual_images/logo_new.png")}
                                        alt=""
                                        title="" />
                                </td>
                            </tr>
                        </table>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { House } = state.houseSelect
    return {
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        House
    };
};

export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, houseSelect })(
        Index
    )
)

export const FunctionalComponentToPrint = React.forwardRef((ref) => {
    return <ComponentToPrint3 ref={ref} />;
});

