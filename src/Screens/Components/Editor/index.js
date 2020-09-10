import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Editor } from 'react-draft-wysiwyg';

class NotesEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || '',
            label : this.props.label,
        };
    }

    //On Editor Change 
    onEditorStateChange = (editorState) => {
        this.setState({ value : editorState});
        this.props.onChange(editorState);
    };

    componentDidMount = () => {

    }
    render() {
        return (
            <div>
                <Grid className="notEditor"><label>{this.state.label}</label></Grid>
                <Grid className="fill_editor">
                    <Editor
                        editorState={this.state.value}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Grid>
            </div>
        )
    }
}

export default NotesEditor;