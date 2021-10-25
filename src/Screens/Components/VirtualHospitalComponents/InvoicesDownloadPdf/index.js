import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            status: this.props.status,
            InvoicesData: this.props.InvoicesData,
        }
    }

    downloadTrack = () => {
        var invoices = [];
        {console.log("1176711",this.state.InvoicesData)}
        if (this.state.InvoicesData && this.state.InvoicesData?.length > 0) {
            console.log("1")
             this.state.InvoicesData.map((data) => {
                 console.log("2")
                console.log("1111",data);
            });
        }
    }

    printInvoice = () =>
    {
        window.print();
    }

    render() {
        return (
            <>
                <Grid className="drftDwnload">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Grid className="draftDateLft">
                                <label>{this.state.label}</label>
                                <span>{this.state.status}</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid className="draftDateRght">
                                <Button className="downloadPDF" onClick={() => {
                                    this.downloadTrack();
                                }}>
                                    <img src={require('assets/virtual_images/downloadIcon.png')} alt="" title="" />
                                    Download PDF
                                </Button>
                                <Button className="downloadDots">
                                    <img src={require('assets/virtual_images/threeDots.png')} alt="" title="" />
                                    <Grid className="actionList">
                                        <ul className="actionPdf">
                                       
                                            <li><img src={require('assets/virtual_images/DuplicateInvoice.png')} alt="" title="" /><span>Duplicate Invoice</span></li>
                                           <a onClick={this.printInvoice}> <li><img src={require('assets/virtual_images/PrintInvoice.png')} alt="" title="" /><span>Print Invoice</span></li></a>
                                            <li><img src={require('assets/virtual_images/DownloadPDF.png')} alt="" title="" /><span>Download PDF</span></li>
                                        </ul>
                                        <ul className="setStatus">
                                            <li><span>Set status</span></li>
                                            <li><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /><span>Delete Invoice</span></li>
                                        </ul>
                                    </Grid>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Index;
