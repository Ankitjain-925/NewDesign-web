import React from "react";
import "./style.scss";

class avatar extends React.Component {

  constructor(props) {
   super(props);

    this.state = {
      image : ''
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextState.image !== this.state.image) ||
      (nextProps.image !== this.props.image)
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.image !== this.props.image) {
      this.setState({image : this.props.image})
  }
}

  render() {
    const borderWidth = this.props.borderWidth || '1px';
      const borderColor = this.props.borderColor || '#AAA';
      const cornerRadius = this.props.cornerRadius || '50%';
    return (
          <img src={this.state.image} style={{borderWidth:borderWidth, borderStyle:'solid',borderColor:borderColor ,'borderRadius': cornerRadius, float:"left"}} />
          );
        }
      }
// const avatar = (props) => {
  
//   const borderWidth = props.borderWidth || '1px';
//   const borderColor = props.borderColor || '#AAA';
//   const cornerRadius = props.cornerRadius || '50%';
//   const image = props.image;

//   const getStyle = () => ({borderWidth:borderWidth, borderStyle:'solid',borderColor:borderColor ,'borderRadius': cornerRadius, float:"left"})

//   return (
//     <img src={image} style={getStyle()} />
//   );
    
// }

export default avatar;