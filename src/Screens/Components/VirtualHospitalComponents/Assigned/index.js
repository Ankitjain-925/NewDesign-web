import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { pure } from "recompose";
import { S3Image } from "Screens/Components/GetS3Images/index";
import {
    getLanguage
  }from "translations/index"

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assigned_to: this.props.assigned_to,
        }
    }

    render() {
       let translate = getLanguage(this.props.stateLanguageType);
       let {Assignedto} = translate;
        var viewImage = this.props.assigned_to?.length>0 && this.props.assigned_to.filter((data, index)=>index<=1)
        var count = this.props.assigned_to?.length-2 >0 ? this.props.assigned_to?.length-2 : 0;
        return (
            <>
            {this.props.withoutLabel ? 
                <Grid container direction="row">
                <Grid item xs={12} md={12}>
                    <Grid className="asignUpr">
                        <Grid className="asignLft">
                            <Grid><label>{Assignedto}</label></Grid>
                            <Grid>
                                {viewImage?.length>0 &&  viewImage.map((data, index) => (
                                        <S3Image imgUrl={data.image} />  
                                ))}
                                {count>0 && <a>+{count}</a>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>:
            <Grid className="newassignLft">
                {viewImage?.length>0 &&  viewImage.map((data, index) => (
                        <S3Image imgUrl={data.image} />  
                ))}
                {count>0 && <a>+{count}</a>}
            </Grid>}
            </>
        );
    }
}
export default pure(Index);