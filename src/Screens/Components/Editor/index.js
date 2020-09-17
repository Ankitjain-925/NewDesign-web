import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value ? this.props.value : '',
      name: this.props.name,
    } // You can also pass a Quill Delta here
  }

  handleChange = (value) => {
    this.setState({ value: value })
    this.props.onChange(value)
  }

  render() {
    return (
      <ReactQuill name={this.state.name} value={this.state.value}
        onChange={this.handleChange} />
    )
  }
}

export default Editor;