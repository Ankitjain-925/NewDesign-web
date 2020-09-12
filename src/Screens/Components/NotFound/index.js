import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import 'react-calendar/dist/Calendar.css';

class Index extends Component {
    constructor(props) {
       super(props);
        this.state = {
            selectedOption: null,
            openDash: false,
            date: new Date(),
        };
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    redirectPage=()=>{
        this.props.history.push('/');
      }
    // fancybox open
    handleOpenDash = () => {
        this.setState({ openDash: true });
    };
    handleCloseDash = () => {
        this.setState({ openDash: false });
    };

    onChange = date => this.setState({ date })

    render() {
        const { selectedOption } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={6} md={6}>
                            <Grid className="webLogo">
                                <a href="/"><img src={require('../../../assets/images/logo_new.png')} alt="" title="" /></a>
                            </Grid>
                            <div className="NotFound"><h1>404 - Page Not Found</h1></div>
                            <div className="NotFoundContent">
                                <div className="OopsContent">Oops !!!</div>
                                <div>The page you are looking for might have baeen removed had its name changed or its temporarily unavailable.</div>
                                <div onClick={this.redirectPage} className="BackHomeBtn">
                                    Go to Home
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default Index