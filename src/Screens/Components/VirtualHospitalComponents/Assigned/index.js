import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { pure } from "recompose";
import { S3Image } from "Screens/Components/GetS3Images/index";
import Modal from "@material-ui/core/Modal";
import {
    getLanguage
} from "translations/index"

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assigned_to: this.props.assigned_to,
        }
    }

    ViewPopup=()=> {
        this.setState({ showAll: true })
    }

    removePopup=()=> {
        this.setState({ showAll: false })
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { Assignedto } = translate;
        var viewImage = this.props.assigned_to?.length > 0 && this.props.assigned_to.filter((data, index) => index <= 1)
        var count = this.props.assigned_to?.length - 2 > 0 ? this.props.assigned_to?.length - 2 : 0;
        return (
            <>
                {this.props.withoutLabel ?
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            <Grid className="asignUpr">
                                <Grid className="asignLft">
                                    <Grid><label>{Assignedto}</label></Grid>
                                    <Grid>
                                        {viewImage?.length > 0 && viewImage.map((data, index) => (
                                            <S3Image imgUrl={data.image} />
                                        ))}
                                        {count > 0 && <a>+{count}</a>}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> :
                    <Grid className="newassignLft" >
                        <Modal
                            className={
                                this.props.settings &&
                                    this.props.settings.setting &&
                                    this.props.settings.setting.mode &&
                                    this.props.settings.setting.mode === "dark"
                                    ? "darkTheme"
                                    : ""
                            }
                            open={this.state.showAll}
                            onClose={this.removePopup}
                        >
                            <Grid className="creatTaskModel">
                                <Grid className="creatTaskCntnt">
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={12}>
                                            <Grid className="creatLbl">
                                                <Grid className="creatLblClose">
                                                    <a onClick={()=>this.removePopup()}>
                                                        <img
                                                            src={require("assets/images/close-search.svg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                    </a>
                                                </Grid>
                                                <label>{"Assigned to"}</label>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>

                                            <Grid className="creatDetail">
                                                <Grid className="creatInfoIner">
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={2}
                                                    >
                                                        <Grid item xs={12} md={12}>
                                                            {this.props.assigned_to?.length > 0 && this.props.assigned_to.map((data, index) => (
                                                                <div className="showAllAssignedInner">
                                                                    <Grid className="allInfo tasklistName">
                                                                        <Grid><S3Image imgUrl={data?.image} /></Grid>
                                                                        <Grid className="allInfoRght">
                                                                            <Grid><label>{data?.first_name} {data?.last_name}</label></Grid>
                                                                            <p>{data?.profile_id}</p>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            ))}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Modal>
                        {viewImage?.length > 0 && viewImage.map((data, index) => (
                           <div className="setAssignedTo">
                               <span>{data?.first_name} {data?.last_name} - ({data?.profile_id})</span>
                                <S3Image imgUrl={data.image} />
                           </div>
                        ))}
                        {count > 0 && <a onClick={() => this.ViewPopup()}>+{count}</a>}
                    </Grid>}
            </>
        );
    }
}
export default pure(Index);