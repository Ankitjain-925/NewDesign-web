import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          info:{},
        };
      }
    
    render() {
        let {info}=this.state

        return (
                <Grid className="certificateBg">
                    <Grid className="headerHeight"></Grid>
                    <Grid container direction="row" justifyContent="center">
                        <Grid item xs={11} sm={11} md={10}>
                            <Grid container direction="row" spacing={5}>
                                <Grid item xs={12} sm={8} md={8}>
                                    <Grid className="certifyForm">
                                        <Grid className="insrnceCmp cmnSpc">
                                            <Grid className="insrnceLbl1"><label>Krainkenkasse bzw: Kostentrager</label></Grid>
                                            <Grid className="insrnceLbl2"><label>Insurance company</label></Grid>
                                            <Grid><input type="text"name ="Insurance_company" value={info.Insurance_company}/></Grid>
                                        </Grid>
                                        <Grid className="cmnSpc">
                                            <Grid className="insrnceLbl1"><label>Name, Vorname des Versicberten</label></Grid>
                                            <Grid container direction="row" alignItems="center" spacing={1}>
                                                <Grid item xs={12} sm={7} md={7}>
                                                    <Grid className="insrnceCmp">
                                                        <Grid className="insrnceLbl2"><label>Name First Name</label></Grid>
                                                        <Grid><input type="text" name="Name_First"  value={info.Name_First}/></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={5} md={5}>
                                                    <Grid className="insrnceCmp">
                                                        <Grid className="insrnceLbl2"><label>DOB</label></Grid>
                                                        <Grid><input type="date" name="DOB"  value={info.DOB} /></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="cmnSpc">
                                            <Grid container direction="row" alignItems="center" spacing={1}>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <Grid className="insrnceCmp">
                                                        <Grid className="insrnceLbl1">
                                                            <label>Kassen-Nr.</label></Grid>
                                                        <Grid className="insrnceLbl2">
                                                            <label>Number Insurance Company</label></Grid>
                                                        <Grid><input type="text" name="Number_Insurance" value={info.Number_Insurance}/></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <Grid className="insrnceCmp">
                                                        <Grid className="insrnceLbl1">
                                                            <label>Versicherten-Nr.</label></Grid>
                                                        <Grid className="insrnceLbl2"><label>Insurance number of Person</label></Grid>
                                                        <Grid><input type="text" name="Insurance_number" value={info.Insurance_number} /></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <Grid className="insrnceCmp">
                                                        <Grid className="insrnceLbl1">
                                                            <label>Status</label></Grid>
                                                        <Grid className="insrnceLbl2"><label>Status</label></Grid>
                                                        <Grid><input type="text" name="status"  value={info.status} /></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Grid container direction="row" alignItems="center" spacing={1}>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <Grid className="insrnceCmp">
                                                        <Grid className="insrnceLbl1">
                                                            <label>Betriebsstatten-Nr.</label></Grid>
                                                        <Grid className="insrnceLbl2">
                                                            <label>Hospital Number</label></Grid>
                                                        <Grid><input type="text"  name="hospital_number" value={info.hospital_number} /></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <Grid className="insrnceCmp">
                                                        <Grid className="insrnceLbl1">
                                                            <label>Arzt-Nr.</label></Grid>
                                                        <Grid className="insrnceLbl2"><label>Doctor Number</label></Grid>
                                                        <Grid><input type="text" name="doctor_number"  value={info.doctor_number} /></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <Grid className="insrnceCmp">
                                                        <Grid className="insrnceLbl1">
                                                            <label>Date</label></Grid>
                                                        <Grid className="insrnceLbl2"><label>Status</label></Grid>
                                                        <Grid><input type="date" name="Date" value={info.Date} /></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="certifyCheck">
                                        <Grid container direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="frstCertify">
                                                    <h3>First Time Certification</h3>
                                                    <Grid className="formGroupChk">
                                                        <input type="checkbox" id="Workincident" name="first_time"  value={info.first_time} />
                                                        <label for="Workincident">
                                                            <span>Erstbescheinigung</span>
                                                            <p>Workincident / Result of Workincident</p>
                                                        </label>
                                                    </Grid>
                                                    <Grid className="formGroupChk">
                                                        <input type="checkbox" id="disease" name="Workincident" value={info.Workincident}/>
                                                        <label for="disease"><span>Arbeitsunfall, Arbeitsunfallfolgen, Berufskrankheit</span>
                                                            <p>Occupational disease</p></label>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="frstCertify">
                                                    <h3>Continuation of certification</h3>
                                                    <Grid className="formGroupChk">
                                                        <input type="checkbox" id="Special" name="continuation" value={info.continuation} />
                                                        <label for="Special">
                                                            <span>Folgebescheinigung</span>
                                                            <p>Sent to a Special Doctor</p>
                                                        </label>
                                                    </Grid>
                                                    <Grid className="formGroupChk">
                                                        <input type="checkbox" id="Dem" name="special_doctor"   value={info.special_doctor}/>
                                                        <label for="Dem">
                                                            <span>Dem Durchgangsarzt zugewiesen</span>
                                                        </label>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="wrkSinceUpr">
                                        <Grid container direction="row" alignItems="center" className="btmSpc">
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="wrkSince">
                                                    <label>arbeitSunfanhig Seit</label>
                                                    <p>Imposible to work since</p>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="wrkInput">
                                                    <input type="date" name="imposible" value={info.imposible}  />
                                                    {/* <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} /> */}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" alignItems="center" className="btmSpc">
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="wrkSince">
                                                    <label>Voraussichtlich arbeitsunfähig bis einschließlich</label>
                                                    <p>most likely imposible to work until</p>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="wrkInput">
                                                    <input type="date"  name="most_likely" value={info.most_likely} />
                                                    
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="wrkSince">
                                                    <label>fesllgestellt am</label>
                                                    <p>detected at</p>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Grid className="wrkInput">
                                                    <input type="date" name="detected_at" value={info.detected_at} />
                                                    {/* <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} />
                                                    <input type="text" maxLength={4} /> */}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <Grid className="setArbtUpr">
                                        <Grid className="setArbt">
                                            <label>Arbeitsunfahigkeits - bescheinigung</label>
                                        </Grid>
                                        <Grid className="setArbtSign">
                                            <label>Stemp and Signature of the Doctor</label>
                                            <p>Vertragsarzlistempel / Unterschritt des Arztes</p>
                                        </Grid>    
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        );
    }
}
export default Index;