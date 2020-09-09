import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import axios from "axios"
import Highcharts from "highcharts/highstock";
import Battery30Icon from '@material-ui/icons/Battery30';
import Battery60Icon from '@material-ui/icons/Battery60';
import Battery90Icon from '@material-ui/icons/Battery90';
import HighchartsReact from "highcharts-react-official";


const withingsMeasureType = {
    Weight: 1,
    Height: 4,
    FatFreeMass: 5,
    FatRatio: 6,
    FatMassWeight: 8,
    DiastolicBloodPressure: 9,
    SystolicBloodPressure: 10,
    HeartPulse: 11,
    Temperature: 12,
    SP02: 54,
    BodyTemperature: 71,
    SkinTemperature: 73,
    MuscleMass: 76,
    Hydration: 77,
    BoneMass: 88,
    PulseWaveVelocity: 91,
};

function TabContainer(props) {
    return (
        <Typography component="div" className="tabsCntnts">
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            openSrvc: false,
            vData: false,
            fitbitloggedIn: false,
            withingsloggedIn: false,
            apidata: []
        };
    }

    componentDidMount() {
        if (this.state.withingsloggedIn) {
            this.logoutfromall()
        }
        if (window.location.hash) {
            let fitbitToken = window.location.hash.slice(1).split("&")[0].replace("access_token=", "")
            localStorage.setItem('fitbit_token', JSON.stringify(fitbitToken))
            localStorage.removeItem("withings_token")
            this.setState({ fitbitloggedIn: true, withingsloggedIn: false })
            this.fetchFitbitData("devices.json", fitbitToken, "device")
            this.fetchFitbitData("profile.json", fitbitToken, "user")
            this.fetchFitbitData('activities.json', fitbitToken, 'lifetimeStats')
            this.fetchFitbitData('badges.json', fitbitToken, 'badges')
            this.fetchFitbitData('activities/steps/date/today/1m.json', fitbitToken, 'steps')
            this.fetchFitbitData('activities/distance/date/today/1m.json', fitbitToken, 'distance')

        }
        if (decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("code").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) && decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("state").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))) {
            this.setState({ fitbitloggedIn: false, withingsloggedIn: true })
            var code = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("code").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
            localStorage.setItem("withings_token", JSON.stringify(code))
            localStorage.removeItem("fitbit_token")
            this.setState({ fitbitloggedIn: false, loggedin: false, withingsloggedIn: true, code: code })
            this.getDevice(code);
            // this.getMeassure(code);
        }
    }


    // fetch fitbit data from call back url
    fetchFitbitData(url, fitbitToken, stateKey) {
        axios({
            method: 'get',
            url: 'https://api.fitbit.com/1/user/-/' + url,
            headers: { 'Authorization': 'Bearer ' + fitbitToken },
            mode: 'cors'
        })
            .then(response => {
                const state = this.state.apidata;
                state[stateKey] = response.data;
                this.setState({ apidata: state });
            })
            .catch(error => console.log("Eroro", error))
    }

    backDate = (backmonth = 3) => {
        let today = new Date(Date.now());
        let month, day, date, year;
        year = today.getFullYear();
        month = today.getMonth();
        date = today.getDate();
        if (month - backmonth <= 0) year = today.getFullYear() - 1;
        let backdate = new Date(year, month - backmonth, date);
        return backdate;
    };
    toTimestamp = (strDate) => {
        return Math.round(new Date(strDate).getTime() / 1000);
    }
    formatDate = (unix_timestamp) => {
        var date = new Date(unix_timestamp * 1000);
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("/");
    }


    //GET WITHINGS DEVICES & DATA
    getDevice = (code) => {
        axios.get("https://wbsapi.withings.net/v2/user?action=getdevice",
            {
                headers: {
                    Authorization: "Bearer " + code,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                if (res.data && res.data.body && res.data.body.devices) {
                    this.setState({ Devices_id: res.data.body.devices })
                }
            })
    }

    // GET WITHINGS MEASURE
    getMeassure = (code, deviceid) => {
        let Weight = [], Height = [], FatFreeMass = [], FatRatio = [], FatMassWeight = [], DiastolicBloodPressure = [],
            SystolicBloodPressure = [], HeartPulse = [], Temperature = [], SP02 = [], BodyTemperature = [], FatFreeMassD = [],
            SkinTemperature = [], MuscleMass = [], Hydration = [], BoneMass = [], PulseWaveVelocity = [], SP02D = [],
            TemperatureD = [], HeartPulseD = [], WeightD = [], BoneMassD = [], HydrationD = [], DiastolicBloodPressureD = [];
        console.log("getMeassure", deviceid)
        axios.get('https://wbsapi.withings.net/measure?action=getmeas&startdate=' + this.toTimestamp(this.backDate(6)) + '&enddate=' + this.toTimestamp(new Date()), {
            headers: {
                'Authorization': 'Bearer ' + code,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                let messureData
                if (response.data.body && response.data.body.measuregrps && response.data.body.measuregrps.length > 0) {
                    messureData = response.data.body
                    this.setState({ getMeassure: response.data.body })
                } else if (this.state.optionsGraph && this.state.optionsGraph.length > 0) {
                    messureData = this.state.getMeassure
                }
                var labels = [], value = [], options = [];
                messureData.measuregrps &&
                    messureData.measuregrps.length > 0 &&
                    messureData.measuregrps.map((data) => {
                        if (deviceid == data.deviceid) {
                            if (data.measures && data.measures.length > 0) {
                                data.measures.map(obj => {
                                    switch (parseInt(obj.type)) {
                                        case withingsMeasureType.Weight:
                                            Weight.push(obj.value / 1000)
                                            WeightD.push(this.formatDate(data.date))
                                            break;
                                        case withingsMeasureType.HeartPulse:
                                            HeartPulse.push(obj.value / 1000)
                                            HeartPulseD.push(this.formatDate(data.date))
                                            break;
                                        case withingsMeasureType.Height:
                                            Height.push(obj.value / 1000)
                                            break;
                                        case withingsMeasureType.Temperature:
                                            Temperature.push(obj.value / 1000)
                                            TemperatureD.push(this.formatDate(data.date))
                                            break;
                                        case withingsMeasureType.BodyTemperature:
                                            BodyTemperature.push(obj.value / 1000)
                                            break;
                                        case withingsMeasureType.SkinTemperature:
                                            SkinTemperature.push(obj.value / 1000)
                                            break;
                                        case withingsMeasureType.BoneMass:
                                            BoneMass.push(obj.value / 1000)
                                            BoneMassD.push(this.formatDate(data.date))
                                            break;
                                        case withingsMeasureType.FatFreeMass:
                                            FatFreeMass.push(obj.value / 1000)
                                            FatFreeMassD.push(this.formatDate(data.date))
                                            break;
                                        case withingsMeasureType.MuscleMass:
                                            MuscleMass.push(obj.value / 1000)
                                            break;
                                        case withingsMeasureType.FatMassWeight:
                                            FatMassWeight.push(obj.value / 1000)
                                            break;
                                        case withingsMeasureType.Hydration:
                                            Hydration.push(obj.value / 1000)
                                            HydrationD.push(this.formatDate(data.date))
                                            break;
                                        case withingsMeasureType.PulseWaveVelocity:
                                            PulseWaveVelocity.push(obj.value / 1000)
                                            break;
                                        case withingsMeasureType.FatRatio:
                                            FatRatio.push(obj.value / 1000)
                                            break;
                                        case withingsMeasureType.DiastolicBloodPressure:
                                            DiastolicBloodPressure.push(obj.value / 1000)
                                            DiastolicBloodPressureD.push(this.formatDate(data.date))
                                            break;
                                        case withingsMeasureType.SystolicBloodPressure:
                                            SystolicBloodPressure.push(obj.value / 1000)
                                            break;
                                        case withingsMeasureType.SP02:
                                            SP02.push(obj.value / 1000)
                                            SP02D.push(obj.value / 1000)
                                            break;
                                    }
                                })
                                labels.push(this.formatDate(data.date));
                                value.push(data.measures[0].value / 1000);
                            }
                        }
                    });
                let chartData = {
                    labels: labels,
                    data: value,
                };
                if (DiastolicBloodPressure.length > 0 && SystolicBloodPressure.length > 0) {
                    options.push({
                        title: {
                            text: 'Blood Pressure'
                        },
                        xAxis: {
                            title: {
                                text: 'Date'
                            },
                            categories: DiastolicBloodPressureD
                        },
                        plotOptions: {
                            series: {
                                marker: {
                                    enabled: true,
                                    radius: 3
                                }
                            }
                        },
                        chart: {
                            type: 'spline'

                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'SystolicBloodPressure',
                            data: SystolicBloodPressure
                        },
                        {
                            name: 'DiastolicBloodPressure',
                            data: DiastolicBloodPressure
                        }]
                    })
                }
                if (FatMassWeight.length > 0 && FatRatio.length > 0 && FatFreeMass.length > 0) {
                    options.push({
                        title: {
                            text: 'Fats'
                        },
                        xAxis: {
                            title: {
                                text: 'Date'
                            },
                            categories: FatFreeMassD
                        },
                        plotOptions: {
                            series: {
                                marker: {
                                    enabled: true,
                                    radius: 3
                                }
                            }
                        },
                        chart: {
                            type: 'spline'

                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: "FatMassWeight",
                            data: FatMassWeight,
                            color: "red",
                        },
                        {
                            name: "FatRatio",
                            data: FatRatio,
                            color: "green",
                        },
                        {
                            name: "FatFreeMass",
                            data: FatFreeMass,
                            color: "blue",
                        }]
                    })
                }
                options.push({
                    title: {
                        text: 'Temprature'
                    },
                    xAxis: {
                        title: {
                            text: 'Date'
                        },
                        categories: TemperatureD
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'spline'

                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: "Temperature",
                        data: Temperature,
                        color: "orange",
                    },
                    {
                        name: "BodyTemperature",
                        data: BodyTemperature,
                        color: '#456665'
                    },
                    {
                        name: "SkinTemperature",
                        data: SkinTemperature,
                        color: '#445432',
                    }]
                })

                options.push({
                    title: {
                        text: 'Mass'
                    },
                    xAxis: {
                        title: {
                            text: 'Date'
                        },
                        categories: BoneMassD
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'spline'

                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: "BoneMass",
                        data: BoneMass,
                        color: "red",
                    },
                    {
                        name: "MuscleMass",
                        data: MuscleMass,
                        color: 'blue',
                    }]
                })

                options.push({
                    title: {
                        text: 'Pulse'
                    },
                    xAxis: {
                        title: {
                            text: 'Date'
                        },
                        categories: HeartPulseD
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'spline'

                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: "HeartPulse",
                        data: HeartPulse,
                        color: "red",
                    },
                    {
                        name: "PulseWaveVelocity",
                        data: PulseWaveVelocity,
                        color: "orange",
                    }]
                })

                options.push({
                    title: {
                        text: 'Hight/ Weight'
                    },
                    xAxis: {
                        title: {
                            text: 'Date'
                        },
                        categories: WeightD
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'spline'

                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: "Height",
                        data: Height,
                        color: "red",
                    },
                    {
                        name: "Weight",
                        data: Weight,
                        color: "orange",
                    }]
                })

                options.push({
                    title: {
                        text: 'Hydration'
                    },
                    xAxis: {
                        title: {
                            text: 'Date'
                        },
                        categories: HydrationD
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    chart: {
                        type: 'spline'

                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: "Hydration",
                        data: Hydration,
                        color: "yellow",
                    }]
                })

                this.setState({ optionsGraph: options })

            })
    }

    //Logout user
    tracker() {
        this.props.history.push('/patient/tracker')
    }
    logoutfromall = () => {
        if (this.state.fitbitloggedIn) {
            localStorage.removeItem("fitbit_token")
        }
        if (this.state.withingsloggedIn) {
            localStorage.removeItem("withings_token")
        }
        this.setState({ fitbitloggedIn: false, loggedin: false, withingsloggedIn: false })
        this.tracker();
    }

    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    // fancybox open
    handleOpenSrvc = () => {
        this.setState({ openSrvc: true });
    };
    handleCloseSrvc = () => {
        this.setState({ openSrvc: false });
    };

    handleOpenvData = (deviceid) => {
        if (this.state.withingsloggedIn) {
            this.getMeassure(this.state.code, deviceid.deviceid)
        }
        this.setState({ vData: true, });
    };
    handleClosevData = () => {
        this.setState({ vData: false });
    };

    render() {
        const { value, fitbitloggedIn, apidata, withingsloggedIn, Devices_id, deviceid } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                <LeftMenu currentPage="tracker" />
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={9}>
                                    <Grid className="docsOpinion">
                                        <Grid container direction="row" className="docsOpinLbl">
                                            <Grid item xs={12} md={6}><label>Trackers & Self Data</label></Grid>
                                            <Grid item xs={12} md={6} className="docsOpinRght">
                                                <a onClick={this.handleOpenSrvc}>+ Connect</a>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm={4}>

                                            {/* <a href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22BRQT&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fpatient%2Ftracker&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800">
                                                <img src={require('../../../assets/images/fitbit.png')} style={{ maxWidth: "50px" }} alt="" />
                                            </a> */}

                                            {/* {this.state.fitbitloggedIn &&
                                                <img onClick={this.logoutfromall} style={{ maxWidth: "50px" }} src={require('../../../assets/images/logouttracker.png')} alt="" />
                                            } */}
                                        </Grid>


                                        {/* Model setup */}
                                        <Modal
                                            open={this.state.openSrvc}
                                            onClose={this.handleCloseSrvc}
                                            className="srvcBoxModel">
                                            <Grid className="srvcBoxCntnt">
                                                <Grid className="srvcCourse">
                                                    <Grid className="srvcCloseBtn">
                                                        <a onClick={this.handleCloseSrvc}>
                                                            <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                        </a>
                                                    </Grid>
                                                    <Grid><label>Connect Devices & Services</label></Grid>

                                                    <Grid className="srchSrvc">
                                                        <input type="text" placeholder="Search for device or service name..." />
                                                        <img src={require('../../../assets/images/InputField.svg')} alt="" title="" />
                                                    </Grid>

                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="fitBitSection">
                                                                <Grid className="mainLogo1"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                <Grid className="mainLogoAdd">
                                                                    <a><img src={require('../../../assets/images/add.svg')} alt="" title="" className="addBlue" />
                                                                        <img src={require('../../../assets/images/addgrey.svg')} alt="" title="" className="addGray" />Connect</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="fitBitSection">
                                                                <Grid className="mainLogo2"><img src={require('../../../assets/images/within.png')} alt="" title="" /></Grid>
                                                                <Grid className="mainLogoAdd">
                                                                    <a><img src={require('../../../assets/images/add.svg')} alt="" title="" className="addBlue" />
                                                                        <img src={require('../../../assets/images/addgrey.svg')} alt="" title="" className="addGray" />Connect</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="fitBitSection">
                                                                <Grid className="mainLogo3"><img src={require('../../../assets/images/x23.png')} alt="" title="" /></Grid>
                                                                <Grid className="mainLogoAdd">
                                                                    <a><img src={require('../../../assets/images/add.svg')} alt="" title="" className="addBlue" />
                                                                        <img src={require('../../../assets/images/addgrey.svg')} alt="" title="" className="addGray" />Connect</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="fitBitSection">
                                                                <Grid className="mainLogo1"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                <Grid className="mainLogoAdd">
                                                                    <a><img src={require('../../../assets/images/add.svg')} alt="" title="" className="addBlue" />
                                                                        <img src={require('../../../assets/images/addgrey.svg')} alt="" title="" className="addGray" />Connect</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="fitBitSection">
                                                                <Grid className="mainLogo1"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                <Grid className="mainLogoAdd">
                                                                    <a> <img src={require('../../../assets/images/add.svg')} alt="" title="" className="addBlue" />
                                                                        <img src={require('../../../assets/images/addgrey.svg')} alt="" title="" className="addGray" />Connect</a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of Model setup */}

                                        <Grid className="presPkgIner1">
                                            {/* Tabs  */}
                                            <AppBar position="static" className="presTabsUpr">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={8}>
                                                        <Tabs value={value} onChange={this.handleChangeTabs} className="presTabs">
                                                            <Tab label="Trackers & Devices" className="presTabsIner" />
                                                            {/* <Tab label="Self Data Services" className="presTabsIner" /> */}
                                                        </Tabs>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} className="presSrch">
                                                        <a><img src={require('../../../assets/images/search-entries.svg')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </AppBar>
                                        </Grid>
                                        <Grid className="presPkgIner2">
                                            {value === 0 && <TabContainer>

                                                {/* <Grid className="noDevices">
                                                    <h1>No devices connected</h1>
                                                    <p>Your connected devices will appear here</p>
                                                    <h3><a>Connect a device</a></h3>
                                                </Grid> */}

                                                {/* Trackers & Devices Design */}
                                                <Grid className="selfData">
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            {!fitbitloggedIn &&
                                                                <Grid className="trckSection">
                                                                    <Grid className="trckSecIner" >
                                                                        <Grid style={{ minHeight: "140px" }} >
                                                                            <div style={{ minHeight: "40px" }}></div>
                                                                            < a href="https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BNVH&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fpatient%2Ftracker&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800">
                                                                                <img style={{ margin: "10%" }} title="Loggin via Fitbit!" src={require('../../../assets/images/fitbit.png')} style={{ maxWidth: "100px" }} alt="" />
                                                                            </a>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                            {fitbitloggedIn && apidata && apidata.device && apidata.device.map(devicedata => (
                                                                <Grid className="trckSection">
                                                                    <Grid className="trckSecIner">
                                                                        <Grid className="trckDots presEditDot scndOptionIner">
                                                                            <a className="openScndhrf"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" />
                                                                                <ul>
                                                                                    <li><a onClick={this.handleOpenvData} className="trackView" >View Details</a></li>
                                                                                    <li><a onClick={this.logoutfromall} className="trackView" >Logout</a></li>
                                                                                </ul>
                                                                            </a></Grid>
                                                                        <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                        <Grid className="trckCntnt">
                                                                            <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                            <p>{devicedata.deviceVersion}</p>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="trackView"><a onClick={this.handleOpenvData}>View data</a></Grid>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="selfData">
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            {!withingsloggedIn &&
                                                                <Grid className="trckSection">
                                                                    <Grid className="trckSecIner1" >
                                                                        <Grid className="trckLogo1" style={{ minHeight: "140px" }} >
                                                                            <div style={{ minHeight: "30px" }}></div>
                                                                            < a href="https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=198370b3fcf82d7ed5968266d053f376291849d5691751e9987e1d71ae867c92&scope=user.info,user.metrics,user.activity,user.sleepevents&redirect_uri=http://localhost:3000/patient/tracker&state=up">
                                                                                <img style={{ minWidth: "120px", height: "80px", }} title="Loggin via Withings!" src={require('../../../assets/images/logo-withings.png')} style={{ maxWidth: "100px" }} alt="" />
                                                                            </a>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                            {withingsloggedIn && Devices_id && Devices_id.length > 0 && Devices_id.map((devices, i) => (
                                                                <Grid className="trckSection">
                                                                    <Grid className="trckSecIner">
                                                                        <Grid className="trckDots presEditDot scndOptionIner">
                                                                            <a className="openScndhrf"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" />
                                                                                <ul>
                                                                                    <li><a onClick={this.handleOpenvData} className="trackView" >View Details</a></li>
                                                                                    <li><a onClick={this.logoutfromall} className="trackView" >Logout</a></li>
                                                                                </ul>
                                                                            </a>
                                                                        </Grid>
                                                                        <Grid className="trckLogo"><img style={{ height: "80px", minWidth: "100px" }} src={require('../../../assets/images/logo-withings.png')} alt="" title="" /></Grid>
                                                                        <Grid className="trckCntnt">
                                                                            <Grid><label>Klemen’s Fitbit {i + 1}</label></Grid>
                                                                            <p>{devices.model}</p>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="trackView"><a onClick={() => this.handleOpenvData(devices)}>
                                                                        View data
                                                                    </a></Grid>
                                                                </Grid>
                                                            ))
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Grid>




                                                {/* Model setup */}
                                                <Modal
                                                    open={this.state.vData}
                                                    onClose={this.handleClosevData}
                                                    className="datBoxModel">
                                                    <Grid className="datBoxCntnt">

                                                        <Grid className="datCourse">
                                                            <Grid className="datCloseBtn">
                                                                <a onClick={this.handleClosevData}>
                                                                    <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                                </a>
                                                            </Grid>
                                                            <Grid className="expndLogo">
                                                                <a><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></a>
                                                                <a><img src={require('../../../assets/images/within.png')} alt="" title="" /></a>
                                                                <a><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></a>
                                                            </Grid>
                                                            {/* <Grid className="fitBitVersaUpr">
                                                                            <Grid className="fitBitVersa fitBitVersaActv">
                                                                                <label>Klemen’s Fitbit 1</label>
                                                                                <p>Fitbit Versa 2</p>
                                                                            </Grid>
                                                                            <Grid className="fitBitVersa">
                                                                                <label>Klemen’s Fitbit 1</label>
                                                                                <p>Fitbit Versa 2</p>
                                                                            </Grid>
                                                                            <Grid className="fitBitVersa">
                                                                                <label>Klemen’s Fitbit 1</label>
                                                                                <p>Fitbit Versa 2</p>
                                                                            </Grid>
                                                                        </Grid> */}
                                                        </Grid>

                                                        <Grid className="editDevice">

                                                            <Grid>
                                                                <Grid className="disCnct">
                                                                    <Grid className="disCnctLft">
                                                                        <Grid>
                                                                            <label>{fitbitloggedIn ? "Klemen’s Fitbit 1" : withingsloggedIn ? "Withings Devices" : ""}
                                                                                <a><img src={require('../../../assets/images/editBlue.png')} alt="" title="" /></a>
                                                                            </label>
                                                                        </Grid>
                                                                        <p>{fitbitloggedIn ? "Klemen’s Fitbit Device Model" : withingsloggedIn ? "Withings Devices Model" : ""}</p>
                                                                    </Grid>
                                                                    <Grid className="disCnctRght">
                                                                        <a>Disconnect device</a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="disCnctContent">
                                                                <Grid container direction="row" justify="center" alignItems="center">
                                                                    <Grid item xs={12} md={8}>
                                                                        {/* <p>This view will depend on what the API serves from a specific tracking device.
                                                                                    It is good to have a  similar/same view as the dashboard fitbit owners see in the
                                                                                    original app.</p> */}
                                                                        <Grid className="trckSection">
                                                                            <Grid className="trckSecIner" >
                                                                                {this.state.fitbitloggedIn && <div>
                                                                                    {this.state.apidata && this.state.apidata.lifetimeStats &&
                                                                                        <div>
                                                                                            <h4>Distance</h4>
                                                                                            <p>Total: {this.state.apidata.lifetimeStats.lifetime && this.state.apidata.lifetimeStats.lifetime.total && this.state.apidata.lifetimeStats.lifetime.total.distance && this.state.apidata.lifetimeStats.lifetime.total.distance}</p>
                                                                                            <p>Best: {this.state.apidata.lifetimeStats.best && this.state.apidata.lifetimeStats.best.total && this.state.apidata.lifetimeStats.best.total.distance && this.state.apidata.lifetimeStats.best.total.distance.value && this.state.apidata.lifetimeStats.best.total.distance && this.state.apidata.lifetimeStats.best.total.distance.value} on {this.state.apidata.lifetimeStats.best && this.state.apidata.lifetimeStats.best.total && this.state.apidata.lifetimeStats.best.total.distance && this.state.apidata.lifetimeStats.best.total.distance.date && this.state.apidata.lifetimeStats.best.total.distance.date}</p>
                                                                                            <h4>Steps</h4>
                                                                                            <p>Total: {this.state.apidata.lifetimeStats.lifetime && this.state.apidata.lifetimeStats.lifetime.total && this.state.apidata.lifetimeStats.lifetime.total.steps && this.state.apidata.lifetimeStats.lifetime.total.steps}</p>
                                                                                            <p>Best: {this.state.apidata.lifetimeStats.best && this.state.apidata.lifetimeStats.best.total && this.state.apidata.lifetimeStats.best.total.steps.value && this.state.apidata.lifetimeStats.best.total.steps.value} on {this.state.apidata.lifetimeStats.best && this.state.apidata.lifetimeStats.best.total && this.state.apidata.lifetimeStats.best.total.steps && this.state.apidata.lifetimeStats.best.total.steps.date && this.state.apidata.lifetimeStats.best.total.steps && this.state.apidata.lifetimeStats.best.total.steps.date}</p>
                                                                                        </div>}
                                                                                    {this.state.apidata && this.state.apidata.badges &&
                                                                                        <h4>Badges</h4>}
                                                                                    {this.state.apidata && this.state.apidata.badges && this.state.apidata.badges.badges && this.state.apidata.badges.badges.length > 0 && this.state.apidata.badges.badges.map((badge, i) => {
                                                                                        return (
                                                                                            <div key={i}>
                                                                                                <h5>{badge.shortName}</h5>
                                                                                                <p><img src={badge.image100px} alt="" /></p>
                                                                                                <p>{badge.description}</p>
                                                                                                <p>Earned {badge.timesAchieved} times</p>
                                                                                                <p>Last on {badge.dateTime}</p>
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>}
                                                                                {this.state.withingsloggedIn &&
                                                                                    <div>
                                                                                        {deviceid &&
                                                                                            <div className="CardView">
                                                                                                <h2>Devices</h2>
                                                                                                <Grid container className="CardItem">
                                                                                                    <Grid item sm={10}>
                                                                                                        <label>Model : </label> <span>{deviceid.model}</span>
                                                                                                        <label>Type : </label> <span>{deviceid.type}</span>
                                                                                                        <label>Timezone : </label> <span>{deviceid.timezone}</span>
                                                                                                        <label>Last Session : </label> <span> {new Date(
                                                                                                            deviceid.last_session_date * 1000
                                                                                                        ).toString()}</span>
                                                                                                    </Grid>
                                                                                                    <Grid item sm={2}>
                                                                                                        {deviceid.battery == "high" && (
                                                                                                            <Battery90Icon style={{ color: 'green', fontSize: '35px' }} />
                                                                                                        )}
                                                                                                        {deviceid.battery == "medium" && (
                                                                                                            <Battery60Icon style={{ color: 'orange', fontSize: '35px' }} />
                                                                                                        )}
                                                                                                        {deviceid.battery == "low" && (
                                                                                                            <Battery30Icon style={{ color: 'red', fontSize: '35px' }} />
                                                                                                        )}
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            </div>}
                                                                                        {this.state.optionsGraph && this.state.optionsGraph.length > 0 ? this.state.optionsGraph.map((item1, index) => (
                                                                                            <div className="setMarginforgraph">
                                                                                                <HighchartsReact
                                                                                                    constructorType={"chart"}
                                                                                                    ref={this.chartComponent}
                                                                                                    highcharts={Highcharts}
                                                                                                    options={item1}
                                                                                                />
                                                                                            </div>
                                                                                        ))
                                                                                            : ''}
                                                                                    </div>}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>

                                                    </Grid>
                                                </Modal>
                                                {/* End of Model setup */}
                                                {/* <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container direction="row" spacing={3}>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid className="trckSection">
                                                                <Grid className="trckSecIner">
                                                                    <Grid className="trckDots"><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></Grid>
                                                                    <Grid className="trckLogo"><img src={require('../../../assets/images/fitbit.png')} alt="" title="" /></Grid>
                                                                    <Grid className="trckCntnt">
                                                                        <Grid><label>Klemen’s Fitbit 1</label></Grid>
                                                                        <p>Fitbit Versa 2</p>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="trackView"><a>View data</a></Grid>
                                                            </Grid>
                                                        </Grid> */}

                                                {/* End of Trackers & Devices Design */}
                                            </TabContainer>}

                                            {value === 1 && <TabContainer>
                                                <Grid className="noDevices">
                                                    <h1>No devices connected</h1>
                                                    <p>Your connected devices will appear here</p>
                                                    <h3><a>Connect a device</a></h3>
                                                </Grid>
                                            </TabContainer>}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        );
    }
}
export default Index