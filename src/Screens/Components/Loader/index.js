import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
class Loader extends Component {
    render() {
        return (
            <Grid className="dataLoader"> 
                <img src={require('../../../assets/images/spinner.gif')} alt="" title="" />
            </Grid>
        );
    }
}
export default Loader;
