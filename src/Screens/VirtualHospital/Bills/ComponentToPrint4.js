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
        var { data, index } = this.state;
        return (
            <div className="relativeCSS">
                <div className="flash" />
                <Grid className="printPreview printprv1">
                    <table width="100%" class="makecenter" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center">
                                <img
                                    className="logo"
                                    src="/static/media/LogoPNG.03ac2d92.png"
                                    alt=""
                                    title="" />

                            </td>
                        </tr>
                    </table>
                    <table width="100%" className="TblPG2" >
                        <tr>   
                            <td>
                            <p>From</p>
                            {this.props.House && this.props.House?.label &&
                                <strong>{this.props.House?.label}</strong>}
                        </td>
                        </tr>
                    </table>
                    <table width="100%">
                        <table width="100%" className="tabL10">
                            <tr>
                                <td className="tabL10Col1 TblPG2">
                                    <p>Service Charges</p>
                                    <strong>
                                        <p>Invoice: &nbsp;{data?.invoice_id}</p>
                                        <p>Date: &nbsp;{data?.created_at}</p>
                                        <p>CustomerID: {data?.patient?.patient_id}</p>
                                    </strong>
                                </td>
                                <td className="txtalign tabL10Col2 TblPG2">
                                    <strong>
                                        <p>Bill to: {data?.patient?.first_name} &nbsp;{data?.patient?.last_name}</p>
                                        {/* <p>Company Name:</p> */}
                                    </strong>
                                </td>
                            </tr>
                        </table>

                        <table width="100%">
                            <table width="100%" bgcolor="black" className="tabL11 MedicalSer1">
                                <tr>
                                    <th width="30%" align="left">Service</th>
                                    <th width="30%">Quantity</th>
                                    <th width="30%" align="right">Price Per Quantity</th>
                                    <th width="10%" align="right">Amount</th>
                                </tr>
                            </table>
                            <table width="100%" className="secsttabhead tab12 tabLLa">
                                {/* {{ #each Invoice }} */}
                                {data?.services && data?.services?.length > 0 &&
                                    data?.services.map((item) => (
                                        <tr>
                                            <th width="31%" align="right">{item?.service}</th>
                                            <th width="30%" align="right" >{item?.quantity}</th>
                                            <th width="30%" align="right" >{item?.price_per_quantity}</th>
                                            <th width="9%" align="right">{item?.price}</th>
                                        </tr>))}
                                {/* {{/ each}} */}
                            </table>

                            <table width="100%" className="tabL3">
                                <tr>
                                    <td className="tabL3Col1" >
                                        <p>Total</p>
                                        <p>{data?.total_amount}</p>
                                        <p></p>
                                    </td>
                                </tr>
                            </table>

                            <table className="tab13 tabL4">
                                <tr>
                                    <td>
                                        <h1 className="termCond">Your Aimedis team</h1>
                                        <p className="termCond1">https://aimedis.io</p>
                                        <p>https://sys.aimedis.com</p>
                                        <p className="termCond1">If you have any questions do not hesitate to
                                            contact us via the support chat or via contact@aimedis.com</p>
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

