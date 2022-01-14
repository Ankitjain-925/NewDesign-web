import * as React from "react";
import "./../../../assets/css/virtual_hospital.css";
import { Redirect, withRouter } from 'react-router-dom';
import { LoginReducerAim } from "Screens/Login/actions";
import { connect } from "react-redux";
import Index from "Screens/Components/FrameUse/index";
import { getLanguage } from "translations/index";
import Grid from '@material-ui/core/Grid';
import { houseSelect } from "../Institutes/selecthouseaction";

export class ComponentToPrint2 extends React.Component {
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
                <Grid className="printPreview">
                    <table width="100%" bordre="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" class="maintabPart">
                        <tr>
                            <td valign="top">
                                <table width="100%" class="makecenter" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="left">
                                            <strong className="WlcmAimds">Welcome to Aimedis</strong>
                                        </td>
                                        <td align="right">
                                            <img
                                                className="pattern-main-logo"
                                                src={require("assets/virtual_images/fullLogo.png")}
                                                alt=""
                                                title="" />
                                        </td>
                                    </tr>
                                </table>

                                <table width="100%" className="TblPG2">
                                    <tr>
                                        <td >
                                            
                                            <p>From</p>
                                            <strong>{this.props?.House?.label && this.props?.House.label}</strong>
                                            {/* <strong>Max Hospital</strong> */}
                                            {/* <p>{data?.email}</p>
                                            <p>{data?.address}</p>
                                            <p>{data?.phone}</p> */}

                                        </td>
                                        <td >
                                            <p>For</p>
                                            <strong>{data?.patient?.first_name} &nbsp; {data?.patient?.last_name}</strong>
                                            <p>{data?.patient?.profile_id}</p>
                                            {/* <p>{data?.patient?.patient_id}</p> */}
                                            {/* <p>{data?.phone}</p> */}
                                        </td>

                                        <td>
                                            <strong><p>Invoice &nbsp;{data?.invoice_id}</p></strong>
                                            <p>Due Date &nbsp;{data?.created_at}</p>
                                        </td>
                                    </tr>
                                </table>

                                <table width="100%">
                                    <table width="100%" className="MedicalSer MedicalSer1">
                                        <tr>
                                            <th width="25%" align="left">Service</th>
                                            <th width="20%">Quantity</th>
                                            <th width="25%">Price Per Quantity</th>
                                            <th width="15%" align="right">Total($)</th>

                                        </tr>
                                    </table>
                                    <table width="100%" className="tabLLa">
                                        {/* {{ #each Invoice }} */}
                                        {data?.services && data?.services?.length > 0 &&
                                            data?.services.map((item) => (
                                                <tr>
                                                    <th width="25%" align="left">{item?.service}</th>
                                                    <th width="20%">{item?.quantity}</th>
                                                    <th width="25%">{item?.price_per_quantity}</th>
                                                    <th width="15%" align="right">{item?.price}</th>
                                                </tr>))}
                                        {/* {{/ each}} */}
                                    </table>

                                    <table className="tabL5 tabL4">

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
    return <ComponentToPrint2 ref={ref} />;
});

