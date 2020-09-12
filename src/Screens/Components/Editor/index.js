import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, EditorState } from "draft-js";

var content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Enter the content Here",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ]
};

export default class NotesEditor extends React.Component {
  constructor(props) {
   super(props);
    const contentState = convertFromRaw(content);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      contentState,
      editorState
    };
  }

  //On change State of editor in json
  onContentStateChange = contentState => {
    this.setState({ contentState });
    this.props.onChange(contentState);
  };

  //On change editor status
  onEditorStateChange = editorState => {
    this.setState({editorState });
  };

  componentDidUpdate = (prevProps) => {
 
}
  render() {
    const { editorState } = this.state;
    return (
      <div className="App">
        <Editor
          editorClassName={"report-editor"}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.onContentStateChange}
        />
      </div>
    );
  }
}
