import * as React from "react";
import "./../../../assets/css/virtual_hospital.css";
import Grid from '@material-ui/core/Grid';
import { Redirect, withRouter } from 'react-router-dom';
import { LoginReducerAim } from "Screens/Login/actions";
import { connect } from "react-redux";
import Index from "Screens/Components/FrameUse/index";
import { getLanguage } from "translations/index";
import { houseSelect } from "../Institutes/selecthouseaction";


export class ComponentToPrint1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
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
        var { data, id } = this.state;

        return (
            <div className="relativeCSS">

                <div className="flash" />
                <Grid className="printPreview">
                    <body>
                        <table bordre="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" class="maintabPart">
                            <tr>
                                <td valign="top">
                                    <table width="100%" class="makecenter" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="left">
                                                <strong className="WlcmAimds">Welcome to Aimedis</strong>
                                            </td>
                                            <td align="center">
                                                <img
                                                    className="logo"
                                                    src="/static/media/fullLogo.png"
                                                    alt=""
                                                    title="" />
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" className="tabL2">

                                        <tr>
                                            <td className="tabL2Col">
                                                <p>From</p>
                                                <strong>{data.service}</strong>

                                            </td>
                                            <td className="tabL2Col1">

                                                <p>For</p>
                                                <strong>{data?.patient?.first_name} &nbsp; {data?.patient?.last_name}</strong>
                                                <p>{data?.patient?.profile_id}</p>
                                                <p>{data?.patient?.patient_id}</p>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" className="tabL2Col2">

                                        <tr>
                                            <td className="tabL2Col3">
                                                <p>Number:</p>
                                                <p>Date:</p>
                                                <p>Terms:</p>
                                            </td>
                                            <td className="tabL2Col4">
                                                <p>{data?.invoice_id}</p>
                                                <p>{data?.created_at}</p>
                                                <p>{data?.status?.label_en}</p>
                                            </td>
                                        </tr>
                                    </table>

                                    <table width="100%">

                                        <table className="firsttabhead tabL3a" width="100%" bgcolor="black">
                                            <tr>
                                                <th width="30%" align="left">Service</th>
                                                <th width="30%">Price Per Quantity</th>
                                                <th width="30%">{quantity}</th>
                                                <th width="10%" align="right">Amount</th>
                                            </tr>
                                        </table>
                                        <table width="100%" class="secsttabhead tabLLa">

                                            {/* { #each Invoice } */}

                                            {data?.services && data?.services?.length > 0 &&
                                                data?.services.map((item) => (
                                                    <tr>
                                                        <th width="32%" align="left">{item?.service}</th>
                                                        <th width="30%"> {item?.price_per_quantity}</th>
                                                        <th width="30%"> {item?.quantity} </th>
                                                        <th width="8%" align="right">{item?.price}</th>
                                                    </tr>))}
                                            {/* {/ each} */}

                                        </table>

                                        <table width="100%" className="tabL3">
                                            <tr>
                                                <td className="tabL3Col1">
                                                    <p>Total</p>
                                                </td>

                                                <td className="tabL3Col2">
                                                    <p>{data?.total_amount}</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <table className="tabL4">

                                            <tr>
                                                <td>
                                                    <h1 className="termCond termCond2">Your Aimedis team</h1>
                                                    <p className="termCond1">https://aimedis.io</p>
                                                    <p>https://sys.aimedis.com</p>
                                                    <p className="termCond1">If you have any questions do not hesitate to
                                                        contact us via the support chat or via contact@aimedis.com</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                </Grid>
            </div >
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
    connect(mapStateToProps, { LoginReducerAim }, houseSelect,)(
        Index
    )
)

export const FunctionalComponentToPrint = React.forwardRef((ref) => {
    return <ComponentToPrint1 ref={ref} />;
});

