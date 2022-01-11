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
            data : this.props.data
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
        console.log("data", this.state.data)
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
                                            <td align="right">
                                                <img
                                                    className="logo"
                                                    src="/static/media/LogoPNG.03ac2d92.png"
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
                                                {/* <p>{data?.phone}</p> */}
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" className="tabL2Col2">

                                        <tr>
                                            <td className="tabL2Col3">

                                                <p>Number</p>
                                                <p>Date</p>
                                                <p>Terms</p>
                                                {/* <p>Due</p> */}
                                            </td>
                                            <td className="tabL2Col4">

                                                <p>{data?.invoice_id}</p>
                                                <p>{data?.created_at}</p>
                                                <p>{data?.status?.label_en}</p>
                                                {/* <p>{data?.due_date}</p> */}
                                            </td>
                                        </tr>
                                    </table>

                                    <table width="100%">

                                        <table className="firsttabhead tabL3a" width="100%" bgcolor="black">
                                            <tr>
                                                <th width="70%" align="left">Service</th>
                                                <th width="8%">Price Per Quantity</th>
                                                <th width="8%">{quantity}</th>
                                                <th width="14%" align="right">Amount</th>
                                            </tr>
                                        </table>
                                        <table width="100%" class="secsttabhead tabL3Col1 tabLLa">

                                            {/* { #each Invoice } */}

                                            {data?.services && data?.services?.length > 0 &&
                                                data?.services.map((item) => (
                                                    <tr>
                                                        <th width="70%" align="left">{item?.service}</th>
                                                        <th width="8%"> {item?.price_per_quantity}</th>
                                                        <th width="8%"> {item?.quantity} </th>
                                                        <th width="14%" align="right">{item?.price}</th>
                                                    </tr>))}
                                            {/* {/ each} */}

                                        </table>

                                        <table width="100%" className="tabL3">
                                            <tr>
                                                <td className="tabL3Col1">
                                                    <p>Subtotal</p>
                                                    {/* <p>Tax(7%)</p> */}
                                                    <p>Total</p>
                                                    {/* <strong>Balance Due</strong> */}
                                                </td>

                                                <td className="tabL3Col2">
                                                    <p>Subtotal</p>
                                                    {/* <p>Tax(7%)</p> */}
                                                    <p>{data?.total_amount}</p>
                                                    {/* <strong>Balance Due</strong> */}
                                                </td>
                                            </tr>
                                        </table>

                                        <table className="tabL4">

                                            <tr>
                                                <td>
                                                    <p>Notes any relevant info, terms, paymant instruction, e.t.c.</p>
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

