import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalurl: this.props.totalurl,
        }
    }


    render() {
        var viewImage = this.state.totalurl?.length>0 && this.state.totalurl.filter((data, index)=>index<=1)
        var count = this.state.totalurl?.length-2 >0 ? this.state.totalurl?.length-2 : 0;
        return (
            <Grid container direction="row">
                <Grid item xs={12} md={12}>
                    <Grid className="asignUpr">
                        <Grid className="asignLft">
                            <Grid><label>Assigned to</label></Grid>
                            <Grid>
                                
                                {viewImage?.length>0 &&  viewImage.map((data, index) => (
                                        <img key={index} src={data} />    
                                ))}
                                {count>0 && <a>+{count}</a>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default Index;