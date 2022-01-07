import * as React from "react";
import "./../../../assets/css/virtual_hospital.css";
import { Redirect, withRouter } from 'react-router-dom';
import { LoginReducerAim } from "Screens/Login/actions";
import { connect } from "react-redux";
import Index from "Screens/Components/FrameUse/index";
import { getLanguage } from "translations/index";
import Grid from '@material-ui/core/Grid';

export class ComponentToPrint4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    };

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { AimedisInvoiceReport, ServiceList, InvoiceData, Services, CaseID, Created_at, YourAimedisTeam, aimedisIo,
            ServiceName, TotalAmount, InvoiceID, srvc, Price, quantity, contactAimedisForQuery, SysAimedis } = translate;
        var { data, index } = this.props;
        return (
            <div className="relativeCSS">
                <div className="flash" />
                <Grid className="printPreview">
                    <table width="100%" >
                        <tr>{data?.services?.service}</tr>
                        <tr>
                            <th width="25%" align="left">Street Address</th>
                            <th width="20%">Address</th>
                            <th width="15%">City</th>
                        </tr>
                    </table>
                    <table>
                        <table width="100%">
                            <tr>
                                <th width="25%" align="left">Phone:</th>
                                <th width="20%">Fax</th>
                                <th width="15%">E-mail</th>
                            </tr>
                        </table>
                        <table width="100%" >
                            <tr>
                                <th width="25%" align="left"></th>
                                <th width="20%"></th>
                                <th width="15%"></th>
                            </tr>
                        </table>
                        <table width="100%" className="tabL10">
                            <tr>
                                <td className="tabL10Col1">

                                    <p>Service Charges</p>
                                    <strong>
                                        <p>Invoice: &nbsp;{data?.invoice_id}</p>
                                        <p>Date: &nbsp;</p>
                                        <p>CustomerID:{data?.patient?.patient_id}</p>
                                        <p>Bed Number</p>
                                        <p>AdmissionDate</p>
                                    </strong>
                                </td>
                                <td className="txtalign tabL10Col2">
                                    <strong>
                                        <p>Bill to:{data?.patient?.first_name} &nbsp; {data?.patient?.last_name}</p>
                                        <p>Company Name:</p>
                                        <p>Street Addresses:</p>
                                        <p>Address:</p>
                                        <p>Ciy,ST,Zip code:</p>
                                    </strong>
                                </td>
                            </tr>
                        </table>

                        <table>
                            <table width="100%" bgcolor="black" className="tabL11">
                                <tr>
                                    <th width="20%" align="left">Medicine</th>
                                    <th width="20%">Equipment</th>
                                    <th width="20%" align="right">Amount</th>
                                    <th width="20%" align="right">Payment</th>
                                    <th width="20%" align="right">Balance</th>
                                </tr>
                            </table>
                            <table width="100%" className="secsttabhead tab12">
                                {/* {{ #each Invoice }} */}
                                <tr>
                                    <th width="20%" align="left">{data?.services?.price_per_quantity}</th>
                                    <th width="20%">{data?.services?.service}</th>
                                    <th width="20%" align="right">{data?.services?.price}</th>
                                </tr>
                                {/* {{/ each}} */}
                            </table>

                            <table className="tab13">
                                <tr>
                                    <td>
                                        <h1>Terms and Condition</h1>
                                        <p>Thank you for business send paymentwithin_____ days of receiving this invoice. There will be
                                            a ____% per______on late invoices.</p>
                                    </td>
                                </tr>
                            </table>
                        </table>
                    </table>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    return {
        stateLoginValueAim, loadingaIndicatoranswerdetail
    };
};

export default withRouter(
    connect(mapStateToProps, { LoginReducerAim })(
        Index
    )
)

export const FunctionalComponentToPrint = React.forwardRef((ref) => {
    return <ComponentToPrint4 ref={ref} />;
});

