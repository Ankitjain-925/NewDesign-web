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
        console.log("data", this.state.data)
        return (
            <div className="relativeCSS">
                <div className="flash" />
                <Grid className="printPreview printprv1">
                    <table width="100%" className="TblPG2" >
                        <tr>{data?.services?.service}</tr>
                        <tr>
                            <th width="25%" align="left">Street Address</th>
                            <th width="20%">Address</th>
                            <th width="15%">City</th>
                        </tr>
                    </table>
                    <table width="100%">
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
                                <td className="tabL10Col1 TblPG2">

                                    <p>Service Charges</p>
                                    <strong>
                                        <p>Invoice: &nbsp;{data?.invoice_id}</p>
                                        <p>Date: &nbsp;{data?.created_at}</p>
                                        <p>CustomerID: {data?.patient?.patient_id}</p>
                                        {/* <p>Bed Number</p>
                                        <p>AdmissionDate</p> */}
                                    </strong>
                                </td>
                                <td className="txtalign tabL10Col2 TblPG2">
                                    <strong>
                                        <p>Bill to: {data?.patient?.first_name} &nbsp;{data?.patient?.last_name}</p>
                                        <p>Company Name:</p>
                                        {/* <p>Street Addresses:</p>
                                        <p>Address:</p>
                                        <p>Ciy,ST,Zip code:</p> */}
                                    </strong>
                                </td>
                            </tr>
                        </table>

                        <table width="100%">
                            <table width="100%" bgcolor="black" className="tabL11 MedicalSer1">
                                <tr>
                                    <th width="20%" align="left">Service</th>
                                    <th width="20%">Qantity</th>
                                    <th width="20%">Price Per Qantity</th>
                                    <th width="20%" align="right">Amount</th>
                                    {/* <th width="20%" align="right">Payment</th>
                                    <th width="20%" align="right">Balance</th> */}
                                </tr>
                            </table>
                            <table width="100%" className="secsttabhead tab12 tabLLa">
                                {/* {{ #each Invoice }} */}
                                {data?.services && data?.services?.length > 0 &&
                                    data?.services.map((item) => (
                                        <tr>
                                            <th width="20%">{item?.service}</th>
                                            <th width="20%" align="left">{item?.quantity}</th>
                                            <th width="20%" align="left">{item?.price_per_quantity}</th>
                                            <th width="20%" align="right">{item?.price}</th>
                                        </tr>))}
                                {/* {{/ each}} */}
                            </table>

                            <table className="tab13">
                                <tr>
                                    <td>
                                        <h1 className="termCond">Terms and Condition</h1>
                                        <p className="ThnkYU">Thank you for business send paymentwithin_____ days of receiving this invoice. There will be
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

