import * as React from "react";
import "./../../../assets/css/virtual_hospital.css";
import { Redirect, withRouter } from 'react-router-dom';
import { LoginReducerAim } from "Screens/Login/actions";
import { connect } from "react-redux";
import Index from "Screens/Components/FrameUse/index";
import { getLanguage } from "translations/index";
import Grid from '@material-ui/core/Grid';

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
                                                className="logo"
                                                src="/static/media/LogoPNG.03ac2d92.png"
                                                alt=""
                                                title="" />
                                        </td>
                                    </tr>
                                </table>

                                <table width="100%" className="TblPG2">
                                    <tr>
                                        <td>
                                            <p>From</p>
                                            <strong>Max hospital</strong>
                                            <p>{data?.email}</p>
                                            <p>{data?.address}</p>
                                            <p>{data?.phone}</p>
                                        </td>
                                        <td class="txtalign tabL6Col1">
                                            <p>For</p>
                                            <strong>{data?.patient?.first_name} &nbsp; {data?.patient?.last_name}</strong>
                                            <p>{data?.patient?.profile_id}</p>
                                            <p>{data?.patient?.patient_id}</p>
                                            <p>{data?.phone}</p>
                                        </td>
                                    </tr>
                                </table>

                                <table width="100%" bgcolor="black" className="tabL7 MedicalSer1">
                                    <tr>
                                        <th width="25%" align="left">Patient</th>
                                        {/* <th width="20%">D.B.O</th>
                                        <th width="15%">Gender</th>
                                        <th width="15%" align="right">Weight</th>
                                        <th width="10%" align="right">Height</th>
                                        <th width="15%" align="right">Date</th> */}
                                    </tr>
                                </table>
                                <table width="100%">

                                    <table width="100%" >
                                        <tr>
                                            <th width="25%" align="left">{data?.patient?.first_name}</th>
                                            {/* <th width="20%">{data?.patient?.first_name}</th>
                                            <th width="15%">{data?.patient?.first_name}</th>
                                            <th width="15%" align="right">{data?.patient?.first_name}</th>
                                            <th width="10%" align="right">{data?.patient?.first_name}</th>
                                            <th width="15%" align="right">{data?.patient?.first_name}</th> */}
                                        </tr>
                                    </table>

                                    <table width="100%">
                                        <table width="100%" bgcolor="black" className="tabL7 MedicalSer1">
                                            <tr>
                                                <th width="20%" align="left">Service</th>
                                                <th width="40%">Quantity</th>
                                                <th width="20%" align="right">Price Per Quantity</th>
                                                <th width="20%" align="right">Total($)</th>
                                            </tr>
                                        </table>
                                        <table width="100%" className="secsttabhead tabL8 tabLLa">
                                            {/* {{ #each Invoice }} */}
                                            {data?.services && data?.services?.length > 0 &&
                                                data?.services.map((item) => (
                                                    <tr>
                                                        <th width="20%">{item?.service}</th>
                                                        <th width="40%" align="right">{item?.quantity}</th>
                                                        <th width="20%" align="left">{item?.price_per_quantity}</th>
                                                        <th width="20%" align="right">{item?.price}</th>
                                                    </tr>))}
                                            {/* {{/ each}} */}
                                        </table>

                                        <table className="tabL9 tabL4">
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
    return <ComponentToPrint3 ref={ref} />;
});

