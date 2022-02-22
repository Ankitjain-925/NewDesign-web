import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import sitedata from "sitedata";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.data || {},
      track_id:this.props.track_id,
      new_image: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.item !== this.state.item ||
      nextProps.data !== this.props.data ||
      nextProps.track_id !== this.props.track_id ||
      nextState.new_image !== this.state.new_image
    );
  }

  componentDidMount() {
    this.setState({ item: this.props.data },
      () => {
        this.GetAttachfiles();
      })
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.data !== this.props.data
    ) {
      this.setState({
        item: this.props.data,

        track_id:this.props.track_id

      }, () => {
        this.GetAttachfiles();
      })
    }
  }

  GetAttachfiles = () => {
    var find = this.state?.item?.created_by_image || this.state?.item?.image;
    if (find) {
      var find1 = find.split(".com/")[1];
      axios
        .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
        .then((response2) => {
          if (response2.data.hassuccessed) {
            this.setState({ new_image: response2.data.data });
          }
        });
    }
  }

  render() {
    var {item,track_id} = this.state;
    console.log("track_id",track_id)
    return (
      <Grid className="bpJohnImg">
        <a data-tip data-for={track_id + "created"}>
          <img
            src={this.state.new_image}
            alt=""
            title=""
          />
          {item && item?.first_name && (<span>{item.first_name} {item.last_name}</span>)}
          {item && item?.created_by_temp && (<span>{item.created_by_temp}</span>)}

        </a>
        <ReactTooltip
          className="timeIconClas_crested"
          id={track_id + "created"}
          place="top"
          effect="solid"
          backgroundColor="#ffffff"
        >
          {item && item?.first_name && (<p>{item.first_name} {item.last_name}</p>)}
          {item && item?.created_by_temp && (<p>{item.created_by_temp}</p>)}
          {item && item?.profile_id && (<p>{item.profile_id}</p>)}
          <p>
            <img
              src={this.state.new_image}
              alt=""
              title=""
            />
          </p>
        </ReactTooltip>
      </Grid>
    );
  }
}

export default Index;
