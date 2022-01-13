import * as React from "react";
// import logo from "../../../logo.svg";
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import "./../../../assets/css/virtual_hospital.css";
import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { Redirect, withRouter } from 'react-router-dom';
import { LoginReducerAim } from "Screens/Login/actions";
import { connect } from "react-redux";
import Index from "Screens/Components/FrameUse/index";
import { getLanguage } from "translations/index";


export class ComponentToPrint5 extends React.Component {
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
        var { data, index } = this.state;
        return (
            <div className="relativeCSS">
                <style type="text/css" media="print"></style>
                <div className="flash" />
                <Grid className="printPreview">
                    <a><img
                        className="logo"
                        src="/static/media/LogoPNG.03ac2d92.png"
                        alt=""
                        title="" />
                    </a>
                    <div className="printPreviewText nextPart"><b>{AimedisInvoiceReport}</b></div>
                    <br />
                    <div className="printPreviewText">
                        {this.props.House && this.props.House?.label &&
                            <strong>{this.props.House?.label}</strong>}
                        <Table className="printPreviewText">
                            <Thead>
                                <Tr>
                                    <Th><b>{InvoiceData}</b></Th>
                                </Tr>
                            </Thead>
                            {/* {this.state.data && this.state.data.length > 0 && this.state.data.profile_id.map((data) => ( */}
                            <Tbody>
                                <Tr>
                                    { }
                                    <Td>{Services} : <ul>{data?.services && data?.services?.length > 0 &&
                                        data?.services.map((item) => (
                                            <li>
                                                {ServiceName}:    {item.service}<br />
                                                {srvc} {Price} / {quantity}:   {item.price}<br />
                                                {quantity}:   {item.quantity}<br />
                                            </li>
                                        ))
                                    }</ul>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>{InvoiceID} : {data?.invoice_id} </Td>
                                </Tr>
                                <Tr>
                                    <Td>{CaseID} : {data?.case_id}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{TotalAmount} : {data?.total_amount}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{Created_at} : {data.created_at}</Td>
                                </Tr>
                            </Tbody>
                            {/* ))} */}
                        </Table>
                        <br />
                        <Grid>
                            <b>{YourAimedisTeam}</b>
                            <br />
                            <b>{aimedisIo}</b>
                            <br />
                            <b>{SysAimedis}</b>
                            <br />
                            <p>{contactAimedisForQuery}</p>
                        </Grid>
                    </div>
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
    return <ComponentToPrint5 ref={ref} />;
});

// export default ComponentToPrint5;