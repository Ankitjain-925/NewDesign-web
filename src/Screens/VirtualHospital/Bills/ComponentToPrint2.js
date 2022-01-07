import * as React from "react";
import "./../../../assets/css/virtual_hospital.css";
import { Redirect, withRouter } from 'react-router-dom';
import { LoginReducerAim } from "Screens/Login/actions";
import { connect } from "react-redux";
import Index from "Screens/Components/FrameUse/index";
import { getLanguage } from "translations/index";
import Grid from '@material-ui/core/Grid';

export class ComponentToPrint2 extends React.Component {
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
                    <table width="100%" bordre="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" class="maintabPart">
                        <tr>
                            <td valign="top">
                                <table width="100%" class="makecenter" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="left">
                                            <strong>Welcome to Aimedis</strong>
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

                                <table width="100%">
                                    <tr>
                                        <td >
                                            <p>From</p>
                                            <strong>{data?.services?.service}</strong>
                                            <p>{data?.email}</p>
                                            <p>{data?.address}</p>
                                            <p>{data?.phone}</p>

                                        </td>
                                        <td >
                                            <p>For</p>
                                            <strong>{data?.patient?.first_name} &nbsp; {data?.patient?.last_name}</strong>
                                            <p>{data?.patient?.profile_id}</p>
                                            <p>{data?.patient?.patient_id}</p>
                                            <p>{data?.phone}</p>
                                        </td>

                                        <td>
                                            <strong><p>Invoice &nbsp;{data?.invoice_id}</p></strong>
                                            <p>Due Date &nbsp;{data?.created_at}</p>
                                        </td>
                                    </tr>
                                </table>

                                <table>
                                    <table  className="MedicalSer">
                                        <tr>
                                            <th width="25%" align="left">Medical Services Performed</th>
                                            <th width="25%">Medication</th>
                                            <th width="20%">Patient</th>
                                            <th width="15%" align="right">Rate($)</th>
                                            <th width="15%" align="right">Total($)</th>

                                        </tr>
                                    </table>
                                    <table width="100%">
                                        {/* {{ #each Invoice }} */}
                                        <tr>
                                            <th width="25%" align="left">{data?.services?.service}</th>
                                            <th width="25%">{data?.services?.price_per_quantity}</th>
                                            <th width="20%">{data?.services?.quantity}</th>
                                            <th width="15%" align="right">{data?.services?.price}</th>
                                        </tr>
                                        {/* {{/ each}} */}
                                    </table>

                                    <table className="tabL5">
                                
                                        <tr>
                                            <td>
                                                <h1 className="termCond">Terms and Condition</h1>
                                                <p>Thank you for business send paymentwithin_____ days of receiving this invoice. There will be a ____% per______on late invoices.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </table>
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
    return <ComponentToPrint2 ref={ref} />;
});

