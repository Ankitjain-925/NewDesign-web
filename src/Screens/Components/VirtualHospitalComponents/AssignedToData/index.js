import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import {
    getLanguage
  } from "translations/index"

var selectField_data = []


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openEntry: this.props.openEntry,
            value: '',
            selectField_data: [],
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.openEntry !== this.props.openEntry) {
            this.setState({ openEntry: this.props.openEntry })
        }
    }

    updateCommemtState = (e) => {
        this.setState({
            value: e.target.value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let selectField_data = [...this.state.selectField_data];
        selectField_data.push({
            value: this.state.value,
        });
        this.setState({
            selectField_data,
            value: '',
        });
    };



    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let {AddTask} = translate;
        const { selectField_data } = this.state;
        return (
            <Modal
                open={this.state.openEntry}
                onClose={this.props.handleCloseAssign}>

                <Grid className="addSpeclContnt">
                    <Grid className="addSpeclLbl">
                        <Grid className="addSpeclClose">
                            <a onClick={this.props.handleCloseAssign}>
                                <img src={require('assets/virtual_images/closefancy.png')} alt="" title="" />
                            </a>
                        </Grid>
                        <Grid><label>{AddTask}</label></Grid>
                        <Grid item xs={10} md={10}>
                            <select value={this.state.value} onChange={(e) => this.updateCommemtState(e)}>
                                <option value="grapefruit">Grapefruit</option>
                                <option value="lime">Lime</option>
                                <option value="coconut">Coconut</option>
                                <option value="mango">Mango</option>
                            </select>
                            <Grid>
                                {selectField_data?.length > 0 && selectField_data.map((data) => (
                                    <>
                                        {data.value}
                                    </>
                                ))}
                            </Grid>
                            <Grid className="newServc">
                                <a><Button onClick={(e) => this.handleSubmit(e)}>Submit</Button></a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>

        );
    }
}
export default Index;