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


export class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        console.log("props", this.props);

    };

    render() {
        var { data, index } = this.props;
        return (
            <div className="relativeCSS">
                {console.log('data', this.props.data)}
                <style type="text/css" media="print"></style>
                <div className="flash" />
                <Grid className="printPreview">
                    <a><img
                        className="logo"
                        src="/static/media/LogoPNG.03ac2d92.png"
                        alt=""
                        title="" />
                    </a>
                    <div className="printPreviewText nextPart"><b>Aimedis Invoice Report</b></div>
                    <br />
                    <div className="printPreviewText">
                        <label><b>Service List</b></label>
                        <Table className="printPreviewText">
                            <Thead>
                                <Tr>
                                    <Th><b>Invoice Data</b></Th>
                                </Tr>
                            </Thead>
                            {/* {this.state.data && this.state.data.length > 0 && this.state.data.profile_id.map((data) => ( */}
                            <Tbody>
                                <Tr>
                                    { }
                                    <Td>Services : <ul>{data?.services && data?.services?.length>0 && 
                                    data?.services.map((item)=>(
                                        <li>
                                         Service Name:    {item.service}<br/>
                                         Service Price / quantity:   {item.price}<br/>
                                         quantity:   {item.quantity}<br/>
                                        </li>   
                                    ))
                                    }</ul>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Invoice ID : {data?.invoice_id} </Td>
                                </Tr>
                                <Tr>
                                    <Td>Case ID : {data?.case_id}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Total Amount : {data?.total_amount}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Created at : {data.created_at}</Td>
                                </Tr>
                            </Tbody>
                            {/* ))} */}
                        </Table>
                        <br />
                        <Grid>
                            <b>Your Aimedis Team</b>
                            <br />
                            <b>https://aimedis.io</b>
                            <br />
                            <b>https://sys.aimedis.com</b>
                            <br />
                            <p>If you have any questions do not hesitate to contact us via the support chat or via contact@aimedis.com</p>
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
    return <ComponentToPrint ref={ref} />;
});

// export default ComponentToPrint;